# Lịch luyện tập kỹ năng tư duy — kèm template

Toàn bộ bài tập ở đây gắn vào công việc thật, không có bài tập tách rời. Tổng thời gian khi chạy đủ: **khoảng 2 giờ/tuần**.

---

## Lịch tuần — bản tóm tắt

| Thời điểm | Bài tập | Thời gian | Template |
|---|---|---|---|
| Sáng thứ Hai | Ghi 3 dự đoán trong tuần | 10 phút | T1 |
| Trước mỗi quyết định lớn | Decision doc một trang | 30 phút | T2 |
| Trước dự án / tính năng lớn | Pre-mortem | 20 phút | T3 |
| Sau mỗi sự cố | Post-mortem tới tầng ba | 30 phút | T4 |
| Chiều thứ Sáu | Chấm dự đoán + rà soát tuần | 15 phút | T5 |
| Hai tuần một lần | Giải thích 3 điểm cho người phi kỹ thuật | 15 phút | T6 |
| Cuối tháng | Chấm hiệu chỉnh | 20 phút | T7 |
| Mỗi quý | Nhật ký thời gian 2 tuần | 5 phút/ngày | T8 |

**Định nghĩa "quyết định lớn":** ảnh hưởng tới trên 2 người, hoặc trên 2 tuần công việc, hoặc khó đảo ngược. Dưới ngưỡng đó thì quyết luôn, không viết doc — viết doc cho mọi thứ là một dạng trì hoãn.

---

## T1 — Nhật ký dự đoán (sáng thứ Hai, 10 phút)

### Template

```
TUẦN: ___/___  →  ___/___

DỰ ĐOÁN 1
  Mệnh đề: ________________________________________
  Xác suất: ____%          Hạn chót: ____/____
  Căn cứ (1 dòng): ________________________________
  Điều gì sẽ khiến tôi sai: _______________________

DỰ ĐOÁN 2
  Mệnh đề: ________________________________________
  Xác suất: ____%          Hạn chót: ____/____
  Căn cứ (1 dòng): ________________________________
  Điều gì sẽ khiến tôi sai: _______________________

DỰ ĐOÁN 3
  Mệnh đề: ________________________________________
  Xác suất: ____%          Hạn chót: ____/____
  Căn cứ (1 dòng): ________________________________
  Điều gì sẽ khiến tôi sai: _______________________
```

### Ví dụ đã điền

```
TUẦN: 25/08 → 29/08

DỰ ĐOÁN 1
  Mệnh đề: Task refactor module thanh toán sẽ merge trước 17h thứ Sáu
  Xác suất: 65%            Hạn chót: 29/08
  Căn cứ: 3 lần refactor gần nhất đều trễ 1-2 ngày so với ước lượng ban đầu
  Điều gì sẽ khiến tôi sai: nếu có hotfix production chen ngang

DỰ ĐOÁN 2
  Mệnh đề: Đề xuất tách service notification sẽ bị architect yêu cầu sửa lại
  Xác suất: 45%            Hạn chót: 28/08
  Căn cứ: 2/4 đề xuất trước của tôi bị yêu cầu sửa; lần này tôi đã hỏi trước
  Điều gì sẽ khiến tôi sai: nếu anh ấy đang quan tâm việc khác nên duyệt nhanh

DỰ ĐOÁN 3
  Mệnh đề: Bạn Hòa sẽ hoàn thành task queue mà không hỏi tôi lần nào
  Xác suất: 30%            Hạn chót: 29/08
  Căn cứ: Hòa hỏi tôi trung bình 2 lần/task ở 5 task gần nhất
  Điều gì sẽ khiến tôi sai: task này gần giống task tuần trước bạn ấy đã làm
```

**Ba quy tắc bắt buộc:**

1. **Mệnh đề phải kiểm chứng được.** "Dự án sẽ suôn sẻ" không dùng được. "Sprint đóng đúng ngày 29/08" thì dùng được.
2. **Không dùng 50%.** 50% nghĩa là không có quan điểm — không học được gì từ đó. Buộc mình chọn 40 hoặc 60.
3. **Dòng "điều gì sẽ khiến tôi sai" là dòng quan trọng nhất.** Đó là chỗ luyện tư duy phản biện (critical thinking). Không điền được dòng này nghĩa là anh chưa thực sự nghĩ.

---

## T2 — Decision doc một trang (trước mỗi quyết định lớn, 30 phút)

