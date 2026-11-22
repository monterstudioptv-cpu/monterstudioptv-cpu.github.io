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
})();
