# Gộp lo-trinh-em.html vào roadmap-em.html — bản thiết kế

_Ngày 18/10/2026. Trạng thái: chờ duyệt._

Ký hiệu: **[anh quyết]** là điều anh đã chọn. **[em quyết]** là lựa chọn của em, anh đổi được khi đọc. Phần còn lại là mô tả cho người làm.

## 1. Vì sao

Anh chỉ mở `lo-trinh-em.html` để đối chiếu xem nó có trùng với `roadmap-em.html` không. Hai file dùng chung một khung 4 giai đoạn, nhưng lại lệch nhau ở vài chỗ: Thẻ 4, cách tách T7, và lập trường về PMP. Đọc file này rồi file kia sẽ nhận được lời khuyên trái ngược.

Mục tiêu là chỉ còn một file [anh quyết]. Phần trùng thì bỏ, phần chỉ `lo-trinh-em` có thì mang sang, và các mâu thuẫn được giải quyết theo hướng anh đã duyệt.

## 2. Mục tiêu, ngoài phạm vi, điều phải tránh

**Mục tiêu**
- Mọi nội dung chỉ `lo-trinh-em` có đều xuất hiện trong roadmap, với câu chữ giữ nguyên văn.
- Những ô anh đã tick trong file cũ tự chuyển sang roadmap.
- Xoá `lo-trinh-em.html` [anh quyết]. Git vẫn giữ lịch sử của file.

**Ngoài phạm vi**
- Không viết lại nội dung, chỉ di chuyển.
- Không thêm kỹ năng mới.

**Điều phải tránh**
- Trang Roadmap dài gấp đôi vì nhồi thêm chữ.
- Mất dữ liệu anh đã tick.
- Còn sót một lời khuyên ngược chiều giữa các tab.

## 3. Bỏ đi (trùng hoặc đã qua) [anh quyết]

- Danh sách kỹ năng Đòn bẩy, Con người, Hệ thống của từng mốc: đã là các ô kỹ năng trên roadmap.
- Phần "Phương pháp" của từng mốc: đã nằm trong mục "Luyện thế nào" và trong tab Luyện tư duy.
- Lịch đọc sách.
- "Ba mươi ngày đầu" (09–13/09 và tuần 1–4 của tháng 9/2026), gồm các ô `p-*` và `w*-*`: đã qua.
- **[em quyết]** Mục "Ba điều chỉnh" ở đầu file. Ý về PMP chuyển vào tab PMP (mục 7). Ý "nút thắt là bề mặt thực hành" đã có nguyên văn trong "Cửa sang M1". Ý "ba lịch gộp thành một" thì tab Luyện tư duy đã làm.

## 4. Mỗi giai đoạn trên tab Roadmap có thêm phần "Mốc" [anh quyết]

Dưới phần đầu của mỗi giai đoạn GĐ0–GĐ3, thêm một khối `<details>` tên "Mốc M0 · Tháng 0–3 · Senior Dev có ảnh hưởng". Tương tự cho M1 (tháng 3–9), M2 (9–18) và M3 (18–30). Bên trong, mọi câu chữ chép nguyên văn từ `lo-trinh-em.html`:

- câu hỏi của mốc;
- **Đã tới khi**: 3 dấu hiệu;
- **Đo hằng tuần** và **Đo hằng quý**;
- **Bằng chứng cần thu**: 5 ô tick, giữ đúng id cũ (`m0-doc`, `m0-t2`, …, `m3-deputy`), mỗi ô có dòng ghi chú in nghiêng như bản cũ;
- **Bẫy của mốc này**;
- **Cửa sang M(n+1)**; riêng M3 thay bằng **Sau M3**;
- ô **Đạt mốc ngày**, dạng `type="date"`.

Nhãn giai đoạn ở phần đầu đổi thành "Giai đoạn 0 · Tháng 0–3".

**Mốc hiện tại** là mốc đầu tiên chưa có ngày đạt, giống cách bản cũ tính. Nếu cả 4 mốc đều có ngày thì không còn mốc hiện tại.

**[em quyết]** Khối `<details>` của mốc hiện tại mở sẵn, các mốc khác gập lại, để trang không dài thêm.

