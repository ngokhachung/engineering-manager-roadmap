# Engineering Manager Roadmap

Một trang HTML tự chứa để theo dõi lộ trình từ senior developer / tech lead lên engineering manager: **98 kỹ năng, 21 nhóm, 4 giai đoạn**, kèm dashboard đo độ phủ và cơ chế xác minh bằng chứng.

Không có build step, không có dependency. Mở `roadmap-em.html` bằng trình duyệt là chạy.

---

## Sáu tab

| Tab | Làm gì |
|---|---|
| **Roadmap** | Cây kỹ năng dạng spine. Mỗi ô mở ra trang chi tiết. Mặc định chỉ hiện 19 kỹ năng lõi; bật "Tất cả 98" khi cần bản đồ đầy đủ. |
| **Cốt lõi** | 19 kỹ năng lõi kèm lý do vì sao là lõi, cộng phần kiểm kê tài liệu học và bảng 70 template PMBOK phân loại dùng / để dành / bỏ. |
| **Đọc sách** | 16 mục đọc từ 5 cuốn, 2 phase, cộng 60 ngày attention training. Mỗi mục nối thẳng vào các kỹ năng nó phục vụ. |
| **Luyện tư duy** | Làm các bài trong `tu-duy-leader/` ngay trên trang. Mỗi ngày chỉ hiện những thẻ đến lượt theo lộ trình 12 tuần, chia buổi sáng và buổi tối. Trang tự gom dự đoán để chấm, tính bảng hiệu chỉnh T7, và báo các tín hiệu lặp lại mà thẻ đã định ngưỡng. Bấm Lưu thì ghi ra `nhat-ky/YYYY-MM-DD.json`. |
| **PMP** | Phân tích chứng chỉ PMP: ba domain của ECO với trọng số, mindset được kiểm tra (thang bậc hành động, chuỗi ưu tiên, 12 đáp án gần như luôn sai), và thu hoạch thật khi học xong. Kèm lộ trình 30 ngày có tự chấm 0–10 và theo dõi điều kiện dự thi. |
| **Dashboard** | Cân bằng ba trục Leverage / People / Systems, tiến độ theo giai đoạn, danh sách đã xác minh, gợi ý học tiếp theo trục đang yếu nhất. |

## Mỗi kỹ năng có gì

Tên tiếng Anh chuẩn ngành, tiếng Việt làm chú thích. Trang chi tiết gồm:

- **Là gì** — một câu định nghĩa
- **Dấu hiệu chưa có kỹ năng này** — quan sát được, không phải cảm giác
- **Luyện thế nào** — 2–3 bước cụ thể
- **Bài tập đầu tiên** — một lần tập làm được ngay trong tuần
- **Coi là thành thạo khi** — một dấu hiệu duy nhất, kiểm chứng được
- **Tài liệu** — file, sách, template, link ngoài
- **Bằng chứng của tôi** — ô nhập tình huống thật để được chấm

Bốn trạng thái: chưa học → đang học → thành thạo → bỏ qua. Bấm chấm tròn bên trái ô để đổi ngay tại chỗ.

## Xác minh bằng bằng chứng

Đánh dấu "thành thạo" bằng tay thì dễ tự lừa. Với mỗi kỹ năng có ô nhập bằng chứng: viết một tình huống thật — làm gì, với ai, kết quả ra sao — rồi nhờ Claude chấm. Kết quả trả về gồm kết luận (đạt / gần đạt / chưa đạt), điểm 0–100, phần còn thiếu, và một việc cụ thể làm được trong hai tuần tới.

Prompt chấm được viết nghiêng về nghiêm khắc: khẳng định chung chung, ý định tương lai, hay kiến thức lý thuyết đều không đủ để kết luận là đạt.

*Tính năng này chỉ chạy khi trang được publish làm Claude Artifact (cần capability `sample`). Mở file trực tiếp từ ổ đĩa thì mọi thứ khác vẫn chạy bình thường, riêng nút chấm bị ẩn.*

