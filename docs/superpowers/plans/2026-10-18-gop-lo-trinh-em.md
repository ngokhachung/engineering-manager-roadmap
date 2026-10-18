# Gộp lo-trinh-em.html vào roadmap-em.html — kế hoạch triển khai

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mang mọi nội dung chỉ `lo-trinh-em.html` có sang `roadmap-em.html`: mốc, bằng chứng, chỉ số, tiêu chí dừng, và "Sổ PMP viết lại". Đồng thời chuyển dữ liệu đã tick, giải quyết ba chỗ mâu thuẫn trong tab Luyện tư duy, rồi xoá file cũ.

**Architecture:** Nội dung chép nguyên văn nằm trong các mảng dữ liệu (`MS_DATA`, `MS_METRICS`, `MS_STOP`, `MS_PMP`) cùng các hàm thuần (`ms*`, `td*`). Tất cả đặt trong một khối mới `/* roadmap-core:start */ … /* roadmap-core:end */`, ngay sau khối `tuduy-core`. File test nạp cả hai khối. Phần giao diện chỉ đọc dữ liệu và hàm đó. Tiến độ mốc là `state.ms`, đi theo đúng mọi đường mà `state.s` đang đi.

**Tech Stack:** HTML/CSS/JS ES5 trong một file. Node 24 (`node:test`, `child_process`) để chạy test.

**Spec:** `docs/superpowers/specs/2026-10-18-gop-lo-trinh-em-design.md`

## Global Constraints

- `roadmap-em.html` tự chứa, không thư viện. JS trong trang viết ES5. Theme sáng/tối dùng token sẵn có. Bề rộng 360px không cuộn ngang.
- Câu chữ chép nguyên văn từ `lo-trinh-em.html`. Test so với bản trong git: `git show e07e5b6:lo-trinh-em.html`. Lý do dùng bản trong git là để test vẫn đúng sau khi xoá file.
- Khoá cũ `career-path-em-v1` có dạng `{checked:{}, dates:{}}`. Chỉ chuyển `m0-*`…`m3-*` và các ngày `M0`, `M1`, `M2`, `M3`, `PMP`. Không xoá khoá cũ.
- `state.ms = {checked:{}, dates:{}, from?:"lo-trinh-em"}`. Ngày lưu ở dạng `YYYY-MM-DD`. Xuất JSON dưới khoá `milestones`.
- Thông báo chuyển dữ liệu, đúng câu chữ: `"đã chuyển N mục từ lo-trinh-em"`.
- Cảnh báo T1, đúng câu chữ: `"Chưa có dự đoán nào về người khác — đó là loại dự đoán duy nhất luyện được năng lực dẫn dắt."`
- Route mới `#/moc/M0`…`#/moc/M3`: hiện tab Roadmap, mở khối Mốc tương ứng rồi cuộn tới đó.
- Không commit nếu anh chưa yêu cầu. Lệnh test: `node --test tests/tu-duy.test.js`.

## Review Focus

1. **Ngày cũ ghi lộn xộn** (`8/3/2027`, `08-03-2027`, rỗng, "khoảng tháng 3"): chỉ chuyển những ngày đọc được, phần còn lại đếm là bỏ qua, không được sập. Test ở Task 1.
2. **Chuyển dữ liệu chạy hai lần, hoặc roadmap đã có sẵn ô tick hay ngày**: không được ghi đè, và cờ `from` chặn lần chuyển thứ hai. Test ở Task 1 (lõi) và Task 2 (tải lại trang).
3. **Nhập `tien-do.json` cũ không có `milestones`, hoặc `milestones` sai hình dạng**: `state.ms` vẫn phải là object hợp lệ, giao diện không sập. Test ở Task 1 (`msNormalize`) và Task 2.
4. **Chưa có dữ liệu Luyện tư duy**: cột "Tuần trước" hiện `—` hoặc `0`, không được ra `NaN`; cảnh báo kiến tạo dưới 10% không bật. Test ở Task 4.
5. **Ngày 1–7 của tháng 1, 4, 7, 10**, khi khung T7 và khung xét cửa trùng nhau: hiện cả hai dòng nhắc, theo thứ tự tháng rồi quý. Test ở Task 6.

