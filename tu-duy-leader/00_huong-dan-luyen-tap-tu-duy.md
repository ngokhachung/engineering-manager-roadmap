# Hướng dẫn — Lịch luyện tập tư duy

Tài liệu này giải thích **cách vận hành**. Hai file kia là công cụ:

| File | Là gì | Dùng khi nào |
|---|---|---|
| `04_the-ghi-nho.md` | 7 thẻ ngắn, mỗi thẻ dưới 1 phút | Hàng ngày, sau mỗi cuộc họp |
| `03_template.md` | 8 template điền (T1–T8) | Theo lịch tuần / tháng / quý |
| **File này** (`00_huong-dan-luyen-tap-tu-duy.md`) | Hướng dẫn vận hành | Đọc một lần khi bắt đầu, đọc lại khi thấy trôi |
| `01_mục-đích.md` | Vì sao từng hoạt động tồn tại, nhắm vào điểm yếu nào | Khi mất động lực hoặc không hiểu vì sao phải làm |
| `README.md` | Hướng dẫn dùng folder `nhat-ky/` để log và phân tích tiến bộ | Trước khi bắt đầu ghi log hàng ngày |
| `nhat-ky/` | Folder log hàng ngày (dữ liệu thô, tự tạo file theo ngày) | Điền mỗi ngày, dùng để phân tích tiến bộ sau này |

---

## 1. Nguyên lý duy nhất cần hiểu

Kỹ năng tư duy khó luyện vì **phản hồi đến quá muộn và quá nhiễu**. Anh ra một quyết định kiến trúc hôm nay, tám tháng sau mới biết đúng sai, mà lúc đó đã có mười biến số khác thay đổi nên không quy được nhân quả.

Toàn bộ hệ thống này làm đúng một việc: **rút ngắn vòng phản hồi (feedback loop) từ tám tháng xuống một tuần.**

Cách rút ngắn: buộc mọi phán đoán phải có **con số** và **hạn chót**. Một phán đoán không có hai thứ đó thì không bao giờ sai được, mà không sai được thì không học được gì. Đây là lý do nhật ký dự đoán (T1) là bài tập nền, không phải bài tập phụ.

Hệ quả: nếu anh chỉ làm được một thứ trong toàn bộ tài liệu này, làm T1.

---

## 2. Tuần đầu tiên — làm đúng ba việc

Đừng đọc hết template rồi mới bắt đầu. Bắt đầu ngay tuần này với 25 phút:

**Thứ Hai, 10 phút.** Mở T1, ghi 3 dự đoán. Nếu bí, dùng ba câu mồi này:
- Task ___ sẽ xong trước ___ — ___%
- Đề xuất/yêu cầu ___ của tôi sẽ được duyệt — ___%
- Bạn ___ sẽ hoàn thành ___ mà không cần hỏi tôi — ___%

**Trong tuần, 1 phút mỗi lần.** Sau mỗi cuộc họp, mở Thẻ 2, chọn đúng loại họp, tick. Không viết gì thêm.

**Thứ Sáu, 15 phút.** Mở T5, chấm 3 dự đoán, trả lời hai câu về việc ôm và việc né.

Hết. Đó là tuần một. Không thêm gì.

---

## 3. Lộ trình 12 tuần

| Tuần | Thêm gì | Tổng/tuần |
|---|---|---|
| 1–4 | T1 + T5 + Thẻ 2 (sau họp) | ~25 phút |
| 5–8 | Thêm T2 (decision doc) khi có quyết định lớn, và Thẻ 1 + Thẻ 6 (đầu/cuối ngày) | ~1 giờ |
| 9–12 | Thêm T3 (pre-mortem) và T6 (giải thích 3 điểm) | ~2 giờ |
| Bất cứ lúc nào | T4 + Thẻ 5 khi có sự cố — không đợi lịch | — |
| Cuối tháng 1, 2, 3 | T7 chấm hiệu chỉnh | 20 phút |
| Tuần 10–12 | T8 nhật ký thời gian | 5 phút/ngày |

**Vì sao thêm dần chứ không làm hết ngay:** bắt đầu ở 2 giờ/tuần thì tuần thứ ba sẽ đứt. Đây là điểm chống trực tiếp cái vòng lặp bỏ dở — thiết kế để duy trì được cả trong tuần bận nhất, không phải để trông ấn tượng trên giấy.

---

## 4. Thẻ và template phối hợp thế nào

Thẻ là **lúc nóng** — bắt lại phản xạ ngay tại chỗ, khi ký ức còn chính xác.
Template là **lúc nguội** — nhìn lại có cấu trúc, tìm mẫu lặp lại.

Ba đường nối quan trọng giữa hai loại:

| Thẻ (lúc nóng) | Nối vào template (lúc nguội) |
|---|---|
| Thẻ 2B: "gật đầu deadline dù thấy phi lý" | Đếm trong T5 → nếu lặp lại, đây là ô thương lượng lên trên (managing up) cần vào kế hoạch |
| Thẻ 4: "tôi làm vì nhanh hơn" | Đếm trong T5 → mỗi lần tick là một lần ô trao quyền (delegation) không tiến |
| Thẻ 5: "tôi đã có thể dự đoán" | Đối chiếu T4 và T1 → nếu 3 lần/quý, vấn đề là không dừng lại để nghĩ |

