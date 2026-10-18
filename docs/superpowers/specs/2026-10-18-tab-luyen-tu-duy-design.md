# Tab "Luyện tư duy" trong roadmap-em.html — bản thiết kế

_Ngày 18/10/2026. Trạng thái: chờ duyệt._

Ký hiệu: **[anh quyết]** là điều anh đã chọn trong lúc trao đổi. **[em quyết]** là lựa chọn của em, anh có thể đổi khi đọc. Phần còn lại là mô tả kỹ thuật cho người làm.

---

## 1. Vì sao làm

Bộ `tu-duy-leader/` (T1–T8, Thẻ 1–7) đã có đủ công cụ nhưng chưa có dữ liệu: thư mục `nhat-ky/` vẫn trống, và chính roadmap ghi rằng cả ba lịch (PMP, tư duy, đọc sách) đều dừng ở ngày đầu. Lý do thực tế là để làm một bài, anh phải mở ba file md, tự tạo file theo ngày, rồi tự nhớ hôm nay đến lượt bài nào.

Tab này gom tất cả vào một chỗ: mỗi ngày mở ra là thấy đúng những gì cần làm, gõ vào, bấm Lưu, ra một file JSON.

Nguyên lý của cả hệ thống, theo `00_huong-dan-luyen-tap-tu-duy.md`: rút ngắn vòng phản hồi của một phán đoán từ tám tháng xuống một tuần, bằng cách buộc mọi phán đoán có con số và hạn chót. Tab phải phục vụ nguyên lý này. Nó không được biến thành một form dài.

## 2. Mục tiêu, ngoài phạm vi, điều phải tránh

**Mục tiêu**
- Mỗi ngày chỉ hiện những thẻ đến lượt, chia hai khối Sáng và Tối.
- Nhập trên giao diện, bấm Lưu thì ghi ra file JSON trong thư mục anh chọn.
- Những phần đếm cơ học (gom dự đoán, đếm tick, tính bảng T7, phát hiện tín hiệu lặp lại) do trang làm. Phần diễn giải do anh tự viết. Đây đúng là quy tắc trong `tu-duy-leader/README.md`, mục "Tự làm hay để AI làm".

**Ngoài phạm vi bản này** [em quyết]
- Không đẩy số liệu sang Dashboard, không tự đổi trạng thái kỹ năng trên roadmap. Kỹ năng vẫn được chấm bằng ô bằng chứng như hiện nay.
- Không nhắc giờ, không gửi thông báo.
- Không có giao diện nhập riêng cho điện thoại. Trong ngày anh ghi chú bằng app điện thoại của mình, tối mới nhập vào.

**Điều phải tránh** (nếu xảy ra thì coi như hỏng, dù chức năng vẫn chạy)
- Mở ra thấy một trang dài toàn ô trống. Hướng dẫn của anh đã cảnh báo: làm hết cùng lúc thì sang tuần thứ ba sẽ bỏ.
- Mất dữ liệu vì quên bấm Lưu hoặc lỡ đóng tab.
- Nhật ký bị đưa lên git. File sẽ có tên và nhận xét về người trong team.
- Trang tự diễn giải hộ, kiểu "anh hay sai về X". Trang chỉ đếm và hiện con số.

## 3. Nhịp dùng trong ngày [anh quyết]

- **Buổi sáng:** làm các thẻ làm trước được.
- **Trong ngày:** ghi chú vào điện thoại.
- **Buổi tối:** nhập phần ghi chú vào tab.

Bố cục: **cách A, chia theo buổi** [anh quyết]. Đầu trang có thanh ngày `‹ Thứ Hai 19/10 ›`, nhãn "Tuần N/12", và nút **Lưu**. Thân trang chia hai khối **Buổi sáng** và **Buổi tối**. Cột phải có hai nhóm: **Khi cần** (thẻ dùng theo sự việc) và **Định kỳ** (T7, T8). Ở màn hình hẹp, cột phải chuyển xuống dưới hai khối chính.

