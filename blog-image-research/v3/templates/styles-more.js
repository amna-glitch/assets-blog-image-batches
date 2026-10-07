// Styles 14+ for the Honest Taskers cover system. Loaded after cover.html's main script and reuses its helpers
// (s, c, add, css, photo, htIcon, dateTile, clockTile, chartTile, arc). Key content stays in the listing band (y < 353).
(() => {
  const B = '#2345ff', D = '#162da1', M = '#3e59ff', T = '#2dd0e8', TI = '#eef1ff', INK = '#0b1440', NAVY = '#0d1a63', AQ = '#e2f8fb';
  const F = 'var(--font)';
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute">
    <filter id="duoBT" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/>
      <feComponentTransfer><feFuncR type="table" tableValues="0.086 0.176"/><feFuncG type="table" tableValues="0.176 0.816"/><feFuncB type="table" tableValues="0.631 0.91"/></feComponentTransfer></filter>
    <filter id="duoNW" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/>
      <feComponentTransfer><feFuncR type="table" tableValues="0.051 1"/><feFuncG type="table" tableValues="0.102 1"/><feFuncB type="table" tableValues="0.388 1"/></feComponentTransfer></filter>
    <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2.4" fill="${B}"/></pattern>
    <mask id="halftone"><rect width="1200" height="630" fill="url(#dots)"/></mask></svg>`);
  const ico = (n, size, stroke = 8, col = B, acc = T) => htIcon(n, size, stroke, col, acc);
  const txt = (x, y, html, st = '') => add('abs', css({ left: x, top: y }), `<div style="font-family:${F};${st}">${html}</div>`);
  const bg = col => { c.style.background = col; };
  const svg = (inner) => add('abs', { left: 0, top: 0 }, `<svg width="1200" height="630">${inner}</svg>`);
  const tile = (x, y, w, h, html, extra = {}) => add('chip', css({ left: x, top: y, width: w, height: h, ...extra }), html);
  const S = {};

  // 14 Soft gradient + one glass card (Stripe / Intercom brand gradients, toned down)
  S.mesh = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `radial-gradient(60% 80% at 20% 10%, ${T}, transparent), radial-gradient(60% 90% at 85% 20%, ${B}, transparent), ${D}` }));
    add('card', css({ left: 380, top: 70, width: 440, padding: '26px 30px', background: 'rgba(255,255,255,.92)' }),
      `<div class="row"><div style="width:56px;height:56px;border-radius:16px;background:${TI};display:flex;align-items:center;justify-content:center">${ico(s.icon, 36, 9)}</div><div class="t1">${s.head}</div></div>
       <div style="margin-top:16px;font:500 21px ${F};color:#5b6488">${s.sub}</div>`);
  };
  // 15 Halftone photo (Slack / Webflow editorial)
  S.halftone = () => {
    bg(TI);
    const p = photo(s.photo, s.focal, 0, 0, 1200, 630, 600, 170, 1.15, 'gray');
    // Halftone: the photo is cut into round dots, then tinted brand blue.
    const m = 'radial-gradient(circle, #000 52%, transparent 58%)';
    Object.assign(p.style, { maskImage: m, webkitMaskImage: m, maskSize: '10px 10px', webkitMaskSize: '10px 10px' });
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: B, mixBlendMode: 'screen' }));
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `linear-gradient(90deg, ${TI} 0 20%, transparent 40%)` }));
    tile(150, 110, 140, 140, ico(s.icon, 80, 8));
  };
  // 16 Full-bleed duotone, deep blue to teal (Dropbox / Spotify-style duotone)
  S.duotone2 = () => { photo(s.photo, s.focal, 0, 0, 1200, 630, 600, 170, 1.2, 'duoBT'); };
  // 17 Cut-out on colour block (Grammarly / HubSpot)
  S.block = () => {
    bg('#f3f5ff');
    add('abs', css({ left: 520, top: 40, width: 420, height: 300, background: T, borderRadius: 24 }));
    photo(s.photo, s.focal, 300, 20, 440, 333, 220, 120, 1.25, 'gray', '24px');
    tile(700, 230, 110, 110, ico(s.icon, 62, 9), { borderRadius: 28 });
  };
  // 18 Sticker collage (Miro / Canva)
  S.stickers = () => {
    bg(B);
    (s.icons || ['calendar', 'phone', 'clipboard', 'heart', 'check']).forEach((n, i) => {
      const pos = [[300, 70, -8], [480, 40, 6], [660, 80, -4], [840, 50, 9], [560, 200, -3]][i];
      tile(pos[0], pos[1], 150, 150, ico(n, 92, 8), { transform: `rotate(${pos[2]}deg)`, borderRadius: 32, border: '6px solid #fff' });
    });
  };
  // 19 Sticky-note board (Miro)
  S.sticky = () => {
    bg('#f7f8fc'); svg(`<pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#c9d1ff"/></pattern><rect width="1200" height="630" fill="url(#g)"/>`);
    (s.notes || []).forEach((n, i) => {
      const col = [T, '#c9d1ff', '#ffffff', '#9ee8f3', '#dfe5ff'][i % 5], x = 210 + i * 170, y = i % 2 ? 120 : 60, r = [-4, 3, -2, 5, -3][i % 5];
      add('abs', css({ left: x, top: y, width: 160, height: 160, background: col, transform: `rotate(${r}deg)`, boxShadow: '0 10px 20px rgba(15,30,110,.12)',
        padding: '18px', font: `600 21px/1.2 ${F}`, color: INK }), n);
    });
  };
  // 20 Kanban board (ClickUp / Asana / monday.com)
  S.kanban = () => {
    bg(TI);
    const cols = s.cols || [['To do', ['Insurance checks', 'Refill calls']], ['Doing', ['Prior auth']], ['Done', ['Reminders sent', 'Intake forms']]];
    cols.forEach(([h, cards], i) => {
      const x = 250 + i * 240;
      add('abs', css({ left: x, top: 34, width: 220, height: 320, background: '#fff', borderRadius: 18, padding: '16px' }),
        `<div style="font:700 18px ${F};color:${[M, B, T][i]};letter-spacing:.06em;text-transform:uppercase">${h}</div>` +
        cards.map(t => `<div style="margin-top:12px;padding:14px;border-radius:12px;background:${i == 2 ? 'rgba(45,208,232,.14)' : '#f4f6fe'};font:600 19px ${F};color:${INK}">${t}</div>`).join(''));
    });
  };
  // 21 Chat thread (Intercom / Help Scout / Zendesk)
  S.chat = () => {
    bg(AQ);
    const msgs = s.msgs || [];
    msgs.forEach(([who, t], i) => {
      const me = who === 'va';
      add('abs', css({ left: me ? 600 : 330, top: 36 + i * 96, maxWidth: 380, padding: '16px 22px', borderRadius: me ? '24px 24px 6px 24px' : '24px 24px 24px 6px',
        background: me ? B : '#fff', color: me ? '#fff' : INK, font: `500 22px/1.3 ${F}`, boxShadow: '0 10px 24px rgba(15,30,110,.10)' }), t);
    });
  };
  // 22 Phone call screen (Aircall)
  S.phone = () => {
    bg(D);
    add('abs', css({ left: 470, top: 26, width: 260, height: 520, borderRadius: 44, background: '#fff', border: '10px solid #0b1440', overflow: 'hidden' }),
      `<div style="background:${B};height:100%;padding:44px 24px;text-align:center;color:#fff">
        <div style="width:96px;height:96px;border-radius:50%;background:rgba(255,255,255,.18);margin:0 auto;display:flex;align-items:center;justify-content:center">${ico(s.icon || 'person', 58, 8, '#fff', T)}</div>
        <div style="font:700 26px ${F};margin-top:18px">${s.caller}</div><div style="font:500 18px ${F};opacity:.8;margin-top:6px">${s.state}</div>
        <div style="font:600 22px ${F};margin-top:16px;color:${T}">04:12</div></div>`);
    tile(780, 90, 120, 120, ico('headset', 70, 8)); tile(300, 160, 120, 120, ico('calendar', 70, 8));
  };
  // 23 Month calendar (Calendly-style scheduling, in brand blue)
  S.month = () => {
    bg('#fff');
    let g = ''; const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    days.forEach((d, i) => g += `<text x="${330 + i * 78}" y="70" font-family="Inter" font-weight="700" font-size="20" fill="#8a90b0" text-anchor="middle">${d}</text>`);
    for (let i = 0; i < 28; i++) { const x = 330 + (i % 7) * 78, y = 110 + Math.floor(i / 7) * 62, hot = (s.hot || [9, 10, 16, 23]).includes(i);
      g += `<circle cx="${x}" cy="${y}" r="24" fill="${hot ? B : '#f2f4fd'}"/><text x="${x}" y="${y + 7}" font-family="Inter" font-weight="600" font-size="19" fill="${hot ? '#fff' : INK}" text-anchor="middle">${i + 1}</text>`; }
    svg(g); add('abs', css({ left: 296, top: 30, width: 610, height: 340, borderRadius: 26, border: `2px solid ${TI}` }));
  };
  // 24 Checklist on paper (ClickUp checklists / Ahrefs how-to)
  S.checklist = () => {
    bg(T);
    add('card', css({ left: 400, top: 30, width: 400, height: 520, padding: '30px 34px', transform: 'rotate(-2deg)' }),
      `<div style="font:700 28px ${F};color:${INK}">${s.head}</div>` + (s.items || []).map((t, i) => `<div style="display:flex;gap:14px;align-items:center;margin-top:18px;font:500 21px ${F};color:${INK}">
        <span style="width:28px;height:28px;border-radius:8px;flex:none;${i < (s.done ?? 3) ? `background:${B};` : `border:3px solid #c9d1ff;`}display:flex;align-items:center;justify-content:center">${i < (s.done ?? 3) ? '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8l3 3 7-7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>' : ''}</span>${t}</div>`).join(''));
  };
  // 25 Isometric blocks (Zapier / Airtable)
  S.iso = () => {
    bg(TI);
    const cube = (x, y, col, top) => `<g transform="translate(${x},${y})"><path d="M0 30 L60 0 L120 30 L60 60Z" fill="${top}"/><path d="M0 30 L60 60 L60 130 L0 100Z" fill="${col}"/><path d="M120 30 L60 60 L60 130 L120 100Z" fill="${D}"/></g>`;
    svg(cube(400, 150, M, '#c9d1ff') + cube(520, 90, B, '#dfe5ff') + cube(640, 150, M, '#c9d1ff') + cube(520, 210, B, T) +
      `<path d="M330 260 C 360 200, 380 200, 410 210" stroke="${B}" stroke-width="4" fill="none" stroke-dasharray="2 10" stroke-linecap="round"/>`);
    tile(260, 60, 110, 110, ico(s.icon || 'document', 62, 9)); tile(820, 80, 110, 110, ico(s.icon2 || 'check', 62, 9));
  };
  // 26 Pattern tiles (Loom fallback patterns)
  S.pattern = () => {
    bg(s.field === 'deep' ? D : B);
    const names = s.icons || ['tooth', 'calendar', 'phone', 'clipboard', 'heart', 'stethoscope'];
    let k = 0; for (let y = -30; y < 380; y += 130) for (let x = -40; x < 1240; x += 130) {
      add('abs', css({ left: x + (Math.floor(y / 130) % 2 ? 65 : 0), top: y, opacity: .22 }), ico(names[k++ % names.length], 90, 6, '#fff', '#fff'));
    }
    tile(520, 90, 160, 160, ico(s.icon, 100, 7), { borderRadius: 40 });
  };
  // 27 Bauhaus geometry (Figma blog shapes)
  S.bauhaus = () => {
    bg('#f3f5ff');
    svg(`<circle cx="430" cy="170" r="130" fill="${B}"/><rect x="560" y="40" width="200" height="200" fill="${T}"/><path d="M780 340 L900 100 L1020 340Z" fill="${D}"/>
      <rect x="560" y="240" width="200" height="100" rx="50" fill="${M}"/><circle cx="430" cy="170" r="48" fill="#fff"/>`);
    add('abs', css({ left: 395, top: 135 }), ico(s.icon, 70, 9, INK, B));
  };
  // 28 Big quote (testimonial covers)
  S.quote = () => {
    bg(D);
    txt(150, 10, '&ldquo;', `font:700 260px/1 ${F};color:${T}`);
    txt(300, 70, s.quote, `width:720px;font:600 44px/1.18 ${F};color:#fff;letter-spacing:-.01em`);
    txt(300, 270, s.who, `font:600 20px ${F};color:${T};letter-spacing:.08em;text-transform:uppercase`);
  };
  // 29 Line chart (Hotjar / Ahrefs data posts)
  S.linechart = () => {
    bg('#fff');
    const pts = s.pts || [.8, .7, .74, .55, .5, .38, .3, .22], X = i => 260 + i * 100, Y = v => 40 + v * 280;
    let p = pts.map((v, i) => `${i ? 'L' : 'M'}${X(i)} ${Y(v)}`).join(' ');
    let grid = ''; for (let i = 0; i < 5; i++) grid += `<line x1="240" x2="980" y1="${40 + i * 70}" y2="${40 + i * 70}" stroke="#eef0f7" stroke-width="2"/>`;
    svg(grid + `<path d="${p} L${X(pts.length - 1)} 330 L${X(0)} 330Z" fill="${TI}"/><path d="${p}" stroke="${B}" stroke-width="6" fill="none" stroke-linejoin="round"/>
      <circle cx="${X(pts.length - 1)}" cy="${Y(pts[pts.length - 1])}" r="14" fill="${T}" stroke="#fff" stroke-width="5"/>`);
    tile(780, 40, 210, 64, `<div style="font:700 22px ${F};color:${INK};white-space:nowrap">${s.tag}</div>`, { borderRadius: 18 });
  };
  // 30 Donut (Ahrefs / Stripe research)
  S.donut = () => {
    bg(TI);
    const v = s.pct ?? .65, r = 120, C = 2 * Math.PI * r;
    svg(`<circle cx="600" cy="180" r="${r}" fill="none" stroke="#c9d1ff" stroke-width="48"/>
      <circle cx="600" cy="180" r="${r}" fill="none" stroke="${B}" stroke-width="48" stroke-dasharray="${C * v} ${C}" transform="rotate(-90 600 180)" stroke-linecap="round"/>`);
    add('abs', css({ left: 540, top: 120 }), ico(s.icon, 120, 7, B, T));
  };
  // 31 Map with pins (global / offshore posts)
  S.map = () => {
    bg(D);
    let g = ''; for (let y = 20; y < 360; y += 16) for (let x = 140; x < 1060; x += 16) {
      const nx = (x - 600) / 430, ny = (y - 190) / 170, land = Math.sin(nx * 5.2) * Math.cos(ny * 4.1) + Math.sin(nx * 2 + ny * 3) * .6 > -.25 && nx * nx + ny * ny * 1.4 < 1.05;
      if (land) g += `<circle cx="${x}" cy="${y}" r="3.4" fill="#3e59ff"/>`; }
    (s.pins || [[350, 150], [820, 210]]).forEach(([x, y], i) => g += `<circle cx="${x}" cy="${y}" r="16" fill="${i ? T : '#fff'}"/><circle cx="${x}" cy="${y}" r="34" fill="none" stroke="${i ? T : '#fff'}" stroke-width="3" opacity=".6"/>`);
    const [[a, b], [c2, d]] = s.pins || [[350, 150], [820, 210]];
    g += `<path d="M${a} ${b} Q ${(a + c2) / 2} ${Math.min(b, d) - 140} ${c2} ${d}" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="3 9" stroke-linecap="round"/>`;
    svg(g);
  };
  // 32 Numbered steps (how-to posts)
  S.steps = () => {
    bg('#fff');
    (s.steps || []).forEach((t, i) => {
      const x = 230 + i * 260;
      add('abs', css({ left: x, top: 60, width: 220 }), `<div style="font:700 96px/1 ${F};color:${i === s.steps.length - 1 ? B : '#c9d1ff'}">0${i + 1}</div>
        <div style="height:5px;width:60px;border-radius:3px;background:${i === s.steps.length - 1 ? T : '#e3e7f6'};margin:18px 0"></div>
        <div style="font:600 26px/1.2 ${F};color:${INK}">${t}</div>`);
    });
  };
  // 33 Before / after slider (comparison posts)
  S.slider = () => {
    photo(s.photo2, s.focal2, 0, 0, 600, 630, 330, 170, 1.3, 'gray');
    photo(s.photo, s.focal, 600, 0, 600, 630, 270, 170, 1.3);
    add('abs', css({ left: 597, top: 0, width: 6, height: 630, background: '#fff' }));
    tile(560, 140, 80, 80, `<svg width="40" height="24" viewBox="0 0 40 24"><path d="M12 4 L4 12 L12 20 M28 4 L36 12 L28 20" stroke="${B}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`, { borderRadius: '50%' });
    txt(40, 30, s.left || 'In-house', `font:700 18px ${F};color:#fff;background:rgba(11,20,64,.55);padding:8px 14px;border-radius:999px;letter-spacing:.06em;text-transform:uppercase`);
    txt(1050, 30, s.right || 'Virtual', `font:700 18px ${F};color:${INK};background:${T};padding:8px 14px;border-radius:999px;letter-spacing:.06em;text-transform:uppercase`);
  };
  // 34 Envelope (email / patient messaging posts, Mailchimp-adjacent)
  S.envelope = () => {
    bg(T);
    svg(`<rect x="380" y="90" width="440" height="270" rx="22" fill="#fff"/><path d="M380 112 L600 260 L820 112" stroke="${INK}" stroke-width="6" fill="none" stroke-linejoin="round"/>
      <rect x="430" y="20" width="340" height="150" rx="14" fill="${TI}" transform="rotate(-4 600 95)"/>`);
    txt(470, 46, s.line1, `font:700 26px ${F};color:${INK};transform:rotate(-4deg)`);
    txt(470, 86, s.line2, `font:500 20px ${F};color:#5b6488;transform:rotate(-4deg)`);
  };
  // 35 Magazine cover (Pitch / Dropbox editorial)
  S.magazine = () => {
    bg('#f3f5ff');
    add('abs', css({ left: 420, top: 18, width: 360, height: 500, background: B, borderRadius: 6, boxShadow: '0 30px 60px rgba(15,30,110,.28)', overflow: 'hidden' }));
    photo(s.photo, s.focal, 440, 110, 320, 300, 160, 110, 1.6, 'duoNW');
    txt(446, 34, s.mast || 'THE DESK', `font:800 56px/1 ${F};color:#fff;letter-spacing:-.03em`);
    txt(446, 412, s.cover, `width:300px;font:600 22px/1.2 ${F};color:#fff`);
  };
  // 36 Polaroid stack (day-in-the-life)
  S.polaroid = () => {
    bg(AQ);
    [[360, 50, -8, s.photo2, s.focal2], [520, 30, 5, s.photo, s.focal]].forEach(([x, y, r, p, f]) => {
      const fr = add('abs', css({ left: x, top: y, width: 320, height: 330, background: '#fff', transform: `rotate(${r}deg)`, boxShadow: '0 18px 36px rgba(15,30,110,.18)' }));
      const tmp = photo(p, f, x + 16, y + 16, 288, 250, 144, 100, 1.5); tmp.style.transform = `rotate(${r}deg)`; tmp.style.transformOrigin = `${160 - 16}px ${165 - 16}px`;
    });
    txt(560, 310, s.caption, `font:600 22px 'Segoe Script','Bradley Hand',cursive;color:${INK};transform:rotate(5deg)`);
  };
  // 37 Blueprint grid (systems / process)
  S.blueprint = () => {
    bg(D);
    svg(`<pattern id="bp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1.5"/></pattern><rect width="1200" height="630" fill="url(#bp)"/>
      <rect x="360" y="60" width="480" height="260" rx="12" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/>
      <line x1="360" y1="40" x2="840" y2="40" stroke="${T}" stroke-width="2"/><line x1="360" y1="32" x2="360" y2="48" stroke="${T}" stroke-width="2"/><line x1="840" y1="32" x2="840" y2="48" stroke="${T}" stroke-width="2"/>`);
    add('abs', css({ left: 490, top: 70 }), ico(s.icon, 220, 5, '#fff', T));
  };
  // 38 Dark UI panel (Vercel / Linear product posts)
  S.darkui = () => {
    bg('#070b24');
    add('abs', css({ left: 300, top: 40, width: 600, height: 300, borderRadius: 20, background: '#11173a', border: '1px solid #232b5c', padding: '24px 28px' }),
      `<div style="font:600 18px 'IBM Plex Mono',monospace;color:#8a92c8">${s.path}</div>` +
      (s.lines || []).map(([k, v], i) => `<div style="display:flex;justify-content:space-between;margin-top:18px;font:500 22px 'IBM Plex Mono',monospace"><span style="color:#cfd5ff">${k}</span><span style="color:${i === s.lines.length - 1 ? T : '#7d8dff'}">${v}</span></div>`).join(''));
  };
  // 39 Paper cut-out layers (Headspace)
  S.papercut = () => {
    bg('#2dd0e8');
    svg(`<path d="M0 260 C 200 160, 400 320, 600 220 S 1000 140, 1200 240 V630 H0Z" fill="${M}"/>
      <path d="M0 300 C 240 230, 480 360, 720 280 S 1060 230, 1200 290 V630 H0Z" fill="${B}"/>
      <path d="M0 340 C 300 300, 520 380, 800 330 S 1100 320, 1200 340 V630 H0Z" fill="${D}"/>
      <circle cx="860" cy="110" r="64" fill="#fff"/>`);
    add('abs', css({ left: 470, top: 40 }), ico(s.icon, 200, 6, INK, '#fff'));
  };
  // 40 Organic blob character (Headspace / Modern Health wellness)
  S.blob = () => {
    bg('#f3f5ff');
    add('abs', css({ left: 440, top: 30, width: 320, height: 300, background: B, borderRadius: '58% 42% 52% 48% / 46% 54% 46% 54%' }));
    svg(`<circle cx="560" cy="160" r="12" fill="#fff"/><circle cx="640" cy="160" r="12" fill="#fff"/><path d="M565 215 Q 600 245 635 215" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="${s.mood === 'tired' ? 420 : 820}" cy="90" r="40" fill="${T}"/>`);
    tile(800, 220, 110, 110, ico(s.icon, 62, 9), { borderRadius: 30 });
  };
  // 41 Icon grid with one highlight (listicles of tasks)
  S.icongrid = () => {
    bg('#fff');
    const names = ['calendar', 'phone', 'clipboard', 'document', 'shield', 'coin', 'heart', 'people', 'laptop', 'rx', 'magnifier', 'globe'];
    names.forEach((n, i) => { const x = 270 + (i % 6) * 112, y = 50 + Math.floor(i / 6) * 130, on = n === s.icon;
      tile(x, y, 96, 96, ico(n, 54, on ? 9 : 7, on ? '#fff' : '#9aa3cc', on ? T : '#9aa3cc'), { background: on ? B : '#f4f6fe', boxShadow: on ? '0 16px 30px rgba(35,69,255,.35)' : 'none', borderRadius: 24 }); });
  };
  // 42 Giant question (FAQ / interview posts)
  S.question = () => {
    bg(TI);
    txt(250, -40, '?', `font:800 460px/1 ${F};color:${B}`);
    add('card', css({ left: 560, top: 90, width: 420, padding: '24px 28px' }), `<div style="font:600 18px ${F};color:${M};letter-spacing:.08em;text-transform:uppercase">Asked often</div><div style="font:700 30px/1.2 ${F};color:${INK};margin-top:10px">${s.q}</div>`);
  };
  // 43 ID badge (job descriptions / role spotlights)
  S.badge = () => {
    bg(B);
    svg(`<path d="M600 0 L600 60" stroke="${T}" stroke-width="10"/>`);
    add('abs', css({ left: 470, top: 50, width: 260, height: 360, borderRadius: 26, background: '#fff', boxShadow: '0 24px 50px rgba(11,20,64,.3)', overflow: 'hidden' }),
      `<div style="height:70px;background:${D}"></div>`);
    photo(s.photo, s.focal, 540, 80, 120, 120, 60, 50, 2.6, '', '50%');
    txt(470, 214, `<div style="width:260px;text-align:center;font:700 23px ${F};color:${INK}">${s.role}</div><div style="width:260px;text-align:center;font:500 17px ${F};color:#6b7396;margin-top:6px">${s.team}</div>`);
  };
  // 44 Receipt (billing / payment posting)
  S.receipt = () => {
    bg(AQ);
    add('abs', css({ left: 450, top: 20, width: 300, height: 400, background: '#fff', boxShadow: '0 20px 40px rgba(15,30,110,.15)', padding: '28px', clipPath: 'polygon(0 0,100% 0,100% 94%,92% 100%,84% 94%,76% 100%,68% 94%,60% 100%,52% 94%,44% 100%,36% 94%,28% 100%,20% 94%,12% 100%,4% 94%,0 100%)' }),
      `<div style="font:700 24px ${F};color:${INK}">${s.head}</div><div style="border-top:2px dashed #dfe3f0;margin:16px 0"></div>` +
      (s.rows || []).map(([a, b]) => `<div style="display:flex;justify-content:space-between;margin-top:14px;font:500 20px ${F};color:${INK}"><span>${a}</span><span style="color:${B};font-weight:700">${b}</span></div>`).join(''));
    tile(780, 70, 110, 110, ico('check', 62, 9));
  };
  // 45 Intake form (intake / forms posts)
  S.form = () => {
    bg(TI);
    add('card', css({ left: 350, top: 30, width: 500, padding: '26px 30px' }), `<div style="font:700 26px ${F};color:${INK}">${s.head}</div>` +
      (s.fields || []).map(([l, v], i) => `<div style="margin-top:16px;font:600 16px ${F};color:#6b7396;text-transform:uppercase;letter-spacing:.06em">${l}</div>
       <div style="margin-top:6px;padding:12px 16px;border-radius:12px;border:2px solid ${i === 1 ? B : '#e3e7f6'};font:500 20px ${F};color:${INK}">${v}</div>`).join(''));
  };
  // 46 Venn diagram (role overlap / comparisons, Miro whiteboards)
  S.venn = () => {
    bg('#fff');
    svg(`<circle cx="520" cy="190" r="150" fill="${B}" fill-opacity=".85"/><circle cx="700" cy="190" r="150" fill="${T}" fill-opacity=".8" style="mix-blend-mode:multiply"/>`);
    txt(410, 170, s.a, `font:700 26px ${F};color:#fff`); txt(730, 170, s.b, `font:700 26px ${F};color:${INK}`);
    add('abs', css({ left: 572, top: 150 }), ico('check', 76, 9, '#fff', '#fff'));
  };
  // 47 Orbit diagram (integrations / tools roundups, Webflow)
  S.orbit = () => {
    bg(D);
    svg(`<circle cx="600" cy="185" r="110" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/><circle cx="600" cy="185" r="170" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`);
    tile(540, 125, 120, 120, ico(s.icon, 70, 8), { borderRadius: 30 });
    (s.items || []).forEach((t, i) => { const a = -Math.PI / 2 + i * (2 * Math.PI / s.items.length), r = i % 2 ? 110 : 170;
      add('abs', css({ left: 600 + r * Math.cos(a) - 60, top: 185 + r * Math.sin(a) - 22, width: 120, padding: '10px 0', borderRadius: 999, background: '#fff', textAlign: 'center', font: `700 17px ${F}`, color: INK }), t); });
  };
  // 48 Browser tabs collage (tool roundups)
  S.tabs = () => {
    bg(TI);
    (s.tabs || []).forEach((t, i) => {
      const x = 260 + i * 70, y = 40 + i * 40;
      add('card', css({ left: x, top: y, width: 520, height: 260, borderRadius: 16, overflow: 'hidden' }),
        `<div style="height:40px;background:${[M, B, D][i % 3]};display:flex;align-items:center;padding:0 16px;font:600 17px ${F};color:#fff">${t}</div>
         <div style="padding:20px;display:grid;gap:12px"><div style="height:14px;width:300px;border-radius:7px;background:#e3e7f6"></div><div style="height:14px;width:240px;border-radius:7px;background:#e3e7f6"></div></div>`);
    });
  };
  // 49 Annotated photo (Hotjar tips posts)
  S.annotate = () => {
    photo(s.photo, s.focal, 0, 0, 1200, 630, 520, 170, 1.25);
    svg(`<circle cx="520" cy="${170}" r="120" fill="none" stroke="${T}" stroke-width="7"/><path d="M660 120 C 720 80, 780 80, 830 100" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M815 86 L834 101 L812 114" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    txt(850, 76, s.note, `font:700 26px 'Segoe Script','Bradley Hand',cursive;color:#fff;background:${B};padding:8px 16px;border-radius:12px;transform:rotate(-3deg)`);
  };
  // 50 Spotlight (role focus)
  S.spotlight = () => {
    photo(s.photo, s.focal, 0, 0, 1200, 630, 600, 170, 1.25, 'gray');
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `radial-gradient(circle 170px at 600px 170px, transparent 98%, rgba(13,26,99,.82) 100%)` }));
    svg(`<circle cx="600" cy="170" r="170" fill="none" stroke="${T}" stroke-width="6"/>`);
  };
  // 51 Headshot grid (company roundups / teams)
  S.faces = () => {
    bg('#fff');
    (s.photos || []).forEach(([p, f], i) => {
      const x = 260 + (i % 4) * 175, y = 30 + Math.floor(i / 4) * 175;
      photo(p, f, x, y, 160, 160, 80, 60, 2.4, i === (s.pick ?? 1) ? '' : 'gray', '28px');
      if (i === (s.pick ?? 1)) add('abs', css({ left: x - 6, top: y - 6, width: 172, height: 172, borderRadius: 32, border: `5px solid ${B}` }));
    });
  };
  // 52 Certificate seal (training / certification)
  S.seal = () => {
    bg('#f3f5ff');
    add('card', css({ left: 330, top: 30, width: 540, height: 320, borderRadius: 14, border: `10px solid ${TI}`, padding: '34px 40px' }),
      `<div style="font:600 18px ${F};color:${M};letter-spacing:.12em;text-transform:uppercase">${s.eyebrow}</div><div style="font:700 36px/1.15 ${F};color:${INK};margin-top:12px;width:300px">${s.head}</div>`);
    svg(`<g transform="translate(760 230)">${Array.from({ length: 24 }, (_, i) => `<circle r="12" cx="${70 * Math.cos(i / 24 * 6.283)}" cy="${70 * Math.sin(i / 24 * 6.283)}" fill="${B}"/>`).join('')}<circle r="70" fill="${B}"/><circle r="52" fill="none" stroke="#fff" stroke-width="3"/></g>`);
    add('abs', css({ left: 726, top: 196 }), ico(s.icon || 'check', 68, 9, '#fff', T));
  };
  // 53 Swiss poster (strategy pieces, Squarespace)
  S.swiss = () => {
    bg('#fff');
    add('abs', css({ left: 0, top: 0, width: 420, height: 630, background: B }));
    add('abs', css({ left: 420, top: 0, width: 160, height: 353, background: T }));
    txt(60, 40, s.big, `font:800 150px/.86 ${F};color:#fff;letter-spacing:-.05em`);
    txt(640, 60, s.small, `width:440px;font:600 36px/1.15 ${F};color:${INK}`);
    add('abs', css({ left: 640, top: 250 }), ico(s.icon, 80, 7, INK, B));
  };
  // 54 Transcript (scribe / documentation posts)
  S.transcript = () => {
    bg(AQ);
    svg(Array.from({ length: 40 }, (_, i) => { const h = 20 + 80 * Math.abs(Math.sin(i * .6)); return `<rect x="${250 + i * 9}" y="${180 - h / 2}" width="5" height="${h}" rx="2.5" fill="${B}"/>`; }).join('') +
      `<path d="M630 180 L680 180" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M668 168 L682 180 L668 192" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    add('card', css({ left: 710, top: 50, width: 300, padding: '22px 24px' }), `<div style="font:700 22px ${F};color:${INK}">${s.head}</div>` +
      (s.lines || []).map(t => `<div style="margin-top:12px;font:500 18px/1.35 ${F};color:#5b6488"><b style="color:${B}">${t[0]}</b> ${t[1]}</div>`).join(''));
  };

  // 55 Versus stack (Hotjar / Contentsquare comparison posts)
  S.vsstack = () => {
    bg('#c9d1ff');
    (s.items || []).forEach((t, i) => {
      if (i) txt(560, 40 + i * 100 - 30, 'vs', `width:80px;text-align:center;font:700 18px ${F};color:${D};letter-spacing:.1em;text-transform:uppercase`);
      add('chip', css({ left: 430, top: 40 + i * 100, width: 340, height: 72, borderRadius: 14, flexDirection: 'row', gap: '14px' }),
        `${ico(s.icons[i], 38, 9)}<div style="font:700 26px ${F};color:${INK}">${t}</div>`);
    });
  };
  // 56 Spot circle (Grammarly)
  S.spot = () => {
    bg(D);
    add('abs', css({ left: 600, top: -80, width: 440, height: 440, borderRadius: '50%', background: T }));
    txt(680, 120, s.phrase, `width:300px;font:700 38px/1.12 ${F};color:${INK}`);
    add('abs', css({ left: 150, top: 40 }), ico(s.icon, 70, 8, '#fff', T));
  };
  // 57 Serif headline + UI panel (Aircall)
  S.serifui = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `linear-gradient(120deg, #f6f7ff, ${AQ})` }));
    txt(140, 70, `${s.serif} <span style="color:${B}">${s.accent}</span>`, `width:420px;font:500 50px/1.12 Georgia,'Times New Roman',serif;color:${INK}`);
    add('card', css({ left: 640, top: 50, width: 400, padding: '20px 22px', borderRadius: 18 }),
      (s.rows || []).map((r, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;${i ? 'border-top:1px solid #eef0f7' : ''};font:600 19px ${F};color:${INK}">
        <span>${r[0]}</span><span style="padding:5px 12px;border-radius:999px;background:${i === 0 ? D : '#eef1ff'};color:${i === 0 ? '#fff' : B};font-size:16px">${r[1]}</span></div>`).join(''));
  };
  // 58 Glossy icon tiles (Pitch 3D icons, in brand blue)
  S.glossy = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `radial-gradient(70% 90% at 50% 20%, ${M}, ${D})` }));
    (s.icons || []).forEach((n, i) => {
      const [x, y, r, sz] = [[330, 90, -12, 140], [520, 40, 6, 170], [740, 110, 14, 140], [470, 220, -6, 110], [680, 250, 8, 100]][i];
      add('abs', css({ left: x, top: y, width: sz, height: sz, borderRadius: sz * .26, transform: `rotate(${r}deg)`,
        background: `linear-gradient(145deg, #ffffff 0%, #c9d1ff 45%, ${M} 100%)`, boxShadow: `inset 0 -10px 18px rgba(22,45,161,.35), 0 22px 40px rgba(5,10,60,.45)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }), ico(n, sz * .55, 9, D, B));
    });
  };
  // 59 Photo with colour rays (Miro editorial graphics)
  S.rays = () => {
    bg('#c9d1ff');
    svg(`<path d="M600 520 L0 -40 L230 -40Z" fill="${B}"/><path d="M600 520 L420 -40 L640 -40Z" fill="${T}"/><path d="M600 520 L900 -40 L1200 -40 L1200 60Z" fill="${B}"/>`);
    photo(s.photo, s.focal, 430, 60, 340, 290, 170, 110, 1.6, 'gray', '170px 170px 24px 24px');
  };

  // 60 Circuit grid (Zapier integration posts)
  S.circuit = () => {
    bg('#f4f5fb');
    svg(`<pattern id="cg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#dfe3f0" stroke-width="1.5"/></pattern><rect width="1200" height="630" fill="url(#cg)"/>
      <path d="M220 180 H440 V100 H600 M600 100 H760 V260 H980" stroke="${B}" stroke-width="4" fill="none"/>
      <circle cx="220" cy="180" r="9" fill="${B}"/><circle cx="980" cy="260" r="9" fill="${T}"/>`);
    [['laptop', 380, 40], ['headset', 540, 40], ['document', 700, 200]].forEach(([n, x, y]) => tile(x, y, 120, 120, ico(n, 64, 9), { borderRadius: 26 }));
  };
  // 61 Op-art rings (Webflow)
  S.opart = () => {
    bg(T);
    svg(Array.from({ length: 14 }, (_, i) => `<circle cx="0" cy="190" r="${80 + i * 34}" fill="none" stroke="${i % 2 ? B : INK}" stroke-width="17"/>`).join(''));
    tile(760, 110, 160, 160, ico(s.icon, 100, 7), { borderRadius: 40 });
  };
  // 62 Wireframe globe with tag (Webflow)
  S.globe = () => {
    bg(B);
    let g = ''; for (let i = -3; i <= 3; i++) g += `<ellipse cx="600" cy="300" rx="${Math.abs(i) * 90 || 2}" ry="280" fill="none" stroke="${INK}" stroke-width="3"/>`;
    for (let j = -2; j <= 2; j++) { const y = 300 + j * 110, rx = 280 * Math.sqrt(1 - (j * 110 / 280) ** 2); g += `<ellipse cx="600" cy="${y}" rx="${rx}" ry="${rx * .12}" fill="none" stroke="${INK}" stroke-width="3"/>`; }
    svg(`<circle cx="600" cy="300" r="280" fill="none" stroke="${INK}" stroke-width="3"/>${g}`);
    add('abs', css({ left: 470, top: 150, padding: '14px 22px', borderRadius: 10, background: INK, color: '#fff', font: `600 26px ${F}`, display: 'flex', gap: '10px', alignItems: 'center' }), `${ico('check', 30, 12, T, T)} ${s.tag}`);
  };
  // 63 Multilingual type collage (Webflow localisation)
  S.hello = () => {
    bg(T);
    (s.words || []).forEach(([w, x, y, sz], i) => add('abs', css({ left: x, top: y, padding: '4px 16px', background: i === 0 ? INK : '#fff', color: i === 0 ? '#fff' : INK,
      font: `800 ${sz}px/1 ${F}`, letterSpacing: '-.03em', boxShadow: '0 8px 0 rgba(11,20,64,.15)' }), w));
    svg(`<path d="M120 300 Q 200 120 300 260 T 480 220" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  };
  // 64 Editorial serif card (Elation)
  S.serifcard = () => {
    bg('#fbfaf7');
    add('abs', css({ left: 150, top: 0, width: 4, height: 630, background: T }));
    txt(200, 40, s.kicker, `font:600 17px ${F};letter-spacing:.14em;text-transform:uppercase;color:#6b7396`);
    txt(200, 86, `${s.a} <i style="color:${B}">${s.b}</i>`, `width:760px;font:500 54px/1.1 Georgia,'Times New Roman',serif;color:${INK}`);
    add('abs', css({ left: 200, top: 290, padding: '8px 18px', borderRadius: 999, background: B, color: '#fff', font: `600 17px ${F}` }), s.pill);
  };

  // 65 Release card (Spring Health "What's New")
  S.release = () => {
    bg(D);
    txt(0, 70, `<div style="width:1200px;text-align:center;font:600 18px ${F};letter-spacing:.16em;text-transform:uppercase;color:${T}">${s.kicker}</div>
      <div style="width:1200px;text-align:center;font:600 72px/1.05 ${F};color:#fff;margin-top:16px;letter-spacing:-.02em">${s.head}</div>
      <div style="width:1200px;display:flex;justify-content:center;margin-top:26px"><span style="padding:10px 22px;border-radius:999px;background:${T};color:${INK};font:600 19px ${F}">${s.pill} →</span></div>`);
  };
  // 66 Twin rounded photos (Spring Health)
  S.twin = () => {
    bg('#c9d1ff');
    photo(s.photo2, s.focal2, 260, 40, 330, 270, 165, 110, 1.6, '', '24px 120px 24px 24px');
    photo(s.photo, s.focal, 610, 70, 330, 270, 165, 110, 1.6, '', '120px 24px 24px 24px');
  };
  // 67 Paint strokes + mono headline (Carbon Health)
  S.brush = () => {
    bg('#d4f3f8');
    svg(`<path d="M120 60 C 260 20, 300 120, 420 70 S 520 10, 560 40" stroke="${B}" stroke-width="46" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M760 300 C 880 250, 960 340, 1100 280" stroke="${T}" stroke-width="56" fill="none" stroke-linecap="round"/>
      <path d="M980 40 C 1040 80, 1080 40, 1140 90" stroke="${D}" stroke-width="30" fill="none" stroke-linecap="round"/>`);
    txt(0, 110, `<div style="width:1200px;text-align:center;font:500 18px 'IBM Plex Mono',monospace;color:${INK}">${s.kicker}</div>
      <div style="width:1200px;text-align:center;font:600 46px/1.15 ${F};color:${INK};margin-top:14px">${s.head}</div>`);
  };
  // 68 Location pin over map silhouette (Carbon Health)
  S.pin = () => {
    bg('#c9d1ff');
    svg(`<path d="M0 360 L 120 120 L 260 90 L 330 160 L 420 110 L 520 200 L 600 160 L 640 260 L 580 360Z" fill="#dfe4ff"/>`);
    add('abs', css({ left: 300, top: 40, width: 220, height: 220, borderRadius: '50%', border: `8px solid ${INK}`, overflow: 'hidden', background: '#fff' }));
    photo(s.photo, s.focal, 308, 48, 204, 204, 102, 80, 2.4, '', '50%');
    svg(`<line x1="410" y1="268" x2="410" y2="360" stroke="${INK}" stroke-width="8"/>`);
    txt(600, 120, `<div style="display:inline-block;padding:6px 14px;border-radius:999px;background:${INK};color:#fff;font:500 16px 'IBM Plex Mono',monospace">${s.tag}</div>
      <div style="font:600 46px/1.1 ${F};color:${INK};margin-top:14px;width:460px">${s.head}</div>`);
  };
  // 69 Q&A circles (Phreesia)
  S.qacircle = () => {
    bg('#fff');
    add('abs', css({ left: 330, top: 40, width: 290, height: 290, borderRadius: '50%', background: B }));
    photo(s.photo, s.focal, 345, 55, 260, 260, 130, 100, 2.2, '', '50%');
    add('abs', css({ left: 560, top: 40, width: 290, height: 290, borderRadius: '50%', background: '#fff', boxShadow: '0 20px 50px rgba(15,30,110,.16)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }),
      `${ico('person', 56, 8)}<div style="font:700 34px/1.1 ${F};color:${INK};text-align:center">${s.label}</div>`);
  };
  // 70 Network graph (Doximity)
  S.network = () => {
    bg('#f4f6fb');
    let g = ''; const pts = []; let seed = 7; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 46; i++) pts.push([120 + r() * 960, 20 + r() * 330]);
    pts.forEach(([x, y], i) => { const [x2, y2] = pts[(i * 7 + 3) % pts.length]; g += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#c9d1ff" stroke-width="1.5"/>`; });
    pts.forEach(([x, y]) => g += `<circle cx="${x}" cy="${y}" r="5" fill="#9aa6e6"/>`);
    svg(g);
    (s.labels || []).forEach(([t, x, y], i) => add('abs', css({ left: x, top: y, padding: '10px 18px', borderRadius: 999, background: [B, T, D, M][i % 4], color: i % 4 === 1 ? INK : '#fff', font: `700 18px ${F}`, letterSpacing: '.06em', textTransform: 'uppercase' }), t));
  };
  // 71 Navy report cover (Doximity reports)
  S.report = () => {
    bg(NAVY);
    svg(Array.from({ length: 6 }, (_, i) => `<circle cx="1200" cy="0" r="${200 + i * 70}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`).join(''));
    txt(140, 60, s.head, `width:560px;font:500 58px/1.08 Georgia,'Times New Roman',serif;color:#fff`);
    txt(144, 270, s.year, `font:500 30px ${F};color:${T}`);
  };

  // 72 Pixel dither (Dovetail / Zendesk bitmap graphics)
  S.pixel = () => {
    bg(B);
    let g = ''; let seed = 11; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let y = 0; y < 360; y += 12) for (let x = 0; x < 1200; x += 12) {
      const d = Math.hypot(x - 600, y - 170) / 520; if (r() > d * 1.1) g += `<rect x="${x}" y="${y}" width="10" height="10" fill="${r() > .5 ? M : '#5b74ff'}"/>`; }
    svg(g);
    tile(555, 30, 90, 90, ico(s.icon, 52, 9), { borderRadius: 20 });
    txt(0, 170, `<div style="width:1200px;text-align:center;font:700 92px/1 ${F};color:#fff;letter-spacing:-.03em">${s.word}</div>`);
  };
  // 73 Podcast cover (Help Scout podcast)
  S.podcast = () => {
    bg('#0a1240');
    photo(s.photo, s.focal, 260, 40, 250, 300, 125, 110, 1.6, 'duoNW', '20px');
    txt(560, 40, s.big, `width:420px;font:800 78px/.92 'Arial Narrow',Inter,sans-serif;font-stretch:condensed;color:#fff;text-transform:uppercase;letter-spacing:-.01em`);
    txt(564, 290, s.small, `font:500 18px 'IBM Plex Mono',monospace;color:${T}`);
  };
  // 74 Settings toggles (Help Scout product UI)
  S.toggles = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `linear-gradient(90deg, ${T}, ${B} 70%)` }));
    add('card', css({ left: 420, top: 26, width: 360, padding: '18px 24px', borderRadius: 16 }),
      (s.rows || []).map(([t, on], i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;font:600 20px ${F};color:${on ? INK : '#9aa3cc'}">
        <span>${t}</span><span style="width:46px;height:26px;border-radius:13px;background:${on ? T : '#e3e7f6'};position:relative"><i style="position:absolute;top:3px;${on ? 'right' : 'left'}:3px;width:20px;height:20px;border-radius:50%;background:#fff"></i></span></div>`).join(''));
  };
  // 75 Ticker band (Zendesk product alerts)
  S.ticker = () => {
    bg(D);
    for (let i = 0; i < 6; i++) txt(-60 + (i % 2) * -120, 10 + i * 58, Array(8).fill(s.band).join(' &nbsp;·&nbsp; '),
      `white-space:nowrap;font:600 22px 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:${i % 2 ? '#5b74ff' : '#3e59ff'}`);
    add('card', css({ left: 360, top: 90, width: 480, height: 170, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
      `<div style="font:500 36px/1.2 'IBM Plex Mono',monospace;color:${INK};text-align:center">${s.head}</div>`);
  };

  // 76 Cell grid (Airtable)
  S.cells = () => {
    bg(NAVY);
    let g = ''; for (let x = 0; x <= 1200; x += 100) g += `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#25307a" stroke-width="2"/>`;
    for (let y = 0; y <= 630; y += 100) g += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#25307a" stroke-width="2"/>`;
    g += `<rect x="400" y="100" width="100" height="100" fill="${T}"/><rect x="700" y="200" width="200" height="100" fill="#c9d1ff"/><rect x="300" y="200" width="100" height="100" fill="${B}"/>`;
    svg(g);
    [[s.icons[0], 400, 100, NAVY], [s.icons[1], 500, 200, '#fff'], [s.icons[2], 600, 100, '#fff'], [s.icons[3], 300, 200, '#fff']].forEach(([n, x, y, col]) =>
      add('abs', css({ left: x + 22, top: y + 22 }), ico(n, 56, 8, col, col === NAVY ? NAVY : T)));
  };
  // 77 Headline + tilted document (Lattice)
  S.docline = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `linear-gradient(110deg, #f1f3ff, #c9d1ff 60%, ${AQ})` }));
    txt(150, 80, s.head, `width:400px;font:600 46px/1.12 ${F};color:${INK};letter-spacing:-.01em`);
    add('card', css({ left: 640, top: 30, width: 320, height: 380, borderRadius: 10, transform: 'rotate(5deg)', padding: '24px' }),
      `<div style="font:700 22px/1.2 ${F};color:${INK}">${s.doc}</div><div style="margin-top:18px;height:200px;border-radius:8px;background:linear-gradient(160deg,${M},${T})"></div>`);
  };
  // 78 Glossy arrow on gradient (Shopify 3D objects)
  S.gradarrow = () => {
    add('abs', css({ left: 0, top: 0, width: 1200, height: 630, background: `linear-gradient(180deg, ${NAVY} 0%, ${B} 55%, ${T} 100%)` }));
    svg(`<defs><linearGradient id="ga" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="${T}"/><stop offset="1" stop-color="${M}"/></linearGradient></defs>
      <path d="M600 30 L700 150 L640 150 L640 340 L560 340 L560 150 L500 150Z" fill="url(#ga)" style="filter:drop-shadow(0 20px 30px rgba(5,10,60,.5))"/>`);
  };
  // 79 Tilted photo cards + italic series title (Shopify Masters)
  S.photostack = () => {
    bg('#c9f1f7');
    txt(140, 150, `${s.a}<br><i style="font-family:Georgia,serif;font-weight:400">${s.b}</i>`, `font:600 50px/1 ${F};color:${INK}`);
    const a = photo(s.photo2, s.focal2, 600, 40, 240, 280, 120, 100, 1.6); a.style.transform = 'rotate(-6deg)'; a.style.border = '6px solid #fff';
    const b = photo(s.photo, s.focal, 770, 70, 240, 280, 120, 100, 1.6); b.style.transform = 'rotate(5deg)'; b.style.border = '6px solid #fff';
  };

  if (S[s.style]) S[s.style]();
})();
