// Test cho tab "Luyện tư duy" trong roadmap-em.html.
// Chạy: node --test tests/
process.env.TZ = "Asia/Ho_Chi_Minh";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = p => path.join(__dirname, "..", p);
const html = fs.readFileSync(root("roadmap-em.html"), "utf8");
const inlineScript = html.slice(html.indexOf("<script>") + "<script>".length, html.lastIndexOf("</script>"));

// Chạy khối core cùng realm với file test, để deepStrictEqual so được object.
function load() {
  const m = html.match(/\/\* tuduy-core:start \*\/([\s\S]*?)\/\* tuduy-core:end \*\//);
  if (!m) throw new Error("không tìm thấy khối tuduy-core trong roadmap-em.html");
  vm.runInThisContext(m[1], { filename: "tuduy-core" });
  return globalThis;
}

let td;
try { td = load(); } catch (e) { td = {}; test("nạp khối tuduy-core", () => { throw e; }); }

const day = (date, entries) => ({ date, entries });
const P = (id, prob, due, extra = {}) => ({ id, text: "x", prob, due, basis: "", wrongIf: "y", ...extra });

/* ---------------- Task 1: ngày tháng ---------------- */
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

/* ---------------- Task 2: danh mục thẻ và kế hoạch ngày ---------------- */
const S = "2026-10-19";
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

/* ---------------- Task 3: dự đoán, rà soát, T7, kiểm tra T1 ---------------- */
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
test("dự đoán đã chấm trong chính ngày rà soát vẫn hiện, kèm điểm đó", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 70, "2026-10-23")] } }),
    "2026-10-26": day("2026-10-26", { review: { grades: { "2026-10-19#1": "dung" } } }),
  };
  assert.equal(td.tdReviewList(days, "2026-10-26")[0].grade, "dung");
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
  assert.ok(td.tdValidateT1([P("x", 60, "")]).some(e => e.msg === "Thiếu hạn chót."));
  assert.ok(td.tdValidateT1([P("x", 60, "2026-10-23", { text: "" })]).some(e => e.msg === "Mệnh đề trống."));
  assert.ok(td.tdValidateT1([1, 2, 3, 4].map(i => P("x" + i, 60, "2026-10-23"))).some(e => e.msg === "Tối đa 3 dự đoán."));
  const w = td.tdValidateT1([P("x", 60, "2026-10-23", { wrongIf: "" })]);
  assert.deepEqual(w, [{ i: 0, level: "warn", msg: "Dòng “điều gì sẽ khiến tôi sai” là dòng quan trọng nhất." }]);
});

