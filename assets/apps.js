/*
 * DANH SÁCH APP CỦA HỆ SINH THÁI PTV — thêm app mới = thêm một mục vào mảng dưới đây.
 * Trang chủ, menu Sản phẩm và chân trang đều tự đọc danh sách này.
 *
 *   id        tên thư mục trang app: apps/<id>/
 *   status    'live' (đang bán) · 'soon' (sắp ra mắt, chưa có trang riêng)
 *   icon      ảnh vuông (để trống thì vẽ ô màu với biểu tượng nét `glyph`: broadcast · lyrics · wave · screen · mic)
 *   color     màu nhận diện của app (dùng cho ô biểu tượng, chấm trạng thái)
 *   from      giá thấp nhất để hiện "Từ …" (để trống nếu chưa bán)
 *   download  link tải bộ cài (để trống: nút Tải mở Zalo xin link)
 *   group     nhóm hiện ở bộ lọc: 'am-thanh' · 'hinh-anh' · 'san-khau'
 */
window.PTV_SITE = {
  zalo: 'https://zalo.me/0979836981',
  zaloText: '0979 836 981',
  owner: 'Phạm Thế Vũ (PTV)',
  city: 'Nha Trang',
  // Mã đo lường Google Analytics 4 (dạng G-XXXXXXXXXX). Để trống: web không đo lượt xem, không hỏi khách.
  ga: 'G-D36M072XBF',
};

window.PTV_GROUPS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'am-thanh', name: 'Âm thanh' },
  { id: 'hinh-anh', name: 'Đồ họa trực tiếp' },
  { id: 'san-khau', name: 'Màn hình sân khấu' },
];

window.PTV_APPS = [
  {
    id: 'event-sound-control',
    name: 'PTVEventSoundControl',
    short: 'Event Sound Control',
    line: 'Chạy nhạc nền, hiệu ứng và kịch bản sự kiện bằng một nút GO.',
    status: 'live',
    version: '4.2',
    platform: 'Windows 10/11',
    group: 'am-thanh',
    icon: 'assets/img/esc-icon.png',
    color: '#f0a43a',
    from: '30k/tháng',
    trial: '30 ngày',
    // Link cố định trên GitHub Releases (GitHub đếm lượt tải, PTV Key Manager đọc số này): bản mới chỉ cần
    // thay tệp cùng tên bằng dev/tools/release-downloads.mjs của dự án PTV Studio, không phải sửa web
    download: 'https://github.com/monterstudioptv-cpu/ptv-downloads/releases/download/tai-ve/PTVEventSoundControl-Setup.exe',
  },
  {
    id: 'ptv-studio',
    name: 'PTV Studio',
    short: 'Studio',
    line: 'Bàn trộn hình sự kiện: camera, video, PowerPoint lên màn LED, phát trực tiếp và ghi hình.',
    status: 'live',
    version: '3.6.6',
    platform: 'Windows 10/11',
    group: 'hinh-anh',
    icon: 'apps/ptv-studio/img/ptv-studio-icon.png',
    color: '#e4b344',
    from: '30k/tháng',
    trial: '30 ngày',
    // Link cố định trên GitHub Releases như bản âm thanh
    download: 'https://github.com/monterstudioptv-cpu/ptv-downloads/releases/download/tai-ve/PTV-Studio-Setup.exe',
  },
  {
    id: 'live-control',
    name: 'PTV Live Control',
    short: 'Live Control',
    line: 'Điều khiển đồ họa trực tiếp cho đêm thi, chạy cùng OBS và vMix.',
    status: 'soon',
    platform: 'Windows',
    group: 'hinh-anh',
    glyph: 'broadcast',
    color: '#e5484d',
  },
  {
    id: 'lyrics',
    name: 'PTV Lyrics',
    short: 'Lyrics',
    line: 'Hiện lời bài hát lên màn LED, chạy theo nhạc.',
    status: 'soon',
    platform: 'Windows',
    group: 'san-khau',
    glyph: 'lyrics',
    color: '#8b7cf6',
  },
];
