/*
 * Phần dùng chung cho mọi trang: đầu trang, menu Sản phẩm, chân trang, danh mục app,
 * nút Zalo / Tải, nút sao chép. Đọc danh sách app từ assets/apps.js.
 * Mỗi trang khai báo đường về gốc: <html data-root="../../"> (trang chủ để trống).
 */
(function () {
  const ROOT = document.documentElement.dataset.root || '';
  const SITE = window.PTV_SITE;
  const APPS = window.PTV_APPS || [];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const ICONS = {
    chev: '<path d="M6 9l6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    dl: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    msg: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    broadcast: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4"/><circle cx="12" cy="12" r="2"/>',
    lyrics: '<path d="M4 6h16M4 12h10M4 18h7M17 13v6M17 13l3-1v2"/>',
    wave: '<path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0"/>',
    screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
  };
  const svg = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
  window.PTV_ICON = svg;

  const appUrl = (a) => (a.status === 'live' ? ROOT + 'apps/' + a.id + '/' : ROOT + '#ung-dung');
  const appIcon = (a, size = '') =>
    a.icon
      ? `<span class="appico ${size}"><img src="${ROOT + a.icon}" alt="" width="96" height="96"></span>`
      : `<span class="appico ph ${size}" style="--c:${a.color}">${svg(a.glyph || 'wave')}</span>`;
  window.PTV_APP_ICON = appIcon;
  window.PTV_APP_URL = appUrl;

  /* ---------- Đầu trang ---------- */
  const page = document.body.dataset.page || '';
  const header = $('#top');
  if (header) {
    header.className = 'top';
    header.innerHTML = `<div class="wrap">
      <a class="logo" href="${ROOT}"><b>PTV</b><span>Phần mềm sự kiện</span></a>
      <div class="menu">
        <div class="dd"><button type="button" aria-expanded="false">Sản phẩm ${svg('chev', 'i chev')}</button>
          <div class="dd-panel">${APPS.map(
            (a) => `<a href="${appUrl(a)}">${appIcon(a, 'sm')}<span><span class="nm">${a.name}</span><span class="ln">${a.status === 'live' ? a.line : 'Sắp ra mắt'}</span></span></a>`
          ).join('')}<a class="all" href="${ROOT}#ung-dung">Xem tất cả ứng dụng</a></div></div>
        <a href="${ROOT}#cach-mua">Cách mua</a>
        <a href="${ROOT}ho-tro/" ${page === 'support' ? 'aria-current="page"' : ''}>Hỗ trợ</a>
        <a href="${ROOT}#gioi-thieu">Giới thiệu</a>
        <a class="m-only js-zalo" href="#">Nhắn Zalo ${SITE.zaloText}</a>
      </div>
      <div class="top-act"><a class="btn btn-2 btn-sm js-zalo" href="#">${svg('msg')}Nhắn Zalo</a></div>
      <button class="burger" type="button" aria-label="Mở menu">${svg('menu')}</button>
    </div>`;
    const dd = $('.dd', header);
    const ddBtn = $('button', dd);
    ddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('open');
      ddBtn.setAttribute('aria-expanded', dd.classList.contains('open'));
    });
    document.addEventListener('click', () => dd.classList.remove('open'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && dd.classList.remove('open'));
    $('.burger', header).addEventListener('click', (e) => {
      e.stopPropagation();
      header.classList.toggle('open');
      dd.classList.add('open');
    });
    $$('.menu a', header).forEach((a) => a.addEventListener('click', () => header.classList.remove('open')));
  }

  /* ---------- Chân trang ---------- */
  const foot = $('#foot');
  if (foot) {
    foot.className = 'foot';
    foot.innerHTML = `<div class="wrap">
      <div class="cols">
        <div><a class="logo" href="${ROOT}"><b>PTV</b><span>Phần mềm sự kiện</span></a>
          <p style="margin:16px 0 0;max-width:30em">Phần mềm cho người làm âm thanh, đồ họa và sân khấu sự kiện. Làm tại ${SITE.city}.</p></div>
        <div><h5>Ứng dụng</h5><ul>${APPS.map((a) => `<li><a href="${appUrl(a)}">${a.name}${a.status === 'soon' ? ' · sắp ra mắt' : ''}</a></li>`).join('')}</ul></div>
        <div><h5>Hỗ trợ</h5><ul>
          <li><a href="${ROOT}ho-tro/#kich-hoat">Mua và kích hoạt key</a></li>
          <li><a href="${ROOT}ho-tro/#chinh-sach">Chính sách</a></li>
          <li><a href="${ROOT}ho-tro/#hoi-dap">Hỏi đáp</a></li></ul></div>
        <div><h5>Liên hệ</h5><ul>
          <li><a class="js-zalo" href="#">Zalo ${SITE.zaloText}</a></li>
          <li>${SITE.owner}</li></ul></div>
      </div>
      <div class="base"><span>© <span class="js-year">2026</span> ${SITE.owner} · Motionmaket</span><span>${SITE.city}, Việt Nam</span></div>
    </div>`;
  }

  /* ---------- Danh mục app (trang chủ) ---------- */
  const cat = $('#catalog');
  if (cat) {
    const filters = $('#filters');
    const render = (g) => {
      cat.innerHTML = APPS.filter((a) => g === 'all' || a.group === g)
        .map(
          (a) => `<a class="card ${a.status}" href="${appUrl(a)}" style="--c:${a.color}">
            <div class="card-top">${appIcon(a)}<span class="st ${a.status}">${a.status === 'live' ? 'Đang bán · v' + a.version : 'Sắp ra mắt'}</span></div>
            <h3>${a.name}</h3><p>${a.line}</p>
            <div class="card-meta"><span>${a.platform}</span>${a.from ? `<span>Từ ${a.from}</span>` : ''}${a.trial ? `<span>Dùng thử ${a.trial}</span>` : ''}</div>
            <span class="card-go">${a.status === 'live' ? 'Xem ứng dụng' : 'Báo tôi khi ra mắt'} ${svg('arrow')}</span>
          </a>`
        )
        .join('');
      // App sắp ra mắt: bấm là mở Zalo đăng ký nhận tin
      $$('.card.soon', cat).forEach((c) => {
        c.href = SITE.zalo;
        c.target = '_blank';
        c.rel = 'noopener';
      });
    };
    if (filters) {
      filters.innerHTML = window.PTV_GROUPS.filter((g) => g.id === 'all' || APPS.some((a) => a.group === g.id))
        .map((g) => `<button type="button" data-g="${g.id}" aria-pressed="${g.id === 'all'}">${g.name}</button>`)
        .join('');
      filters.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        $$('button', filters).forEach((x) => x.setAttribute('aria-pressed', x === b));
        render(b.dataset.g);
      });
    }
    render('all');
    const n = $('#appCount');
    if (n) n.textContent = APPS.length;
  }

  /* ---------- Nút Zalo, Tải, sao chép ---------- */
  const thisApp = APPS.find((a) => a.id === document.body.dataset.app);
  $$('.js-zalo').forEach((a) => Object.assign(a, { href: SITE.zalo, target: '_blank', rel: 'noopener' }));
  $$('.js-dl').forEach((a) => {
    const url = (thisApp && thisApp.download) || '';
    a.href = url || SITE.zalo;
    if (!url) Object.assign(a, { target: '_blank', rel: 'noopener', title: 'Nhắn Zalo để nhận link tải' });
  });
  const toast = Object.assign(document.createElement('div'), { className: 'toast', role: 'status' });
  document.body.appendChild(toast);
  $$('[data-copy]').forEach((b) =>
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        toast.textContent = 'Đã sao chép ' + b.dataset.copy;
      } catch {
        toast.textContent = 'Không sao chép được, hãy chọn và chép tay';
      }
      toast.classList.add('on');
      clearTimeout(toast.t);
      toast.t = setTimeout(() => toast.classList.remove('on'), 1800);
    })
  );
  $$('[data-icon]').forEach((el) => (el.outerHTML = svg(el.dataset.icon)));
  $$('.js-year').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Video giới thiệu: nút phát lớn trên ảnh bìa, bấm rồi mới hiện thanh điều khiển ---------- */
  $$('.vid').forEach((box) => {
    const v = $('video', box);
    const b = $('.vid-play', box);
    if (!v || !b) return;
    const go = () => {
      b.hidden = true;
      v.controls = true;
    };
    v.controls = false;
    b.hidden = false;
    b.addEventListener('click', () => {
      go();
      v.play().catch(() => {});
    });
    v.addEventListener('play', go);
  });

  /* ---------- Đánh giá người dùng (dữ liệu trong assets/reviews.js) ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const num1 = (v) => v.toFixed(1).replace('.', ',');
  const starRow = (v, cls = '') => {
    const row = ('<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS.star + '</svg>').repeat(5);
    return `<span class="stars ${cls}" style="--f:${(v / 5) * 100}%" role="img" aria-label="${num1(v)} trên 5 sao"><span>${row}</span><span class="on">${row}</span></span>`;
  };
  // Khung mẫu để xem bố cục trên máy, không phải đánh giá: chỉ hiện ở 127.0.0.1 với ?mau
  const MAU = [5, 5, 4, 5].map((sao, i) => ({
    ten: 'Tên khách',
    vai: 'Vai trò, nơi làm',
    su_kien: 'Loại buổi đã dùng',
    sao,
    loi: i % 2 ? 'Lời nhận xét của khách, giữ nguyên lời.' : 'Lời nhận xét của khách, giữ nguyên lời. Hai, ba câu là vừa: dùng cho buổi nào, phần nào giúp được nhiều nhất.',
    ngay: '2026-12-0' + (i + 1),
    mau: true,
  }));
  const rvBox = $('#reviews');
  if (rvBox) {
    const appName = thisApp ? thisApp.name : 'ứng dụng';
    const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    let list = ((window.PTV_REVIEWS || {})[document.body.dataset.app] || []).filter((r) => r && r.loi && r.sao >= 1 && r.sao <= 5);
    if (!list.length && local && /[?&]mau\b/.test(location.search)) list = MAU;
    list.sort((a, b) => String(b.ngay || '').localeCompare(String(a.ngay || '')));
    const n = list.length;
    const avg = n ? list.reduce((s, r) => s + r.sao, 0) / n : 0;
    const rateBtn = `<button class="btn btn-2 js-rate" type="button">${svg('star')}Chấm sao cho ${esc(appName)}</button>`;
    const initial = (t) => (String(t || '?').trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase();
    const month = (d) => (/^\d{4}-\d{2}/.test(d || '') ? d.slice(5, 7) + '/' + d.slice(0, 4) : '');
    const card = (r, i) => `<figure class="rvw${r.mau ? ' mau' : ''}${i >= 6 ? ' more' : ''}">
        <div class="rvw-top">${starRow(r.sao)}${r.mau ? '<span class="tape">Mẫu bố cục</span>' : ''}</div>
        <blockquote>${esc(r.loi)}</blockquote>
        <figcaption><span class="av" aria-hidden="true">${esc(initial(r.ten))}</span><span><span class="nm">${esc(r.ten || 'Người dùng')}</span><span class="rl">${esc([r.vai, r.su_kien].filter(Boolean).join(' · '))}</span></span>${month(r.ngay) ? `<time class="dt" datetime="${esc(r.ngay)}">${month(r.ngay)}</time>` : ''}</figcaption>
      </figure>`;
    rvBox.innerHTML = n
      ? `<div class="score">
          <div class="big" data-count="${avg.toFixed(1)}">${num1(avg)}</div>
          ${starRow(avg, 'lg')}
          <p class="of">${n} đánh giá${list[0].mau ? ' mẫu' : ''}</p>
          <div class="dist">${[5, 4, 3, 2, 1].map((k) => { const c = list.filter((r) => r.sao === k).length; return `<div><span>${k} sao</span><i><b style="--w:${(c / n) * 100}%"></b></i><span class="mono">${c}</span></div>`; }).join('')}</div>
          ${rateBtn}
        </div>
        <div class="rv-list">${list.map(card).join('')}${n > 6 ? `<button class="btn btn-2 rv-all" type="button">Xem thêm ${n - 6} đánh giá</button>` : ''}</div>`
      : `<div class="rv-empty">
          <div class="stars-big" aria-hidden="true">${starRow(0, 'lg')}</div>
          <div><h3>Chưa có đánh giá nào được đăng</h3><p>${esc(appName)} vừa ra mắt. Dùng thử xong, bạn chấm sao và viết vài dòng, PTV đăng lên đây đúng lời bạn.</p></div>
          ${rateBtn}
        </div>`;
    const all = $('.rv-all', rvBox);
    if (all) all.addEventListener('click', () => { $$('.rvw.more', rvBox).forEach((c) => c.classList.remove('more')); all.remove(); });
    const badge = $('#rate-badge');
    if (badge && n >= 3) {
      badge.innerHTML = `${starRow(avg)}<b>${num1(avg)}</b><span>${n} đánh giá${list[0].mau ? ' mẫu' : ''}</span>`;
      badge.hidden = false;
    }

    // Hộp chấm sao: chép sẵn lời đánh giá, mở Zalo để khách dán và gửi PTV
    const dlg = document.createElement('dialog');
    dlg.className = 'rate';
    dlg.setAttribute('aria-labelledby', 'rate-t');
    dlg.innerHTML = `<form class="rate-f" novalidate>
        <h3 id="rate-t">Chấm sao cho ${esc(appName)}</h3>
        <p class="hint">Lời đánh giá được chép sẵn để bạn dán vào Zalo gửi PTV. PTV đăng lên trang đúng lời bạn.</p>
        <fieldset class="pick"><legend>Số sao</legend><div>${[5, 4, 3, 2, 1].map((k) => `<input type="radio" name="sao" value="${k}" id="sao${k}"><label for="sao${k}" title="${k} sao"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.star}</svg><span class="vh">${k} sao</span></label>`).join('')}</div></fieldset>
        <label class="fl">Lời nhận xét<textarea name="loi" rows="4" maxlength="600" placeholder="Bạn dùng cho buổi nào, phần nào giúp được nhiều nhất"></textarea></label>
        <div class="two-f"><label class="fl">Tên hiện trên trang<input name="ten" maxlength="40" autocomplete="name" placeholder="Anh Tuấn"></label>
        <label class="fl">Vai trò, nơi làm<input name="vai" maxlength="60" placeholder="Kỹ thuật hình, Nha Trang"></label></div>
        <label class="fl">Loại buổi đã dùng<input name="su_kien" maxlength="60" placeholder="Tiệc cưới, hội nghị, văn nghệ"></label>
        <p class="err" role="alert"></p>
        <div class="rate-acts"><button class="btn btn-go" type="submit">${svg('msg')}Chép và mở Zalo</button><button class="btn btn-2 js-close" type="button">Đóng</button></div>
      </form>
      <div class="rate-ok" hidden>
        <h3>Đã chép lời đánh giá</h3>
        <p class="hint">Zalo của PTV đã mở ở thẻ mới. Dán vào khung chat (Ctrl+V) rồi gửi. Không dán được thì chép đoạn dưới đây.</p>
        <textarea readonly rows="7"></textarea>
        <div class="rate-acts"><a class="btn btn-go" target="_blank" rel="noopener" href="${SITE.zalo}">${svg('msg')}Mở lại Zalo</a><button class="btn btn-2 js-close" type="button">Xong</button></div>
      </div>`;
    document.body.appendChild(dlg);
    const form = $('form', dlg);
    const ok = $('.rate-ok', dlg);
    const err = $('.err', dlg);
    $$('.js-rate').forEach((b) => b.addEventListener('click', () => {
      form.hidden = false;
      ok.hidden = true;
      err.textContent = '';
      dlg.showModal();
    }));
    $$('.js-close', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(form));
      const loi = (f.loi || '').trim();
      if (!f.sao) return (err.textContent = 'Chọn số sao trước đã.');
      if (loi.length < 10) return (err.textContent = 'Viết thêm vài chữ nhận xét, ít nhất 10 ký tự.');
      const text = [
        `Đánh giá ${appName}: ${'★'.repeat(f.sao)}${'☆'.repeat(5 - f.sao)} (${f.sao}/5)`,
        f.ten && 'Tên: ' + f.ten.trim(),
        f.vai && 'Vai trò, nơi làm: ' + f.vai.trim(),
        f.su_kien && 'Loại buổi: ' + f.su_kien.trim(),
        'Nhận xét: ' + loi,
        'Tôi đồng ý cho PTV đăng đánh giá này lên trang web.',
      ].filter(Boolean).join('\n');
      try { await navigator.clipboard.writeText(text); } catch { /* vẫn hiện đoạn chữ để chép tay */ }
      window.open(SITE.zalo, '_blank', 'noopener');
      $('textarea', ok).value = text;
      form.hidden = true;
      ok.hidden = false;
    });
  }

  /* ---------- Chuyển động: hero vào khi mở trang, từng khối hiện dần khi cuộn tới ---------- */
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countUp = (el) => {
    const to = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 900);
      el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(dec).replace('.', ',');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!calm && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('mo');
    $$('[data-enter]').forEach((w) => [...w.children].forEach((c, i) => c.style.setProperty('--i', i)));
    const REVEAL = 'main section .head, .feats>.feat, .plans>.plan, .steps>.step, .need>div, .split>*, .pol li, details, .bank, .end, .note, .score, .rv-list>.rvw, .rv-empty, .spec, .meas';
    const io = new IntersectionObserver((entries) => {
      let k = 0;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--d', Math.min(k++, 6) * 70 + 'ms');
        e.target.classList.add('in');
        // Hiện xong thì trả khối về kiểu thường, để rê chuột không bị trễ theo nhịp hiện
        setTimeout(() => e.target.classList.remove('rv', 'in'), 1300);
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    $$(REVEAL).forEach((el) => {
      if (el.closest('[data-enter]')) return;
      el.classList.add('rv');
      io.observe(el);
    });
    // Ảnh bàn điều khiển ở hero lớn dần tới đủ cỡ khi cuộn xuống (chỉ màn rộng)
    const shot = $('.hero .shot');
    if (shot && matchMedia('(min-width: 900px)').matches) {
      let raf = 0;
      const grow = () => {
        raf = 0;
        const p = Math.min(1, Math.max(0, (innerHeight - shot.getBoundingClientRect().top) / (innerHeight * 0.9)));
        shot.style.setProperty('--sc', (0.93 + 0.07 * p).toFixed(4));
      };
      addEventListener('scroll', () => raf || (raf = requestAnimationFrame(grow)), { passive: true });
      grow();
    }
  }

  /* ---------- Thanh phụ trang app: sáng mục đang xem ---------- */
  const subNav = $('.sub nav');
  if (subNav) {
    const links = $$('a[href^="#"]', subNav);
    const secs = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    let cur = null;
    let raf = 0;
    const spy = () => {
      raf = 0;
      let s = null;
      secs.forEach((x) => { if (x.getBoundingClientRect().top <= innerHeight * 0.35) s = x; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) s = secs[secs.length - 1];
      if (s === cur) return;
      cur = s;
      links.forEach((a) => (a.getAttribute('href') === '#' + (s && s.id) ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      const a = $('[aria-current]', subNav);
      if (a && subNav.scrollWidth > subNav.clientWidth) subNav.scrollTo({ left: a.offsetLeft - (subNav.clientWidth - a.offsetWidth) / 2, behavior: calm ? 'auto' : 'smooth' });
    };
    addEventListener('scroll', () => raf || (raf = requestAnimationFrame(spy)), { passive: true });
    spy();
  }
})();
