# Tab "Luyện tư duy" — kế hoạch triển khai

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm tab thứ sáu vào `roadmap-em.html`. Tab hiện bài luyện tư duy của từng ngày theo lộ trình 12 tuần, cho nhập trên giao diện, và lưu mỗi ngày thành một file JSON trong thư mục người dùng chọn.

**Architecture:** Logic không đụng DOM nằm trong một khối riêng của inline script, có cặp comment `/* tuduy-core:start */` … `/* tuduy-core:end */`. File test Node tách khối này ra, chạy trong `vm`, rồi kiểm bằng `node:test`. Phần giao diện và phần lưu trên trình duyệt nằm trong khối `/* ================= tab Luyện tư duy ================= */`, đặt ngay trước khối routing. Dữ liệu trong bộ nhớ là một map `ngày → tài liệu ngày`: nạp từ cache `localStorage`, rồi file trong thư mục ghi đè lên.

**Tech Stack:** HTML/CSS/JS ES5 trong một file. File System Access API, IndexedDB và `localStorage` trên trình duyệt. Node 24 (`node:test`, `node:assert/strict`, `vm`) chỉ dùng để chạy test.

**Spec:** `docs/superpowers/specs/2026-10-18-tab-luyen-tu-duy-design.md`

## Global Constraints

- `roadmap-em.html` phải tự chứa: không build step, không dependency, không thêm thư viện hay `<script src>`.
- JS trong `roadmap-em.html` viết ES5: `var`, `function`, không arrow function, không `let`/`const`, không `for await`, không module. Promise thì dùng `.then()`. File test chạy bằng Node nên được dùng JS hiện đại.
- Câu hỏi và nhãn của T1–T8 và Thẻ 1–6 copy nguyên văn từ `tu-duy-leader/03_template.md` và `tu-duy-leader/04_the-ghi-nho.md`. Thẻ 8–10 copy nguyên văn từ spec §6.
- Khoá `localStorage`: `roadmap-em-tuduy-v1`, có dạng `{"v":1,"days":{<ngày>:<doc>},"draft":{<ngày>:<entries>}}`.
- IndexedDB: database `roadmap-em-tuduy`, store `kv`, khoá `dir` (lưu directory handle).
- Tên file `YYYY-MM-DD.json`, regex `^\d{4}-\d{2}-\d{2}\.json$`. `schema: "career-path-tu-duy-ngay"`, `version: 1`. Ghi bằng `JSON.stringify(doc, null, 2)`.
- Mã điểm: `"dung" | "sai" | "chua"`. Giá trị của trường có/không: `"co" | "khong"`.
- Id dự đoán: `"<ngày>#<n>"` cho T1, `"<ngày>#t2-<n>"` cho T2. `n` đếm từ 1.
- Ngày luôn là chuỗi ngày theo giờ máy, dạng `"YYYY-MM-DD"`, lấy từ `getFullYear/getMonth/getDate`. Không bao giờ dùng `toISOString()` để lấy ngày.
- Route: `#/tu-duy` và `#/tu-duy/YYYY-MM-DD`. Query `?tdToday=YYYY-MM-DD` đè lên "hôm nay", chỉ dùng khi kiểm tra.
- Dữ liệu tab không ghi vào `db.doc(DOC)`, không có trong `buildExport()`, và nút `#reset` không xoá nó.
- Không sửa `.gitignore`. Thư mục `nhat-ky/`, cùng `docs/` và `tests/`, vẫn bị ignore.
- Chạy được ở cả theme sáng lẫn tối bằng token màu sẵn có. Ở bề rộng 360px không có cuộn ngang.
- Không commit nếu anh chưa yêu cầu. Khi được yêu cầu thì tạo branch trước, vì đang ở `main`.

## Review Focus

1. **Mở tab trước 7 giờ sáng (giờ máy UTC+7).** "Hôm nay" phải là ngày theo giờ máy. Nếu lấy từ UTC thì sẽ ra ngày hôm qua. Test nằm ở Task 1.
2. **File lạ trong thư mục nhật ký:** file sửa tay bị hỏng, file schema khác, hoặc file tải về trùng tên kiểu `2026-10-19 (1).json`. Trang phải bỏ qua mà không sập, và đếm số file bỏ qua. Khi nạp bằng tay thì lấy ngày từ `doc.date`, không lấy từ tên file. Test nằm ở Task 5.
3. **Ghi file thất bại** do thư mục bị xoá, đổi chỗ, hoặc quyền bị thu hồi. Dữ liệu vẫn nằm trong cache, trạng thái chuyển thành "chỉ lưu trong trình duyệt", và người dùng chọn lại được thư mục. Test nằm ở Task 5 (lõi) và Task 6 (giao diện).
4. **Có thay đổi chưa lưu khi đổi ngày hoặc đóng tab.** Bản nháp phải còn khi quay lại, và trình duyệt hiện nhắc qua `beforeunload`. Test nằm ở Task 6.
5. **Dự đoán "Chưa tới hạn" kéo dài qua nhiều tuần, hoặc bị chấm lại.** Dự đoán phải xuất hiện lại ở mọi buổi Rà soát cho tới khi có điểm Đúng hoặc Sai. Nếu chấm nhiều lần thì lấy lần mới nhất. Test nằm ở Task 3.

---

### Task 1: Khung test và hàm ngày tháng

**Files:**
- Modify: `roadmap-em.html`. Chèn khối `/* tuduy-core:start */` … `/* tuduy-core:end */` ngay trước dòng `/* ---- index ---- */` (khoảng dòng 1768).
- Create: `tests/tu-duy.test.js`

**Interfaces:**
- Produces (đều là chuỗi ngày `"YYYY-MM-DD"` trừ khi ghi khác):
  - `tdDateStr(d: Date) -> string`
  - `tdNow() -> string`: đọc `?tdToday=` nếu có (chỉ khi `typeof location !== "undefined"`), không thì `tdDateStr(new Date())`.
  - `tdParse(s) -> Date`: nửa đêm theo giờ máy.
  - `tdAddDays(s, n)`, `tdAddMonths(s, n)`: kẹp về ngày cuối tháng khi cần.
  - `tdMonday(s)`: tuần bắt đầu từ thứ Hai.
  - `tdWeekNo(s, startMon) -> int`: tuần 1 là tuần chứa `startMon`. Ngày trước đó trả về ≤ 0.
  - `tdStartMonday(dates: string[], today) -> string`: thứ Hai của ngày nhỏ nhất. Mảng rỗng thì lấy thứ Hai của `today`.
  - `tdClampDate(s, min, max)`
  - `tdVnDate(s) -> string`: ví dụ `"Thứ Hai 19/10"` hoặc `"Chủ nhật 18/10"`.
