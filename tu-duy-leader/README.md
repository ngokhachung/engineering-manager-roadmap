# Nhật ký hàng ngày

Mục đích: lưu dữ liệu thô mỗi ngày (trong folder `nhat-ky/`) để sau này đối chiếu vào **T5** (rà soát cuối tuần), **T7** (chấm hiệu chỉnh cuối tháng), và trả lời câu hỏi "tôi có đang tiến bộ không" bằng bằng chứng thay vì cảm giác.

## Quy ước đặt tên

Mỗi ngày một file trong `nhat-ky/`: `YYYY-MM-DD.md` — ví dụ `nhat-ky/2026-08-25.md`.

## Cách dùng

1. Đầu mỗi ngày, tạo file mới trong `nhat-ky/` đặt tên theo ngày hôm đó (`YYYY-MM-DD.md`).
2. Điền dần trong ngày — đúng tinh thần "thẻ" trong `04_the-ghi-nho.md`: mỗi ô một dòng, dưới 1 phút mỗi lần, không viết văn.
3. Thứ Hai: thêm 3 dự đoán (T1) vào đầu file. Thứ Sáu: thêm phần rà soát (T5) vào cuối file.
4. Cuối tháng, khi làm T7 (chấm hiệu chỉnh) trong `03_template.md`, mở lại các file trong `nhat-ky/` của tháng đó để gom số liệu dự đoán.

## Cách dùng để phân tích tiến bộ

So sánh giữa các tuần/tháng, tìm mẫu lặp lại — không cần công cụ gì thêm ngoài đọc lại các file:

- Đếm số lần tick "Có" ở mục "tôi đã có thể dự đoán được" (Thẻ 5, T4) — nếu tăng theo thời gian, nghĩa là đang dừng lại để nghĩ nhiều hơn trước khi sự cố xảy ra.
- Theo dõi %kiến tạo ở Thẻ 6 qua từng ngày — nên đi lên hoặc ổn định trên 20%, không đi xuống liên tục.
- Đọc lại mục "hôm nay tôi có đổi ý về điều gì" — nếu trống nhiều ngày liên tiếp, đây là tín hiệu đang không cân nhắc thật (xem `01_mục-đích.md`).
- Gộp toàn bộ dự đoán trong tháng vào bảng T7 để có số liệu hiệu chỉnh thật, thay vì suy đoán.

### Tự làm hay để AI làm

Tách rõ hai việc, đừng gộp chung:

| Việc | Ai làm |
|---|---|
| **Gom số liệu** — đếm tick, cộng %, gom dự đoán vào bảng T7 | Có thể nhờ AI làm hộ, vì đây chỉ là phép đếm cơ học, không mất giá trị rèn luyện |
| **Nhận ra mẫu lặp lại và diễn giải nó nghĩa là gì** — ví dụ "tôi thường sai khi dự đoán về gì", "đây là né tránh hay do bận" | Tự làm — đây mới là phần luyện tư duy thật, để AI diễn giải hộ thì mất tác dụng của cả hệ thống |

Đây chính là bài học ở mục "Đọc thay cho làm" trong `00_huong-dan-luyen-tap-tu-duy.md`: công cụ chỉ nên gánh phần cơ học, phần dừng lại để nghĩ phải là của anh.

File log không cần đẹp, không cần đầy đủ mỗi ngày — mục tiêu là có dữ liệu, không phải có tài liệu hoàn chỉnh. Bỏ lỡ vài ngày thì bỏ qua, không bù (theo đúng quy tắc vận hành trong `00_huong-dan-luyen-tap-tu-duy.md`).
