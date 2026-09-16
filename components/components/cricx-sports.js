class CricxSports extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set sports(data) {
    this._sports = data;
    this.render();
  }
  render() {
    if (!this._sports) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;}
        .world-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr;gap:16px;font-family:"DM Sans",sans-serif;}
        .world-card{height:250px;position:relative;overflow:hidden;background:#0f110d;cursor:pointer;border:1px solid rgba(242,239,228,.1);border-radius:16px;}
        .world-card.large{height:300px;}
        .world-art{position:absolute;inset:0;background-size:contain;background-repeat:no-repeat;background-color:#060705;background-position:center;}
        .world-art:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#060705,transparent 70%);}
        .world-copy{position:absolute;z-index:4;left:22px;bottom:20px;color:#f2efe4;}
        .world-number{color:#d8ff3e;font-family:"Space Grotesk",sans-serif;font-size:8px;font-weight:700;}
        .world-name{margin-top:5px;font-family:"Space Grotesk",sans-serif;font-size:32px;letter-spacing:-2px;font-weight:700;}
        .large .world-name{font-size:46px;}
      </style>
      <div class="world-grid">
        ${this._sports.map((s, i) => `
          <div class="world-card ${i===0?'large':''}">
            <div class="world-art" style="background-image:url('${s.image || ''}')"></div>
            <div class="world-copy">
              <div class="world-number">0${i+1}</div>
              <div class="world-name">${s.name}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
customElements.define('cricx-sports', CricxSports);