---

### Task 1: Dữ liệu mốc và các hàm thuần

**Files:**
- Modify: `roadmap-em.html`. Chèn khối `/* roadmap-core:start */ … /* roadmap-core:end */` ngay sau `/* tuduy-core:end */`.
- Modify: `tests/tu-duy.test.js`. Hàm `load()` chạy cả hai khối. Thêm `oldText()` trả về nội dung `git show e07e5b6:lo-trinh-em.html` đã bỏ thẻ HTML, giải mã `&amp; &lt; &gt; &quot; &nbsp;`, và gộp khoảng trắng. Thêm `norm(s)` để gộp khoảng trắng.

**Interfaces — Produces:**
- `MS_DATA: Milestone[]` gồm 4 phần tử, theo thứ tự M0, M1, M2, M3. Mỗi phần tử có dạng `{id, stage, months, title, lead, question, reached:string[3], weekly:string[], quarterly:string[], evidence:{id,t,n}[5], trap:string[], gate:{title,text}}`:
  - `stage` lần lượt là `"s0"`…`"s3"`.
  - `months` lần lượt là `"Tháng 0–3"`, `"Tháng 3–9"`, `"Tháng 9–18"`, `"Tháng 18–30"`.
  - `gate.title` là `"Cửa sang M1"`, `"Cửa sang M2"`, `"Cửa sang M3"`, và `"Sau M3"`.
  - `evidence[i].t` là dòng chính, `evidence[i].n` là dòng ghi chú in nghiêng.
- `MS_METRICS: string[5][]` gồm 14 dòng `[chỉ số, loại, nguồn, mốc, ngưỡng]`, cùng `MS_METRICS_NOTE: string`.
- `MS_STOP: {title, text, action}[3]` cho ba khối "Sau 6 tháng — 08/03/2027", "Sau 12 tháng ở M1" và "Bất cứ lúc nào". Kèm `MS_LOW_CREATIVE: string`, là câu "Nếu % kiến tạo dưới 10%…" nguyên văn.
- `MS_PMP: {intro, keep:[t, m][5], drop:[t, why][5], back:{title, text}}`.
- `msParseOldDate(s) -> "YYYY-MM-DD" | null`: nhận `d/m/yyyy` và `dd/mm/yyyy`; ngày không có thật thì trả về null.
- `msNormalize(x) -> {checked:{}, dates:{}, from?}`: chỉ giữ giá trị `checked` là `true`, và ngày có dạng `YYYY-MM-DD`.
- `msMigrate(old, ms) -> {ms, count, skipped}`: chỉ điền những khoá đang trống, rồi đặt `from: "lo-trinh-em"`.
- `msCurrent(dates) -> "M0"|"M1"|"M2"|"M3"|null`: mốc đầu tiên chưa có ngày.
- `msEvidence(ms, mid) -> {done, total}`.

- [ ] **Step 1: Viết test trước**

