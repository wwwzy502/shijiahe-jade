const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, ImageRun
} = require("docx");

// ── SVG Mind Map ──
const mindmapSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 720" width="1400" height="720">
  <defs>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#BD9B4A"/></marker>
    <marker id="arrowJade" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2.5" fill="#6B8E5A"/></marker>
  </defs>

  <!-- Background -->
  <rect width="1400" height="720" fill="#141210" rx="12"/>

  <!-- Title -->
  <text x="700" y="38" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="22" font-weight="bold">「玉见·石家河」页面结构思维导图</text>
  <line x1="200" y1="52" x2="1200" y2="52" stroke="#BD9B4A" stroke-width="1" opacity="0.4"/>

  <!-- ═══════ CENTER NODE ═══════ -->
  <rect x="40" y="280" width="160" height="80" rx="8" fill="#BD9B4A" opacity="0.15" stroke="#BD9B4A" stroke-width="2"/>
  <rect x="40" y="280" width="160" height="4" rx="2" fill="#BD9B4A"/>
  <text x="120" y="312" text-anchor="middle" fill="#F0E8D8" font-family="Georgia,serif" font-size="16" font-weight="bold">玉见·石家河</text>
  <text x="120" y="336" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="10">6场景H5互动体验</text>

  <!-- ═══════ SCENE CARDS (column 2) ═══════ -->
  <!-- S1 -->
  <rect x="280" y="70" width="200" height="74" rx="6" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.5"/>
  <rect x="280" y="70" width="200" height="3" rx="1" fill="#BD9B4A"/>
  <text x="380" y="93" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景一 · 序幕「玉见」</text>
  <text x="380" y="112" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">玉凤剪影 · 粒子浮尘</text>
  <text x="380" y="128" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">点击「开启探索」进入</text>

  <!-- S2 -->
  <rect x="280" y="158" width="200" height="74" rx="6" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.5"/>
  <rect x="280" y="158" width="200" height="3" rx="1" fill="#8B5E3C"/>
  <text x="380" y="181" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景二 · 发掘「拂去尘埃」</text>
  <text x="380" y="200" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">Canvas刮擦 · 发掘玉虎</text>
  <text x="380" y="216" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">60%阈值解锁文物</text>

  <!-- S3 -->
  <rect x="280" y="246" width="200" height="74" rx="6" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.5"/>
  <rect x="280" y="246" width="200" height="3" rx="1" fill="#6B8E5A"/>
  <text x="380" y="269" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景三 · 鉴赏「凝视为真」</text>
  <text x="380" y="288" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">序列帧3D旋转</text>
  <text x="380" y="304" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">多文物切换·放大细节</text>

  <!-- S4 -->
  <rect x="280" y="334" width="200" height="74" rx="6" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.5"/>
  <rect x="280" y="334" width="200" height="3" rx="1" fill="#BD9B4A"/>
  <text x="380" y="357" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景四 · 祭祀「礼敬天地」</text>
  <text x="380" y="376" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">拖拽拼合 · 场景激活</text>
  <text x="380" y="392" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">正确光晕·错误弹回</text>

  <!-- S5 -->
  <rect x="280" y="422" width="200" height="74" rx="6" fill="#1E1A16" stroke="#8CB07A" stroke-width="1.5"/>
  <rect x="280" y="422" width="200" height="3" rx="1" fill="#8CB07A"/>
  <text x="380" y="445" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景五 · 长廊「七秩寻踪」</text>
  <text x="380" y="464" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">横向时间轴·吸附居中</text>
  <text x="380" y="480" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">70年考古大事记</text>

  <!-- S6 -->
  <rect x="280" y="510" width="200" height="74" rx="6" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.5"/>
  <rect x="280" y="510" width="200" height="3" rx="1" fill="#8B5E3C"/>
  <text x="380" y="533" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">场景六 · 尾声「文明回响」</text>
  <text x="380" y="552" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">考古证书·截图保存</text>
  <text x="380" y="568" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">证书分享·首尾呼应</text>

  <!-- ═══════ RIGHT SIDE: BRANCH NODES ═══════ -->
  <!-- Interaction -->
  <rect x="560" y="100" width="230" height="180" rx="6" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.5"/>
  <rect x="560" y="100" width="230" height="3" rx="1" fill="#6B8E5A"/>
  <text x="675" y="123" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">交互形式</text>
  <text x="575" y="148" fill="#B8A99A" font-family="sans-serif" font-size="10">① 刮擦揭示 (Canvas 2D)</text>
  <text x="575" y="168" fill="#B8A99A" font-family="sans-serif" font-size="10">② 序列帧旋转 (Touch Drag)</text>
  <text x="575" y="188" fill="#B8A99A" font-family="sans-serif" font-size="10">③ 拖拽拼合 (Drag &amp; Drop)</text>
  <text x="575" y="208" fill="#B8A99A" font-family="sans-serif" font-size="10">④ 惯性滑动 (Scroll-snap)</text>
  <text x="575" y="228" fill="#B8A99A" font-family="sans-serif" font-size="10">⑤ 证书截图 (html2canvas)</text>
  <text x="675" y="260" text-anchor="middle" fill="#6B8E5A" font-family="sans-serif" font-size="9">≥3种交互形式 ✓</text>

  <!-- Design System -->
  <rect x="560" y="310" width="230" height="150" rx="6" fill="#1E1A16" stroke="#BD9B4A" stroke-width="1.5"/>
  <rect x="560" y="310" width="230" height="3" rx="1" fill="#BD9B4A"/>
  <text x="675" y="333" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">「考古暖黑」视觉系统</text>
  <text x="575" y="358" fill="#B8A99A" font-family="sans-serif" font-size="10">主背景 #141210 地层黑</text>
  <text x="575" y="378" fill="#B8A99A" font-family="sans-serif" font-size="10">强调色 #6B8E5A 玉石绿</text>
  <text x="575" y="398" fill="#B8A99A" font-family="sans-serif" font-size="10">高亮 #BD9B4A 古金</text>
  <text x="575" y="418" fill="#B8A99A" font-family="sans-serif" font-size="10">字体 Georgia + Calibri</text>
  <text x="575" y="438" fill="#B8A99A" font-family="sans-serif" font-size="10">效果 粒子浮尘·纹理·暖光</text>

  <!-- Tech -->
  <rect x="560" y="490" width="230" height="130" rx="6" fill="#1E1A16" stroke="#8B5E3C" stroke-width="1.5"/>
  <rect x="560" y="490" width="230" height="3" rx="1" fill="#8B5E3C"/>
  <text x="675" y="513" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">技术栈</text>
  <text x="575" y="536" fill="#B8A99A" font-family="sans-serif" font-size="10">HTML5 + CSS3 + JS ES6+</text>
  <text x="575" y="556" fill="#B8A99A" font-family="sans-serif" font-size="10">Canvas 2D API (刮擦)</text>
  <text x="575" y="576" fill="#B8A99A" font-family="sans-serif" font-size="10">GSAP (页面过渡+动效)</text>
  <text x="575" y="596" fill="#B8A99A" font-family="sans-serif" font-size="10">html2canvas (证书截图)</text>

  <!-- ═══════ FAR RIGHT: FLOW ═══════ -->
  <rect x="870" y="150" width="240" height="120" rx="6" fill="#BD9B4A" opacity="0.1" stroke="#BD9B4A" stroke-width="1.5"/>
  <rect x="870" y="150" width="240" height="3" rx="1" fill="#BD9B4A"/>
  <text x="990" y="175" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">用户旅程</text>
  <text x="990" y="200" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="13">进入→发掘→鉴赏→复原</text>
  <text x="990" y="222" text-anchor="middle" fill="#BD9B4A" font-family="Georgia,serif" font-size="13">→回顾→传承</text>
  <text x="990" y="250" text-anchor="middle" fill="#B8A99A" font-family="sans-serif" font-size="9">观看者 → 参与者</text>

  <!-- Assets -->
  <rect x="870" y="310" width="240" height="100" rx="6" fill="#1E1A16" stroke="#8CB07A" stroke-width="1.5"/>
  <rect x="870" y="310" width="240" height="3" rx="1" fill="#8CB07A"/>
  <text x="990" y="335" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">所需素材</text>
  <text x="885" y="358" fill="#B8A99A" font-family="sans-serif" font-size="10">文物多角度照片 (6-8张/件)</text>
  <text x="885" y="376" fill="#B8A99A" font-family="sans-serif" font-size="10">祭祀场景想象图</text>
  <text x="885" y="394" fill="#B8A99A" font-family="sans-serif" font-size="10">考古时间轴数据</text>

  <!-- Navigation -->
  <rect x="870" y="450" width="240" height="90" rx="6" fill="#1E1A16" stroke="#6B8E5A" stroke-width="1.5"/>
  <rect x="870" y="450" width="240" height="3" rx="1" fill="#6B8E5A"/>
  <text x="990" y="473" text-anchor="middle" fill="#F0E8D8" font-family="sans-serif" font-size="12" font-weight="bold">导航系统</text>
  <text x="885" y="496" fill="#B8A99A" font-family="sans-serif" font-size="10">底部常驻：页面指示器 · 翻页按钮</text>
  <text x="885" y="514" fill="#B8A99A" font-family="sans-serif" font-size="10">过渡动画：淡入淡出+上移 400ms</text>
  <text x="885" y="532" fill="#B8A99A" font-family="sans-serif" font-size="10">每场景一屏(100vh) 线性叙事</text>

  <!-- ═══════ CONNECTING LINES ═══════ -->
  <g stroke="#44403C" stroke-width="1.5" fill="none" stroke-dasharray="4,3">
    <!-- Center to S1-S6 -->
    <path d="M200,320 C240,320 240,107 280,107" marker-end="url(#arrowGold)"/>
    <path d="M200,320 C240,320 240,195 280,195" marker-end="url(#arrowGold)"/>
    <path d="M200,320 C240,320 240,283 280,283" marker-end="url(#arrowGold)"/>
    <path d="M200,320 C240,320 240,371 280,371" marker-end="url(#arrowGold)"/>
    <path d="M200,320 C240,320 240,459 280,459" marker-end="url(#arrowGold)"/>
    <path d="M200,320 C240,320 240,547 280,547" marker-end="url(#arrowGold)"/>

    <!-- S1 to Interaction -->
    <path d="M480,160 C520,160 520,190 560,190" marker-end="url(#arrowJade)"/>
    <!-- S3 to Design System -->
    <path d="M480,335 C520,335 520,385 560,385" marker-end="url(#arrowGold)"/>
    <!-- S5 to Tech -->
    <path d="M480,530 C520,530 520,555 560,555" marker-end="url(#arrowJade)"/>

    <!-- Interaction to Journey -->
    <path d="M790,190 C830,190 830,210 870,210" marker-end="url(#arrowGold)"/>
    <!-- Design System to Assets -->
    <path d="M790,385 C830,385 830,360 870,360" marker-end="url(#arrowJade)"/>
    <!-- Tech to Navigation -->
    <path d="M790,555 C830,555 830,495 870,495" marker-end="url(#arrowJade)"/>
  </g>