## 4. Lộ trình 12 tuần [anh quyết: thêm dần]

Tuần 1 bắt đầu từ thứ Hai của tuần có lần lưu đầu tiên. Nếu lưu lần đầu vào ngày mai thì đó là thứ Hai 19/10. Số tuần được tính lại từ ngày của file cũ nhất trong thư mục, nên không cần file cấu hình riêng. Ngày bỏ lỡ thì để trống, không bù.

| Tuần | Buổi sáng | Buổi tối | Khi cần |
|---|---|---|---|
| 1–4 | Thứ Hai: **Rà soát tuần** (T5 gộp Thẻ 7) rồi **T1** | **Thẻ 2** cho từng cuộc họp | T4, Thẻ 5, Thẻ 8, Thẻ 9, Thẻ 10 |
| 5–8 | thêm **Thẻ 1** mỗi ngày | thêm **Thẻ 4** (bộ đếm), **Thẻ 6** | thêm T2, Thẻ 3 |
| 9–12 | thêm **T6** khi đến hạn | — | thêm T3 |
| 10–12 | — | thêm **T8** mỗi tối | — |
| Cuối tháng | **T7** | — | — |
| 12 | Nhắc ngày rà soát, kèm tiêu chí dừng | — | — |
| 13 trở đi | Hiện đủ mọi thẻ | | |

Lộ trình gốc trong `00_huong-dan` không xếp Thẻ 3 và Thẻ 4. **[em quyết]** Thẻ 3 vào tuần 5 cùng T2. Thẻ 4 vào tuần 5 cùng Thẻ 1, vì Thẻ 1 hỏi đúng câu "tự làm hay giao".

Ba thẻ mới (8, 9, 10) có từ tuần 1, vì anh đang dẫn dắt người [anh quyết]. Chúng thuộc nhóm dùng theo sự việc, chỉ hiện khi anh bấm mở, nên không làm tăng việc định kỳ.

Quy tắc hiển thị **[em quyết]**:
- **Bỏ lỡ sáng thứ Hai:** Rà soát tuần và T1 hiện vào buổi sáng của ngày đầu tiên anh mở tab trong tuần đó, kèm nhãn "thường làm sáng thứ Hai". Chúng chỉ biến mất sang tuần sau. Cách này không trái quy tắc "không bù", vì vẫn là cùng một tuần.
- **Tuần 1:** chưa có dự đoán nào để chấm, nên tuần 1 chỉ có T1, không có Rà soát tuần.
- **Thanh ngày:** không đi quá hôm nay. Khi đã có file thì cũng không lùi về trước thứ Hai của tuần 1, để số tuần không bị dịch. Lùi về một ngày đã qua để nhập bù phần buổi tối thì được.
- **Thẻ chưa tới lượt:** hiện mờ trong cột phải, kèm ghi chú "mở từ tuần 5". Bấm vào vẫn mở được, có một dòng nhắc lại cảnh báo của hướng dẫn.
- **T6:** đến hạn khi đã qua 14 ngày kể từ lần T6 gần nhất. Khi đến hạn thì hiện trong khối Sáng.
- **T7:** hiện trong khối Sáng từ ngày cuối tháng cho tới khi làm xong, nhưng không quá ngày 7 của tháng sau. T7 tính trên tháng dương lịch: làm vào ngày cuối tháng thì tính cho tháng đó, làm từ ngày 1 tới ngày 7 thì tính cho tháng trước.
- **T8 sau tuần 12:** làm trong hai tuần đầu của mỗi quý dương lịch (tháng 1, 4, 7, 10).
- **Phiên bản tối thiểu cho tuần bận** (theo hướng dẫn mục 7): T1 cho phép ghi 1 dự đoán thay vì 3.

## 5. Nội dung từng thẻ

Câu hỏi và nhãn lấy nguyên văn từ `03_template.md` và `04_the-ghi-nho.md`. Không viết lại.

