const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = '/home/ubuntu/sonagi-design-system/packages/brand-assets';
const OUT_PDF = path.join(ROOT, '05_guidelines/mindulle-master-brandbook-v0.1.0.pdf');

// Read SVGs for embedding
function getSvg(relPath) {
  const p = path.join(ROOT, relPath);
  if (fs.existsSync(p)) {
    return fs.readFileSync(p, 'utf8')
      .replace(/<\?xml.*?\?>/, '')
      .replace(/<!DOCTYPE.*?>/, '');
  }
  return '';
}

const sealSvg = getSvg('01_master_seal/light/master-symbol-light.svg');
const lockupSvg = getSvg('02_lockups/horizontal/lockup-horizontal-light.svg');
const drawSvg = getSvg('03_product_bi/sonagi-draw/sonagi-draw.svg');
const anvilSvg = getSvg('03_product_bi/sonagi-anvil/sonagi-anvil.svg');
const graphSvg = getSvg('03_product_bi/sonagi-graph/sonagi-graph.svg');
const ragSvg = getSvg('03_product_bi/sonagi-rag/sonagi-rag.svg');
const socialCardSvg = getSvg('04_touchpoints/social_cards/social-card-light.svg');
const mobileSvg = getSvg('04_touchpoints/mobile_artboard/mindulle-mobile-artboard.svg');

const sonagi1Svg = fs.readFileSync('/home/ubuntu/sonagi-design-system/apps/portal/public/brand/sonagi-cand1-droplet.svg', 'utf8').replace(/<\?xml.*?\?>/, '');
const sonagi2Svg = fs.readFileSync('/home/ubuntu/sonagi-design-system/apps/portal/public/brand/sonagi-cand2-cascading-s.svg', 'utf8').replace(/<\?xml.*?\?>/, '');
const sonagi3Svg = fs.readFileSync('/home/ubuntu/sonagi-design-system/apps/portal/public/brand/sonagi-cand3-prism.svg', 'utf8').replace(/<\?xml.*?\?>/, '');

