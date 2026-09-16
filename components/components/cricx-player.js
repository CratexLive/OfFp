class CricxPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hls = null;
  }
  set match(data) {
    this._match = data;
    this.render();
  }
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
