const fs = require("fs");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" width="1400" height="800">
  <defs>
    <marker id="ag" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#BD9B4A"/></marker>
    <marker id="aj" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#6B8E5A"/></marker>
    <filter id="glow"><feGaussianBlur stdDeviation="1.5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <rect width="1400" height="800" fill="#141210" rx="12"/>

  <text x="700" y="40" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="26" font-weight="bold">「玉见·石家河」页面结构思维导图</text>
  <line x1="200" y1="56" x2="1200" y2="56" stroke="#BD9B4A" stroke-width="1.5" opacity="0.4"/>

  <!-- CENTER NODE -->
  <rect x="30" y="320" width="170" height="90" rx="10" fill="#BD9B4A" opacity="0.12" stroke="#BD9B4A" stroke-width="2.5"/>
  <rect x="30" y="320" width="170" height="5" rx="2" fill="#BD9B4A"/>
  <text x="115" y="356" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="20" font-weight="bold">玉见·石家河</text>
  <text x="115" y="382" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">6场景H5体验</text>

  <!-- PAGE CARDS (left column) -->
  <!-- P1: Comic -->
  <rect x="270" y="50" width="210" height="90" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="270" y="50" width="210" height="4" rx="2" fill="#BD9B4A"/>
  <text x="375" y="78" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景一 · 礼敬天地</text>
  <text x="375" y="100" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">漫画三章 · 点击弹出分镜</text>
  <text x="375" y="120" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">上篇备礼→下篇燃火→终章宝匣</text>

  <!-- P2: Box -->
  <rect x="270" y="160" width="210" height="90" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="270" y="160" width="210" height="4" rx="2" fill="#8B5E3C"/>
  <text x="375" y="188" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景二 · 玉匣探方</text>
  <text x="375" y="210" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">点击玉匣→视频→卷轴展开</text>
  <text x="375" y="230" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">地质探方·6文物刮擦发掘</text>

  <!-- P3: 3D -->
  <rect x="270" y="270" width="210" height="90" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="270" y="270" width="210" height="4" rx="2" fill="#6B8E5A"/>
  <text x="375" y="298" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景三 · 凝视为真</text>
  <text x="375" y="320" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">点击刮开文物→3D旋转鉴赏</text>
  <text x="375" y="340" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">6件文物·真实多角度照片</text>

  <!-- P4: Timeline -->
  <rect x="270" y="380" width="210" height="90" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="270" y="380" width="210" height="4" rx="2" fill="#BD9B4A"/>
  <text x="375" y="408" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景四 · 七秩寻踪</text>
  <text x="375" y="430" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">横向时间轴·节点吸附滑动</text>
  <text x="375" y="450" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">1954-2024 七十年考古</text>

  <!-- P5: Cert -->
  <rect x="270" y="490" width="210" height="90" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="270" y="490" width="210" height="4" rx="2" fill="#8B5E3C"/>
  <text x="375" y="518" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="14" font-weight="bold">场景五 · 文明回响</text>
  <text x="375" y="540" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">输入姓名·生成考古证书</text>
  <text x="375" y="560" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">Canvas绘制·保存分享</text>

  <!-- RIGHT SIDE DETAIL NODES -->
  <!-- Interactions -->
  <rect x="560" y="60" width="260" height="200" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="560" y="60" width="260" height="4" rx="2" fill="#6B8E5A"/>
  <text x="690" y="90" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">交互形式（5种）</text>
  <text x="575" y="122" fill="#B8A99A" font-family="sans-serif" font-size="12">① 漫画翻页弹入（Click）</text>
  <text x="575" y="146" fill="#B8A99A" font-family="sans-serif" font-size="12">② Canvas刮擦发掘（Scratch）</text>
  <text x="575" y="170" fill="#B8A99A" font-family="sans-serif" font-size="12">③ 3D序列帧旋转（Drag）</text>
  <text x="575" y="194" fill="#B8A99A" font-family="sans-serif" font-size="12">④ 时间轴吸附滑动（Scroll）</text>
  <text x="575" y="218" fill="#B8A99A" font-family="sans-serif" font-size="12">⑤ 证书Canvas生成（Input+Save）</text>
  <text x="690" y="246" text-anchor="middle" fill="#6B8E5A" font-family="sans-serif" font-size="11">满足课程要求 ≥3种 ✓</text>

  <!-- Visual -->
  <rect x="560" y="280" width="260" height="170" rx="8" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="560" y="280" width="260" height="4" rx="2" fill="#BD9B4A"/>
  <text x="690" y="310" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">「考古暖黑」视觉系统</text>
  <text x="575" y="342" fill="#B8A99A" font-family="sans-serif" font-size="12">主背景 #141210 地层黑</text>
  <text x="575" y="366" fill="#B8A99A" font-family="sans-serif" font-size="12">强调色 #6B8E5A 玉石绿</text>
  <text x="575" y="390" fill="#B8A99A" font-family="sans-serif" font-size="12">高亮 #BD9B4A 古金</text>
  <text x="575" y="414" fill="#B8A99A" font-family="sans-serif" font-size="12">祥云3层视差 + 粒子浮尘</text>
  <text x="575" y="438" fill="#B8A99A" font-family="sans-serif" font-size="12">Georgia + 楷体 + Calibri</text>

  <!-- Tech -->
  <rect x="560" y="470" width="260" height="140" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="560" y="470" width="260" height="4" rx="2" fill="#8B5E3C"/>
  <text x="690" y="500" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">技术栈</text>
  <text x="575" y="530" fill="#B8A99A" font-family="sans-serif" font-size="12">HTML5 + CSS3 + JavaScript ES6+</text>
  <text x="575" y="554" fill="#B8A99A" font-family="sans-serif" font-size="12">Canvas 2D API（刮擦+证书）</text>
  <text x="575" y="578" fill="#B8A99A" font-family="sans-serif" font-size="12">Touch Events + 图片序列帧</text>
  <text x="575" y="602" fill="#B8A99A" font-family="sans-serif" font-size="12">Video API（过渡转场）</text>

  <!-- FAR RIGHT -->
  <!-- Flow -->
  <rect x="900" y="100" width="260" height="130" rx="8" fill="#BD9B4A" opacity="0.08" stroke="#BD9B4A" stroke-width="1.8"/>
  <rect x="900" y="100" width="260" height="4" rx="2" fill="#BD9B4A"/>
  <text x="1030" y="132" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">叙事流程</text>
  <text x="1030" y="164" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="14" font-weight="bold">加载→漫画→玉匣探方</text>
  <text x="1030" y="188" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="14" font-weight="bold">→3D鉴赏→时间轴→证书</text>
  <text x="1030" y="216" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="11">从圣火到玉匣 · 四千年交互叙事</text>

  <!-- Assets -->
  <rect x="900" y="260" width="260" height="110" rx="8" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.8"/>
  <rect x="900" y="260" width="260" height="4" rx="2" fill="#6B8E5A"/>
  <text x="1030" y="292" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">素材资源</text>
  <text x="915" y="320" fill="#B8A99A" font-family="sans-serif" font-size="11">3D照片44张 + 古画6张 + 漫画16张</text>
  <text x="915" y="342" fill="#B8A99A" font-family="sans-serif" font-size="11">玉匣3张 + 宝匣4张 + 祥云9张</text>
  <text x="915" y="364" fill="#B8A99A" font-family="sans-serif" font-size="11">视频2个 + 图标4个 + 背景1张</text>

  <!-- Features -->
  <rect x="900" y="400" width="260" height="110" rx="8" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.8"/>
  <rect x="900" y="400" width="260" height="4" rx="2" fill="#8B5E3C"/>
  <text x="1030" y="432" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="15" font-weight="bold">核心亮点</text>
  <text x="915" y="460" fill="#B8A99A" font-family="sans-serif" font-size="11">✦ 漫画分镜驱动叙事节奏</text>
  <text x="915" y="482" fill="#B8A99A" font-family="sans-serif" font-size="11">✦ 真实照片3D序列帧旋转</text>
  <text x="915" y="504" fill="#B8A99A" font-family="sans-serif" font-size="11">✦ 祥云多层视差沉浸背景</text>

  <!-- CONNECTING LINES -->
  <g stroke="#44403C" stroke-width="1.8" fill="none" stroke-dasharray="5,4">
    <path d="M200,365 C240,365 240,95 270,95"/>
    <path d="M200,365 C240,365 240,205 270,205"/>
    <path d="M200,365 C240,365 240,315 270,315"/>
    <path d="M200,365 C240,365 240,425 270,425"/>
    <path d="M200,365 C240,365 240,535 270,535"/>

    <path d="M480,160 C520,160 520,160 560,160"/>
    <path d="M480,365 C520,365 520,365 560,365"/>
    <path d="M480,540 C520,540 520,540 560,540"/>

    <path d="M820,160 C860,160 860,165 900,165"/>
    <path d="M820,365 C860,365 860,315 900,315"/>
    <path d="M820,540 C860,540 860,455 900,455"/>
  </g>
</svg>`;

fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/思维导图_新版.svg", svg);

// Convert to PNG
const sharp = require("sharp");
sharp("C:/Users/admin/Desktop/玉见石家河/思维导图_新版.svg")
  .png()
  .toFile("C:/Users/admin/Desktop/玉见石家河/思维导图_新版.png")
  .then(() => console.log("PNG generated"))
  .catch(e => console.error(e));
