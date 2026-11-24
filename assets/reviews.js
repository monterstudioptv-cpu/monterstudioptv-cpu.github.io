/*
 * ĐÁNH GIÁ CỦA NGƯỜI DÙNG — trang app tự tính điểm trung bình, số sao, huy hiệu sao trên đầu trang.
 * Chỉ ghi đánh giá có thật: đúng lời khách, khách đã đồng ý cho đăng (tin nhắn Zalo từ nút
 * "Chấm sao" trên trang có sẵn câu đồng ý). Không sửa lời, không thêm đánh giá tự viết.
 *
 * Mỗi app một danh sách, khóa là id trong apps.js. Mỗi đánh giá:
 *   ten      tên khách muốn hiện (vd 'Anh Tuấn', 'Chị Mai')
 *   vai      vai trò, nơi làm (vd 'Kỹ thuật hình, Nha Trang')
 *   su_kien  loại buổi đã dùng (vd 'Tiệc cưới 300 khách')
 *   sao      1 đến 5
 *   loi      lời nhận xét, giữ nguyên lời khách
 *   ngay     ngày nhận, dạng 'YYYY-MM-DD'
 *
 * Huy hiệu sao trên đầu trang chỉ hiện khi app có từ 3 đánh giá trở lên.
 * Xem thử bố cục khi chưa có đánh giá: mở trang trên máy (127.0.0.1) với ?mau ở cuối địa chỉ.
 */
window.PTV_REVIEWS = {
  'ptv-studio': [
    // { ten: '', vai: '', su_kien: '', sao: 5, loi: '', ngay: '2026-12-01' },
  ],
  'event-sound-control': [],
};