### Template

```
QUYẾT ĐỊNH: __________________________  NGÀY: ____/____

1. BỐI CẢNH (3-5 câu)
   Vấn đề đang giải: ______________________________
   Vì sao phải quyết bây giờ: _____________________
   Ràng buộc: _____________________________________

2. ĐẢO NGƯỢC ĐƯỢC?
   [ ] Có — quyết nhanh, sai thì sửa. Hạn chót tự đặt: ____
   [ ] Không — chậm lại, thu thập thêm. Cần thêm gì: ____

3. CÁC PHƯƠNG ÁN
   A. ____________________  Ưu: ______  Nhược: ______
   B. ____________________  Ưu: ______  Nhược: ______
   C. Không làm gì        Hệ quả: _____________________

4. TIÊU CHÍ CHỌN (xếp theo thứ tự ưu tiên, tối đa 3)
   1. ____________________
   2. ____________________
   3. ____________________

5. KHUYẾN NGHỊ: Phương án ____
   Vì: ____________________________________________

6. PHƯƠNG ÁN ĐÃ LOẠI VÀ VÌ SAO   ← mục bắt buộc
   Loại ____ vì ___________________________________
   Loại ____ vì ___________________________________

7. THỨ SẼ KHÓ ĐẢO NGƯỢC SAU QUYẾT ĐỊNH NÀY
   ________________________________________________

8. GIẢ ĐỊNH TÔI ĐANG DỰA VÀO (liệt kê ít nhất 2)
   - ______________________________________________
   - ______________________________________________
   Nếu giả định nào sai thì cả quyết định sai? ______

9. DỰ ĐOÁN GẮN VÀO   ← nối với T1
   Sau ____ tháng, dấu hiệu cho thấy tôi quyết đúng: ______
   Xác suất tôi cho là đúng: ____%
```

**Vì sao có mục 6, 7, 8:**

- Mục 6 buộc anh phải thực sự cân nhắc phương án khác, thay vì hợp lý hoá phương án đã chọn từ đầu. Nếu điền mục này thấy khó, khả năng cao anh chỉ có một phương án ngay từ đầu.
- Mục 7 là bài tập tư duy hệ thống (system thinking) cô đọng nhất trong toàn bộ tài liệu: hệ quả bậc hai (second-order effects) gần như luôn nằm ở đây.
- Mục 8 là chỗ hầu hết quyết định sai thật sự phát sinh — không phải vì lập luận sai, mà vì một giả định ngầm (hidden assumption) không ai kiểm tra.

**Ví dụ điền mục 6, 7, 8** (quyết định: tách service notification):

```
6. PHƯƠNG ÁN ĐÃ LOẠI VÀ VÌ SAO
   Loại B (giữ nguyên, chỉ thêm queue) vì không giải quyết được vấn đề gốc
     là deploy chung — vẫn phải deploy cả monolith khi sửa notification
   Loại C (không làm gì) vì tần suất sửa notification đang tăng
     (3 lần/tháng, quý trước 1 lần/tháng)

7. THỨ SẼ KHÓ ĐẢO NGƯỢC
   Hợp đồng API giữa hai service. Sau khi 2 team khác tích hợp vào,
   đổi hợp đồng sẽ cần phối hợp 3 bên.

8. GIẢ ĐỊNH TÔI ĐANG DỰA VÀO
   - Tần suất sửa notification sẽ tiếp tục tăng hoặc giữ nguyên
   - Team có đủ người vận hành thêm 1 service (hiện 6 người)
   Nếu giả định nào sai thì cả quyết định sai?
   → Giả định 2. Nếu quý sau mất 2 người thì tách service là gánh nặng.
```

---

## T3 — Pre-mortem (trước dự án lớn, 20 phút)

### Template

```
DỰ ÁN: ________________________  NGÀY: ____/____
MỐC GIẢ ĐỊNH: ____ tháng nữa

"Bây giờ là ngày ____/____. Dự án đã thất bại. Không phải trễ một chút,
mà thất bại rõ ràng. Vì sao?"

Viết 5 nguyên nhân. Viết ở THÌ QUÁ KHỨ, như việc đã xảy ra rồi.

1. ______________________________________________
   Khả năng: ____%   Tôi phát hiện sớm bằng dấu hiệu gì: ______
2. ______________________________________________
   Khả năng: ____%   Dấu hiệu sớm: ____________________
3. ______________________________________________
   Khả năng: ____%   Dấu hiệu sớm: ____________________
4. ______________________________________________
   Khả năng: ____%   Dấu hiệu sớm: ____________________
5. ______________________________________________
   Khả năng: ____%   Dấu hiệu sớm: ____________________

BA NGUYÊN NHÂN KHẢ NĂNG CAO NHẤT → hành động phòng ngừa ngay tuần này:
  1. ____________________________________________
  2. ____________________________________________
  3. ____________________________________________
```

