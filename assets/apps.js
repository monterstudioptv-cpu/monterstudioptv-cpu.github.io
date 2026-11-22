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
    // Link cố định: bản mới chỉ cần đẩy đè file cùng tên lên kho ptv-downloads, không phải sửa web
    download: 'https://github.com/monterstudioptv-cpu/ptv-downloads/raw/main/PTVEventSoundControl-Setup.exe',
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
