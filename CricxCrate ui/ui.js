// 1. Navigation Component
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
      </div>
    `;
  }
}
customElements.define('cricx-nav', CricxNav);

// 2. Hero Component
class CricxHero extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  set matches(data) { this._matches = data.slice(0, 7); this.render(); }
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
      </style>
      <div class="hero">
        <div class="hero-art" style="background-image:url('${this._matches[0].image || ''}')"></div>
        <div class="hero-copy">
          <div class="hero-eyebrow"><span class="live-signal"></span>LIVE SIGNAL</div>
          <h1 class="hero-title">${this._matches[0].title || 'Live Match'}</h1>
          <div class="hero-meta"><b>${this._matches[0].tournament || 'Cricket'}</b><i></i>HAPPENING NOW</div>
          <div class="hero-actions">
            <button class="watch" id="watchBtn">WATCH LIVE</button>
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

// 3. Schedule Component
class CricxSchedule extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  set matches(data) { this._matches = data; this.render(); }
  render() {
    if (!this._matches) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;width:100%;}
        .schedule{border-top:1px solid rgba(242,239,228,.1);width:100%;font-family:"DM Sans",sans-serif;}
        .schedule-line{min-height:100px;display:flex;align-items:center;gap:18px;border-bottom:1px solid rgba(242,239,228,.1);cursor:pointer;padding:12px 16px;border-radius:14px;width:100%;transition:.2s;}
        .schedule-line:hover{background:rgba(216,255,62,.03);}
        .schedule-thumb{width:110px;height:70px;border-radius:10px;background-size:contain;background-repeat:no-repeat;background-color:#060705;background-position:center;border:1px solid rgba(242,239,228,.1);flex-shrink:0;}
        .schedule-info-group{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0;}
        .schedule-date{color:#8b8d84;font-size:8.5px;font-weight:600;}
        .schedule-date b{color:#f2efe4;}
        .schedule-match{font-family:"Space Grotesk",sans-serif;font-size:14px;font-weight:700;color:#f2efe4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .schedule-league{color:#9a9c94;font-size:8.5px;letter-spacing:0.8px;font-weight:600;text-transform:uppercase;}
        .schedule-state{flex-shrink:0;color:#8b8d84;font-size:8px;font-weight:800;letter-spacing:1px;padding:6px 14px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid rgba(242,239,228,.1);}
        .schedule-state.live{color:#d8ff3e;background:rgba(216,255,62,.08);border-color:rgba(216,255,62,0.3);}
      </style>
      <div class="schedule">
        ${this._matches.map((m, idx) => `
          <div class="schedule-line" data-index="${idx}">
            <div class="schedule-thumb" style="background-image:url('${m.image || ''}')"></div>
            <div class="schedule-info-group">
              <div class="schedule-date"><b>Live</b></div>
              <div class="schedule-match">${m.title || 'Match'}</div>
              <div class="schedule-league">${m.tournament || 'Sport'}</div>
            </div>
            <div class="schedule-state live">LIVE</div>
          </div>
        `).join('')}
      </div>
    `;
    this.shadowRoot.querySelectorAll('.schedule-line').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.dataset.index;
        this.dispatchEvent(new CustomEvent('select-match', { detail: this._matches[idx], bubbles: true, composed: true }));
      });
    });
  }
}
customElements.define('cricx-schedule', CricxSchedule);
// 4. Sports Component
class CricxSports extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  set sports(data) { this._sports = data; this.render(); }
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

// 5. Player Component
class CricxPlayer extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.hls = null; }
  set match(data) { this._match = data; this.render(); }
  render() {
    if (!this._match) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host{position:fixed;z-index:99999;inset:0;width:100vw;height:100vh;background:#060705;display:flex;flex-direction:column;overflow-y:auto;padding-bottom:60px;font-family:"DM Sans",sans-serif;color:#f2efe4;}
        .player-top-nav{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 34px;background:rgba(6,7,5,.95);backdrop-filter:blur(24px);border-bottom:1px solid rgba(242,239,228,.1);position:sticky;top:0;z-index:50;}
        .player-top-brand{font-family:"Space Grotesk",sans-serif;font-size:14px;font-weight:700;}
        .player-close{background:rgba(255,255,255,0.06);color:#f2efe4;border:1px solid rgba(242,239,228,.1);padding:8px 16px;border-radius:10px;cursor:pointer;font-weight:700;font-family:"Space Grotesk",sans-serif;font-size:9px;}
        .player-content-body{width:min(1300px,calc(100% - 48px));margin:30px auto 0;display:flex;flex-direction:column;gap:24px;}
        .player-rig-box{width:100%;aspect-ratio:16/9;position:relative;background:#000;overflow:hidden;border-radius:18px;border:1px solid rgba(216,255,62,0.3);box-shadow:0 30px 80px rgba(0,0,0,0.8);}
        video{width:100%;height:100%;object-fit:contain;background:#000;display:block;}
        .stream-title strong{font-family:"Space Grotesk",sans-serif;font-size:22px;}
      </style>
      <div class="player-top-nav">
        <div class="player-top-brand">CricxCrate</div>
        <button class="player-close" id="closeBtn">✕ CLOSE</button>
      </div>
      <div class="player-content-body">
        <div class="player-rig-box">
          <video id="video" controls autoplay playsinline></video>
        </div>
        <div class="stream-title">
          <strong>${this._match.title || 'Live Stream'}</strong>
        </div>
      </div>
    `;
    this.shadowRoot.getElementById('closeBtn').addEventListener('click', () => {
      if (this.hls) this.hls.destroy();
      this.remove();
    });
    this.initStream();
  }
  initStream() {
    const video = this.shadowRoot.getElementById('video');
    const streamUrl = this._match.streams?.[0]?.url || this._match.stream_url || '';
    const proxiedUrl = `/?url=${encodeURIComponent(streamUrl)}`;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = proxiedUrl;
      video.play().catch(()=>{});
    } else if (window.Hls && window.Hls.isSupported()) {
      this.hls = new window.Hls();
      this.hls.loadSource(proxiedUrl);
      this.hls.attachMedia(video);
      this.hls.on(window.Hls.Events.MANIFEST_PARSED, () => video.play().catch(()=>{}));
    }
  }
}
customElements.define('cricx-player', CricxPlayer);

// 6. Modals Component
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