- Produces (test): `tests/tu-duy.test.js` có các hàm trợ giúp sau. Mọi task sau dùng chung file test này.
  - `root(p)`: trả về `path.join(__dirname, "..", p)`. Mọi đường dẫn trong test đi qua hàm này, nên chạy `node --test tests/` từ thư mục nào cũng được.
  - `load()`: đọc `roadmap-em.html`, tách khối core, chạy bằng `vm.runInThisContext(block, {filename: "tuduy-core"})`, rồi trả về `globalThis`. Phải chạy cùng realm với file test, vì `assert.deepStrictEqual` so cả prototype. Nếu dùng `vm.createContext` thì object từ context riêng có prototype khác, và mọi phép so object sẽ fail dù dữ liệu đúng.
  - `inlineScript`: nội dung giữa `<script>` và `</script>`.

- [ ] **Step 1: Viết test trước**

```js
process.env.TZ = "Asia/Ho_Chi_Minh";
const td = load();
test("toàn bộ inline script parse được", () => { new vm.Script(inlineScript); });
test("tdDateStr dùng giờ máy, không dùng UTC", () => {
  assert.equal(td.tdDateStr(new Date(Date.UTC(2026, 9, 18, 23, 30))), "2026-10-19");
});
test("tdMonday", () => {
  assert.equal(td.tdMonday("2026-10-18"), "2026-10-12");
  assert.equal(td.tdMonday("2026-10-19"), "2026-10-19");
});
test("tdWeekNo", () => {
  assert.equal(td.tdWeekNo("2026-10-19", "2026-10-19"), 1);
  assert.equal(td.tdWeekNo("2026-11-15", "2026-10-19"), 4);
  assert.equal(td.tdWeekNo("2026-11-16", "2026-10-19"), 5);
  assert.ok(td.tdWeekNo("2026-10-18", "2026-10-19") <= 0);
});
test("tdStartMonday", () => {
  assert.equal(td.tdStartMonday([], "2026-10-21"), "2026-10-19");
  assert.equal(td.tdStartMonday(["2026-10-22", "2026-10-20"], "2026-11-30"), "2026-10-19");
});
test("tdAddMonths kẹp cuối tháng", () => { assert.equal(td.tdAddMonths("2026-01-31", 1), "2026-02-28"); });
test("tdClampDate", () => { assert.equal(td.tdClampDate("2026-12-01", "2026-10-19", "2026-10-25"), "2026-10-25"); });
test("tdVnDate", () => {
  assert.equal(td.tdVnDate("2026-10-19"), "Thứ Hai 19/10");
  assert.equal(td.tdVnDate("2026-10-18"), "Chủ nhật 18/10");
});
```

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy: `node --test tests/`
Kỳ vọng: FAIL, vì chưa có khối `tuduy-core`.

- [ ] **Step 3: Thêm khối core với các hàm ở mục Interfaces**

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy: `node --test tests/`
Kỳ vọng: mọi test PASS.

---

### Task 2: Danh mục thẻ và kế hoạch theo ngày

**Files:**
- Modify: `roadmap-em.html`, trong khối core.
- Test: `tests/tu-duy.test.js`

**Interfaces:**
- Consumes: các hàm ngày của Task 1.
- Produces:
  - `TD_CARDS: Card[]`, trong đó `Card = {id, code, name, slot, multi, from, fields}`:
    - `slot` thuộc `"sang" | "toi" | "khi" | "dinh"`.
    - `from` là tuần mở khoá.
    - `fields: Field[]`, với `Field = {k, t, l, o?, ph?}` và `t` thuộc `text | area | check | yn | choice | pct | num | date | note`.
  - `TD_CARD_BY_ID: {[id]: Card}`.
  - `TD_MEETING: {"2A"|"2B"|"2C"|"2D": {name, fields}}`.
  - `tdPlan(date, startMon, days) -> {week, sang: id[], toi: id[], rail: {id, locked, from}[], open: id[], banner: null | {reviewDate, text}}`.
  - Trong đó `days` có dạng `{[ngày]: {date, entries}}`.

**Bảng thẻ** (id, slot, multi, from). Id cố định vì logic và file JSON dựa vào chúng:

| id | slot | multi | from | | id | slot | multi | from |
|---|---|---|---|---|---|---|---|---|
| `review` | sang | – | 2 | | `the6` | toi | – | 5 |
| `t1` | sang | – | 1 | | `t4`, `the5`, `the8`, `the9`, `the10` | khi | ✓ | 1 |
| `the1` | sang | – | 5 | | `t2`, `the3` | khi | ✓ | 5 |
| `the2` | toi | ✓ | 1 | | `t3` | khi | ✓ | 9 |
| `the4` | toi | – | 5 | | `t6` | dinh | ✓ | 9 |
| `t7` | dinh | – | 1 | | `t8` | dinh | – | 10 |

**Trường có key cố định**, vì Task 3–4 đọc chúng. Các trường còn lại người làm tự đặt key:
- `the2` (mỗi cuộc họp có `type`, `title`): 2A `decided` (yn), 2B `nodded` (text), 2D `oneThing` (yn).
- `the4`: `{count, items: string[]}`.
- `the5` và `t4`: `couldPredict` (yn).
- `the6`: `creativePct` (pct), `changedMind` (text), `pending` (text), `pendingDue` (date).
- `the9`: `task` (text), `level` (choice `"1"`…`"7"`), `checkDate` (date).
- `the10`: `person`, `kind` (choice `"khen" | "gop-y"`), `s`, `b`, `i`, `due` (date), `done` (check).
- `t2`: `decision` (text), `predSign` (text), `predMonths` (num), `predProb` (pct).
- `t1`, `review`, `t7`, `t8`: dùng đúng hình dạng ở spec §7.

**Quy tắc của `tdPlan`:**
- **`week`:** bằng `tdWeekNo(date, startMon)`. Một thẻ có slot sang hoặc toi chỉ vào `sang`/`toi` khi `week >= from`. Riêng các thẻ có lịch thì theo điều kiện:
  - `t1`: hiện khi không có ngày nào trong khoảng `[tdMonday(date), date)` đã có `entries.t1`.
  - `review`: cùng điều kiện với `t1` (xét `entries.review`) và thêm điều kiện `week >= 2`.
  - `t6`: hiện khi `week >= 9` và không có `entries.t6` trong 13 ngày trước `date`.
  - `t7`: hiện khi `tdT7Month(date)` khác null (Task 3) và không ngày nào khác có `entries.t7.month` bằng tháng đó.
  - `t8`: hiện khi `10 <= week <= 12`, hoặc khi `week >= 13` và ngày rơi vào ngày 1–14 của tháng 1, 4, 7 hoặc 10.
  - Thứ tự trong `sang`: `review`, `t1`, `the1`, `t6`, `t7`. Thứ tự trong `toi`: `the2`, `the4`, `the6`, `t8`.