/* ---------------- Task 4: tín hiệu, đến hạn, số liệu ---------------- */
const keys = (days, date) => td.tdSignals(days, date).map(s => s.key);
test("s2d: ba cuộc 2D liên tiếp bỏ qua thì có; lần gần nhất có nói thì không", () => {
  const m = v => ({ type: "2D", oneThing: v });
  const days = { "2026-10-20": day("2026-10-20", { the2: [m("khong"), m("khong")] }), "2026-10-22": day("2026-10-22", { the2: [m("khong")] }) };
  assert.deepEqual(keys(days, "2026-10-22"), ["s2d"]);
  assert.equal(td.tdSignals(days, "2026-10-22")[0].text, "Từ 3 lần trở lên bỏ qua “một điều nên làm khác đi” trong 1-1 → đây không phải vấn đề thời gian, mà là né tránh.");
  days["2026-10-23"] = day("2026-10-23", { the2: [m("co")] });
  assert.deepEqual(td.tdSignals(days, "2026-10-23"), []);
});
test("s2d: chỉ hai lần thì chưa có", () => {
  const days = { "2026-10-20": day("2026-10-20", { the2: [{ type: "2D", oneThing: "khong" }, { type: "2D", oneThing: "khong" }] }) };
  assert.deepEqual(keys(days, "2026-10-20"), []);
});
test("s6mind: năm ngày Thẻ 6 không đổi ý thì có, bốn ngày thì không", () => {
  const days = {};
  ["20", "21", "22", "23"].forEach(d => { days["2026-10-" + d] = day("2026-10-" + d, { the6: { creativePct: 30, changedMind: "" } }); });
  assert.deepEqual(keys(days, "2026-10-24"), []);
  days["2026-10-24"] = day("2026-10-24", { the6: { creativePct: 30 } });
  assert.deepEqual(keys(days, "2026-10-24"), ["s6mind"]);
  assert.equal(td.tdSignals(days, "2026-10-24")[0].text, "Không đổi ý về điều gì trong 5 ngày liên tiếp → tôi đang không cân nhắc thật.");
});
test("s5pred: ba sự cố liên tiếp (Thẻ 5 và T4 gộp) đều có thể dự đoán", () => {
  const days = {
    "2026-10-20": day("2026-10-20", { the5: [{ couldPredict: "co" }] }),
    "2026-10-21": day("2026-10-21", { t4: [{ couldPredict: "co" }] }),
  };
  assert.deepEqual(keys(days, "2026-10-21"), []);
  days["2026-10-22"] = day("2026-10-22", { the5: [{ couldPredict: "co" }] });
  assert.deepEqual(keys(days, "2026-10-22"), ["s5pred"]);
  assert.equal(td.tdSignals(days, "2026-10-22")[0].text, "3 sự cố liên tiếp trả lời “Có, tôi đã có thể dự đoán” → vấn đề không phải kiến thức, mà là không dừng lại để nghĩ.");
  days["2026-10-23"] = day("2026-10-23", { t4: [{ couldPredict: "khong" }] });
  assert.deepEqual(keys(days, "2026-10-23"), []);
});
test("s2a: ba cuộc 2A liên tiếp không ra quyết định", () => {
  const m = v => ({ type: "2A", decided: v });
  const days = { "2026-10-20": day("2026-10-20", { the2: [m("khong"), m("khong")] }) };
  assert.deepEqual(keys(days, "2026-10-20"), []);
  days["2026-10-21"] = day("2026-10-21", { the2: [m("khong")] });
  assert.deepEqual(keys(days, "2026-10-21"), ["s2a"]);
  assert.equal(td.tdSignals(days, "2026-10-21")[0].text, "3 cuộc họp liên tiếp không ra quyết định → tôi đang họp sai cách.");
});
test("s6pct: kiến tạo dưới 20% ba ngày liên tiếp", () => {
  const days = {
    "2026-10-20": day("2026-10-20", { the6: { creativePct: 10, changedMind: "x" } }),
    "2026-10-21": day("2026-10-21", { the6: { creativePct: 15, changedMind: "x" } }),
  };
  assert.deepEqual(keys(days, "2026-10-21"), []);
  days["2026-10-22"] = day("2026-10-22", { the6: { creativePct: 5, changedMind: "x" } });
  assert.deepEqual(keys(days, "2026-10-22"), ["s6pct"]);
  assert.equal(td.tdSignals(days, "2026-10-22")[0].text, "Kiến tạo dưới 20% ba ngày liên tiếp → thứ Sáu phải xem lại lịch.");
  days["2026-10-23"] = day("2026-10-23", { the6: { creativePct: 25, changedMind: "x" } });
  assert.deepEqual(keys(days, "2026-10-23"), []);
});
test("s5mind: ba tuần rà soát liên tiếp không đổi ý", () => {
  const days = {
    "2026-10-26": day("2026-10-26", { review: { changedMind: "" } }),
    "2026-11-02": day("2026-11-02", { review: {} }),
  };
  assert.deepEqual(keys(days, "2026-11-02"), []);
  days["2026-11-09"] = day("2026-11-09", { review: { changedMind: " " } });
  assert.deepEqual(keys(days, "2026-11-09"), ["s5mind"]);
  assert.equal(td.tdSignals(days, "2026-11-09")[0].text, "3 tuần liên tiếp không đổi ý về điều gì → tôi đang không thực sự cân nhắc phương án khác, chỉ đang tìm lý do cho phương án đã chọn.");
});
test("tín hiệu không đọc dữ liệu sau ngày đang xem", () => {
  const m = { type: "2D", oneThing: "khong" };
  const days = { "2026-10-20": day("2026-10-20", { the2: [m, m] }), "2026-10-25": day("2026-10-25", { the2: [m] }) };
  assert.deepEqual(keys(days, "2026-10-21"), []);
});
test("đến hạn hôm nay", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 60, "2026-10-21")] },
      the10: [{ person: "A", due: "2026-10-20", done: false }, { person: "B", due: "2026-10-20", done: true }],
      the9: [{ task: "review PR", checkDate: "2026-10-21" }] }),
    "2026-10-20": day("2026-10-20", { the6: { pending: "nói với C", pendingDue: "2026-10-21" } }),
  };
  assert.deepEqual(td.tdDueToday(days, "2026-10-21").map(x => x.kind), ["pred", "sbi", "deleg", "pending"]);
});
test("dự đoán đã chấm thì không còn trong đến hạn", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { t1: { predictions: [P("2026-10-19#1", 60, "2026-10-21")] } }),
    "2026-10-21": day("2026-10-21", { review: { grades: { "2026-10-19#1": "dung" } } }),
  };
  assert.deepEqual(td.tdDueToday(days, "2026-10-21"), []);
});
test("số liệu tuần cho buổi rà soát", () => {
  const days = {
    "2026-10-19": day("2026-10-19", { the4: { count: 2, items: [] }, the2: [{ type: "2B", nodded: "nhận deadline 3 ngày" }], the6: { creativePct: 30 } }),
    "2026-10-21": day("2026-10-21", { the4: { count: 1, items: [] }, the6: { creativePct: 15 } }),
    "2026-10-26": day("2026-10-26", { the4: { count: 9, items: [] } }),
  };
  assert.deepEqual(td.tdWeekStats(days, "2026-10-19"), { the4: 3, nod2B: 1, creativeAvg: 23 });
  assert.deepEqual(td.tdWeekStats({}, "2026-10-19"), { the4: 0, nod2B: 0, creativeAvg: null });
});
test("số liệu T8", () => {
  const days = { "2026-12-21": day("2026-12-21", { t8: { blocks: [{ pk: "P" }, { pk: "P" }, { pk: "K" }, { pk: "" }] } }) };
  assert.deepEqual(td.tdT8Stats(days, "2026-12-22"), { blocks: 3, p: 2, k: 1, pPct: 67, kPct: 33 });
});

