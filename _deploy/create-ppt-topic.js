const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Icons ──
const { FaSearch, FaEye, FaHandPaper, FaLayerGroup, FaCogs, FaLightbulb, FaCalendarAlt, FaHeart, FaGem, FaLandmark, FaCube, FaHistory } = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Design Tokens ──
const C = {
  bgDark:      "18181B",
  bgCard:      "27272A",
  gold:        "CA8A04",
  jade:        "6B8E5A",
  terracotta:  "8B5E3C",
  textLight:   "F0E8D8",
  textMuted:   "B8A99A",
  bgLight:     "FAFAFA",
  textDark:    "18181B",
  textBody:    "3D3D3D",
  white:       "FFFFFF",
  jadeLight:   "8CB07A",
};

const mkShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.10 });

function darkBg(slide) { slide.background = { color: C.bgDark }; }
function lightBg(slide) { slide.background = { color: C.bgLight }; }

function addPageNumber(slide, num, total, onDark = false) {
  slide.addText(`${num} / ${total}`, {
    x: 8.8, y: 5.1, w: 1, h: 0.35,
    fontSize: 8, fontFace: "Calibri",
    color: onDark ? C.textMuted : "999999", align: "right"
  });
}

function sectionTitle(slide, title, subtitle, onDark = false) {
  slide.addText(title, {
    x: 0.7, y: 0.3, w: 8.6, h: 0.65,
    fontSize: 28, fontFace: "Georgia", bold: true,
    color: onDark ? C.textLight : C.textDark, margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 0.9, w: 8.6, h: 0.35,
      fontSize: 12, fontFace: "Calibri",
      color: onDark ? C.textMuted : "888888", margin: 0
    });
  }
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "吴泽远";
  pres.title = "玉见·石家河 — 选题汇报";

  // Pre-render icons
  const iconEye    = await iconToBase64Png(FaEye,        `#${C.jade}`, 256);
  const iconHand   = await iconToBase64Png(FaHandPaper,  `#${C.gold}`, 256);
  const iconLayer  = await iconToBase64Png(FaLayerGroup, `#${C.jade}`, 256);
  const iconCogs   = await iconToBase64Png(FaCogs,       `#${C.gold}`, 256);
  const iconBulb   = await iconToBase64Png(FaLightbulb,  `#${C.jade}`, 256);
  const iconCal    = await iconToBase64Png(FaCalendarAlt,`#${C.jade}`, 256);
  const iconHeart  = await iconToBase64Png(FaHeart,      `#${C.gold}`, 256);
  const iconGem    = await iconToBase64Png(FaGem,        `#${C.jade}`, 256);
  const iconLandmark = await iconToBase64Png(FaLandmark, `#${C.gold}`, 256);
  const iconCube   = await iconToBase64Png(FaCube,       `#${C.gold}`, 256);
  const iconHistory= await iconToBase64Png(FaHistory,    `#${C.jade}`, 256);

  const TOTAL = 13;

  // ═══════════════ SLIDE 1: COVER (dark) ═══════════════
  {
    const s = pres.addSlide(); darkBg(s);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.jade } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.025, fill: { color: C.gold } });
    s.addText("玉见·石家河", {
      x: 0.7, y: 1.2, w: 8, h: 1.3,
      fontSize: 54, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0
    });
    s.addText("H5 交互作品选题汇报", {
      x: 0.7, y: 2.45, w: 8, h: 0.55,
      fontSize: 22, fontFace: "Calibri", color: C.gold, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.2, w: 3.5, h: 0.015, fill: { color: C.textMuted } });
    s.addText([
      { text: "湖北天门 · 石家河文化", options: { breakLine: true, fontSize: 14, color: C.textLight } },
      { text: "长江中游史前文明中心", options: { breakLine: true, fontSize: 12, color: C.textMuted } },
      { text: "", options: { breakLine: true, fontSize: 8 } },
      { text: "汇报人：吴泽远", options: { breakLine: true, fontSize: 13, color: C.textMuted } },
      { text: "2026年6月30日", options: { fontSize: 13, color: C.textMuted } }
    ], { x: 0.7, y: 3.45, w: 5, h: 1.8, fontFace: "Calibri", margin: 0 });
    addPageNumber(s, 1, TOTAL, true);
  }

  // ═══════════════ SLIDE 2: TOC (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "目录", "CONTENTS");
    const items = [
      { num: "01", title: "选题简介", desc: "石家河文化概述与考古发现" },
      { num: "02", title: "选题背景", desc: "长江中游史前文明中心的时代价值" },
      { num: "03", title: "选题意义与价值", desc: "让文物活起来 · 讲好长江文明故事" },
      { num: "04", title: "创意构思", desc: "「玉见·石家河」核心隐喻与设计理念" },
      { num: "05", title: "内容框架", desc: "六场景沉浸式考古体验" },
      { num: "06", title: "交互与视觉", desc: "四种交互形式 + 考古暖黑设计系统" },
      { num: "07", title: "技术路线", desc: "HTML5 + Canvas + GSAP" },
      { num: "08", title: "进度计划与预期成果", desc: "10天冲刺计划 + 成果展望" },
    ];

    items.forEach((item, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = 0.7 + col * 4.5;
      const y = 1.55 + row * 0.47;
      s.addText(item.num, { x, y, w: 0.55, h: 0.35, fontSize: 18, fontFace: "Georgia", bold: true, color: C.jade, margin: 0 });
      s.addText([
        { text: item.title, options: { bold: true, fontSize: 13, color: C.textDark, breakLine: true } },
        { text: item.desc, options: { fontSize: 9.5, color: "888888" } }
      ], { x: x + 0.6, y, w: 3.6, h: 0.42, fontFace: "Calibri", margin: 0 });
    });
    addPageNumber(s, 2, TOTAL, false);
  }

  // ═══════════════ SLIDE 3: INTRODUCTION (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "选题简介", "INTRODUCTION");

    s.addText([
      { text: "石家河文化 —— 长江中游史前文明之巅", options: { bold: true, fontSize: 16, color: C.gold, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "石家河遗址位于湖北省天门市石家河镇，是中国长江中游地区迄今发现规模最大、等级最高、保存最完整的新石器时代聚落遗址，遗址总面积约8平方公里，核心年代距今约6500-4000年。", options: { breakLine: true, fontSize: 12, color: C.textBody } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "1954年首次发现至今，70余年的考古发掘出土了大量精美玉器、陶器和青铜器遗存，其中玉凤被誉为「中华第一凤」，玉虎、玉人首等玉器代表了史前东亚最高工艺水平。2017年，石家河遗址入选「全国十大考古新发现」，2021年入选「百年百大考古发现」。", options: { breakLine: true, fontSize: 12, color: C.textBody } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "核心定位：石家河文化是长江中游史前文明中心，与黄河流域仰韶文化、龙山文化共同构成中华文明多元一体的重要源头。", options: { fontSize: 12, color: C.jade, bold: true } }
    ], { x: 0.7, y: 1.3, w: 5.8, h: 3.8, fontFace: "Calibri", margin: 0, valign: "top" });

    // Stat cards
    const stats = [
      { num: "70+", label: "考古发掘年数", color: C.gold },
      { num: "8km2", label: "遗址总面积", color: C.jade },
      { num: "200+", label: "出土玉器件数", color: C.terracotta },
    ];
    stats.forEach((st, i) => {
      const cy = 1.3 + i * 1.25;
      s.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: cy, w: 2.6, h: 1.0, fill: { color: C.bgCard }, shadow: mkShadow() });
      s.addText(st.num, { x: 7.15, y: cy + 0.05, w: 1.5, h: 0.55, fontSize: 32, fontFace: "Georgia", bold: true, color: st.color, margin: 0 });
      s.addText(st.label, { x: 7.15, y: cy + 0.55, w: 2.3, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });
    addPageNumber(s, 3, TOTAL, false);
  }

  // ═══════════════ SLIDE 4: BACKGROUND (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "选题背景", "BACKGROUND");

    const cards = [
      { icon: iconLandmark, title: "考古70年重大发现", desc: "1954年首次发现至今，肖家屋脊、罗家柏岭、谭家岭等遗址陆续发掘，出土玉器纹饰之精美、工艺之高超，改写了对长江流域史前文明的认知。" },
      { icon: iconGem, title: "中华文明多元一体", desc: "石家河文化以发达的玉器文明、城址聚落和稻作农业，证明了长江流域与黄河流域同为中华文明的核心发源地，是多元一体格局的重要支撑。" },
      { icon: iconEye, title: "数字化传播时代", desc: "国家推动「让文物活起来」文化战略，数字技术为文化遗产传播提供新可能。石家河文化在大众认知度上远不及良渚、三星堆，亟需通过创新方式扩大影响力。" },
    ];

    cards.forEach((c, i) => {
      const cx = 0.7 + i * 3.0;
      const cy = 1.6;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 2.7, h: 2.9, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 2.7, h: 0.06, fill: { color: i === 0 ? C.gold : i === 1 ? C.jade : C.terracotta } });
      s.addImage({ data: c.icon, x: cx + 0.25, y: cy + 0.3, w: 0.38, h: 0.38 });
      s.addText(c.title, { x: cx + 0.75, y: cy + 0.28, w: 1.7, h: 0.4, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(c.desc, { x: cx + 0.25, y: cy + 0.9, w: 2.2, h: 1.7, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0, valign: "top" });
    });
    addPageNumber(s, 4, TOTAL, false);
  }

  // ═══════════════ SLIDE 5: SIGNIFICANCE (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "选题意义与价值", "SIGNIFICANCE & VALUE");

    const items = [
      { title: "文化传承价值", desc: "石家河文化作为长江文明的重要代表，其玉器工艺和祭祀文化承载着中华先民的精神世界。通过H5互动形式，让更多年轻人了解并认同长江流域的文明根脉，增强文化自信。" },
      { title: "教育科普价值", desc: "传统的博物馆展览受限于地理位置和展出时间，H5可以在社交媒体中广泛传播。虚拟考古的体验式学习降低了公众理解考古知识的门槛，激发探索兴趣。" },
      { title: "技术创新价值", desc: "以Canvas刮擦、序列帧旋转、拖拽拼合等交互技术，探索文物数字化的新表达方式。区别于传统的图文浏览、3D模型展示，提供更具「动手感」的参与体验。" },
      { title: "学术传播价值", desc: "石家河遗址考古成果丰富但大众认知度低。本作品将考古学知识转化为通俗易懂的互动叙事，搭建学术研究与公众理解之间的桥梁，助力「讲好长江文明故事」。" },
    ];

    items.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = 0.7 + col * 4.5;
      const py = 1.5 + row * 1.8;

      s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: 4.1, h: 1.55, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: 0.06, h: 1.55, fill: { color: i % 2 === 0 ? C.gold : C.jade } });
      s.addText(item.title, { x: px + 0.25, y: py + 0.15, w: 3.6, h: 0.3, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(item.desc, { x: px + 0.25, y: py + 0.55, w: 3.6, h: 0.85, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0, valign: "top" });
    });
    addPageNumber(s, 5, TOTAL, false);
  }

  // ═══════════════ SLIDE 6: CREATIVE CONCEPT (dark) ═══════════════
  {
    const s = pres.addSlide(); darkBg(s);
    sectionTitle(s, "创意构思", "CREATIVE CONCEPT", true);

    s.addText("「玉见·石家河」", {
      x: 0.7, y: 1.5, w: 8.6, h: 0.75,
      fontSize: 40, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0
    });
    s.addText("一场穿越4000年的虚拟考古体验", {
      x: 0.7, y: 2.2, w: 8.6, h: 0.45,
      fontSize: 18, fontFace: "Calibri", color: C.gold, margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.85, w: 8.6, h: 0.015, fill: { color: C.textMuted } });

    s.addText("核心隐喻", {
      x: 0.7, y: 3.1, w: 3, h: 0.35,
      fontSize: 16, fontFace: "Georgia", bold: true, color: C.jadeLight, margin: 0
    });
    s.addText("用户扮演考古学家，通过「发掘 → 鉴赏 → 复原 → 回顾 → 传承」五个阶段，在互动中感知石家河文明的玉魂之美。将展览浏览转化为主动探索，让用户从「观看者」变为「参与者」。", {
      x: 0.7, y: 3.5, w: 8.6, h: 0.7,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted, margin: 0
    });

    s.addText("设计理念", {
      x: 0.7, y: 4.15, w: 3, h: 0.35,
      fontSize: 16, fontFace: "Georgia", bold: true, color: C.jadeLight, margin: 0
    });
    s.addText("「考古暖黑」视觉系统 + 五种差异化交互 + 线性叙事结构，每个场景一种核心交互，避免雷同。拒绝模板套用，全部从零编写代码。", {
      x: 0.7, y: 4.5, w: 8.6, h: 0.5,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted, margin: 0
    });
    addPageNumber(s, 6, TOTAL, true);
  }

  // ═══════════════ SLIDE 7: CONTENT FRAMEWORK (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "内容框架", "CONTENT FRAMEWORK");

    const pages = [
      { id: "01", title: "序幕「玉见」", desc: "玉凤剪影浮现，粒子浮尘营造考古神秘感，引导用户「开启探索」", color: C.gold },
      { id: "02", title: "发掘「拂去尘埃」", desc: "Canvas刮擦交互，手指擦拭泥土层发掘玉虎等文物", color: C.terracotta },
      { id: "03", title: "鉴赏「凝视为真」", desc: "多角度序列帧旋转，拖拽查看文物360度细节", color: C.jade },
      { id: "04", title: "祭祀「礼敬天地」", desc: "拖拽拼合祭祀元素，全部归位后场景动画激活", color: C.gold },
      { id: "05", title: "长廊「七秩寻踪」", desc: "横向时间轴滑动，回顾1954-2024考古历程", color: C.jadeLight },
      { id: "06", title: "尾声「文明的回响」", desc: "生成考古发现证书，html2canvas保存分享，首尾呼应", color: C.terracotta },
    ];

    pages.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = 0.7 + col * 4.5;
      const py = 1.35 + row * 1.3;

      s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: 4.1, h: 1.15, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: 0.06, h: 1.15, fill: { color: p.color } });
      s.addText(p.id, { x: px + 0.2, y: py + 0.1, w: 0.5, h: 0.3, fontSize: 20, fontFace: "Georgia", bold: true, color: p.color, margin: 0 });
      s.addText(p.title, { x: px + 0.7, y: py + 0.1, w: 3.1, h: 0.3, fontSize: 14, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(p.desc, { x: px + 0.2, y: py + 0.5, w: 3.7, h: 0.55, fontSize: 10, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });
    addPageNumber(s, 7, TOTAL, false);
  }

  // ═══════════════ SLIDE 8: INTERACTION (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "交互设计", "INTERACTION DESIGN");

    const interactions = [
      { icon: iconHand, title: "刮擦揭示", scene: "场景二·发掘", desc: "Canvas橡皮擦算法，手指滑动擦除泥土层露出文物。擦除超过60%面积激活详情按钮。", tech: "Canvas 2D API" },
      { icon: iconCube, title: "序列帧旋转", scene: "场景三·鉴赏", desc: "6-8张多角度文物照片，根据拖拽距离动态切换图片，模拟3D旋转效果。", tech: "Image Sequence + Touch" },
      { icon: iconLayer, title: "拖拽拼合", scene: "场景四·祭祀", desc: "拖元素到场景虚线目标区，正确则落入+光晕反馈，错误弹回。全部归位后激活动画。", tech: "Drag & Drop + CSS Anim" },
      { icon: iconHistory, title: "惯性滑动", scene: "场景五·长廊", desc: "横向时间轴带惯性滚动+吸附居中，节点选中联动下方详情卡片。", tech: "CSS scroll-snap + JS" },
    ];

    interactions.forEach((item, i) => {
      const ix = 0.5 + i * 2.35;
      const iy = 1.55;

      s.addShape(pres.shapes.RECTANGLE, { x: ix, y: iy, w: 2.15, h: 3.3, fill: { color: i % 2 === 0 ? C.bgCard : C.white }, shadow: mkShadow() });

      // Icon circle
      s.addShape(pres.shapes.OVAL, { x: ix + 0.15, y: iy + 0.2, w: 0.42, h: 0.42, fill: { color: C.jade, transparency: 15 } });
      s.addImage({ data: item.icon, x: ix + 0.22, y: iy + 0.27, w: 0.28, h: 0.28 });

      s.addText(item.title, { x: ix + 0.68, y: iy + 0.2, w: 1.3, h: 0.3, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(item.scene, { x: ix + 0.68, y: iy + 0.48, w: 1.3, h: 0.22, fontSize: 9, fontFace: "Calibri", color: C.gold, margin: 0 });

      s.addText(item.desc, { x: ix + 0.15, y: iy + 0.9, w: 1.85, h: 1.7, fontSize: 9.5, fontFace: "Calibri", color: C.textBody, margin: 0, valign: "top" });

      // Tech tag
      s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.15, y: iy + 2.75, w: 1.85, h: 0.35, fill: { color: C.bgLight } });
      s.addText(item.tech, { x: ix + 0.15, y: iy + 2.75, w: 1.85, h: 0.35, fontSize: 8.5, fontFace: "Calibri", align: "center", color: C.jade, margin: 0 });
    });
    addPageNumber(s, 8, TOTAL, false);
  }

  // ═══════════════ SLIDE 9: VISUAL DESIGN (dark) ═══════════════
  {
    const s = pres.addSlide(); darkBg(s);
    sectionTitle(s, "视觉风格", "VISUAL DESIGN", true);

    const palette = [
      { hex: "141210", label: "地层黑·主背景" },
      { hex: "1E1A16", label: "暖暗·次级背景" },
      { hex: "6B8E5A", label: "玉石绿·强调" },
      { hex: "BD9B4A", label: "古金·高亮" },
      { hex: "8B5E3C", label: "陶土·暖色" },
      { hex: "F0E8D8", label: "羊皮纸·文字" },
    ];

    palette.forEach((c, i) => {
      const px = 0.5 + i * 1.55;
      s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.6, w: 1.35, h: 0.8, fill: { color: c.hex } });
      s.addText(c.hex, { x: px, y: 2.5, w: 1.35, h: 0.22, fontSize: 9, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });
      s.addText(c.label, { x: px, y: 2.7, w: 1.35, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });
    });

    s.addText("字体系统", { x: 0.5, y: 3.2, w: 3, h: 0.35, fontSize: 16, fontFace: "Georgia", bold: true, color: C.jadeLight, margin: 0 });
    s.addText([
      { text: "标题：Georgia (Serif) 36-54pt Bold", options: { breakLine: true, color: C.gold } },
      { text: "古典衬线，传递历史厚重感", options: { breakLine: true, color: C.textMuted } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "正文：Calibri (Sans-serif) 11-13pt Regular", options: { breakLine: true, color: C.gold } },
      { text: "清晰易读，屏幕适配最佳", options: { color: C.textMuted } },
    ], { x: 0.5, y: 3.6, w: 4, h: 1.2, fontSize: 10, fontFace: "Calibri", margin: 0 });

    s.addText("设计风格", { x: 5.0, y: 3.2, w: 4, h: 0.35, fontSize: 16, fontFace: "Georgia", bold: true, color: C.jadeLight, margin: 0 });
    s.addText([
      { text: "考古暖黑 (Archaeological Warm Dark)", options: { breakLine: true, color: C.gold } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "以考古地层为灵感，深色基底搭配玉石绿与古金，模拟「地下发掘现场」的沉浸氛围。叠加粒子浮尘、噪点纹理、暖光光晕营造考古现场的尘土感与神秘感。", options: { color: C.textMuted } },
    ], { x: 5.0, y: 3.6, w: 4.5, h: 1.2, fontSize: 10, fontFace: "Calibri", margin: 0 });

    addPageNumber(s, 9, TOTAL, true);
  }

  // ═══════════════ SLIDE 10: TECH (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "技术路线", "TECHNICAL ROADMAP");

    const techs = [
      { title: "HTML5 + CSS3", items: ["语义化结构", "CSS Grid / Flexbox 布局", "CSS Animation 过渡动画", "CSS scroll-snap 时间轴"], color: C.gold },
      { title: "JavaScript (ES6+)", items: ["Touch Events 触摸交互", "Drag & Drop API 拖拽拼合", "Canvas 2D 刮擦算法", "html2canvas 证书截图"], color: C.jade },
      { title: "GSAP 动画库", items: ["页面切换过渡动画", "粒子浮尘循环动画", "祭祀场景激活动效", "滚动触发时间线"], color: C.terracotta },
    ];

    techs.forEach((t, i) => {
      const tx = 0.7 + i * 3.05;
      const ty = 1.55;

      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: ty, w: 2.8, h: 2.6, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: ty, w: 2.8, h: 0.06, fill: { color: t.color } });
      s.addText(t.title, { x: tx + 0.2, y: ty + 0.2, w: 2.4, h: 0.35, fontSize: 14, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });

      t.items.forEach((item, j) => {
        s.addShape(pres.shapes.OVAL, { x: tx + 0.25, y: ty + 0.75 + j * 0.42, w: 0.1, h: 0.1, fill: { color: t.color } });
        s.addText(item, { x: tx + 0.5, y: ty + 0.68 + j * 0.42, w: 2.1, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.textBody, margin: 0 });
      });
    });

    s.addText("移动端适配：微信内置浏览器 / Safari / Chrome · 响应式 375-768px · 触摸优化 44px最小热区 · prefers-reduced-motion 支持", {
      x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 10, fontFace: "Calibri", color: "888888", margin: 0
    });
    addPageNumber(s, 10, TOTAL, false);
  }

  // ═══════════════ SLIDE 11: EXPECTED OUTCOMES (dark) ═══════════════
  {
    const s = pres.addSlide(); darkBg(s);
    sectionTitle(s, "预期成果", "EXPECTED OUTCOMES", true);

    const outcomes = [
      { num: "01", title: "完整的H5交互作品", desc: "包含6个场景、5种交互形式的可运行HTML5页面，适配移动端浏览器，可在微信中直接打开体验。" },
      { num: "02", title: "石家河文化数字名片", desc: "以「玉见·石家河」为品牌概念，打造石家河文化在移动互联网时代的第一张交互式数字名片。" },
      { num: "03", title: "考古知识趣味化范本", desc: "探索「体验式科普」模式，为其他文化遗产的数字化传播提供可参考的交互设计思路。" },
      { num: "04", title: "创新交互技术实践", desc: "Canvas刮擦、序列帧旋转、拖拽拼合等技术的H5应用实践，为同类项目积累技术经验。" },
    ];

    outcomes.forEach((o, i) => {
      const oy = 1.5 + i * 0.92;
      s.addText(o.num, { x: 0.5, y: oy, w: 0.55, h: 0.45, fontSize: 26, fontFace: "Georgia", bold: true, color: C.gold, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 1.15, y: oy + 0.05, w: 0.015, h: 0.7, fill: { color: i % 2 === 0 ? C.jade : C.gold } });
      s.addText(o.title, { x: 1.35, y: oy, w: 7.5, h: 0.3, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0 });
      s.addText(o.desc, { x: 1.35, y: oy + 0.33, w: 7.5, h: 0.42, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    });
    addPageNumber(s, 11, TOTAL, true);
  }

  // ═══════════════ SLIDE 12: TIMELINE (light) ═══════════════
  {
    const s = pres.addSlide(); lightBg(s);
    sectionTitle(s, "进度计划", "PROJECT TIMELINE");

    const phases = [
      { date: "6/30 - 7/1", task: "选题汇报PPT", desc: "确定选题方向、完成选题汇报PPT制作", color: C.gold },
      { date: "7/2 - 7/3", task: "信息搜集Word", desc: "搜集石家河文化资料、文物素材、撰写信息搜集文档", color: C.terracotta },
      { date: "7/4 - 7/5", task: "放假休息", desc: "端午节假期", color: "888888" },
      { date: "7/6 - 7/7", task: "展示初稿", desc: "完成H5全部6个场景的初稿开发与内部展示", color: C.jade },
      { date: "7/8 - 7/9", task: "作品汇报PPT", desc: "基于初稿反馈优化作品、完成作品汇报PPT", color: C.gold },
      { date: "7/10", task: "提交最终作品", desc: "整合所有产出，打包提交期末作品", color: C.terracotta },
    ];

    phases.forEach((p, i) => {
      const py = 1.4 + i * 0.68;

      // Timeline dot
      s.addShape(pres.shapes.OVAL, { x: 0.8, y: py + 0.1, w: 0.18, h: 0.18, fill: { color: p.color } });
      // Vertical line (except last)
      if (i < phases.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, { x: 0.875, y: py + 0.3, w: 0.025, h: 0.38, fill: { color: "DDDDDD" } });
      }

      // Date
      s.addText(p.date, { x: 1.2, y: py - 0.03, w: 1.5, h: 0.35, fontSize: 12, fontFace: "Calibri", bold: true, color: p.color, margin: 0 });
      // Task
      s.addText(p.task, { x: 2.7, y: py - 0.03, w: 2.2, h: 0.35, fontSize: 13, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      // Desc
      s.addText(p.desc, { x: 5.0, y: py - 0.03, w: 4.5, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });

    addPageNumber(s, 12, TOTAL, false);
  }

  // ═══════════════ SLIDE 13: THANKS (dark) ═══════════════
  {
    const s = pres.addSlide(); darkBg(s);

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.jade } });

    s.addText("谢谢聆听", {
      x: 0.7, y: 1.6, w: 8.6, h: 1.0,
      fontSize: 52, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.65, w: 1.5, h: 0.025, fill: { color: C.gold } });
    s.addText("玉见·石家河 — 让长江文明在指尖苏醒", {
      x: 0.7, y: 2.9, w: 8.6, h: 0.5,
      fontSize: 16, fontFace: "Calibri", color: C.textMuted, margin: 0
    });
    s.addText("吴泽远 · 2026年6月30日", {
      x: 0.7, y: 4.0, w: 8.6, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.gold, margin: 0
    });
    addPageNumber(s, 13, TOTAL, true);
  }

  const outPath = "C:/Users/admin/Desktop/玉见石家河/选题汇报_玉见石家河_v2.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("PPT generated: " + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