- **`rail`:** gồm mọi thẻ slot khi, cộng các thẻ dinh, cộng các thẻ sang/toi đang bị khoá. Thẻ có `week < from` thì `locked: true`.
- **`open`:** gồm thẻ có dữ liệu trong `days[date].entries` nhưng không nằm trong `sang`/`toi`.
- **`banner`:** khi `week === 12` thì trả về `{reviewDate: tdAddDays(startMon, 84), text}`, trong đó `text` là nguyên văn trích dẫn tiêu chí dừng ở `00_huong-dan` §8, bắt đầu bằng "Nếu sau 12 tuần".
- **Thẻ 8–10:** dùng nguyên văn spec §6. Bảng cấp uỷ quyền của Thẻ 9 thành `choice` với 7 nhãn đúng như spec.

- [ ] **Step 1: Viết test trước** (`S = "2026-10-19"`)

```js
const p = (date, days = {}) => td.tdPlan(date, S, days);
test("tuần 1 thứ Hai: chỉ T1, chưa có rà soát", () => {
  const r = p("2026-10-19");
  assert.deepEqual(r.sang, ["t1"]); assert.deepEqual(r.toi, ["the2"]);
  assert.deepEqual(r.rail.find(x => x.id === "the1"), { id: "the1", locked: true, from: 5 });
  assert.equal(r.rail.find(x => x.id === "the10").locked, false);
});
test("tuần 2 thứ Hai: rà soát rồi T1", () => { assert.deepEqual(p("2026-10-26").sang, ["review", "t1"]); });
test("bỏ lỡ thứ Hai thì thứ Ba hiện; đã làm thứ Hai thì thứ Ba không hiện", () => {
  assert.deepEqual(p("2026-10-27").sang, ["review", "t1"]);
  const days = { "2026-10-26": { date: "2026-10-26", entries: { t1: { predictions: [] }, review: {} } } };
  assert.deepEqual(p("2026-10-27", days).sang, []);
});
test("tuần 5", () => {
  const r = p("2026-11-16");
  assert.ok(r.sang.includes("the1")); assert.deepEqual(r.toi, ["the2", "the4", "the6"]);
  assert.equal(r.rail.find(x => x.id === "t2").locked, false);
});
test("T6 hai tuần một lần", () => {
  assert.ok(p("2026-12-14").sang.includes("t6"));                          // tuần 9
  const d = { "2026-12-09": { date: "2026-12-09", entries: { t6: [{}] } } };
  assert.ok(!p("2026-12-14", d).sang.includes("t6"));
});
test("T8", () => {
  assert.ok(p("2026-12-21").toi.includes("t8"));                           // tuần 10
  assert.ok(p("2027-01-12").toi.includes("t8"));                           // tuần 13, tháng 1, ngày 12
  assert.ok(!p("2027-02-02").toi.includes("t8"));
});
test("T7 cuối tháng", () => {
  assert.ok(p("2026-10-31").sang.includes("t7"));
  assert.ok(p("2026-11-03").sang.includes("t7"));
  const d = { "2026-11-01": { date: "2026-11-01", entries: { t7: { month: "2026-10" } } } };
  assert.ok(!p("2026-11-03", d).sang.includes("t7"));
  assert.ok(!p("2026-11-08").sang.includes("t7"));
});
test("tuần 12 có banner ngày rà soát", () => {
  const b = p("2027-01-05").banner;
  assert.equal(b.reviewDate, "2027-01-11"); assert.match(b.text, /^Nếu sau 12 tuần/);
});
test("thẻ có dữ liệu hôm nay nằm trong open dù đang khoá", () => {
  const d = { "2026-10-27": { date: "2026-10-27", entries: { t3: [{}] } } };
  assert.ok(p("2026-10-27", d).open.includes("t3"));
});
test("Thẻ 9 có đủ 7 cấp uỷ quyền", () => {
  assert.equal(td.TD_CARD_BY_ID.the9.fields.find(f => f.k === "level").o.length, 7);
});
```

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy: `node --test tests/`. Kỳ vọng: FAIL vì `tdPlan is not a function`.

- [ ] **Step 3: Thêm `TD_CARDS`, `TD_MEETING`, `TD_CARD_BY_ID` và `tdPlan` vào khối core**

Chuyển từng ô trong file md thành `Field` theo quy ước ở spec §5:
- `□ … → ____` thành `check`, kèm một trường `text` ngay sau.
- `□` đứng một mình thành `check`.
- `[ ] Có [ ] Không` thành `yn`.
- Mục ghi "3-5 câu" thành `area`.
- Mọi ô nhập khác thành `text`.
- Câu ghi chú trong ngoặc của thẻ thành `note`.

`tdT7Month` thuộc Task 3. Nếu làm Task 2 trước thì viết sẵn hàm này theo quy tắc ở Task 3.

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy: `node --test tests/`. Kỳ vọng: PASS.

---

### Task 3: Dự đoán, rà soát tuần, T7, kiểm tra T1

**Files:**
- Modify: `roadmap-em.html`, trong khối core.
- Test: `tests/tu-duy.test.js`

**Interfaces:**
- Consumes: hàm ngày của Task 1, các key của `t1` và `t2` ở Task 2.
- Produces:
  - `tdPredictions(days) -> {id, date, text, prob, due}[]`. Bao gồm dự đoán T1, cộng dự đoán từ T2 khi có cả `predSign` và `predProb`. Với dự đoán T2: `id = "<ngày>#t2-<n>"`, `text = decision + ": " + predSign`, `due = tdAddMonths(date, predMonths || 1)`.
  - `tdGrades(days) -> {[id]: {grade, date, note}}`: lấy lần chấm mới nhất theo ngày.
  - `tdReviewList(days, date) -> (pred & {grade})[]`:
    - Gồm dự đoán có `date < reviewDate` mà chưa có điểm `dung`/`sai` từ một ngày trước `reviewDate`.
    - `grade` lấy theo thứ tự ưu tiên: điểm đã chấm trong chính ngày `reviewDate`; nếu chưa có mà `due >= reviewDate` thì là `"chua"`; còn lại là `null`.
  - `tdT7Month(date) -> "YYYY-MM" | null`: ngày cuối tháng thì trả về tháng đó, ngày 1–7 thì trả về tháng trước, các ngày khác trả về null.
  - `tdT7Table(days, month) -> {bucket, n, hit, rate, avgProb, diff}[]`:
    - Luôn đủ 4 dòng theo thứ tự `"20-40"`, `"40-60"`, `"60-80"`, `"80-100"`.
    - Xếp nhóm: `prob < 40`, `< 60`, `< 80`, còn lại.
    - Chỉ tính dự đoán có `due` trong tháng và có điểm mới nhất là `dung` hoặc `sai`.
    - `rate = round(hit / n * 100)`, `avgProb = round(trung bình prob)`, `diff = rate - avgProb`. Nhóm có `n = 0` thì `rate`, `avgProb`, `diff` đều là `null`.
  - `tdValidateT1(preds) -> {i, level: "block" | "warn", msg}[]`. Các thông báo dùng đúng câu chữ sau:
    - Mảng rỗng: block `"Ghi ít nhất 1 dự đoán."`
    - Hơn 3 dự đoán: block `"Tối đa 3 dự đoán."`
    - `text` trống: block `"Mệnh đề trống."`
    - `prob === 50`: block `"Không dùng 50% — chọn 40 hoặc 60."`
    - `prob` không phải số nguyên trong khoảng 1–99: block `"Xác suất từ 1 đến 99."`
    - `due` trống: block `"Thiếu hạn chót."`
    - `wrongIf` trống: warn `"Dòng “điều gì sẽ khiến tôi sai” là dòng quan trọng nhất."`