/* ---------------- Task 5: file ngày, đọc/ghi thư mục ---------------- */
// Mô phỏng FileSystemDirectoryHandle: values() là async iterator, getFileHandle() cho handle ghi được.
function fakeDir(files, opts = {}) {
  return {
    values() {
      const names = Object.keys(files);
      let i = 0;
      return {
        next() {
          if (i >= names.length) return Promise.resolve({ done: true, value: undefined });
          const name = names[i++];
          const kind = name.endsWith("/") ? "directory" : "file";
          return Promise.resolve({ done: false, value: { kind, name, getFile: () => Promise.resolve({ text: () => Promise.resolve(files[name]) }) } });
        },
      };
    },
    getFileHandle(name) {
      return Promise.resolve({
        createWritable() {
          if (opts.failWrite) return Promise.reject(new Error("NotFoundError"));
          let buf = "";
          return Promise.resolve({ write(t) { buf += t; return Promise.resolve(); }, close() { files[name] = buf; return Promise.resolve(); } });
        },
      });
    },
  };
}
test("nhận diện tên file", () => {
  assert.equal(td.tdFileName("2026-10-19"), "2026-10-19.json");
  assert.equal(td.tdIsDayFile("2026-10-19.json"), true);
  assert.equal(td.tdIsDayFile("2026-10-19 (1).json"), false);
  assert.equal(td.tdIsDayFile("notes.json"), false);
});
test("parse file hỏng hoặc sai schema", () => {
  assert.equal(td.tdParseDayDoc("{oops"), null);
  assert.equal(td.tdParseDayDoc(JSON.stringify({ schema: "khac", version: 1, date: "2026-10-19", entries: {} })), null);
  assert.equal(td.tdParseDayDoc(JSON.stringify({ schema: "career-path-tu-duy-ngay", version: 2, date: "2026-10-19", entries: {} })), null);
  assert.equal(td.tdParseDayDoc(JSON.stringify({ schema: "career-path-tu-duy-ngay", version: 1, date: "19/10", entries: {} })), null);
  assert.equal(td.tdParseDayDoc(JSON.stringify({ schema: "career-path-tu-duy-ngay", version: 1, date: "2026-10-19", entries: [] })), null);
  assert.equal(td.tdParseDayDoc("null"), null);
  const ok = td.tdDayDoc("2026-10-19", { t1: { predictions: [] } }, "2026-10-19T00:00:00.000Z");
  assert.deepEqual(ok, { schema: "career-path-tu-duy-ngay", version: 1, date: "2026-10-19", savedAt: "2026-10-19T00:00:00.000Z", entries: { t1: { predictions: [] } } });
  assert.deepEqual(td.tdParseDayDoc(JSON.stringify(ok)), ok);
});
test("tdPrune", () => {
  assert.deepEqual(td.tdPrune({ the1: { a: "", b: false }, the4: { count: 0, items: [] }, the6: { creativePct: 0 }, the2: [] }), { the6: { creativePct: 0 } });
  assert.deepEqual(td.tdPrune({ the5: [{ incident: "", couldPredict: null }, { incident: "DB sập" }] }), { the5: [{ incident: "DB sập" }] });
  assert.deepEqual(td.tdPrune({ the4: { count: 2, items: [] } }), { the4: { count: 2 } });
});
test("tdMergeDays: file thắng bản sao cùng ngày, ngày khác giữ nguyên", () => {
  const a = td.tdDayDoc("2026-10-19", { the1: { x: "cũ" } }, "1"), b = td.tdDayDoc("2026-10-20", {}, "1");
  const a2 = td.tdDayDoc("2026-10-19", { the1: { x: "mới" } }, "0");
  const m = td.tdMergeDays({ "2026-10-19": a, "2026-10-20": b }, [a2]);
  assert.equal(m["2026-10-19"].entries.the1.x, "mới"); assert.equal(m["2026-10-20"], b);
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
  const r = await td.tdReadDir(fakeDir({ "2026-10-19.json": good, "2026-10-20.json": "{oops", "2026-10-19 (1).json": good, "readme.txt": "hi", "con/": "" }));
  assert.equal(r.docs.length, 1); assert.equal(r.docs[0].date, "2026-10-19"); assert.deepEqual(r.bad, ["2026-10-20.json"]);
});
test("đọc thư mục rỗng", async () => {
  assert.deepEqual(await td.tdReadDir(fakeDir({})), { docs: [], bad: [] });
});