**Vì sao phải viết ở thì quá khứ:** hỏi "có rủi ro gì" thì não trả lời chung chung. Giả định thất bại **đã xảy ra rồi** buộc não phải đi tìm nguyên nhân cụ thể — đây là điểm mấu chốt của kỹ thuật tưởng tượng thất bại đã xảy ra (prospective hindsight).

**Ví dụ một dòng đã điền:**

```
2. Chúng tôi phát hiện API bên đối tác không hỗ trợ batch, phải gọi từng bản ghi,
   hiệu năng không đạt yêu cầu, phải làm lại kiến trúc đồng bộ ở tuần thứ 9.
   Khả năng: 35%
   Dấu hiệu sớm: nếu đến tuần 3 vẫn chưa test được API thật của đối tác
```

---

## T4 — Post-mortem tới tầng ba (sau mỗi sự cố, 30 phút)

### Template

```
SỰ CỐ: ________________________  NGÀY: ____/____
Tác động: ______________________________________

TẦNG 1 — Chuyện gì đã xảy ra? (nguyên nhân trực tiếp)
  ______________________________________________

TẦNG 2 — Vì sao điều đó xảy ra được? (nguyên nhân điều kiện)
  ______________________________________________

TẦNG 3 — Vì sao hệ thống/quy trình cho phép điều đó? (nguyên nhân hệ thống)
  ______________________________________________
  ← DỪNG Ở ĐÂY. Không đi tiếp tầng 4 (dễ thành triết lý vô dụng).
  ← Nếu tầng 3 vẫn là tên một người, anh chưa tới nguyên nhân hệ thống.

HÀNH ĐỘNG
  Sửa tầng 1 (ngay): ___________________________
  Sửa tầng 3 (trong 30 ngày): __________________
  Ai chịu trách nhiệm: _________________________

TÔI ĐÃ CÓ THỂ DỰ ĐOÁN ĐƯỢC KHÔNG?
  [ ] Có — dấu hiệu đã có nhưng tôi bỏ qua. Dấu hiệu đó là: ______
  [ ] Không — thông tin lúc đó không đủ
  ← Đây là mục nối vào T1. Nếu chọn "Có" từ 3 lần trở lên trong một quý,
    vấn đề của anh không phải kiến thức, mà là không dừng lại để nghĩ.
```

**Ví dụ ba tầng:**

```
TẦNG 1: Service thanh toán hết connection pool lúc 20h, request bị timeout.
TẦNG 2: Job đối soát chạy 20h mở 50 connection, không ai biết nó tồn tại
        vì nó được thêm cách đây 8 tháng bởi người đã nghỉ.
TẦNG 3: Không có nơi nào ghi lại các job nền và tài nguyên chúng dùng.
        Mọi thứ nằm trong đầu người viết. → đây mới là nguyên nhân hệ thống.

Sửa tầng 1: tăng pool size, dời job sang 2h sáng
Sửa tầng 3: lập bảng đăng ký job nền — mọi job phải khai báo tài nguyên
            trước khi lên production. Hạn: 30 ngày.
```

---

## T5 — Rà soát chiều thứ Sáu (15 phút)

### Template

```
TUẦN: ___/___ → ___/___

CHẤM DỰ ĐOÁN TUẦN NÀY
  DĐ 1: [ ] Đúng  [ ] Sai  [ ] Chưa tới hạn   Ghi chú: ______
  DĐ 2: [ ] Đúng  [ ] Sai  [ ] Chưa tới hạn   Ghi chú: ______
  DĐ 3: [ ] Đúng  [ ] Sai  [ ] Chưa tới hạn   Ghi chú: ______

  Cái sai nhất — tôi đã bỏ qua yếu tố gì?
  ______________________________________________

TUẦN NÀY TÔI ĐÃ ĐỔI Ý VỀ ĐIỀU GÌ?
  ______________________________________________
  (Nếu 3 tuần liên tiếp không đổi ý về điều gì → tôi đang không thực sự
   cân nhắc phương án khác, chỉ đang tìm lý do cho phương án đã chọn)

PHÂN BỔ THỜI GIAN TUẦN NÀY (ước lượng thô)
  Phản ứng (bị kéo vào): ____%
  Kiến tạo (tự chọn, không ai yêu cầu): ____%
  ← dưới 20% kiến tạo là báo động

MỘT CÂU TỰ KIỂM
  Việc tôi làm tuần này khiến team mạnh lên, hay chỉ khiến kết quả
  tuần này đẹp hơn?  ____________________________
```

