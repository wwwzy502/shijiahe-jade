const fs = require("fs");

const mindmapSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 720" width="1400" height="720">
  <defs>
    <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#BD9B4A"/></marker>
    <marker id="arrowJade" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#6B8E5A"/></marker>
  </defs>

  <rect width="1400" height="720" fill="#141210" rx="12"/>

  <text x="700" y="42" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="26" font-weight="bold">「玉见·石家河」页面结构思维导图</text>
  <line x1="180" y1="58" x2="1220" y2="58" stroke="#BD9B4A" stroke-width="1.5" opacity="0.5"/>

  <!-- CENTER NODE -->
  <rect x="40" y="270" width="170" height="90" rx="10" fill="#BD9B4A" opacity="0.15" stroke="#BD9B4A" stroke-width="2.5"/>
  <rect x="40" y="270" width="170" height="5" rx="2" fill="#BD9B4A"/>
  <text x="125" y="306" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="20" font-weight="bold">玉见·石家河</text>
  <text x="125" y="332" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="12">6场景H5互动体验</text>

  <!-- SCENE CARDS -->
  <rect x="290" y="60" width="210" height="82" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="290" y="60" width="210" height="4" rx="2" fill="#BD9B4A"/>
  <text x="395" y="88" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景一 · 序幕「玉见」</text>
  <text x="395" y="110" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">玉凤剪影 · 粒子浮尘</text>
  <text x="395" y="130" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">点击开启探索</text>

  <rect x="290" y="154" width="210" height="82" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="290" y="154" width="210" height="4" rx="2" fill="#8B5E3C"/>
  <text x="395" y="182" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景二 · 发掘「拂去尘埃」</text>
  <text x="395" y="204" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">Canvas刮擦 · 发掘玉虎</text>
  <text x="395" y="224" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">60%阈值解锁文物</text>

  <rect x="290" y="248" width="210" height="82" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="290" y="248" width="210" height="4" rx="2" fill="#6B8E5A"/>
  <text x="395" y="276" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景三 · 鉴赏「凝视为真」</text>
  <text x="395" y="298" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">序列帧3D旋转</text>
  <text x="395" y="318" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">多文物切换 · 放大细节</text>

  <rect x="290" y="342" width="210" height="82" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="290" y="342" width="210" height="4" rx="2" fill="#BD9B4A"/>
  <text x="395" y="370" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景四 · 祭祀「礼敬天地」</text>
  <text x="395" y="392" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">拖拽拼合 · 场景激活</text>
  <text x="395" y="412" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">正确光晕 · 错误弹回</text>

  <rect x="290" y="436" width="210" height="82" rx="8" fill="#1E1A16" stroke="#8CB07A" stroke-width="1.8"/>
  <rect x="290" y="436" width="210" height="4" rx="2" fill="#8CB07A"/>
  <text x="395" y="464" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景五 · 长廊「七秩寻踪」</text>
  <text x="395" y="486" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">横向时间轴 · 吸附居中</text>
  <text x="395" y="506" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">70年考古大事记</text>

  <rect x="290" y="530" width="210" height="82" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="290" y="530" width="210" height="4" rx="2" fill="#8B5E3C"/>
  <text x="395" y="558" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景六 · 尾声「文明回响」</text>
  <text x="395" y="580" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">考古证书 · 截图保存</text>
  <text x="395" y="600" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">证书分享 · 首尾呼应</text>

  <!-- RIGHT BRANCH: INTERACTION -->
  <rect x="580" y="90" width="250" height="200" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="580" y="90" width="250" height="4" rx="2" fill="#6B8E5A"/>
  <text x="705" y="118" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">交互形式</text>
  <text x="595" y="148" fill="#B8A99A" font-family="sans-serif" font-size="12">(1) 刮擦揭示（Canvas 2D）</text>
  <text x="595" y="172" fill="#B8A99A" font-family="sans-serif" font-size="12">(2) 序列帧旋转（Touch Drag）</text>
  <text x="595" y="196" fill="#B8A99A" font-family="sans-serif" font-size="12">(3) 拖拽拼合（Drag &amp; Drop）</text>
  <text x="595" y="220" fill="#B8A99A" font-family="sans-serif" font-size="12">(4) 惯性滑动（Scroll-snap）</text>
  <text x="595" y="244" fill="#B8A99A" font-family="sans-serif" font-size="12">(5) 证书截图（html2canvas）</text>
  <text x="705" y="278" text-anchor="middle" fill="#6B8E5A" font-family="sans-serif" font-size="11" font-weight="bold">>=3种交互形式 满足要求</text>

  <!-- RIGHT: DESIGN SYSTEM -->
  <rect x="580" y="318" width="250" height="160" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="580" y="318" width="250" height="4" rx="2" fill="#BD9B4A"/>
  <text x="705" y="346" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">「考古暖黑」视觉系统</text>
  <text x="595" y="376" fill="#B8A99A" font-family="sans-serif" font-size="12">主背景 #141210 地层黑</text>
  <text x="595" y="400" fill="#B8A99A" font-family="sans-serif" font-size="12">强调色 #6B8E5A 玉石绿</text>
  <text x="595" y="424" fill="#B8A99A" font-family="sans-serif" font-size="12">高亮 #BD9B4A 古金</text>
  <text x="595" y="448" fill="#B8A99A" font-family="sans-serif" font-size="12">字体 Georgia + Calibri</text>
  <text x="595" y="472" fill="#B8A99A" font-family="sans-serif" font-size="12">效果 粒子浮尘 · 纹理 · 暖光</text>

  <!-- RIGHT: TECH STACK -->
  <rect x="580" y="506" width="250" height="140" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="580" y="506" width="250" height="4" rx="2" fill="#8B5E3C"/>
  <text x="705" y="534" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">技术栈</text>
  <text x="595" y="562" fill="#B8A99A" font-family="sans-serif" font-size="12">HTML5 + CSS3 + JS ES6+</text>
  <text x="595" y="586" fill="#B8A99A" font-family="sans-serif" font-size="12">Canvas 2D API（刮擦）</text>
  <text x="595" y="610" fill="#B8A99A" font-family="sans-serif" font-size="12">GSAP（页面过渡+动效）</text>
  <text x="595" y="634" fill="#B8A99A" font-family="sans-serif" font-size="12">html2canvas（证书截图）</text>

  <!-- FAR RIGHT: USER JOURNEY -->
  <rect x="910" y="120" width="260" height="130" rx="8" fill="#BD9B4A" opacity="0.1" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="910" y="120" width="260" height="4" rx="2" fill="#BD9B4A"/>
  <text x="1040" y="150" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">用户旅程</text>
  <text x="1040" y="180" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="16" font-weight="bold">进入->发掘->鉴赏->复原</text>
  <text x="1040" y="204" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="16" font-weight="bold">->回顾->传承</text>
  <text x="1040" y="234" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">观看者 -> 参与者</text>

  <!-- FAR RIGHT: ASSETS -->
  <rect x="910" y="280" width="260" height="110" rx="8" fill="#1E1A16" stroke="#8CB07A" stroke-width="1.8"/>
  <rect x="910" y="280" width="260" height="4" rx="2" fill="#8CB07A"/>
  <text x="1040" y="310" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">所需素材</text>
  <text x="925" y="338" fill="#B8A99A" font-family="sans-serif" font-size="12">文物多角度照片（6-8张/件）</text>
  <text x="925" y="360" fill="#B8A99A" font-family="sans-serif" font-size="12">祭祀场景想象图</text>
  <text x="925" y="382" fill="#B8A99A" font-family="sans-serif" font-size="12">考古时间轴数据</text>

  <!-- FAR RIGHT: NAVIGATION -->
  <rect x="910" y="420" width="260" height="110" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="910" y="420" width="260" height="4" rx="2" fill="#6B8E5A"/>
  <text x="1040" y="450" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">导航系统</text>
  <text x="925" y="480" fill="#B8A99A" font-family="sans-serif" font-size="12">底部常驻：页面指示器+翻页按钮</text>
  <text x="925" y="502" fill="#B8A99A" font-family="sans-serif" font-size="12">过渡动画：淡入淡出+上移 400ms</text>
  <text x="925" y="524" fill="#B8A99A" font-family="sans-serif" font-size="12">每场景一屏（100vh）线性叙事</text>

  <!-- CONNECTING LINES -->
  <g stroke="#44403C" stroke-width="1.8" fill="none" stroke-dasharray="5,4">
    <path d="M210,315 C250,315 250,101 290,101" marker-end="url(#arrowGold)"/>
    <path d="M210,315 C250,315 250,195 290,195" marker-end="url(#arrowGold)"/>
    <path d="M210,315 C250,315 250,289 290,289" marker-end="url(#arrowGold)"/>
    <path d="M210,315 C250,315 250,383 290,383" marker-end="url(#arrowGold)"/>
    <path d="M210,315 C250,315 250,477 290,477" marker-end="url(#arrowGold)"/>
    <path d="M210,315 C250,315 250,571 290,571" marker-end="url(#arrowGold)"/>

    <path d="M500,165 C540,165 540,190 580,190" marker-end="url(#arrowJade)"/>
    <path d="M500,340 C540,340 540,398 580,398" marker-end="url(#arrowGold)"/>
    <path d="M500,525 C540,525 540,576 580,576" marker-end="url(#arrowJade)"/>

    <path d="M830,190 C870,190 870,185 910,185" marker-end="url(#arrowGold)"/>
    <path d="M830,398 C870,398 870,335 910,335" marker-end="url(#arrowJade)"/>
    <path d="M830,576 C870,576 870,475 910,475" marker-end="url(#arrowJade)"/>
  </g>
</svg>`;

fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/mindmap.svg", mindmapSvg);
console.log("Mind map SVG saved (larger text).");

// Convert to PNG
const sharp = require("sharp");
sharp("C:/Users/admin/Desktop/玉见石家河/mindmap.svg")
  .png()
  .toFile("C:/Users/admin/Desktop/玉见石家河/mindmap.png")
  .then(() => console.log("PNG converted."))
  .catch(e => console.error(e));