```js
const O = oldText();
const all = m => [m.lead, m.question, ...m.reached, ...m.weekly, ...m.quarterly, ...m.trap, m.gate.text,
  ...m.evidence.flatMap(e => [e.t, e.n])];
test("MS_DATA chép nguyên văn và giữ đúng id bằng chứng", () => {
  assert.deepEqual(td.MS_DATA.map(m => m.id), ["M0", "M1", "M2", "M3"]);
  assert.deepEqual(td.MS_DATA.flatMap(m => m.evidence.map(e => e.id)),
    ["m0-doc","m0-t2","m0-t4","m0-t7","m0-metrics","m1-11","m1-pre","m1-nego","m1-est","m1-learn",
     "m2-strategy","m2-review","m2-process","m2-hard","m2-hire","m3-away","m3-hire","m3-promo","m3-plan","m3-deputy"]);
  for (const m of td.MS_DATA) for (const s of all(m)) assert.ok(O.includes(norm(s)), m.id + ": " + s);
  assert.equal(td.MS_DATA[3].gate.title, "Sau M3");
});
test("bảng chỉ số, tiêu chí dừng và sổ PMP chép nguyên văn", () => {
  assert.equal(td.MS_METRICS.length, 14);
  for (const r of td.MS_METRICS) assert.ok(O.includes(norm(r.join(" "))), r[0]);
  for (const b of td.MS_STOP) for (const s of [b.title, b.text, b.action]) assert.ok(O.includes(norm(s)), s);
  assert.ok(O.includes(norm(td.MS_LOW_CREATIVE)));
  const p = td.MS_PMP;
  for (const s of [p.intro, p.back.title, p.back.text, ...p.keep.flat(), ...p.drop.flat()]) assert.ok(O.includes(norm(s)), s);
  assert.equal(p.keep.length, 5); assert.equal(p.drop.length, 5);
});
test("msParseOldDate", () => {
  assert.equal(td.msParseOldDate("08/03/2027"), "2027-03-08");
  assert.equal(td.msParseOldDate(" 8/3/2027 "), "2027-03-08");
  for (const bad of ["", "08-03-2027", "khoảng tháng 3", "31/02/2027", null]) assert.equal(td.msParseOldDate(bad), null);
});
test("msMigrate chỉ điền chỗ trống, bỏ ô 30 ngày đầu, đếm ngày hỏng", () => {
  const old = { checked: { "m0-doc": true, "m0-t2": false, "m1-11": true, "w1-t1": true, "p-pmp": true },
                dates: { M0: "01/10/2026", M1: "khoảng tháng 3", PMP: "08/09/2026" } };
  const r = td.msMigrate(old, { checked: { "m1-11": true }, dates: { M0: "2026-09-30" } });
  assert.deepEqual(r.ms.checked, { "m1-11": true, "m0-doc": true });
  assert.deepEqual(r.ms.dates, { M0: "2026-09-30", PMP: "2026-09-08" });
  assert.equal(r.count, 2); assert.equal(r.skipped, 1); assert.equal(r.ms.from, "lo-trinh-em");
});
test("msNormalize chịu được dữ liệu sai hình dạng", () => {
  assert.deepEqual(td.msNormalize(undefined), { checked: {}, dates: {} });
  assert.deepEqual(td.msNormalize({ checked: [], dates: "x" }), { checked: {}, dates: {} });
  assert.deepEqual(td.msNormalize({ checked: { a: true, b: 1 }, dates: { M0: "2026-10-01", M1: "1/10" }, from: "lo-trinh-em" }),
    { checked: { a: true }, dates: { M0: "2026-10-01" }, from: "lo-trinh-em" });
});
test("msCurrent và msEvidence", () => {
  assert.equal(td.msCurrent({}), "M0");
  assert.equal(td.msCurrent({ M0: "2026-10-01" }), "M1");
  assert.equal(td.msCurrent({ M0: "a", M1: "b", M2: "c", M3: "d" }), null);
  assert.deepEqual(td.msEvidence({ checked: { "m1-11": true, "m1-pre": true, "m0-doc": true } }, "M1"), { done: 2, total: 5 });
});
```

- [ ] **Step 2: Chạy và xác nhận test fail**

Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: các test mới FAIL; 56 test cũ vẫn PASS.

- [ ] **Step 3: Thêm khối `roadmap-core`**

Chép nội dung bằng một script đọc `lo-trinh-em.html` theo từng `<article class="station" data-stage="M…">` và các section bảng chỉ số, tiêu chí dừng, sổ PMP. Sửa tay chỗ nào script cắt sai. Test nguyên văn ở Step 1 là cổng kiểm.

- [ ] **Step 4: Chạy và xác nhận test pass**

Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: PASS toàn bộ.

---

### Task 2: `state.ms` — lưu, đồng bộ, xuất/nhập, xoá, chuyển dữ liệu