---

## T6 — Giải thích 3 điểm (hai tuần một lần, 15 phút)

Chọn một quyết định kỹ thuật vừa ra, viết lại cho người phi kỹ thuật (PM, sếp, khách hàng).

### Template

```
QUYẾT ĐỊNH: ______________________________

KẾT LUẬN TRƯỚC (1 câu, không có thuật ngữ kỹ thuật):
  ______________________________________________

BA LÝ DO CHỐNG ĐỠ (mỗi cái 1 câu, không chồng lấn nhau):
  1. ____________________________________________
  2. ____________________________________________
  3. ____________________________________________

ĐIỀU NGƯỜI NGHE SẼ HỎI LẠI:
  ______________________________________________
  Trả lời: ______________________________________

TỰ KIỂM
  [ ] Không có thuật ngữ nào cần giải thích thêm
  [ ] Ba lý do không trùng nhau (không phải một lý do nói ba cách)
  [ ] Có nêu cái giá phải trả, không chỉ nêu lợi ích
```

**Cấu trúc này có tên:** kết luận trước, lý do sau (nguyên tắc kim tự tháp / Pyramid Principle của Barbara Minto). Dân kỹ thuật quen kể theo trình tự thời gian ("đầu tiên tôi thử A, rồi B, cuối cùng chọn C"). Người nghe phi kỹ thuật cần kết luận trước, và thường không đủ kiên nhẫn nghe hết đoạn dẫn.

**Ví dụ đã điền:**

```
KẾT LUẬN TRƯỚC: Tôi đề nghị lùi tính năng báo cáo 1 tuần để làm lại phần
lưu dữ liệu, vì nếu làm theo cách hiện tại thì 3 tháng nữa phải viết lại
và mất 3 tuần.

BA LÝ DO:
  1. Lượng dữ liệu tăng gấp 4 lần trong 6 tháng qua, cách hiện tại
     sẽ chậm dần và không sửa vặt được
  2. Ba tính năng sắp tới đều đọc từ phần này — sửa sau sẽ đụng cả ba
  3. Chi phí sửa bây giờ là 1 tuần, sửa sau là 3 tuần cộng rủi ro dữ liệu

ĐIỀU NGƯỜI NGHE SẼ HỎI: "Sao lúc thiết kế không tính trước?"
Trả lời: Lúc đó lượng dữ liệu bằng 1/4 hiện tại và chưa có ba tính năng kia
trong kế hoạch. Đây là thông tin mới, không phải sai sót lúc đầu.
```

---

## T7 — Chấm hiệu chỉnh (cuối tháng, 20 phút)

Đây là bài đo tiến bộ. Gom toàn bộ dự đoán đã tới hạn trong tháng, nhóm theo mức xác suất.

### Template

```
THÁNG: ____/______   Tổng số dự đoán đã tới hạn: ____

| Nhóm xác suất | Số dự đoán | Số đúng | Tỷ lệ thực | Lệch |
|---------------|-----------|---------|-----------|------|
| 20-40%        |           |         |        %  |      |
| 40-60%        |           |         |        %  |      |
| 60-80%        |           |         |        %  |      |
| 80-100%       |           |         |        %  |      |

ĐỌC KẾT QUẢ
  Nhóm 70% mà đúng ~7/10  → hiệu chỉnh tốt
  Nhóm 70% mà đúng 9/10   → quá dè dặt, nên mạnh dạn hơn
  Nhóm 70% mà đúng 4/10   → quá tự tin, đây là hướng lệch phổ biến nhất

MẪU LẶP LẠI TÔI THẤY
  Tôi thường sai khi dự đoán về: ________________
  Tôi thường đúng khi dự đoán về: _______________
  Yếu tố tôi hay bỏ qua nhất: ___________________
```

