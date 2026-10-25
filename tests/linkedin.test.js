// Test cho tab "LinkedIn" trong roadmap-em.html.
// Chạy: node --test "tests/*.test.js"
process.env.TZ = "Asia/Ho_Chi_Minh";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = p => path.join(__dirname, "..", p);
const html = fs.readFileSync(root("roadmap-em.html"), "utf8");
const inlineScript = html.slice(html.indexOf("<script>") + "<script>".length, html.lastIndexOf("</script>"));
// Spec chỉ nằm trên máy (không lên repo public): có thì so nguyên văn, không có thì bỏ qua các phép so đó.
const specPath = root("docs/superpowers/specs/2026-10-25-tab-linkedin-design.md");
const hasSpec = fs.existsSync(specPath);
const spec = hasSpec ? fs.readFileSync(specPath, "utf8") : "";
const S = spec.replace(/\*\*/g, "").replace(/\s+/g, " ");
const needSpec = { skip: hasSpec ? false : "spec chỉ có trên máy, không có trong repo public" };

// Chạy các khối core cùng realm với file test, để deepStrictEqual so được object.
function block(name) {
  const m = html.match(new RegExp("\\/\\* " + name + ":start \\*\\/([\\s\\S]*?)\\/\\* " + name + ":end \\*\\/"));
  if (!m) throw new Error("không tìm thấy khối " + name + " trong roadmap-em.html");
  return m[1];
}
function load() {
  for (const name of ["tuduy-core", "roadmap-core", "linkedin-core"]) vm.runInThisContext(block(name), { filename: name });
  const a = html.indexOf("var DATA = ["), b = html.indexOf("\n];", a);
  vm.runInThisContext(html.slice(a, b + 3), { filename: "DATA" });
  return globalThis;
}

let td;
try { td = load(); } catch (e) { td = {}; test("nạp khối linkedin-core", () => { throw e; }); }
const nodes = [];
for (const st of td.DATA || []) for (const g of st.groups) for (const n of g.nodes) nodes.push({ id: n.id, core: !!n.core });
const ids = nodes.map(n => n.id);

