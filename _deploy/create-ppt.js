const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "wwwzy502";
pres.title = "叩玉·石家河 作品汇报";

const C = {
  dark: "141210",
  gold: "BD9B4A",
  jade: "6B8E5A",
  text: "F0E8D8",
  mute: "8B7A6A",
  card: "1E1A16",
  line: "27272A",
};

function addBg(slide) {
  slide.background = { color: C.dark };
}

function addFooter(slide, n) {
  slide.addText(n + " / 12", {
    x: 8.8, y: 5.2, w: 1, h: 0.3, fontSize: 9, color: C.mute, align: "right"
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 5.15, w: 8.8, h: 0, line: { color: C.gold, width: 0.5 }
  });
}

function addTitle(slide, title, sub) {
  slide.addText(title, {
    x: 0.6, y: 0.25, w: 8.8, h: 0.55, fontSize: 28, color: C.gold,
    fontFace: "Georgia", bold: true, margin: 0
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.6, y: 0.75, w: 8.8, h: 0.25, fontSize: 11, color: C.jade,
      fontFace: "Arial", charSpacing: 8
    });
  }
}

function addImgBox(slide, x, y, w, h, label) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.card },
    line: { color: C.gold, width: 1, dashType: "dash" }
  });
  slide.addText(label, {
    x, y, w, h, fontSize: 10, color: C.mute, align: "center", valign: "middle", fontFace: "Arial"
  });
}

// ═══ S1: COVER ═══
let s1 = pres.addSlide();
s1.background = { color: C.dark };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "1A1612" } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.8, w: 2, h: 0.04, fill: { color: C.gold } });
s1.addText("叩玉·石家河", {
  x: 0.6, y: 1.95, w: 9, h: 1, fontSize: 52, color: C.gold,
  fontFace: "Georgia", bold: true, charSpacing: 8
});
s1.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.0, w: 1.2, h: 0.04, fill: { color: C.jade } });
s1.addText("H5 交 互 作 品 汇 报", {
  x: 0.6, y: 3.2, w: 9, h: 0.5, fontSize: 18, color: C.text,
  fontFace: "Arial", charSpacing: 10
});
s1.addText("石家河文化 · 长江中游史前文明之巅", {
  x: 0.6, y: 4.25, w: 9, h: 0.3, fontSize: 11, color: C.mute, fontFace: "Arial"
});
s1.addText("wwwzy502 · 2026年7月", {
  x: 0.6, y: 4.65, w: 9, h: 0.3, fontSize: 10, color: C.mute, fontFace: "Arial"
});

// ═══ S2: TOC ═══
let s2 = pres.addSlide();
addBg(s2);
addTitle(s2, "目录", "CONTENTS");
addFooter(s2, 2);
const toc = [
  ["01", "选题与内容介绍"], ["02", "界面设计与色彩体系"],
  ["03", "交互设计"], ["04", "创意实现亮点"],
  ["05", "技术实现"], ["06", "疑难问题与解决方案"],
  ["07", "可改进之处与小组分工"],
];
toc.forEach((item, i) => {
  let y = 1.4 + i * 0.52;
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y, w: 0.6, h: 0.38, fill: { color: i % 2 === 0 ? C.gold : C.jade }
  });
  s2.addText(item[0], {
    x: 1.5, y, w: 0.6, h: 0.38, fontSize: 14, color: C.dark,
    fontFace: "Georgia", bold: true, align: "center", valign: "middle"
  });
  s2.addText(item[1], {
    x: 2.4, y, w: 6, h: 0.38, fontSize: 15, color: C.text, fontFace: "Arial", valign: "middle"
  });
  s2.addShape(pres.shapes.LINE, {
    x: 2.4, y: y + 0.44, w: 5.5, h: 0, line: { color: C.line, width: 0.5 }
  });
});

