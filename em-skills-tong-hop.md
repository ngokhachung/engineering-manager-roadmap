# Tổng hợp kỹ năng Engineering Manager từ JD thực tế (TP.HCM)

_Tổng hợp ngày 18/10/2026 từ bốn JD Engineering Manager công khai ở TP.HCM. Tên công ty, mức lương và đơn vị tuyển dụng đã được ẩn._

## Nguồn JD

| Mã | Lĩnh vực | Hình thức |
|---|---|---|
| A | Ngân hàng | Hybrid |
| B | Ngân hàng số | Hybrid |
| C | Fintech, ứng dụng tiêu dùng | Không nêu |
| D | Dịch vụ tài chính số | Không nêu |

Ghi chú:
- Cột **Tần suất** là số JD (trên 4) có nhắc đến kỹ năng đó.
- Cột **Lộ trình** đã đối chiếu với `roadmap-em.html` (tổng kết ở mục 8). Đầu mỗi ô là mức phủ: **Đủ**, **Một phần**, **Không có** hoặc **Ngược hướng**. Sau đó là các kỹ năng tương ứng trong roadmap: GĐ0–GĐ3 là giai đoạn, ★ là kỹ năng lõi.

---

## 1. Ngưỡng kinh nghiệm

| Tiêu chí | A | B | C | D |
|---|---|---|---|---|
| Tổng số năm làm phần mềm | 10+ | Không nêu | Không nêu số năm, cần nền tảng kỹ thuật vững và đã ship hệ thống production | 10+ |
| Số năm dẫn dắt / quản lý team | 5+ (team Agile đa chức năng) | 5+ (tổng cộng 20+ kỹ sư) | Đã quản lý kỹ sư và chịu trách nhiệm delivery | 4+ (trong công ty product) |
| Quy mô / mô hình team | Nhiều team, onshore + offshore | 20+ kỹ sư, có PM đi kèm | Không nêu | Team phân tán, nhiều khu vực |
| Bằng cấp | Không nêu | Không nêu | Không nêu | Cử nhân CNTT / KTPM hoặc ngành liên quan |

---

## 2. Quản lý con người

| Kỹ năng | Tần suất | Nguồn | Lộ trình |
|---|---|---|---|
| Line management: 1:1, kế hoạch phát triển cá nhân, lộ trình nghề nghiệp, đánh giá thử việc và hiệu suất | 2/4 | A, D | **Đủ** — GĐ1 1:1s★ · GĐ2 Setting Expectations★, Performance Review Cycle, Managing Underperformance★, Career Ladder & Growth Plan. Riêng đánh giá thử việc thì chưa có: Onboarding 30-60-90 không có mốc chốt thử việc |
| Coaching và mentoring kỹ sư, giúp mở rộng năng lực (mô hình T-shaped) | 3/4 | A, D, B | **Đủ** — GĐ0 Code Review as Teaching · GĐ1 Coaching Questions, Stretch Assignment · GĐ2 Career Ladder & Growth Plan. Chưa nhắc tới T-shaped |
| Xây dựng team, tạo động lực | 2/4 | A, B | **Một phần** — GĐ2 Retention, Onboarding 30-60-90 · GĐ3 Team Health Metrics. Không có kỹ năng nào về tạo động lực |
| Xây dựng văn hóa kỹ thuật: học hỏi, ownership, cải tiến liên tục | 3/4 | A, D, C | **Đủ** — GĐ2 Engineering Culture (mới thêm), cùng các cơ chế đã có: GĐ0 Blameless Postmortem · GĐ2 Quality Bar, Documentation & Knowledge Sharing, On-call |
| Đặt mục tiêu vừa thực tế vừa thử thách và đạt được đồng thuận của team | 1/4 | A | **Đủ** — GĐ1 Building Technical Consensus · GĐ2 Setting Expectations★ · GĐ3 Quarterly Commitments★ |
| Chịu trách nhiệm về hiệu suất của cả team | 1/4 | C | **Đủ** — GĐ0 DORA Metrics★ · GĐ3 Team Health Metrics, Quarterly Commitments★ |
| Phát triển nhân tài, kế hoạch kế nhiệm, mở rộng team (phối hợp HR) | 1/4 | D | **Đủ** — GĐ2 nhóm Hiring (5 kỹ năng, có Behavioral Interviewing★) · GĐ3 Succession Planning★, Budget & Headcount |