/* ---------------- Task 1: dữ liệu tĩnh ---------------- */
test("toàn bộ inline script parse được", () => { new vm.Script(inlineScript); });
test("LI_PLAN khớp đúng Phụ lục A", needSpec, () => {
  const rows = spec.slice(spec.indexOf("## Phụ lục A")).split("\n")
    .filter(l => /^\| [a-z0-9-]+ \| [0-5] \|/.test(l)).map(l => l.split("|").map(s => s.trim()));
  const want = {};
  for (const r of rows) {
    const [, id, f, sn, tg, a] = r;
    const o = { f: +f, r: sn.startsWith("✅") ? "ok" : sn.startsWith("⚠") ? "cond" : "hold", en: tg === "🎯" ? 1 : 0, a };
    if (o.r === "cond") o.c = sn.split("·")[1].trim();
    want[id] = o;
  }
  assert.equal(ids.length, 98);
  assert.deepStrictEqual(Object.keys(td.LI_PLAN), ids);
  assert.deepStrictEqual(td.LI_PLAN, want);
});
test("phân bố theo cách viết, mức sẵn sàng và 🎯", () => {
  const P = Object.values(td.LI_PLAN), n = fn => P.filter(fn).length;
  assert.deepEqual([0, 1, 2, 3, 4, 5].map(f => n(p => p.f === f)), [7, 32, 11, 17, 12, 19]);
  assert.deepEqual(["ok", "cond", "hold"].map(r => n(p => p.r === r)), [80, 11, 7]);
  assert.equal(n(p => p.en === 1), 14);
  assert.ok(P.every(p => (p.f === 0) === (p.r === "hold")));
});
test("LI_CAL theo spec §5", () => {
  assert.deepStrictEqual(td.LI_CAL.map(s => [s.w, s.k, s.f, s.lang, s.lead]), [
    [1, "ladder", 5, "vi", 0], [2, "calibration", 1, "vi", 1], [3, "stop-hoarding", 2, "vi", 2], [4, "scope-negotiation", 3, "vi", 0],
    [5, "sbi", 4, "vi", 0], [6, "design-doc", 1, "vi", 2], [7, "delegate-decision", 3, "vi", 0], [8, "dora", 1, "vi", 4],
    [9, "state", 4, "vi", 0], [10, "one-on-one", 1, "vi", 2], [11, "people-calibration", 1, "vi", 10], [12, "decision-doc", 5, "en", 0]]);
  for (const s of td.LI_CAL) {
    assert.ok(ids.includes(s.k), s.k);
    assert.notEqual(td.LI_PLAN[s.k].r, "hold");
    if (hasSpec && s.prep) assert.ok(S.includes(s.prep), s.prep);
  }
  assert.equal(td.LI_CAL[6].prep, "");
  assert.equal(td.LI_CAL[0].t, "Bài ra mắt: roadmap 98 kỹ năng, kèm link repo");
  assert.ok(td.LI_CAL.slice(1).every(s => !("t" in s)));
});
test("khung bài, hồ sơ, năm câu kiểm tra và chiến lược chép nguyên văn", () => {
  for (const f of [1, 2, 3, 4, 5]) {
    const x = td.LI_FMT[f];
    assert.equal(x.steps.length, 5);
    if (hasSpec) for (const s of [x.n, x.time, x.use, ...x.steps]) assert.ok(S.includes(s), s);
  }
  assert.deepEqual([1, 2, 3, 4].map(f => td.LI_FMT[f].hint), [{ 0: "first" }, { 0: "no" }, { 0: "no" }, { 0: "d" }]);
  assert.deepEqual(td.LI_FMT[5].hint, { 0: "no", 3: "ok" });
  assert.deepEqual(td.LI_PROF.map(p => p[0]), ["headline", "about", "featured", "experience", "policy", "repo"]);
  // Trên trang không có "Phụ lục A": câu chiến lược trỏ vào bảng 98 kỹ năng của tab.
  const pageS = S.replace(/Phụ lục A/g, "bảng 98 kỹ năng");
  if (hasSpec) for (const s of [...td.LI_PROF.map(p => p[1]), ...td.LI_CHECKS, ...td.LI_STRATEGY.lang, td.LI_STRATEGY.rhythm, ...td.LI_STRATEGY.rules])
    assert.ok(pageS.includes(s), s);
  assert.equal(td.LI_CHECKS.length, 5);
  assert.equal(td.LI_STRATEGY.lang.length, 3);
  assert.equal(td.LI_STRATEGY.rules.length, 5);
});