**Files:**
- Modify `roadmap-em.html`, ở những chỗ đang khởi tạo hoặc thay thế `state`:
  - khai báo (khoảng dòng 1837);
  - `save()` gửi lên `db.doc(DOC).set`;
  - `onSnapshot`;
  - `readLocal` khi tải trang (khoảng dòng 3845);
  - `buildExport`, `applyImport`;
  - nút `#reset`.

**Interfaces:**
- Consumes: `msNormalize`, `msMigrate` (Task 1).
- Produces: `state.ms` luôn hợp lệ, vì mọi chỗ ghi vào nó đều đi qua `msNormalize`. Ngoài ra:
  - `buildExport().milestones` và `summary.milestonesReached`, là số mốc đã có ngày;
  - `applyImport` đọc `d.milestones`;
  - hàm `msAutoMigrate() -> number`, chạy một lần sau khi nạp `readLocal`.

- [ ] **Step 1: Chạy test hiện có.** Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: PASS. Test "toàn bộ inline script parse được" dùng làm cổng kiểm cú pháp.
- [ ] **Step 2: Viết phần sửa**
  - Mọi object `state` mới đều có `ms: msNormalize(...)`.
  - `msAutoMigrate`:
    - Đọc `localStorage["career-path-em-v1"]` trong `try`.
    - Bỏ qua nếu `state.ms.from` đã có.
    - Gọi `msMigrate`.
    - Có `count > 0` thì `save()` và `status("đã chuyển "+count+" mục từ lo-trinh-em")`.
    - Không có gì để chuyển thì vẫn đặt `from`, để lần sau không đọc lại.
- [ ] **Step 3: Kiểm trên Chrome** (dùng server UTF-8 ở `scratchpad/serve_utf8.py`, origin `127.0.0.1:8765`; trước khi kiểm sao lưu rồi khôi phục `roadmap-em-v1`):
  1. Mồi `career-path-em-v1 = {"checked":{"m0-doc":true,"w1-t1":true},"dates":{"M0":"01/10/2026","PMP":"08/09/2026"}}` rồi tải trang. Kỳ vọng `state.ms` là `{checked:{"m0-doc":true}, dates:{M0:"2026-10-01", PMP:"2026-09-08"}, from:"lo-trinh-em"}`, và trạng thái là `"đã chuyển 3 mục từ lo-trinh-em"`.
  2. Tải lại trang. Kỳ vọng không có thông báo lần hai, `state.ms` giữ nguyên.
  3. Gọi `buildExport().milestones`. Kỳ vọng dữ liệu đúng như trên. Gọi `applyImport` với một JSON không có `milestones`. Kỳ vọng `state.ms` là `{checked:{}, dates:{}}` và trang không lỗi.
  4. Bấm `#reset`. Kỳ vọng `state.ms.checked` rỗng.

---

### Task 3: Khối Mốc trên tab Roadmap, dòng giai đoạn trên Dashboard, route `#/moc/M*`

**Files:**
- Modify `roadmap-em.html`:
  - `buildTrack` (phần `stage-head`, khoảng dòng 2374);
  - `renderDash`, phần `stage-rows`;
  - `route()`;
  - bộ xử lý `click` và `change` chung;
  - thêm CSS trong khối `/* ================= roadmap track ================= */`.

**Interfaces:**
- Consumes: `MS_DATA`, `msCurrent`, `msEvidence`, `state.ms`.
- Produces: `msPanelHtml(m) -> string`, `msOpen(mid)`. Ô tick dùng `data-ms-check="<id>"`, ô ngày dùng `data-ms-date="<M>"` với `type="date"`.

Hành vi:
- Nhãn giai đoạn hiển thị `st.st+" · "+m.months`.
- Sau `.stage-head`, thêm `<details class="ms" data-ms="M0" [open nếu là msCurrent]>`.
  - `<summary>` có dạng `"Mốc M0 · Tháng 0–3 · Senior Dev có ảnh hưởng"`, kèm `x/5` bằng chứng và ngày đạt mốc nếu có.
  - Nội dung bên trong, theo thứ tự: `lead`, `question`, "Đã tới khi", "Đo hằng tuần", "Đo hằng quý", "Bằng chứng cần thu" (ô tick kèm dòng `n` in nghiêng), "Bẫy của mốc này", `gate`, ô "Đạt mốc ngày".