</svg>`;

fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/mindmap.svg", mindmapSvg);
console.log("SVG mind map saved.");

// ── Word Document ──
const PAGE_W = 12240, PAGE_H = 15840;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2;

const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function p(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, font: "Microsoft YaHei", size: 22, ...opts })];
  return new Paragraph({
    spacing: { after: opts.spacing || 120, line: 360 },
    alignment: opts.alignment || AlignmentType.LEFT,
    children: runs,
  });
}

function heading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 200 },
    children: [new TextRun({ text, bold: true, font: "Microsoft YaHei", size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 28 : 24 })],
  });
}

function emptyLine() {
  return new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "", font: "Microsoft YaHei", size: 20 })] });
}

function formatRow(cells, colWidths, isHeader) {
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      borders, width: { size: colWidths[i], type: WidthType.DXA },
      shading: isHeader ? { fill: "1E1A16", type: ShadingType.CLEAR } : undefined,
      margins: cellMargins,
      children: [new Paragraph({
        children: [new TextRun({ text: cell, font: "Microsoft YaHei", size: 20, bold: isHeader, color: isHeader ? "F0E8D8" : "3D3D3D" })]
      })]
    }))
  });
}

function makeTable(headers, rows, colWidths) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [formatRow(headers, colWidths, true), ...rows.map(r => formatRow(r, colWidths, false))],
  });
}

async function main() {
  // Read mind map PNG (converted from SVG via sharp)
  const mindmapPng = fs.readFileSync("C:/Users/admin/Desktop/玉见石家河/mindmap.png");

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, font: "Microsoft YaHei", color: "1E1A16" },
          paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: "Microsoft YaHei", color: "6B8E5A" },
          paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 24, bold: true, font: "Microsoft YaHei", color: "3D3D3D" },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
      ]
    },
    numbering: {
      config: [
        { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ]
    },
    sections: [
      // ═══════ COVER ═══════
      {
        properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
        children: [
          emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: "界面设计方案", size: 56, bold: true, color: "1E1A16", font: "Microsoft YaHei" })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 }, children: [new TextRun({ text: "分页面思维导图与详细说明", size: 32, color: "6B8E5A", font: "Microsoft YaHei" })] }),
          emptyLine(),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "—— H5交互作品「玉见·石家河」——", size: 22, color: "888888", font: "Microsoft YaHei" })] }),
          emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "吴泽远", size: 26, color: "3D3D3D", font: "Microsoft YaHei" })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2026年7月", size: 22, color: "888888", font: "Microsoft YaHei" })] }),
        ]
      },

      // ═══════ MAIN CONTENT ═══════
      {
        properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
        headers: {
          default: new Header({ children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "6B8E5A", space: 4 } },
            children: [new TextRun({ text: "界面设计方案 · 玉见石家河", size: 16, color: "999999", font: "Microsoft YaHei" })],
          })] })
        },
        footers: {
          default: new Footer({ children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "- ", size: 16, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "999999" }), new TextRun({ text: " -", size: 16, color: "999999" })],
          })] })
        },
        children: [
          new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 1: Mind Map ──
          heading("一、页面结构思维导图", HeadingLevel.HEADING_1),
          emptyLine(),
          p("以下为「玉见·石家河」全部6个场景的页面结构思维导图，展示了各场景之间的逻辑关系、交互形式分布、视觉系统和技术支撑。"),

          // Insert mind map image
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [new ImageRun({
              type: "png",
              data: mindmapPng,
              transformation: { width: 600, height: 310 },
              altText: { title: "页面结构思维导图", description: "玉见石家河6场景思维导图", name: "mindmap" },
            })]
          }),
          emptyLine(),

          // ── Chapter 2: Scene Details ──
          heading("二、分页面设计方案", HeadingLevel.HEADING_1),
          emptyLine(),

          // Scene 1
          heading("2.1 场景一：序幕「玉见」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("第一印象，营造神秘感，引导用户进入体验。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("全屏垂直居中。Canvas粒子浮尘背景层 + 玉凤剪影SVG（呼吸发光动画）+ 主标题「玉见·石家河」+ 副标题「长江中游史前文明中心」+ 「开启探索」按钮。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("点击「开启探索」过渡到场景二（淡入淡出400ms）。Canvas粒子持续浮动。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("玉凤简化剪影SVG。")]),
          emptyLine(),

          // Scene 2
          heading("2.2 场景二：发掘「拂去尘埃」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("核心交互页，用户模拟考古发掘过程。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("顶部导航栏（返回+页面标题+指示器）+ Canvas刮擦区域占据主体 + 下方进度条 + 文物出土信息 + 操作按钮。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("手指在泥土纹理覆盖层滑动 → Canvas globalCompositeOperation: 'destination-out' 擦除像素 → 露出底层玉虎高清图。擦除面积>60%后「查看文物」按钮亮起。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("玉虎高清正面图、泥土纹理覆盖图。")]),
          emptyLine(),

          // Scene 3
          heading("2.3 场景三：鉴赏「凝视为真」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("文物细节深度欣赏，模拟把玩体验。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("文物展示区（主体）+ 底部文物缩略图切换栏 + 下方文物信息卡片（名称/尺寸/出土地/描述）+ 放大细节按钮。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("拖拽旋转：6-8张序列帧图片根据拖拽距离动态切换，模拟3D旋转。左右滑动缩略图栏切换文物（玉凤/玉虎/玉人首/玉蝉）。点击放大镜按钮弹出局部放大层。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("每件文物6-8张多角度照片 + 文物基本信息。")]),
          emptyLine(),

          // Scene 4
          heading("2.4 场景四：祭祀「礼敬天地」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("理解先民祭祀文化，参与式复原体验。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("祭祀场景底图（含虚线目标位：祭坛中心、祭司、玉器、祭品、火堆）+ 底部横向拖拽元素栏。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("从底部拖拽元素到场景中虚线目标区。放置正确→元素落入+震动反馈+光晕确认。放置错误→弹回原位+提示'再试试'。全部归位后触发场景'激活'动画（火焰燃起+祭坛发光+祭司动作）。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("石家河祭祀场景想象插画（含空白目标位）+ 玉琮/玉璧/祭司/火堆等独立元素图。")]),
          emptyLine(),

          // Scene 5
          heading("2.5 场景五：长廊「七秩寻踪」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("回顾70年考古历程，信息型交互。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("横向时间轴（CSS scroll-snap）+ 下方详情卡片联动显示。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("时间轴横向惯性滑动，节点自动吸附居中。选中节点放大突出+下方详情卡片更新。时间节点标注'重大发现'/'一般进展'。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("10个关键年份的事件描述+配图。")]),
          emptyLine(),

          // Scene 6
          heading("2.6 场景六：尾声「文明的回响」", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "定位：", bold: true }), new TextRun("情感收束+社交分享，形成闭环体验。")]),
          p([new TextRun({ text: "布局：", bold: true }), new TextRun("Canvas粒子背景 + 完整玉凤剪影（呼应开头）+ '你已走完石家河四千年文明之旅'文案 + 考古发现证书卡片 + 操作按钮。")]),
          p([new TextRun({ text: "交互：", bold: true }), new TextRun("「保存证书」→html2canvas截图生成长图保存。「再次探索」→回到场景一。证书内容根据用户行为动态填充。")]),
          p([new TextRun({ text: "素材需求：", bold: true }), new TextRun("证书模板设计。")]),
          emptyLine(),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 3: Interaction Summary ──
          heading("三、交互形式汇总", HeadingLevel.HEADING_1),
          emptyLine(),
          makeTable(
            ["场景", "交互形式", "技术实现", "所属类型"],
            [
              ["场景一·序幕", "点击触发", "click事件 + CSS transition", "基础交互"],
              ["场景二·发掘", "Canvas刮擦揭示", "Canvas 2D + globalCompositeOperation", "触觉模拟型"],
              ["场景三·鉴赏", "拖拽序列帧旋转", "Touch/Mouse事件 + 图片序列切换", "3D模拟型"],
              ["场景四·祭祀", "拖拽拼合复原", "Drag & Drop API + 碰撞检测", "拼图组合型"],
              ["场景五·长廊", "横向惯性滑动", "CSS scroll-snap + 惯性滚动", "浏览导航型"],
              ["场景六·尾声", "证书截图保存", "html2canvas + 长图保存", "社交分享型"],
            ],
            [1500, 2000, 3500, 2360]
          ),
          emptyLine(),
          p("总计6种交互形式，超过课程要求的至少3种。所有交互均为自主编写代码实现，不依赖任何第三方模板。"),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 4: Visual Spec ──
          heading("四、视觉设计规范", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("4.1 色彩系统", HeadingLevel.HEADING_2),
          makeTable(
            ["色值", "角色", "用途说明"],
            [
              ["#141210", "主背景·地层黑", "全作品基底色，模拟考古地层深处"],
              ["#1E1A16", "次级背景·暖暗", "卡片/区块底色"],
              ["#6B8E5A", "强调色·玉石绿", "玉器主题关联色，核心交互元素"],
              ["#BD9B4A", "高亮·古金", "按钮、重点信息、文物等级标识"],
              ["#8B5E3C", "辅助·陶土", "暖色点缀，先民陶器生活感"],
              ["#9B3A3A", "祭祀红（谨慎使用）", "仅祭祀场景强调，朱砂色"],
              ["#F0E8D8", "主文字·羊皮纸", "深色背景上的正文文字"],
              ["#B8A99A", "辅文字·弱化", "次要信息、提示文案"],
            ],
            [1300, 2500, 5560]
          ),
          emptyLine(),

          heading("4.2 字体规范", HeadingLevel.HEADING_2),
          makeTable(
            ["层级", "字体", "大小/字重", "场景"],
            [
              ["大标题", "Georgia (Serif)", "36-54pt / Bold", "场景主标题"],
              ["副标题", "Georgia (Serif)", "20-28pt / Bold", "二级标题"],
              ["正文", "Calibri (Sans-serif)", "12-14pt / Regular", "描述文字、文物信息"],
              ["提示/辅助", "Calibri (Sans-serif)", "9-11pt / Light", "提示文案、时间轴标签"],
              ["按钮文字", "Calibri (Sans-serif)", "14-16pt / Medium", "CTA按钮文字"],
            ],
            [1500, 2000, 2000, 3860]
          ),
          emptyLine(),

          heading("4.3 动效规范", HeadingLevel.HEADING_2),
          makeTable(
            ["动效类型", "持续时间", "缓动函数", "用途"],
            [
              ["页面过渡", "400ms", "ease-out", "淡入淡出+上移20px"],
              ["按钮hover", "200ms", "ease", "颜色/透明度变化"],
              ["元素出现", "300ms", "ease-out", "卡片/信息渐显"],
              ["粒子浮动", "4-6s循环", "linear", "Canvas背景粒子"],
              ["呼吸发光", "2s循环", "ease-in-out", "玉凤剪影光晕"],
              ["激活动画", "600ms", "ease-out", "祭祀场景激活动效"],
            ],
            [1600, 1600, 1860, 4300]
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 5: Responsive ──
          heading("五、响应式与兼容性", HeadingLevel.HEADING_1),
          emptyLine(),
          heading("5.1 设备适配", HeadingLevel.HEADING_2),
          p("设计基准：375px（iPhone SE）至 768px（iPad竖屏），以移动端为主。"),

          makeTable(
            ["断点", "适配策略"],
            [
              ["375-414px (主流手机)", "主要设计基准，100vh全屏，44px最小触控区域"],
              ["414-768px (大屏手机/平板)", "内容区域等比放大，最大宽度限制768px"],
              ["768px+ (桌面)", "居中显示，两侧留黑边，模拟手机体验"],
            ],
            [2500, 6860]
          ),
          emptyLine(),

          heading("5.2 浏览器兼容", HeadingLevel.HEADING_2),
          p("目标浏览器：微信内置浏览器（WebView）、Safari（iOS）、Chrome（Android/桌面）。"),

          makeTable(
            ["特性", "兼容策略"],
            [
              ["Canvas 2D API", "所有目标浏览器均支持，降级：显示静态图片"],
              ["CSS scroll-snap", "Safari需-webkit-前缀，降级：普通滚动"],
              ["Drag & Drop API", "移动端使用Touch Events替代，鼠标设备使用原生D&D"],
              ["html2canvas", "第三方库，测试微信WebView兼容性"],
              ["prefers-reduced-motion", "检测系统动效偏好设置，必要时禁用动效"],
              ["GSAP", "业界标准库，全平台兼容，CDN引入"],
            ],
            [2500, 6860]
          ),
        ]
      }
    ]
  });

  const outPath = "C:/Users/admin/Desktop/玉见石家河/界面设计方案_玉见石家河_v2.docx";
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log("Word document generated: " + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