---

## 3. Delivery và quy trình

| Kỹ năng | Tần suất | Nguồn | Lộ trình |
|---|---|---|---|
| Sở hữu delivery end-to-end, từ ý tưởng / kế hoạch đến production | 4/4 | A, B, C, D | **Đủ** — GĐ0 Definition of Done · GĐ1 nhóm Delivery (Work Breakdown, Dependency Management, Stakeholder Register & RACI, Tracking Without Micromanaging, Scope Negotiation★) · GĐ3 Quarterly Commitments★. Khâu đưa lên production xem dòng CI/CD |
| Agile / Scrum thực chiến (A yêu cầu kinh nghiệm áp dụng ở quy mô lớn, không chỉ lý thuyết) | 2/4 | A, D | **Đủ** — GĐ1 Agile in Practice (mới thêm), nối với PMP Day 12–13. Riêng kinh nghiệm ở quy mô lớn mà A đòi thì roadmap không thay được |
| Quản lý milestone, deliverable, rủi ro, dependency | 1/4 | A | **Đủ** — GĐ0 Risk Register, Pre-mortem · GĐ1 Work Breakdown & Sequencing, Dependency Management |
| Cải tiến quy trình phát triển và delivery | 2/4 | A, D | **Đủ** — GĐ0 DORA Metrics★, Blameless Postmortem · GĐ2 Meeting Cadence, Quality Bar |
| Cân bằng giữa tốc độ và chất lượng | 2/4 | A, D | **Đủ** — GĐ0 DORA Metrics★, Tech Debt Quantification · GĐ1 Scope Negotiation★ · GĐ2 Quality Bar |
| DevOps, CI/CD, coach team áp dụng | 2/4 | A, D | **Đủ** — GĐ2 CI/CD & Delivery Pipeline (mới thêm) · GĐ0 DORA Metrics★ để đo kết quả |
| Quản lý code, change management, tuân thủ governance / khung quản lý rủi ro khi release | 2/4 | A, D | **Đủ** — GĐ2 Release Governance (mới thêm). Change Control cùng nhóm là kiểm soát thay đổi phạm vi, trùng tên nhưng khác nghĩa |
| Dẫn dắt nhiều team phân tán (onshore / offshore, đa khu vực) | 2/4 | A, D | **Một phần** — GĐ0 Async Written Communication · GĐ2 Meeting Cadence · GĐ3 Cross-Team Conflict. Không có gì về onshore / offshore hay lệch múi giờ |

---

## 4. Kỹ thuật

| Kỹ năng | Tần suất | Nguồn | Lộ trình |
|---|---|---|---|
| System design, kiến trúc có khả năng mở rộng, tham gia quyết định kiến trúc | 4/4 | A, B, C, D | **Đủ** — GĐ2 System Design (mới thêm), Conway's Law, Build vs Buy · GĐ0 Design Doc / RFC★, Decision Doc / ADR★ |
| Code review và review technical design | 3/4 | A, C, D | **Đủ** — GĐ0 Code Review as Teaching, Design Doc / RFC★ |
| Chuẩn chất lượng: testing, observability, security, reliability | 3/4 | A, C, D | **Một phần** — GĐ0 Definition of Done, Observability · GĐ2 Quality Bar, On-call & Incident Management. Testing và security không có kỹ năng riêng |
| Microservices | 2/4 | A, D | **Đủ** — GĐ2 Service Boundaries & API Design (mới thêm) |
| API design / REST API | 2/4 | C, D | **Đủ** — GĐ2 Service Boundaries & API Design (mới thêm) |
| Cloud: AWS (A, D), Azure (A), GCP (D) | 2/4 | A, D | **Đủ** — GĐ2 Cloud Architecture (mới thêm) |
| Ổn định production, debug sự cố phức tạp | 2/4 | A, C | **Đủ** — GĐ0 Blameless Postmortem, Observability · GĐ2 On-call & Incident Management. Phần debug mặc định là đã có |
| Quản lý nợ kỹ thuật | 1/4 | D | **Đủ** — GĐ0 Tech Debt Quantification |
| Vẫn code thực tế (B: khoảng 40–50% thời gian ở giai đoạn đầu) | 1/4 | B | **Đủ** — GĐ2 Staying Hands-On (mới thêm): code ở những việc không nằm trên đường găng, nên không mâu thuẫn với GĐ0 Work Hoarding★ |
| Domain bảo mật: Authentication & Authorization | 1/4 | B | **Không có** |

