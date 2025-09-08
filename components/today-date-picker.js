customElements.define(
  "today-date-picker",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.input = this.querySelector("input");
      if (!this.input.value) this.setDateAsToday();
      this.addEventListener("change", this);
      this.updateState();
    }

    handleEvent() {
      this.updateState();
    }

    updateState() {
      if (!this.input.value || isDateToday(this.input.value)) {
        this.toggleAttribute("today", true);
      } else {
        this.removeAttribute("today");
      }
    }

    /**
     * Set the input value to today's date in the user's timezone.
     */
    setDateAsToday() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // months are zero-indexed
      const day = String(today.getDate()).padStart(2, "0");
      this.input.value = `${year}-${month}-${day}`;
    }
  }
);

/**
 *
 * @param {Date} dateOrString - A Date object or a date string in yyyy-mm-dd format.
 * @returns {boolean} True if the date is today.
 */
export function isDateToday(dateOrString) {
  if (!dateOrString) return false;
  const now = new Date();
  let date = new Date(dateOrString);

  if (typeof dateOrString === "string") {
    const [year, month, day] = dateOrString.split("-");
    date = new Date(year, month - 1, day);
  }

  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}