/* ---------------- Task 2: lịch, gợi ý, khung bài ---------------- */
const P = (k, s, d = "", lang = "vi", id = k + s + d + lang) => ({ id, k, f: 1, lang, s, d, url: "" });
const allDone = () => td.LI_CAL.map(c => P(c.k, "posted", "2026-10-01", c.lang));
test("liNextMonday", () => { assert.equal(td.liNextMonday("2026-10-25"), "2026-10-26"); assert.equal(td.liNextMonday("2026-10-26"), "2026-10-26"); });
test("tuần: trước ngày bắt đầu, ngày đầu, ngày thứ 7, ngày thứ 8", () => {
  assert.ok(td.tdWeekNo("2026-10-25", "2026-10-26") < 1);
  assert.equal(td.tdWeekNo("2026-10-26", "2026-10-26"), 1);
  assert.equal(td.tdWeekNo("2026-11-01", "2026-10-26"), 1);
  assert.equal(td.tdWeekNo("2026-11-02", "2026-10-26"), 2);
});
test("bài tuần này: dòng sớm nhất chưa xong, tính bài đăng sớm, en khác vi", () => {
  assert.equal(td.liCurrent([]), 0);
  assert.equal(td.liCurrent([P("ladder","posted","2026-10-28"), P("stop-hoarding","posted","2026-10-29")]), 1);
  assert.equal(td.liCurrent([P("ladder","draft")]), 0);
  const eleven = allDone().slice(0, 11);
  assert.equal(td.liCurrent([...eleven, P("decision-doc","posted","2026-10-01","vi")]), 11);
  assert.equal(td.liCurrent(allDone()), -1);
});
test("Review 5: xoá bài hoặc đổi en thành vi thì dòng quay về chưa xong", () => {
  const ps = [P("ladder","posted","2026-10-28"), P("calibration","posted","2026-11-04")];
  assert.equal(td.liCurrent(ps), 2);
  assert.equal(td.liCurrent(ps.filter(p => p.k !== "ladder")), 0);
  const a = allDone(); a[11] = { ...a[11], lang: "vi" };
  assert.equal(td.liCurrent(a), 11);
});
test("tuần này đã có bài, số tuần dời", () => {
  const st = "2026-10-26";
  assert.equal(td.liShift(st, "2026-10-28", []), 0);
  const one = [P("ladder","posted","2026-10-28")];
  assert.equal(td.liPostedIn(one, "2026-10-26").length, 1);
  assert.equal(td.liPostedIn(one, "2026-11-02").length, 0);
  assert.equal(td.liShift(st, "2026-10-28", one), 0);          // tuần 1 đã có bài: dòng 2 là tuần sau
  assert.equal(td.liShift(st, "2026-11-09", one), 1);          // tuần 3, mới xong dòng 1
  const ext = [...one, P("bluf","posted","2026-11-10")];        // bài ngoài lịch trong tuần 3
  assert.equal(td.liShift(st, "2026-11-10", ext), 2);
  assert.equal(td.liPostedIn(ext, "2026-11-09").length, 1);
});
test("Review 3 và 4: ngày trống, chưa có ngày bắt đầu, trước ngày bắt đầu", () => {
  const p = [P("ladder","posted","")];
  assert.equal(td.liCurrent(p), 1);
  assert.equal(td.liPostedIn(p, "2026-10-26").length, 0);
  assert.equal(td.liShift(null, "2026-11-09", p), 0);
  assert.equal(td.liShift("2026-10-26", "2026-10-20", []), 0);
});
test("bắt đầu chuẩn bị", () => {
  assert.deepEqual(td.liPrep([]), [1, 2, 10]);
  const three = ["ladder","calibration","stop-hoarding"].map(k => P(k, "posted", "2026-10-28"));
  assert.deepEqual(td.liPrep(three), [5, 7, 10]);
  assert.deepEqual(td.liPrep([...three, P("people-calibration","posted","2026-10-29")]), [5, 7]);
  assert.deepEqual(td.liPrep(allDone()), []);
});
test("gợi ý sau 12 bài", () => {
  const st = { "bluf": "learning", "dod": "learning", "design-doc": "done", "underperform": "learning", "attention": "pending", "sbi": "learning" };
  const posts = [...allDone(), P("sbi", "posted", "2026-10-02")];
  const out = td.liSuggest(nodes, id => st[id] || "pending", posts);
  assert.deepEqual(out, ["dod", "bluf"]);   // dod: learning + 🎯; bluf: learning. design-doc đã có bài; underperform là hold; sbi đã đăng
  assert.deepEqual(td.liSuggest(nodes, () => "pending", posts), []);
});
test("liPlanFor, liActive, liOutline, liQuarter, liEvLabel", () => {
  assert.deepEqual([td.liPlanFor("design-doc").f, td.liPlanFor("design-doc").cal], [1, 5]);
  assert.equal(td.liPlanFor("decision-doc").lang, "en");
  assert.deepEqual([td.liPlanFor("bluf").f, td.liPlanFor("bluf").lang, td.liPlanFor("bluf").cal], [2, "vi", -1]);
  assert.equal(td.liPlanFor("let-go").f, 4);
  assert.deepEqual(td.liActive("bluf", []), { f: 2, lang: "vi" });
  assert.deepEqual(td.liActive("bluf", [{ ...P("bluf","posted","2026-10-01"), f: 3 }, { ...P("bluf","draft"), f: 5, lang: "en" }]), { f: 5, lang: "en" });
  const node = { first: "F", no: "N", d: "D", ok: "O" };
  const t = td.liOutline(5, "vi", node).split("\n");
  assert.equal(t[0], "1. " + td.LI_FMT[5].steps[0]); assert.equal(t[1], "   → N");
  assert.ok(t.includes("   → O")); assert.equal(t[t.length - 1], "EN TL;DR:");
  assert.ok(!td.liOutline(1, "en", node).includes("EN TL;DR:"));
  assert.equal(td.liQuarter("2026-10-25"), "2026-Q4"); assert.equal(td.liQuarter("2027-03-31"), "2027-Q1");
  assert.equal(td.liEvLabel({ t: "x", v: { diem: 82 } }), "đã có (82 điểm)");
  assert.equal(td.liEvLabel({ t: "x" }), "đã viết, chưa chấm");
  assert.equal(td.liEvLabel(undefined), "chưa có");
});

