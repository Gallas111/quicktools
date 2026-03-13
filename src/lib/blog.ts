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
    image: "/images/blog/how-to-count-characters.png",
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
    image: "/images/blog/how-to-compress-images.png",
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
    image: "/images/blog/how-to-create-qr-code.png",
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
    image: "/images/blog/how-to-create-strong-password.png",
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
    image: "/images/blog/how-to-compare-text.png",
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
];
