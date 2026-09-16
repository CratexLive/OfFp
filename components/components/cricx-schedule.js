class CricxSchedule extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set matches(data) {
    this._matches = data;
    this.render();
  }
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
