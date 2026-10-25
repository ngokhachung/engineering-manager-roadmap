# Engineering Manager Roadmap

> **In English.** A single self-contained HTML page I use to work my way from senior developer / tech lead to engineering manager: 98 skills in 21 groups across 4 stages, each with an observable "you don't have this yet" signal, a first exercise you can do this week, and a single verifiable "mastered when" criterion. It comes with a skills dashboard, milestone tracking, a daily thinking-practice system (`tu-duy-leader/`), and a plan for learning in public on LinkedIn — one post a week about the skill I'm practising. No build step, no dependencies: open `roadmap-em.html` in a browser. The content is in Vietnamese; skill names use standard English industry terms.

Một trang HTML tự chứa để theo dõi lộ trình từ senior developer / tech lead lên engineering manager: **98 kỹ năng, 21 nhóm, 4 giai đoạn**, kèm dashboard đo độ phủ và cơ chế xác minh bằng chứng.

Không có build step, không có dependency. Mở `roadmap-em.html` bằng trình duyệt là chạy.

---

## Bảy tab

| Tab | Làm gì |
|---|---|
| **Roadmap** | Cây kỹ năng dạng spine. Mỗi ô mở ra trang chi tiết. Mặc định chỉ hiện 19 kỹ năng lõi; bật "Tất cả 98" khi cần bản đồ đầy đủ. Mỗi giai đoạn có khối **Mốc M0–M3** (tháng 0–3, 3–9, 9–18, 18–30): dấu hiệu đã tới, chỉ số đo hằng tuần/quý, bằng chứng cần thu có ô tick, bẫy của mốc, cửa sang mốc sau, ngày đạt mốc. |
| **Cốt lõi** | 19 kỹ năng lõi kèm lý do vì sao là lõi, cộng bảng 70 template PMBOK phân loại dùng / để dành / bỏ. |
| **Đọc sách** | 16 mục đọc từ 5 cuốn, 2 phase, cộng 60 ngày attention training. Mỗi mục nối thẳng vào các kỹ năng nó phục vụ. |
| **Luyện tư duy** | Làm các bài trong `tu-duy-leader/` ngay trên trang. Mỗi ngày chỉ hiện những thẻ đến lượt theo lộ trình 12 tuần, chia buổi sáng và buổi tối. Trang tự gom dự đoán để chấm, tính bảng hiệu chỉnh T7, và báo các tín hiệu lặp lại mà thẻ đã định ngưỡng. Bấm Lưu thì ghi ra `nhat-ky/YYYY-MM-DD.json`. |
| **LinkedIn** | Học công khai: mỗi tuần một bài LinkedIn về kỹ năng đang học, viết để củng cố kiến thức. Bài tuần này kèm cách viết, góc viết và trạng thái bằng chứng; lịch 12 tuần đầu (bài ra mắt, 10 kỹ năng lõi, một bài trụ cột tiếng Anh), sau đó gợi ý theo kỹ năng đang học; bảng 98 kỹ năng với năm cách viết; khối "Bắt đầu chuẩn bị" cho những bài cần luyện trước nhiều tuần. Trang kỹ năng nào cũng có mục "Bài LinkedIn" để ghi trạng thái, link và chép khung bài — trang không viết bài hộ, không lưu nội dung nháp. |
| **PMP** | Phân tích chứng chỉ PMP: ba domain của ECO với trọng số, mindset được kiểm tra (thang bậc hành động, chuỗi ưu tiên, 12 đáp án gần như luôn sai), và thu hoạch thật khi học xong. Trạng thái **đóng băng**: không còn trên đường chính, chỉ giữ phần dùng thật (sổ rủi ro, bảng bên liên quan, quản trị thay đổi), kèm điều kiện quay lại thi. Lộ trình 30 ngày có tự chấm 0–10 vẫn dùng được, nằm trong khối gập. |
| **Dashboard** | Cân bằng ba trục Leverage / People / Systems, tiến độ theo giai đoạn kèm bằng chứng mốc, bảng 15 chỉ số dẫn dắt / kết quả (cột "Tuần trước" tự tính từ tab Luyện tư duy và tab LinkedIn), tiêu chí dừng của lộ trình, danh sách đã xác minh, gợi ý học tiếp theo trục đang yếu nhất. |

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
- **`tien-do.json`**: bản sao xuất/nhập được, đọc bằng mắt. Không tự cập nhật — bấm "Xuất JSON" ở cuối trang. File chứa nguyên văn các ô bằng chứng, nên chỉ giữ trong máy: `.gitignore` không cho nó lên repo public.

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
  "pmpScores": { "9": 8 },
  "milestones": { "checked": { "m0-doc": true }, "dates": { "M0": "2026-10-01" } },
  "linkedin": { "start": "2026-10-26", "posts": [] }
}
```

`linkedin` chỉ có ngày bắt đầu lịch và danh sách bài (trạng thái, ngày, link). Tick hồ sơ LinkedIn (`prof`) không được xuất, chỉ nằm trong `localStorage` và trong bản đồng bộ.

## `tu-duy-leader/`

Hệ thống luyện tư duy chạy song song với roadmap: 8 template (T1–T8) và 10 thẻ ngắn. Thẻ 8–10 (nói chuyện khó, giao việc, phản hồi SBI) được thêm cho giai đoạn đã dẫn dắt người. Nguyên lý duy nhất của nó là rút ngắn feedback loop của một phán đoán từ tám tháng xuống một tuần, bằng cách buộc mọi phán đoán phải có con số và hạn chót.

Roadmap trỏ vào các mã T1–T8 và Thẻ 1–10 ở phần "Luyện thế nào" của từng kỹ năng, nên hai phần này dùng chung.

Bắt đầu ở `00_huong-dan-luyen-tap-tu-duy.md`. Nếu chỉ làm được một thứ, làm T1.

### `nhat-ky/`

Tab Luyện tư duy ghi mỗi ngày thành một file `nhat-ky/YYYY-MM-DD.json`. Lần đầu bấm Lưu, Chrome hỏi chọn thư mục một lần; từ đó trở đi trang ghi thẳng vào file. Trong lúc gõ, bản nháp được giữ trong trình duyệt nên đóng tab trước khi lưu cũng không mất.

Thư mục này **không lên git**: `.gitignore` kiểu allowlist chặn sẵn, và nên giữ như vậy vì nhật ký có tên và nhận xét về người trong team. Mở bản publish trên claude.ai hoặc dùng trình duyệt không có File System Access API thì nút Lưu tải file về máy, và nút "Nạp file nhật ký" đọc lại các file đó.

## Lộ trình theo mốc

`lo-trinh-em.html` (lộ trình 30 tháng, 4 mốc) đã gộp vào `roadmap-em.html`: khối Mốc ở từng giai đoạn trên tab Roadmap, bảng chỉ số và tiêu chí dừng trên Dashboard, "Sổ PMP viết lại" trên tab PMP. Ô tick và ngày đạt mốc của bản cũ tự chuyển sang khi mở roadmap từ ổ đĩa lần đầu.

## Không có trong repo này

- Sách và tài liệu khoá học có bản quyền (PMBOK® Guide, PMP Examination Content Outline, *Crafting Engineering Strategy*, bộ template PMBOK). Roadmap có trỏ tới chúng bằng đường dẫn tương đối — muốn dùng phần đó thì tự đặt bản hợp lệ của mình vào đúng vị trí.
- Ghi chép cá nhân: `tien-do.json`, `nhat-ky/`, và spec/plan làm việc trong `docs/`.