/* ---------------- Task 3: state.li, lưu, xuất/nhập ---------------- */
const isSkill = k => ids.includes(k);
const good = { id: "p1", k: "bluf", f: 2, lang: "vi", s: "posted", d: "2026-11-03", url: "https://www.linkedin.com/posts/x" };
test("liValidPost", () => {
  assert.ok(td.liValidPost(good, isSkill));
  for (const bad of [{ ...good, k: "khong-co" }, { ...good, f: 6 }, { ...good, f: 0 }, { ...good, lang: "fr" }, { ...good, s: "x" },
    { ...good, d: "03/11/2026" }, { ...good, id: "" }, null, "x"]) assert.equal(td.liValidPost(bad, isSkill), false);
});
test("Review 2: link độc bị loại", () => {
  for (const url of ["javascript:alert(1)", '"><img src=x>', "https://a b", "ftp://x"]) assert.equal(td.liValidPost({ ...good, url }, isSkill), false, url);
  assert.ok(td.liValidPost({ ...good, url: "" }, isSkill));
});
test("Review 1: liNormalize với dữ liệu cũ hoặc hỏng", () => {
  const empty = { start: null, posts: [], prof: {} };
  for (const x of [undefined, null, 5, "x", []]) assert.deepStrictEqual(td.liNormalize(x, isSkill), empty);
  // rec (số recruiter liên hệ) và tick opentowork của bản trước bị bỏ khi nạp
  const n = td.liNormalize({ start: "2026-10-28", posts: [good, { ...good, url: "javascript:x" }, { ...good, extra: 1, id: "p2" }],
    prof: { headline: 1, la: 1, about: 0, opentowork: 1 }, rec: { "2026-Q4": 2 } }, isSkill);
  assert.equal(n.start, "2026-10-26");
  assert.deepStrictEqual(n.posts, [good, { ...good, id: "p2" }]);
  assert.deepStrictEqual(n.prof, { headline: 1 });
  assert.ok(!("rec" in n));
});
test("export chỉ có start và posts", () => {
  const li = { start: "2026-10-26", posts: [good], prof: { policy: 1 } };
  assert.deepStrictEqual(td.liExport(li), { start: "2026-10-26", posts: [good] });
  const src = inlineScript.slice(inlineScript.indexOf("function buildExport"), inlineScript.indexOf("function ioState"));
  assert.ok(src.includes("linkedin: liExport(state.li)"));
  assert.ok(!/\bprof\b|\brec\b/.test(src));
});
test("import: loại bài sai, giữ prof trên máy, bỏ qua prof trong file", () => {
  const cur = { start: null, posts: [], prof: { policy: 1 } };
  const r = td.liImport({ linkedin: { start: "2026-10-26", posts: [good, { ...good, k: "x" }], prof: { headline: 1 }, rec: { "2026-Q4": 9 } } }, isSkill, cur);
  assert.equal(r.drop, 1);
  assert.deepStrictEqual(r.li, { start: "2026-10-26", posts: [good], prof: { policy: 1 } });
  assert.deepStrictEqual(td.liImport({ li: { posts: [good] } }, isSkill, cur).li.posts, [good]);
  const old = td.liImport({ status: {} }, isSkill, cur);                 // file xuất từ trước khi có tính năng
  assert.deepStrictEqual(old, { li: { start: null, posts: [], prof: { policy: 1 } }, drop: 0 });
  assert.equal(td.liImport({ linkedin: { start: "x" } }, isSkill, cur).drop, 1);
});
test("sáu chỗ lưu đều có li, footer có câu nhắc", () => {
  for (const s of ["li:liNormalize(local.li, liIsSkill)", "li:state.li", "li:liNormalize(d.li, liIsSkill)", "liImport(d, liIsSkill, state.li)", "li:liNormalize(null)", "li:{start:null,posts:[],prof:{}}"])
    assert.ok(inlineScript.includes(s), s);
  assert.ok(html.includes("File này chứa nguyên văn các ô “Bằng chứng của tôi” — giữ trong máy, không đưa lên repo public."));
});

