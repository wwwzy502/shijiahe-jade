const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Icons ──
const { FaSearch, FaEye, FaHandPaper, FaLayerGroup, FaCogs, FaLightbulb, FaUsers, FaCalendarAlt, FaHeart, FaArrowRight, FaGem, FaLandmark, FaCube, FaHistory } = require("react-icons/fa");
const { HiOutlineLightBulb, HiOutlineCube, HiOutlineSparkles } = require("react-icons/hi");

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

// ── Design Tokens (from ui-ux-pro-max) ──
const C = {
  bgDark:      "18181B",  // Museum/Gallery black
  bgCard:      "27272A",  // Secondary dark
  gold:        "CA8A04",  // Luxury gold accent
  jade:        "6B8E5A",  // Jade green (custom)
  terracotta:  "8B5E3C",  // Warm earth
  textLight:   "F0E8D8",  // Warm parchment (on dark)
  textMuted:   "B8A99A",  // Muted text on dark
  bgLight:     "FAFAFA",  // Light background for content
  textDark:    "18181B",   // Dark text on light
  textBody:    "3D3D3D",   // Body text on light
  white:       "FFFFFF",
  jadeLight:   "8CB07A",  // Lighter jade for icons on dark
};

// ── Helpers ──
const mkShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.10 });

function darkBg(slide) { slide.background = { color: C.bgDark }; }
function lightBg(slide) { slide.background = { color: C.bgLight }; }

function addPageNumber(slide, num, total, onDark = false) {
  slide.addText(`${num} / ${total}`, {
    x: 8.8, y: 5.1, w: 1, h: 0.35,
    fontSize: 8, fontFace: "Calibri",
    color: onDark ? C.textMuted : "999999",
    align: "right"
  });
}

function addBottomLine(slide, onDark = false) {
  // subtle bottom separator instead of accent line under title
}

