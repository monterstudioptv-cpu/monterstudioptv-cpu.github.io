/*
 * ĐẾM LƯỢT XEM WEB bằng Google Analytics 4 — chỉ chạy khi có mã đo lường `ga` trong assets/apps.js (PTV_SITE)
 * và khách bấm "Đồng ý" ở dòng hỏi cuối trang (Nghị định 13/2023: xử lý dữ liệu cá nhân phải có đồng ý).
 * Khách bấm "Không" thì không tải mã Google, không đặt cookie. Lựa chọn nhớ trên máy khách; nút có
 * thuộc tính data-ga-reset (trang Hỗ trợ → Chính sách) cho khách chọn lại.
 *
 * Sự kiện gửi thêm, xem ngay ở GA → Báo cáo → Thời gian thực → "Số lượt sự kiện theo Tên sự kiện":
 *   tai_ptv_studio, tai_event_sound_control   bấm nút Tải của từng phần mềm
 *   nhan_zalo                                 bấm nút nhắn Zalo
 *   xem_video_ptv_studio, xem_video_event_sound_control   bấm xem video giới thiệu (một lần mỗi lượt mở trang)
 *
 * Thử trên máy: http://127.0.0.1:<cổng>/...?ga=G-THU123 — chạy đủ (dòng hỏi, sự kiện vào window.dataLayer)
 * nhưng KHÔNG tải mã Google, nên không có lượt xem giả nào lọt vào số liệu thật.
 */
(function () {
  'use strict';
  const SITE = window.PTV_SITE || {};
  const APPS = window.PTV_APPS || [];
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const ID = String((local && new URLSearchParams(location.search).get('ga')) || SITE.ga || '').trim();
  if (!/^G-[A-Z0-9]{4,}$/i.test(ID)) return;

  const KEY = 'ptv-ga';
  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch (_) {
      return null;
    }
  };
  const write = (v) => {
    try {
      if (v) localStorage.setItem(KEY, v);
      else localStorage.removeItem(KEY);
    } catch (_) {}
  };

  window.dataLayer = window.dataLayer || [];
  const gtag = function () {
    window.dataLayer.push(arguments);
  };
  let on = false;
  function start() {
    if (on) return;
    on = true;
    gtag('js', new Date());
    gtag('config', ID);
    if (local) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(s);
  }

  // Bấm Tải / Zalo: đặt tên sự kiện theo phần mềm để đọc thẳng trong báo cáo Thời gian thực
  const page = document.body.dataset.app || '';
  document.addEventListener(
    'click',
    (e) => {
      if (!on) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const app = APPS.find((x) => x.download && x.download === a.href);
      if (app) gtag('event', 'tai_' + app.id.replace(/-/g, '_'), { trang: page || 'trang-chu', transport_type: 'beacon' });
      else if (/^https:\/\/zalo\.me\//.test(a.href)) gtag('event', 'nhan_zalo', { trang: page || 'trang-chu', transport_type: 'beacon' });
    },
    true
  );
  // Bấm xem video giới thiệu: một lần mỗi lượt mở trang
  let watched = false;
  document.addEventListener(
    'play',
    (e) => {
      if (!on || watched || !(e.target instanceof HTMLVideoElement)) return;
      watched = true;
      gtag('event', 'xem_video_' + (page || 'trang_chu').replace(/-/g, '_'), { trang: page || 'trang-chu' });
    },
    true
  );

  /* ---------- Dòng hỏi đồng ý ---------- */
  let bar = null;
  function ask() {
    if (bar) return;
    if (!document.getElementById('ga-css')) {
      const st = document.createElement('style');
      st.id = 'ga-css';
      st.textContent =
        '.ga-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:60;max-width:760px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:14px 16px;background:var(--s2);border:1px solid var(--line2);border-left:3px solid var(--amber);border-radius:var(--r-ctl);box-shadow:0 12px 32px rgb(0 0 0 / .45);font-size:14px;line-height:1.5}' +
        '.ga-bar p{margin:0;flex:1;color:var(--text2)}' +
        '.ga-bar .ga-btns{display:flex;gap:8px;flex:none}' +
        '.ga-bar .btn{height:40px;padding:0 16px;font-size:14px;margin:0;width:auto}' +
        '.ga-bar .ga-no{background:transparent;color:var(--text);border-color:var(--line2)}' +
        '.ga-bar .ga-no:hover{border-color:var(--muted)}' +
        '@media (max-width:600px){.ga-bar{flex-direction:column;align-items:stretch;gap:12px}.ga-bar .ga-btns .btn{flex:1;justify-content:center}}';
      document.head.appendChild(st);
    }
    bar = document.createElement('div');
    bar.className = 'ga-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Đếm lượt xem');
    bar.innerHTML =
      '<p>Web dùng Google Analytics để đếm lượt xem và lượt bấm tải. Không lấy tên hay số điện thoại của bạn.</p>' +
      '<div class="ga-btns"><button type="button" class="btn btn-go ga-yes">Đồng ý</button><button type="button" class="btn ga-no">Không</button></div>';
    document.body.appendChild(bar);
    bar.querySelector('.ga-yes').addEventListener('click', () => choose('yes'));
    bar.querySelector('.ga-no').addEventListener('click', () => choose('no'));
  }
  function choose(v) {
    write(v);
    if (bar) bar.remove();
    bar = null;
    if (v === 'yes') start();
    // Đổi từ đồng ý sang không: tải lại trang để mã Google không còn chạy
    else if (on) location.reload();
  }
  document.querySelectorAll('[data-ga-reset]').forEach((b) => {
    b.hidden = false;
    b.addEventListener('click', () => {
      write('');
      ask();
    });
  });

  const v = read();
  if (v === 'yes') start();
  else if (v !== 'no') ask();
})();