// ═══ S3: 选题介绍 ═══
let s3 = pres.addSlide();
addBg(s3);
addTitle(s3, "选题与内容介绍", "01  TOPIC & CONTENT");
addFooter(s3, 3);
s3.addText("为什么选择石家河文化", {
  x: 0.6, y: 1.3, w: 5, h: 0.35, fontSize: 16, color: C.gold, fontFace: "Georgia", bold: true
});
s3.addText([
  { text: "长江中游迄今规模最大、等级最高的新石器时代聚落遗址群", options: { bullet: true, breakLine: true } },
  { text: "距今6500-4000年，与良渚、陶寺齐名，实证长江流域同为中华文明核心发源地", options: { bullet: true, breakLine: true } },
  { text: "2017年入选「全国十大考古新发现」", options: { bullet: true, breakLine: true } },
  { text: "2021年入选「百年百大考古发现」，成为中国考古里程碑式遗址", options: { bullet: true, breakLine: true } },
  { text: "以精湛玉器工艺闻名，被誉为「中华第一凤」出土地", options: { bullet: true, breakLine: true } },
  { text: "H5以沉浸式体验传播考古文化，让公众触摸中华文明之源", options: { bullet: true } },
], { x: 0.6, y: 1.8, w: 4.8, h: 2.8, fontSize: 11, color: C.text, fontFace: "Arial", paraSpaceAfter: 8 });
addImgBox(s3, 5.8, 1.3, 3.8, 3.5, "【 此处插入 石家河遗址考古照片\n或遗址全景图 】\n\n建议尺寸: 800×600px");

// ═══ S4: 内容架构 ═══
let s4 = pres.addSlide();
addBg(s4);
addTitle(s4, "H5 内容架构", "01  CONTENT STRUCTURE");
addFooter(s4, 4);
const scenes = [
  ["◈", "序幕 · 礼敬天地", "三篇章漫画叙事，重现先民祭祀场景"],
  ["◈", "发掘 · 拂去尘埃", "玉匣开启→视频演绎→地层探方→擦拭发掘"],
  ["◈", "鉴赏 · 凝视为真", "6件文物360°拖拽旋转，多角度鉴赏"],
  ["◈", "长廊 · 七秩寻踪", "1954-2024九大里程碑时间轴"],
  ["◈", "回声 · 文明回响", "生成考古证书，分享传播"],
];
scenes.forEach((s, i) => {
  let y = 1.35 + i * 0.72;
  s4.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y, w: 0.08, h: 0.58, fill: { color: i % 2 === 0 ? C.gold : C.jade }
  });
  s4.addText(s[0], { x: 0.85, y: y + 0.05, w: 0.3, h: 0.25, fontSize: 11, color: C.gold });
  s4.addText(s[1], { x: 1.3, y: y, w: 3, h: 0.28, fontSize: 14, color: C.text, fontFace: "Arial", bold: true });
  s4.addText(s[2], { x: 1.3, y: y + 0.3, w: 3.5, h: 0.25, fontSize: 10, color: C.mute, fontFace: "Arial" });
});
addImgBox(s4, 5.2, 1.3, 4.4, 3.7, "【 此处插入 流程图或界面截图 】\n\n建议用5张截图竖向排列");

// ═══ S5: 界面设计 ═══
let s5 = pres.addSlide();
addBg(s5);
addTitle(s5, "界面设计与色彩体系", "02  UI DESIGN & COLOR SYSTEM");
addFooter(s5, 5);
const swatches = [
  { c: C.dark, l: "背景色 #141210", t: C.text },
  { c: C.card, l: "卡片色 #1E1A16", t: C.text },
  { c: C.gold, l: "金色 #BD9B4A", t: C.dark },
  { c: C.jade, l: "玉色 #6B8E5A", t: C.dark },
  { c: C.text, l: "文字色 #F0E8D8", t: C.dark },
];
swatches.forEach((sw, i) => {
  let x = 0.6 + i * 1.8;
  s5.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.3, w: 1.5, h: 1.1, fill: { color: sw.c },
    shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.3 }
  });
  s5.addText(sw.l, {
    x, y: 2.55, w: 1.5, h: 0.25, fontSize: 8, color: sw.t, align: "center", fontFace: "Arial"
  });
});
s5.addText("字体体系", {
  x: 0.6, y: 3.0, w: 5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Georgia", bold: true
});
s5.addText([
  { text: "标题字体: Georgia (英文) / Noto Serif TC (中文)", options: { bullet: true, breakLine: true } },
  { text: "正文字体: Georgia + 系统衬线体降级", options: { bullet: true, breakLine: true } },
  { text: "特殊字体: 楷体 (证书/卷轴等古籍风格)", options: { bullet: true, breakLine: true } },
  { text: "零外部字体依赖，避免Google Fonts被墙导致白屏", options: { bullet: true } },
], { x: 0.6, y: 3.4, w: 4.8, h: 1.5, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });
addImgBox(s5, 5.5, 1.3, 4.1, 3.8, "【 此处插入 界面截图\n首页 / 加载页 / 内容页各一张 】");