- [ ] **Step 1: Viết test trước**

```js
const day = (date, entries) => ({ date, entries });
const P = (id, prob, due, extra = {}) => ({ id, text: "x", prob, due, basis: "", wrongIf: "y", ...extra });
test("dự đoán chưa tới hạn được kéo qua nhiều tuần; chấm lại thì lấy lần mới nhất", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 65, "2026-11-20"), P("2026-10-19#2", 30, "2026-10-23")] } }),
    "2026-10-26": day("2026-10-26", { review: { grades: { "2026-10-19#1": "chua", "2026-10-19#2": "sai" } } }),
    "2026-11-02": day("2026-11-02", { review: { grades: { "2026-10-19#2": "dung" } } }),
  };
  const ids = td.tdReviewList(days, "2026-11-09").map(x => x.id);
  assert.deepEqual(ids, ["2026-10-19#1"]);
  assert.equal(td.tdReviewList(days, "2026-11-09")[0].grade, "chua");
  assert.equal(td.tdGrades(days)["2026-10-19#2"].grade, "dung");
});
test("dự đoán quá hạn chưa chấm có grade null", () => {
  const days = { "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 70, "2026-10-23")] } }) };
  assert.equal(td.tdReviewList(days, "2026-10-26")[0].grade, null);
});
test("dự đoán từ mục 9 của T2", () => {
  const days = { "2026-10-20": day("2026-10-20", { t2: [{ decision: "Tách service", predSign: "deploy độc lập", predMonths: 2, predProb: 70 }] }) };
  assert.deepEqual(td.tdPredictions(days)[0], { id: "2026-10-20#t2-1", date: "2026-10-20", text: "Tách service: deploy độc lập", prob: 70, due: "2026-12-20" });
});
test("tdT7Month", () => {
  assert.equal(td.tdT7Month("2026-10-31"), "2026-10");
  assert.equal(td.tdT7Month("2026-11-07"), "2026-10");
  assert.equal(td.tdT7Month("2026-11-08"), null);
});
test("tdT7Table", () => {
  const days = {
    "2026-10-05": day("2026-10-05", { t1: { predictions: [P("a#1", 70, "2026-10-09"), P("a#2", 65, "2026-10-09"), P("a#3", 30, "2026-11-02")] } }),
    "2026-10-12": day("2026-10-12", { review: { grades: { "a#1": "dung", "a#2": "sai" } } }),
  };
  const t = td.tdT7Table(days, "2026-10");
  assert.deepEqual(t.map(r => r.bucket), ["20-40", "40-60", "60-80", "80-100"]);
  assert.deepEqual(t[2], { bucket: "60-80", n: 2, hit: 1, rate: 50, avgProb: 68, diff: -18 });
  assert.equal(t[0].n, 0); assert.equal(t[0].rate, null);
});
test("tdValidateT1", () => {
  assert.deepEqual(td.tdValidateT1([]), [{ i: -1, level: "block", msg: "Ghi ít nhất 1 dự đoán." }]);
  assert.ok(td.tdValidateT1([P("x", 50, "2026-10-23")]).some(e => e.msg === "Không dùng 50% — chọn 40 hoặc 60."));
  assert.ok(td.tdValidateT1([P("x", 0, "2026-10-23")]).some(e => e.msg === "Xác suất từ 1 đến 99."));
  const w = td.tdValidateT1([P("x", 60, "2026-10-23", { wrongIf: "" })]);
  assert.deepEqual(w, [{ i: 0, level: "warn", msg: "Dòng “điều gì sẽ khiến tôi sai” là dòng quan trọng nhất." }]);
});
```

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy `node --test tests/`. Kỳ vọng: FAIL.

- [ ] **Step 3: Viết các hàm ở mục Interfaces trong khối core**

Khi `tdValidateT1` nhận mảng rỗng thì trả về lỗi với `i: -1`.

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy `node --test tests/`. Kỳ vọng: PASS.

---

### Task 4: Tín hiệu lặp lại, việc đến hạn hôm nay, số liệu tuần, số liệu T8

**Files:**
- Modify: `roadmap-em.html`, trong khối core.
- Test: `tests/tu-duy.test.js`

**Interfaces:**
- Consumes: các key cố định ở Task 2, `tdPredictions` và `tdGrades` ở Task 3.
- Produces:
  - `tdSignals(days, date) -> {key, text}[]`: chỉ xét các ngày `<= date`. Thứ tự thời gian là ngày tăng dần, trong cùng một ngày thì theo thứ tự trong mảng.
  - `tdDueToday(days, date) -> {kind, label, ref}[]`, với `kind` thuộc `"pred" | "sbi" | "deleg" | "pending"`.
  - `tdWeekStats(days, monday) -> {the4, nod2B, creativeAvg}`: xét 7 ngày `[monday, monday+6]`. `creativeAvg` làm tròn, không có dữ liệu thì là null.
  - `tdT8Stats(days, date) -> {blocks, p, k, pPct, kPct}`: xét các khối `t8.blocks` của 14 ngày kết thúc ở `date`.

**Sáu tín hiệu.** Chạm ngưỡng thì trả về đúng `key` và `text` sau:

| key | Điều kiện | text |
|---|---|---|
| `s2d` | 3 cuộc 2D gần nhất đều có `oneThing === "khong"` | `Từ 3 lần trở lên bỏ qua “một điều nên làm khác đi” trong 1-1 → đây không phải vấn đề thời gian, mà là né tránh.` |
| `s6mind` | 5 mục `the6` gần nhất đều trống `changedMind` | `Không đổi ý về điều gì trong 5 ngày liên tiếp → tôi đang không cân nhắc thật.` |
| `s5pred` | 3 sự cố gần nhất (`the5` và `t4` gộp lại) đều có `couldPredict === "co"` | `3 sự cố liên tiếp trả lời “Có, tôi đã có thể dự đoán” → vấn đề không phải kiến thức, mà là không dừng lại để nghĩ.` |
| `s2a` | 3 cuộc 2A gần nhất đều có `decided === "khong"` | `3 cuộc họp liên tiếp không ra quyết định → tôi đang họp sai cách.` |
| `s6pct` | 3 mục `the6` gần nhất đều có `creativePct < 20` | `Kiến tạo dưới 20% ba ngày liên tiếp → thứ Sáu phải xem lại lịch.` |
| `s5mind` | 3 mục `review` gần nhất đều trống `changedMind` | `3 tuần liên tiếp không đổi ý về điều gì → tôi đang không thực sự cân nhắc phương án khác, chỉ đang tìm lý do cho phương án đã chọn.` |

