const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaBookOpen, FaFire, FaGem, FaHistory, FaScroll, FaCertificate } = require("react-icons/fa");

async function iconToBase64Png(Icon, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Icon, { color, size: String(size) }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
}

const C = {
  bgDark: "18181B", bgCard: "27272A", gold: "CA8A04", jade: "6B8E5A",
  terracotta: "8B5E3C", textLight: "F0E8D8", textMuted: "B8A99A",
  bgLight: "FAFAFA", textDark: "18181B", textBody: "3D3D3D", white: "FFFFFF"
};

const mkShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.10 });
function darkBg(s) { s.background = { color: C.bgDark }; }
function lightBg(s) { s.background = { color: C.bgLight }; }

function addPN(slide, num, total, dark) {
  slide.addText(`${num} / ${total}`, { x: 8.8, y: 5.1, w: 1, h: 0.35, fontSize: 8, fontFace: "Calibri", color: dark ? C.textMuted : "999999", align: "right" });
}

function secTitle(slide, title, sub, dark) {
  slide.addText(title, { x: 0.7, y: 0.3, w: 8.6, h: 0.6, fontSize: 28, fontFace: "Georgia", bold: true, color: dark ? C.textLight : C.textDark, margin: 0 });
  if (sub) slide.addText(sub, { x: 0.7, y: 0.85, w: 8.6, h: 0.3, fontSize: 11, fontFace: "Calibri", color: dark ? C.textMuted : "888888", margin: 0 });
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "吴泽远";
  pres.title = "玉见·石家河 — 选题汇报";

  const iBook = await iconToBase64Png(FaBookOpen, "#CA8A04");
  const iFire = await iconToBase64Png(FaFire, "#CA8A04");
  const iGem = await iconToBase64Png(FaGem, "#6B8E5A");
  const iHist = await iconToBase64Png(FaHistory, "#CA8A04");
  const iScroll = await iconToBase64Png(FaScroll, "#6B8E5A");
  const iCert = await iconToBase64Png(FaCertificate, "#CA8A04");

  const TOTAL = 13;

  // SLIDE 1: COVER (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.jade } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.0, h: 0.02, fill: { color: C.gold } });
    s.addText("玉见·石家河", { x: 0.7, y: 1.15, w: 8, h: 1.2, fontSize: 52, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0 });
    s.addText("H5 交互作品选题汇报", { x: 0.7, y: 2.35, w: 8, h: 0.5, fontSize: 20, fontFace: "Calibri", color: C.gold, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.1, w: 3, h: 0.012, fill: { color: C.textMuted } });
    s.addText([{ text: "湖北天门 · 石家河文化", options: { breakLine: true, fontSize: 14, color: C.textLight } }, { text: "从圣火到玉匣 · 四千年文明的交互叙事", options: { breakLine: true, fontSize: 12, color: C.textMuted } }, { text: "", options: { breakLine: true, fontSize: 8 } }, { text: "汇报人：吴泽远  2026年7月", options: { fontSize: 13, color: C.textMuted } }], { x: 0.7, y: 3.35, w: 5, h: 1.5, fontFace: "Calibri", margin: 0 });
    addPN(s, 1, TOTAL, true);
  }

  // SLIDE 2: TOC (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "目录", "CONTENTS");
    const items = [
      { num: "01", title: "选题背景", desc: "石家河文化与长江文明" },
      { num: "02", title: "选题意义", desc: "让文物活起来 · 讲好长江文明故事" },
      { num: "03", title: "创意构思", desc: "从圣火到玉匣的交互叙事线" },
      { num: "04", title: "作品流程", desc: "漫画三章→玉匣探方→时间轴→证书" },
      { num: "05", title: "交互设计", desc: "刮擦+点击+3D+翻页+拖拽 五种交互" },
      { num: "06", title: "视觉设计", desc: "考古暖黑 + 古金玉绿配色系统" },
      { num: "07", title: "技术路线", desc: "HTML5 + Canvas + GSAP" },
      { num: "08", title: "创新点与进度", desc: "差异化亮点 + 团队分工 + 时间规划" },
    ];
    items.forEach((item, i) => {
      const r = Math.floor(i / 2), c = i % 2, x = 0.7 + c * 4.5, y = 1.55 + r * 0.47;
      s.addText(item.num, { x, y, w: 0.5, h: 0.3, fontSize: 18, fontFace: "Georgia", bold: true, color: C.jade, margin: 0 });
      s.addText([{ text: item.title, options: { bold: true, fontSize: 13, color: C.textDark, breakLine: true } }, { text: item.desc, options: { fontSize: 9.5, color: "888888" } }], { x: x + 0.55, y, w: 3.6, h: 0.42, fontFace: "Calibri", margin: 0 });
    });
    addPN(s, 2, TOTAL, false);
  }

  // SLIDE 3: BACKGROUND (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "选题背景", "BACKGROUND");
    s.addText([{ text: "石家河文化 —— 长江中游史前文明之巅", options: { bold: true, fontSize: 16, color: C.gold, breakLine: true } }, { text: "", options: { breakLine: true, fontSize: 6 } }, { text: "石家河遗址位于湖北省天门市，是中国长江中游迄今发现规模最大、等级最高的新石器时代聚落遗址群，总面积约8平方公里，距今6500-4000年。其精美玉器工艺冠绝长江流域，实证长江与黄河同为中华文明核心发源地。", options: { breakLine: true, fontSize: 12, color: C.textBody } }, { text: "", options: { breakLine: true, fontSize: 6 } }, { text: "2017年入选全国十大考古新发现，2021年入选百年百大考古发现。", options: { fontSize: 12, color: C.jade, bold: true } }], { x: 0.7, y: 1.3, w: 5.8, h: 3.5, fontFace: "Calibri", margin: 0, valign: "top" });
    [{ num: "70+", label: "考古发掘年数", color: C.gold }, { num: "8km²", label: "遗址总面积", color: C.jade }, { num: "200+", label: "出土玉器件数", color: C.terracotta }].forEach((st, i) => {
      const cy = 1.3 + i * 1.2;
      s.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: cy, w: 2.5, h: 0.95, fill: { color: C.bgCard }, shadow: mkShadow() });
      s.addText(st.num, { x: 7.15, y: cy + 0.05, w: 1.5, h: 0.5, fontSize: 30, fontFace: "Georgia", bold: true, color: st.color, margin: 0 });
      s.addText(st.label, { x: 7.15, y: cy + 0.5, w: 2.2, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });
    addPN(s, 3, TOTAL, false);
  }

  // SLIDE 4: SIGNIFICANCE (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "选题意义", "SIGNIFICANCE");
    const cards = [
      { icon: iBook, title: "文化传承", desc: "石家河作为长江文明的代表，其玉器工艺和祭祀文化承载先民精神世界。以H5形式让更多年轻人了解并认同长江文明根脉。" },
      { icon: iFire, title: "交互叙事创新", desc: "以漫画分镜+刮擦考古+3D鉴赏的复合交互形式，探索文物数字化表达的新可能，区别于传统图文浏览和单一3D展示。" },
      { icon: iGem, title: "学术传播价值", desc: "石家河遗址考古成果丰富但大众认知度低。将考古知识转化为互动叙事，搭建学术与公众的桥梁，践行「讲好长江文明故事」。" },
    ];
    cards.forEach((c, i) => {
      const cx = 0.7 + i * 3.0;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.6, w: 2.7, h: 2.8, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.6, w: 2.7, h: 0.05, fill: { color: i === 0 ? C.gold : i === 1 ? C.jade : C.terracotta } });
      s.addImage({ data: c.icon, x: cx + 0.25, y: 1.85, w: 0.35, h: 0.35 });
      s.addText(c.title, { x: cx + 0.7, y: 1.82, w: 1.7, h: 0.35, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(c.desc, { x: cx + 0.25, y: 2.35, w: 2.2, h: 1.8, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0, valign: "top" });
    });
    addPN(s, 4, TOTAL, false);
  }

  // SLIDE 5: CREATIVE CONCEPT (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    secTitle(s, "创意构思", "CREATIVE CONCEPT", true);
    s.addText("「从圣火到玉匣」", { x: 0.7, y: 1.5, w: 8.6, h: 0.7, fontSize: 36, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0 });
    s.addText("一场四千年文明的交互叙事之旅", { x: 0.7, y: 2.1, w: 8.6, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.gold, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.7, w: 8.6, h: 0.012, fill: { color: C.textMuted } });
    s.addText("核心叙事线", { x: 0.7, y: 2.9, w: 3, h: 0.3, fontSize: 15, fontFace: "Georgia", bold: true, color: C.jade, margin: 0 });
    s.addText("用户从「圣火仪式」的漫画分镜开始，经历备礼、燃火、宝匣显现三章，玉匣从火焰中浮现后进入地质探方，亲手发掘文物、360°鉴赏，最终穿越七十年考古时光，获得专属考古证书。", { x: 0.7, y: 3.25, w: 8.6, h: 0.8, fontSize: 13, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    s.addText("设计理念", { x: 0.7, y: 4.05, w: 3, h: 0.3, fontSize: 15, fontFace: "Georgia", bold: true, color: C.jade, margin: 0 });
    s.addText("以「叙事驱动交互」取代「功能堆砌」——漫画渲染情绪、刮擦模拟发掘、3D满足探索、翻页制造节奏。每一段交互服务于故事，而非炫技。", { x: 0.7, y: 4.35, w: 8.6, h: 0.6, fontSize: 13, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    addPN(s, 5, TOTAL, true);
  }

  // SLIDE 6: FLOW (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    secTitle(s, "作品流程", "USER FLOW", true);
    const flow = [
      { label: "加载动画", sub: "凤凰旋转·进度条" },
      { label: "漫画上篇·备礼", sub: "8格分镜·点击展开" },
      { label: "漫画下篇·燃火", sub: "8格分镜·点击展开" },
      { label: "终章·圣火宝匣", sub: "3格+玉匣浮现" },
      { label: "玉匣卷轴", sub: "石家河文明介绍" },
      { label: "地质探方", sub: "6文物刮擦发掘" },
      { label: "3D鉴赏", sub: "真实照片360°旋转" },
      { label: "时间轴", sub: "七十年考古历程" },
      { label: "考古证书", sub: "输入姓名·保存分享" },
    ];
    flow.forEach((f, i) => {
      const fy = 1.4 + i * 0.44;
      s.addText(f.label, { x: 0.5, y: fy, w: 2.5, h: 0.28, fontSize: 13, fontFace: "Georgia", bold: true, color: C.gold, margin: 0 });
      s.addText(f.sub, { x: 3.1, y: fy, w: 4, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
      if (i < flow.length - 1) s.addText("↓", { x: 1.55, y: fy + 0.26, w: 0.4, h: 0.18, fontSize: 10, color: C.jade, align: "center", margin: 0 });
    });
    addPN(s, 6, TOTAL, true);
  }

  // SLIDE 7: COMIC DETAIL (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "漫画三章设计", "COMIC CHAPTERS");
    const chapters = [
      { title: "上篇 · 备礼", items: "8格不规则漫画排版，点击弹出，描叙先民祭祀准备：祭司步入、玉琮礼天、玉璧礼地、玉圭祭祖、火盆静候" },
      { title: "下篇 · 燃火", items: "8格漫画，火焰主题：对天祷告、火星溅起、火焰燃起、凤鸟火光、先民跪拜、仪式完成" },
      { title: "终章 · 圣火宝匣", items: "3格漫画渐隐 → 黑屏 → 玉匣图从中心放大浮现，衔接下一页玉匣开启。上篇/下篇按钮翻页，全部看完才可翻" },
    ];
    chapters.forEach((ch, i) => {
      const cy = 1.5 + i * 1.25;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: cy, w: 9, h: 1.1, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: cy, w: 0.05, h: 1.1, fill: { color: i === 0 ? C.gold : i === 1 ? C.jade : C.terracotta } });
      s.addText(ch.title, { x: 0.75, y: cy + 0.1, w: 3, h: 0.3, fontSize: 16, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(ch.items, { x: 0.75, y: cy + 0.45, w: 8.5, h: 0.55, fontSize: 11, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });
    addPN(s, 7, TOTAL, false);
  }

  // SLIDE 8: INTERACTION (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "交互设计", "INTERACTION DESIGN (5种)");
    const its = [
      { title: "刮擦发掘", scene: "地质探方", desc: "Canvas不规则泥土层覆盖古画风文物图，手指擦拭逐渐显现，透明度随刮擦次数渐变", tech: "Canvas + destination-out" },
      { title: "漫画翻页", scene: "漫画三章", desc: "点击弹出下一格分镜（缩放弹入动画），全部看完解锁翻页按钮，三章递进叙事", tech: "CSS transition + visibility" },
      { title: "3D旋转鉴赏", scene: "点击文物", desc: "真实多角度照片序列帧，拖拽旋转360°查看文物细节，带粒子浮尘背景", tech: "Image Sequence + Touch" },
      { title: "时间轴滑动", scene: "七秩寻踪", desc: "横向时间轴鼠标拖拽+滚轮，节点吸附居中，两侧节点渐变缩小透明", tech: "CSS transform + snap" },
      { title: "证书生成", scene: "文明回响", desc: "Canvas绘制考古证书，用户输入姓名嵌入，一键保存PNG图片分享", tech: "Canvas + toBlob" },
    ];
    its.forEach((item, i) => {
      const ix = 0.3 + i * 1.9, iy = 1.5;
      s.addShape(pres.shapes.RECTANGLE, { x: ix, y: iy, w: 1.75, h: 3.0, fill: { color: i % 2 === 0 ? C.bgCard : C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.OVAL, { x: ix + 0.1, y: iy + 0.12, w: 0.35, h: 0.35, fill: { color: C.jade, transparency: 85 } });
      s.addText(String(i + 1), { x: ix + 0.1, y: iy + 0.12, w: 0.35, h: 0.35, fontSize: 14, fontFace: "Georgia", bold: true, color: C.jade, align: "center", margin: 0 });
      s.addText(item.title, { x: ix + 0.5, y: iy + 0.1, w: 1.2, h: 0.3, fontSize: 13, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      s.addText(item.scene, { x: ix + 0.5, y: iy + 0.38, w: 1.2, h: 0.2, fontSize: 9, fontFace: "Calibri", color: C.gold, margin: 0 });
      s.addText(item.desc, { x: ix + 0.1, y: iy + 0.7, w: 1.55, h: 1.5, fontSize: 9, fontFace: "Calibri", color: C.textBody, margin: 0, valign: "top" });
      s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.1, y: iy + 2.4, w: 1.55, h: 0.3, fill: { color: C.bgLight } });
      s.addText(item.tech, { x: ix + 0.1, y: iy + 2.4, w: 1.55, h: 0.3, fontSize: 8, fontFace: "Calibri", align: "center", color: C.jade, margin: 0 });
    });
    addPN(s, 8, TOTAL, false);
  }

  // SLIDE 9: VISUAL (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    secTitle(s, "视觉设计", "VISUAL DESIGN", true);
    const palette = [{ hex: "141210", label: "地层黑" }, { hex: "1E1A16", label: "暖暗" }, { hex: "6B8E5A", label: "玉石绿" }, { hex: "BD9B4A", label: "古金" }, { hex: "8B5E3C", label: "陶土" }, { hex: "F0E8D8", label: "羊皮纸" }];
    palette.forEach((c, i) => {
      const px = 0.5 + i * 1.5;
      s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.5, w: 1.3, h: 0.7, fill: { color: c.hex } });
      s.addText(c.hex, { x: px, y: 2.28, w: 1.3, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });
      s.addText(c.label, { x: px, y: 2.46, w: 1.3, h: 0.18, fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });
    });
    s.addText("字体 · Georgia(标题) + Calibri(正文) + 楷体(卷轴)", { x: 0.5, y: 3.0, w: 9, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    s.addText("风格 · 「考古暖黑」——以考古地层为灵感，深色基底+玉石绿+古金，模拟地下发掘现场的沉浸氛围", { x: 0.5, y: 3.3, w: 9, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    s.addText("效果 · Canvas粒子浮尘 + 半透明噪点纹理 + 暖光text-shadow + 祥云多层视差滚动", { x: 0.5, y: 3.6, w: 9, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    addPN(s, 9, TOTAL, true);
  }

  // SLIDE 10: TECH (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "技术路线", "TECHNICAL ROADMAP");
    [{ title: "HTML5 + CSS3", items: ["语义化结构", "Flexbox/CSS Grid", "scroll-snap时间轴", "clip-path异形裁剪"], color: C.gold }, { title: "JavaScript ES6+", items: ["Canvas刮擦交互", "Touch Events", "图片序列帧旋转", "Canvas证书生成"], color: C.jade }, { title: "动画与视差", items: ["页面过渡动画", "祥云视差滚动", "粒子浮尘效果", "分镜弹入动画"], color: C.terracotta }].forEach((t, i) => {
      const tx = 0.7 + i * 3.05;
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 1.5, w: 2.8, h: 2.5, fill: { color: C.white }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 1.5, w: 2.8, h: 0.05, fill: { color: t.color } });
      s.addText(t.title, { x: tx + 0.2, y: 1.65, w: 2.4, h: 0.3, fontSize: 14, fontFace: "Georgia", bold: true, color: C.textDark, margin: 0 });
      t.items.forEach((item, j) => {
        s.addShape(pres.shapes.OVAL, { x: tx + 0.2, y: 2.15 + j * 0.38, w: 0.08, h: 0.08, fill: { color: t.color } });
        s.addText(item, { x: tx + 0.38, y: 2.08 + j * 0.38, w: 2.2, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textBody, margin: 0 });
      });
    });
    s.addText("移动端适配：微信/Safari/Chrome · 响应式375-768px · 触摸优化44px热区 · file://兼容", { x: 0.7, y: 4.3, w: 8.6, h: 0.3, fontSize: 10, fontFace: "Calibri", color: "888888", margin: 0 });
    addPN(s, 10, TOTAL, false);
  }

  // SLIDE 11: INNOVATION (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    secTitle(s, "创新点", "INNOVATION", true);
    [{ title: "叙事驱动交互", desc: "漫画渲染情绪→刮擦模拟发掘→3D满足探索→翻页制造节奏。交互服务于故事线，而非功能罗列" }, { title: "复合交互形式", desc: "五种差异化交互：刮擦+翻页+3D旋转+时间轴+证书，每种交互匹配特定内容场景，体验丰富且不重复" }, { title: "文化沉浸感", desc: "祥云多层视差+考古暖黑配色+古画风文物图+卷轴UI，从视觉到交互统一营造「考古现场」的沉浸氛围" }, { title: "石家河首次H5化", desc: "填补石家河文化在交互数字产品领域的空白，以长江中游史前文明中心定位差异化切入文博H5赛道" }].forEach((inv, i) => {
      const iy = 1.5 + i * 0.88;
      s.addText("0" + (i + 1), { x: 0.5, y: iy, w: 0.5, h: 0.35, fontSize: 22, fontFace: "Georgia", bold: true, color: C.gold, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 1.1, y: iy + 0.05, w: 0.012, h: 0.65, fill: { color: i % 2 === 0 ? C.jade : C.gold } });
      s.addText(inv.title, { x: 1.3, y: iy, w: 7, h: 0.28, fontSize: 15, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0 });
      s.addText(inv.desc, { x: 1.3, y: iy + 0.3, w: 7.5, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    });
    addPN(s, 11, TOTAL, true);
  }

  // SLIDE 12: TEAM + TIMELINE (light)
  {
    const s = pres.addSlide(); lightBg(s);
    secTitle(s, "进度计划与分工", "TIMELINE & TEAM");
    // Timeline
    const phases = [{ date: "6/30-7/1", task: "选题PPT", desc: "确定方向完成选题汇报" }, { date: "7/2-7/3", task: "信息搜集", desc: "资料+素材搜集文档" }, { date: "7/4-7/5", task: "放假", desc: "" }, { date: "7/6-7/7", task: "初稿展示", desc: "完成H5全部场景初稿" }, { date: "7/8-7/9", task: "作品汇报PPT", desc: "优化+完成汇报PPT" }, { date: "7/10", task: "提交作品", desc: "打包提交最终作品" }];
    phases.forEach((p, i) => {
      const py = 1.3 + i * 0.55;
      s.addShape(pres.shapes.OVAL, { x: 0.6, y: py + 0.06, w: 0.15, h: 0.15, fill: { color: ['#BD9B4A', '#8B5E3C', '#888', '#6B8E5A', '#BD9B4A', '#8B5E3C'][i] } });
      s.addText(p.date, { x: 0.9, y: py, w: 1.4, h: 0.25, fontSize: 11, fontFace: "Calibri", bold: true, color: C.textDark, margin: 0 });
      s.addText(p.task, { x: 2.4, y: py, w: 1.8, h: 0.25, fontSize: 12, fontFace: "Georgia", bold: true, color: ['#BD9B4A', '#8B5E3C', '#888', '#6B8E5A', '#BD9B4A', '#8B5E3C'][i], margin: 0 });
      s.addText(p.desc, { x: 4.3, y: py, w: 3, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textBody, margin: 0 });
    });
    // Team
    s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 1.3, w: 2.6, h: 3.2, fill: { color: C.bgDark } });
    s.addText("团队分工", { x: 7.4, y: 1.4, w: 2.2, h: 0.3, fontSize: 14, fontFace: "Georgia", bold: true, color: C.gold, margin: 0 });
    s.addText([{ text: "吴泽远 75%", options: { bold: true, color: C.textLight, breakLine: true, fontSize: 12 } }, { text: "策划·设计·开发·汇报", options: { color: C.jade, breakLine: true, fontSize: 9 } }, { text: "", options: { breakLine: true, fontSize: 6 } }, { text: "队友 25%", options: { bold: true, color: C.textLight, breakLine: true, fontSize: 12 } }, { text: "资料搜集·素材整理", options: { color: C.textMuted, fontSize: 9 } }], { x: 7.4, y: 1.8, w: 2.2, h: 2.5, fontFace: "Calibri", margin: 0 });
    addPN(s, 12, TOTAL, false);
  }

  // SLIDE 13: THANKS (dark)
  {
    const s = pres.addSlide(); darkBg(s);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.jade } });
    s.addText("谢谢聆听", { x: 0.7, y: 1.5, w: 8.6, h: 0.9, fontSize: 50, fontFace: "Georgia", bold: true, color: C.textLight, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.5, w: 1.5, h: 0.02, fill: { color: C.gold } });
    s.addText("玉见·石家河 — 从圣火到玉匣，四千年文明的交互叙事", { x: 0.7, y: 2.75, w: 8.6, h: 0.4, fontSize: 14, fontFace: "Calibri", color: C.textMuted, margin: 0 });
    s.addText("吴泽远 · 2026年7月", { x: 0.7, y: 3.8, w: 8.6, h: 0.4, fontSize: 14, fontFace: "Calibri", color: C.gold, margin: 0 });
    addPN(s, 13, TOTAL, true);
  }

  const outPath = "C:/Users/admin/Desktop/玉见石家河/选题汇报_玉见石家河_v3.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("PPT generated: " + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