// ═══ S6: 交互设计 ═══
let s6 = pres.addSlide();
addBg(s6);
addTitle(s6, "交互设计", "03  INTERACTION DESIGN");
addFooter(s6, 6);
// Left: scratch
s6.addText("刮擦交互 · 地层发掘", {
  x: 0.6, y: 1.25, w: 4.5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
s6.addText([
  { text: "Canvas destination-out 实现泥土擦拭效果，触感真实", options: { bullet: true, breakLine: true } },
  { text: "笔触计数判断进度（解决跨域getImageData限制），35笔阈值触发完成", options: { bullet: true, breakLine: true } },
  { text: "涟漪动画引导操作 + 刮擦音效反馈", options: { bullet: true, breakLine: true } },
  { text: "遮罩完全覆盖文物图，6件文物分布于6层地层", options: { bullet: true } },
], { x: 0.6, y: 1.65, w: 4.5, h: 1.3, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });
// Right: 3D
s6.addText("3D旋转 · 凝视为真", {
  x: 5.3, y: 1.25, w: 4.5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
s6.addText([
  { text: "每件文物8角度序列帧，Pointer Events拖拽旋转", options: { bullet: true, breakLine: true } },
  { text: "Document级事件委托，避免setPointerCapture兼容问题", options: { bullet: true, breakLine: true } },
  { text: "6件文物：玉虎/玉凤/玉人首/玉蝉/陶鼎/玉鹰", options: { bullet: true, breakLine: true } },
  { text: "Canvas粒子背景 + 文物信息卡片 + 音效加成", options: { bullet: true } },
], { x: 5.3, y: 1.65, w: 4.5, h: 1.3, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });
addImgBox(s6, 0.6, 3.3, 4.4, 1.8, "【 刮擦前后对比截图 】");
addImgBox(s6, 5.3, 3.3, 4.4, 1.8, "【 3D旋转界面截图 】");

// ═══ S7: 交互设计2 ═══
let s7 = pres.addSlide();
addBg(s7);
addTitle(s7, "交互设计（续）", "03  INTERACTION DESIGN");
addFooter(s7, 7);
s7.addText("时间轴 · 七秩寻踪", {
  x: 0.6, y: 1.25, w: 4.5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
s7.addText([
  { text: "1954-2024九大考古里程碑，垂直时间轴布局", options: { bullet: true, breakLine: true } },
  { text: "点击泥土覆盖层触发颗粒消散动画 + 实拍照片显露", options: { bullet: true, breakLine: true } },
  { text: "每节点支持多图切换浏览，左右箭头翻页", options: { bullet: true, breakLine: true } },
  { text: "页面滚动触发齿轮音效，停止即静音，体验逼真", options: { bullet: true } },
], { x: 0.6, y: 1.65, w: 4.5, h: 1.3, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });
s7.addText("证书生成 · 文明回响", {
  x: 5.3, y: 1.25, w: 4.5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
s7.addText([
  { text: "Canvas渲染600dpi高清证书，羊皮纸纹理+金玉装饰", options: { bullet: true, breakLine: true } },
  { text: "用户输入昵称 → 一键生成PNG → 保存到本地", options: { bullet: true, breakLine: true } },
  { text: "双线边框 + 四角金玉纹样 + 红印盖章", options: { bullet: true, breakLine: true } },
  { text: "Web Share API 一键分享 + 剪贴板降级方案", options: { bullet: true } },
], { x: 5.3, y: 1.65, w: 4.5, h: 1.3, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });
addImgBox(s7, 0.6, 3.3, 4.4, 1.8, "【 时间轴页面截图 】");
addImgBox(s7, 5.3, 3.3, 4.4, 1.8, "【 证书生成界面截图 】");

// ═══ S8: 创意亮点 ═══
let s8 = pres.addSlide();
addBg(s8);
addTitle(s8, "创意实现亮点", "04  CREATIVE HIGHLIGHTS");
addFooter(s8, 8);
const hl = [
  ["01", "漫画叙事引入", "16张分镜构成三幕仪式叙事，不规则面板布局+点击揭晓动画，以故事线驱动用户探索"],
  ["02", "多层视差云动效", "3层祥云以不同速率响应滚动，营造空间纵深感，古朴美学贯穿始终"],
  ["03", "Canvas刮擦交互", "Destination-out合成模式实现真实泥土擦拭手感，笔触计数突破跨域限制"],
  ["04", "全流程体验闭环", "加载动画→漫画叙事→视频演绎→刮擦发掘→3D鉴赏→时间轴→证书，完整六幕叙事"],
  ["05", "8声道音效系统", "BGM + 7种SFX精准匹配交互行为，齿轮音效跟随滚动实时播放/停止"],
  ["06", "古朴中式美学", "暗色基底+金玉配色+衬线字体，还原青铜玉器时代的厚重与神秘感"],
];
hl.forEach((h, i) => {
  let col = i % 2, row = Math.floor(i / 2);
  let x = 0.6 + col * 4.7, y = 1.3 + row * 1.2;
  s8.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 4.2, h: 1.05, fill: { color: C.card },
    line: { color: C.gold, width: 0.5 }
  });
  s8.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.05, fill: { color: C.gold } });
  s8.addText(h[0], { x: x + 0.2, y: y + 0.08, w: 0.5, h: 0.28, fontSize: 16, color: C.gold, fontFace: "Georgia", bold: true });
  s8.addText(h[1], { x: x + 0.75, y: y + 0.08, w: 3.2, h: 0.28, fontSize: 13, color: C.text, fontFace: "Arial", bold: true });
  s8.addText(h[2], { x: x + 0.75, y: y + 0.45, w: 3.2, h: 0.5, fontSize: 9, color: C.mute, fontFace: "Arial" });
});

// ═══ S9: 技术实现 ═══
let s9 = pres.addSlide();
addBg(s9);
addTitle(s9, "技术实现", "05  TECHNICAL IMPLEMENTATION");
addFooter(s9, 9);
const techs = [
  ["前端框架", "纯原生 HTML5 + CSS3 + JavaScript ES6，零依赖单文件架构"],
  ["图形渲染", "Canvas 2D API / CSS 3D Transform / RequestAnimationFrame"],
  ["交互检测", "Pointer Events + Touch Events / 笔触计数算法"],
  ["音效系统", "HTML5 Audio 多声道独立控制 / Web Audio API"],
  ["数据处理", "Canvas.toBlob PNG导出 / JSON数据结构化配置"],
  ["部署方案", "GitHub Pages + Netlify 双平台 / _headers缓存策略"],
  ["兼容适配", "移动端优先 / 响应式布局 / iOS & Android适配"],
];
techs.forEach((t, i) => {
  let y = 1.3 + i * 0.55;
  s9.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 1.6, h: 0.42, fill: { color: C.card } });
  s9.addText(t[0], {
    x: 0.6, y, w: 1.6, h: 0.42, fontSize: 10, color: C.gold,
    fontFace: "Arial", bold: true, align: "center", valign: "middle"
  });
  s9.addText(t[1], {
    x: 2.4, y, w: 7, h: 0.42, fontSize: 10, color: C.text, fontFace: "Arial", valign: "middle"
  });
});

// ═══ S10: 疑难问题 ═══
let s10 = pres.addSlide();
addBg(s10);
addTitle(s10, "疑难问题与解决方案", "06  PROBLEMS & SOLUTIONS");
addFooter(s10, 10);
const probs = [
  ["零基础起步", "完全没有编程经验，不知从何入手", "借助AI编程工具（Claude Code）辅助开发，边做边学，从模仿现有H5案例开始"],
  ["素材整理混乱", "上百张图片散落各处，格式不统一", "按功能模块建立文件夹分类（漫画/3D/古画风/音效），统一命名规范"],
  ["本地无法预览", "双击HTML打开一片空白，图片音频都不加载", "安装Python搭建本地HTTP服务器（python -m http.server），解决跨域限制"],
  ["部署后加载极慢", "上传到GitHub后图片视频半天出不来", "先后尝试GitHub Pages、Netlify、jsDelivr CDN等多种方案，最终选用Netlify"],
  ["字体显示异常", "使用Google Fonts导致国内用户白屏", "搜索了解到Google服务在国内被墙，改为全部使用系统自带字体"],
  ["音效难以同步", "想加音效但不知如何对接交互事件", "逐个测试Web Audio API，在不同交互节点（点击、滑动、切换）绑定对应音效"],
  ["设备兼容问题", "自己电脑正常，换手机就布局错乱", "反复用不同设备测试，调整CSS响应式布局和触摸事件处理"],
];
probs.forEach((p, i) => {
  let y = 1.15 + i * 0.6;
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y, w: 8.8, h: 0.52, fill: { color: i % 2 === 0 ? C.card : "1A1612" }
  });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.06, h: 0.52, fill: { color: C.gold } });
  s10.addText(p[0], {
    x: 0.85, y: y + 0.02, w: 1.8, h: 0.22, fontSize: 9, color: C.gold, fontFace: "Arial", bold: true
  });
  s10.addText(p[1], {
    x: 0.85, y: y + 0.26, w: 1.8, h: 0.22, fontSize: 8, color: "D4785C", fontFace: "Arial"
  });
  s10.addText(p[2], {
    x: 2.8, y: y + 0.06, w: 6.4, h: 0.4, fontSize: 8, color: C.mute, fontFace: "Arial"
  });
});