/* ---------------- Task 4: mục Bài LinkedIn trong trang kỹ năng ---------------- */
test("drawer gọi liBlock sau evidenceBlock và cuộn tới mục LinkedIn", () => {
  assert.ok(inlineScript.includes("evidenceBlock(id, ev) + liBlock(id)"));
  assert.ok(/function liBlock\(id\)/.test(inlineScript) && /function liRenderSec\(id\)/.test(inlineScript));
  assert.ok(inlineScript.includes("liScrollTo"));
  for (const s of ["Bài LinkedIn", "nên có bản tiếng Anh", "Để dành", "Thêm bài", "Chép khung", "#/linkedin/kiem-tra"]) assert.ok(inlineScript.includes(s), s);
});

/* ---------------- Task 5: tab LinkedIn ---------------- */
test("tab LinkedIn có nav, view, route và các khối", () => {
  assert.ok(html.includes('<a href="#/linkedin" id="nav-li">LinkedIn</a>'));
  assert.ok(html.includes('<main class="wrap" id="view-li" hidden></main>'));
  assert.ok(inlineScript.includes('back.indexOf("#/linkedin")===0'));
  assert.ok(/function renderLinkedIn\(\)/.test(inlineScript));
  for (const s of ["Bài tuần này","Bắt đầu chuẩn bị","Lịch 12 tuần đầu","Bảng 98 kỹ năng","Hồ sơ LinkedIn (làm một lần)",
    "Trước khi đăng: năm câu kiểm tra","Chiến lược","Tuần này đã có bài","Gợi ý khác","Lịch đã dời","Đổi một kỹ năng sang Đang học để có gợi ý.","Mở khung bài"])
    assert.ok(inlineScript.includes(s), s);
  // ba khối gập được dựng qua liDetails(id, …), nên id nằm trong lời gọi chứ không ở dạng id="…"
  for (const id of ["li-prof", "li-checks", "li-strat"])
    assert.ok(inlineScript.includes('id="' + id + '"') || inlineScript.includes('liDetails("' + id + '"'), id);
  const nav = html.slice(html.indexOf('<nav class="nav">'), html.indexOf("</nav>"));
  assert.ok(nav.indexOf("nav-tuduy") < nav.indexOf("nav-li") && nav.indexOf("nav-li") < nav.indexOf("nav-pmp"));
});