Quy ước chuyển sang giao diện:
- Ô `□` có kèm `→ ____` thành ô tick cộng một dòng nhập.
- Ô `□` không kèm dòng nhập thành ô tick.
- Ô `[ ] Có [ ] Không` thành hai nút chọn.
- Mọi ô nhập đều một dòng, trừ các mục mà template ghi "3-5 câu". Hướng dẫn mục 6 ghi rõ "mỗi ô một dòng".

| Thẻ | Số lần mỗi ngày | Ghi chú cho người làm |
|---|---|---|
| T1 | 1 (thứ Hai) | 1–3 dự đoán. Mỗi dự đoán có: mệnh đề, xác suất, hạn chót, căn cứ, "điều gì sẽ khiến tôi sai". Chặn 50%, gợi ý chọn 40 hoặc 60. Cảnh báo (không chặn) khi trống dòng "điều gì sẽ khiến tôi sai". Ba câu mồi trong `00_huong-dan` §2 hiện làm placeholder. |
| Rà soát tuần (T5 + Thẻ 7) | 1 (thứ Hai) | Tự liệt kê mọi dự đoán tạo trước ngày rà soát mà chưa có điểm Đúng hoặc Sai, kể cả dự đoán từ các tuần trước còn "Chưa tới hạn". Dự đoán có hạn chót chưa tới thì mặc định là "Chưa tới hạn". Mỗi dự đoán chọn Đúng, Sai hoặc Chưa tới hạn, kèm ghi chú. Các câu còn lại: cái sai nhất, đổi ý về điều gì, % phản ứng / kiến tạo, một câu tự kiểm, ôm việc gì, né cuộc nói chuyện nào. Gợi ý sẵn số liệu tuần: tổng tick Thẻ 4, số lần "gật đầu deadline" ở Thẻ 2B, % kiến tạo trung bình từ Thẻ 6. Anh có thể sửa các số này. |
| Thẻ 1 | 1 | |
| Thẻ 2 (2A–2D) | nhiều | Mỗi cuộc họp: chọn loại, ghi tên ngắn, trả lời bộ câu của loại đó. Nút "+ Thêm cuộc họp". |
| Thẻ 3 | nhiều | |
| Thẻ 4 | 1 | Bộ đếm `[–] n [+]` cho số lần "tự làm vì nhanh hơn", cộng danh sách một dòng cho từng việc nếu muốn ghi. |
| Thẻ 5 | nhiều | |
| Thẻ 6 | 1 | |
| T2, T3, T4, T6 | nhiều | Mỗi lần là một mục riêng trong ngày. Mục 9 của T2 là dự đoán, nên được tính vào T7 như một dự đoán T1. |
| T7 | 1 (cuối tháng) | Trang tự gom các dự đoán có hạn chót trong tháng đã chấm Đúng hoặc Sai, xếp vào 4 nhóm xác suất (20–40, 40–60, 60–80, 80–100), tính tỷ lệ thực và độ lệch. Ba dòng "mẫu lặp lại" để trống cho anh tự viết. Từ tuần 12, hiện thêm bảng so sánh giữa các tháng. |
| T8 | 1 | Bảng các khối 30 phút: làm gì, P/K, ai khởi xướng. Phần phân tích cuối hai tuần (tổng số khối, tỷ lệ P/K) do trang tính. Ba việc ngốn thời gian nhất và hành động thì anh tự viết. |
| Thẻ 8, 9, 10 | nhiều | Nội dung ở mục 6. |

**Mục "Đến hạn hôm nay" ở đầu khối Sáng** [em quyết]: liệt kê các dự đoán có hạn chót hôm nay, các phản hồi SBI sắp hết hạn 48 giờ mà chưa nói, các mốc kiểm tra việc đã giao (Thẻ 9), và các việc "cần nói với ai đó" ở Thẻ 6 đến hạn. Danh sách chỉ để đọc, bấm vào thì mở mục gốc.