**Dashboard**, mục "Tiến độ theo giai đoạn": mỗi dòng thêm "bằng chứng x/5" và ngày đạt mốc nếu có.

**Lưu dữ liệu**
- Thêm `state.ms = {checked:{}, dates:{}}`. Dữ liệu này đi theo đúng mọi đường mà tiến độ hiện có đang đi: `writeLocal`, `save()` gửi lên `db.doc(DOC)`, nạp lại từ `onSnapshot`, `buildExport()` dưới khoá `milestones`, `applyImport` đọc lại khoá đó, và nút "Xoá tiến độ" xoá nó.
- README cập nhật cấu trúc `tien-do.json`.

## 5. Chuyển dữ liệu từ bản cũ

Khi tải trang, nếu `localStorage` có khoá `career-path-em-v1` mà `state.ms.from` chưa được đặt:
- Chép các ô `m0-*` đến `m3-*` có giá trị `true`, và các ngày `M0`, `M1`, `M2`, `M3`, `PMP`.
- Chỉ chép vào những khoá roadmap còn trống.
- Ngày cũ ở dạng `dd/mm/yyyy` (hoặc `d/m/yyyy`) được đổi sang `yyyy-mm-dd`. Ngày không đọc được thì bỏ qua và đếm lại.
- Đặt `state.ms.from = "lo-trinh-em"` để không chuyển lần thứ hai.
- Gọi `save()` và hiện một lần thông báo "đã chuyển N mục từ lo-trinh-em".
- Không xoá khoá cũ.

Ghi chú: khi mở bằng `file://`, Chrome dùng chung `localStorage` cho các file trên ổ đĩa, nên chuyển được. Bản publish trên claude.ai là một origin khác, nên không chuyển. Dữ liệu `db` của bản cũ (`tracker/progress`) cũng không chuyển, vì đó là một Artifact khác.

## 6. Dashboard: bảng chỉ số và tiêu chí dừng [anh quyết]

**Bảng chỉ số**: đủ 14 dòng của bản cũ (chỉ số, loại, nguồn dữ liệu, mốc, ngưỡng), chép nguyên văn, kèm câu giải thích chỉ số dẫn dắt và chỉ số kết quả.

**[em quyết]** Thêm cột "Tuần trước", tính từ dữ liệu của tab Luyện tư duy, cho 5 chỉ số tính được:
- số dự đoán đã chấm Đúng/Sai trong tuần trước;
- tổng tick Thẻ 4;
- % kiến tạo trung bình;
- số lần "gật đầu deadline" ở Thẻ 2B;
- độ khớp của nhóm 60–80% ở bảng T7 tháng trước, dạng `đúng/tổng`.

Các chỉ số còn lại hiện `—`.

**Tiêu chí dừng của lộ trình**: chép nguyên văn ba khối "Sau 6 tháng — 08/03/2027", "Sau 12 tháng ở M1" và "Bất cứ lúc nào". **[em quyết]** Khối "Bất cứ lúc nào" có thêm một dòng cảnh báo tính tự động: nếu % kiến tạo trung bình dưới 10% trong cả 4 tuần gần nhất (mỗi tuần đều có dữ liệu Thẻ 6), hiện đúng câu "dừng nhận việc mới…" của bản cũ.

## 7. Tab PMP: đóng băng theo "Sổ PMP viết lại" [anh quyết]

- Đầu tab thêm khối **"Trạng thái: đóng băng"**: câu mở đầu "60–80 giờ… cần đổi vai…", danh sách **Giữ — dùng thật** (5 dòng), danh sách **Bỏ — không dùng tới** (5 dòng), **Điều kiện quay lại thi PMP**, và ô ngày **"Ghi lại quyết định hoãn"** (`state.ms.dates.PMP`).
- Mục "Lộ trình 30 ngày" đổi tiêu đề thành "Lộ trình 30 ngày — đóng băng". Em quyết gập nó vào một khối `<details>` đóng sẵn. Các ô tick và điểm vẫn dùng được như cũ, không xoá dữ liệu nào.
- Đổi đoạn mở đầu của tab cho khớp: PMP không còn trên đường chính, chỉ giữ phần dùng thật.

