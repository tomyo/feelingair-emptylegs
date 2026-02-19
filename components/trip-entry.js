/**
 * @type {CSSStyleSheet?}
 */
let styles = null;

customElements.define(
  "trip-entry",
  class extends HTMLElement {
    connectedCallback() {
      if (this.data) this.render();
    }

    /**
     * @param {Object} trip
     */
    render() {
      const trip = this.data;

      this.innerHTML = /*html*/ `
        <img src="${trip.plane_image}" loading="lazy">
        <div part="info">
          <dl part="path">
            <div part="origin">
              <dt part="term">Origen</dt>
              <dd part="description">${trip.origin}</dd>
            </div>
            <div part="destination">
              <dt part="term">Destino</dt>
              <dd part="description">${trip.destination}</dd>
            </div>
          </dl>
          <hr>
          <dl part="details">
            <div part="item date-from">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8125 2.125H11.6875V1.0625H10.625V2.125H6.375V1.0625H5.3125V2.125H3.1875C2.60312 2.125 2.125 2.60312 2.125 3.1875V13.8125C2.125 14.3969 2.60312 14.875 3.1875 14.875H13.8125C14.3969 14.875 14.875 14.3969 14.875 13.8125V3.1875C14.875 2.60312 14.3969 2.125 13.8125 2.125ZM13.8125 13.8125H3.1875V6.375H13.8125V13.8125ZM13.8125 5.3125H3.1875V3.1875H5.3125V4.25H6.375V3.1875H10.625V4.25H11.6875V3.1875H13.8125V5.3125Z" fill="currentColor"/>
              </svg>

              <dt>
                Fecha:
              </dt>
              <dd>${trip.dateFromString || trip.date_from_min}</dd>
            </div>
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
        </div>
        <a part="button" class="button" href="https://api.whatsapp.com/send?phone=+5493525457917&text=${makeMsgIntroduction(
          trip,
        )}">
          Cotizar vuelo
        </a>
      `;
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