**Tín hiệu lặp lại** [em quyết]: trang tự đếm theo bảng "Ba tín hiệu cần chú ý" trong `04_the-ghi-nho.md`, cộng các ngưỡng ghi ngay trong thẻ. Khi chạm ngưỡng thì hiện một dòng cảnh báo nguyên văn theo thẻ, không thêm lời diễn giải:
- 3 buổi 2D liên tiếp bỏ qua "nói một điều nên làm khác".
- 5 ngày liên tiếp Thẻ 6 không ghi "đổi ý".
- 3 sự cố liên tiếp chọn "Có, tôi đã có thể dự đoán" (Thẻ 5 hoặc T4).
- 3 cuộc họp 2A liên tiếp không ra quyết định.
- % kiến tạo dưới 20% trong 3 ngày liên tiếp (Thẻ 6).
- 3 tuần liên tiếp T5 không đổi ý về điều gì.

## 6. Ba thẻ mới

Viết thành **Thẻ 8, 9, 10** trong cả hai bản `04_the-ghi-nho.md`: bản trong repo (`tu-duy-leader/`) và bản gốc (`tư duy leader/`) [em quyết]. Văn phong giữ như các thẻ cũ.

```
THẺ 8 — Trước cuộc nói chuyện khó (3 phút)

□ Sự kiện quan sát được là gì? (thứ camera ghi lại được, không phải kết luận)
  → ____________________________
□ Câu chuyện tôi đang tự kể về động cơ của họ?  → ______________
  Còn cách giải thích nào khác?  → ______________
□ Tôi thật sự muốn gì — cho tôi, cho họ, cho quan hệ?
  → ____________________________
□ Câu mở đầu: nêu sự kiện, rồi hỏi họ nhìn thế nào
  → ____________________________

Sau buổi nói:
□ Họ có im lặng hoặc gay gắt lên không?  [ ] Có  [ ] Không
□ Nếu có: tôi có dừng nội dung lại để khôi phục an toàn không?
```

```
THẺ 9 — Khi giao việc (2 phút)

□ Giao việc gì, cho ai?  → ____________________________
□ Cấp uỷ quyền:
  1 Tôi quyết, báo lại  ·  2 Tôi quyết, giải thích vì sao
  3 Tôi hỏi ý rồi quyết  ·  4 Cùng quyết
  5 Tôi góp ý, bạn quyết  ·  6 Bạn quyết, tôi hỏi lại sau
  7 Bạn quyết, không cần báo
  → Cấp ___   Đã nói rõ cấp này ra miệng chưa?  [ ] Rồi  [ ] Chưa
□ Đã nói: vì sao việc này quan trọng · ràng buộc · thế nào là xong?
□ Hẹn kiểm tra theo cột mốc, không theo cảm hứng: ngày ______
□ Việc này căng hơn sức họ hiện tại một chút chưa? Lưới an toàn là gì?
  → ____________________________
```

```
THẺ 10 — Ghi phản hồi SBI (1 phút, ghi lúc thấy, nói trong 48 giờ)

Người: ________   [ ] Khen  [ ] Góp ý
S — Tình huống (khi nào, ở đâu):  ____________________
B — Hành vi quan sát được:        ____________________
I — Tác động (lên team, sản phẩm, tôi): ______________
Hạn nói (≤ 48 giờ): ______   Đã nói: [ ]

Tự kiểm: B có phải thứ camera quay được không?
Nếu là tính từ ("thiếu trách nhiệm") → viết lại.
```

Các kỹ năng trong roadmap được thêm một dòng tài liệu trỏ tới thẻ mới [em quyết]:
- Thẻ 8: STATE, Psychological Safety, Managing Underperformance, Saying No.
- Thẻ 9: Delegating Decisions, Delegation Levels, Stretch Assignment.
- Thẻ 10: SBI Feedback, Timely Feedback.

## 7. Lưu file

**[anh quyết]** Bấm Lưu thì ra file JSON.

**[em quyết]** Cách ghi, đề xuất đã nói với anh và anh không phản đối:

1. **Lần đầu bấm Lưu:** gọi `showDirectoryPicker({id:"nhat-ky", mode:"readwrite"})` để anh chọn thư mục. Gợi ý thư mục `D:\LEARNING\career-path\nhat-ky\`; trong hộp chọn, anh tạo thư mục mới được. Lưu handle vào IndexedDB.
2. **Mỗi lần Lưu:** ghi đè `<thư mục>/YYYY-MM-DD.json` của ngày đang xem, qua `getFileHandle(name,{create:true}).createWritable()`. Mỗi ngày một file, theo quy ước trong `tu-duy-leader/README.md`.
3. **Mở lại trang:** kiểm tra quyền bằng `queryPermission`. Nếu trạng thái là `prompt`, hiện nút "Kết nối thư mục nhật ký", vì `requestPermission` cần một cú bấm của người dùng. Bấm Lưu cũng kích hoạt bước xin quyền này.
4. **Đọc lịch sử:** khi đã có quyền, đọc mọi file khớp mẫu `^\d{4}-\d{2}-\d{2}\.json$` trong thư mục. Từ đó dựng chỉ mục cho Rà soát tuần, T7, tín hiệu lặp lại và số tuần.
5. **Bản nháp:** mỗi lần nhập (debounce khoảng 500 ms), lưu cả ngày vào `localStorage` với khoá `roadmap-em-tuduy-v1`. Khoá này cũng giữ một bản sao của mọi ngày đã lưu, để vẫn xem được lịch sử khi chưa có quyền thư mục. Nếu file và bản sao khác nhau thì file thắng.
6. **Trạng thái cạnh nút Lưu:** "chưa lưu vào file", "đã lưu 07:12", hoặc "chỉ lưu trong trình duyệt". Khi có thay đổi chưa lưu mà anh đổi ngày hoặc đóng tab, hiện nhắc qua `beforeunload`.
7. **Dự phòng** khi không có File System Access API (bản publish trên claude.ai, Firefox, điện thoại): nút Lưu tải `YYYY-MM-DD.json` về máy qua capability `downloads` (biến `dlFn` sẵn có) hoặc Blob, giống `doExport()`. Có thêm nút "Nạp file nhật ký" dùng `<input type="file" multiple accept=".json">` để đọc lại các file cũ vào bản sao trong trình duyệt.

**Riêng tư**
- `.gitignore` kiểu allowlist đã chặn `nhat-ky/`. Không thêm dòng mở nào cho thư mục này.
- Dữ liệu tab này **không bao giờ** ghi vào `db` của Artifact (`db.doc(DOC)`), không đưa vào `buildExport()`, và nút "Xoá tiến độ" không xoá nó. Nút "Xoá tiến độ" hiện chỉ xoá trạng thái roadmap.

**Định dạng file** (`schema` để sau này còn nâng cấp được):

```json
{
  "schema": "career-path-tu-duy-ngay",
  "version": 1,
  "date": "2026-10-19",
  "savedAt": "2026-10-19T00:12:05.000Z",
  "entries": {
    "t1":      { "predictions": [ { "id": "2026-10-19#1", "text": "...", "prob": 65, "due": "2026-10-23", "basis": "...", "wrongIf": "..." } ] },
    "review":  { "grades": { "2026-10-12#1": "dung", "2026-10-12#2": "chua" }, "notes": { "2026-10-12#1": "..." },
                 "wrongest": "...", "changedMind": "...", "reactivePct": 70, "creativePct": 30,
                 "selfCheck": "...", "hoarded": "...", "avoided": "..." },
    "the1":    { "...": "..." },
    "meetings":[ { "type": "2C", "title": "standup", "checks": { "listen": true }, "notes": { "risk": "..." } } ],
    "the4":    { "count": 2, "items": ["..."] },
    "the6":    { "creativePct": 25, "changedMind": "...", "teamStronger": "...", "pending": "...", "pendingDue": "2026-10-21" },
    "the3": [], "the5": [], "t2": [], "t3": [], "t4": [], "t6": [],
    "the8": [], "the9": [], "the10": [],
    "t7":      { "month": "2026-10", "table": [ { "bucket": "60-80", "n": 5, "hit": 3 } ], "patterns": { "wrongAbout": "...", "rightAbout": "...", "missed": "..." } },
    "t8":      { "blocks": [ { "slot": "08:30", "what": "...", "pk": "P", "by": "..." } ] }
  }
}
```

- Mục nào không dùng trong ngày thì bỏ hẳn khỏi `entries`.
- Dự đoán có id dạng `<ngày tạo>#<số thứ tự>`. Dự đoán ở mục 9 của T2 dùng id `<ngày>#t2-<n>`.
- Điểm chấm nằm trong file của ngày chấm, không sửa lại file cũ.
- Mã điểm: `dung`, `sai`, `chua`.