## 8. Tab Luyện tư duy

- **Thẻ 4 mở từ tuần 1** [anh quyết]: `from: 1`, và `toi` có `the4` từ tuần 1. Test hiện có của tuần 1 và tuần 5 sửa theo.
- **Nhãn T1** [anh quyết]: mỗi dự đoán có `about: "nguoi" | "kythuat"`, chọn bằng hai nút "Về người" và "Về kỹ thuật".
  - Gom dự đoán (`tdPredictions`) mang theo `about`. Dự đoán T2 có `about: "kythuat"`, trừ khi T2 có ô `about` riêng **[em quyết: T2 cũng có ô này]**.
  - Kiểm T1 thêm một cảnh báo (không chặn) khi trong ngày có dự đoán nhưng không cái nào về người: `"Chưa có dự đoán nào về người khác — đó là loại dự đoán duy nhất luyện được năng lực dẫn dắt."`
- **T7 tách bảng**: `tdT7Table(days, month, about)`, trong đó `about` có thể bỏ trống để tính tất cả. Màn T7 hiện bảng chung như hiện nay, thêm hai bảng "Về người" và "Về kỹ thuật" khi có dự đoán đã gắn nhãn. Dự đoán chưa gắn nhãn chỉ vào bảng chung.
- **Nhắc theo nhịp vận hành [em quyết]**: thêm hai dòng nhắc vào mục "Đến hạn hôm nay", mỗi dòng có link mở đúng khối Mốc trên tab Roadmap.
  - Từ ngày cuối tháng tới hết ngày 7 tháng sau (cùng khung với T7): "Rà bằng chứng của mốc M_n (x/5)".
  - Ngày 1–7 của tháng 1, 4, 7, 10: "Xét cửa lên mốc + tiêu chí dừng · đọc lại T2 đầu tiên cạnh cái mới nhất", và thêm "· strategy note" khi mốc hiện tại là M2 trở lên.

## 9. Xoá file và cập nhật tài liệu

- Xoá `lo-trinh-em.html`, chỉ làm sau khi roadmap đã qua mọi bước kiểm.
- README: bỏ dòng về `lo-trinh-em.html` ở mục "Các file khác". Cập nhật mô tả các tab Roadmap (phần mốc), Dashboard (chỉ số và tiêu chí dừng) và PMP (đóng băng), cùng cấu trúc `tien-do.json` (khoá `milestones`).
- `.gitignore`: bỏ dòng `!lo-trinh-em.html`.

## 10. Ràng buộc

Giống tab Luyện tư duy:
- file tự chứa, không thư viện;
- JS ES5 trong trang;
- theme sáng và tối;
- bề rộng 360px không cuộn ngang;
- không làm hỏng tiến độ, xuất/nhập JSON hay nhật ký hiện có.

Logic thuần (đổi ngày `dd/mm/yyyy`, chuyển dữ liệu, tính mốc hiện tại, các chỉ số "Tuần trước", cảnh báo kiến tạo dưới 10%, nhắc theo nhịp) phải có test Node như khối `tuduy-core`.

## 11. Kiểm tra trước khi giao

- `node --test tests/tu-duy.test.js` pass.
- Trên Chrome (localhost), mồi `career-path-em-v1` với vài ô tick và ngày `dd/mm/yyyy`, rồi tải roadmap. Kỳ vọng:
  - thông báo chuyển dữ liệu hiện một lần, tải lại không chuyển lần hai;
  - ô tick và ngày hiện đúng ở khối Mốc;
  - xuất JSON có `milestones`, nhập lại đúng;
  - "Xoá tiến độ" xoá phần mốc.
- Tab PMP hiện khối đóng băng, lộ trình 30 ngày đã gập mà vẫn tick được.
- Dashboard có bảng chỉ số, cột "Tuần trước" có số khi mồi dữ liệu tab.
- Bề rộng 360px và theme tối.
- Đọc nguyên văn: so từng khối đã chép với `lo-trinh-em.html` trước khi xoá file đó.
