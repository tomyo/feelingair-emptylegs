const root = document.documentElement;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// React to theme changes on user's system preference
prefersDarkScheme.onchange = (e) => (root.dataset.theme = e.matches ? "🌑" : "☀️");

// Initialize theme based on user's system preference
if (!root.dataset.theme) root.dataset.theme = prefersDarkScheme.matches ? "🌑" : "☀️";

customElements.define(
  "theme-switch",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.addEventListener("click", this);
    }

    handleEvent() {
      // React on user toggling the current theme
      root.dataset.theme = root.dataset.theme === "☀️" ? "🌑" : "☀️";
    }
  }
);