/* ---------------- Task 8: thẻ mới trong md, link từ roadmap ---------------- */
function loadData() {
  const a = html.indexOf("var DATA = ["), b = html.indexOf("var AXIS =");
  const src = html.slice(a + "var DATA = ".length, b);           // sau "];" còn một dòng comment
  return vm.runInNewContext("(" + src.slice(0, src.lastIndexOf("]") + 1) + ")");
}
test("roadmap trỏ tới thẻ mới", () => {
  const nodes = loadData().flatMap(s => s.groups).flatMap(g => g.nodes);
  const res = id => JSON.stringify(nodes.find(n => n.id === id).res || []);
  for (const id of ["state", "safety", "underperform", "say-no"]) assert.match(res(id), /Thẻ 8 —.*tu-duy-leader\/04_the-ghi-nho\.md/);
  for (const id of ["delegate-decision", "delegation-levels", "stretch"]) assert.match(res(id), /Thẻ 9 —.*tu-duy-leader\/04_the-ghi-nho\.md/);
  for (const id of ["sbi", "feedback-48h"]) assert.match(res(id), /Thẻ 10 —.*tu-duy-leader\/04_the-ghi-nho\.md/);
});
test("file md có Thẻ 8–10, đặt trước mục Thẻ gốc", () => {
  const a = fs.readFileSync(root("tu-duy-leader/04_the-ghi-nho.md"), "utf8");
  const pos = ["## THẺ 7", "## THẺ 8", "## THẺ 9", "## THẺ 10", "## Thẻ gốc"].map(h => a.indexOf(h));
  assert.ok(pos.every(p => p >= 0), "thiếu tiêu đề: " + pos);
  assert.deepEqual([...pos].sort((x, y) => x - y), pos);
  assert.ok(a.includes("6 Bạn quyết, tôi hỏi lại sau"));
});