**Tech stack tham khảo (A):**
- Ngôn ngữ / framework: Java, Python, JavaScript, Node.js, ReactJS (Redux), MV* patterns
- Database: PostgreSQL, MongoDB
- DevOps: Jenkins, Artifactory, SonarQube, GitHub, CloudFormation
- Cloud: AWS (Lambda, S3, API Gateway, SNS/SQS, CLI), Azure, multi-cloud

---

## 5. Stakeholder và product

| Kỹ năng | Tần suất | Nguồn | Lộ trình |
|---|---|---|---|
| Phối hợp với Product Manager, Architect và các EM khác | 3/4 | A, B, D | **Đủ** — GĐ2 EM–PM Partnership (mới thêm) · GĐ1 Influence Without Authority, Representing the Team · GĐ3 Cross-Team Conflict |
| Xây dựng technical roadmap cùng product / design | 2/4 | B, D | **Đủ** — GĐ2 Technical Roadmap |
| Stakeholder management (nhiều bên, nhiều khu vực) | 2/4 | A, D | **Đủ** — GĐ0 Explaining to Non-Technical Stakeholders · GĐ1 Stakeholder Register & RACI, Status Reporting, Escalating Bad News Early · GĐ3 Influencing Skip-Level |
| Product sense: gắn quyết định kỹ thuật với kết quả cho khách hàng và kinh doanh | 2/4 | C, D | **Một phần** — GĐ2 nhóm Business Acumen (Revenue Model Literacy, Business Case★, Opportunity Cost) phủ phía kinh doanh. Phía khách hàng (hiểu người dùng, chỉ số sản phẩm) chưa có |
| Giao tiếp ở cả cấp chiến lược và vận hành | 1/4 | A | **Đủ** — GĐ0 BLUF & Pyramid Principle · GĐ1 Status Reporting · GĐ2 Strategy Note★ |

---

## 6. Ngoại ngữ, domain, chứng chỉ

| Kỹ năng | Tần suất | Nguồn | Lộ trình |
|---|---|---|---|
| Tiếng Anh lưu loát, nói và viết (A bắt buộc) | 2/4 | A, D | **Không có** |
| Kinh nghiệm banking / fintech (điểm cộng) | 2/4 | A, D | **Không có** |
| Certified Scrum Master (điểm cộng) | 1/4 | A | **Một phần** — tab PMP là chứng chỉ khác, nhưng phần agile của PMP trùng một phần nội dung |

---

## 7. Kỹ năng xuất hiện nhiều nhất

**Có trong cả 4 JD:**
- Sở hữu delivery end-to-end đến production
- System design và quyết định kiến trúc

**Có trong 3/4 JD:**
- Coaching / mentoring kỹ sư
- Xây dựng văn hóa kỹ thuật
- Code review và review design
- Chuẩn chất lượng (testing, observability, security, reliability)
- Phối hợp với PM, Architect, các EM khác

---

## 8. Đối chiếu với roadmap-em.html

_Đối chiếu ngày 18/10/2026. Cột Lộ trình phản ánh roadmap sau khi đã bổ sung 9 kỹ năng (98 kỹ năng, 21 nhóm, 4 giai đoạn)._

**Kết quả:**

| Mức phủ | Roadmap trước (89 kỹ năng) | Roadmap sau (98 kỹ năng) |
|---|---|---|
| Đủ | 15 | 25 |
| Một phần | 10 | 5 |
| Không có | 7 | 3 |
| Ngược hướng | 1 | 0 |

