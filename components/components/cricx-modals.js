class CricxModals extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .overlay{position:fixed;z-index:999999;inset:0;background:rgba(6,7,5,.88);backdrop-filter:blur(24px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:.4s;padding:16px;}
        .overlay.show{opacity:1;pointer-events:all;}
        .box{background:#0f110d;border:1px solid rgba(216,255,62,0.25);border-radius:24px;padding:36px;width:min(440px,92vw);text-align:center;position:relative;color:#f2efe4;font-family:"DM Sans",sans-serif;}
        .close{position:absolute;top:16px;right:16px;width:32px;height:32px;background:rgba(255,255,255,0.06);color:#f2efe4;border:1px solid rgba(242,239,228,.1);border-radius:50%;display:grid;place-items:center;cursor:pointer;}
        .title{font-family:"Space Grotesk",sans-serif;font-size:26px;font-weight:700;margin-bottom:10px;}
        .desc{font-size:11px;color:#b8b6aa;line-height:1.6;margin-bottom:28px;}
        .btn{height:50px;width:100%;display:flex;align-items:center;justify-content:center;background:#d8ff3e;color:#060705;font-family:"Space Grotesk",sans-serif;font-size:9.5px;font-weight:800;border-radius:12px;text-decoration:none;text-transform:uppercase;}
        .sub{margin-top:16px;background:none;border:0;color:#777970;font-size:9px;font-weight:700;cursor:pointer;}
      </style>
      <div class="overlay show" id="modal1">
        <div class="box">
          <div class="title">Join Telegram</div>
          <div class="desc">Join on Telegram for free streaming links and never miss a match!</div>
          <a class="btn" href="https://t.me/+m4odTq36LL4xNmI1" target="_blank">JOIN NOW ↗</a>
          <button class="sub" id="btnJoined">I've joined</button>
        </div>
      </div>
      <div class="overlay" id="modal2">
        <div class="box">
          <button class="close" id="close2">✕</button>
          <div class="title">Join Telegram</div>
          <div class="desc">Join on Telegram for free streaming links and never miss a match!</div>
          <a class="btn" href="https://t.me/+m4odTq36LL4xNmI1" target="_blank">JOIN NOW ↗</a>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    this.shadowRoot.getElementById('btnJoined').addEventListener('click', () => {
      this.shadowRoot.getElementById('modal1').classList.remove('show');
      this.shadowRoot.getElementById('modal2').classList.add('show');
    });
    this.shadowRoot.getElementById('close2').addEventListener('click', () => {
      this.shadowRoot.getElementById('modal2').classList.remove('show');
    });
  }
}
customElements.define('cricx-modals', CricxModals);
