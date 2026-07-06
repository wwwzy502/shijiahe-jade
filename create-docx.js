const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak
} = require("docx");

// ── Design constants ──
const PAGE_W = 12240, PAGE_H = 15840;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2; // 9360

const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// ── Helpers ──
function p(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, ...opts })];
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
  return new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "", size: 20 })] });
}

function makeTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      borders, width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: "1E1A16", type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "F0E8D8", font: "Microsoft YaHei", size: 22 })] })],
    }))
  });

  const dataRows = rows.map(row =>
    new TableRow({
      children: row.map((cell, i) => new TableCell({
        borders, width: { size: colWidths[i], type: WidthType.DXA },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Microsoft YaHei", size: 20 })] })],
      }))
    })
  );

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

async function main() {
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
        { reference: "bullets2", levels: [{ level: 0, format: LevelFormat.BULLET, text: "○", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ]
    },
    sections: [
      // ═══════════ COVER PAGE ═══════════
      {
        properties: {
          page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } }
        },
        children: [
          emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
          p([new TextRun({ text: "石家河文化", size: 60, bold: true, color: "1E1A16", font: "Microsoft YaHei" })], { alignment: AlignmentType.CENTER, spacing: 240 }),
          p([new TextRun({ text: "资料搜集与信息整理", size: 36, color: "6B8E5A", font: "Microsoft YaHei" })], { alignment: AlignmentType.CENTER, spacing: 360 }),
          emptyLine(),
          p([new TextRun({ text: "—— H5交互作品「玉见·石家河」前期调研 ——", size: 22, color: "888888", font: "Microsoft YaHei" })], { alignment: AlignmentType.CENTER }),
          emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
          p([new TextRun({ text: "吴泽远", size: 26, color: "3D3D3D", font: "Microsoft YaHei" })], { alignment: AlignmentType.CENTER }),
          p([new TextRun({ text: "2026年7月", size: 24, color: "888888", font: "Microsoft YaHei" })], { alignment: AlignmentType.CENTER }),
        ]
      },

      // ═══════════ TOC + MAIN CONTENT ═══════════
      {
        properties: {
          page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } }
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              alignment: AlignmentType.RIGHT,
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "6B8E5A", space: 4 } },
              children: [new TextRun({ text: "石家河文化资料搜集", size: 16, color: "999999", font: "Microsoft YaHei" })],
            })]
          })
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "- ", size: 16, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "999999" }), new TextRun({ text: " -", size: 16, color: "999999" })],
            })]
          })
        },
        children: [
          new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 1: 文化背景 ──
          heading("一、石家河文化背景概述", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("1.1 遗址概况", HeadingLevel.HEADING_2),
          p("石家河遗址位于湖北省天门市石家河镇，地处江汉平原北部、大洪山南麓，是中国长江中游地区迄今发现的规模最大、等级最高、保存最完整的新石器时代聚落遗址群。遗址分布面积约8平方公里，核心区域约2.5平方公里，年代跨度约距今6500年至4000年。"),
          p("遗址群由40余处遗址点组成，包括谭家岭、肖家屋脊、罗家柏岭、邓家湾、印信台等重要地点。其中谭家岭古城面积达120万平方米，是长江中游已知最大的史前城址。遗址文化层堆积深厚，包含了大溪文化、屈家岭文化、石家河文化及后石家河文化等多个时期的遗存。"),

          heading("1.2 考古发现历程", HeadingLevel.HEADING_2),
          p("1954年冬，湖北省文管会配合石龙过江水库干渠工程进行文物调查时首次发现石家河遗址。1955年，中国科学院考古研究所等单位对遗址进行了首次考古发掘。此后60余年间，北京大学、湖北省文物考古研究所等单位持续在此开展工作，取得了一系列重大考古成果。"),
          p("1987年至1992年，肖家屋脊遗址的发掘出土了以玉虎、玉凤为代表的精美玉器，引起了国内外学术界的广泛关注。2015年，谭家岭遗址发现了4座后石家河文化时期的瓮棺葬，出土玉器240余件，是迄今长江中游地区出土玉器数量最多、等级最高的一次发现。2017年，石家河遗址入选'全国十大考古新发现'，2021年入选'百年百大考古发现'。"),

          heading("1.3 文化定位与学术价值", HeadingLevel.HEADING_2),
          p("石家河文化（约距今4500-4200年）是长江中游地区新石器时代末期至铜石并用时代的考古学文化，其后续为后石家河文化（约距今4200-4000年）。石家河文化以发达的稻作农业、精美的玉器工艺、大规模的城址营建和复杂的祭祀体系为特征，代表了长江中游史前文明的最高成就。"),
          p("学术界普遍认为，石家河文化是长江中游史前文明的中心，与黄河中游的陶寺文化、黄河下游的龙山文化、长江下游的良渚文化共同构成了中华文明'多元一体'格局的重要支柱。石家河玉器的工艺水平和文化内涵，实证了长江流域与黄河流域同为中华文明的核心发源地。"),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 2: 重点文物 ──
          heading("二、重点文物信息", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("2.1 玉凤", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "出土地点：", bold: true }), new TextRun("肖家屋脊遗址（1987年）")]),
          p([new TextRun({ text: "年代：", bold: true }), new TextRun("后石家河文化，距今约4200年")]),
          p([new TextRun({ text: "尺寸：", bold: true }), new TextRun("长约7.5cm，宽约3.3cm，厚约0.5cm")]),
          p([new TextRun({ text: "材质：", bold: true }), new TextRun("透闪石软玉（青白玉）")]),
          p([new TextRun({ text: "文物描述：", bold: true }), new TextRun("玉凤呈片状，凤鸟作展翅欲飞状，头部高昂，双目圆睁，喙部尖长，颈部细长弯曲，双翅展开呈扇形，尾部上翘。通体以阴线刻画出羽毛纹理，线条流畅细腻，形态生动传神。整体造型简洁而富有力度，体现了史前玉器工匠高超的造型能力和艺术想象力。")]),
          p([new TextRun({ text: "文化意义：", bold: true }), new TextRun("玉凤是石家河文化最具代表性的玉器之一，被誉为'中华第一凤'。其造型成熟程度远超同期其他文化，说明石家河先民已形成完整的风鸟崇拜体系。玉凤的发现改变了学术界关于凤鸟文化起源于东方沿海地区的传统观点，证明长江中游也是中华凤鸟崇拜的重要发源地。")]),
          emptyLine(),

          heading("2.2 玉虎", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "出土地点：", bold: true }), new TextRun("肖家屋脊遗址（1987年）")]),
          p([new TextRun({ text: "年代：", bold: true }), new TextRun("后石家河文化，距今约4200年")]),
          p([new TextRun({ text: "尺寸：", bold: true }), new TextRun("长约4.8cm，宽约3.2cm，厚约0.7cm")]),
          p([new TextRun({ text: "材质：", bold: true }), new TextRun("透闪石软玉（青玉）")]),
          p([new TextRun({ text: "文物描述：", bold: true }), new TextRun("玉虎呈蹲踞状，虎首高昂，双耳竖立，双目圆睁，口部微张露出利齿。身体蜷曲有力，尾部卷曲，四肢粗壮。虎身以阴线刻画出斑纹，整体造型浑厚有力、气势威猛。玉虎的雕刻技法娴熟，线条刚劲有力，体现了石家河玉器高超的工艺水平。")]),
          p([new TextRun({ text: "文化意义：", bold: true }), new TextRun("玉虎是石家河文化玉器中的代表性动物造型之一，反映了先民对猛兽力量的崇拜。虎在中国传统文化中是勇猛和权威的象征，石家河玉虎是目前所见中国最早的玉虎造型之一，对后世商周青铜器上的虎纹造型产生了深远影响。")]),
          emptyLine(),

          heading("2.3 玉人首", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "出土地点：", bold: true }), new TextRun("谭家岭遗址（2015年）")]),
          p([new TextRun({ text: "年代：", bold: true }), new TextRun("后石家河文化，距今约4200-4000年")]),
          p([new TextRun({ text: "材质：", bold: true }), new TextRun("透闪石软玉")]),
          p([new TextRun({ text: "文物描述：", bold: true }), new TextRun("玉人首为圆雕作品，面部刻画细致，双耳佩戴耳环，头顶有冠饰。面部表情庄严肃穆，五官比例协调，展现出高超的圆雕技艺。人首可能为神像或祖先像的一部分，代表了石家河先民的精神信仰世界。")]),
          p([new TextRun({ text: "文化意义：", bold: true }), new TextRun("玉人首是石家河文化等级最高的玉器之一，其精湛的圆雕工艺在当时东亚地区首屈一指。玉人首的发现为研究长江流域史前宗教信仰、社会分层和工艺技术提供了珍贵实物资料。")]),
          emptyLine(),

          heading("2.4 玉蝉", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "出土地点：", bold: true }), new TextRun("谭家岭遗址（2015年）")]),
          p([new TextRun({ text: "年代：", bold: true }), new TextRun("后石家河文化，距今约4200-4000年")]),
          p([new TextRun({ text: "文物描述：", bold: true }), new TextRun("玉蝉造型写实，蝉翼纹理清晰，形态生动。蝉在中国传统文化中象征复活与永生，玉蝉可能作为丧葬仪式中的重要随葬品，表达了先民对生命轮回的信仰。")]),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 3: 考古时间线 ──
          heading("三、石家河考古七十年时间线", HeadingLevel.HEADING_1),
          emptyLine(),

          makeTable(
            ["年份", "事件", "重要性"],
            [
              ["1954", "石家河遗址首次发现", "开启石家河考古序幕"],
              ["1955", "中国科学院首次考古发掘", "确认遗址文化层堆积"],
              ["1987-1992", "肖家屋脊遗址发掘", "出土玉虎、玉凤等精美玉器"],
              ["1990-1991", "罗家柏岭遗址发掘", "发现大型祭祀遗存"],
              ["2008-2011", "中华文明探源工程调查", "全面测绘遗址范围"],
              ["2014-2015", "谭家岭遗址瓮棺葬发掘", "出土玉器240余件"],
              ["2017", "入选全国十大考古新发现", "学术界高度认可"],
              ["2019-2020", "印信台遗址发掘", "发现高等级建筑基址"],
              ["2021", "入选百年百大考古发现", "百年考古标志性遗址"],
              ["2024", "石家河考古70周年", "持续考古与保护利用"],
            ],
            [1200, 4160, 4000]
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 4: 先民生活 ──
          heading("四、先民日常生活与祭祀", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("4.1 日常生活", HeadingLevel.HEADING_2),
          p("石家河先民以稻作农业为主要生计方式，在遗址中发现了大量碳化稻谷和稻田遗迹。同时，先民也进行狩猎、捕鱼和采集作为补充。遗址中出土了大量陶器，包括日常使用的鼎、罐、碗、盆等，陶器纹饰丰富多样，以篮纹、绳纹、方格纹为主。"),
          p("先民居住在干栏式或半地穴式建筑中，部分建筑基址面积较大，可能为公共活动场所或首领居所。纺织业已有相当发展，出土了陶纺轮等纺织工具。玉器制作是石家河先民最突出的手工业成就，其制作工艺包括切割、钻孔、打磨、雕刻等多道工序。"),

          heading("4.2 祭祀活动", HeadingLevel.HEADING_2),
          p("祭祀在石家河先民的社会生活中占据核心地位。罗家柏岭遗址发现了面积达数千平方米的大型祭祀场所，包括祭坛、祭祀坑和燎祭遗迹。邓家湾遗址出土了大量陶塑动物和人物像，可能是祭祀用品。"),
          p("石家河文化的祭祀对象可能包括天地、祖先和自然神祇。玉器在祭祀中扮演重要角色，玉琮、玉璧被视为沟通天地的法器。后石家河时期的瓮棺葬体现了独特的丧葬仪式，以大型陶瓮为葬具，随葬大量精美玉器，反映了先民对死后世界的信仰和对社会身份的表达。"),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 5: 素材清单 ──
          heading("五、H5作品素材搜集清单", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("5.1 文物图片素材", HeadingLevel.HEADING_2),
          p("以下为H5各场景所需的文物图片素材清单，优先从考古报告、博物馆官网等公开渠道获取高质量图像："),

          makeTable(
            ["文物名称", "所需数量", "用途", "场景", "优先级"],
            [
              ["玉凤", "6-8张多角度照片", "序列帧3D旋转展示", "场景三：文物鉴赏", "高"],
              ["玉虎", "6-8张多角度照片", "序列帧3D旋转展示", "场景三：文物鉴赏", "高"],
              ["玉人首", "4-6张多角度照片", "序列帧3D旋转展示", "场景三：文物鉴赏", "中"],
              ["玉蝉", "4-6张多角度照片", "序列帧3D旋转展示", "场景三：文物鉴赏", "中"],
              ["玉虎正面高清图", "1张", "刮擦底层露出图", "场景二：考古发掘", "高"],
              ["石家河遗址全景", "1-2张", "时间轴配图/背景", "场景五：时光长廊", "中"],
              ["考古现场照片", "3-5张", "时间轴节点配图", "场景五：时光长廊", "中"],
              ["出土陶器", "2-3张", "时间轴配图", "场景五：时光长廊", "低"],
            ],
            [1500, 1500, 2160, 1500, 900]
          ),
          emptyLine(),

          heading("5.2 插画/设计素材", HeadingLevel.HEADING_2),
          makeTable(
            ["素材类型", "内容描述", "获取方式", "场景", "优先级"],
            [
              ["祭祀场景想象图", "石家河先民祭祀仪式想象插画，包含祭坛、祭司、玉器、火堆等元素", "AI生成/委托手绘", "场景四：祭祀复原", "高"],
              ["玉凤剪影", "玉凤简化剪影造型，用于封面和尾页", "SVG自绘", "场景一/六", "高"],
              ["场景底图", "各场景背景纹理/氛围图", "AI生成/自绘", "全部场景", "中"],
              ["考古工具图标", "手铲、刷子、放大镜等工具型图标", "SVG自绘", "场景二", "低"],
            ],
            [1500, 3500, 1860, 1500, 1000]
          ),
          emptyLine(),

          heading("5.3 音效素材", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "注：音效为可选增强项，如时间不允许可省略。", italics: true, color: "888888" })], { spacing: 120 }),

          makeTable(
            ["音效类型", "用途", "建议来源", "优先级"],
            [
              ["尘土刮擦声", "场景二：刮开土层时的音效反馈", "免费音效库", "低"],
              ["玉器碰撞声", "场景四：祭祀元素放置成功时", "免费音效库", "低"],
              ["火焰燃烧声", "场景四：祭祀激活后火堆动画", "免费音效库", "低"],
              ["低沉背景音乐", "全作品氛围音乐（古乐器风格）", "AI生成/免版权音乐", "中"],
            ],
            [2000, 3500, 2500, 1360]
          ),
          emptyLine(),

          heading("5.4 文字资料清单", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "场景一 - 序幕", bold: true }), new TextRun("：作品标题「玉见·石家河」、副标题「长江中游史前文明中心」、引导语")]),
          p([new TextRun({ text: "场景二 - 发掘", bold: true }), new TextRun("：玉虎基本信息、出土信息、提示文案（'用手指擦拭泥土发现埋藏的文物'）")]),
          p([new TextRun({ text: "场景三 - 鉴赏", bold: true }), new TextRun("：每件文物的名称、年代、尺寸、出土地点、文化意义描述（各100-150字）")]),
          p([new TextRun({ text: "场景四 - 祭祀", bold: true }), new TextRun("：祭祀场景文字解读（200-300字）、各元素的简短标签")]),
          p([new TextRun({ text: "场景五 - 长廊", bold: true }), new TextRun("：每个时间节点的标题和详细描述（各50-80字）")]),
          p([new TextRun({ text: "场景六 - 尾声", bold: true }), new TextRun("：证书样式文字、致谢语、分享引导语")]),

          new Paragraph({ children: [new PageBreak()] }),

          // ── Chapter 6: 参考文献 ──
          heading("六、参考文献与资料来源", HeadingLevel.HEADING_1),
          emptyLine(),

          heading("6.1 考古报告与专著", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "1. ", bold: true }), new TextRun("湖北省文物考古研究所. 《肖家屋脊——天门石家河考古发掘报告》. 文物出版社, 1999.")]),
          p([new TextRun({ text: "2. ", bold: true }), new TextRun("湖北省文物考古研究所. 《谭家岭——天门石家河遗址考古报告》. 科学出版社, 2018.")]),
          p([new TextRun({ text: "3. ", bold: true }), new TextRun("北京大学考古文博学院等. 《石家河遗址——中华文明探源工程研究报告》. 科学出版社, 2016.")]),
          p([new TextRun({ text: "4. ", bold: true }), new TextRun("张绪球. 《长江中游新石器时代文化》. 湖北教育出版社, 2004.")]),
          p([new TextRun({ text: "5. ", bold: true }), new TextRun("刘彬徽. 《石家河文化玉器研究》. 文物出版社, 2015.")]),
          emptyLine(),

          heading("6.2 学术论文", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "6. ", bold: true }), new TextRun("孟华平. '石家河遗址近年考古新发现与认识'. 《考古》, 2017(7).")]),
          p([new TextRun({ text: "7. ", bold: true }), new TextRun("郭伟民. '石家河文化玉器的考古学观察'. 《江汉考古》, 2019(3).")]),
          p([new TextRun({ text: "8. ", bold: true }), new TextRun("方向明. '石家河遗址后石家河文化玉器初论'. 《中原文物》, 2018(5).")]),
          emptyLine(),

          heading("6.3 网络资源", HeadingLevel.HEADING_2),
          p([new TextRun({ text: "9. ", bold: true }), new TextRun("中国社会科学院考古研究所. 中国考古网. http://www.kaogu.cn")]),
          p([new TextRun({ text: "10. ", bold: true }), new TextRun("湖北省博物馆. 馆藏精品·石家河文化. http://www.hbww.org")]),
          p([new TextRun({ text: "11. ", bold: true }), new TextRun("国家文物局. 全国十大考古新发现·石家河遗址. http://www.ncha.gov.cn")]),
          p([new TextRun({ text: "12. ", bold: true }), new TextRun("石家河遗址考古研究中心. 石家河遗址保护规划（2020-2035）. http://www.shijiahe.org")]),
          emptyLine(),

          heading("6.4 图片素材来源", HeadingLevel.HEADING_2),
          p("以下为公开发表的文物图片来源渠道，用于学术展示目的："),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("《肖家屋脊》考古报告图版（文物出版社）")]),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("湖北省博物馆官方网站馆藏精品栏目")]),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("天门市博物馆馆藏文物数字化展示平台")]),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("《中国出土玉器全集·湖北卷》（科学出版社）")]),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("中国考古网石家河遗址专题")]),
          p([new TextRun({ text: "· ", bold: true }), new TextRun("国家文物局'文物中国'数字平台")]),
        ]
      }
    ]
  });

  const outPath = "C:/Users/admin/Desktop/玉见石家河/石家河文化资料搜集.docx";
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log("Word document generated: " + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
