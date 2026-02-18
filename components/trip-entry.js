/**
 * @type {CSSStyleSheet?}
 */
let styles = null;

customElements.define(
  "trip-entry",
  class extends HTMLElement {
    connectedCallback() {
      // this.addStyles();
      if (this.data) this.render();
    }

    /**
     * @param {Object} trip
     */
    render() {
      const trip = this.data;

      this.innerHTML = /*html*/ `
        <img src="${trip.plane_image}" loading="lazy">
        <dl part="path">
          <dt part="origin term">Origen</dt>
          <dd part="origin description">${trip.origin}</dd>
          <dt part="destination term">Destino</dt>
          <dd part="destination description">${trip.destination}</dd>
        </dl>
        <hr>
        <dl part="details">
          <div part="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people-fill mr-2" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
            </svg>
            <dt>
              Asientos disponibles:
            </dt>
            <dd>${trip.seats} asientos</dd>
          </div>
          <div part="item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <dt>
              Duración del vuelo:
            </dt>
            <dd><time>${trip.duration || "-"}</time></dd>
          </div>
          <div part="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-airplane-engines mr-2" viewBox="0 0 16 16">
              <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z"></path>
            </svg>
            <dt>
              Modelo del avión:
            </dt>
            <dd>${trip.plane}</dd>
          </div>
        </dl>
        <a part="button" class="button" href="https://api.whatsapp.com/send?phone=+5493525457917&text=${makeMsgIntroduction(
          trip,
        )}">
          Cotizar vuelo
        </a>
      `;
    }

    addStyles() {
      styles = new CSSStyleSheet();
      styles.replace(/*css*/ `
        :host {
          --visible-elements: 3;
          --padding: 0.5rem 1rem;
          display: block;
          padding: var(--padding);
          margin: 1rem;
          min-width: min-content;
          text-align: center; /* Center CTA button */

          details[open] {
            > summary {
              > :not(:nth-child(-n + 4)) {
                display: var(--display);
              }
            }
          }

          @media (640px < width) {
            --visible-elements: 4;
            --padding: 1rem;

            summary {
              /* Show a row instead of a column of elements */
              --grid-template: 1fr / repeat(var(--visible-elements), 1fr);
              --row-gap: 2rem;

              :nth-child(4) { 
                position: initial;
              }
            }
          }
        }

        summary {
          --row-gap: .4rem;
          --grid-template: repeat(var(--visible-elements), 1fr) / 1fr;

          display: grid;
          grid-template: var(--grid-template);
          grid-auto-rows: 1fr;
          align-items: center;
          gap: var(--row-gap) 1rem;
          cursor: pointer;
          margin-block: 1rem;
          align-items: start;
          position: relative;
          
          :nth-child(4) {
            position: absolute;
            right: 0;
          }

          :not(:nth-child(-n + 4)) {
            /* Hide more than 4 children */
            display: none;
          }

          > * {
            --display: flex;
            --flow: row;
            display: var(--display);
            flex-flow: var(--flow) nowrap;
            align-items: center;
            gap: 0.5rem;

            @media (640px < width) {
              & {
                --flow: column;
              }
            }

            svg {
              color: color-mix(in srgb, currentColor 60%, transparent);
            }
            
            input[type="date"] {
              -webkit-appearance: none; /* Remove arrow in chrome mobile */
              background: transparent;
              width: min-content;
              border: none;
              padding: 0;
              
              font-family: inherit;
              font-size: inherit;
              color: inherit;

              &:disabled {
                /* Allow click on parent to toggle details open/close */
                pointer-events:none;
              }
            }
            
            p {
              --margin: 0 2px; /* match input date */
              text-align: center;
              margin: var(--margin);
            }
          }

          &::-webkit-details-marker {
            display: none;
          }
        }
      `);

      this.shadowRoot.adoptedStyleSheets.push(styles);
    }

    handleEvent(event) {
      if (event.type === "toggle") {
        this.toggleAttribute("open", event.target.open);
      }
    }
  },
);

/**
 *
 * @param {Object} trip - A trip object
 */
export function createTripElementFrom(trip) {
  const tripElement = document.createElement("trip-entry");
  tripElement.data = trip;
  return tripElement;
}

function makeMsgIntroduction(trip) {
  const date =
    trip.date_from_min + (trip.date_from_max != trip.date_from_min ? ` ~ ${trip.date_from_max}` : "");
  return `Hola! Estoy interesado en el vuelo de ${trip.origin} a ${trip.destination} el ${date}`;
}