// ═══ S11: 改进 + 分工 ═══
let s11 = pres.addSlide();
addBg(s11);
addTitle(s11, "可改进之处 & 小组分工", "07  IMPROVEMENTS & TEAMWORK");
addFooter(s11, 11);

s11.addText("未来可改进的方向", {
  x: 0.6, y: 1.25, w: 5.5, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
s11.addText([
  { text: "接入国内CDN或Gitee Pages，解决访问速度瓶颈", options: { bullet: true, breakLine: true } },
  { text: "增加更多文物3D模型，丰富鉴赏内容", options: { bullet: true, breakLine: true } },
  { text: "音效资源压缩优化 + 渐进式加载策略", options: { bullet: true, breakLine: true } },
  { text: "适配更多机型屏幕和横屏模式", options: { bullet: true, breakLine: true } },
  { text: "增加无障碍访问支持(ARIA) + 英文版", options: { bullet: true, breakLine: true } },
  { text: "接入微信JS-SDK，支持朋友圈分享", options: { bullet: true, breakLine: true } },
  { text: "PWA离线缓存，断网也能浏览", options: { bullet: true } },
], { x: 0.6, y: 1.65, w: 5.5, h: 3, fontSize: 10, color: C.text, fontFace: "Arial", paraSpaceAfter: 6 });

s11.addText("小组分工", {
  x: 6.5, y: 1.25, w: 3, h: 0.3, fontSize: 14, color: C.gold, fontFace: "Arial", bold: true
});
const roles = [
  "H5程序设计 & 编码实现",
  "选题策划 & 资料搜集",
  "界面设计 & 交互设计",
  "视觉素材整理 & 处理",
  "音效素材搜集 & 剪辑",
  "测试调试 & 部署发布",
  "PPT制作 & 文档撰写",
];
s11.addShape(pres.shapes.RECTANGLE, {
  x: 6.5, y: 1.65, w: 3.1, h: 3.2, fill: { color: C.card }
});
roles.forEach((r, i) => {
  let y = 1.75 + i * 0.4;
  s11.addText(r, { x: 6.65, y, w: 2, h: 0.3, fontSize: 9, color: C.text, fontFace: "Arial", valign: "middle" });
  s11.addText("wwwzy502", {
    x: 8.7, y, w: 0.8, h: 0.3, fontSize: 8, color: C.gold, fontFace: "Arial", valign: "middle", align: "right"
  });
});

// ═══ S12: 致谢 ═══
let s12 = pres.addSlide();
s12.background = { color: C.dark };
s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "1A1612" } });
s12.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.5, w: 3, h: 0.04, fill: { color: C.gold } });
s12.addText("叩玉·石家河", {
  x: 1, y: 1.7, w: 8, h: 0.9, fontSize: 44, color: C.gold,
  fontFace: "Georgia", bold: true, align: "center", charSpacing: 10
});
s12.addShape(pres.shapes.RECTANGLE, { x: 4, y: 2.7, w: 2, h: 0.04, fill: { color: C.jade } });
s12.addText("THANK YOU", {
  x: 1, y: 2.9, w: 8, h: 0.6, fontSize: 16, color: C.text,
  fontFace: "Arial", align: "center", charSpacing: 12
});
s12.addText("感谢观看 · 欢迎交流", {
  x: 1, y: 3.8, w: 8, h: 0.4, fontSize: 14, color: C.mute, fontFace: "Arial", align: "center"
});
s12.addText("图片来源于网络 · 仅供学习交流使用", {
  x: 1, y: 5, w: 8, h: 0.3, fontSize: 8, color: C.mute, fontFace: "Arial", align: "center"
});

// ═══ SAVE ═══
pres.writeFile({ fileName: "C:/Users/admin/Desktop/叩玉石家河/叩玉石家河_作品汇报.pptx" }).then(() => {
  console.log("Done! 12 slides created.");
});