**Lưu ý:** tháng đầu tiên số liệu chưa nói lên gì (quá ít mẫu). Từ tháng thứ ba trở đi mới đọc được xu hướng. Đừng bỏ cuộc ở tháng 1 vì "không thấy gì".

---

## T8 — Nhật ký thời gian (mỗi quý, 2 tuần)

### Template ghi hàng ngày (5 phút cuối ngày)

```
NGÀY ____/____

| Khung giờ | Làm gì | P/K | Ai khởi xướng |
|-----------|--------|-----|---------------|
| 8:30-9:00 |        |     |               |
| 9:00-9:30 |        |     |               |
| ...       |        |     |               |

P = Phản ứng (ai đó/việc gì kéo tôi vào)
K = Kiến tạo (tôi chủ động chọn, không ai yêu cầu)
```

### Template phân tích (cuối 2 tuần)

```
Tổng số khối 30 phút: ____
  Phản ứng: ____ khối (____%)
  Kiến tạo: ____ khối (____%)

BA VIỆC NGỐN NHIỀU THỜI GIAN NHẤT
  1. ____________  ____ khối   Có cần tôi không? [ ] Có [ ] Không
  2. ____________  ____ khối   Có cần tôi không? [ ] Có [ ] Không
  3. ____________  ____ khối   Có cần tôi không? [ ] Có [ ] Không

VIỆC TRẢ LỜI "KHÔNG" Ở TRÊN → giao cho ai, hoặc bỏ hẳn?
  ______________________________________________

HÀNH ĐỘNG: chặn trước ____ khối/tuần cho việc kiến tạo,
vào khung giờ ____ (chọn khung ít bị ngắt nhất theo dữ liệu trên)
```

---

## Lộ trình 12 tuần — thêm dần, không làm cùng lúc

| Tuần | Thêm gì | Tổng thời gian/tuần |
|---|---|---|
| 1–4 | Chỉ T1 + T5 (dự đoán và chấm) | 25 phút |
| 5–8 | Thêm T2 (decision doc) khi có quyết định lớn | ~1 giờ |
| 9–12 | Thêm T3 (pre-mortem) và T6 (giải thích 3 điểm) | ~2 giờ |
| Bất cứ lúc nào | T4 khi có sự cố — không đợi lịch | — |
| Cuối tháng 1, 2, 3 | T7 chấm hiệu chỉnh | 20 phút |
| Tuần 10–12 | T8 nhật ký thời gian | 5 phút/ngày |

**Vì sao bắt đầu chỉ với 25 phút:** đây là điểm chống lại đúng cái vòng lặp bỏ dở. Bắt đầu với 2 giờ/tuần thì tuần thứ ba sẽ bỏ. Bắt đầu với 25 phút thì có thể duy trì kể cả tuần bận nhất.

---

## Quy tắc vận hành

**Khi bỏ lỡ một tuần:** không bù, không tính là thất bại. Bắt đầu lại tuần sau. Duy trì 30 tuần trong năm tốt hơn nhiều so với hoàn hảo 6 tuần rồi bỏ.

**Phiên bản tối thiểu cho tuần cực bận:** chỉ ghi 1 dự đoán thay vì 3, và chấm nó vào thứ Sáu. Năm phút.

**Tiêu chí dừng (đặt trước, theo đúng nguyên tắc ở sổ tay chính):**
> Nếu sau 12 tuần, bảng chấm hiệu chỉnh T7 không thay đổi gì và tôi không phát hiện được mẫu lặp lại nào trong cách mình sai, thì cách luyện này không hợp với tôi. Tôi dừng và chuyển sang cách khác — ví dụ tìm một người phản biện cố định thay vì tự chấm. Đây là quyết định, không phải thất bại.

**Điều cần nhớ về bằng chứng:** T1 và T7 (nhật ký dự đoán và chấm hiệu chỉnh) là phần có nền tảng thực nghiệm mạnh nhất — huấn luyện dạng này đã được chứng minh cải thiện độ chính xác dự báo khoảng 10% trong nghiên cứu của Good Judgment Project, với thời lượng hướng dẫn chưa tới một giờ mỗi năm. Các template còn lại là công cụ tổ chức tư duy được dùng rộng rãi trong thực hành, nhưng không có cùng mức bằng chứng. Dùng chúng vì chúng buộc anh phải viết ra thứ vốn nằm mơ hồ trong đầu — đó là giá trị thật của chúng.