## 8. Gắn vào roadmap-em.html

- **Điều hướng:** thêm `<a href="#/tu-duy" id="nav-tuduy">Luyện tư duy</a>` vào `.nav`, đặt sau "Đọc sách". Thêm `<main class="wrap" id="view-tuduy" hidden>`. Sửa `route()` để nhận `#/tu-duy`, giống cách `#/pmp` đang làm. Ngày đang xem để trong hash, dạng `#/tu-duy/2026-10-19`, để reload vẫn đúng ngày.
- **CSS:** dùng lại token màu và các class sẵn có (`.wrap`, `.intro`, `.d-sec`, `.tag`, `.ghost`…). Bảo đảm chạy ở cả theme sáng lẫn tối, và ở bề rộng điện thoại không bị cuộn ngang.
- **JS:** viết bằng ES5 giống phần còn lại của file (`var`, `function`, không dùng module). Riêng các lệnh gọi File System Access API trả về Promise thì dùng `.then()`. Gom code của tab vào một khối, có comment đầu khối như các phần khác.
- **README:** thêm tab thứ sáu vào bảng "Năm tab" (đổi tên mục thành "Sáu tab"), kèm một đoạn ngắn về `nhat-ky/` và chuyện file không lên git.

## 9. Ràng buộc

- File HTML tự chứa, không build step, không dependency. Không thêm thư viện.
- Mở trực tiếp từ ổ đĩa bằng Chrome là cách dùng chính.
- Không làm hỏng dữ liệu tiến độ hiện có (`roadmap-em-v1`) hay luồng xuất, nhập `tien-do.json`.

## 10. Kiểm tra trước khi giao

- `node --check` trên script đã tách ra.
- Chạy trên `http://127.0.0.1` bằng Chrome, nơi File System Access API hoạt động, rồi làm đủ luồng:
  1. Lưu lần đầu và chọn thư mục.
  2. Ghi T1 ngày thứ Hai, giả lập sang thứ Hai tuần sau, chấm trong Rà soát tuần.
  3. Ghi Thẻ 2D ba lần liên tiếp bỏ qua câu "nói một điều nên làm khác" để thấy tín hiệu bật lên.
  4. Tạo dự đoán đủ 4 nhóm xác suất, kiểm tra bảng T7.
  5. Mở lại trang và kết nối lại thư mục.
  6. Kiểm tra luồng dự phòng tải file về.
  7. Kiểm tra file JSON ghi ra đúng mẫu ở mục 7.
- Đổi ngày bằng thanh ngày để thử các mốc tuần 5, 9, 10, 12, 13.
- **Không tự kiểm được:** mở bằng `file://`. Extension Chrome không điều hướng được tới file trên ổ đĩa, nên anh cần tự mở thử một lần sau khi giao.

## 11. Để người làm tự quyết

- Bố cục chi tiết của từng form, thứ tự trường, chữ trên nút, miễn là theo đúng mục 3–6.
- Cách giả lập ngày khi kiểm tra.
- Tách hàm thế nào bên trong khối code của tab.