- Tick ô hay đổi ngày thì cập nhật `state.ms`, gọi `save()`, rồi render lại `summary` và Dashboard nếu đang hiện.
- Dashboard `stage-rows`: cột tên giai đoạn thêm `"· bằng chứng x/5"`, và `"· đạt dd/mm/yyyy"` khi có ngày.
- Route `#/moc/M1`: hiện `view-map`, gọi `msOpen("M1")` để mở khối Mốc đó và `scrollIntoView`.

- [ ] **Step 1: Chạy test hiện có.** Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: PASS.
- [ ] **Step 2: Viết phần giao diện như mô tả ở trên**
- [ ] **Step 3: Kiểm trên Chrome**
  - Có 4 khối `details.ms`. Khi `state.ms.dates = {M0:"2026-10-01"}` thì chỉ M1 mở sẵn.
  - Tick `m1-11` thì `summary` M1 hiện `1/5`, `state.ms.checked["m1-11"] === true`, và `JSON.parse(localStorage["roadmap-em-v1"]).ms` có ô đó.
  - `#/moc/M2` mở khối M2.
  - Ở bề rộng 360px (đo trong iframe) với theme tối, không phần tử nào tràn ngang.

---

### Task 4: Dashboard — bảng chỉ số, cột "Tuần trước", tiêu chí dừng

**Files:**
- Modify `roadmap-em.html`:
  - khối `roadmap-core`;
  - HTML của `view-dash`: thêm hai `section.d-sec` có id `ms-metrics` và `ms-stop`, đặt sau mục "Tiến độ theo giai đoạn";
  - `renderDash`.
- Test: `tests/tu-duy.test.js`.

**Interfaces:**
- Consumes: `tdWeekStats`, `tdGradesUntil`, `tdT7Table`, `tdT7Month`, `tdMonday`, `tdAddDays` (khối `tuduy-core`); `tdDaysView`, `tdNow` (khối tab).
- Produces:
  - `msLastWeek(days, today) -> {graded:int, the4:int, nod2B:int, creativeAvg:int|null, fit:{hit,n}|null}`:
    - Tính trên tuần trước, tức 7 ngày bắt đầu từ `tdAddDays(tdMonday(today), -7)`.
    - `graded` là số điểm `dung`/`sai` được ghi vào các ngày thuộc tuần đó.
    - `fit` là nhóm 60–80 trong `tdT7Table` của tháng trước `today`.
  - `msLowCreative(days, today) -> bool`: true khi cả 4 tuần trọn vẹn trước tuần của `today` đều có ít nhất một mục Thẻ 6 và có `creativeAvg < 10`.

Hiển thị:
- Bảng `MS_METRICS` gồm 5 cột gốc, cộng cột "Tuần trước". Chỉ 5 dòng có số liệu tương ứng: "Dự đoán đã chấm mỗi tuần", "Tick “tôi làm vì nhanh hơn”", "% thời gian kiến tạo", "Tick “gật đầu deadline phi lý”", "Độ khớp hiệu chỉnh nhóm 70%" (hiện dạng `hit/n`). Các dòng khác hiện `—`. Giá trị null cũng hiện `—`.
- `MS_STOP` hiện 3 khối. Khi `msLowCreative` là true, hiện thêm `MS_LOW_CREATIVE` với class `td-warn`.

- [ ] **Step 1: Viết test trước**