/* ---------------- Task 6: Dashboard và README ---------------- */
test("chỉ số LinkedIn chèn đúng chỗ, MS_METRICS giữ nguyên", () => {
  const ms = td.MS_METRICS, out = td.liMetricRows(ms);
  assert.equal(ms.length, 14); assert.equal(out.length, 15);
  assert.equal(out[7][0], "Bài LinkedIn đã đăng"); assert.equal(out[6][1], "Dẫn dắt"); assert.equal(out[8][1], "Kết quả");
  assert.deepEqual(out[14], ms[13]);
  assert.ok(inlineScript.includes("liMetricRows(MS_METRICS).map("));
});
test("README nói bảy tab và có khoá linkedin", () => {
  const r = fs.readFileSync(root("README.md"), "utf8");
  assert.ok(r.includes("## Bảy tab")); assert.ok(r.includes("**LinkedIn**")); assert.ok(r.includes('"linkedin"'));
});

/* ---------------- Task 7: lỗi tìm thấy khi kiểm trên trình duyệt ---------------- */
test("ở 360px các nhóm nút lọc của bảng 98 kỹ năng được xuống dòng, không đẩy trang tràn ngang", () => {
  assert.match(html, /\.li-filters \.seg\{[^}]*flex-wrap:wrap/);
});

/* ---------------- Final review: lỗi Important ---------------- */
const fnSrc = name => { const a = inlineScript.indexOf("function " + name + "("); return inlineScript.slice(a, inlineScript.indexOf("\n}\n", a)); };
test("paint() vẽ lại tab LinkedIn khi đang mở — sau nhập, xoá tiến độ, đồng bộ db", () => {
  assert.ok(fnSrc("paint").includes('if(!document.getElementById("view-li").hidden) renderLinkedIn();'));
});
test("#/linkedin/kiem-tra là lối vào một lần, mở khối sau khi đã ẩn các view khác", () => {
  const r = fnSrc("route");
  assert.ok(r.includes('history.replaceState(null, "", "#/linkedin")'));
  assert.ok(r.includes('baseView="#/linkedin"'));
  assert.ok(r.indexOf('getElementById("li-checks")') > r.indexOf('getElementById("view-tuduy").hidden'));
});

/* ---------------- Repo public: không lộ ý định tìm việc, tài liệu không thuộc về mình, dữ liệu máy cá nhân ---------------- */
test("public: roadmap không nhắc công ty đang nhắm, chuyện đổi việc hay recruiter", () => {
  for (const re of [/\bNAB\b/, /\bFIN\b/, /GoTymeX|Bjak|Michael Page/i, /đổi công ty/i, /recruiter/i, /nhà tuyển dụng/i, /open to work/i, /opentowork/, /Kết quả theo quý/])
    assert.ok(!re.test(html), String(re));
});
test("public: không nhắc bản dịch sách, transcript khoá học hay đường dẫn máy cá nhân", () => {
  const g = fs.readFileSync(root(".gitignore"), "utf8"), r = fs.readFileSync(root("README.md"), "utf8");
  for (const [name, txt] of [["roadmap-em.html", html], [".gitignore", g], ["README.md", r]])
    for (const re of [/song ng[ữu]/i, /Udemy/i, /transcript/i, /LEARNING\+career-path/, /Hùng/, /O'Reilly/])
      assert.ok(!re.test(txt), name + " " + re);
});
test("public: file đối chiếu JD đã ẩn danh", () => {
  const j = fs.readFileSync(root("em-skills-tong-hop.md"), "utf8");
  for (const re of [/\b(NAB|GTX|BJK|FIN)\b/, /GoTymeX|Tyme|Bjak|Michael Page|Grab|PropertyGuru|KMS|Beincom|Vestiaire|Axon/, /USD/, /Mức hiện tại|\bGap\b/, /career path cá nhân/])
    assert.ok(!re.test(j), String(re));
});
test("public: .gitignore không mở cho tài liệu làm việc nội bộ và tiến độ cá nhân", () => {
  const g = fs.readFileSync(root(".gitignore"), "utf8");
  assert.ok(!/^!docs/m.test(g), "docs/");
  assert.ok(!/^!tien-do\.json/m.test(g), "tien-do.json");
  assert.ok(/^!em-skills-tong-hop\.md/m.test(g) && /^!roadmap-em\.html/m.test(g) && /^!tests\/\*\.js/m.test(g));
});
