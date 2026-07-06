const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, TableOfContents,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak
} = require("docx");

const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1440, CW = PAGE_W - MARGIN * 2;
const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cm = { top: 80, bottom: 80, left: 120, right: 120 };

function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 240 }, children: [new TextRun({ text, bold: true, font: "Microsoft YaHei", size: 36 })] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 180 }, children: [new TextRun({ text, bold: true, font: "Microsoft YaHei", size: 28, color: "6B8E5A" })] }); }
function h3(text) { return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 120 }, children: [new TextRun({ text, bold: true, font: "Microsoft YaHei", size: 24 })] }); }
function p(text, opts = {}) { return new Paragraph({ spacing: { after: 120, line: 360 }, children: [new TextRun({ text, font: "Microsoft YaHei", size: 22, ...opts })] }); }
function empty() { return new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "", font: "Microsoft YaHei", size: 20 })] }); }
function boldP(text) { return p(text, { bold: true }); }

function makeTable(headers, rows, colWidths) {
  const headerRow = new TableRow({ children: headers.map((h, i) => new TableCell({ borders, width: { size: colWidths[i], type: WidthType.DXA }, shading: { fill: "1E1A16", type: ShadingType.CLEAR }, margins: cm, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "F0E8D8", font: "Microsoft YaHei", size: 20 })] })] })) });
  const dataRows = rows.map(row => new TableRow({ children: row.map((cell, i) => new TableCell({ borders, width: { size: colWidths[i], type: WidthType.DXA }, margins: cm, children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Microsoft YaHei", size: 20 })] })] })) }));
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] });
}

function bulletList(items) {
  return items.map(item => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80, line: 340 }, children: [new TextRun({ text: item, font: "Microsoft YaHei", size: 22 })] }));
}

function coverSection(title, subtitle, author, date) {
  const children = [];
  for (let i = 0; i < 8; i++) children.push(empty());
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: title, size: 56, bold: true, color: "1E1A16", font: "Microsoft YaHei" })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 }, children: [new TextRun({ text: subtitle, size: 32, color: "6B8E5A", font: "Microsoft YaHei" })] }));
  children.push(empty());
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "—— H5交互作品「玉见·石家河」——", size: 22, color: "888888", font: "Microsoft YaHei" })] }));
  for (let i = 0; i < 5; i++) children.push(empty());
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: author, size: 26, font: "Microsoft YaHei" })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: date, size: 22, color: "888888", font: "Microsoft YaHei" })] }));
  return { properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, children };
}

function mainSection(children) {
  return {
    properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "6B8E5A", space: 4 } }, children: [new TextRun({ text: "玉见·石家河", size: 16, color: "999999", font: "Microsoft YaHei" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "- ", size: 16, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "999999" }), new TextRun({ text: " -", size: 16, color: "999999" })] })] }) },
    children
  };
}