**Việc đến hạn hôm nay**, theo đúng thứ tự `pred`, `sbi`, `deleg`, `pending`:
- `pred`: dự đoán có `due === date` và chưa có điểm `dung`/`sai`.
- `sbi`: mục `the10` có `!done` và `due <= date`.
- `deleg`: mục `the9` có `checkDate === date`.
- `pending`: mục `the6` có `pendingDue === date`.

- [ ] **Step 1: Viết test trước**

Viết hai test cho mỗi tín hiệu: một trường hợp vừa chạm ngưỡng thì có tín hiệu, một trường hợp thiếu đúng một lần thì không có. Ví dụ với `s2d`:

```js
test("s2d: ba cuộc 2D liên tiếp bỏ qua thì có; lần gần nhất có nói thì không", () => {
  const m = v => ({ type: "2D", oneThing: v });
  const days = { "2026-10-20": day("2026-10-20", { the2: [m("khong"), m("khong")] }), "2026-10-22": day("2026-10-22", { the2: [m("khong")] }) };
  assert.deepEqual(td.tdSignals(days, "2026-10-22").map(s => s.key), ["s2d"]);
  days["2026-10-23"] = day("2026-10-23", { the2: [m("co")] });
  assert.deepEqual(td.tdSignals(days, "2026-10-23"), []);
});
```

Thêm các test sau:

```js
test("đến hạn hôm nay", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 60, "2026-10-21")] },
      the10: [{ person: "A", due: "2026-10-20", done: false }, { person: "B", due: "2026-10-20", done: true }],
      the9: [{ task: "review PR", checkDate: "2026-10-21" }] }),
    "2026-10-20": day("2026-10-20", { the6: { pending: "nói với C", pendingDue: "2026-10-21" } }),
  };
  assert.deepEqual(td.tdDueToday(days, "2026-10-21").map(x => x.kind), ["pred", "sbi", "deleg", "pending"]);
});
test("số liệu tuần cho buổi rà soát", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { the4: { count: 2, items: [] }, the2: [{ type: "2B", nodded: "nhận deadline 3 ngày" }], the6: { creativePct: 30 } }),
    "2026-10-21": day("2026-10-21", { the4: { count: 1, items: [] }, the6: { creativePct: 15 } }),
    "2026-10-26": day("2026-10-26", { the4: { count: 9, items: [] } }),
  };
  assert.deepEqual(td.tdWeekStats(days, "2026-10-19"), { the4: 3, nod2B: 1, creativeAvg: 23 });
});
test("số liệu T8", () => {
  const days = { "2026-12-21": day("2026-12-21", { t8: { blocks: [{ pk: "P" }, { pk: "P" }, { pk: "K" }, { pk: "" }] } }) };
  assert.deepEqual(td.tdT8Stats(days, "2026-12-22"), { blocks: 3, p: 2, k: 1, pPct: 67, kPct: 33 });
});
```

Khối T8 có `pk` trống thì không được đếm.

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy `node --test tests/`. Kỳ vọng: FAIL.

- [ ] **Step 3: Viết bốn hàm ở mục Interfaces**

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy `node --test tests/`. Kỳ vọng: PASS.

---

### Task 5: Định dạng file ngày và phần lõi đọc/ghi thư mục

**Files:**
- Modify: `roadmap-em.html`, trong khối core. Các hàm ở task này chỉ dùng API của handle được truyền vào, không đụng `window` hay `document`.
- Test: `tests/tu-duy.test.js`

**Interfaces:**
- Produces:
  - `tdFileName(date) -> string`
  - `tdIsDayFile(name) -> bool`
  - `tdPrune(entries) -> entries`: bỏ chuỗi rỗng, `false`, `null`, mảng rỗng, object rỗng (đệ quy), và `the4` có `count: 0` mà `items` rỗng. Mọi giá trị số đều giữ lại, kể cả `0`.
  - `tdDayDoc(date, entries, nowIso) -> {schema, version, date, savedAt, entries}`
  - `tdParseDayDoc(text) -> doc | null`: trả về null nếu JSON hỏng, sai `schema`, `version !== 1`, `date` không khớp dạng ngày, hoặc `entries` không phải object.
  - `tdMergeDays(base, docs: doc[]) -> days`: doc mới thắng doc cũ cùng ngày.
  - `tdWriteDayTo(dir, doc) -> Promise<void>`: gọi lần lượt `dir.getFileHandle(name, {create: true})`, `.createWritable()`, `.write(text)`, `.close()`. Lỗi ở bất kỳ bước nào thì Promise reject.
  - `tdReadDir(dir) -> Promise<{docs, bad: string[]}>`: duyệt `dir.values()` bằng cách gọi `.next()` đệ quy (không dùng `for await`). File không khớp regex tên thì bỏ qua và không đếm. File khớp tên mà parse ra null thì đưa vào `bad`.

- [ ] **Step 1: Viết test trước**

```js
test("nhận diện tên file", () => {
  assert.equal(td.tdIsDayFile("2026-10-19.json"), true);
  assert.equal(td.tdIsDayFile("2026-10-19 (1).json"), false);
  assert.equal(td.tdIsDayFile("notes.json"), false);
});
test("parse file hỏng hoặc sai schema", () => {
  assert.equal(td.tdParseDayDoc("{oops"), null);
  assert.equal(td.tdParseDayDoc(JSON.stringify({ schema: "khac", version: 1, date: "2026-10-19", entries: {} })), null);
  const ok = td.tdDayDoc("2026-10-19", { t1: { predictions: [] } }, "2026-10-19T00:00:00.000Z");
  assert.deepEqual(td.tdParseDayDoc(JSON.stringify(ok)), ok);
});
test("tdPrune", () => {
  assert.deepEqual(td.tdPrune({ the1: { a: "", b: false }, the4: { count: 0, items: [] }, the6: { creativePct: 0 }, the2: [] }), { the6: { creativePct: 0 } });
});
test("ghi file qua handle giả", async () => {
  const written = {}; const dir = fakeDir(written);
  const doc = td.tdDayDoc("2026-10-19", { the1: { x: "y" } }, "2026-10-19T00:00:00.000Z");
  await td.tdWriteDayTo(dir, doc);
  assert.equal(written["2026-10-19.json"], JSON.stringify(doc, null, 2));
});
test("ghi thất bại thì reject", async () => {
  await assert.rejects(td.tdWriteDayTo(fakeDir({}, { failWrite: true }), td.tdDayDoc("2026-10-19", {}, "x")));
});
test("đọc thư mục bỏ qua file lạ", async () => {
  const good = JSON.stringify(td.tdDayDoc("2026-10-19", {}, "x"));
  const r = await td.tdReadDir(fakeDir({ "2026-10-19.json": good, "2026-10-20.json": "{oops", "2026-10-19 (1).json": good, "readme.txt": "hi" }));
  assert.equal(r.docs.length, 1); assert.deepEqual(r.bad, ["2026-10-20.json"]);
});
```

