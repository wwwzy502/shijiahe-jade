const { createCanvas } = require("canvas");
const fs = require("fs");

// Canvas: 2800 x 1200, dark themed
const W = 2600, H = 1100;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#141210";
ctx.fillRect(0, 0, W, H);

// ── Nodes ──
const nodes = [
  { id: "center", x: 200, y: H/2, w: 180, h: 80, color: "#BD9B4A", title: "玉见·石家河", sub: "6场景H5体验", isCenter: true },
  { id: "s1", x: 500, y: 100, w: 200, h: 130, color: "#BD9B4A", title: "场景一", sub: "序幕「玉见」\n玉凤浮现·粒子浮尘\n开启探索", parent: "center" },
  { id: "s2", x: 500, y: 260, w: 200, h: 130, color: "#8B5E3C", title: "场景二", sub: "发掘「拂去尘埃」\nCanvas刮擦·发掘玉虎\n60%阈值解锁", parent: "center" },
  { id: "s3", x: 500, y: 420, w: 200, h: 130, color: "#6B8E5A", title: "场景三", sub: "鉴赏「凝视为真」\n序列帧旋转·360°查看\n多文物切换", parent: "center" },
  { id: "s4", x: 500, y: 580, w: 200, h: 130, color: "#BD9B4A", title: "场景四", sub: "祭祀「礼敬天地」\n拖拽拼合·场景激活\n归位动画反馈", parent: "center" },
  { id: "s5", x: 500, y: 740, w: 200, h: 130, color: "#8CB07A", title: "场景五", sub: "长廊「七秩寻踪」\n横向时间轴·吸附居中\n70年考古历程", parent: "center" },
  { id: "s6", x: 500, y: 900, w: 200, h: 130, color: "#8B5E3C", title: "场景六", sub: "尾声「文明的回响」\n考古证书·截图保存\n首尾呼应", parent: "center" },

  // Right side detail nodes
  { id: "interact", x: 820, y: 100, w: 260, h: 310, color: "#6B8E5A", title: "交互形式", sub: "① 刮擦揭示 (Canvas)\n② 序列帧旋转 (Drag)\n③ 拖拽拼合 (D&D)\n④ 惯性滑动 (Scroll-snap)", parent: "s1" },
  { id: "visual", x: 820, y: 440, w: 260, h: 220, color: "#BD9B4A", title: "视觉系统", sub: "「考古暖黑」设计\n6色体系 · 粒子浮尘\nNoto Serif TC + Sans", parent: "center" },
  { id: "tech", x: 820, y: 690, w: 260, h: 240, color: "#8B5E3C", title: "技术栈", sub: "HTML5 · CSS3\nJavaScript ES6+\nCanvas 2D API\nGSAP 动画库\nhtml2canvas 截图", parent: "center" },

  // Far right
  { id: "outcome", x: 1200, y: 250, w: 260, h: 280, color: "#BD9B4A", title: "核心体验路径", sub: "进入 → 发掘 → 鉴赏\n→ 复原 → 回顾 → 传承\n\n用户从「观看者」\n变为「参与者」", parent: "interact" },

  // Bottom section
  { id: "materials", x: 1200, y: 600, w: 260, h: 250, color: "#8CB07A", title: "需要准备的素材", sub: "文物多角度照片\n祭祀场景想象图\n考古时间轴数据\n音效素材(可选)", parent: "tech" },
];

// ── Draw connecting lines first ──
ctx.strokeStyle = "#44403C";
ctx.lineWidth = 2;
ctx.setLineDash([4, 4]);

// Center to s1-s6
for (let i = 1; i <= 6; i++) {
  const n = nodes.find(x => x.id === "s"+i);
  const c = nodes.find(x => x.id === "center");
  drawCurve(c.x + c.w, c.y + c.h/2, n.x, n.y + n.h/2);
}

// s1 to interact
(function(){
  const s1 = nodes.find(x => x.id === "s1");
  const inter = nodes.find(x => x.id === "interact");
  drawCurve(s1.x + s1.w, s1.y + s1.h/2, inter.x, inter.y + inter.h/2);
})();

// Center to visual
(function(){
  const c = nodes.find(x => x.id === "center");
  const v = nodes.find(x => x.id === "visual");
  drawCurve(c.x + c.w, c.y + 80, v.x, v.y + v.h/2);
})();

// Center to tech
(function(){
  const c = nodes.find(x => x.id === "center");
  const t = nodes.find(x => x.id === "tech");
  drawCurve(c.x + c.w, c.y + c.h - 20, t.x, t.y + t.h/2);
})();

// Interact to outcome
(function(){
  const inter = nodes.find(x => x.id === "interact");
  const out = nodes.find(x => x.id === "outcome");
  drawCurve(inter.x + inter.w, inter.y + inter.h/2, out.x, out.y + out.h/2);
})();

// Tech to materials
(function(){
  const t = nodes.find(x => x.id === "tech");
  const m = nodes.find(x => x.id === "materials");
  drawCurve(t.x + t.w, t.y + t.h/2, m.x, m.y + m.h/2);
})();

function drawCurve(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  const cpX = (x1 + x2) / 2;
  ctx.bezierCurveTo(cpX, y1, cpX, y2, x2, y2);
  ctx.stroke();
}

// ── Draw nodes ──
ctx.setLineDash([]);
nodes.forEach(n => {
  // Card bg
  const r = 10;
  ctx.fillStyle = n.isCenter ? "#BD9B4A" : "#1E1A16";
  ctx.strokeStyle = n.color;
  ctx.lineWidth = 2;

  // Rounded rect
  ctx.beginPath();
  roundRect(ctx, n.x, n.y, n.w, n.h, r);
  ctx.fill();
  ctx.stroke();

  // Top accent bar
  ctx.fillStyle = n.color;
  ctx.beginPath();
  ctx.moveTo(n.x + r, n.y);
  ctx.lineTo(n.x + n.w - r, n.y);
  ctx.arcTo(n.x + n.w, n.y, n.x + n.w, n.y + r, r);
  ctx.lineTo(n.x + n.w, n.y + 30);
  ctx.lineTo(n.x, n.y + 30);
  ctx.lineTo(n.x, n.y + r);
  ctx.arcTo(n.x, n.y, n.x + r, n.y, r);
  ctx.fill();

  // Title text
  ctx.fillStyle = n.isCenter ? "#141210" : "#F0E8D8";
  ctx.font = n.isCenter ? "bold 22px 'Microsoft YaHei', sans-serif" : "bold 16px 'Microsoft YaHei', sans-serif";
  ctx.fillText(n.title, n.x + 14, n.y + (n.isCenter ? 50 : 22));

  // Sub text
  if (n.sub) {
    ctx.fillStyle = n.isCenter ? "#141210" : "#B8A99A";
    ctx.font = "12px 'Microsoft YaHei', sans-serif";
    const lines = n.sub.split("\n");
    lines.forEach((line, i) => {
      ctx.fillText(line, n.x + 14, n.y + 42 + i * 18);
    });
  }
});

function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
}

// ── Save ──
const buf = canvas.toBuffer("image/png");
fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/mindmap.png", buf);
console.log("Mind map saved: mindmap.png (" + buf.length + " bytes)");
