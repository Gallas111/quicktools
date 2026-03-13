export interface BlogPost {
  slug: string;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  date: string;
  toolId: string; // 연결될 도구 ID
  keywords: string[];
  image?: string; // /images/blog/{slug}.png
  content: {
    ko: { heading: string; body: string }[];
    en: { heading: string; body: string }[];
  };
  faq?: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-count-characters",
    title: {
      ko: "글자수 세기 완벽 가이드 - 네이버 블로그, 자기소개서 글자수 제한 확인법",
      en: "Complete Guide to Character Counting - Check Word Limits for Blogs & Essays",
    },
    description: {
      ko: "네이버 블로그, 자기소개서, SNS 글자수 제한을 빠르게 확인하는 방법. 공백 포함/제외, 바이트 계산까지 한번에.",
      en: "How to quickly check character limits for blogs, resumes, and social media. Count with/without spaces and bytes.",
    },
    date: "2026-03-13",
    toolId: "character-counter",
    image: "/images/blog/how-to-count-characters.webp",
    keywords: ["글자수 세기", "글자수 계산", "네이버 블로그 글자수", "자기소개서 글자수", "character counter"],
    content: {
      ko: [
        {
          heading: "글자수 세기가 필요한 순간",
          body: "자기소개서를 쓸 때 '500자 이내'라는 제한을 본 적이 있으신가요? 네이버 블로그 제목은 40자, 인스타그램 바이오는 150자, 트위터(X)는 280자로 제한됩니다. 이런 글자수 제한을 정확히 맞추려면 글자수 세기 도구가 필수입니다.\n\n특히 취업 시즌에는 자기소개서의 글자수를 정확히 맞춰야 하는데, 공백 포함/제외에 따라 결과가 달라지기 때문에 주의가 필요합니다.",
        },
        {
          heading: "공백 포함 vs 공백 제외, 뭐가 다를까?",
          body: "대부분의 기업 자기소개서는 '공백 포함' 기준입니다. 하지만 일부 공기업이나 공무원 시험에서는 '공백 제외' 기준을 사용합니다.\n\n- 공백 포함: 띄어쓰기, 줄바꿈 등 모든 문자 포함\n- 공백 제외: 실제 글자만 카운트\n- 바이트(byte): 한글은 2~3바이트, 영어는 1바이트로 계산\n\n예를 들어 '안녕하세요 반갑습니다'는 공백 포함 10자, 공백 제외 9자입니다.",
        },
        {
          heading: "플랫폼별 글자수 제한 정리",
          body: "각 플랫폼마다 글자수 제한이 다릅니다:\n\n- 네이버 블로그 제목: 40자\n- 네이버 블로그 본문: 제한 없음 (하지만 SEO에는 1,500~3,000자 권장)\n- 인스타그램 바이오: 150자\n- 인스타그램 캡션: 2,200자\n- 트위터(X): 280자 (한글도 동일)\n- 카카오톡 프로필 상태메시지: 60자\n- 자기소개서: 보통 500자~1,000자 (기업마다 다름)\n- SMS 문자: 한글 45자 / 영문 90자 (초과 시 LMS)",
        },
        {
          heading: "Toolkio 글자수 세기 도구 사용법",
          body: "Toolkio의 글자수 세기 도구는 텍스트를 입력하면 실시간으로 글자수, 공백 제외 글자수, 단어수, 문장수, 문단수, 바이트까지 한눈에 보여줍니다.\n\n1. 텍스트를 입력하거나 붙여넣기\n2. 상단 카드에서 각종 통계 실시간 확인\n3. 필요 없으면 초기화 버튼으로 리셋\n\n브라우저에서 바로 실행되므로 입력한 내용이 서버로 전송되지 않아 안전합니다.",
        },
      ],
      en: [
        {
          heading: "When You Need to Count Characters",
          body: "Have you ever seen a '500 characters or less' limit on a job application? Instagram bios allow 150 characters, Twitter/X limits posts to 280 characters, and many platforms have their own limits. A character counter tool is essential for meeting these requirements precisely.",
        },
        {
          heading: "With Spaces vs Without Spaces",
          body: "Most character limits count spaces as characters. However, some systems count only non-space characters.\n\n- With spaces: Every character including spaces and line breaks\n- Without spaces: Only actual characters counted\n- Bytes: Each character takes different bytes (ASCII = 1 byte, Unicode = 2-4 bytes)\n\nFor example, 'Hello World' is 11 characters with spaces, 10 without.",
        },
        {
          heading: "Character Limits by Platform",
          body: "Different platforms have different limits:\n\n- Twitter/X: 280 characters\n- Instagram bio: 150 characters\n- Instagram caption: 2,200 characters\n- Facebook post: 63,206 characters\n- LinkedIn summary: 2,600 characters\n- Google meta description: ~155 characters\n- SMS: 160 characters (standard)",
        },
        {
          heading: "How to Use Toolkio Character Counter",
          body: "Toolkio's character counter shows real-time stats as you type: characters, characters without spaces, words, sentences, paragraphs, and bytes.\n\n1. Type or paste your text\n2. View stats instantly in the cards above\n3. Hit Clear to reset\n\nEverything runs in your browser — your text is never sent to any server.",
        },
      ],
    },
    faq: [
      {
        question: "공백 포함과 공백 제외의 차이는?",
        answer: "공백 포함은 띄어쓰기, 줄바꿈 등 모든 문자를 세는 방식이고, 공백 제외는 실제 글자만 셉니다. 대부분의 기업 자기소개서는 공백 포함 기준이므로 지원 요강을 반드시 확인하세요.",
      },
      {
        question: "바이트(byte) 계산은 왜 필요한가요?",
        answer: "SMS, 데이터베이스 필드 등은 글자수가 아닌 바이트 단위로 제한됩니다. 한글은 UTF-8 기준 3바이트, 영어는 1바이트로 계산되므로 같은 글자수라도 바이트 크기가 다릅니다.",
      },
      {
        question: "글자수 세기 도구는 어떤 상황에서 유용한가요?",
        answer: "자기소개서, 블로그 글, SNS 게시물 작성 시 글자수 제한을 확인할 때 유용합니다. 특히 취업 시즌에 자기소개서 글자수를 정확히 맞춰야 할 때 필수적입니다.",
      },
    ],
  },
  {
    slug: "how-to-compress-images",
    title: {
      ko: "이미지 압축 방법 총정리 - 화질 손실 없이 용량 줄이기",
      en: "Complete Guide to Image Compression - Reduce File Size Without Losing Quality",
    },
    description: {
      ko: "웹사이트 속도 개선, 이메일 첨부를 위한 이미지 압축 방법. JPG, PNG, WebP 포맷별 특징과 최적 압축률.",
      en: "How to compress images for faster websites and email. JPG, PNG, WebP format comparison and optimal compression.",
    },
    date: "2026-03-13",
    toolId: "image-compressor",
    image: "/images/blog/how-to-compress-images.webp",
    keywords: ["이미지 압축", "이미지 용량 줄이기", "사진 압축", "image compression", "reduce image size"],
    content: {
      ko: [
        {
          heading: "이미지 압축이 필요한 이유",
          body: "스마트폰으로 찍은 사진 한 장의 용량은 보통 3~10MB입니다. 웹사이트에 이런 이미지를 그대로 올리면 페이지 로딩이 느려지고, 이메일에 첨부하면 용량 제한에 걸립니다.\n\n구글은 웹사이트 속도를 검색 순위에 반영하기 때문에, 이미지 최적화는 SEO에도 직접적인 영향을 미칩니다. 실제로 이미지가 웹페이지 전체 용량의 50% 이상을 차지하는 경우가 많습니다.",
        },
        {
          heading: "이미지 포맷별 특징",
          body: "이미지 포맷에 따라 압축 방식과 특성이 다릅니다:\n\n- JPG/JPEG: 사진에 최적. 손실 압축으로 용량을 크게 줄일 수 있음. 투명 배경 불가.\n- PNG: 로고, 아이콘에 적합. 무손실 압축. 투명 배경 지원. 용량이 상대적으로 큼.\n- WebP: 구글이 개발한 차세대 포맷. JPG보다 25~35% 더 작은 용량. 대부분의 브라우저 지원.\n- GIF: 애니메이션 지원. 256색 제한. 간단한 움짤에 적합.\n\n일반적으로 사진은 JPG, 로고/아이콘은 PNG, 웹용 이미지는 WebP를 추천합니다.",
        },
        {
          heading: "최적 압축 설정",
          body: "화질과 용량의 균형을 맞추는 것이 중요합니다:\n\n- 블로그/웹사이트: 품질 70~80%, 최대 너비 1200~1600px\n- SNS 업로드: 품질 80~90%, 플랫폼 권장 크기에 맞추기\n- 이메일 첨부: 품질 60~70%, 최대 너비 800px\n- 인쇄용: 품질 90~100%, 원본 크기 유지\n\n대부분의 경우 품질 75~80%로 설정하면 눈으로 구분하기 어려운 수준에서 용량을 50~70% 줄일 수 있습니다.",
        },
        {
          heading: "Toolkio에서 이미지 압축하기",
          body: "Toolkio의 이미지 압축 도구는 브라우저에서 바로 실행됩니다. 서버에 이미지를 업로드하지 않으므로 개인정보 걱정 없이 사용할 수 있습니다.\n\n1. 이미지를 드래그하거나 클릭해서 업로드\n2. 품질, 최대 너비, 출력 포맷 설정\n3. 압축 결과 확인 (원본/압축 크기 비교)\n4. 다운로드\n\n여러 이미지를 한 번에 압축할 수도 있습니다.",
        },
      ],
      en: [
        {
          heading: "Why Image Compression Matters",
          body: "A single smartphone photo is typically 3-10MB. Uploading these directly to websites slows page loading, and email attachments hit size limits.\n\nGoogle factors page speed into search rankings, making image optimization crucial for SEO. Images often account for over 50% of a webpage's total size.",
        },
        {
          heading: "Image Format Comparison",
          body: "Different formats suit different use cases:\n\n- JPG/JPEG: Best for photos. Lossy compression reduces size significantly. No transparency.\n- PNG: Best for logos/icons. Lossless compression. Supports transparency. Larger file sizes.\n- WebP: Google's next-gen format. 25-35% smaller than JPG. Widely supported.\n- GIF: Supports animation. Limited to 256 colors.\n\nGeneral rule: JPG for photos, PNG for logos, WebP for web.",
        },
        {
          heading: "Optimal Compression Settings",
          body: "Balance quality and file size:\n\n- Blog/website: Quality 70-80%, max width 1200-1600px\n- Social media: Quality 80-90%, match platform dimensions\n- Email: Quality 60-70%, max width 800px\n- Print: Quality 90-100%, keep original size\n\nAt 75-80% quality, most images lose virtually no visible quality while reducing file size by 50-70%.",
        },
        {
          heading: "Compress Images with Toolkio",
          body: "Toolkio's image compressor runs entirely in your browser — no server uploads, no privacy concerns.\n\n1. Drag or click to upload images\n2. Set quality, max width, and output format\n3. Compare original vs compressed size\n4. Download compressed images\n\nBatch compression is supported for multiple images.",
        },
      ],
    },
    faq: [
      {
        question: "JPG와 PNG 중 어떤 포맷을 사용해야 하나요?",
        answer: "JPG는 사진처럼 색상이 다양한 이미지에 적합하고, PNG는 로고나 아이콘처럼 투명 배경이 필요하거나 선명한 경계가 중요한 이미지에 적합합니다. 웹용이라면 WebP 포맷도 좋은 선택입니다.",
      },
      {
        question: "이미지 품질을 얼마로 설정해야 하나요?",
        answer: "일반적으로 70~85% 품질이면 육안으로 차이를 느끼기 어려우면서 용량을 크게 줄일 수 있습니다. 인쇄용이라면 90% 이상, 웹 썸네일이라면 60~70%로 설정하는 것이 좋습니다.",
      },
      {
        question: "압축하면 원본 이미지가 손상되나요?",
        answer: "Toolkio의 이미지 압축은 원본 파일을 변경하지 않고 새로운 압축 파일을 생성합니다. 또한 모든 처리가 브라우저에서 이루어지므로 이미지가 서버로 전송되지 않아 안전합니다.",
      },
    ],
  },
  {
    slug: "how-to-create-qr-code",
    title: {
      ko: "QR코드 만드는 법 - 무료로 QR코드 생성하고 활용하기",
      en: "How to Create QR Codes - Generate and Use QR Codes for Free",
    },
    description: {
      ko: "명함, 메뉴판, 이벤트 포스터에 QR코드를 넣는 방법. 무료 QR코드 생성기 사용법과 활용 팁.",
      en: "Add QR codes to business cards, menus, and posters. Free QR code generator guide and tips.",
    },
    date: "2026-03-13",
    toolId: "qr-generator",
    image: "/images/blog/how-to-create-qr-code.webp",
    keywords: ["QR코드 만들기", "QR코드 생성기", "QR코드 만드는법", "QR code generator", "무료 QR코드"],
    content: {
      ko: [
        {
          heading: "QR코드란 무엇인가?",
          body: "QR코드(Quick Response Code)는 스마트폰 카메라로 스캔하면 웹사이트, 텍스트, 연락처 정보 등을 바로 열 수 있는 2차원 바코드입니다.\n\n1994년 일본 덴소웨이브가 개발했으며, 코로나19 이후 비대면 서비스가 늘면서 사용량이 폭발적으로 증가했습니다. 2025년 기준 전년 대비 43% 이상 사용량이 증가했습니다.",
        },
        {
          heading: "QR코드 활용 사례",
          body: "QR코드는 다양한 곳에서 활용됩니다:\n\n- 명함: URL을 QR코드로 넣어 포트폴리오/LinkedIn 연결\n- 식당 메뉴: 테이블에 QR코드 스티커를 붙여 디지털 메뉴 제공\n- 이벤트 포스터: 이벤트 페이지나 신청 폼으로 바로 연결\n- 제품 패키징: 사용 설명서나 리뷰 페이지 연결\n- Wi-Fi 공유: SSID와 비밀번호를 QR코드로 공유\n- 결제: 카카오페이, 네이버페이 QR 결제",
        },
        {
          heading: "좋은 QR코드 만드는 팁",
          body: "QR코드를 만들 때 주의할 점:\n\n1. 크기: 최소 2cm x 2cm 이상 (인쇄물 기준). 스캔이 안 되면 의미가 없습니다.\n2. 대비: QR코드 색상과 배경색의 대비가 충분해야 합니다. 어두운 QR + 밝은 배경이 기본.\n3. 여백: QR코드 주변에 최소 4셀 이상의 여백(quiet zone)을 확보하세요.\n4. URL 단축: 긴 URL은 QR코드를 복잡하게 만듭니다. 단축 URL을 사용하세요.\n5. 테스트: 인쇄 전에 반드시 여러 기기에서 스캔 테스트를 하세요.",
        },
        {
          heading: "Toolkio에서 QR코드 만들기",
          body: "Toolkio의 QR코드 생성기는 무료이며 브라우저에서 바로 사용할 수 있습니다.\n\n1. URL 또는 텍스트 입력\n2. 크기 조절 (100px ~ 1000px)\n3. QR코드 색상과 배경색 커스텀\n4. PNG 또는 SVG로 다운로드\n\nSVG로 다운로드하면 어떤 크기로 인쇄해도 깨지지 않습니다.",
        },
      ],
      en: [
        {
          heading: "What is a QR Code?",
          body: "A QR (Quick Response) code is a 2D barcode that smartphones can scan to instantly open websites, text, contact info, and more.\n\nInvented in 1994 by Denso Wave in Japan, QR code usage has exploded since COVID-19, growing 43%+ year over year.",
        },
        {
          heading: "QR Code Use Cases",
          body: "QR codes are used everywhere:\n\n- Business cards: Link to portfolio or LinkedIn\n- Restaurant menus: Digital menus via table stickers\n- Event posters: Direct links to event pages or forms\n- Product packaging: Link to manuals or reviews\n- Wi-Fi sharing: Share network credentials\n- Payments: Mobile payment systems",
        },
        {
          heading: "Tips for Better QR Codes",
          body: "Key tips for creating effective QR codes:\n\n1. Size: Minimum 2cm x 2cm for print\n2. Contrast: Dark QR on light background\n3. Margin: At least 4-cell quiet zone around the code\n4. Short URLs: Long URLs make complex QR codes\n5. Test: Always scan-test on multiple devices before printing",
        },
        {
          heading: "Create QR Codes with Toolkio",
          body: "Toolkio's QR code generator is free and runs in your browser.\n\n1. Enter a URL or text\n2. Adjust size (100px to 1000px)\n3. Customize QR and background colors\n4. Download as PNG or SVG\n\nSVG downloads print at any size without quality loss.",
        },
      ],
    },
    faq: [
      {
        question: "QR코드 최소 크기는?",
        answer: "인쇄물에서 QR코드가 제대로 스캔되려면 최소 2cm x 2cm 크기가 필요합니다. 스캔 거리가 멀어질수록 더 큰 크기가 필요하며, 일반적으로 3cm x 3cm 이상을 권장합니다.",
      },
      {
        question: "QR코드 색상을 바꿔도 되나요?",
        answer: "네, 가능합니다. 다만 QR코드와 배경 사이의 명암 대비가 충분해야 스캔이 잘 됩니다. 어두운 색의 QR코드와 밝은 배경 조합이 가장 안정적이며, 반전(밝은 QR코드 + 어두운 배경)은 인식률이 떨어질 수 있습니다.",
      },
      {
        question: "QR코드에 담을 수 있는 데이터 양은?",
        answer: "QR코드는 숫자만 최대 7,089자, 문자는 최대 4,296자까지 저장할 수 있습니다. 하지만 데이터가 많을수록 QR코드가 복잡해져 스캔이 어려워지므로 URL 단축 서비스를 활용하는 것이 좋습니다.",
      },
    ],
  },
  {
    slug: "how-to-create-strong-password",
    title: {
      ko: "안전한 비밀번호 만드는 법 - 해킹당하지 않는 비밀번호 가이드",
      en: "How to Create Strong Passwords - A Guide to Hack-Proof Passwords",
    },
    description: {
      ko: "해킹에 안전한 비밀번호 만드는 방법. 비밀번호 길이, 특수문자 조합, 관리 팁까지 총정리.",
      en: "Create hack-proof passwords. Password length, special characters, and management tips.",
    },
    date: "2026-03-13",
    toolId: "password-generator",
    image: "/images/blog/how-to-create-strong-password.webp",
    keywords: ["비밀번호 만들기", "안전한 비밀번호", "비밀번호 생성기", "strong password", "password tips"],
    content: {
      ko: [
        {
          heading: "왜 강력한 비밀번호가 중요한가?",
          body: "2025년 가장 많이 사용된 비밀번호 1위는 여전히 '123456'이고, 2위는 'password'입니다. 이런 비밀번호는 해커가 1초도 안 걸려 풀 수 있습니다.\n\n비밀번호 해킹 방법 중 가장 흔한 '무차별 대입 공격(Brute Force)'은 가능한 모든 조합을 시도하는 방식입니다. 8자리 소문자 비밀번호는 약 5시간이면 풀리지만, 12자리 대소문자+숫자+특수문자 비밀번호는 수천 년이 걸립니다.",
        },
        {
          heading: "강력한 비밀번호의 조건",
          body: "안전한 비밀번호의 조건:\n\n1. 길이: 최소 12자 이상 (16자 이상 권장)\n2. 복잡성: 대문자, 소문자, 숫자, 특수문자 모두 포함\n3. 무작위성: 의미 있는 단어나 패턴 사용 금지\n4. 고유성: 서비스마다 다른 비밀번호 사용\n\n절대 하면 안 되는 것:\n- 생년월일, 전화번호 등 개인정보 사용\n- 'qwerty', 'abc123' 같은 키보드 패턴\n- 같은 비밀번호를 여러 사이트에 사용\n- 비밀번호를 메모장이나 포스트잇에 기록",
        },
        {
          heading: "비밀번호 관리 팁",
          body: "수십 개의 서비스에 모두 다른 비밀번호를 사용하려면 비밀번호 관리자(Password Manager)가 필수입니다.\n\n추천 비밀번호 관리자:\n- 1Password (유료)\n- Bitwarden (무료/유료)\n- 브라우저 내장 비밀번호 관리 (Chrome, Safari)\n\n추가 보안 팁:\n- 2단계 인증(2FA)을 반드시 활성화하세요\n- 주기적으로 비밀번호를 변경하세요 (3~6개월)\n- 의심스러운 이메일의 링크로 로그인하지 마세요",
        },
        {
          heading: "Toolkio에서 안전한 비밀번호 생성하기",
          body: "Toolkio의 비밀번호 생성기는 브라우저의 암호학적 난수 생성기(crypto.getRandomValues)를 사용하여 진정한 무작위 비밀번호를 만듭니다.\n\n1. 길이 설정 (4~64자)\n2. 포함할 문자 유형 선택 (대문자, 소문자, 숫자, 특수문자)\n3. 강도 표시기 확인\n4. 원클릭 복사\n\n생성된 비밀번호는 서버로 전송되지 않으며, 브라우저에서만 처리됩니다.",
        },
      ],
      en: [
        {
          heading: "Why Strong Passwords Matter",
          body: "The most common password in 2025 is still '123456', followed by 'password'. Hackers crack these in under a second.\n\nBrute force attacks try every possible combination. An 8-character lowercase password takes ~5 hours to crack, but a 12-character password with mixed cases, numbers, and symbols takes thousands of years.",
        },
        {
          heading: "What Makes a Strong Password",
          body: "Requirements for a secure password:\n\n1. Length: At least 12 characters (16+ recommended)\n2. Complexity: Mix uppercase, lowercase, numbers, and symbols\n3. Randomness: No meaningful words or patterns\n4. Uniqueness: Different password for every service\n\nNever do this:\n- Use birthdays, phone numbers, or personal info\n- Use keyboard patterns like 'qwerty'\n- Reuse passwords across sites\n- Write passwords on sticky notes",
        },
        {
          heading: "Password Management Tips",
          body: "Use a password manager to handle unique passwords for dozens of services.\n\nRecommended password managers:\n- 1Password (paid)\n- Bitwarden (free/paid)\n- Browser built-in (Chrome, Safari)\n\nExtra security tips:\n- Always enable 2FA (two-factor authentication)\n- Change passwords every 3-6 months\n- Never click login links in suspicious emails",
        },
        {
          heading: "Generate Secure Passwords with Toolkio",
          body: "Toolkio's password generator uses your browser's cryptographic random number generator (crypto.getRandomValues) for truly random passwords.\n\n1. Set length (4-64 characters)\n2. Choose character types\n3. Check the strength indicator\n4. One-click copy\n\nPasswords are never sent to any server.",
        },
      ],
    },
    faq: [
      {
        question: "비밀번호는 최소 몇 자리여야 하나요?",
        answer: "최소 12자리 이상을 권장합니다. 8자리 비밀번호는 현대 컴퓨터로 몇 시간 내에 해독될 수 있지만, 12자리 이상이면 해독에 수백 년이 걸립니다. 대소문자, 숫자, 특수문자를 조합하면 보안이 더욱 강화됩니다.",
      },
      {
        question: "같은 비밀번호를 여러 사이트에 사용하면 안 되나요?",
        answer: "절대 안 됩니다. 하나의 사이트가 해킹되면 같은 비밀번호를 사용하는 모든 계정이 위험해집니다. 사이트마다 고유한 비밀번호를 사용하고, 비밀번호 관리자를 활용하는 것이 좋습니다.",
      },
      {
        question: "비밀번호를 얼마나 자주 변경해야 하나요?",
        answer: "최신 보안 가이드라인(NIST)에서는 정기적 변경보다 충분히 강력한 비밀번호를 설정하는 것을 권장합니다. 다만 유출이 의심되는 경우에는 즉시 변경해야 합니다.",
      },
    ],
  },
  {
    slug: "how-to-compare-text",
    title: {
      ko: "텍스트 비교하는 방법 - 두 문서의 차이점 빠르게 찾기",
      en: "How to Compare Text - Quickly Find Differences Between Documents",
    },
    description: {
      ko: "코드 리뷰, 문서 수정, 번역 검수에 유용한 텍스트 비교 방법. 온라인 Diff 도구 사용법.",
      en: "Compare text for code reviews, document edits, and translation checks. Online diff tool guide.",
    },
    date: "2026-03-13",
    toolId: "diff-checker",
    image: "/images/blog/how-to-compare-text.webp",
    keywords: ["텍스트 비교", "문서 비교", "diff checker", "문장 비교", "코드 비교"],
    content: {
      ko: [
        {
          heading: "텍스트 비교가 필요한 상황",
          body: "두 텍스트를 비교해야 하는 상황은 생각보다 자주 있습니다:\n\n- 코드 리뷰: 수정 전후 코드 차이 확인\n- 문서 수정: 원본과 수정본의 변경사항 파악\n- 번역 검수: 원문과 번역본 대조\n- 계약서: 초안과 최종본의 수정 내용 확인\n- 학술 논문: 투고본과 수정본 비교\n\n눈으로 한 줄씩 비교하면 시간도 오래 걸리고 실수가 생기기 쉽습니다.",
        },
        {
          heading: "Diff(차이점 비교)의 원리",
          body: "텍스트 비교 도구는 'LCS(Longest Common Subsequence)' 알고리즘을 사용합니다. 두 텍스트에서 가장 긴 공통 부분을 찾고, 나머지를 '추가', '삭제', '변경'으로 분류합니다.\n\n결과는 보통 색상으로 표시됩니다:\n- 빨간색 배경: 삭제된 내용 (원본에만 있음)\n- 초록색 배경: 추가된 내용 (수정본에만 있음)\n- 흰색 배경: 변경 없는 내용\n\n이 방식은 Git, SVN 등 버전 관리 시스템에서도 동일하게 사용됩니다.",
        },
        {
          heading: "효과적인 텍스트 비교 팁",
          body: "텍스트 비교를 더 효과적으로 하려면:\n\n1. 줄 단위로 비교: 문단 전체보다 줄 단위가 정확합니다\n2. 공백 무시 옵션: 들여쓰기 변경만 있는 경우 공백을 무시하면 실제 변경사항만 볼 수 있습니다\n3. 대소문자 구분: 프로그래밍 코드는 대소문자를 구분해야 합니다\n4. 인코딩 확인: 한글이 깨지면 UTF-8 인코딩을 확인하세요",
        },
        {
          heading: "Toolkio에서 텍스트 비교하기",
          body: "Toolkio의 텍스트 비교 도구를 사용하면:\n\n1. 왼쪽에 원본 텍스트 입력\n2. 오른쪽에 수정된 텍스트 입력\n3. 비교 버튼 클릭\n4. 차이점이 색상으로 표시됨\n\n삭제된 줄은 빨간색, 추가된 줄은 초록색으로 한눈에 구분할 수 있습니다. 브라우저에서 바로 실행되므로 민감한 문서도 안전하게 비교할 수 있습니다.",
        },
      ],
      en: [
        {
          heading: "When You Need Text Comparison",
          body: "You need to compare text more often than you think:\n\n- Code review: Check changes between versions\n- Document editing: Track modifications\n- Translation: Compare original and translated text\n- Contracts: Review changes between drafts\n- Academic papers: Compare submission versions\n\nManual line-by-line comparison is slow and error-prone.",
        },
        {
          heading: "How Diff Works",
          body: "Text comparison tools use the LCS (Longest Common Subsequence) algorithm. They find the longest shared content and classify the rest as added, deleted, or changed.\n\nResults are color-coded:\n- Red background: Deleted content (only in original)\n- Green background: Added content (only in modified)\n- White background: Unchanged\n\nThis is the same method used by Git, SVN, and other version control systems.",
        },
        {
          heading: "Tips for Effective Comparison",
          body: "For better text comparison:\n\n1. Compare line by line rather than paragraphs\n2. Use ignore-whitespace options for indentation-only changes\n3. Enable case sensitivity for code\n4. Check encoding if characters appear broken",
        },
        {
          heading: "Compare Text with Toolkio",
          body: "Toolkio's diff checker makes comparison easy:\n\n1. Paste original text on the left\n2. Paste modified text on the right\n3. Click Compare\n4. Differences highlighted in color\n\nDeleted lines show in red, added lines in green. Runs in your browser for secure comparison of sensitive documents.",
        },
      ],
    },
  },
  {
    slug: "how-to-format-json",
    title: {
      ko: "JSON 포맷터 사용법 - JSON 데이터를 보기 좋게 정리하는 방법",
      en: "How to Format JSON - Beautify and Validate JSON Data Easily",
    },
    description: {
      ko: "복잡한 JSON 데이터를 깔끔하게 정렬하고 유효성을 검사하는 방법. 개발자를 위한 JSON 포맷터 활용 가이드.",
      en: "How to beautify and validate complex JSON data. A developer's guide to JSON formatting tools.",
    },
    date: "2026-03-13",
    toolId: "json-formatter",
    image: "/images/blog/how-to-format-json.webp",
    keywords: ["JSON 포맷터", "JSON 정렬", "JSON 유효성 검사", "JSON beautify", "JSON validator"],
    content: {
      ko: [
        {
          heading: "JSON 포맷팅이 필요한 이유",
          body: "API 응답이나 설정 파일에서 받은 JSON 데이터는 보통 한 줄로 압축되어 있습니다. 이런 상태에서는 데이터 구조를 파악하기 어렵고, 오류를 찾기도 힘듭니다.\n\n예를 들어 {'name':'홍길동','age':30,'address':{'city':'서울','zip':'06000'}} 같은 데이터를 들여쓰기로 정렬하면 각 키와 값의 관계를 한눈에 파악할 수 있습니다. 특히 중첩된 객체나 배열이 많은 복잡한 JSON일수록 포맷팅의 효과가 큽니다.",
        },
        {
          heading: "JSON 문법 오류 찾는 법",
          body: "JSON은 엄격한 문법 규칙을 따릅니다. 흔히 발생하는 오류들:\n\n- 쉼표 오류: 마지막 항목 뒤에 쉼표를 넣으면 안 됩니다 (trailing comma)\n- 따옴표: 키와 문자열 값은 반드시 큰따옴표(\")를 사용해야 합니다. 작은따옴표(')는 허용되지 않습니다.\n- 주석 불가: JSON에서는 // 또는 /* */ 주석을 사용할 수 없습니다\n- 데이터 타입: undefined, NaN, Infinity는 JSON에서 사용할 수 없습니다\n\nJSON 포맷터를 사용하면 이런 오류를 자동으로 감지하고 정확한 위치를 알려줍니다.",
        },
        {
          heading: "개발 실무에서 JSON 활용",
          body: "현대 웹 개발에서 JSON은 데이터 교환의 표준입니다:\n\n- REST API 통신: 대부분의 API가 JSON 형식으로 데이터를 주고받습니다\n- 설정 파일: package.json, tsconfig.json 등 프로젝트 설정에 사용\n- 데이터 저장: MongoDB, Firebase 등 NoSQL 데이터베이스의 기본 형식\n- 로컬 스토리지: 브라우저 localStorage에 객체를 저장할 때 JSON.stringify 사용\n\nAPI 디버깅 시 Postman이나 브라우저 개발자 도구에서 받은 응답을 JSON 포맷터로 정리하면 문제를 빠르게 파악할 수 있습니다.",
        },
        {
          heading: "Toolkio JSON 포맷터 사용법",
          body: "Toolkio의 JSON 포맷터는 브라우저에서 바로 실행되며, 데이터가 서버로 전송되지 않습니다.\n\n1. JSON 데이터를 입력란에 붙여넣기\n2. 포맷 버튼을 클릭하면 들여쓰기가 적용된 깔끔한 JSON 출력\n3. 문법 오류가 있으면 오류 위치와 내용을 표시\n4. 결과를 복사하여 사용\n\n압축(minify) 기능도 제공하여, 정리된 JSON을 다시 한 줄로 압축할 수도 있습니다.",
        },
      ],
      en: [
        {
          heading: "Why JSON Formatting Matters",
          body: "JSON data from API responses or config files is usually minified into a single line. This makes it hard to understand the data structure or spot errors.\n\nFor example, {'name':'John','age':30,'address':{'city':'Seoul','zip':'06000'}} becomes much clearer when formatted with proper indentation. The more nested objects and arrays, the more valuable formatting becomes.",
        },
        {
          heading: "Finding JSON Syntax Errors",
          body: "JSON has strict syntax rules. Common errors include:\n\n- Trailing commas: No comma after the last item\n- Quotes: Keys and strings must use double quotes (\"), not single quotes (')\n- No comments: // and /* */ are not allowed in JSON\n- Data types: undefined, NaN, and Infinity are not valid JSON values\n\nA JSON formatter automatically detects these errors and pinpoints their exact location.",
        },
        {
          heading: "JSON in Real-World Development",
          body: "JSON is the standard data exchange format in modern web development:\n\n- REST APIs: Most APIs communicate using JSON\n- Config files: package.json, tsconfig.json, and other project configs\n- Data storage: Default format for NoSQL databases like MongoDB and Firebase\n- Local storage: JSON.stringify for storing objects in browser localStorage\n\nWhen debugging APIs, formatting the response JSON from Postman or browser DevTools helps identify issues quickly.",
        },
        {
          heading: "How to Use Toolkio JSON Formatter",
          body: "Toolkio's JSON formatter runs in your browser with no data sent to any server.\n\n1. Paste your JSON data into the input field\n2. Click Format to get beautifully indented output\n3. Syntax errors are highlighted with details\n4. Copy the result for use\n\nA minify option is also available to compress formatted JSON back into a single line.",
        },
      ],
    },
    faq: [
      {
        question: "JSON에서 주석을 사용할 수 있나요?",
        answer: "표준 JSON에서는 주석을 지원하지 않습니다. 주석이 필요하다면 JSONC(JSON with Comments)나 JSON5 같은 확장 포맷을 사용하거나, '_comment' 같은 별도 키를 추가하는 방법이 있습니다.",
      },
      {
        question: "작은따옴표를 사용하면 안 되나요?",
        answer: "JSON 표준에서는 반드시 큰따옴표(\")만 사용해야 합니다. 작은따옴표(')를 사용하면 파싱 에러가 발생합니다. JavaScript 객체와 달리 JSON은 큰따옴표만 허용하는 엄격한 규칙을 따릅니다.",
      },
      {
        question: "JSON과 JavaScript 객체의 차이는?",
        answer: "JSON은 키를 반드시 큰따옴표로 감싸야 하고, 후행 쉼표(trailing comma)를 허용하지 않으며, 함수나 undefined 값을 포함할 수 없습니다. JavaScript 객체는 이런 제약이 없어 더 유연합니다.",
      },
    ],
  },
  {
    slug: "how-to-convert-colors",
    title: {
      ko: "색상 변환 가이드 - HEX, RGB, HSL 색상 코드 변환하는 법",
      en: "Color Conversion Guide - How to Convert Between HEX, RGB, and HSL",
    },
    description: {
      ko: "디자인과 개발에 필요한 색상 코드 변환 방법. HEX, RGB, HSL 차이점과 사용법 총정리.",
      en: "Convert color codes for design and development. Complete guide to HEX, RGB, and HSL differences and usage.",
    },
    date: "2026-03-13",
    toolId: "color-converter",
    image: "/images/blog/how-to-convert-colors.webp",
    keywords: ["색상 변환", "HEX RGB 변환", "색상 코드", "color converter", "컬러 코드 변환"],
    content: {
      ko: [
        {
          heading: "색상 코드의 종류와 차이점",
          body: "웹과 디자인에서 사용하는 주요 색상 코드 형식은 세 가지입니다:\n\n- HEX(헥스): #FF5733처럼 # 뒤에 6자리 16진수로 표현합니다. CSS에서 가장 널리 사용됩니다.\n- RGB: rgb(255, 87, 51)처럼 빨강, 초록, 파랑 값을 0~255로 지정합니다. 프로그래밍에서 색상을 다룰 때 직관적입니다.\n- HSL: hsl(14, 100%, 60%)처럼 색상(Hue), 채도(Saturation), 명도(Lightness)로 표현합니다. 색상 조합을 만들 때 유용합니다.\n\n같은 색상이라도 사용 환경에 따라 다른 형식이 필요하기 때문에 색상 변환 도구가 필수입니다.",
        },
        {
          heading: "디자이너와 개발자의 색상 코드 활용",
          body: "디자이너와 개발자는 작업 환경에 따라 다른 색상 형식을 사용합니다:\n\n- Figma/Sketch: 기본적으로 HEX 코드를 사용합니다\n- CSS 스타일링: HEX, RGB, HSL 모두 사용 가능하지만 HEX가 가장 흔합니다\n- JavaScript: rgba() 형식으로 투명도 포함 색상을 다룰 때 유용합니다\n- iOS/Android: 플랫폼마다 선호하는 색상 형식이 다릅니다\n\n디자이너가 Figma에서 HEX로 전달한 색상을 개발자가 CSS에서 rgba로 변환해야 하는 경우가 흔합니다.",
        },
        {
          heading: "색상 조합과 배색 팁",
          body: "HSL 형식을 이해하면 조화로운 색상 조합을 쉽게 만들 수 있습니다:\n\n- 보색: Hue 값을 180도 반대로 설정 (예: 0 → 180)\n- 유사색: Hue 값을 30도 간격으로 배치\n- 삼각 배색: Hue 값을 120도 간격으로 배치\n- 명도 변화: 같은 Hue에서 Lightness만 조절하면 같은 톤의 밝기 변형을 만들 수 있습니다\n\n브랜드 컬러에서 밝은 버전이나 어두운 버전을 만들 때 HSL의 Lightness 값을 조절하는 것이 가장 자연스럽습니다.",
        },
        {
          heading: "Toolkio 색상 변환기 사용법",
          body: "Toolkio의 색상 변환기를 사용하면 HEX, RGB, HSL 간 변환을 즉시 할 수 있습니다.\n\n1. 아무 형식으로든 색상 코드를 입력\n2. 나머지 형식으로 자동 변환 결과 확인\n3. 색상 미리보기로 실제 색상 확인\n4. 필요한 형식의 코드를 복사\n\n컬러 피커도 제공되어 시각적으로 색상을 선택한 후 모든 형식의 코드를 한번에 얻을 수 있습니다.",
        },
      ],
      en: [
        {
          heading: "Types of Color Codes",
          body: "Three main color code formats are used in web and design:\n\n- HEX: Uses 6 hexadecimal digits after #, like #FF5733. Most common in CSS.\n- RGB: Specifies Red, Green, Blue values from 0-255, like rgb(255, 87, 51). Intuitive for programming.\n- HSL: Uses Hue, Saturation, Lightness, like hsl(14, 100%, 60%). Great for creating color schemes.\n\nDifferent environments need different formats, making a color converter essential.",
        },
        {
          heading: "Color Codes for Designers and Developers",
          body: "Designers and developers use different color formats depending on their tools:\n\n- Figma/Sketch: Default to HEX codes\n- CSS styling: HEX, RGB, and HSL all work, but HEX is most common\n- JavaScript: rgba() is useful for colors with transparency\n- iOS/Android: Each platform prefers different formats\n\nIt's common for designers to hand off HEX colors from Figma that developers need to convert to rgba for CSS.",
        },
        {
          heading: "Color Harmony Tips",
          body: "Understanding HSL makes it easy to create harmonious color schemes:\n\n- Complementary: Set Hue 180 degrees apart (e.g., 0 and 180)\n- Analogous: Space Hue values 30 degrees apart\n- Triadic: Space Hue values 120 degrees apart\n- Lightness variations: Adjust only Lightness to create tints and shades of the same color\n\nFor brand colors, adjusting HSL Lightness is the most natural way to create light and dark variants.",
        },
        {
          heading: "How to Use Toolkio Color Converter",
          body: "Toolkio's color converter instantly converts between HEX, RGB, and HSL.\n\n1. Enter a color code in any format\n2. See automatic conversions to all other formats\n3. Preview the actual color visually\n4. Copy the code in any format you need\n\nA color picker is also available to visually select colors and get all format codes at once.",
        },
      ],
    },
  },
  {
    slug: "how-to-encode-base64",
    title: {
      ko: "Base64 인코딩 방법 - 텍스트와 파일을 Base64로 변환하기",
      en: "How to Encode Base64 - Convert Text and Files to Base64",
    },
    description: {
      ko: "Base64 인코딩과 디코딩의 원리와 활용법. 이메일 첨부, API 통신, 이미지 삽입에 쓰이는 Base64 가이드.",
      en: "How Base64 encoding and decoding works. Guide to Base64 for email, APIs, and image embedding.",
    },
    date: "2026-03-13",
    toolId: "base64",
    image: "/images/blog/how-to-encode-base64.webp",
    keywords: ["Base64 인코딩", "Base64 디코딩", "Base64 변환", "base64 encode", "base64 decode"],
    content: {
      ko: [
        {
          heading: "Base64 인코딩이란?",
          body: "Base64는 바이너리 데이터를 텍스트 문자로 변환하는 인코딩 방식입니다. A-Z, a-z, 0-9와 +, / 기호를 포함한 64개의 문자를 사용하여 어떤 데이터든 안전한 텍스트로 바꿀 수 있습니다.\n\n주의할 점은 Base64는 암호화가 아니라는 것입니다. 누구나 디코딩할 수 있으므로 비밀번호나 민감한 정보를 숨기는 용도로는 사용하면 안 됩니다. Base64는 데이터의 안전한 전송을 위한 인코딩일 뿐입니다.",
        },
        {
          heading: "Base64가 사용되는 곳",
          body: "Base64 인코딩은 다양한 곳에서 활용됩니다:\n\n- 이메일 첨부파일: MIME 프로토콜에서 파일을 텍스트로 변환하여 전송합니다\n- 데이터 URI: CSS나 HTML에서 이미지를 직접 삽입할 때 data:image/png;base64,... 형식을 사용합니다\n- API 인증: HTTP Basic Authentication에서 사용자명:비밀번호를 Base64로 인코딩합니다\n- JWT 토큰: JSON Web Token의 헤더와 페이로드가 Base64URL로 인코딩됩니다\n- XML/JSON 내 바이너리: 텍스트 기반 형식 안에 바이너리 데이터를 포함시킬 때 사용합니다",
        },
        {
          heading: "Base64 인코딩의 특성",
          body: "Base64 인코딩의 주요 특성을 알아두면 도움이 됩니다:\n\n- 크기 증가: 원본 데이터보다 약 33% 크기가 증가합니다. 3바이트의 데이터가 4개의 Base64 문자로 변환되기 때문입니다.\n- 패딩: 데이터 길이가 3의 배수가 아니면 끝에 = 기호가 붙습니다\n- URL-safe 변형: 기본 Base64의 +와 /를 URL에서 안전한 -와 _로 바꾼 Base64URL 변형이 있습니다\n\n큰 파일을 Base64로 변환하면 용량이 33% 늘어나므로, 대용량 파일에는 적합하지 않습니다.",
        },
        {
          heading: "Toolkio Base64 변환기 사용법",
          body: "Toolkio의 Base64 변환기를 사용하면 텍스트를 간편하게 인코딩하고 디코딩할 수 있습니다.\n\n1. 인코딩 또는 디코딩 모드를 선택\n2. 변환할 텍스트를 입력\n3. 변환 결과를 즉시 확인\n4. 결과를 클립보드에 복사\n\n모든 처리가 브라우저에서 이루어지므로 민감한 데이터도 안심하고 변환할 수 있습니다.",
        },
      ],
      en: [
        {
          heading: "What is Base64 Encoding?",
          body: "Base64 is an encoding method that converts binary data into text characters. It uses 64 characters (A-Z, a-z, 0-9, +, /) to safely represent any data as text.\n\nImportant: Base64 is NOT encryption. Anyone can decode it, so never use it to hide passwords or sensitive information. It's purely an encoding for safe data transmission.",
        },
        {
          heading: "Where Base64 is Used",
          body: "Base64 encoding is used in many contexts:\n\n- Email attachments: MIME protocol converts files to text for transmission\n- Data URIs: Embed images directly in CSS/HTML with data:image/png;base64,...\n- API authentication: HTTP Basic Auth encodes username:password in Base64\n- JWT tokens: Header and payload are Base64URL encoded\n- Binary in XML/JSON: Include binary data within text-based formats",
        },
        {
          heading: "Base64 Encoding Characteristics",
          body: "Key properties of Base64 to keep in mind:\n\n- Size increase: Output is ~33% larger than input (3 bytes become 4 Base64 characters)\n- Padding: = signs are added when data length isn't a multiple of 3\n- URL-safe variant: Base64URL replaces + and / with - and _ for URL compatibility\n\nSince Base64 increases size by 33%, it's not ideal for large files.",
        },
        {
          heading: "How to Use Toolkio Base64 Converter",
          body: "Toolkio's Base64 converter makes encoding and decoding simple.\n\n1. Select encode or decode mode\n2. Enter the text to convert\n3. See the result instantly\n4. Copy the output to clipboard\n\nAll processing happens in your browser, so sensitive data stays private.",
        },
      ],
    },
  },
  {
    slug: "how-to-encode-urls",
    title: {
      ko: "URL 인코딩 방법 - 특수문자와 한글이 포함된 URL 처리하기",
      en: "How to Encode URLs - Handle Special Characters and Unicode in URLs",
    },
    description: {
      ko: "URL에 한글, 공백, 특수문자가 포함될 때 안전하게 인코딩하는 방법. 퍼센트 인코딩 원리와 활용법.",
      en: "How to safely encode URLs with spaces, special characters, and Unicode. Percent encoding explained.",
    },
    date: "2026-03-13",
    toolId: "url-encoder",
    image: "/images/blog/how-to-encode-urls.webp",
    keywords: ["URL 인코딩", "URL 디코딩", "퍼센트 인코딩", "URL encode", "한글 URL"],
    content: {
      ko: [
        {
          heading: "URL 인코딩이란?",
          body: "URL(웹 주소)에는 영문자, 숫자, 일부 특수문자만 직접 사용할 수 있습니다. 한글, 공백, &, = 같은 문자는 그대로 넣으면 오류가 발생하거나 의미가 달라질 수 있습니다.\n\nURL 인코딩(퍼센트 인코딩)은 이런 문자를 %XX 형식으로 변환합니다. 예를 들어 공백은 %20, 한글 '가'는 %EA%B0%80으로 변환됩니다. 이렇게 해야 웹 브라우저와 서버가 URL을 정확히 해석할 수 있습니다.",
        },
        {
          heading: "URL 인코딩이 필요한 상황",
          body: "URL 인코딩이 필요한 실제 상황들:\n\n- 검색 쿼리: 네이버나 구글에서 한글로 검색하면 주소창에 인코딩된 문자가 표시됩니다\n- API 파라미터: REST API에 한글이나 특수문자가 포함된 값을 전달할 때\n- 리다이렉트 URL: 로그인 후 원래 페이지로 돌아가기 위한 redirect_uri 파라미터\n- 소셜 공유: 카카오톡이나 SNS에서 한글이 포함된 링크를 공유할 때\n- 파일명: 한글 파일명이 포함된 다운로드 링크\n\n특히 API 개발에서는 encodeURIComponent와 encodeURI의 차이를 알아야 합니다.",
        },
        {
          heading: "encodeURI vs encodeURIComponent",
          body: "JavaScript에서 URL 인코딩에 사용하는 두 함수의 차이:\n\n- encodeURI: URL 전체를 인코딩합니다. :, /, ?, &, = 같은 URL 구분자는 인코딩하지 않습니다. 완전한 URL을 인코딩할 때 사용합니다.\n- encodeURIComponent: 모든 특수문자를 인코딩합니다. 쿼리 파라미터의 값을 인코딩할 때 사용합니다.\n\n예시:\n- encodeURI('https://example.com/검색?q=테스트') → 'https://example.com/%EA%B2%80%EC%83%89?q=%ED%85%8C%EC%8A%A4%ED%8A%B8'\n- encodeURIComponent('a=1&b=2') → 'a%3D1%26b%3D2'\n\n쿼리 파라미터 값에는 반드시 encodeURIComponent를 사용해야 합니다.",
        },
        {
          heading: "Toolkio URL 인코더 사용법",
          body: "Toolkio의 URL 인코더를 사용하면 복잡한 인코딩 규칙을 몰라도 쉽게 변환할 수 있습니다.\n\n1. 인코딩 또는 디코딩 모드 선택\n2. 변환할 URL이나 텍스트 입력\n3. 즉시 변환 결과 확인\n4. 결과를 복사하여 사용\n\n인코딩된 URL을 원래 텍스트로 되돌리는 디코딩 기능도 제공합니다. 모든 처리는 브라우저에서 수행됩니다.",
        },
      ],
      en: [
        {
          heading: "What is URL Encoding?",
          body: "URLs can only directly contain letters, numbers, and certain special characters. Characters like spaces, &, =, and non-ASCII text cause errors or change meaning if used directly.\n\nURL encoding (percent encoding) converts these characters to %XX format. For example, a space becomes %20. This ensures browsers and servers interpret URLs correctly.",
        },
        {
          heading: "When URL Encoding is Needed",
          body: "Real situations requiring URL encoding:\n\n- Search queries: Non-ASCII search terms appear encoded in the address bar\n- API parameters: Passing special characters or Unicode in REST API values\n- Redirect URLs: redirect_uri parameters for post-login navigation\n- Social sharing: Sharing links with Unicode characters on social media\n- File names: Download links with special characters in filenames\n\nIn API development, understanding the difference between encodeURI and encodeURIComponent is crucial.",
        },
        {
          heading: "encodeURI vs encodeURIComponent",
          body: "Two JavaScript functions for URL encoding serve different purposes:\n\n- encodeURI: Encodes a full URL. Preserves URL delimiters like :, /, ?, &, =. Use for complete URLs.\n- encodeURIComponent: Encodes ALL special characters. Use for query parameter values.\n\nExample:\n- encodeURI('https://example.com/path?q=test value') preserves the URL structure\n- encodeURIComponent('a=1&b=2') becomes 'a%3D1%26b%3D2'\n\nAlways use encodeURIComponent for parameter values.",
        },
        {
          heading: "How to Use Toolkio URL Encoder",
          body: "Toolkio's URL encoder handles encoding rules so you don't have to memorize them.\n\n1. Select encode or decode mode\n2. Enter the URL or text to convert\n3. See the converted result instantly\n4. Copy the result for use\n\nDecoding is also available to convert encoded URLs back to readable text. All processing runs in your browser.",
        },
      ],
    },
  },
  {
    slug: "how-to-generate-lorem-ipsum",
    title: {
      ko: "Lorem Ipsum 더미 텍스트 생성 방법 - 디자인 시안에 활용하기",
      en: "How to Generate Lorem Ipsum - Placeholder Text for Design Mockups",
    },
    description: {
      ko: "웹 디자인, 인쇄물, 프레젠테이션에 사용할 더미 텍스트 생성 방법. Lorem Ipsum의 유래와 활용 팁.",
      en: "Generate placeholder text for web design, print, and presentations. Origin and tips for using Lorem Ipsum.",
    },
    date: "2026-03-13",
    toolId: "lorem-ipsum",
    image: "/images/blog/how-to-generate-lorem-ipsum.webp",
    keywords: ["Lorem Ipsum", "더미 텍스트", "임시 텍스트", "placeholder text", "로렘 입숨"],
    content: {
      ko: [
        {
          heading: "Lorem Ipsum이란?",
          body: "Lorem Ipsum은 인쇄 및 조판 업계에서 1500년대부터 사용해 온 표준 더미 텍스트입니다. 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'로 시작하는 이 텍스트는 실제 라틴어처럼 보이지만, 의미가 통하지 않는 변형된 라틴어입니다.\n\n원본은 기원전 45년 키케로의 'de Finibus Bonorum et Malorum'(선과 악의 극치에 관하여)에서 유래했습니다. 실제 내용을 읽기보다 레이아웃과 서체에 집중하도록 도와주는 것이 목적입니다.",
        },
        {
          heading: "더미 텍스트를 사용하는 이유",
          body: "디자인 작업에서 더미 텍스트가 필요한 이유:\n\n- 레이아웃 확인: 실제 콘텐츠가 완성되기 전에 디자인의 전체 레이아웃을 확인할 수 있습니다\n- 서체 테스트: 다양한 글꼴이 본문에서 어떻게 보이는지 비교할 수 있습니다\n- 클라이언트 프레젠테이션: 시안을 보여줄 때 내용에 신경 쓰지 않고 디자인에 집중하게 합니다\n- 개발 테스트: 프론트엔드 개발 시 다양한 길이의 텍스트로 UI가 깨지지 않는지 테스트합니다\n\n한국어 프로젝트에서는 한글 Lorem Ipsum을 사용하면 실제 한글 타이포그래피를 더 정확히 확인할 수 있습니다.",
        },
        {
          heading: "Lorem Ipsum 대안과 선택 기준",
          body: "Lorem Ipsum 외에도 다양한 더미 텍스트 옵션이 있습니다:\n\n- 한글 Lorem Ipsum: 한글 프로젝트에는 한글 더미 텍스트가 더 적합합니다\n- 실제 유사 콘텐츠: 뉴스 사이트라면 실제 뉴스와 비슷한 더미 텍스트를 사용하는 것이 현실적입니다\n- 짧은 텍스트 vs 긴 텍스트: 제목에는 짧은 문장, 본문에는 여러 문단을 사용하세요\n\n선택 기준:\n- 서체 테스트 목적: 다양한 문자가 포함된 텍스트\n- 레이아웃 테스트 목적: 실제와 비슷한 길이의 텍스트\n- 클라이언트 시안: 내용이 읽히지 않는 Lorem Ipsum이 안전합니다",
        },
        {
          heading: "Toolkio Lorem Ipsum 생성기 사용법",
          body: "Toolkio의 Lorem Ipsum 생성기를 사용하면 원하는 만큼의 더미 텍스트를 빠르게 생성할 수 있습니다.\n\n1. 생성할 단위를 선택 (문단, 문장, 단어)\n2. 원하는 수량 입력\n3. 생성 버튼 클릭\n4. 결과를 복사하여 디자인 시안에 붙여넣기\n\n브라우저에서 즉시 생성되므로 대기 시간 없이 바로 사용할 수 있습니다.",
        },
      ],
      en: [
        {
          heading: "What is Lorem Ipsum?",
          body: "Lorem Ipsum is the standard placeholder text used in printing and typesetting since the 1500s. Starting with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', it looks like real Latin but is actually scrambled text with no coherent meaning.\n\nIt originates from Cicero's 'de Finibus Bonorum et Malorum' (45 BC). Its purpose is to let viewers focus on layout and typography rather than reading the content.",
        },
        {
          heading: "Why Use Placeholder Text",
          body: "Reasons placeholder text is essential in design:\n\n- Layout preview: Verify the overall design before final content is ready\n- Font testing: Compare how different typefaces look in body text\n- Client presentations: Keep focus on design rather than content\n- Development testing: Test UI with various text lengths to prevent layout breaks\n\nFor projects in non-Latin scripts, using placeholder text in the target language gives more accurate typography previews.",
        },
        {
          heading: "Lorem Ipsum Alternatives",
          body: "Beyond classic Lorem Ipsum, several options exist:\n\n- Language-specific placeholders: More accurate for non-Latin typography\n- Topic-similar content: News-like dummy text for news sites feels more realistic\n- Length variations: Short phrases for headings, multiple paragraphs for body text\n\nChoosing criteria:\n- Font testing: Use text with diverse characters\n- Layout testing: Match realistic content lengths\n- Client mockups: Unreadable Lorem Ipsum keeps focus on design",
        },
        {
          heading: "How to Use Toolkio Lorem Ipsum Generator",
          body: "Toolkio's Lorem Ipsum generator quickly creates as much placeholder text as you need.\n\n1. Select the unit (paragraphs, sentences, or words)\n2. Enter the desired quantity\n3. Click Generate\n4. Copy and paste into your design mockup\n\nGeneration happens instantly in your browser with no waiting.",
        },
      ],
    },
  },
  {
    slug: "how-to-convert-timestamps",
    title: {
      ko: "타임스탬프 변환 방법 - Unix 타임스탬프와 날짜 변환 가이드",
      en: "How to Convert Timestamps - Unix Timestamp and Date Conversion Guide",
    },
    description: {
      ko: "Unix 타임스탬프를 사람이 읽을 수 있는 날짜로 변환하는 방법. 타임존 처리와 개발 실무 활용법.",
      en: "Convert Unix timestamps to human-readable dates. Timezone handling and practical development usage.",
    },
    date: "2026-03-13",
    toolId: "timestamp-converter",
    image: "/images/blog/how-to-convert-timestamps.webp",
    keywords: ["타임스탬프 변환", "Unix timestamp", "에폭 시간", "epoch converter", "시간 변환"],
    content: {
      ko: [
        {
          heading: "Unix 타임스탬프란?",
          body: "Unix 타임스탬프는 1970년 1월 1일 00:00:00 UTC(에폭, Epoch)부터 경과한 초(秒)의 수입니다. 예를 들어 1700000000은 2023년 11월 14일을 나타냅니다.\n\n컴퓨터 시스템에서는 날짜를 '2024년 3월 15일'처럼 저장하는 것보다 하나의 숫자로 저장하는 것이 훨씬 효율적입니다. 비교 연산도 숫자 크기 비교만 하면 되므로 빠르고, 타임존에 영향을 받지 않는 절대적인 시간 표현이 가능합니다.",
        },
        {
          heading: "타임스탬프가 사용되는 곳",
          body: "타임스탬프는 개발 실무 곳곳에서 사용됩니다:\n\n- 데이터베이스: 생성 시간(created_at), 수정 시간(updated_at) 필드에 저장\n- API 응답: 서버에서 보내는 날짜 데이터가 타임스탬프 형식인 경우가 많습니다\n- 로그 분석: 서버 로그의 시간 기록을 확인할 때\n- JWT 토큰: 토큰 만료 시간(exp)이 Unix 타임스탬프로 저장됩니다\n- 파일 시스템: 파일의 생성, 수정, 접근 시간이 타임스탬프로 기록됩니다\n\n초 단위 타임스탬프(10자리)와 밀리초 단위 타임스탬프(13자리)를 구분하는 것이 중요합니다.",
        },
        {
          heading: "타임존과 시간 변환 시 주의사항",
          body: "타임스탬프를 날짜로 변환할 때 가장 흔한 실수는 타임존 처리입니다:\n\n- UTC 기준: Unix 타임스탬프는 항상 UTC 기준입니다. 한국 시간(KST)은 UTC+9입니다.\n- 같은 타임스탬프, 다른 시간: 타임스탬프 1700000000은 UTC로는 11월 14일 22:13이지만, KST로는 11월 15일 07:13입니다.\n- 서머타임: 미국, 유럽 등 서머타임을 적용하는 지역에서는 같은 타임존이라도 시기에 따라 시차가 달라집니다.\n\nAPI에서 시간 데이터를 다룰 때는 항상 타임존 정보를 함께 확인해야 합니다. ISO 8601 형식(2024-03-15T07:13:20+09:00)이 가장 안전합니다.",
        },
        {
          heading: "Toolkio 타임스탬프 변환기 사용법",
          body: "Toolkio의 타임스탬프 변환기를 사용하면 Unix 타임스탬프와 날짜를 쉽게 상호 변환할 수 있습니다.\n\n1. Unix 타임스탬프를 입력하면 사람이 읽을 수 있는 날짜로 변환\n2. 날짜를 입력하면 Unix 타임스탬프로 변환\n3. 현재 시간의 타임스탬프도 바로 확인 가능\n4. 결과를 복사하여 코드나 문서에 활용\n\n초 단위와 밀리초 단위를 모두 지원하며, 로컬 타임존 기준으로 변환 결과를 표시합니다.",
        },
      ],
      en: [
        {
          heading: "What is a Unix Timestamp?",
          body: "A Unix timestamp is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Epoch). For example, 1700000000 represents November 14, 2023.\n\nStoring dates as a single number is far more efficient than text formats like '2024-03-15'. Comparisons are simple numeric operations, and timestamps provide timezone-independent absolute time.",
        },
        {
          heading: "Where Timestamps Are Used",
          body: "Timestamps appear throughout development:\n\n- Databases: created_at and updated_at fields\n- API responses: Server date data is often in timestamp format\n- Log analysis: Checking time records in server logs\n- JWT tokens: Expiration time (exp) stored as Unix timestamp\n- File systems: Creation, modification, and access times\n\nDistinguishing between seconds (10 digits) and milliseconds (13 digits) timestamps is important.",
        },
        {
          heading: "Timezone Pitfalls",
          body: "The most common mistake when converting timestamps is timezone handling:\n\n- UTC basis: Unix timestamps are always UTC. KST is UTC+9, EST is UTC-5.\n- Same timestamp, different times: 1700000000 is Nov 14, 22:13 UTC but Nov 15, 07:13 KST.\n- Daylight saving: Regions with DST have varying offsets throughout the year.\n\nWhen handling time data in APIs, always verify timezone information. ISO 8601 format (2024-03-15T07:13:20+09:00) is the safest approach.",
        },
        {
          heading: "How to Use Toolkio Timestamp Converter",
          body: "Toolkio's timestamp converter makes it easy to convert between Unix timestamps and dates.\n\n1. Enter a Unix timestamp to convert to a readable date\n2. Enter a date to convert to a Unix timestamp\n3. View the current time's timestamp instantly\n4. Copy results for use in code or documentation\n\nBoth seconds and milliseconds are supported, with results displayed in your local timezone.",
        },
      ],
    },
  },
  {
    slug: "how-to-generate-hash",
    title: {
      ko: "해시 생성 방법 - MD5, SHA-256 해시값 만들기와 활용법",
      en: "How to Generate Hash - Create MD5, SHA-256 Hash Values and Their Uses",
    },
    description: {
      ko: "파일 무결성 검증, 비밀번호 저장에 사용되는 해시 함수의 원리와 활용법. MD5, SHA-256 차이점 비교.",
      en: "Hash functions for file integrity and password storage. MD5 vs SHA-256 comparison and practical usage.",
    },
    date: "2026-03-13",
    toolId: "hash-generator",
    image: "/images/blog/how-to-generate-hash.webp",
    keywords: ["해시 생성", "MD5 해시", "SHA-256", "hash generator", "해시 함수"],
    content: {
      ko: [
        {
          heading: "해시 함수란 무엇인가?",
          body: "해시 함수는 임의 길이의 데이터를 고정 길이의 문자열로 변환하는 함수입니다. 같은 입력에는 항상 같은 출력이 나오지만, 출력값에서 원본 데이터를 역으로 추출하는 것은 사실상 불가능합니다.\n\n예를 들어 'Hello'를 SHA-256으로 해시하면 항상 '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969'라는 64자의 문자열이 나옵니다. 'Hello!'처럼 한 글자만 바꿔도 완전히 다른 해시값이 생성됩니다. 이를 눈사태 효과(Avalanche Effect)라고 합니다.",
        },
        {
          heading: "대표적인 해시 알고리즘 비교",
          body: "자주 사용되는 해시 알고리즘의 특징:\n\n- MD5: 128비트(32자) 출력. 속도가 빠르지만 충돌이 발견되어 보안 용도로는 부적합합니다. 파일 무결성 체크에는 여전히 사용됩니다.\n- SHA-1: 160비트(40자) 출력. MD5보다 안전하지만 역시 충돌이 발견되어 권장하지 않습니다.\n- SHA-256: 256비트(64자) 출력. 현재 가장 널리 사용되는 보안 해시 알고리즘입니다. 비트코인 채굴에도 사용됩니다.\n- SHA-512: 512비트(128자) 출력. SHA-256보다 더 긴 해시값을 생성합니다.\n\n보안이 중요한 용도에는 SHA-256 이상을 사용하세요.",
        },
        {
          heading: "해시 함수의 실제 활용",
          body: "해시 함수는 다양한 곳에서 활용됩니다:\n\n- 비밀번호 저장: 데이터베이스에 비밀번호 원문 대신 해시값을 저장합니다. 해킹당해도 원본 비밀번호를 알 수 없습니다.\n- 파일 무결성 검증: 다운로드한 파일의 해시값을 원본과 비교하여 변조 여부를 확인합니다.\n- 디지털 서명: 문서의 해시값에 서명하여 위변조를 방지합니다.\n- 블록체인: 각 블록이 이전 블록의 해시를 포함하여 체인을 형성합니다.\n- 캐시 키: 콘텐츠의 해시를 캐시 키로 사용하면 내용 변경 감지가 가능합니다.\n\n비밀번호 저장에는 bcrypt, scrypt 같은 전용 해시 함수를 사용하는 것이 더 안전합니다.",
        },
        {
          heading: "Toolkio 해시 생성기 사용법",
          body: "Toolkio의 해시 생성기를 사용하면 다양한 알고리즘의 해시값을 즉시 생성할 수 있습니다.\n\n1. 해시로 변환할 텍스트를 입력\n2. 해시 알고리즘을 선택 (MD5, SHA-1, SHA-256, SHA-512)\n3. 생성된 해시값 확인\n4. 결과를 복사하여 활용\n\n모든 해시 계산이 브라우저에서 처리되므로 입력한 데이터가 외부로 전송되지 않습니다. 파일 무결성 검증이나 개발 테스트에 유용하게 활용할 수 있습니다.",
        },
      ],
      en: [
        {
          heading: "What is a Hash Function?",
          body: "A hash function converts data of any length into a fixed-length string. The same input always produces the same output, but reversing the output to find the original data is practically impossible.\n\nFor example, SHA-256 of 'Hello' always produces '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969'. Changing even one character (like 'Hello!') produces a completely different hash. This is called the Avalanche Effect.",
        },
        {
          heading: "Popular Hash Algorithm Comparison",
          body: "Characteristics of commonly used hash algorithms:\n\n- MD5: 128-bit (32 chars) output. Fast but has known collisions — unsuitable for security. Still used for file integrity checks.\n- SHA-1: 160-bit (40 chars) output. Safer than MD5 but also has known collisions. Not recommended.\n- SHA-256: 256-bit (64 chars) output. The most widely used secure hash algorithm today. Also used in Bitcoin mining.\n- SHA-512: 512-bit (128 chars) output. Produces longer hashes than SHA-256.\n\nUse SHA-256 or higher for security-critical applications.",
        },
        {
          heading: "Practical Uses of Hash Functions",
          body: "Hash functions are used extensively:\n\n- Password storage: Store hash values instead of plain text passwords. Even if breached, original passwords remain hidden.\n- File integrity: Compare a downloaded file's hash with the original to detect tampering.\n- Digital signatures: Sign document hashes to prevent forgery.\n- Blockchain: Each block contains the previous block's hash, forming the chain.\n- Cache keys: Content hashes as cache keys enable change detection.\n\nFor password storage specifically, use dedicated functions like bcrypt or scrypt for better security.",
        },
        {
          heading: "How to Use Toolkio Hash Generator",
          body: "Toolkio's hash generator creates hash values with multiple algorithms instantly.\n\n1. Enter the text to hash\n2. Select the algorithm (MD5, SHA-1, SHA-256, SHA-512)\n3. View the generated hash value\n4. Copy the result for use\n\nAll hash calculations run in your browser, so your data is never sent externally. Useful for file integrity verification and development testing.",
        },
      ],
    },
    faq: [
      {
        question: "MD5와 SHA-256 중 어떤 것을 사용해야 하나요?",
        answer: "보안이 중요한 경우 SHA-256을 사용하세요. MD5는 충돌 공격에 취약하여 보안 용도로는 권장되지 않습니다. 단순히 파일 동일성을 빠르게 확인하는 용도라면 MD5도 사용할 수 있습니다.",
      },
      {
        question: "해시와 암호화의 차이는?",
        answer: "해시는 단방향 함수로 원본 데이터를 복원할 수 없지만, 암호화는 양방향으로 키를 사용하여 복호화가 가능합니다. 비밀번호 저장에는 해시를, 데이터 전송 보호에는 암호화를 사용합니다.",
      },
      {
        question: "같은 입력에 항상 같은 해시값이 나오나요?",
        answer: "네, 해시 함수의 핵심 특성입니다. 같은 알고리즘에 같은 입력을 넣으면 항상 동일한 해시값이 출력됩니다. 이 특성 덕분에 파일 무결성 검증이나 비밀번호 확인에 활용할 수 있습니다.",
      },
    ],
  },
  {
    slug: "how-to-preview-markdown",
    title: {
      ko: "마크다운 미리보기 가이드 - 실시간으로 Markdown 문법 확인하기",
      en: "Markdown Preview Guide - Check Your Markdown Syntax in Real Time",
    },
    description: {
      ko: "마크다운 문법을 실시간으로 미리보기하는 방법. 깃허브 README, 블로그 글 작성에 필요한 Markdown 문법 총정리.",
      en: "Preview Markdown syntax in real time. Complete Markdown guide for GitHub README and blog writing.",
    },
    date: "2026-03-13",
    toolId: "markdown-preview",
    image: "/images/blog/how-to-preview-markdown.webp",
    keywords: ["마크다운 미리보기", "Markdown 문법", "마크다운 사용법", "GitHub README 작성", "markdown preview"],
    content: {
      ko: [
        {
          heading: "마크다운(Markdown)이란 무엇인가?",
          body: "마크다운은 일반 텍스트로 서식이 있는 문서를 작성할 수 있는 경량 마크업 언어입니다. 2004년 존 그루버가 개발했으며, 현재 GitHub, Notion, 티스토리, 벨로그 등 대부분의 개발자 플랫폼과 블로그에서 기본 문서 형식으로 사용됩니다.\n\n마크다운의 가장 큰 장점은 별도의 에디터 없이 메모장에서도 작성할 수 있다는 것입니다. HTML을 직접 작성하는 것보다 훨씬 간결하고, 렌더링하면 깔끔한 문서가 됩니다.",
        },
        {
          heading: "자주 쓰는 마크다운 문법 정리",
          body: "마크다운에서 가장 많이 사용하는 문법을 정리하면:\n\n- 제목: # h1, ## h2, ### h3 (최대 6단계)\n- 굵게: **텍스트** 또는 __텍스트__\n- 기울임: *텍스트* 또는 _텍스트_\n- 목록: - 또는 * 로 시작 (순서 없는 목록), 1. 2. 3. (순서 있는 목록)\n- 링크: [표시 텍스트](URL)\n- 이미지: ![대체 텍스트](이미지 URL)\n- 코드: 인라인은 `백틱`, 블록은 ```언어명으로 감싸기\n- 인용: > 기호로 시작\n- 테이블: 파이프(|)와 하이픈(-)으로 구성\n\n이 정도만 알면 대부분의 마크다운 문서를 작성할 수 있습니다.",
        },
        {
          heading: "마크다운 미리보기가 필요한 이유",
          body: "마크다운은 텍스트 기반이기 때문에 실제로 어떻게 보이는지 바로 확인하기 어렵습니다:\n\n- GitHub README 작성: 프로젝트의 첫인상을 결정하는 README.md 파일은 테이블, 배지, 이미지 등이 포함되어 복잡합니다.\n- 기술 블로그 글쓰기: 코드 블록, 수식, 다이어그램이 정상적으로 렌더링되는지 확인이 필요합니다.\n- 문서 협업: 팀원에게 공유하기 전에 레이아웃이 의도한 대로 나오는지 검증합니다.\n\n실시간 미리보기 도구를 사용하면 작업 효율이 크게 높아집니다.",
        },
        {
          heading: "Toolkio 마크다운 미리보기 사용법",
          body: "Toolkio의 마크다운 미리보기 도구는 브라우저에서 바로 실행되며, 입력과 동시에 결과가 렌더링됩니다.\n\n1. 왼쪽 편집기에 마크다운 텍스트를 입력하거나 붙여넣기\n2. 오른쪽 미리보기 영역에서 실시간으로 렌더링 결과 확인\n3. 코드 블록, 테이블, 목록 등 모든 마크다운 문법 지원\n4. 작성한 내용을 복사하여 GitHub, 블로그 등에 바로 사용\n\n별도의 프로그램 설치가 필요 없고, 입력한 내용이 서버로 전송되지 않습니다.",
        },
      ],
      en: [
        {
          heading: "What is Markdown?",
          body: "Markdown is a lightweight markup language that lets you create formatted documents using plain text. Created by John Gruber in 2004, it's now the standard format on GitHub, Notion, Dev.to, and most developer platforms.\n\nThe biggest advantage of Markdown is its simplicity — you can write it in any text editor. It's far more concise than raw HTML, yet renders into clean, professional documents.",
        },
        {
          heading: "Essential Markdown Syntax",
          body: "Here are the most commonly used Markdown elements:\n\n- Headings: # H1, ## H2, ### H3 (up to 6 levels)\n- Bold: **text** or __text__\n- Italic: *text* or _text_\n- Lists: - or * for unordered, 1. 2. 3. for ordered\n- Links: [display text](URL)\n- Images: ![alt text](image URL)\n- Code: backticks for inline, triple backticks for blocks\n- Blockquotes: > at the start of a line\n- Tables: pipes (|) and hyphens (-)\n\nWith just these basics, you can write most Markdown documents.",
        },
        {
          heading: "Why You Need a Markdown Preview",
          body: "Since Markdown is plain text, it's hard to see how your content will actually render:\n\n- GitHub READMEs: Your project's first impression depends on a well-formatted README.md with tables, badges, and images.\n- Technical blog posts: Code blocks, math formulas, and diagrams need visual verification.\n- Team documentation: Verify layout before sharing with colleagues.\n\nA real-time preview tool lets you write Markdown on one side and see the rendered output instantly on the other.",
        },
        {
          heading: "How to Use Toolkio Markdown Preview",
          body: "Toolkio's Markdown preview runs in your browser with instant rendering as you type.\n\n1. Type or paste Markdown in the left editor\n2. See the rendered result in the right preview pane\n3. Full support for code blocks, tables, lists, and more\n4. Copy your content to use directly on GitHub or your blog\n\nNo installation required, and your content never leaves your browser.",
        },
      ],
    },
  },
  {
    slug: "how-to-test-regex",
    title: {
      ko: "정규표현식 테스트 방법 - 초보자를 위한 Regex 가이드",
      en: "How to Test Regular Expressions - A Beginner's Guide to Regex",
    },
    description: {
      ko: "정규표현식(Regex) 작성과 테스트 방법. 이메일 검증, 전화번호 추출 등 실무에서 바로 쓰는 패턴 모음.",
      en: "Write and test regular expressions easily. Practical regex patterns for email validation, phone numbers, and more.",
    },
    date: "2026-03-13",
    toolId: "regex-tester",
    image: "/images/blog/how-to-test-regex.webp",
    keywords: ["정규표현식 테스트", "regex 사용법", "정규식 패턴", "regular expression", "regex tester"],
    content: {
      ko: [
        {
          heading: "정규표현식이란 무엇인가?",
          body: "정규표현식(Regular Expression, Regex)은 문자열에서 특정 패턴을 찾거나, 치환하거나, 유효성을 검증하기 위한 표현 언어입니다. 거의 모든 프로그래밍 언어에서 지원하며, 텍스트 처리에서 빠질 수 없는 핵심 도구입니다.\n\n예를 들어 수천 줄의 로그 파일에서 이메일 주소만 추출하거나, 사용자가 입력한 전화번호 형식이 올바른지 확인하는 일을 정규표현식 한 줄로 해결할 수 있습니다.",
        },
        {
          heading: "실무에서 자주 쓰는 정규표현식 패턴",
          body: "개발 현장에서 바로 사용할 수 있는 패턴들:\n\n- 이메일 검증: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n- 한국 휴대폰 번호: ^01[016789]-?\\d{3,4}-?\\d{4}$\n- URL 형식: ^https?://[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$\n- 한글만: ^[가-힣]+$\n- 숫자만: ^\\d+$\n- 비밀번호 (8자 이상, 대소문자+숫자+특수문자): ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        },
        {
          heading: "정규표현식 기본 문법 빠르게 배우기",
          body: "정규표현식의 핵심 문법:\n\n- . (점): 아무 문자 1개\n- \\d: 숫자 (0-9)\n- \\w: 영문자, 숫자, 밑줄\n- \\s: 공백 문자\n- ^: 문자열 시작\n- $: 문자열 끝\n- *: 0번 이상 반복\n- +: 1번 이상 반복\n- ?: 0번 또는 1번\n- {n,m}: n번 이상 m번 이하 반복\n- [abc]: a, b, c 중 하나\n- (abc|def): abc 또는 def\n\n이 문법들을 조합하면 거의 모든 텍스트 패턴을 표현할 수 있습니다.",
        },
        {
          heading: "Toolkio 정규표현식 테스터 사용법",
          body: "Toolkio의 정규표현식 테스터는 패턴을 입력하면 실시간으로 매칭 결과를 보여줍니다.\n\n1. 상단에 정규표현식 패턴 입력\n2. 플래그 설정 (g: 전역, i: 대소문자 무시, m: 다중 행)\n3. 아래 텍스트 영역에 테스트할 문자열 입력\n4. 매칭되는 부분이 실시간으로 하이라이트 표시\n\n브라우저에서 바로 실행되므로 민감한 데이터도 안전합니다.",
        },
      ],
      en: [
        {
          heading: "What Are Regular Expressions?",
          body: "Regular expressions (regex) are a pattern language for finding, replacing, and validating text. Supported in virtually every programming language, regex is an essential tool for text processing.\n\nFor example, extracting email addresses from thousands of log lines or validating phone number formats can be done with a single regex pattern.",
        },
        {
          heading: "Practical Regex Patterns for Daily Use",
          body: "Ready-to-use patterns for common tasks:\n\n- Email validation: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n- URL format: ^https?://[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$\n- Numbers only: ^\\d+$\n- Password (8+, upper+lower+digit+special): ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\n- IP address: ^(?:\\d{1,3}\\.){3}\\d{1,3}$",
        },
        {
          heading: "Regex Syntax Quick Reference",
          body: "Core regex syntax:\n\n- . (dot): Any single character\n- \\d: Digit (0-9)\n- \\w: Word character\n- \\s: Whitespace\n- ^: Start of string\n- $: End of string\n- *: Zero or more\n- +: One or more\n- ?: Zero or one\n- {n,m}: Between n and m times\n- [abc]: One of a, b, or c\n- (abc|def): abc or def\n\nCombining these lets you express nearly any text pattern.",
        },
        {
          heading: "How to Use Toolkio Regex Tester",
          body: "Toolkio's regex tester shows matches in real time as you type your pattern.\n\n1. Enter your regex pattern at the top\n2. Set flags (g: global, i: case-insensitive, m: multiline)\n3. Enter test strings in the text area below\n4. Matches are highlighted instantly\n\nEverything runs in your browser — safe for sensitive data.",
        },
      ],
    },
  },
  {
    slug: "how-to-convert-text-case",
    title: {
      ko: "영문 대소문자 변환 방법 - 텍스트 케이스 한번에 바꾸기",
      en: "How to Convert Text Case - Change Case Instantly Online",
    },
    description: {
      ko: "영문 대소문자를 한번에 변환하는 방법. UPPERCASE, lowercase, camelCase, Title Case 등 다양한 케이스 변환.",
      en: "Convert text between UPPERCASE, lowercase, camelCase, Title Case and more instantly online.",
    },
    date: "2026-03-13",
    toolId: "case-converter",
    image: "/images/blog/how-to-convert-text-case.webp",
    keywords: ["대소문자 변환", "텍스트 케이스 변환", "case converter", "uppercase lowercase", "camelCase 변환"],
    content: {
      ko: [
        {
          heading: "텍스트 케이스 변환이 필요한 경우",
          body: "영문 텍스트를 다룰 때 대소문자 변환이 필요한 상황은 자주 발생합니다:\n\n- Caps Lock을 켠 채 긴 문장을 타이핑했을 때\n- 데이터베이스의 이름 필드를 일괄적으로 Title Case로 바꿔야 할 때\n- 프로그래밍에서 변수명을 camelCase에서 snake_case로 바꿔야 할 때\n- 이메일 주소를 모두 소문자로 통일해야 할 때\n\n수십 줄 이상의 텍스트라면 변환 도구가 필수입니다.",
        },
        {
          heading: "케이스 유형별 특징과 사용처",
          body: "주요 텍스트 케이스:\n\n- UPPERCASE: 약어, 상수명, 강조. 예: MAX_VALUE, HTTP\n- lowercase: 이메일, URL. 예: hello@email.com\n- Title Case: 제목, 이름. 예: The Great Gatsby\n- camelCase: JavaScript 변수명. 예: getUserName\n- PascalCase: 클래스명. 예: UserProfile\n- snake_case: Python 변수명, DB 컬럼명. 예: user_name\n- kebab-case: CSS 클래스, URL. 예: main-content",
        },
        {
          heading: "프로그래밍 네이밍 컨벤션 가이드",
          body: "각 언어별 권장 네이밍 컨벤션:\n\n- JavaScript/TypeScript: 변수와 함수는 camelCase, 클래스는 PascalCase, 상수는 UPPER_SNAKE_CASE\n- Python: 변수와 함수는 snake_case, 클래스는 PascalCase\n- CSS: 클래스명은 kebab-case\n- Java: JavaScript와 유사, 패키지명은 lowercase\n- SQL: 테이블명과 컬럼명은 snake_case\n\n일관된 네이밍 컨벤션을 유지하면 코드 가독성이 높아지고 팀 협업이 원활해집니다.",
        },
        {
          heading: "Toolkio 대소문자 변환 도구 사용법",
          body: "Toolkio의 대소문자 변환 도구를 사용하면 텍스트를 원하는 케이스로 즉시 변환할 수 있습니다.\n\n1. 변환할 텍스트를 입력란에 붙여넣기\n2. 원하는 케이스 버튼 클릭 (UPPER, lower, Title, camelCase, snake_case 등)\n3. 변환 결과를 확인하고 복사\n\n여러 줄의 텍스트도 한 번에 변환되며, 브라우저에서 바로 처리되므로 빠르고 안전합니다.",
        },
      ],
      en: [
        {
          heading: "When You Need Text Case Conversion",
          body: "Case conversion comes up more often than you'd expect:\n\n- Typed a long paragraph with Caps Lock on\n- Need to standardize database name fields to Title Case\n- Converting variable names from camelCase to snake_case\n- Normalizing email addresses to lowercase\n\nFor dozens of lines, you need a conversion tool.",
        },
        {
          heading: "Case Types and Where They're Used",
          body: "Common text cases:\n\n- UPPERCASE: Acronyms, constants. e.g., MAX_VALUE\n- lowercase: Emails, URLs. e.g., hello@email.com\n- Title Case: Titles, names. e.g., The Great Gatsby\n- camelCase: JavaScript variables. e.g., getUserName\n- PascalCase: Class names. e.g., UserProfile\n- snake_case: Python variables, DB columns. e.g., user_name\n- kebab-case: CSS classes, URL slugs. e.g., main-content",
        },
        {
          heading: "Programming Naming Convention Guide",
          body: "Each language has preferred naming conventions:\n\n- JavaScript/TypeScript: camelCase for variables/functions, PascalCase for classes, UPPER_SNAKE_CASE for constants\n- Python: snake_case for variables/functions, PascalCase for classes\n- CSS: kebab-case for class names\n- Java: Similar to JavaScript, lowercase for packages\n- SQL: snake_case for table and column names\n\nConsistent naming improves readability and team collaboration.",
        },
        {
          heading: "How to Use Toolkio Case Converter",
          body: "Toolkio's case converter transforms text to any case instantly.\n\n1. Paste your text into the input field\n2. Click the desired case button (UPPER, lower, Title, camelCase, snake_case, etc.)\n3. Review and copy the result\n\nMulti-line text is converted at once. Runs in your browser for speed and privacy.",
        },
      ],
    },
  },
  {
    slug: "how-to-generate-uuid",
    title: {
      ko: "UUID 생성 방법 - 고유 식별자의 모든 것",
      en: "How to Generate UUIDs - Everything About Unique Identifiers",
    },
    description: {
      ko: "UUID(범용 고유 식별자)의 개념과 생성 방법. v1, v4, v7 차이점과 실무 활용법 총정리.",
      en: "What UUIDs are and how to generate them. Differences between v1, v4, v7 and practical use cases.",
    },
    date: "2026-03-13",
    toolId: "uuid-generator",
    image: "/images/blog/how-to-generate-uuid.webp",
    keywords: ["UUID 생성", "UUID란", "고유 식별자", "uuid generator", "UUID v4"],
    content: {
      ko: [
        {
          heading: "UUID란 무엇인가?",
          body: "UUID(Universally Unique Identifier)는 전 세계적으로 고유한 128비트 값입니다. 형식은 8-4-4-4-12 자리의 16진수로, 예를 들면 550e8400-e29b-41d4-a716-446655440000과 같습니다.\n\nUUID의 가장 큰 장점은 중앙 서버 없이도 어디서든 고유한 ID를 만들 수 있다는 것입니다. 분산 시스템에서 충돌 없이 독립적으로 ID를 생성할 수 있습니다.",
        },
        {
          heading: "UUID 버전별 차이점",
          body: "UUID에는 여러 버전이 있습니다:\n\n- UUID v1: 타임스탬프 + MAC 주소 기반. MAC 주소 노출에 주의.\n- UUID v4: 완전 랜덤 생성. 가장 널리 사용되는 버전.\n- UUID v7: 타임스탬프 기반 + 랜덤. 시간순 정렬이 가능해 DB 성능 우수.\n\n일반적인 용도에는 v4를, DB 기본키에는 v7을 추천합니다.",
        },
        {
          heading: "UUID 실무 활용 사례",
          body: "UUID는 소프트웨어 개발 곳곳에서 사용됩니다:\n\n- 데이터베이스 기본키: 분산 DB, 마이크로서비스에서 충돌 없는 ID\n- API 요청 추적: 각 요청에 UUID를 부여해 로그 추적\n- 세션 관리: 사용자 세션을 고유하게 식별\n- 파일 이름: 업로드 파일의 이름 충돌 방지\n- 임시 토큰: 이메일 인증, 비밀번호 재설정 링크\n\n문자열 저장은 36바이트이므로, 대량 데이터에서는 바이너리(16바이트) 저장이 효율적입니다.",
        },
        {
          heading: "Toolkio UUID 생성기 사용법",
          body: "Toolkio의 UUID 생성기를 사용하면 다양한 버전의 UUID를 즉시 생성할 수 있습니다.\n\n1. UUID 버전 선택\n2. 생성 버튼 클릭\n3. 생성된 UUID를 원클릭으로 복사\n4. 필요하면 여러 개를 한 번에 생성\n\n브라우저의 암호학적 난수 생성기를 사용하며, 생성된 UUID는 서버로 전송되지 않습니다.",
        },
      ],
      en: [
        {
          heading: "What is a UUID?",
          body: "A UUID (Universally Unique Identifier) is a globally unique 128-bit value in the format 8-4-4-4-12 hexadecimal digits, like 550e8400-e29b-41d4-a716-446655440000.\n\nThe key advantage is generating unique IDs anywhere without a central server. UUIDs can be created independently across distributed systems without collisions.",
        },
        {
          heading: "UUID Version Differences",
          body: "UUID versions differ in generation method:\n\n- UUID v1: Timestamp + MAC address. Reveals creation time but exposes MAC address.\n- UUID v4: Fully random. The most widely used version.\n- UUID v7: Timestamp + random. Sortable by time, great for DB performance.\n\nFor general use, v4 is recommended. For database primary keys, v7 is better.",
        },
        {
          heading: "UUID Use Cases in Practice",
          body: "UUIDs appear throughout software development:\n\n- Database primary keys: Collision-free IDs in distributed databases\n- API request tracing: UUID per request for log tracking\n- Session management: Unique user session identification\n- File naming: Prevent upload filename collisions\n- Temporary tokens: Email verification, password reset links\n\nStoring as strings takes 36 bytes — binary (16 bytes) is more efficient for large datasets.",
        },
        {
          heading: "How to Use Toolkio UUID Generator",
          body: "Toolkio's UUID generator creates various versions instantly.\n\n1. Select the UUID version\n2. Click Generate\n3. Copy with one click\n4. Generate multiple at once if needed\n\nUses your browser's cryptographic random number generator. UUIDs are never sent to any server.",
        },
      ],
    },
  },
  {
    slug: "how-to-minify-css",
    title: {
      ko: "CSS 압축(Minify) 방법 - 웹사이트 속도를 높이는 CSS 최적화",
      en: "How to Minify CSS - Optimize CSS for Faster Websites",
    },
    description: {
      ko: "CSS 파일을 압축하여 웹사이트 로딩 속도를 높이는 방법. CSS Minification의 원리와 실전 적용법.",
      en: "Minify CSS files to improve website loading speed. How CSS minification works and how to apply it.",
    },
    date: "2026-03-13",
    toolId: "css-minifier",
    image: "/images/blog/how-to-minify-css.webp",
    keywords: ["CSS 압축", "CSS 최적화", "css minify", "CSS 미니파이", "웹사이트 속도 최적화"],
    content: {
      ko: [
        {
          heading: "CSS 압축(Minification)이란?",
          body: "CSS 압축이란 CSS 파일에서 주석, 공백, 줄바꿈, 불필요한 세미콜론 등을 제거하여 파일 크기를 줄이는 최적화 기법입니다. 코드의 기능은 동일하게 유지하면서 파일 용량만 줄어듭니다.\n\n일반적으로 CSS 파일을 압축하면 원본 대비 20~50%의 용량을 절약할 수 있습니다. 대규모 웹사이트에서는 이 차이가 페이지 로딩 시간에 상당한 영향을 미칩니다.",
        },
        {
          heading: "CSS 압축이 웹 성능에 미치는 영향",
          body: "웹사이트 속도는 사용자 경험과 비즈니스 성과에 직접적인 영향을 미칩니다:\n\n- 구글 연구에 따르면 페이지 로딩이 3초를 넘으면 53%의 사용자가 이탈합니다\n- 구글은 Core Web Vitals를 검색 순위에 반영하므로 SEO에도 중요합니다\n- CSS는 렌더링 차단 리소스이므로, CSS 파일이 클수록 화면이 늦게 표시됩니다\n\nCSS 압축과 함께 Gzip 압축, 불필요한 CSS 제거, CSS 분할을 병행하면 더 효과적입니다.",
        },
        {
          heading: "CSS 압축 시 주의사항",
          body: "CSS를 압축할 때 알아두어야 할 점들:\n\n1. 원본 파일 보관: 개발용 원본(.css)과 배포용 압축본(.min.css)을 분리하세요\n2. 소스맵 활용: .map 파일을 생성하면 개발자 도구에서 원본 코드를 확인할 수 있습니다\n3. 빌드 프로세스 통합: Webpack, Vite, PostCSS에 자동 압축을 설정하세요\n4. 색상 축약: #ffffff는 #fff로, #aabbcc는 #abc로 축약됩니다\n\n프로덕션에서는 항상 압축된 CSS를, 개발 환경에서는 가독성 있는 원본을 사용하세요.",
        },
        {
          heading: "Toolkio CSS 압축 도구 사용법",
          body: "Toolkio의 CSS 압축 도구를 사용하면 브라우저에서 즉시 CSS를 압축할 수 있습니다.\n\n1. CSS 코드를 입력란에 붙여넣기\n2. 압축 버튼 클릭\n3. 압축된 CSS 결과 확인 (원본 대비 절약률 표시)\n4. 결과를 복사하여 프로젝트에 적용\n\n빌드 설정 없이 바로 사용할 수 있고, 입력한 코드가 서버로 전송되지 않습니다.",
        },
      ],
      en: [
        {
          heading: "What is CSS Minification?",
          body: "CSS minification removes comments, whitespace, line breaks, and unnecessary semicolons from CSS files to reduce size. The code functions identically — only the file size changes.\n\nTypically, minifying CSS saves 20-50% of the original file size. On large websites, this significantly impacts page load times.",
        },
        {
          heading: "How CSS Minification Affects Web Performance",
          body: "Website speed directly impacts user experience and business:\n\n- Google research shows 53% of users abandon pages taking over 3 seconds\n- Core Web Vitals affect search rankings, making speed crucial for SEO\n- CSS is render-blocking — larger CSS files delay page display\n\nCombine minification with Gzip compression, unused CSS removal, and CSS splitting for best results.",
        },
        {
          heading: "CSS Minification Best Practices",
          body: "Keep these points in mind:\n\n1. Keep originals: Maintain separate dev (.css) and production (.min.css) files\n2. Use source maps: .map files let browser dev tools display original code\n3. Automate: Integrate into your build process (Webpack, Vite, PostCSS)\n4. Color shorthand: #ffffff becomes #fff, #aabbcc becomes #abc\n\nAlways use minified CSS in production and readable originals in development.",
        },
        {
          heading: "How to Use Toolkio CSS Minifier",
          body: "Toolkio's CSS minifier compresses your CSS instantly in the browser.\n\n1. Paste your CSS code into the input field\n2. Click the Minify button\n3. See the result with savings percentage\n4. Copy the minified CSS for your project\n\nNo build configuration needed. Your code never leaves your browser.",
        },
      ],
    },
  },
  {
    slug: "how-to-convert-number-bases",
    title: {
      ko: "진법 변환 방법 - 2진수, 8진수, 10진수, 16진수 쉽게 바꾸기",
      en: "How to Convert Number Bases - Binary, Octal, Decimal, and Hex Made Easy",
    },
    description: {
      ko: "2진수, 8진수, 10진수, 16진수 간의 진법 변환 방법. 프로그래밍과 컴퓨터 과학의 필수 지식.",
      en: "Convert between binary, octal, decimal, and hexadecimal. Essential knowledge for programming and computer science.",
    },
    date: "2026-03-13",
    toolId: "number-base-converter",
    image: "/images/blog/how-to-convert-number-bases.webp",
    keywords: ["진법 변환", "2진수 변환", "16진수 변환", "number base converter", "진수 변환기"],
    content: {
      ko: [
        {
          heading: "진법이란 무엇인가?",
          body: "진법(Number Base)이란 숫자를 표현하는 체계를 말합니다. 우리가 일상에서 사용하는 10진법은 0~9까지 10개의 숫자를 사용하지만, 컴퓨터는 0과 1만 사용하는 2진법으로 동작합니다.\n\n- 2진법(Binary): 0과 1. 컴퓨터의 기본 단위. 예: 1010 = 10진수 10\n- 8진법(Octal): 0~7. Unix 파일 권한. 예: 755\n- 10진법(Decimal): 0~9. 일상 숫자 체계\n- 16진법(Hexadecimal): 0~9, A~F. 메모리 주소, 색상 코드. 예: #FF5733",
        },
        {
          heading: "프로그래밍에서 진법이 사용되는 곳",
          body: "개발자가 진법 변환을 해야 하는 실제 상황:\n\n- 색상 코드: CSS #FF0000은 16진수, R=255는 10진수\n- 비트 연산: 리눅스 chmod 755는 8진수, 2진수로는 111 101 101\n- 메모리 주소: 디버깅 시 16진수(0x7FFF5FBFF8AC)로 표시\n- 네트워크: 서브넷 마스크는 2진수로 이해해야 네트워크 범위 계산 가능\n- 문자 인코딩: ASCII 'A'는 10진수 65, 16진수 41, 2진수 01000001",
        },
        {
          heading: "진법 변환 원리",
          body: "10진수를 다른 진법으로: 나누기를 반복하여 나머지를 역순으로 읽습니다.\n예: 25를 2진수로 → 25÷2=12...1, 12÷2=6...0, 6÷2=3...0, 3÷2=1...1, 1÷2=0...1 → 11001\n\n다른 진법을 10진수로: 각 자릿수에 진법의 거듭제곱을 곱해서 더합니다.\n예: 2진수 11001 → 1×2⁴+1×2³+0×2²+0×2¹+1×2⁰ = 16+8+0+0+1 = 25\n\n2진수와 16진수: 2진수 4자리가 16진수 1자리. 1010=A, 1111=F",
        },
        {
          heading: "Toolkio 진법 변환기 사용법",
          body: "Toolkio의 진법 변환기는 숫자를 입력하면 여러 진법으로 동시에 변환합니다.\n\n1. 변환할 숫자 입력\n2. 입력 진법 선택 (2진, 8진, 10진, 16진)\n3. 모든 진법의 변환 결과를 한 번에 확인\n4. 필요한 결과를 클릭하여 복사\n\n프로그래밍 학습, 코딩 테스트, 실무 디버깅에 유용합니다.",
        },
      ],
      en: [
        {
          heading: "What Are Number Bases?",
          body: "A number base defines how numbers are represented. We use base 10 (decimal) daily, but computers operate in base 2 (binary).\n\n- Binary (base 2): 0 and 1. Foundation of computing. e.g., 1010 = decimal 10\n- Octal (base 8): 0-7. Unix file permissions. e.g., 755\n- Decimal (base 10): 0-9. Our everyday system\n- Hexadecimal (base 16): 0-9, A-F. Memory addresses, color codes. e.g., #FF5733",
        },
        {
          heading: "Where Number Bases Are Used",
          body: "Real scenarios requiring base conversion:\n\n- Color codes: CSS #FF0000 is hex; R=255 is decimal\n- Bit operations: Linux chmod 755 is octal, or 111 101 101 in binary\n- Memory addresses: Debugger shows hex (0x7FFF5FBFF8AC)\n- Networking: Subnet masks need binary for range calculations\n- Character encoding: ASCII 'A' is decimal 65, hex 41, binary 01000001",
        },
        {
          heading: "How Base Conversion Works",
          body: "Decimal to other bases: Repeatedly divide, read remainders in reverse.\ne.g., 25 to binary → 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1 → 11001\n\nOther bases to decimal: Multiply each digit by base^position.\ne.g., binary 11001 → 1×2⁴+1×2³+0+0+1×2⁰ = 25\n\nBinary to hex: 4 binary digits = 1 hex digit. 1010=A, 1111=F",
        },
        {
          heading: "How to Use Toolkio Number Base Converter",
          body: "Toolkio's base converter shows all conversions simultaneously.\n\n1. Enter the number to convert\n2. Select the input base\n3. View results in all bases at once\n4. Click to copy any result\n\nInstant conversion for learning, coding tests, and debugging.",
        },
      ],
    },
  },
  {
    slug: "how-to-count-text",
    title: {
      ko: "텍스트 카운터 사용법 - 단어수, 문장수, 문단수 한번에 세기",
      en: "How to Use a Text Counter - Count Words, Sentences, and Paragraphs at Once",
    },
    description: {
      ko: "단어수, 문장수, 문단수, 읽기 시간을 한번에 확인하는 방법. 리포트, 논문, 블로그 글 작성에 필수.",
      en: "Count words, sentences, paragraphs, and reading time instantly. Essential for reports, papers, and blog posts.",
    },
    date: "2026-03-13",
    toolId: "text-counter",
    image: "/images/blog/how-to-count-text.webp",
    keywords: ["단어수 세기", "텍스트 카운터", "word counter", "문장수 세기", "글 분석 도구"],
    content: {
      ko: [
        {
          heading: "텍스트 카운터가 필요한 이유",
          body: "글을 쓸 때 단순히 글자수만 세는 것으로는 부족한 경우가 많습니다. 영문 에세이는 단어수(word count) 기준으로 제한을 두고, 학술 논문은 문장 길이와 문단 구성이 중요하며, 블로그 글은 읽기 시간이 독자 이탈률에 영향을 미칩니다.\n\nSEO를 고려한 블로그 글이라면 적정 단어수(한글 기준 1,500~3,000자, 영문 기준 1,000~2,000 words)를 맞추는 것이 검색 노출에 유리합니다.",
        },
        {
          heading: "텍스트 분석 지표의 의미",
          body: "각 지표가 실제로 어떤 의미를 갖는지:\n\n- 단어수(Words): 공백으로 구분된 단어 개수. 영문 에세이, 번역 견적의 기본 단위.\n- 문장수(Sentences): 마침표, 물음표, 느낌표로 끝나는 문장 개수.\n- 문단수(Paragraphs): 빈 줄로 구분된 문단 개수.\n- 읽기 시간: 평균 읽기 속도(한글 분당 500자, 영문 분당 200~250단어) 기준.\n- 평균 문장 길이: 학술 글은 20~25단어, 일반 글은 15~20단어가 적절합니다.",
        },
        {
          heading: "효과적인 글쓰기를 위한 텍스트 분석 활용",
          body: "텍스트 분석 지표를 활용하면 글의 품질을 객관적으로 개선할 수 있습니다:\n\n1. 문장 길이 조절: 평균 30단어를 넘으면 나누세요. 짧은 문장과 긴 문장을 섞으면 리듬감이 생깁니다.\n2. 문단 크기 조절: 5~7문장을 넘으면 나누세요. 모바일에서는 더 짧은 문단이 효과적.\n3. 읽기 시간 고려: 블로그 글의 이상적인 읽기 시간은 5~7분.\n4. 키워드 빈도: 특정 키워드가 적절한 빈도로 등장하는지 확인하면 SEO에 도움.",
        },
        {
          heading: "Toolkio 텍스트 카운터 사용법",
          body: "Toolkio의 텍스트 카운터는 텍스트를 입력하면 다양한 통계를 실시간으로 보여줍니다.\n\n1. 분석할 텍스트를 입력란에 붙여넣기\n2. 단어수, 문장수, 문단수, 읽기 시간 등 실시간 확인\n3. 글자수, 공백 제외 글자수, 바이트 수도 함께 표시\n4. 초기화 버튼으로 새로운 텍스트 분석\n\n모든 처리는 브라우저에서 이루어지므로 개인정보 유출 걱정 없이 사용 가능합니다.",
        },
      ],
      en: [
        {
          heading: "Why You Need a Text Counter",
          body: "Character counting alone often isn't enough. English essays use word count limits, academic papers focus on sentence length, and blog posts need reading time to reduce bounce rates.\n\nFor SEO-focused blog posts, hitting the ideal word count (1,000-2,000 words for English) improves search visibility.",
        },
        {
          heading: "Understanding Text Analysis Metrics",
          body: "What each metric means:\n\n- Words: Space-separated word count. Standard for essays and translation pricing.\n- Sentences: Units ending with periods, question marks, or exclamation marks.\n- Paragraphs: Blocks separated by blank lines.\n- Reading time: Based on average speed (200-250 words/minute for English).\n- Average sentence length: Academic 20-25 words, general 15-20 words.",
        },
        {
          heading: "Using Text Analysis for Better Writing",
          body: "Text metrics help improve your writing objectively:\n\n1. Sentence length: Split sentences averaging over 30 words. Mix short and long for rhythm.\n2. Paragraph size: Break paragraphs over 5-7 sentences. Shorter on mobile.\n3. Reading time: Ideal blog post is 5-7 minutes.\n4. Keyword frequency: Check target keywords appear at appropriate frequencies for SEO.",
        },
        {
          heading: "How to Use Toolkio Text Counter",
          body: "Toolkio's text counter shows real-time statistics as you type.\n\n1. Paste your text into the input field\n2. View words, sentences, paragraphs, and reading time instantly\n3. Character count, characters without spaces, and byte count also displayed\n4. Use Clear to analyze new text\n\nAll processing happens in your browser — no privacy concerns.",
        },
      ],
    },
  },
];