`fakeDir(files, opts)` là hàm trợ giúp trong file test. Nó mô phỏng `FileSystemDirectoryHandle`: `values()` trả về async iterator gồm các entry `{kind: "file", name, getFile()}`, trong đó `getFile()` trả về `{text()}`. `getFileHandle()` trả về handle có `createWritable()` → `{write, close}`. Khi `opts.failWrite` bật thì `createWritable()` reject.

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy `node --test tests/`. Kỳ vọng: FAIL.

- [ ] **Step 3: Viết các hàm ở mục Interfaces**

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy `node --test tests/`. Kỳ vọng: PASS.

---

### Task 6: Khung tab, form chung, lưu trên trình duyệt

**Files:**
- Modify `roadmap-em.html`:
  - Thêm link nav `<a href="#/tu-duy" id="nav-tuduy">Luyện tư duy</a>` ngay sau `nav-read` (khoảng dòng 589).
  - Thêm `<main class="wrap" id="view-tuduy" hidden>` ngay trước comment khối PMP (khoảng dòng 729).
  - Thêm khối CSS `/* ================= tab Luyện tư duy ================= */` trước `@media (max-width:860px)` (khoảng dòng 568).
  - Thêm khối JS cùng tên trước `/* ================= routing ================= */`.
  - Sửa `route()` để nhận `var tdv = back.indexOf("#/tu-duy")===0;`. Ẩn và hiện view, đặt class `on` cho nav, gọi `renderTuDuy()` theo đúng mẫu của `pmpv`.

**Interfaces:**
- Consumes: toàn bộ khối core.
- Produces:
  - `TD_LS = "roadmap-em-tuduy-v1"`
  - `tdState = {date, days, draft, dir, perm, dirty, status}`
  - `renderTuDuy()`
  - `tdSave() -> Promise<"file" | "download" | "cache">`
  - `tdConnect(ask: bool) -> Promise<bool>`
  - `tdImport(files) -> Promise<{ok, bad}>`
  - `tdIdbGet(k)` và `tdIdbSet(k, v)`, đều trả về Promise.
  - `tdDownload(name, text)`: hàm toàn cục, luồng dự phòng gọi nó theo tên. Nhờ vậy khi kiểm có thể thay bằng hàm giả, không ghi file thật vào thư mục Downloads.
  - `tdGoDate(date)`: kẹp ngày, đặt hash `#/tu-duy/<ngày>`, rồi render lại.
  - Chuỗi trạng thái, dùng đúng câu chữ: `"chưa lưu vào file"`, `"đã lưu HH:MM"`, `"chỉ lưu trong trình duyệt"`, `"đã tải file về máy"`.

Hành vi theo spec §3, §4, §7:

- **Đầu trang:**
  - Hai nút `‹` và `›` để đổi ngày, kẹp bằng `tdClampDate(date, startMon, tdNow())`, kèm `tdVnDate`.
  - Nhãn tuần: hiện `"Tuần N/12"` khi `N <= 12`, còn lại hiện `"Tuần N"`.
  - Nút **Lưu** và dòng trạng thái.
  - Nút "Kết nối thư mục nhật ký", hiện khi đã có handle nhưng `perm === "prompt"`.
  - Nút "Nạp file nhật ký", hiện khi không có `showDirectoryPicker`.
- **Route:** `route()` tách ngày từ `#/tu-duy/YYYY-MM-DD`. Hash không có ngày hoặc ngày sai dạng thì dùng `tdNow()`. Đổi ngày bằng `‹ ›` thì đi qua `tdGoDate`.
- **Thân trang:**
  - Khối "Buổi sáng" và "Buổi tối" render các thẻ theo `tdPlan`, rồi đến vùng `open`.
  - Ở bề rộng dưới 860px, cột phải chuyển xuống dưới hai khối chính.
  - Đầu khối Sáng có một chỗ trống `#td-due` và một chỗ trống `#td-signals` (Task 7 điền).
  - Cột phải chia hai nhóm "Khi cần" và "Định kỳ" từ `rail`.
  - Thẻ đang khoá hiện mờ, kèm `"mở từ tuần N"`. Bấm vào thì mở thẻ, kèm dòng nhắc nguyên văn: `"Hướng dẫn khuyên chưa mở thẻ này trước tuần N — làm hết cùng lúc thì sang tuần thứ ba sẽ bỏ."`
- **Form chung:** render theo `Field.t` cho Thẻ 1–6, 8–10 và T2, T3, T4, T6.
  - Thẻ multi có nút "+ Thêm".
  - Thẻ 2 có nút chọn 2A, 2B, 2C, 2D trước khi hiện bộ câu hỏi tương ứng.
  - Thẻ 4 là bộ đếm `[–] n [+]`, cộng danh sách việc.
- **Bản nháp:**
  - Mỗi lần nhập thì ghi vào `draft[date]` trong `TD_LS`, debounce 500 ms. Bật `dirty` và đặt trạng thái `"chưa lưu vào file"`.
  - Đổi ngày thì giữ nguyên bản nháp của ngày cũ.
  - Gắn `beforeunload`: khi `dirty` thì gọi `e.preventDefault()` và đặt `e.returnValue = ""`.
- **`tdSave()`:**
  - Có `showDirectoryPicker`:
    1. Chưa có handle thì gọi `showDirectoryPicker({id: "nhat-ky", mode: "readwrite"})`, rồi `tdIdbSet("dir", h)`.
    2. Gọi `requestPermission({mode: "readwrite"})`. Handle nào không có `queryPermission`/`requestPermission` (ví dụ handle OPFS dùng khi kiểm) thì coi như đã có quyền `granted`.
    3. Gọi `tdWriteDayTo` với `tdDayDoc(date, tdPrune(draft[date]), new Date().toISOString())`.
    4. Thành công thì cập nhật `days[date]`, ghi `days` vào `TD_LS`, xoá `draft[date]`, đặt `dirty = false`, trạng thái `"đã lưu HH:MM"`.
    5. Lỗi (gồm `SecurityError` trong iframe Artifact) thì giữ bản nháp, đặt trạng thái `"chỉ lưu trong trình duyệt"`, rồi hiện nút "Chọn lại thư mục".
  - Không có `showDirectoryPicker`: gọi `tdDownload(tdFileName(date), text)`. Hàm này tải file về giống `doExport()`, ưu tiên `dlFn.save`, không thì dùng Blob. Sau đó ghi `days` vào cache và đặt trạng thái `"đã tải file về máy"`.