const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>Mindulle Studio Master Brandbook v0.1.0</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Noto+Serif+KR:wght@600;700&family=Noto+Sans+KR:wght@400;500;700&family=JetBrains+Mono:wght@500;600&display=swap');

    @page {
      size: A4 landscape;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans KR', -apple-system, sans-serif;
      background: #faf8f5;
      color: #1c1514;
    }

    .page {
      width: 297mm;
      height: 210mm;
      padding: 18mm 20mm;
      page-break-after: always;
      position: relative;
      background: #faf8f5;
      border: 1px solid #e5dfd5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Page Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #1c1514;
      padding-bottom: 3.5mm;
      margin-bottom: 6mm;
    }
    .page-header .brand-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 14pt;
      font-weight: 700;
      letter-spacing: 0.12em;
    }
    .page-header .chapter-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      color: #9a3412;
      font-weight: 600;
      letter-spacing: 0.1em;
    }

    /* Page Footer */
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #d6cfc7;
      padding-top: 3.5mm;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      color: #78716c;
    }

    /* Common Typography */
    h1.main-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 42pt;
      font-weight: 700;
      margin: 0 0 4mm 0;
      letter-spacing: 0.1em;
      line-height: 1.1;
    }
    h2.section-title {
      font-family: 'Noto Serif KR', Georgia, serif;
      font-size: 20pt;
      font-weight: 700;
      margin: 0 0 3mm 0;
      color: #1c1514;
    }
    p.body-lead {
      font-size: 11pt;
      line-height: 1.6;
      color: #44403c;
      margin: 0 0 4mm 0;
    }

    /* Grid layouts */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10mm;
      align-items: center;
      flex: 1;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6mm;
      flex: 1;
      align-items: stretch;
    }
    .card {
      background: #f5efe6;
      border: 2px solid #1c1514;
      border-radius: 4px;
      padding: 6mm;
    }

    /* Page 01: Cover */
    .cover-page {
      background: #faf8f5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 3mm solid #1c1514;
      padding: 20mm;
    }
    .cover-seal {
      width: 75mm;
      height: 75mm;
      margin-bottom: 8mm;
    }

    /* Swatches */
    .swatch-box {
      border: 2px solid #1c1514;
      border-radius: 4px;
      padding: 4mm;
      background: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .swatch-color {
      height: 24mm;
      border-radius: 2px;
      border: 1px solid rgba(0,0,0,0.1);
      margin-bottom: 3mm;
    }

    /* Don't Box */
    .dont-card {
      border: 2px solid #dc2626;
      background: #fef2f2;
      border-radius: 4px;
      padding: 4mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .dont-badge {
      display: inline-block;
      background: #dc2626;
      color: white;
      font-size: 8pt;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      padding: 1mm 2mm;
      border-radius: 2px;
      margin-bottom: 2mm;
      width: fit-content;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 01: COVER ==================== -->
  <div class="page cover-page">
    <div style="font-family:'JetBrains Mono',monospace; font-size:10pt; letter-spacing:0.24em; color:#9a3412; margin-bottom:4mm; font-weight:600;">
      • ATELIER OF SOFTWARE • EST. 2026 •
    </div>
    <div class="cover-seal">
      ${sealSvg}
    </div>
    <h1 class="main-title" style="margin-bottom:2mm;">MINDULLE <span style="color:#b45309;">STUDIO</span></h1>
    <div style="font-family:'Noto Serif KR',serif; font-size:15pt; font-weight:700; color:#1c1514; margin-bottom:4mm;">
      공식 마스터 브랜드북 (Official Master Brandbook)
    </div>
    <div style="font-family:'Noto Sans KR',sans-serif; font-size:11pt; color:#57534e; margin-bottom:8mm;">
      "도구가 완벽할 때, 손길은 비로소 자유로워진다"
    </div>
    <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#78716c; border:1px solid #1c1514; padding:2mm 6mm; border-radius:3px; background:#f5efe6;">
      VERSION 0.1.0 • A4 LANDSCAPE MASTER SPECIFICATION
    </div>
  </div>

  <!-- ==================== PAGE 02: PHILOSOPHY ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">01. BRAND SOUL &amp; ATELIER</span>
    </div>
    <div class="grid-2">
      <div>
        <h2 class="section-title">아늑한 공방과 자유로운 생명력</h2>
        <p class="body-lead" style="font-style: italic; color:#b45309; font-weight:600;">
          "도구가 완벽할 때, 창작자의 손길은 비로소 자유로워진다."
        </p>
        <p class="body-lead">
          우리는 차가운 콘크리트 성벽의 족쇄를 풀고, 오후의 햇살이 가득 쏟아지는 아늑한 장인 아틀리에의 온기를 회복합니다.
        </p>
        <p class="body-lead">
          엔지니어링의 기계적 엄밀함과 복잡한 인프라는 도구의 배후에 묵묵히 숨겨두고, 인간이 비로소 안도하며 태블릿과 펜으로 마음껏 창작하고 쉴 수 있는 가장 다정한 소프트웨어를 조각합니다.
        </p>
      </div>
      <div class="card">
        <h3 style="font-family:'Cormorant Garamond',serif; font-size:16pt; margin:0 0 3mm 0;">THE ATELIER MANIFESTO</h3>
        <ul style="font-size:10pt; line-height:1.8; color:#44403c; padding-left:5mm; margin:0;">
          <li><b>자유로운 손맛</b>: 딱딱한 직각을 벗어나 부드러운 유기적 곡선과 필압을 존중합니다.</li>
          <li><b>단단한 도구</b>: 실무에서 스스로 검증하는 2px 정밀 선화와 W3C 토큰 표준.</li>
          <li><b>온전한 쉼터</b>: 번쩍이는 자극을 지우고, 편안한 웜 아이보리 종이 질감으로 시선의 피로를 덜어냅니다.</li>
        </ul>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 02</span>
    </div>
  </div>

  <!-- ==================== PAGE 03: THE TRINITY ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">02. THE TRINITY HIERARCHY</span>
    </div>
    <div>
      <h2 class="section-title">삼위일체 브랜드 위계 (The Trinity Hierarchy)</h2>
      <p class="body-lead">민들레 생태계는 영혼에서 실무 도구로 자연스럽게 전개되는 3단계 수직 위계를 이룹니다.</p>
    </div>
    <div class="grid-3">
      <div class="card" style="border-color:#b45309;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#b45309; font-weight:700; margin-bottom:2mm;">TIER 01 • SOUL</div>
        <h3 style="font-family:'Cormorant Garamond',serif; font-size:18pt; margin:0 0 2mm 0;">민들레 영혼</h3>
        <p style="font-size:9pt; line-height:1.6; color:#57534e;">
          지켜내야 할 인간의 존엄, 다정함, 목적. 척박한 땅을 뚫고 피어나는 생명력.<br><br>
          <b>서체</b>: Cormorant Garamond 700 Bold
        </p>
      </div>

      <div class="card" style="border-color:#2563eb;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#2563eb; font-weight:700; margin-bottom:2mm;">TIER 02 • ATELIER CI</div>
        <h3 style="font-family:'Cormorant Garamond',serif; font-size:18pt; margin:0 0 2mm 0;">비대칭 윙 돛 인장</h3>
        <p style="font-size:9pt; line-height:1.6; color:#57534e;">
          전사 최고 권위의 보증 마크. 바람을 가르는 비대칭 공기역학적 돛(Wing-Sail)과 황금 씨앗 기저.<br><br>
          <b>용도</b>: 포털 헤더, 공식 계약서, 파비콘
        </p>
      </div>

      <div class="card" style="border-color:#1c1514;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#1c1514; font-weight:700; margin-bottom:2mm;">TIER 03 • TOOLING BI</div>
        <h3 style="font-family:'Cormorant Garamond',serif; font-size:18pt; margin:0 0 2mm 0;">소나기 도구군</h3>
        <p style="font-size:9pt; line-height:1.6; color:#57534e;">
          실무에서 스스로를 검증하는 6대 오픈소스 도구군 (VectorCraft, PhotoCraft 등).<br><br>
          <b>조형</b>: 32x32px 그리드, 2px 균일 선화
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 03</span>
    </div>
  </div>

  <!-- ==================== PAGE 04: MASTER SEAL ANATOMY ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">03. MASTER CI ANATOMY</span>
    </div>
    <div class="grid-2">
      <div style="text-align:center;">
        <div style="width:75mm; height:75mm; margin:0 auto;">
          ${sealSvg}
        </div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#78716c; margin-top:3mm;">
          MASTER SYMBOL (THE ASYMMETRICAL WING-SAIL)
        </div>
      </div>
      <div>
        <h2 class="section-title">마스터 심볼 조형 해부도</h2>
        <div style="font-size:10pt; line-height:1.7; color:#44403c;">
          <p><b>01. 주 마스트 (The Main Mast)</b><br>
          바람의 저항을 뚫고 앞으로 휘어지는 3px 딥 잉크 척추선이 진취적인 비행 궤적을 그립니다.</p>

          <p><b>02. 다이내믹 윙 돛 (Primary &amp; Jib Sail)</b><br>
          바람을 머금고 뒤로 부풀었다가 앞으로 날카롭게 뻗어나가는 2중 비대칭 공기역학 날개입니다.</p>

          <p><b>03. 황금 씨앗 기저 (Seed Origin Pod)</b><br>
          15도 기울어져 무게중심을 잡는 앰버 골드 씨앗 꼬투리가 단단한 생명의 근원을 대변합니다.</p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 04</span>
    </div>
  </div>

  <!-- ==================== PAGE 05: CLEARSPACE & MINIMUM SIZE ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">04. CLEARSPACE &amp; SIZING</span>
    </div>
    <div class="grid-2">
      <div class="card" style="text-align:center; padding:10mm 6mm;">
        <div style="border:1.5px dashed #2563eb; padding:6mm; display:inline-block; border-radius:4px; background:#ffffff;">
          <div style="width:40mm; height:40mm; margin:0 auto;">
            ${sealSvg}
          </div>
        </div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#2563eb; font-weight:700; margin-top:3mm;">
          1X CLEARSPACE EXCLUSION ZONE
        </div>
        <p style="font-size:8.5pt; color:#57534e; margin-top:2mm;">
          사방에 최소 1X(중심 홀씨 반지름 40px) 이상의 완전한 무균실 여백을 유지해야 합니다.
        </p>
      </div>

      <div>
        <h2 class="section-title">최소 표시 크기 규격 (Minimum Sizing)</h2>
        <p class="body-lead">선의 섬세함과 타이포그래피 가독성을 위해 아래 규격 미만으로 축소 출력을 엄격히 금지합니다.</p>
        <table style="width:100%; border-collapse:collapse; font-size:9pt; font-family:'JetBrains Mono',monospace;">
          <tr style="border-bottom:2px solid #1c1514; text-align:left;">
            <th style="padding:2mm;">자산 구분</th>
            <th style="padding:2mm;">디지털 (Screen)</th>
            <th style="padding:2mm;">인쇄 (Print 300DPI)</th>
          </tr>
          <tr style="border-bottom:1px solid #d6cfc7;">
            <td style="padding:2.5mm;">마스터 인장 풀버전</td>
            <td><b>64 x 64 px</b></td>
            <td><b>20 x 20 mm</b></td>
          </tr>
          <tr style="border-bottom:1px solid #d6cfc7;">
            <td style="padding:2.5mm;">심볼 단독 버전</td>
            <td><b>32 x 32 px</b></td>
            <td><b>10 x 10 mm</b></td>
          </tr>
          <tr style="border-bottom:1px solid #d6cfc7;">
            <td style="padding:2.5mm;">도구군 BI 아이콘</td>
            <td><b>24 x 24 px</b></td>
            <td><b>7 x 7 mm</b></td>
          </tr>
          <tr>
            <td style="padding:2.5mm;">극소형 파비콘</td>
            <td><b>16 x 16 px</b></td>
            <td>적용 불가</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 05</span>
    </div>
  </div>

  <!-- ==================== PAGE 06: LOCKUP FORMULAS ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">05. LOCKUP EQUATIONS</span>
    </div>
    <div>
      <h2 class="section-title">The Trinity 공식 락업 비례 (Lockup Formulas)</h2>
      <p class="body-lead">인장과 워드마크는 임의 비율로 배치할 수 없으며, 인장 지름(1.0D)을 기준으로 수학적으로 결합됩니다.</p>
    </div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:6mm;">
      <div class="card" style="padding:4mm;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:8.5pt; color:#9a3412; font-weight:700; margin-bottom:2mm;">
          PRIMARY HORIZONTAL LOCKUP (880 x 200 px)
        </div>
        <div style="width:100%; max-height:36mm; overflow:hidden;">
          ${lockupSvg}
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6mm; font-size:9pt; font-family:'JetBrains Mono',monospace; color:#44403c;">
        <div class="card">
          <b>비례 규칙</b>:<br>
          • 인장 지름: 1.0D<br>
          • 디바이더 높이: 0.6D (두께 2px)<br>
          • 타이틀 Cap-height: 0.28D
        </div>
        <div class="card">
          <b>권장 적용처</b>:<br>
          • 웹사이트 글로벌 헤더 (GNB)<br>
          • 공식 편지지 레터헤드 상단<br>
          • 깃허브 오그 리드미 대표 배너
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 06</span>
    </div>
  </div>

  <!-- ==================== PAGE 07: FOUNDATION TOKENS ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">06. FOUNDATION TOKENS</span>
    </div>
    <div>
      <h2 class="section-title">디자인 토큰 파운데이션 (Tokens &amp; Type Scale)</h2>
      <p class="body-lead">60-30-10 OKLCH 컬러 예산과 3대 전용 서체 계층이 시스템의 시각적 규격을 통제합니다.</p>
    </div>
    <!-- Top: 3 Color Swatches -->
    <div class="grid-3" style="flex:0 0 auto; margin-bottom:4mm;">
      <div class="swatch-box" style="padding:3mm;">
        <div class="swatch-color" style="height:14mm; background:#faf8f5;"></div>
        <b style="font-size:9.5pt;">60% Canvas Base</b>
        <span style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:#78716c;">#faf8f5 (Warm Paper)</span>
      </div>
      <div class="swatch-box" style="padding:3mm;">
        <div class="swatch-color" style="height:14mm; background:#1c1514;"></div>
        <b style="font-size:9.5pt;">30% Architecture</b>
        <span style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:#78716c;">#1c1514 (Deep Ink)</span>
      </div>
      <div class="swatch-box" style="padding:3mm;">
        <div class="swatch-color" style="height:14mm; background:#d97706;"></div>
        <b style="font-size:9.5pt;">10% Soul Core</b>
        <span style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:#78716c;">#d97706 (Dandelion Gold)</span>
      </div>
    </div>
    <!-- Bottom: Typography Hierarchy -->
    <div style="flex:1; display:flex; flex-direction:column; gap:2.5mm; justify-content:center;">
      <div class="card" style="padding:3mm 4mm;">
        <div style="font-family:'Cormorant Garamond',serif; font-size:18pt; font-weight:700;">
          MINDULLE STUDIO • Cormorant Garamond 700 (Primary Atelier Serif)
        </div>
      </div>
      <div class="card" style="padding:3mm 4mm;">
        <div style="font-family:'Noto Sans KR',sans-serif; font-size:12pt; font-weight:700;">
          다정한 사용자 경험을 피워냅니다 • Pretendard / Noto Sans KR (Korean Sans)
        </div>
      </div>
      <div class="card" style="padding:3mm 4mm;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:11pt; font-weight:600;">
          SOUL &amp; HARNESS • EST. 2026 • 2PX SCALED SYSTEM (Computational Mono)
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 07</span>
    </div>
  </div>

  <!-- ==================== PAGE 08: SPREAD LEFT - SONAGI SUITE CORE ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">SONAGI TOOLING SUITE</span>
      <span class="chapter-num">07. SPREAD (LEFT) • SUITE CORE</span>
    </div>
    <div>
      <h2 class="section-title">소나기 생태계 &amp; 공식 코어 심볼 (The Sonic Droplet)</h2>
      <p class="body-lead" style="font-style:italic; color:#2563eb; font-weight:600;">
        "소나기는 씻어내고, 민들레는 날아오른다."
      </p>
    </div>
    <div class="grid-2" style="flex:1; align-items:center;">
      <div style="text-align:center;">
        <div style="width:65mm; height:65mm; margin:0 auto;">${sonagi1Svg}</div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:9pt; color:#2563eb; font-weight:700; margin-top:2mm;">
          OFFICIAL SONAGI CORE SYMBOL
        </div>
      </div>
      <div>
        <div class="card" style="font-size:9pt; line-height:1.7; color:#44403c; padding:4mm 5mm;">
          <p style="margin:0 0 2.5mm 0;">
            <b>01. 표면장력의 빗방울 외벽 (The Surface-Tension)</b><br>
            복잡한 인프라와 레거시를 씻어내는 팽팽한 빗방울 궤적. 민들레 돛과 동일한 2.5px 곡률 공유.
          </p>
          <p style="margin:0 0 2.5mm 0;">
            <b>02. 소나기 블루 파문 (The Resonant Rain Ripple)</b><br>
            대지에 닿아 사방으로 뻗어나가는 코발트 블루(#2563eb) 점선 링. 벼락같은 몰입과 정화의 파문.
          </p>
          <p style="margin:0;">
            <b>03. 빗방울 속 잠든 황금 씨앗 (The Dormant Seed Core)</b><br>
            비가 그친 뒤 날아오를 민들레의 생명력을 품은 중심부의 앰버 골드(#d97706) 핵.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>SONAGI TOOLING SUITE • BRANDBOOK V0.1.0</span>
      <span>PAGE 08 (FACING PAGE 09)</span>
    </div>
  </div>

  <!-- ==================== PAGE 09: SPREAD RIGHT - 6-IN-1 SUITE GRID ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">SONAGI TOOLING SUITE</span>
      <span class="chapter-num">08. SPREAD (RIGHT) • 6-IN-1 TOOLS</span>
    </div>
    <div>
      <h2 class="section-title">소나기 6대 도구군 32px 선화 BI (Product Suite)</h2>
      <p class="body-lead">실무에서 스스로를 검증하는 6대 오픈소스 도구. 32x32px 캔버스 위에서 2px 균일 선화로 조각되었습니다.</p>
    </div>
    <div style="flex:1; display:grid; grid-template-columns:repeat(3, 1fr); gap:4mm; align-items:center;">
      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; flex-shrink:0;">${drawSvg}</div>
        <div><b style="font-size:10pt;">Sonagi Draw</b><div style="font-size:8pt; color:#78716c;">협업 캔버스</div></div>
      </div>

      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; flex-shrink:0;">${anvilSvg}</div>
        <div><b style="font-size:10pt;">Sonagi Anvil</b><div style="font-size:8pt; color:#78716c;">알고리즘 TDD</div></div>
      </div>

      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; flex-shrink:0;">${graphSvg}</div>
        <div><b style="font-size:10pt;">Sonagi Graph</b><div style="font-size:8pt; color:#78716c;">AI 거버넌스</div></div>
      </div>

      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; flex-shrink:0;">${ragSvg}</div>
        <div><b style="font-size:10pt;">Sonagi RAG</b><div style="font-size:8pt; color:#78716c;">지식 인덱서</div></div>
      </div>

      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; border:2px solid #2563eb; border-radius:3px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono'; font-weight:700; font-size:10pt; color:#2563eb;">VC</div>
        <div><b style="font-size:10pt;">VectorCraft</b><div style="font-size:8pt; color:#78716c;">2D 벡터 포지</div></div>
      </div>

      <div class="card" style="display:flex; align-items:center; gap:3mm; padding:3mm;">
        <div style="width:12mm; height:12mm; border:2px solid #d97706; border-radius:3px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono'; font-weight:700; font-size:10pt; color:#d97706;">DC</div>
        <div><b style="font-size:10pt;">DesignCraft</b><div style="font-size:8pt; color:#78716c;">다단 출판 조판</div></div>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 09</span>
    </div>
  </div>

  <!-- ==================== PAGE 10: THE 10 GOLDEN DON'TS ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">09. PROHIBITED USES</span>
    </div>
    <div>
      <h2 class="section-title">10대 절대 금지 규정 (The 10 Golden Don'ts)</h2>
      <p class="body-lead">브랜드의 자의적 왜곡과 저품질 양산을 원천 차단하는 영구적 헌법 규정입니다.</p>
    </div>
    <div style="flex:1; display:grid; grid-template-columns:repeat(3, 1fr); gap:4mm;">
      <div class="dont-card">
        <span class="dont-badge">DON'T 01</span>
        <b style="font-size:9.5pt;">비례 왜곡 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">가로/세로 종횡비를 무시하고 납작하게 늘리는 행위</p>
      </div>

      <div class="dont-card">
        <span class="dont-badge">DON'T 02</span>
        <b style="font-size:9.5pt;">임의 회전 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">인장이나 로고를 대각선으로 기울여 배치하는 행위</p>
      </div>

      <div class="dont-card">
        <span class="dont-badge">DON'T 03</span>
        <b style="font-size:9.5pt;">블러 그림자 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">인위적인 흐릿한 드롭 섀도우를 인장에 부착하는 행위</p>
      </div>

      <div class="dont-card">
        <span class="dont-badge">DON'T 04</span>
        <b style="font-size:9.5pt;">비승인 색상 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">팔레트 규격 외 형광색이나 원색 빨강을 주입하는 행위</p>
      </div>

      <div class="dont-card">
        <span class="dont-badge">DON'T 05</span>
        <b style="font-size:9.5pt;">여백 침범 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">사방 1X 안전 여백 안쪽으로 다른 그래픽을 침범시키는 행위</p>
      </div>

      <div class="dont-card">
        <span class="dont-badge">DON'T 06</span>
        <b style="font-size:9.5pt;">AI 슬롭 환각 금지</b>
        <p style="font-size:8pt; color:#57534e; margin:1mm 0 0 0;">정밀한 벡터 대신 AI 신경망 노이즈 이미지를 사용하는 것</p>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 10</span>
    </div>
  </div>

  <!-- ==================== PAGE 11: TOUCHPOINTS ==================== -->
  <div class="page">
    <div class="page-header">
      <span class="brand-title">MINDULLE STUDIO</span>
      <span class="chapter-num">10. TOUCHPOINTS &amp; MOBILE</span>
    </div>
    <div class="grid-2">
      <div>
        <h2 class="section-title">실무 접점 템플릿 (Touchpoints)</h2>
        <p class="body-lead">
          웹, 모바일, 소셜 미디어 등 실제 인터페이스에 즉시 투입되는 검증된 프레임 규격입니다.
        </p>
        <ul style="font-size:9.5pt; line-height:1.8; color:#44403c;">
          <li><b>390x844 모바일 캔버스</b>: 다이내믹 아일랜드부터 헤더, 카드, 도구군 그리드까지 완비.</li>
          <li><b>1200x630 OG 소셜 카드</b>: 깃허브, 디스코드, X 공유 시 완벽한 브랜딩 전달.</li>
          <li><b>16x16 / 32x32 파비콘</b>: 브라우저 탭에서도 살아있는 황금 홀씨 코어.</li>
        </ul>
      </div>
      <div class="card" style="padding:4mm; text-align:center;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:8.5pt; color:#9a3412; margin-bottom:2mm;">
          OG SOCIAL CARD (1200 x 630 px)
        </div>
        <div style="width:100%; max-height:48mm; overflow:hidden;">
          ${socialCardSvg}
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>MINDULLE STUDIO • BRANDBOOK V0.1.0</span>
      <span>PAGE 11</span>
    </div>
  </div>

  <!-- ==================== PAGE 12: BACK COVER ==================== -->
  <div class="page cover-page" style="border: 2px solid #1c1514;">
    <div style="width:30mm; height:30mm; margin-bottom:6mm;">
      ${sealSvg}
    </div>
    <div style="font-family:'Cormorant Garamond',serif; font-size:24pt; font-weight:700; margin-bottom:2mm;">
      MINDULLE STUDIO
    </div>
    <div style="font-family:'Noto Sans KR',sans-serif; font-size:10pt; color:#57534e; margin-bottom:8mm;">
      "기계가 완벽해야 사람이 쉴 수 있다"
    </div>
    <div style="font-family:'JetBrains Mono',monospace; font-size:8pt; line-height:1.8; color:#78716c;">
      PUBLISHED BY MINDULLE BRAND GOVERNANCE COMMITTEE<br>
      OFFICIAL RELEASE: VERSION 0.1.0 (ALPHA)<br>
      DISTRIBUTION CDN: https://cdn.sonagi.space/branding/v0.1.0/<br>
      COPYRIGHT &copy; 2026 MINDULLE STUDIO. ALL RIGHTS RESERVED.
    </div>
  </div>

</body>
</html>`;

(async () => {
  console.log('🚀 Starting Master Brandbook PDF compilation...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  // Wait for Google Fonts to load
  await page.evaluate(() => document.fonts.ready);
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  fs.writeFileSync(OUT_PDF, pdfBuffer);
  await browser.close();
  console.log('✅ Generated Master Brandbook PDF:', OUT_PDF, '(' + pdfBuffer.length + ' bytes)');
})();