```js
test("msLastWeek tính tuần trước, không có dữ liệu thì null/0", () => {
  assert.deepEqual(td.msLastWeek({}, "2026-11-04"), { graded: 0, the4: 0, nod2B: 0, creativeAvg: null, fit: null });
  const days = {
    "2026-10-26": day("2026-10-26", { the4: { count: 2 }, the6: { creativePct: 30 }, review: { grades: { a: "dung", b: "chua" } } }),
    "2026-10-28": day("2026-10-28", { the2: [{ type: "2B", nodded: "x" }], the6: { creativePct: 10 } }),
    "2026-11-02": day("2026-11-02", { the4: { count: 5 } }),
  };
  const r = td.msLastWeek(days, "2026-11-04");
  assert.deepEqual([r.graded, r.the4, r.nod2B, r.creativeAvg], [1, 2, 1, 20]);
});
test("msLowCreative cần đủ 4 tuần trọn, mỗi tuần dưới 10%", () => {
  const days = {};
  ["2026-10-05", "2026-10-12", "2026-10-19", "2026-10-26"].forEach(d => { days[d] = day(d, { the6: { creativePct: 5 } }); });
  assert.equal(td.msLowCreative(days, "2026-11-04"), true);
  delete days["2026-10-12"];
  assert.equal(td.msLowCreative(days, "2026-11-04"), false);
  assert.equal(td.msLowCreative({}, "2026-11-04"), false);
});
```

- [ ] **Step 2: Chạy và xác nhận test fail.** Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: 2 test mới FAIL.
- [ ] **Step 3: Viết `msLastWeek` và `msLowCreative` trong `roadmap-core`, rồi viết phần hiển thị**
- [ ] **Step 4: Chạy và xác nhận test pass.** Chạy `node --test tests/tu-duy.test.js`. Kỳ vọng: PASS. Sau đó kiểm trên Chrome: mồi dữ liệu tab cho tuần trước, rồi xem cột "Tuần trước" hiện đúng số.

---

### Task 5: Tab PMP đóng băng

**Files:**
- Modify `roadmap-em.html`:
  - HTML `view-pmp`: đoạn `intro`, thêm `section#pm-freeze` lên đầu `.dash`, bọc mục "Lộ trình 30 ngày" trong `<details class="pm-frozen">` đóng sẵn, và đổi tiêu đề thành `"Lộ trình 30 ngày — đóng băng"`;
  - `renderPmp`.

**Interfaces:**
- Consumes: `MS_PMP`, `state.ms.dates.PMP`.
- Produces: ô `data-ms-date="PMP"`, dùng chung bộ xử lý `change` với Task 3.

Hành vi:
- `#pm-freeze` có tiêu đề "Trạng thái: đóng băng", tiếp theo là `MS_PMP.intro`, hai danh sách "Giữ — dùng thật" và "Bỏ — không dùng tới", khối `MS_PMP.back`, và ô "Ghi lại quyết định hoãn" kiểu `type="date"`.
- Câu đầu của đoạn `intro` đổi thành "Không còn trên đường chính tới Engineering Manager — chỉ giữ phần dùng thật (xem Trạng thái bên dưới)." Phần sau của đoạn giữ nguyên.

- [ ] **Step 1: Chạy test hiện có.** Kỳ vọng: PASS.
- [ ] **Step 2: Viết phần sửa như mô tả ở trên**
- [ ] **Step 3: Kiểm trên Chrome.** `#/pmp` hiện khối đóng băng, có 5 dòng giữ và 5 dòng bỏ. `details.pm-frozen` đóng sẵn; mở ra tick một ngày thì `state.pmp` đổi như cũ. Ô ngày hoãn ghi vào `state.ms.dates.PMP`.

---

### Task 6: Tab Luyện tư duy — Thẻ 4 từ tuần 1, nhãn về người / kỹ thuật, T7 tách bảng, dòng nhắc mốc

**Files:**
- Modify `roadmap-em.html`:
  - khối `tuduy-core`: `TD_CARDS.the4.from`, `tdPredictions`, `tdT7Table`, `tdValidateT1`, thêm ô `about` vào T2, thêm `tdReminders`;
  - khối tab: `TD_RENDER.t1`, `TD_RENDER.t7`, `tdAfterRender` (mục Đến hạn).
