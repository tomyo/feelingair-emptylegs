/**
 * @type {CSSStyleSheet?}
 */
let styles = null;

customElements.define(
  "trip-entry",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!styles) this.addStyles();
      if (this.data) this.render();
    }

    /**
     * @param {Object} trip
     */
    render() {
      const trip = this.data;

      this.innerHTML = /*html*/ `
        <details>
        <summary>
          <div class="date">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 14V12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M17 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="18" cy="18" r="3" stroke="#1C274C" stroke-width="1.5"/>
                <path d="M20.5 20.5L22 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input type="date" value="${trip.date_to}" disabled readonly>
            ${
              trip.date_from != trip.date_to
                ? `~ <input type="date" value="${trip.date_from}" disabled readonly>`
                : ""
            }
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16" transform="rotate(55)">
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599"></path>
            </svg>
            <p>${trip.origin}</p>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16" transform="rotate(120)">
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599"></path>
            </svg>
            <p>${trip.destination}</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people-fill mr-2" style="color: #35698d;" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
            </svg>
            <p>${trip.seats}</p>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-airplane-engines mr-2" style="color: #35698d;" viewBox="0 0 16 16">
              <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z"></path>
            </svg>
            <p>${trip.plane}</p>
            </div>
            <div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>${trip.duration || "-"}</p>
          </div>
      
          <div>
            <svg fill="#000000" height="18" width="18" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.009 512.009" xml:space="preserve">
                <g><g><g>
                  <path
                      d="M509.433,298.156c0.283-0.523,0.534-1.058,0.77-1.599c0.043-0.097,0.093-0.19,0.134-0.288
              c0.223-0.531,0.413-1.072,0.592-1.617c0.039-0.119,0.087-0.233,0.124-0.353c0.179-0.581,0.324-1.168,0.453-1.76
              c0.02-0.09,0.047-0.177,0.066-0.268c0.572-2.816,0.572-5.722,0-8.538c-0.018-0.091-0.046-0.177-0.066-0.268
              c-0.128-0.591-0.274-1.179-0.453-1.76c-0.037-0.119-0.085-0.233-0.123-0.351c-0.178-0.545-0.369-1.086-0.592-1.618
              c-0.041-0.098-0.092-0.191-0.134-0.288c-0.236-0.54-0.487-1.076-0.77-1.599c-0.028-0.052-0.062-0.101-0.091-0.154
              c-0.957-1.731-2.157-3.364-3.632-4.829l-64.427-64c-8.359-8.303-21.866-8.259-30.17,0.1c-8.303,8.359-8.259,21.866,0.1,30.17
              l27.715,27.532h-56.646c-11.231-69.768-76.002-128-147.617-128s-136.386,58.232-147.617,128H21.333
              C9.551,266.671,0,276.222,0,288.004c0,11.782,9.551,21.333,21.333,21.333h85.333c11.782,0,21.333-9.551,21.333-21.333
              c0-55.247,51.419-106.667,106.667-106.667s106.667,51.419,106.667,106.667c0,11.782,9.551,21.333,21.333,21.333h76.262
              l-27.715,27.532c-8.359,8.303-8.404,21.811-0.1,30.17s21.811,8.404,30.17,0.1l64.427-64c1.475-1.465,2.675-3.098,3.632-4.829
              C509.371,298.258,509.405,298.209,509.433,298.156z"
                  />
                  <path
                      d="M234.667,202.671c-47.131,0-85.333,38.202-85.333,85.333s38.202,85.333,85.333,85.333S320,335.136,320,288.004
              S281.798,202.671,234.667,202.671z M234.667,330.671c-23.567,0-42.667-19.099-42.667-42.667s19.099-42.667,42.667-42.667
              s42.667,19.099,42.667,42.667S258.234,330.671,234.667,330.671z"
                  />
                </g></g></g>
            </svg>
            <p>${trip.can_land_in || "-"}</p>
          </div>
        </summary>

        <a class="email-button" href="mailto: info@feelingair.com.ar?subject=${makeEmailSubject(
          trip
        )}">
          Contactar por este vuelo ✉️
        </a>
      </details>
    `;
    }

    addStyles() {
      styles = new CSSStyleSheet();
      styles.replace(/*css*/ `
        trip-entry {
          --visible-elements: 3;

          --padding: 0.5rem 1rem;
          padding: var(--padding);
          margin: 1rem;
          border-radius: 0.5rem;
          background-color: #fff;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
          min-width: min-content;
          text-align: center; /* Center CTA button */

          &:hover,
          &:has(details[open]) {
            background-color: var(--hover-bg-color);
          }


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
        
        .email-button {
          display: inline-block;
          background-color: #4CAF50; /* Green */
          border-radius: 2px;
          color: white;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          margin: 1rem 2px;
          cursor: pointer;
          padding: 15px 32px;
          transition-duration: 0.4s;
        }

        .email-button:hover {
          background-color: #45a049;
        }
      `);

      document.adoptedStyleSheets.push(styles);
      console.info("pushed styles", styles);
    }
  }
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

function makeEmailSubject(trip) {
  return `Consulta por vuelo de ${trip.origin} a ${trip.destination} el ${trip.date_from}`;
}
