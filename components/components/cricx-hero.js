class CricxHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set matches(data) {
    this._matches = data.slice(0, 7);
    this.render();
  }
  render() {
    if (!this._matches || !this._matches.length) return;
    this.shadowRoot.innerHTML = `
      <style>
        .hero{height:94vh;min-height:670px;position:relative;overflow:hidden;background:#060705;}
        .hero-art{position:absolute;inset:0;background-size:contain;background-repeat:no-repeat;background-color:#060705;background-position:center;}
        .hero-art:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg, #060705 15%, rgba(6,7,5,0.92) 50%, rgba(6,7,5,0.2) 75%, rgba(6,7,5,0.7) 100%);}
        .hero-copy{position:absolute;z-index:5;left:max(34px,calc((100% - 1500px)/2));bottom:100px;width:min(850px,80%);color:#f2efe4;font-family:"DM Sans",sans-serif;}
        .hero-eyebrow{display:flex;align-items:center;gap:9px;color:#d8ff3e;font-size:8px;letter-spacing:2px;font-weight:700;}
        .live-signal{width:8px;height:8px;background:#d8ff3e;border-radius:50%;}
        .hero-title{margin-top:10px;font-family:"Space Grotesk",sans-serif;font-size:clamp(22px, 3.2vw, 46px);line-height:1.2;letter-spacing:-1px;font-weight:700;}
        .hero-meta{display:flex;align-items:center;gap:11px;margin-top:12px;color:#b8b6aa;font-size:9px;}
        .hero-meta b{color:#f2efe4;}
        .hero-meta i{width:3px;height:3px;background:#4e5049;border-radius:50%;}
        .hero-actions{display:flex;gap:10px;margin-top:18px;}
        button{border:0;cursor:pointer;font-family:inherit;}
        .watch{height:44px;display:flex;align-items:center;gap:10px;padding:0 22px;color:#060705;background:#d8ff3e;font-size:8px;font-weight:800;border-radius:10px;}
        .info{height:44px;padding:0 18px;color:#f2efe4;background:rgba(242,239,228,.06);border:1px solid rgba(242,239,228,.15);font-size:8px;font-weight:700;border-radius:10px;}
      </style>
      <div class="hero">
        <div class="hero-art" style="background-image:url('${this._matches[0].image || ''}')"></div>
        <div class="hero-copy">
          <div class="hero-eyebrow"><span class="live-signal"></span>LIVE SIGNAL</div>
          <h1 class="hero-title">${this._matches[0].title || 'Live Match'}</h1>
          <div class="hero-meta"><b>${this._matches[0].tournament || 'Cricket'}</b><i></i>HAPPENING NOW</div>
          <div class="hero-actions">
            <button class="watch" id="watchBtn">WATCH LIVE</button>
            <button class="info" id="infoBtn">DETAILS</button>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.getElementById('watchBtn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('watch-match', { detail: this._matches[0], bubbles: true, composed: true }));
    });
  }
}
customElements.define('cricx-hero', CricxHero);