- **Khi mở tab:**
  - Nạp cache, rồi `tdIdbGet("dir")`, rồi `queryPermission`.
  - Nếu quyền là `granted` thì gọi `tdReadDir`, gộp bằng `tdMergeDays`, rồi ghi lại cache.
  - Số file hỏng (`bad.length`) hiện thành một dòng `"Bỏ qua N file không đọc được."`
- **`tdImport`:** đọc `<input type="file" multiple accept=".json">` bằng `FileReader` và `tdParseDayDoc`. Ngày lấy từ `doc.date`.

- [ ] **Step 1: Chạy khung test.** Chạy `node --test tests/`. Kỳ vọng: PASS. Test "toàn bộ inline script parse được" dùng làm cổng kiểm cú pháp ES5 cho code giao diện.

- [ ] **Step 2: Viết phần giao diện và phần lưu trên trình duyệt như mô tả ở trên**

- [ ] **Step 3: Kiểm trên trình duyệt**

Chạy server bằng `python -m http.server 8765 --bind 127.0.0.1` ở chế độ chạy nền, rồi mở `http://127.0.0.1:8765/roadmap-em.html?tdToday=2026-10-19#/tu-duy`. Chạy đoạn sau bằng `javascript_tool`. Kỳ vọng mọi giá trị đều là `true`:

```js
({
  nav: !!document.getElementById("nav-tuduy"),
  view: !document.getElementById("view-tuduy").hidden,
  week: /Tuần 1\/12/.test(document.getElementById("view-tuduy").textContent),
  lockedThe1: /mở từ tuần 5/.test(document.getElementById("view-tuduy").textContent),
  noHScroll: document.documentElement.scrollWidth <= window.innerWidth
})
```

Không mở hộp thoại thật khi kiểm, vì hộp thoại sẽ chặn extension Chrome. Hộp chọn thư mục của hệ điều hành cũng không bấm được qua extension, nên thay bằng thư mục OPFS. Đó vẫn là một thư mục thật, ghi và đọc được:

```js
window.showDirectoryPicker = function(){ return navigator.storage.getDirectory().then(function(r){ return r.getDirectoryHandle("td-test", {create:true}); }); };
```

Sau đó kiểm lần lượt:
1. **Bản nháp còn khi đổi ngày:** gõ một ô của T1, bấm `‹` sang ngày hôm trước, rồi bấm `›` quay lại. Chữ vừa gõ vẫn còn. `JSON.parse(localStorage["roadmap-em-tuduy-v1"]).draft["2026-10-19"]` có dữ liệu.
2. **Nhắc trước khi đóng tab, không mở hộp thoại thật:** chạy `var e = new Event("beforeunload", {cancelable:true}); window.dispatchEvent(e); e.defaultPrevented`. Kỳ vọng `true` khi đang có thay đổi chưa lưu. Trong lúc đang `dirty` thì không được điều hướng khỏi trang.
3. **Ghi file:** bấm Lưu. Đọc lại bằng `navigator.storage.getDirectory()` → `td-test` → `2026-10-19.json` → `text()`. Nội dung phải parse được bằng `tdParseDayDoc` và đúng mẫu spec §7. Trạng thái khớp `/^đã lưu \d\d:\d\d$/`.
4. **Ghi thất bại:** gõ thêm một ô, chạy `navigator.storage.getDirectory().then(r => r.removeEntry("td-test", {recursive:true}))`, rồi bấm Lưu. Trạng thái phải là `"chỉ lưu trong trình duyệt"`, bản nháp còn nguyên, và nút "Chọn lại thư mục" hiện ra.
5. **Màn hình hẹp và theme tối:** dùng `resize_window` thu về bề rộng 360px, rồi đặt `document.documentElement.dataset.theme = "dark"`. Không có cuộn ngang, chữ vẫn đọc được trên ảnh chụp.

- [ ] **Step 4: Kiểm quyền riêng tư**

Chạy trong trang. Kỳ vọng `exportClean` là `true` và `resetKeeps` là `true`:

```js
var before = localStorage["roadmap-em-tuduy-v1"];
document.getElementById("reset").click();
({
  exportClean: JSON.stringify(buildExport()).indexOf("tuduy") === -1,
  resetKeeps: localStorage["roadmap-em-tuduy-v1"] === before
})
```

Tìm thêm bằng `grep -n "db.doc" roadmap-em.html`. Kỳ vọng chỉ thấy các lệnh gọi có sẵn từ trước, không có lệnh nào trong khối tab.

Lưu ý: nút `#reset` xoá tiến độ roadmap trong trình duyệt đang kiểm. Chỉ chạy bước này trên server thử, nơi `localStorage` của origin `127.0.0.1:8765` không phải dữ liệu thật.

---

### Task 7: Các màn hình riêng — T1, Rà soát tuần, T7, T8, Đến hạn, Tín hiệu, banner tuần 12

**Files:**
- Modify: `roadmap-em.html`, trong khối JS của tab.

**Interfaces:**
- Consumes:
  - Từ Task 3: `tdValidateT1`, `tdReviewList`, `tdT7Month`, `tdT7Table`.
  - Từ Task 4: `tdWeekStats`, `tdT8Stats`, `tdDueToday`, `tdSignals`.
  - Từ Task 2: `tdPlan(...).banner`.
  - Từ Task 6: hàm render và cơ chế ghi bản nháp.
- Produces: các hàm render `tdRenderT1`, `tdRenderReview`, `tdRenderT7`, `tdRenderT8`, `tdRenderDue`, `tdRenderSignals`, `tdRenderBanner`. Mỗi hàm nhận `(date)` và trả về chuỗi HTML.

Hành vi:
- **T1:**
  - Có 1 đến 3 dòng dự đoán, nút "+ Thêm dự đoán" bị tắt khi đã đủ 3.
  - Lỗi `block` hiện đỏ dưới đúng dòng và chặn nút Lưu. Lỗi `warn` hiện màu cam, không chặn.
  - Placeholder lấy từ ba câu mồi ở `00_huong-dan` §2.
  - Id của từng dự đoán là `"<ngày>#<n>"`.
- **Rà soát tuần:**
  - Mỗi dự đoán trong `tdReviewList` là một dòng, gồm mệnh đề, xác suất, hạn chót, ba nút Đúng / Sai / Chưa tới hạn, và một ô ghi chú.
  - Các câu còn lại theo spec §5.
  - Phần "Số liệu tuần" gợi ý từ `tdWeekStats(days, tdAddDays(tdMonday(date), -7))`. Các số này điền sẵn vào ô và người dùng sửa được.
- **T7:**
  - Bảng lấy từ `tdT7Table(days, tdT7Month(date))`. Ô `null` hiện dấu `—`.
  - Có ba ô "mẫu lặp lại".
  - Khi `week >= 12`, hiện thêm bảng so sánh: mỗi tháng có dữ liệu là một dòng, gồm độ lệch của 4 nhóm.
  - Lưu `entries.t7 = {month, table, patterns}`.