"Đủ" nghĩa là roadmap có kỹ năng tương ứng, không có nghĩa là đã có kỹ năng đó.

Trong 7 kỹ năng có ở 3–4 JD (mục 7), bản trước chỉ phủ đủ 3, bản sau phủ đủ 6. Kỹ năng còn thiếu là chuẩn chất lượng: testing và security vẫn chưa có kỹ năng riêng.

### Đã bổ sung vào roadmap

| Kỹ năng mới | Vị trí | Lấp dòng JD nào |
|---|---|---|
| Agile in Practice | GĐ1 · Delivery | Agile / Scrum thực chiến |
| Engineering Culture | GĐ2 · Ways of Working | Xây dựng văn hóa kỹ thuật |
| Release Governance | GĐ2 · Ways of Working | Change management, governance khi release |
| EM–PM Partnership | GĐ2 · Business Acumen | Phối hợp với PM, Architect, EM |
| System Design | GĐ2 · Technical Edge (nhóm mới) | System design |
| Service Boundaries & API Design | GĐ2 · Technical Edge | Microservices, API design |
| Cloud Architecture | GĐ2 · Technical Edge | Cloud |
| CI/CD & Delivery Pipeline | GĐ2 · Technical Edge | DevOps, CI/CD |
| Staying Hands-On | GĐ2 · Technical Edge | Vẫn code thực tế |

Ngoài ra, Observability và Async Written Communication không còn là kỹ năng tuỳ chọn.

Cả 9 kỹ năng mới đều là kỹ năng bổ trợ, không phải lõi. Chế độ mặc định "19 kỹ năng lõi" sẽ ẩn chúng, muốn thấy thì phải bật "Tất cả 98".

### Lỗ hổng còn lại

1. **Tiếng Anh.** A ghi là bắt buộc, D cũng yêu cầu, và roadmap vẫn chưa có. Đây là điều kiện lọc hồ sơ chứ không phải điểm cộng. Ở các công ty này, những kỹ năng giao tiếp đã có trong roadmap (BLUF, Async Writing, Status Reporting) đều sẽ phải làm bằng tiếng Anh.
2. **Dẫn dắt team phân tán** (2/4). Async Writing đã thành kỹ năng chính thức, nhưng roadmap vẫn chưa có gì về onshore / offshore hay làm việc lệch múi giờ.
3. **Testing và security** (thuộc chuẩn chất lượng, 3/4) chưa có kỹ năng riêng.
4. **Tạo động lực** (2/4) và **product sense phía khách hàng** (2/4) vẫn chỉ được phủ một phần.
5. **Domain:** banking / fintech, Authentication & Authorization. Đây là kinh nghiệm theo ngành, roadmap kỹ năng không thay được.

### Chiều ngược lại: kỹ năng lõi của roadmap mà JD không nhắc

6/19 kỹ năng lõi không ứng với dòng JD nào: Forecast Calibration★, Calibration in the People Domain★, The Two-Week Test★, Delegating Decisions★, SBI Feedback★, STATE★.

Không có nghĩa là chúng thừa. JD liệt kê những gì dùng để lọc hồ sơ, còn roadmap nhắm tới những gì làm nên một EM giỏi. Nhưng khi viết CV và trả lời phỏng vấn, anh phải diễn đạt chúng bằng ngôn ngữ của JD. Ví dụ: bằng chứng cho The Two-Week Test cũng chính là câu chuyện cho "xây văn hóa ownership".

### Ngưỡng kinh nghiệm

Ba JD đòi từ 4–5 năm dẫn dắt team trở lên. A còn cần kinh nghiệm quản lý nhiều team, B cần đã quản lý tổng cộng hơn 20 kỹ sư. Roadmap đo kỹ năng chứ không đo thời gian, nên không rút ngắn được ngưỡng này. Thời gian làm tech lead (GĐ1) và tech lead manager (GĐ2) đều được tính, nên ghi lại ngay từ bây giờ: dẫn bao nhiêu người, trong bao lâu, giao được gì. Tab PMP đã có ô "số tháng dẫn dắt dự án", dùng chung được dữ liệu này.