- Test: `tests/tu-duy.test.js`. Sửa các test cũ bị ảnh hưởng:
  - "tuần 1 thứ Hai" đổi `toi` thành `["the2","the4"]`;
  - "dự đoán từ mục 9 của T2" thêm `about: "kythuat"` vào object kỳ vọng;
  - các test `tdValidateT1` thêm `about: "nguoi"` vào hàm trợ giúp `P`.

**Interfaces — Produces:**
- `tdPredictions` trả thêm `about`. T1 lấy từ `p.about`, không có thì `null`. T2 lấy từ `t.about`, không có thì `"kythuat"`.
- `tdT7Table(days, month, about?)`: khi có `about` thì chỉ tính các dự đoán có `about` trùng.
- `tdValidateT1`: khi có ít nhất 1 dự đoán mà không cái nào `about === "nguoi"`, thêm `{i:-1, level:"warn", msg:<câu ở Global Constraints>}`.
- Trường mới của T2: `tdF("about","choice","Dự đoán này về",[["nguoi","Về người"],["kythuat","Về kỹ thuật"]])`, đặt ngay trước `predMonths`.
- `tdReminders(date, cur, ev) -> {kind, label, ref}[]`:
  - **Tháng:** khi `tdT7Month(date) != null` và `cur` khác null, trả về `{kind:"ms-month", label:"Rà bằng chứng của mốc "+cur+" ("+ev.done+"/"+ev.total+")", ref:cur}`.
  - **Quý:** khi tháng thuộc {1, 4, 7, 10} và là ngày 1–7, trả về `{kind:"ms-quarter", label:"Xét cửa lên mốc + tiêu chí dừng · đọc lại T2 đầu tiên cạnh cái mới nhất"+(cur==="M2"||cur==="M3" ? " · strategy note" : ""), ref:cur||"M3"}`.
  - Thứ tự: tháng trước, quý sau.

Giao diện:
- T1: mỗi hàng có hai nút "Về người" và "Về kỹ thuật" (`data-td-set="t1.predictions.<i>.about"`). Cảnh báo dòng `i:-1` hiện màu cam, khác với lỗi `block` hiện đỏ.
- T7: bảng chung giữ nguyên. Khi có dự đoán đã gắn nhãn thì thêm hai bảng "Về người" và "Về kỹ thuật".
- Mục "Đến hạn hôm nay": thêm các dòng từ `tdReminders(date, msCurrent(state.ms.dates), msEvidence(state.ms, cur))`, nhãn nhóm là "Mốc". Bấm vào thì `location.hash = "#/moc/"+ref`.

- [ ] **Step 1: Viết test trước** (thêm mới, cùng với các test cũ đã sửa ở mục Files)