// ═══════════ DOC 1: 资料收集 ═══════════
async function doc1() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Microsoft YaHei" }, paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Microsoft YaHei", color: "6B8E5A" }, paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Microsoft YaHei" }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
      ]
    },
    numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }, { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
    sections: [
      coverSection("石家河文化", "资料搜集与信息整理", "吴泽远", "2026年7月"),
      mainSection([
        new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ children: [new PageBreak()] }),

        h1("一、石家河文化概述"),
        h2("1.1 遗址概况"),
        p("石家河遗址位于湖北省天门市石家河镇，地处江汉平原北部、大洪山南麓，是中国长江中游地区迄今发现的规模最大、等级最高、保存最完整的新石器时代聚落遗址群。遗址分布面积约8平方公里，核心区域约2.5平方公里，年代跨度约距今6500年至4000年。"),
        p("遗址群由40余处遗址点组成，包括谭家岭、肖家屋脊、罗家柏岭、邓家湾、印信台等重要地点。其中谭家岭古城面积达120万平方米，是长江中游已知最大的史前城址。遗址文化层堆积深厚，包含大溪文化、屈家岭文化、石家河文化及后石家河文化等多个时期遗存。"),
        h2("1.2 文化定位与学术价值"),
        p("石家河文化（约距今4500-4200年）是长江中游地区新石器时代末期至铜石并用时代的考古学文化。以发达的稻作农业、精美的玉器工艺、大规模的城址营建和复杂的祭祀体系为特征，代表了长江中游史前文明的最高成就。2017年入选「全国十大考古新发现」，2021年入选「百年百大考古发现」。"),
        p("学术界普遍认为，石家河文化是长江中游史前文明的中心，与黄河中游的陶寺文化、黄河下游的龙山文化、长江下游的良渚文化共同构成了中华文明「多元一体」格局的重要支柱。"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("二、重点文物信息"),
        h2("2.1 玉凤"),
        p("出土地点：肖家屋脊遗址（1987年）。年代：后石家河文化，距今约4200年。尺寸：长约7.5cm，宽约3.3cm，厚约0.5cm。材质：透闪石软玉（青白玉）。"),
        p("玉凤呈片状，凤鸟作展翅欲飞状，头部高昂，双目圆睁，喙部尖长，颈部细长弯曲，双翅展开呈扇形，尾部上翘。通体以阴线刻画出羽毛纹理，线条流畅细腻，形态生动传神。被誉为「中华第一凤」。"),
        h2("2.2 玉虎"),
        p("出土地点：肖家屋脊遗址（1987年）。年代：后石家河文化，距今约4200年。尺寸：长约4.8cm，宽约3.2cm，厚约0.7cm。材质：透闪石软玉（青玉）。"),
        p("玉虎呈蹲踞状，虎首高昂，双耳竖立，双目圆睁，口部微张露出利齿。身体蜷曲有力，尾部卷曲，四肢粗壮。虎身以阴线刻画出斑纹，整体造型浑厚有力、气势威猛。"),
        h2("2.3 玉人首"),
        p("出土地点：谭家岭遗址（2015年）。年代：后石家河文化，距今约4200-4000年。材质：透闪石软玉。"),
        p("玉人首为圆雕作品，面部刻画细致，双耳佩戴耳环，头顶有冠饰。面部表情庄严肃穆，五官比例协调，展现出高超的圆雕技艺。其精湛工艺在东亚首屈一指。"),
        h2("2.4 玉蝉"),
        p("出土地点：谭家岭遗址（2015年）。年代：后石家河文化，距今约4200-4000年。"),
        p("玉蝉造型写实，蝉翼纹理清晰，形态生动。蝉在中国传统文化中象征复活与永生，玉蝉可能作为丧葬仪式中的重要随葬品。"),
        h2("2.5 陶鼎"),
        p("出土地点：邓家湾遗址。年代：距今约4500年。"),
        p("石家河文化典型陶器，三足鼎立，器身饰有篮纹。是先民日常炊煮和祭祀活动的重要器物。"),
        h2("2.6 玉鹰"),
        p("出土地点：谭家岭遗址。年代：距今约4000年。"),
        p("玉鹰展翅，造型矫健有力。鹰在石家河文化中象征力量与天空，可能是部落图腾或权力象征。"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("三、考古发现时间线"),
        makeTable(["年份", "事件", "重要性"], [
          ["1954", "石家河遗址首次发现", "开启石家河考古序幕"],
          ["1955", "中国科学院首次考古发掘", "确认遗址文化层堆积"],
          ["1987", "肖家屋脊遗址发掘，玉虎玉凤出土", "重新定义长江中游史前文明高度"],
          ["1990", "罗家柏岭遗址发掘", "发现大型祭祀遗存"],
          ["2008", "中华文明探源工程", "全面测绘遗址范围"],
          ["2015", "谭家岭瓮棺葬重大发现", "出土玉器240余件"],
          ["2017", "入选全国十大考古新发现", "学术界最高级别认可"],
          ["2021", "入选百年百大考古发现", "中国考古里程碑式遗址"],
          ["2024", "石家河考古70周年", "持续考古与保护利用"]
        ], [1200, 4500, 3660]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("四、先民生活与祭祀"),
        h2("4.1 日常生活"),
        p("石家河先民以稻作农业为主要生计方式。遗址中发现大量碳化稻谷和稻田遗迹。同时进行狩猎、捕鱼和采集作为补充。遗址出土了大量陶器（鼎、罐、碗、盆等），纹饰以篮纹、绳纹、方格纹为主。"),
        p("先民居住在干栏式或半地穴式建筑中。纺织业已有相当发展，出土了陶纺轮等工具。玉器制作是最突出的手工业成就，包括切割、钻孔、打磨、雕刻等多道工序。"),
        h2("4.2 祭祀活动"),
        p("祭祀在石家河先民社会生活中占据核心地位。罗家柏岭遗址发现了面积达数千平方米的大型祭祀场所，包括祭坛、祭祀坑和燎祭遗迹。邓家湾遗址出土了大量陶塑动物和人物像，可能是祭祀用品。"),
        p("石家河文化的祭祀对象可能包括天地、祖先和自然神祇。玉器（玉琮、玉璧）在祭祀中扮演重要角色，被视为沟通天地的法器。后石家河时期的瓮棺葬体现了独特的丧葬仪式。"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("五、H5作品素材清单"),
        h2("5.1 文物图片"),
        makeTable(["文物", "数量", "用途", "优先级"], [
          ["玉虎", "8张多角度", "3D旋转展示", "高"],
          ["玉凤", "8张多角度", "3D旋转展示", "高"],
          ["玉人首", "8张多角度", "3D旋转展示", "高"],
          ["玉蝉", "8张多角度", "3D旋转展示", "高"],
          ["陶鼎", "4张多角度", "3D旋转展示", "高"],
          ["玉鹰", "8张多角度", "3D旋转展示", "高"],
          ["古画风文物图", "6张", "刮擦底层显示", "高"],
          ["玉匣（开/关）", "2张", "玉匣交互", "高"],
          ["卷轴底图", "1张", "卷轴展示", "高"],
          ["漫画分镜", "16张", "三章漫画", "高"]
        ], [1500, 1500, 3000, 1000]),
        h2("5.2 多媒体素材"),
        makeTable(["类型", "内容", "格式", "优先级"], [
          ["开场视频", "石家河文明主题过渡动画", "MP4", "高"],
          ["玉匣视频", "玉匣开启过渡动画", "MP4", "高"],
          ["祥云图片", "9张多层视差背景", "PNG", "高"],
          ["背景长卷", "地质探方背景", "PNG", "中"],
          ["手指图标", "点击引导光标", "PNG", "中"],
          ["铲子图标", "刮擦光标", "PNG", "低"]
        ], [1500, 3000, 1000, 1000]),
        h2("5.3 参考文献"),
        p("1. 湖北省文物考古研究所.《肖家屋脊——天门石家河考古发掘报告》.文物出版社,1999."),
        p("2. 湖北省文物考古研究所.《谭家岭——天门石家河遗址考古报告》.科学出版社,2018."),
        p("3. 孟华平.石家河遗址近年考古新发现与认识.《考古》,2017(7)."),
        p("4. 中国考古网(kaogu.cn) · 湖北省博物馆(hbww.org) · 国家文物局(ncha.gov.cn)")
      ])
    ]
  });

  const buf1 = await Packer.toBuffer(doc);
  fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/石家河文化资料搜集_新版.docx", buf1);
  console.log("Doc 1 done");
}