/* ---------------- Final review: lượt sửa ---------------- */
test("F1: hàng T1 trống và cuộc họp trống bị bỏ trước khi lưu", () => {
  const e = td.tdCleanForSave({
    t1: { predictions: [P("2026-10-19#1", 60, "2026-10-23"), { id: "2026-10-19#2" }, { id: "2026-10-19#3", text: " " }] },
    the2: [{ type: "2D" }, { type: "2C", title: "standup" }, { type: "2A", decided: "khong" }],
  });
  assert.deepEqual(e.t1.predictions.map(p => p.id), ["2026-10-19#1"]);
  assert.deepEqual(e.the2.map(m => m.type), ["2C", "2A"]);
});
test("F1: dự đoán không có mệnh đề lẫn hạn chót không vào rà soát", () => {
  const days = { "2026-10-19": day("2026-10-19", { t1: { predictions: [{ id: "2026-10-19#2" }] } }) };
  assert.deepEqual(td.tdReviewList(days, "2026-10-26"), []);
});
test("F2: file đúng schema nhưng sai hình dạng bị từ chối", () => {
  const doc = entries => JSON.stringify({ schema: "career-path-tu-duy-ngay", version: 1, date: "2026-10-19", savedAt: "x", entries });
  for (const bad of [{ the2: {} }, { t1: { predictions: "x" } }, { the10: "a" }, { t2: { a: 1 } }, { the6: [] }, { review: { grades: [] } }, { t8: { blocks: {} } }, { the4: { items: "x" } }, { the3: [null] }])
    assert.equal(td.tdParseDayDoc(doc(bad)), null, JSON.stringify(bad));
  assert.notEqual(td.tdParseDayDoc(doc({ the2: [{ type: "2D" }], t1: { predictions: [] }, the6: { creativePct: 10 }, ghi: 1 })), null);
});
test("F3: nạp nhiều bản cùng ngày thì bản savedAt mới nhất thắng, không đè bản mới hơn trong bộ nhớ", () => {
  const D = (date, s, x) => td.tdDayDoc(date, { the1: { x } }, s);
  const r = td.tdMergeImport({ "2026-10-20": D("2026-10-20", "2026-10-20T15:00:00Z", "tối") },
    [D("2026-10-19", "2026-10-19T14:00:00Z", "tối"), D("2026-10-19", "2026-10-19T01:00:00Z", "sáng"), D("2026-10-20", "2026-10-20T01:00:00Z", "sáng")]);
  assert.equal(r.days["2026-10-19"].entries.the1.x, "tối");
  assert.equal(r.days["2026-10-20"].entries.the1.x, "tối");
  assert.equal(r.older, 1);
});
test("F4: file trên đĩa mới hơn bản gốc của bản nháp thì là xung đột", () => {
  const disk = { savedAt: "2026-10-19T14:00:00Z" };
  assert.equal(td.tdConflict(disk, "2026-10-19T01:00:00Z"), true);
  assert.equal(td.tdConflict(disk, null), true);
  assert.equal(td.tdConflict(disk, "2026-10-19T14:00:00Z"), false);
  assert.equal(td.tdConflict(null, null), false);
});
test("F5: trang đang theo hôm nay thì sang ngày mới khi qua nửa đêm, trừ khi có bản nháp", () => {
  assert.equal(td.tdRollDate("2026-10-19", "2026-10-20", true, false), "2026-10-20");
  assert.equal(td.tdRollDate("2026-10-19", "2026-10-20", true, true), "2026-10-19");
  assert.equal(td.tdRollDate("2026-10-19", "2026-10-20", false, false), "2026-10-19");
});
test("F5: nhãn 'thường làm sáng thứ Hai' khi rà soát/T1 dời sang ngày khác", () => {
  assert.equal(td.tdCarried("2026-10-27"), true);
  assert.equal(td.tdCarried("2026-10-26"), false);
});

/* ---------------- link tới tu-duy-leader/ ---------------- */
test("không còn tham chiếu tới thư mục cũ 'tư duy leader/'", () => {
  assert.equal(html.includes("tư duy leader"), false);
});
test("mọi link file trỏ vào tu-duy-leader/ đều tồn tại", () => {
  const paths = [...new Set([...html.matchAll(/p:"(tu-duy-leader\/[^"]+)"/g)].map(m => m[1]))];
  assert.ok(paths.length >= 4, "quá ít link: " + paths.length);
  for (const p of paths) assert.ok(fs.existsSync(root(p)), "không có file: " + p);
});

module.exports = { root, load, inlineScript, day, P };
