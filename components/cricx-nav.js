class CricxNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host{position:fixed;z-index:700;top:0;left:0;right:0;height:76px;display:flex;align-items:center;padding:0 34px;background:rgba(6,7,5,.88);backdrop-filter:blur(24px);border-bottom:1px solid rgba(242,239,228,.1);box-shadow:0 10px 30px rgba(0,0,0,0.6);}
        .nav-inner{width:min(1500px,100%);margin:auto;display:flex;align-items:center;width:100%;}
        .brand{display:flex;align-items:center;gap:10px;cursor:pointer;}
        .brand-symbol{width:30px;height:30px;position:relative;background:#d8ff3e;transform:rotate(45deg);border-radius:4px;box-shadow:0 0 15px rgba(216,255,62,.3);}
        .brand-symbol:after{content:"";position:absolute;width:8px;height:8px;left:11px;top:11px;background:#060705;border-radius:2px;}
        .brand-name{font-family:"Space Grotesk",sans-serif;font-size:14px;font-weight:700;letter-spacing:-.5px;color:#f2efe4;}
        .nav-links{display:flex;gap:4px;margin-left:52px;}
        button{background:none;border:0;cursor:pointer;font-family:"DM Sans",sans-serif;}
        .nav-links button{position:relative;color:#77786f;padding:9px 14px;font-size:9px;letter-spacing:1.3px;font-weight:700;border-radius:6px;transition:.3s;}
        .nav-links button:hover,.nav-links button.active{color:#f2efe4;background:rgba(255,255,255,0.03);}
        .nav-right{margin-left:auto;display:flex;gap:8px;}
        .nav-icon{width:38px;height:38px;display:grid;place-items:center;color:#f2efe4;background:rgba(242,239,228,.04);border:1px solid rgba(242,239,228,.1);border-radius:10px;}
        .nav-icon svg{width:15px;height:15px;stroke:currentColor;fill:none;}
        @media(max-width:900px){:host{padding:0 18px;}.nav-links{display:none;}}
      </style>
      <div class="nav-inner">
        <div class="brand" id="brandBtn">
          <div class="brand-symbol"></div>
          <div class="brand-name">CricxCrate</div>
        </div>
        <nav class="nav-links">
          <button class="active" data-page="home">HOME</button>
          <button data-page="live">LIVE</button>
          <button data-page="sports">SPORTS</button>
          <button data-page="schedule">SCHEDULE</button>
        </nav>
        <div class="nav-right">
          <button class="nav-icon" id="searchBtn">
            <svg viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>
          </button>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll('.nav-links button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('navigate', { detail: btn.dataset.page, bubbles: true, composed: true }));
      });
    });
    this.shadowRoot.getElementById('brandBtn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navigate', { detail: 'home', bubbles: true, composed: true }));
    });
  }
}
customElements.define('cricx-nav', CricxNav);