// ═══════════ DOC 2: 界面设计方案 ═══════════
async function doc2() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Microsoft YaHei" }, paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Microsoft YaHei", color: "6B8E5A" }, paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Microsoft YaHei" }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
      ]
    },
    numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }, { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
    sections: [
      coverSection("界面设计方案", "分页面详细设计说明", "吴泽远", "2026年7月"),
      mainSection([
        new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ children: [new PageBreak()] }),

        h1("一、作品整体架构"),
        p("「玉见·石家河」是一个基于HTML5的移动端交互体验作品，以「从圣火到玉匣」为核心叙事线，通过漫画分镜、地质探方、3D鉴赏、时间轴等多种交互形式，带领用户沉浸式体验石家河四千年文明。"),
        empty(),
        boldP("用户旅程："),
        p("加载页（开始祭祀）→ 漫画上篇·备礼（8格分镜）→ 漫画下篇·燃火（8格分镜）→ 终章·圣火宝匣（3格+玉匣浮现）→ 自动跳转玉匣页 → 点击玉匣播放视频 → 卷轴展开+地质探方出现 → 刮擦发掘文物 → 点击查看3D → 时间轴 → 考古证书"),
        empty(),
        makeTable(["页面", "内容", "交互形式"], [
          ["加载页", "凤凰图标旋转+进度条+「开始祭祀」按钮", "点击进入"],
          ["漫画三章（上篇/下篇/终章）", "24格不规则漫画排版，点击弹出分镜，白色波纹引导", "点击翻页+章节切换"],
          ["玉匣+卷轴", "玉匣点击→视频播放→卷轴展开", "点击触发+视频过渡"],
          ["地质探方", "深度标尺+多层土壤+6个不规则刮擦区+化石杂物", "Canvas刮擦+点击3D"],
          ["3D文物鉴赏", "真实多角度照片序列帧旋转+粒子浮尘背景", "拖拽旋转360°"],
          ["时间轴", "横向时间线+节点吸附+聚焦节点图片放大", "拖拽/滚轮滑动"],
          ["考古证书", "输入姓名生成专属证书+保存PNG", "输入+Canvas生成"]
        ], [2000, 3500, 3860]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("二、分页面设计详述"),

        h2("2.1 加载页"),
        p("视觉：纯黑背景，双层旋转光环（古金+玉绿），用户自定义图标居中旋转，下方进度条逐渐填充。"),
        p("文案变化：正在连接石家河文明... → 正在唤醒千年玉魂... → 即将开启时空之门... → 加载完成 → 显示「开始祭祀」按钮。"),
        p("交互：点击按钮，加载页淡出→开场视频淡入。"),

        h2("2.2 漫画三章（礼敬天地）"),
        p("上篇「备礼」：8格不规则漫画，2行3列混合排版，含梯形裁切面板。内容：夜空繁星→先民汇聚→祭司步入→玉琮礼天→玉璧礼地→玉圭祭祖→祭品陈列→火盆静候。"),
        p("下篇「燃火」：8格漫画，宽幅定场+四窄格+全宽收尾。内容：对天祷告→敬告大地→呼唤先祖→火星溅起→火焰燃起→凤鸟火光→先民跪拜→仪式完成。"),
        p("终章「圣火宝匣」：3格漫画依次弹出→渐隐→黑屏→宝匣图从中心放大浮现。"),
        p("交互：点击页面弹出下一格（缩放弹入动画），手指图标+白色波纹提示。全部弹出后章节按钮亮起可翻页。漫画终章宝匣浮现后1.5秒自动跳转玉匣页。"),

        h2("2.3 玉匣+卷轴+地质探方"),
        p("初始仅显示居中玉匣图片，点击玉匣→播放玉匣视频（全屏）→视频结束后玉匣切换为打开状态、卷轴从上方展开（古文风格楷体排版）、地质探方从下方出现。"),
        p("地质探方：左侧深度标尺0-11.5m，5层土壤颜色从浅褐渐变至深黑。6件文物以不规则形状散布在不同深度，深度根据实际考古埋藏设定。深层有化石杂物装饰（骨骼、贝壳、牙齿等）。"),
        p("每件文物由Canvas泥土层覆盖（不规则blob形状），刮擦后泥土被擦除、文物图透明度从0渐变至100%。刮够35笔后出现白色波纹，点击进入3D鉴赏。"),

        new Paragraph({ children: [new PageBreak()] }),

        h2("2.4 3D文物鉴赏"),
        p("全屏深色遮罩，上方标题「凝视为真」，中央大尺寸文物展示区（440px），拖拽左右旋转。背景有金色粒子浮尘效果，下方信息卡片（楷体标题+金线分隔+详细信息）。"),
        p("6件文物均使用真实多角度照片（玉虎/玉凤/玉人首/玉蝉8张，陶鼎4张，玉鹰8张），拖拽距离切换序列帧模拟3D旋转。"),

        h2("2.5 时间轴"),
        p("横向时间线设计，9个节点对应1954-2024年大事记。鼠标拖拽或滚轮滑动，节点吸附居中，当前节点放大+金色高亮+图片弹出，两侧节点缩小+降低透明度。下方详情文字随节点切换更新。"),

        h2("2.6 考古证书"),
        p("用户输入姓名→点击「生成证书」→羊皮纸质感证书（双层边框+火漆印章）+Canvas绘制高清PNG→一键保存分享。"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("三、视觉设计系统"),
        h2("3.1 色彩体系"),
        makeTable(["角色", "色值", "用途"], [
          ["主背景·地层黑", "#141210", "全作品基底色"],
          ["次级背景·暖暗", "#1E1A16", "卡片/区块底色"],
          ["强调色·玉石绿", "#6B8E5A", "玉器主题关联色"],
          ["高亮·古金", "#BD9B4A", "按钮/重点信息"],
          ["辅助·陶土", "#8B5E3C", "暖色点缀"],
          ["主文字·羊皮纸", "#F0E8D8", "深色背景正文"],
          ["辅文字", "#B8A99A", "次要信息"]
        ], [2500, 2000, 4860]),
        h2("3.2 字体规范"),
        makeTable(["层级", "字体", "大小"], [
          ["大标题", "Georgia (Serif)", "36-54pt Bold"],
          ["正文/信息", "Calibri (Sans-serif)", "11-14pt"],
          ["卷轴文字", "楷体 (KaiTi)", "13-22pt"],
          ["证书标题", "Georgia (Serif)", "20-36pt"]
        ], [2000, 2500, 2000]),
        h2("3.3 核心效果"),
        p("Canvas粒子浮尘 · 祥云多层视差滚动（3层9张云图） · 半透明噪点纹理叠加 · 刮擦泥土质感 · 漫画弹入动画（scale+贝塞尔回弹） · 视频淡入淡出过渡"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("四、交互设计汇总"),
        makeTable(["交互形式", "应用场景", "技术方案", "交互类型"], [
          ["Canvas刮擦", "地质探方6件文物", "Canvas destination-out + 笔刷", "触觉模拟型"],
          ["漫画翻页弹入", "漫画三章24格", "CSS transition + scale回弹", "叙事驱动型"],
          ["3D序列帧旋转", "文物鉴赏", "Touch/Mouse拖拽 + 图片序列", "3D模拟型"],
          ["时间轴吸附滑动", "七秩寻踪", "CSS transform + snap", "浏览导航型"],
          ["证书Canvas生成", "考古证书", "Canvas绘制 + toBlob保存", "社交分享型"],
          ["视频过渡转场", "加载→漫画, 玉匣→卷轴", "video opacity fade", "过渡型"]
        ], [1800, 2000, 3000, 1800]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("五、技术路线"),
        h2("5.1 核心技术栈"),
        p("HTML5 + CSS3 + JavaScript ES6+，单文件架构，无框架依赖。"),
        bulletList([
          "Canvas 2D API：刮擦交互 + 证书生成 + 粒子效果",
          "CSS Transition/Animation：漫画弹入 + 页面过渡 + 祥云视差",
          "Touch Events + Mouse Events：拖拽旋转 + 时间轴滑动",
          "图片序列帧：3D文物旋转展示",
          "Video API：开场视频 + 玉匣视频播放控制"
        ]),
        h2("5.2 兼容性"),
        p("移动端优先设计（375-768px响应式），兼容微信内置浏览器/Safari/Chrome。Canvas刮擦使用笔划计数替代getImageData避免file://跨域限制。"),

        new Paragraph({ children: [new PageBreak()] }),

        h1("六、素材文件清单"),
        makeTable(["类别", "文件", "数量"], [
          ["3D文物照片", "3D/玉虎/ 玉凤/ 玉人首/ 玉蝉/ 陶鼎/ 玉鹰/", "44张"],
          ["古画风文物图", "古画风/玉虎.png 等", "6张"],
          ["漫画分镜", "漫画/1.png ~ 16.jpg", "16张"],
          ["玉匣+卷轴", "玉匣关上.png 玉匣打开.png 卷轴.png", "3张"],
          ["宝匣终章", "玉匣/a.jpg ~ d.jpg", "4张"],
          ["祥云背景", "祥云/祥云1~9.png", "9张"],
          ["图标光标", "图标.png 手指.png 铲子.png 箭头.png", "4张"],
          ["视频", "开场动画.mp4 玉匣视频.mp4", "2个"],
          ["背景", "背景.png", "1张"]
        ], [2500, 4500, 1500])
      ])
    ]
  });

  const buf2 = await Packer.toBuffer(doc);
  fs.writeFileSync("C:/Users/admin/Desktop/玉见石家河/界面设计方案_玉见石家河_新版.docx", buf2);
  console.log("Doc 2 done");
}

async function main() {
  await doc1();
  await doc2();
  console.log("All done!");
}

main().catch(err => { console.error(err); process.exit(1); });