function sectionTitle(slide, title, subtitle, onDark = false) {
  slide.addText(title, {
    x: 0.7, y: 0.3, w: 8.6, h: 0.65,
    fontSize: 28, fontFace: "Georgia", bold: true,
    color: onDark ? C.textLight : C.textDark,
    margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 0.9, w: 8.6, h: 0.35,
      fontSize: 12, fontFace: "Calibri",
      color: onDark ? C.textMuted : "888888",
      margin: 0
    });
  }
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "吴泽远";
  pres.title = "玉见·石家河 — H5交互作品选题汇报";

  // Pre-render icons
  const iconSearch     = await iconToBase64Png(FaSearch,      `#${C.gold}`, 256);
  const iconEye        = await iconToBase64Png(FaEye,         `#${C.jade}`, 256);
  const iconHand       = await iconToBase64Png(FaHandPaper,   `#${C.gold}`, 256);
  const iconLayer      = await iconToBase64Png(FaLayerGroup,  `#${C.jade}`, 256);
  const iconCogs       = await iconToBase64Png(FaCogs,        `#${C.gold}`, 256);
  const iconBulb       = await iconToBase64Png(FaLightbulb,   `#${C.jade}`, 256);
  const iconUsers      = await iconToBase64Png(FaUsers,       `#${C.gold}`, 256);
  const iconCal        = await iconToBase64Png(FaCalendarAlt, `#${C.jade}`, 256);
  const iconHeart      = await iconToBase64Png(FaHeart,       `#${C.gold}`, 256);
  const iconGem        = await iconToBase64Png(FaGem,         `#${C.jade}`, 256);
  const iconLandmark   = await iconToBase64Png(FaLandmark,    `#${C.gold}`, 256);
  const iconCube       = await iconToBase64Png(FaCube,        `#${C.jade}`, 256);
  const iconHistory    = await iconToBase64Png(FaHistory,     `#${C.gold}`, 256);

  // Icon in circle helper
  function addIconCircle(slide, iconData, x, y, circleColor) {
    slide.addShape(pres.shapes.OVAL, {
      x, y, w: 0.42, h: 0.42,
      fill: { color: circleColor, transparency: 20 }
    });
    slide.addImage({ data: iconData, x: x + 0.07, y: y + 0.07, w: 0.28, h: 0.28 });
  }

  const TOTAL = 14;

  // ═══════════════════════════════════════
  // SLIDE 1: COVER (dark)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    darkBg(s);

    // Decorative jade rectangle on left
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.12, h: 5.625,
      fill: { color: C.jade }
    });

    // Top gold thin line
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.0, w: 1.2, h: 0.025,
      fill: { color: C.gold }
    });

    // Main title
    s.addText("玉见·石家河", {
      x: 0.7, y: 1.2, w: 8, h: 1.3,
      fontSize: 54, fontFace: "Georgia", bold: true,
      color: C.textLight, margin: 0
    });

    // Subtitle
    s.addText("H5 交互作品选题汇报", {
      x: 0.7, y: 2.45, w: 8, h: 0.55,
      fontSize: 22, fontFace: "Calibri",
      color: C.gold, margin: 0
    });

    // Decorative line
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.2, w: 3.5, h: 0.015,
      fill: { color: C.textMuted }
    });

    // Info block
    s.addText([
      { text: "湖北天门 · 石家河文化", options: { breakLine: true, fontSize: 14, color: C.textLight } },
      { text: "长江中游史前文明中心", options: { breakLine: true, fontSize: 12, color: C.textMuted } },
      { text: "", options: { breakLine: true, fontSize: 8 } },
      { text: "汇报人：吴泽远", options: { breakLine: true, fontSize: 13, color: C.textMuted } },
      { text: "2026年7月", options: { fontSize: 13, color: C.textMuted } }
    ], {
      x: 0.7, y: 3.45, w: 5, h: 1.8,
      fontFace: "Calibri", margin: 0
    });
    addPageNumber(s, 1, TOTAL, true);
  }

  // ═══════════════════════════════════════
  // SLIDE 2: TOC (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "目  录", "CONTENTS");

    const items = [
      { num: "01", title: "选题背景", desc: "石家河文化概述与考古70年" },
      { num: "02", title: "选题意义", desc: "让文物活起来 · 讲好长江文明故事" },
      { num: "03", title: "竞品分析", desc: "现有文博H5案例与不足" },
      { num: "04", title: "作品概述", desc: "「玉见·石家河」核心创意与内容框架" },
      { num: "05", title: "交互与视觉设计", desc: "四种交互形式 + 考古暖黑设计系统" },
      { num: "06", title: "技术路线", desc: "HTML5 + Canvas + GSAP" },
      { num: "07", title: "创新点与进度", desc: "作品创新点 + 团队分工 + 三周计划" },
    ];

    items.forEach((item, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = 0.7 + col * 4.5;
      const y = 1.55 + row * 0.52;

      // Number accent
      s.addText(item.num, {
        x, y, w: 0.6, h: 0.4,
        fontSize: 20, fontFace: "Georgia", bold: true,
        color: C.jade, margin: 0
      });
      // Title + desc
      s.addText([
        { text: item.title, options: { bold: true, fontSize: 14, color: C.textDark, breakLine: true } },
        { text: item.desc, options: { fontSize: 10, color: "888888" } }
      ], {
        x: x + 0.65, y, w: 3.6, h: 0.45,
        fontFace: "Calibri", margin: 0
      });
    });

    addPageNumber(s, 2, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 3: BACKGROUND (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "选题背景", "BACKGROUND");

    // Left text area
    s.addText([
      { text: "石家河文化", options: { bold: true, fontSize: 18, color: C.jade, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "石家河遗址位于湖北省天门市，是中国长江中游地区迄今发现规模最大、保存最完整的新石器时代聚落遗址。遗址总面积约8平方公里，距今约6500-4000年。", options: { breakLine: true, fontSize: 12, color: C.textBody } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "石家河文化是长江中游史前文明的巅峰，其玉器制作工艺精湛，玉凤、玉虎、玉人首等文物被誉为'中华第一玉凤''长江流域最精美的史前玉器'，2017年入选'全国十大考古新发现'。", options: { breakLine: true, fontSize: 12, color: C.textBody } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "核心定位：长江中游史前文明中心", options: { fontSize: 12, color: C.gold, bold: true } },
    ], {
      x: 0.7, y: 1.5, w: 5.5, h: 3.5,
      fontFace: "Calibri", margin: 0, valign: "top"
    });

    // Right side - stat callouts
    const stats = [
      { num: "70+", label: "考古发掘年数", color: C.gold },
      { num: "8km²", label: "遗址总面积", color: C.jade },
      { num: "200+", label: "出土玉器件数", color: C.terracotta },
    ];
    stats.forEach((st, i) => {
      const cy = 1.5 + i * 1.25;
      // Card bg
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.8, y: cy, w: 2.7, h: 1.0,
        fill: { color: C.bgCard }, shadow: mkShadow()
      });
      s.addText(st.num, {
        x: 6.95, y: cy + 0.05, w: 1.5, h: 0.55,
        fontSize: 32, fontFace: "Georgia", bold: true,
        color: st.color, margin: 0
      });
      s.addText(st.label, {
        x: 6.95, y: cy + 0.55, w: 2.4, h: 0.3,
        fontSize: 11, fontFace: "Calibri",
        color: C.textBody, margin: 0
      });
    });

    addPageNumber(s, 3, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 4: SIGNIFICANCE (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "选题意义", "SIGNIFICANCE");

    // Three cards
    const cards = [
      { icon: iconLandmark, title: "时代呼应", desc: "响应'让文物活起来'国家文化战略，推动中华优秀传统文化创造性转化与创新性发展，以数字技术赋能文物传播。" },
      { icon: iconEye, title: "公众教育", desc: "突破地域限制，让更多人以互动方式了解石家河文化。虚拟考古体验降低考古知识门槛，激发公众对长江文明的兴趣。" },
      { icon: iconGem, title: "文化传承", desc: "石家河文化作为长江中游史前文明中心，其玉器文明价值尚未被广泛认知。H5形式利于社交传播，扩大文化影响力。" },
    ];

    cards.forEach((c, i) => {
      const cx = 0.7 + i * 3.0;
      const cy = 1.6;

      // Card
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: cy, w: 2.7, h: 3.2,
        fill: { color: C.white }, shadow: mkShadow()
      });
      // Top accent bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: cy, w: 2.7, h: 0.06,
        fill: { color: i === 0 ? C.gold : i === 1 ? C.jade : C.terracotta }
      });
      // Icon
      s.addImage({ data: c.icon, x: cx + 0.3, y: cy + 0.35, w: 0.4, h: 0.4 });
      // Title
      s.addText(c.title, {
        x: cx + 0.85, y: cy + 0.32, w: 1.6, h: 0.45,
        fontSize: 18, fontFace: "Georgia", bold: true,
        color: C.textDark, margin: 0
      });
      // Body
      s.addText(c.desc, {
        x: cx + 0.3, y: cy + 1.0, w: 2.1, h: 1.9,
        fontSize: 11, fontFace: "Calibri",
        color: C.textBody, margin: 0, valign: "top"
      });
    });

    addPageNumber(s, 4, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 5: COMPETITIVE ANALYSIS (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "竞品分析", "COMPETITIVE ANALYSIS");

    // Left: existing cases
    s.addText("现有文博类H5案例", {
      x: 0.7, y: 1.4, w: 4, h: 0.4,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.textDark, margin: 0
    });

    const cases = [
      { name: "故宫博物院 · 数字文物库", good: "藏品丰富、图像清晰", bad: "交互形式单一，仅为缩放浏览" },
      { name: "敦煌研究院 · 云游敦煌", good: "视觉精美、叙事性强", bad: "部分交互加载慢，依赖小程序" },
      { name: "国家博物馆 · 文物中国", good: "知识体系完整", bad: "偏重图文展示，参与感弱" },
    ];

    cases.forEach((c, i) => {
      const cy = 1.9 + i * 0.9;
      // Case name
      s.addText(c.name, {
        x: 0.7, y: cy, w: 4, h: 0.3,
        fontSize: 12, fontFace: "Calibri", bold: true,
        color: C.gold, margin: 0
      });
      s.addText([
        { text: "✓ " + c.good, options: { color: C.jade, breakLine: true } },
        { text: "✗ " + c.bad, options: { color: "CC4444" } },
      ], {
        x: 0.85, y: cy + 0.28, w: 3.8, h: 0.5,
        fontSize: 10, fontFace: "Calibri", margin: 0
      });
    });

    // Right: our gap
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: 1.4, w: 4, h: 3.5,
      fill: { color: C.bgDark }
    });

    s.addText("我们的填补", {
      x: 5.8, y: 1.6, w: 3.4, h: 0.4,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.gold, margin: 0
    });

    const gaps = [
      "石家河文化尚无H5交互作品",
      "现有文博H5多为被动浏览",
      "缺少'体验式科普'考古视角",
      "长江文明主题数字产品稀缺",
    ];
    gaps.forEach((g, i) => {
      s.addShape(pres.shapes.OVAL, {
        x: 5.85, y: 2.25 + i * 0.6, w: 0.15, h: 0.15,
        fill: { color: C.jade }
      });
      s.addText(g, {
        x: 6.15, y: 2.12 + i * 0.6, w: 3, h: 0.4,
        fontSize: 12, fontFace: "Calibri",
        color: C.textLight, margin: 0
      });
    });

    addPageNumber(s, 5, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 6: OVERVIEW (dark)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    darkBg(s);
    sectionTitle(s, "作品概述", "OVERVIEW", true);

    // Center title
    s.addText("「玉见·石家河」", {
      x: 0.7, y: 1.6, w: 8.6, h: 0.8,
      fontSize: 38, fontFace: "Georgia", bold: true,
      color: C.textLight, margin: 0
    });

    s.addText("一场穿越4000年的虚拟考古体验", {
      x: 0.7, y: 2.3, w: 8.6, h: 0.5,
      fontSize: 18, fontFace: "Calibri",
      color: C.gold, margin: 0
    });

    // Core concept
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.1, w: 8.6, h: 0.015,
      fill: { color: C.textMuted }
    });

    s.addText([
      { text: "核心隐喻：", options: { bold: true, color: C.jadeLight } },
      { text: "用户扮演考古学家，通过「发掘-鉴赏-复原-回顾-传承」五阶段的完整体验，", options: { color: C.textLight } },
    ], {
      x: 0.7, y: 3.3, w: 8.6, h: 0.5,
      fontSize: 13, fontFace: "Calibri", margin: 0
    });
    s.addText([
      { text: "在互动中感知石家河文明的玉魂之美与长江流域史前文明的辉煌。", options: { color: C.textLight } },
    ], {
      x: 0.7, y: 3.7, w: 8.6, h: 0.4,
      fontSize: 13, fontFace: "Calibri", margin: 0
    });

    // 6 scene flow
    const scenes = ["序幕·玉见", "发掘·拂尘", "鉴赏·凝视", "祭祀·礼敬", "长廊·寻踪", "尾声·回响"];
    const sceneColors = [C.gold, C.terracotta, C.jade, C.gold, C.jadeLight, C.gold];
    scenes.forEach((sc, i) => {
      const sx = 0.7 + i * 1.55;
      s.addText(sc, {
        x: sx, y: 4.35, w: 1.4, h: 0.35,
        fontSize: 10, fontFace: "Calibri", bold: true,
        color: sceneColors[i], align: "center", margin: 0
      });
      if (i < 5) {
        s.addText("→", {
          x: sx + 1.1, y: 4.35, w: 0.4, h: 0.35,
          fontSize: 10, color: C.textMuted, align: "center", margin: 0
        });
      }
    });
    addPageNumber(s, 6, TOTAL, true);
  }

  // ═══════════════════════════════════════
  // SLIDE 7: CONTENT FRAMEWORK (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "内容框架", "CONTENT FRAMEWORK");

    const pages = [
      { id: "01", title: "序幕「玉见」", desc: "玉凤剪影浮现，粒子浮尘背景，营造考古神秘感，引导用户'开启探索'", color: C.gold },
      { id: "02", title: "发掘「拂去尘埃」", desc: "Canvas刮擦交互，手指擦拭泥土层，发掘玉虎等文物", color: C.terracotta },
      { id: "03", title: "鉴赏「凝视为真」", desc: "多角度序列帧旋转，拖拽查看文物360°细节，切换不同玉器", color: C.jade },
      { id: "04", title: "祭祀「礼敬天地」", desc: "拖拽拼合祭祀场景元素，全部归位后场景'激活'", color: C.gold },
      { id: "05", title: "长廊「七秩寻踪」", desc: "横向时间轴滑动，回顾1954-2024七十年考古历程", color: C.jadeLight },
      { id: "06", title: "尾声「文明的回响」", desc: "生成考古发现证书，html2canvas保存分享，首尾呼应", color: C.terracotta },
    ];

    pages.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = 0.7 + col * 4.5;
      const py = 1.45 + row * 1.25;

      // Card
      s.addShape(pres.shapes.RECTANGLE, {
        x: px, y: py, w: 4.1, h: 1.1,
        fill: { color: C.white }, shadow: mkShadow()
      });
      // Left accent color bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: px, y: py, w: 0.06, h: 1.1,
        fill: { color: p.color }
      });
      // Number
      s.addText(p.id, {
        x: px + 0.25, y: py + 0.1, w: 0.5, h: 0.3,
        fontSize: 20, fontFace: "Georgia", bold: true,
        color: p.color, margin: 0
      });
      // Title
      s.addText(p.title, {
        x: px + 0.75, y: py + 0.1, w: 3, h: 0.3,
        fontSize: 14, fontFace: "Georgia", bold: true,
        color: C.textDark, margin: 0
      });
      // Desc
      s.addText(p.desc, {
        x: px + 0.25, y: py + 0.5, w: 3.6, h: 0.5,
        fontSize: 10, fontFace: "Calibri",
        color: C.textBody, margin: 0
      });
    });

    addPageNumber(s, 7, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 8: INTERACTION DESIGN (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "交互设计", "INTERACTION DESIGN");

    const interactions = [
      { icon: iconHand, title: "刮擦揭示", scene: "场景二 · 发掘", desc: "Canvas橡皮擦算法，globalCompositeOperation: destination-out，手指滑动擦除泥土层露出文物。擦除>60%面积激活详情按钮。", tech: "Canvas 2D API" },
      { icon: iconCube, title: "序列帧旋转", scene: "场景三 · 鉴赏", desc: "提供6-8张不同角度文物照片，根据拖拽距离动态切换图片，模拟3D旋转效果。底部缩略图栏左右滑动切换文物。", tech: "Image Sequence + Touch" },
      { icon: iconLayer, title: "拖拽拼合", scene: "场景四 · 祭祀", desc: "底部元素拖入场景虚线目标区，正确则落入+光晕反馈，错误则弹回原位。全部归位后触发场景'激活'动画。", tech: "Drag & Drop + CSS Anim" },
      { icon: iconHistory, title: "惯性滑动", scene: "场景五 · 长廊", desc: "横向时间轴带惯性滚动+吸附居中，节点选中放大联动下方详情卡片。支持触摸和鼠标滚轮。", tech: "CSS scroll-snap + JS" },
    ];

    interactions.forEach((item, i) => {
      const ix = 0.5 + i * 2.35;
      const iy = 1.55;

      // Card
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix, y: iy, w: 2.15, h: 3.5,
        fill: { color: i % 2 === 0 ? C.bgCard : C.white },
        shadow: mkShadow()
      });

      // Mini icon in colored circle at top
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.15, y: iy + 0.2, w: 0.45, h: 0.45,
        fill: { color: C.jade, transparency: 15 }
      });
      s.addImage({ data: item.icon, x: ix + 0.23, y: iy + 0.28, w: 0.29, h: 0.29 });

      s.addText(item.title, {
        x: ix + 0.7, y: iy + 0.2, w: 1.3, h: 0.35,
        fontSize: 15, fontFace: "Georgia", bold: true,
        color: C.textDark, margin: 0
      });

      s.addText(item.scene, {
        x: ix + 0.7, y: iy + 0.52, w: 1.3, h: 0.25,
        fontSize: 9, fontFace: "Calibri",
        color: C.gold, margin: 0
      });

      // Description
      s.addText(item.desc, {
        x: ix + 0.15, y: iy + 0.95, w: 1.85, h: 1.8,
        fontSize: 9.5, fontFace: "Calibri",
        color: C.textBody, margin: 0, valign: "top"
      });

      // Tech tag
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + 0.15, y: iy + 2.95, w: 1.85, h: 0.35,
        fill: { color: C.bgLight }
      });
      s.addText(item.tech, {
        x: ix + 0.15, y: iy + 2.95, w: 1.85, h: 0.35,
        fontSize: 8.5, fontFace: "Calibri", align: "center",
        color: C.jade, margin: 0
      });
    });

    addPageNumber(s, 8, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 9: VISUAL DESIGN (dark)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    darkBg(s);
    sectionTitle(s, "视觉设计", "VISUAL DESIGN", true);

    // Color palette display
    const palette = [
      { hex: "141210", label: "主背景·地层黑", textColor: C.textLight },
      { hex: "1E1A16", label: "次级背景·暖暗", textColor: C.textLight },
      { hex: "6B8E5A", label: "玉石绿·强调", textColor: C.white },
      { hex: "BD9B4A", label: "古金·高亮", textColor: C.white },
      { hex: "8B5E3C", label: "陶土·辅助", textColor: C.white },
      { hex: "F0E8D8", label: "羊皮纸·文字", textColor: C.bgDark },
    ];

    palette.forEach((c, i) => {
      const px = 0.5 + i * 1.55;
      // Color swatch
      s.addShape(pres.shapes.RECTANGLE, {
        x: px, y: 1.6, w: 1.35, h: 0.8,
        fill: { color: c.hex }
      });
      s.addText(c.hex, {
        x: px, y: 2.5, w: 1.35, h: 0.25,
        fontSize: 9, fontFace: "Calibri",
        color: C.textMuted, align: "center", margin: 0
      });
      s.addText(c.label, {
        x: px, y: 2.72, w: 1.35, h: 0.2,
        fontSize: 8, fontFace: "Calibri",
        color: C.textMuted, align: "center", margin: 0
      });
    });

    // Typography section
    s.addText("字体系统", {
      x: 0.5, y: 3.2, w: 3, h: 0.35,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.jadeLight, margin: 0
    });

    const fontInfo = [
      { role: "大标题", font: "Georgia (Serif)", size: "36-54pt Bold", desc: "古典衬线，传递历史厚重感" },
      { role: "正文/按钮", font: "Calibri (Sans-serif)", size: "11-13pt Regular", desc: "清晰易读，屏幕适配最佳" },
    ];
    fontInfo.forEach((f, i) => {
      const fy = 3.65 + i * 0.7;
      s.addText(f.role, {
        x: 0.5, y: fy, w: 1.5, h: 0.25,
        fontSize: 12, fontFace: "Calibri", bold: true,
        color: C.gold, margin: 0
      });
      s.addText(f.font + " · " + f.size + " · " + f.desc, {
        x: 2.1, y: fy, w: 7, h: 0.6,
        fontSize: 10, fontFace: "Calibri",
        color: C.textMuted, margin: 0
      });
    });

    // Effects
    s.addText("核心效果", {
      x: 0.5, y: 4.5, w: 3, h: 0.35,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.jadeLight, margin: 0
    });
    s.addText("Canvas粒子浮尘 · 半透明噪点纹理 · 暖光text-shadow · 毛玻璃卡片(backdrop-blur) · 400ms淡入+上移过渡", {
      x: 0.5, y: 4.85, w: 9, h: 0.3,
      fontSize: 10, fontFace: "Calibri",
      color: C.textMuted, margin: 0
    });

    addPageNumber(s, 9, TOTAL, true);
  }

  // ═══════════════════════════════════════
  // SLIDE 10: TECHNICAL ROADMAP (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "技术路线", "TECHNICAL ROADMAP");

    const techs = [
      { title: "HTML5 + CSS3", items: ["语义化结构", "CSS Grid / Flexbox 布局", "CSS Animation 过渡动画", "CSS scroll-snap 时间轴"], color: C.gold },
      { title: "JavaScript (ES6+)", items: ["Touch Events 触摸交互", "Drag & Drop API", "Canvas 2D 刮擦算法", "html2canvas 证书截图"], color: C.jade },
      { title: "GSAP 动画库", items: ["页面切换过渡动画", "粒子浮尘循环动画", "祭祀场景激活动效", "滚动触发时间线"], color: C.terracotta },
    ];

    techs.forEach((t, i) => {
      const tx = 0.7 + i * 3.05;
      const ty = 1.55;

      s.addShape(pres.shapes.RECTANGLE, {
        x: tx, y: ty, w: 2.8, h: 2.5,
        fill: { color: C.white }, shadow: mkShadow()
      });

      s.addShape(pres.shapes.RECTANGLE, {
        x: tx, y: ty, w: 2.8, h: 0.06,
        fill: { color: t.color }
      });

      s.addText(t.title, {
        x: tx + 0.2, y: ty + 0.2, w: 2.4, h: 0.35,
        fontSize: 14, fontFace: "Georgia", bold: true,
        color: C.textDark, margin: 0
      });

      t.items.forEach((item, j) => {
        s.addShape(pres.shapes.OVAL, {
          x: tx + 0.25, y: ty + 0.75 + j * 0.4, w: 0.1, h: 0.1,
          fill: { color: t.color }
        });
        s.addText(item, {
          x: tx + 0.5, y: ty + 0.68 + j * 0.4, w: 2.1, h: 0.3,
          fontSize: 10, fontFace: "Calibri",
          color: C.textBody, margin: 0
        });
      });
    });

    // Mobile compatibility
    s.addText("移动端适配：微信内置浏览器 / Safari / Chrome · 响应式 375-768px · 触摸优化 44px最小热区 · prefers-reduced-motion", {
      x: 0.7, y: 4.4, w: 8.6, h: 0.4,
      fontSize: 10, fontFace: "Calibri",
      color: "888888", margin: 0
    });

    addPageNumber(s, 10, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 11: INNOVATION (dark)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    darkBg(s);
    sectionTitle(s, "创新点", "INNOVATION", true);

    const innovations = [
      { num: "01", title: "考古隐喻的沉浸叙事", desc: "首次以'考古发掘'作为H5核心互动隐喻，将展览浏览转化为主动探索，用户从观看者变为参与者。" },
      { num: "02", title: "Canvas刮擦+序列帧双重物感", desc: "刮擦模拟发掘触感，多角度序列帧还原文物'把玩'体验，超越传统图文放大镜。" },
      { num: "03", title: "仪式复原交互", desc: "祭祀场景不仅是展示，而是让用户通过拖拽拼合'重建'仪式，完成时激活场景动画，强化参与记忆。" },
      { num: "04", title: "石家河文化首次H5化", desc: "填补石家河文化在交互数字产品领域的空白，以'长江中游史前文明中心'定位差异化切入。" },
    ];

    innovations.forEach((inv, i) => {
      const iy = 1.5 + i * 0.92;

      // Number
      s.addText(inv.num, {
        x: 0.5, y: iy, w: 0.55, h: 0.45,
        fontSize: 26, fontFace: "Georgia", bold: true,
        color: C.gold, margin: 0
      });
      // Vertical line
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.15, y: iy + 0.05, w: 0.015, h: 0.7,
        fill: { color: i % 2 === 0 ? C.jade : C.gold }
      });
      // Title + desc
      s.addText(inv.title, {
        x: 1.35, y: iy, w: 7.5, h: 0.3,
        fontSize: 15, fontFace: "Georgia", bold: true,
        color: C.textLight, margin: 0
      });
      s.addText(inv.desc, {
        x: 1.35, y: iy + 0.33, w: 7.5, h: 0.42,
        fontSize: 11, fontFace: "Calibri",
        color: C.textMuted, margin: 0
      });
    });

    addPageNumber(s, 11, TOTAL, true);
  }

  // ═══════════════════════════════════════
  // SLIDE 12: TEAM DIVISION (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "团队分工", "TEAM DIVISION");

    // Me - main role
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.55, w: 5.5, h: 3.5,
      fill: { color: C.bgDark }
    });

    s.addText("吴泽远", {
      x: 0.8, y: 1.7, w: 5, h: 0.5,
      fontSize: 26, fontFace: "Georgia", bold: true,
      color: C.gold, margin: 0
    });
    s.addText("项目负责人 · 核心贡献占比 75%", {
      x: 0.8, y: 2.15, w: 5, h: 0.3,
      fontSize: 12, fontFace: "Calibri",
      color: C.jadeLight, margin: 0
    });

    const myTasks = [
      "选题策划与文案撰写",
      "界面视觉设计（全套设计系统定义）",
      "全部前端代码编写（HTML/CSS/JS/Canvas）",
      "交互逻辑与动效实现",
      "PPT制作与最终答辩汇报",
    ];
    myTasks.forEach((t, i) => {
      s.addShape(pres.shapes.OVAL, {
        x: 0.85, y: 2.75 + i * 0.42, w: 0.12, h: 0.12,
        fill: { color: C.gold }
      });
      s.addText(t, {
        x: 1.15, y: 2.65 + i * 0.42, w: 4.5, h: 0.33,
        fontSize: 11, fontFace: "Calibri",
        color: C.textLight, margin: 0
      });
    });

    // Teammate
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: 1.55, w: 3.4, h: 3.5,
      fill: { color: C.white }, shadow: mkShadow()
    });

    s.addText("队友", {
      x: 6.5, y: 1.7, w: 2.8, h: 0.5,
      fontSize: 22, fontFace: "Georgia", bold: true,
      color: C.textDark, margin: 0
    });
    s.addText("资料搜集与素材整理", {
      x: 6.5, y: 2.15, w: 2.8, h: 0.3,
      fontSize: 12, fontFace: "Calibri",
      color: C.gold, margin: 0
    });

    const mateTasks = [
      "石家河文化资料搜集",
      "文物图片素材整理",
      "时间轴考古数据核实",
      "部分场景文案初稿",
    ];
    mateTasks.forEach((t, i) => {
      s.addShape(pres.shapes.OVAL, {
        x: 6.55, y: 2.75 + i * 0.42, w: 0.1, h: 0.1,
        fill: { color: C.jade }
      });
      s.addText(t, {
        x: 6.8, y: 2.65 + i * 0.42, w: 2.6, h: 0.33,
        fontSize: 11, fontFace: "Calibri",
        color: C.textBody, margin: 0
      });
    });

    addPageNumber(s, 12, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 13: TIMELINE (light)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    lightBg(s);
    sectionTitle(s, "进度计划", "PROJECT TIMELINE");

    // Gantt-like timeline: 3 weeks
    const weeks = ["第一周 (7.1-7.7)", "第二周 (7.8-7.14)", "第三周 (7.15-7.21)"];
    const phases = [
      { name: "素材搜集", start: 0, end: 0, color: C.terracotta },
      { name: "选题PPT & 方案Word", start: 0, end: 0, color: C.gold },
      { name: "界面视觉设计", start: 0, end: 1, color: C.jade },
      { name: "前端开发(6场景)", start: 1, end: 2, color: C.gold },
      { name: "交互调试 & 测试", start: 2, end: 2, color: C.terracotta },
      { name: "作品汇报PPT & 展示", start: 2, end: 2, color: C.jade },
    ];

    // Draw timeline grid
    const gridX = 1.5;
    const gridY = 1.65;
    const colW = 2.7;
    const rowH = 0.55;

    // Week headers
    weeks.forEach((w, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: gridX + i * colW, y: gridY, w: colW, h: 0.4,
        fill: { color: C.bgDark }
      });
      s.addText(w, {
        x: gridX + i * colW, y: gridY, w: colW, h: 0.4,
        fontSize: 10, fontFace: "Calibri", bold: true,
        color: C.textLight, align: "center", margin: 0
      });
    });

    // Phase labels
    phases.forEach((p, i) => {
      s.addText(p.name, {
        x: 0.15, y: gridY + 0.55 + i * rowH, w: 1.25, h: rowH,
        fontSize: 9, fontFace: "Calibri",
        color: C.textBody, align: "right", margin: 0
      });
    });

    // Phase bars
    phases.forEach((p, i) => {
      const startX = gridX + p.start * colW;
      const endX = gridX + (p.end + 1) * colW;
      const barW = endX - startX - 0.1;
      const barY = gridY + 0.52 + i * rowH + 0.08;
      const barH = rowH - 0.16;

      s.addShape(pres.shapes.RECTANGLE, {
        x: startX + 0.05, y: barY, w: barW, h: barH,
        fill: { color: p.color, transparency: 25 }
      });
      // Left dot
      s.addShape(pres.shapes.OVAL, {
        x: startX, y: barY + barH / 2 - 0.07, w: 0.14, h: 0.14,
        fill: { color: p.color }
      });
    });

    // Vertical grid lines
    [0, 1, 2].forEach(i => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: gridX + i * colW, y: gridY + 0.4, w: 0.005, h: phases.length * rowH,
        fill: { color: "E0E0E0" }
      });
    });

    addPageNumber(s, 13, TOTAL, false);
  }

  // ═══════════════════════════════════════
  // SLIDE 14: THANKS (dark)
  // ═══════════════════════════════════════
  {
    const s = pres.addSlide();
    darkBg(s);

    // Decorative element
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.12, h: 5.625,
      fill: { color: C.jade }
    });

    s.addText("谢谢聆听", {
      x: 0.7, y: 1.6, w: 8.6, h: 1.0,
      fontSize: 52, fontFace: "Georgia", bold: true,
      color: C.textLight, margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.65, w: 1.5, h: 0.025,
      fill: { color: C.gold }
    });

    s.addText("玉见·石家河 — 让长江文明在指尖苏醒", {
      x: 0.7, y: 2.9, w: 8.6, h: 0.5,
      fontSize: 16, fontFace: "Calibri",
      color: C.textMuted, margin: 0
    });

    s.addText("吴泽远 · 2026年7月", {
      x: 0.7, y: 4.0, w: 8.6, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: C.gold, margin: 0
    });

    addPageNumber(s, 14, TOTAL, true);
  }

  // ── Write file ──
  const outPath = "C:/Users/admin/Desktop/玉见石家河/选题汇报_玉见石家河.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("PPT generated: " + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