Thẻ mà không có template thì chỉ là cảm giác thoáng qua. Template mà không có thẻ thì viết theo trí nhớ đã bị bóp méo. Cần cả hai.

---

## 5. Làm sao biết nó đang hoạt động

**Tháng 1** — chưa đọc được gì. Số mẫu quá ít. Việc duy nhất cần đạt là duy trì được thói quen. Đừng đánh giá kết quả ở giai đoạn này.

**Tháng 2–3** — dấu hiệu sớm:
- Anh bắt đầu tự động hỏi "điều gì sẽ khiến tôi sai" trước khi ai nhắc
- Anh nhận ra mình hay sai ở cùng một loại tình huống (T7 sẽ chỉ ra)
- Có ít nhất một lần anh đổi quyết định vì viết mục "phương án đã loại"

**Tháng 4–6** — dấu hiệu thật:
- Bảng hiệu chỉnh T7 sát hơn: nhóm 70% đúng khoảng 7/10
- Anh dự đoán được rủi ro **trước khi** nó xảy ra, có bằng chứng ghi lại
- Đọc lại decision doc số 1 và số 10, thấy rõ chênh lệch

Điểm cuối cùng đó là thước đo tốt nhất của tầng này, vì tầng này vốn không có chứng chỉ và không có ngày tốt nghiệp.

---

## 6. Bốn cách hỏng thường gặp

**Viết dài.** Template dài thành bài luận thì tuần sau sẽ bỏ. Mỗi ô một dòng. Decision doc phải vừa một trang — nếu tràn trang, anh đang mô tả thay vì quyết định.

**Dự đoán an toàn.** Ghi những thứ chắc chắn đúng để bảng điểm đẹp. Vô ích. Dự đoán tốt là dự đoán mà anh thật sự không chắc — nếu tất cả đều ở mức 90% thì anh đang né bài tập.

**Đọc thay cho làm.** Đọc sách về tư duy hệ thống (systems thinking), hiểu hết khái niệm, không đổi hành vi nào. Quy tắc: mỗi chương đọc xong phải áp dụng vào một tình huống thật trong tuần đó, nếu không thì dừng đọc.

**Làm cùng lúc hết tám template.** Cách chắc chắn nhất để lặp lại đúng vòng lặp cũ.

---

## 7. Khi bỏ lỡ

Không bù, không tính là thất bại. Bắt đầu lại tuần sau.

Duy trì 30 tuần trong một năm tốt hơn nhiều so với hoàn hảo 6 tuần rồi bỏ hẳn. Đây không phải lời an ủi — đó là cách hệ thống này được thiết kế để hoạt động.

**Phiên bản tối thiểu cho tuần cực bận:** ghi 1 dự đoán thay vì 3, chấm nó vào thứ Sáu. Năm phút. Vẫn tính là đã duy trì.

---

## 8. Tiêu chí dừng — đặt trước, ngay bây giờ

Theo đúng nguyên tắc trong sổ tay chính: viết ra điều kiện được phép dừng **trước khi bắt đầu**, không phải khi đã chán.

> Nếu sau 12 tuần, bảng chấm hiệu chỉnh T7 không thay đổi gì và tôi không phát hiện được mẫu lặp lại nào trong cách mình sai, thì cách luyện này không hợp với tôi.
>
> Hành động khi đó: dừng và chuyển sang cách khác — ví dụ tìm một người phản biện cố định mỗi hai tuần thay vì tự chấm một mình. Đây là quyết định, không phải thất bại.

Ghi ngày rà soát ngay bây giờ: **____/____/______** (12 tuần kể từ hôm nay).

---

## 9. Về mức độ tin cậy

Nói thẳng để anh dùng một cách tỉnh táo:

**T1 và T7** (nhật ký dự đoán và chấm hiệu chỉnh) có nền tảng thực nghiệm mạnh nhất. Trong nghiên cứu của Good Judgment Project — nhóm thắng giải đấu dự báo do IARPA tổ chức từ 2011 đến 2015 — huấn luyện có cấu trúc dạng này cải thiện độ chính xác dự báo khoảng 10% qua cả bốn năm, dù thời lượng hướng dẫn chưa tới một giờ mỗi năm. Điều tạo ra kết quả là việc ghi lại và chấm điểm liên tục, không phải nội dung khoá học. Đáng chú ý vì phần lớn các nỗ lực huấn luyện chống thiên kiến nhận thức (cognitive bias) khác đều cho hiệu quả hạn chế.

**Các template còn lại** (decision doc, pre-mortem, post-mortem, giải thích 3 điểm) là công cụ tổ chức tư duy được dùng rộng rãi trong thực hành kỹ thuật và quản lý, nhưng không có cùng mức bằng chứng thực nghiệm. Giá trị thật của chúng đơn giản hơn: chúng buộc anh viết ra thứ vốn nằm mơ hồ trong đầu, và thứ đã viết ra thì kiểm tra lại được.

**Một giới hạn cần biết:** năng lực tư duy phụ thuộc lĩnh vực. Anh phản biện tốt về kiến trúc backend không có nghĩa anh phản biện tốt về tài chính dự án hay về con người. Mọi bài tập ở đây đều cố ý gắn vào công việc thật của anh vì lý do đó — và khi anh chuyển sang lĩnh vực mới, phải luyện lại trong lĩnh vực đó.
