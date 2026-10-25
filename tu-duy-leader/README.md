# tu-duy-leader — hệ thống luyện tư duy

Bộ công cụ chạy song song với `roadmap-em.html`. Nguyên lý duy nhất: rút ngắn vòng phản hồi (feedback loop) của một phán đoán từ tám tháng xuống một tuần, bằng cách buộc mọi phán đoán có con số và hạn chót.

## Trong thư mục

| File | Là gì |
|---|---|
| `00_huong-dan-luyen-tap-tu-duy.md` | Cách vận hành: lịch tuần, thứ tự bắt đầu, quy tắc khi bỏ lỡ. **Đọc file này trước.** |
| `01_muc-dich.md` | Vì sao từng template và từng thẻ tồn tại, nhắm vào điểm yếu tư duy nào, bỏ qua thì mất gì |
| `03_template.md` | 8 template điền theo lịch (T1–T8): dự đoán, decision doc, pre-mortem, post-mortem, rà soát tuần, giải thích 3 điểm, chấm hiệu chỉnh, nhật ký thời gian |
| `04_the-ghi-nho.md` | 10 thẻ ngắn dùng trong ngày. Thẻ 8–10 (nói chuyện khó, giao việc, phản hồi SBI) dành cho giai đoạn đã dẫn dắt người |
| `README.md` | File này: giới thiệu thư mục, cách ghi nhật ký và phân tích tiến bộ |

Nếu chỉ làm được một thứ, làm T1.

## Nhật ký hằng ngày

Dữ liệu thô mỗi ngày nằm trong thư mục `nhat-ky/` trên máy của anh. Thư mục này **không có trong repo**: nhật ký có tên và nhận xét về người trong team, nên `.gitignore` chặn sẵn. Nhật ký dùng để đối chiếu vào **T5** (rà soát cuối tuần), **T7** (chấm hiệu chỉnh cuối tháng), và trả lời câu hỏi "tôi có đang tiến bộ không" bằng bằng chứng thay vì cảm giác.

Có hai cách ghi:

1. **Dùng tab Luyện tư duy trong `roadmap-em.html`** (khuyên dùng). Mỗi ngày trang chỉ hiện những thẻ đến lượt theo lộ trình 12 tuần. Bấm Lưu thì trang ghi ra `nhat-ky/YYYY-MM-DD.json`. Trang tự gom dự đoán để chấm và tính bảng T7.
2. **Ghi tay**, mỗi ngày một file `nhat-ky/YYYY-MM-DD.md`:
   - Điền dần trong ngày, đúng tinh thần "thẻ" trong `04_the-ghi-nho.md`: mỗi ô một dòng, dưới 1 phút mỗi lần, không viết văn.
   - Thứ Hai: thêm 3 dự đoán (T1) vào đầu file. Thứ Sáu: thêm phần rà soát (T5) vào cuối file.
   - Cuối tháng, khi làm T7 trong `03_template.md`, mở lại các file của tháng đó để gom số liệu dự đoán.

## Cách dùng để phân tích tiến bộ

So sánh giữa các tuần/tháng, tìm mẫu lặp lại — không cần công cụ gì thêm ngoài đọc lại nhật ký:

- Đếm số lần tick "Có" ở mục "tôi đã có thể dự đoán được" (Thẻ 5, T4) — nếu tăng theo thời gian, nghĩa là đang dừng lại để nghĩ nhiều hơn trước khi sự cố xảy ra.
- Theo dõi %kiến tạo ở Thẻ 6 qua từng ngày — nên đi lên hoặc ổn định trên 20%, không đi xuống liên tục.
- Đọc lại mục "hôm nay tôi có đổi ý về điều gì" — nếu trống nhiều ngày liên tiếp, đây là tín hiệu đang không cân nhắc thật (xem `01_muc-dich.md`).
- Gộp toàn bộ dự đoán trong tháng vào bảng T7 để có số liệu hiệu chỉnh thật, thay vì suy đoán.

### Tự làm hay để AI làm

Tách rõ hai việc, đừng gộp chung:

| Việc | Ai làm |
|---|---|
| **Gom số liệu** — đếm tick, cộng %, gom dự đoán vào bảng T7 | Có thể nhờ AI hoặc để tab Luyện tư duy làm hộ, vì đây chỉ là phép đếm cơ học, không mất giá trị rèn luyện |
| **Nhận ra mẫu lặp lại và diễn giải nó nghĩa là gì** — ví dụ "tôi thường sai khi dự đoán về gì", "đây là né tránh hay do bận" | Tự làm — đây mới là phần luyện tư duy thật, để AI diễn giải hộ thì mất tác dụng của cả hệ thống |

Đây chính là bài học ở mục "Đọc thay cho làm" trong `00_huong-dan-luyen-tap-tu-duy.md`: công cụ chỉ nên gánh phần cơ học, phần dừng lại để nghĩ phải là của anh.

Nhật ký không cần đẹp, không cần đầy đủ mỗi ngày — mục tiêu là có dữ liệu, không phải có tài liệu hoàn chỉnh. Bỏ lỡ vài ngày thì bỏ qua, không bù (theo đúng quy tắc vận hành trong `00_huong-dan-luyen-tap-tu-duy.md`).