- **T8:**
  - Bảng các khối 30 phút, có nút "+ Thêm khối".
  - Dòng tổng lấy từ `tdT8Stats`.
  - Có ba ô "việc ngốn thời gian nhất" và một ô hành động.
- **Đến hạn:** danh sách đọc từ `tdDueToday`, bấm vào thì cuộn tới mục gốc. Danh sách rỗng thì ẩn cả khối.
- **Tín hiệu:** mỗi tín hiệu từ `tdSignals` là một dòng, chỉ hiện `text`, không thêm chữ nào khác.
- **Banner tuần 12:** gồm `reviewDate` và nguyên văn tiêu chí dừng.

- [ ] **Step 1: Chạy khung test.** Chạy `node --test tests/`. Kỳ vọng: PASS.

- [ ] **Step 2: Viết các hàm render và nối chúng vào `renderTuDuy()`**

- [ ] **Step 3: Kiểm trên trình duyệt bằng dữ liệu mồi**

Ghi `localStorage["roadmap-em-tuduy-v1"]` với các ngày lấy từ test ở Task 3–4, rồi tải lại trang và kiểm từng mục:
- `?tdToday=2026-10-26`: có Rà soát và T1. Dự đoán của 19/10 hiện ra, và ô số liệu tuần đã điền sẵn.
- Nhập 50% vào T1: thấy dòng `"Không dùng 50% — chọn 40 hoặc 60."` và nút Lưu bị tắt.
- `?tdToday=2026-10-31`: T7 hiện bảng 4 nhóm, ô trống hiện `—`.
- Mồi ba cuộc 2D liên tiếp có `oneThing: "khong"`: tín hiệu `s2d` hiện đúng câu chữ.
- `?tdToday=2027-01-05`: banner hiện ngày `11/01/2027`.

---

### Task 8: Ba thẻ mới trong file md, link từ roadmap, README

**Files:**
- Modify `tu-duy-leader/04_the-ghi-nho.md` và `tư duy leader/04_the-ghi-nho.md`: chèn Thẻ 8, 9, 10 nguyên văn spec §6, sau Thẻ 7 và trước mục "Thẻ gốc".
- Modify `roadmap-em.html`, trong mảng `DATA`: thêm vào `res` của các kỹ năng sau một dòng `{k:"file", l:"Thẻ N — <tên thẻ>", p:"tư duy leader/04_the-ghi-nho.md"}`:
  - Thẻ 8: `state`, `safety`, `underperform`, `say-no`.
  - Thẻ 9: `delegate-decision`, `delegation-levels`, `stretch`.
  - Thẻ 10: `sbi`, `feedback-48h`.
  - Kỹ năng nào chưa có `res` thì tạo mới.
- Modify `README.md`:
  - Đổi mục "## Năm tab" thành "## Sáu tab".
  - Thêm dòng `| **Luyện tư duy** | … |` vào bảng.
  - Thêm một đoạn ngắn về `nhat-ky/`: mỗi ngày một file JSON, không đưa lên git vì có tên người trong team.
  - Sửa mục `tu-duy-leader/` từ "7 thẻ" thành "10 thẻ".

- [ ] **Step 1: Viết test trước**

```js
test("roadmap trỏ tới thẻ mới", () => {
  const D = loadData();                                   // tách `var DATA = [` … `var AXIS =`, giống cách dump ở bước đối chiếu
  const res = id => JSON.stringify(D.flatMap(s => s.groups).flatMap(g => g.nodes).find(n => n.id === id).res || []);
  for (const id of ["state", "safety", "underperform", "say-no"]) assert.match(res(id), /Thẻ 8 —/);
  for (const id of ["delegate-decision", "delegation-levels", "stretch"]) assert.match(res(id), /Thẻ 9 —/);
  for (const id of ["sbi", "feedback-48h"]) assert.match(res(id), /Thẻ 10 —/);
});
test("hai bản md có Thẻ 8–10 và giống hệt nhau", () => {
  const a = fs.readFileSync("tu-duy-leader/04_the-ghi-nho.md", "utf8");
  const b = fs.readFileSync("tư duy leader/04_the-ghi-nho.md", "utf8");
  for (const h of ["## THẺ 8", "## THẺ 9", "## THẺ 10"]) assert.ok(a.includes(h));
  assert.equal(a, b);
});
```

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy `node --test tests/`. Kỳ vọng: FAIL.

- [ ] **Step 3: Sửa hai file md, mảng `DATA` và README như mục Files**

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy `node --test tests/`. Kỳ vọng: PASS.

Chạy thêm `git status --short`. Kỳ vọng chỉ có `README.md`, `roadmap-em.html` và `tu-duy-leader/04_the-ghi-nho.md`. Không được có file nào trong `nhat-ky/`, `docs/` hay `tests/`.

---

### Task 9: Chạy toàn bộ luồng theo spec §10

**Files:** không thêm code. Lỗi tìm được thì sửa trong task sở hữu phần đó, kèm test.

- [ ] **Step 1:** Chạy `node --test tests/`. Kỳ vọng: mọi test PASS.
- [ ] **Step 2:** Trên `http://127.0.0.1:8765`, làm đủ 7 bước ở spec §10. Dùng thư mục thử OPFS `td-test` như ở Task 6, và `?tdToday=` để chuyển ngày: 19/10 (tuần 1), 26/10 (tuần 2), 16/11 (tuần 5), 14/12 (tuần 9), 21/12 (tuần 10), 05/01/2027 (tuần 12), 12/01/2027 (tuần 13). Kỳ vọng mỗi ngày hiện đúng các thẻ trong bảng ở Task 2, và mỗi file trong `td-test` đúng mẫu spec §7.
- [ ] **Step 3:** Kiểm luồng dự phòng:
  1. Chạy `window.showDirectoryPicker = undefined; window.tdDownload = function(n, t){ window.__dl = [n, t]; };` rồi render lại.
  2. Bấm Lưu. Kỳ vọng `window.__dl[0] === "2026-10-19.json"`, `tdParseDayDoc(window.__dl[1])` khác null, và trạng thái là `"đã tải file về máy"`.
  3. Gọi `tdImport([new File([window.__dl[1]], "2026-10-19 (1).json")])`. Kỳ vọng kết quả là `{ok: 1, bad: 0}` và dữ liệu ngày 19/10 khớp.
- [ ] **Step 4:** Tắt các server thử, đóng tab Chrome đã mở, và xoá OPFS `td-test` bằng `navigator.storage.getDirectory().then(r => r.removeEntry("td-test", {recursive:true}))`.
- [ ] **Step 5:** Báo lại cho anh, kèm việc duy nhất em không tự kiểm được: mở `roadmap-em.html` bằng `file://` trong Chrome, bấm Lưu một lần, chọn `D:\LEARNING\career-path\nhat-ky\`.