```js
test("Thẻ 4 có từ tuần 1", () => { assert.deepEqual(td.tdPlan("2026-10-19", "2026-10-19", {}).toi, ["the2", "the4"]); });
test("dự đoán mang nhãn about; T2 mặc định kỹ thuật", () => {
  const days = { "2026-10-19": day("2026-10-19", { t1: { predictions: [P("a#1", 70, "2026-10-23", { about: "nguoi" })] },
    t2: [{ decision: "D", predSign: "s", predProb: 60, predMonths: 1 }] }) };
  assert.deepEqual(td.tdPredictions(days).map(p => p.about), ["nguoi", "kythuat"]);
});
test("T7 tách theo about", () => {
  const days = {
    "2026-10-05": day("2026-10-05", { t1: { predictions: [P("a#1", 70, "2026-10-09", { about: "nguoi" }), P("a#2", 65, "2026-10-09", { about: "kythuat" })] } }),
    "2026-10-12": day("2026-10-12", { review: { grades: { "a#1": "dung", "a#2": "sai" } } }),
  };
  assert.equal(td.tdT7Table(days, "2026-10", "nguoi")[2].hit, 1);
  assert.equal(td.tdT7Table(days, "2026-10", "kythuat")[2].hit, 0);
  assert.equal(td.tdT7Table(days, "2026-10")[2].n, 2);
});
test("cảnh báo khi không có dự đoán nào về người", () => {
  const msg = "Chưa có dự đoán nào về người khác — đó là loại dự đoán duy nhất luyện được năng lực dẫn dắt.";
  assert.ok(td.tdValidateT1([P("x", 60, "2026-10-23", { about: "kythuat" })]).some(e => e.i === -1 && e.level === "warn" && e.msg === msg));
  assert.ok(!td.tdValidateT1([P("x", 60, "2026-10-23", { about: "nguoi" })]).some(e => e.msg === msg));
});
test("dòng nhắc mốc: tháng, quý, trùng nhau ngày 1–7 tháng 1", () => {
  assert.deepEqual(td.tdReminders("2026-10-31", "M1", { done: 3, total: 5 }).map(r => r.label), ["Rà bằng chứng của mốc M1 (3/5)"]);
  assert.deepEqual(td.tdReminders("2027-01-05", "M2", { done: 0, total: 5 }).map(r => r.kind), ["ms-month", "ms-quarter"]);
  assert.match(td.tdReminders("2027-01-05", "M2", { done: 0, total: 5 })[1].label, / · strategy note$/);
  assert.deepEqual(td.tdReminders("2026-11-15", "M1", { done: 0, total: 5 }), []);
  assert.deepEqual(td.tdReminders("2026-10-31", null, null), []);
});
```

- [ ] **Step 2: Chạy và xác nhận test fail.** Kỳ vọng: các test mới và các test cũ đã sửa đều FAIL.
- [ ] **Step 3: Viết phần lõi và phần giao diện như mô tả ở trên**
- [ ] **Step 4: Chạy và xác nhận test pass.** Kỳ vọng: PASS. Sau đó kiểm trên Chrome:
  - Tuần 1, buổi tối có Thẻ 4.
  - T1 có nút nhãn; chỉ chọn "Về kỹ thuật" thì hiện cảnh báo màu cam, nút Lưu vẫn bật.
  - Ngày 31/10, mục Đến hạn có dòng "Rà bằng chứng của mốc …". Bấm vào thì sang `#/moc/…` và khối Mốc đó mở ra.

---

### Task 7: Xoá file cũ, cập nhật tài liệu, kiểm toàn bộ

**Files:**
- Delete: `lo-trinh-em.html`.
- Modify `.gitignore`: bỏ dòng `!lo-trinh-em.html`.
- Modify `README.md`:
  - bỏ dòng về `lo-trinh-em.html` ở mục "Các file khác";
  - mô tả tab Roadmap thêm phần mốc M0–M3;
  - mô tả tab Dashboard thêm bảng chỉ số và tiêu chí dừng;
  - mô tả tab PMP ghi "đóng băng, chỉ giữ phần dùng thật";
  - cấu trúc `tien-do.json` thêm `"milestones": { "checked": {…}, "dates": {…} }`.

- [ ] **Step 1: Đọc nguyên văn.** Chạy `node --test tests/tu-duy.test.js`. Các test nguyên văn của Task 1 đọc bản trong git (`e07e5b6`), nên vẫn chạy được sau khi xoá file. Kỳ vọng: PASS.
- [ ] **Step 2: Xoá file, sửa `.gitignore` và README.** Chạy `git status --short`. Kỳ vọng thấy `D lo-trinh-em.html`, `M .gitignore`, `M README.md`, `M roadmap-em.html`, `M tests/tu-duy.test.js`, cùng spec và plan mới trong `docs/`.
- [ ] **Step 3: Chạy lại các kiểm tra trình duyệt của Task 2–6 trên bản cuối.** Thêm hai việc: kiểm console không có lỗi; kiểm bề rộng 360px với theme tối ở các tab Roadmap, Dashboard và PMP.
- [ ] **Step 4: Dọn dẹp.** Khôi phục `roadmap-em-v1` đã sao lưu và xoá khoá mồi `career-path-em-v1` trên origin thử. Tắt server và đóng tab.