## Ba trục

Mỗi kỹ năng thuộc một trục. Đây là chỉ số quan trọng nhất trên dashboard:

- **Leverage** (21) — tạo kết quả qua hệ thống và qua người khác
- **People** (39) — giao tiếp, feedback, dẫn dắt, xung đột
- **Systems & Business** (38) — quyết định, số liệu, chiến lược, kinh doanh

Developer đi lên quản lý gần như luôn đầy ở Leverage và Systems, rỗng ở People — và People mới là trục quyết định. Dashboard sẽ nói thẳng điều đó khi có đủ dữ liệu.

## Lưu tiến độ

- **Mở từ ổ đĩa**: lưu vào `localStorage` của trình duyệt. Link tới file trong máy bấm là mở.
- **Publish làm Artifact**: đồng bộ giữa các máy. Link file đổi thành nút chép đường dẫn.
- **`tien-do.json`**: bản sao xuất/nhập được, đọc bằng mắt, commit vào git được. Không tự cập nhật — bấm "Xuất JSON" ở cuối trang.

Cấu trúc:

```json
{
  "schema": "career-path-roadmap-em",
  "version": 1,
  "summary":  { "skillsDone": 12, "coreDone": 4, "coreTotal": 19, "readingDone": 5 },
  "status":   { "calibration": "done", "one-on-one": "learning" },
  "evidence": { "calibration": { "t": "...", "v": { "ket_luan": "dat", "diem": 82 } } },
  "reading":  { "ch3": 1 },
  "attentionDays": { "1": 1 },
  "pmpDays":  { "9": 1 },
  "pmpScores": { "9": 8 }
}
```

## `tu-duy-leader/`

Hệ thống luyện tư duy chạy song song với roadmap: 8 template (T1–T8) và 10 thẻ ngắn. Thẻ 8–10 (nói chuyện khó, giao việc, phản hồi SBI) được thêm cho giai đoạn đã dẫn dắt người. Nguyên lý duy nhất của nó là rút ngắn feedback loop của một phán đoán từ tám tháng xuống một tuần, bằng cách buộc mọi phán đoán phải có con số và hạn chót.

Roadmap trỏ vào các mã T1–T8 và Thẻ 1–10 ở phần "Luyện thế nào" của từng kỹ năng, nên hai phần này dùng chung.

Bắt đầu ở `00_huong-dan-luyen-tap-tu-duy.md`. Nếu chỉ làm được một thứ, làm T1.

### `nhat-ky/`

Tab Luyện tư duy ghi mỗi ngày thành một file `nhat-ky/YYYY-MM-DD.json`. Lần đầu bấm Lưu, Chrome hỏi chọn thư mục một lần; từ đó trở đi trang ghi thẳng vào file. Trong lúc gõ, bản nháp được giữ trong trình duyệt nên đóng tab trước khi lưu cũng không mất.

Thư mục này **không lên git**: `.gitignore` kiểu allowlist chặn sẵn, và nên giữ như vậy vì nhật ký có tên và nhận xét về người trong team. Mở bản publish trên claude.ai hoặc dùng trình duyệt không có File System Access API thì nút Lưu tải file về máy, và nút "Nạp file nhật ký" đọc lại các file đó.

## Không có trong repo này

Sách và tài liệu khoá học có bản quyền (PMBOK® Guide, PMP Examination Content Outline, *Crafting Engineering Strategy*, bộ template PMBOK, transcript khoá Udemy). Roadmap có trỏ tới chúng bằng đường dẫn tương đối — muốn dùng phần đó thì tự đặt bản hợp lệ của mình vào đúng vị trí.

## Các file khác

- `lo-trinh-em.html` — bản lộ trình theo mốc thời gian (30 tháng, 4 mốc). Bản cũ, giữ lại để đối chiếu; `roadmap-em.html` mới là bản đang dùng.
- `lich-doc-sach.html` — lịch đọc sách bản độc lập, trước khi được đưa vào thành một tab.
