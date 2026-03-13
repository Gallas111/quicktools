export type Category = "text" | "calculator" | "converter" | "media" | "developer";

export interface CategoryInfo {
  id: Category;
  name: { ko: string; en: string };
  icon: string;
}

export const categories: CategoryInfo[] = [
  { id: "text", name: { ko: "텍스트", en: "Text" }, icon: "📝" },
  { id: "calculator", name: { ko: "계산기", en: "Calculator" }, icon: "🧮" },
  { id: "converter", name: { ko: "변환기", en: "Converter" }, icon: "🔄" },
  { id: "media", name: { ko: "이미지 & 미디어", en: "Image & Media" }, icon: "🖼️" },
  { id: "developer", name: { ko: "개발자 도구", en: "Developer" }, icon: "🔧" },
];

export interface Tool {
  id: string;
  name: { ko: string; en: string };
  description: { ko: string; en: string };
  icon: string;
  href: string;
  color: string;
  category: Category;
}

export const tools: Tool[] = [
  // === 텍스트 ===
  {
    id: "character-counter",
    name: { ko: "글자수 세기", en: "Character Counter" },
    description: {
      ko: "글자수, 단어수, 바이트를 실시간으로 세어보세요",
      en: "Count characters, words, and bytes in real-time",
    },
    icon: "✏️",
    href: "/tools/character-counter",
    color: "from-blue-500 to-cyan-500",
    category: "text",
  },
  {
    id: "text-counter",
    name: { ko: "텍스트 분석기", en: "Text Analyzer" },
    description: {
      ko: "읽기 시간, 단어 빈도 등 텍스트를 분석하세요",
      en: "Analyze reading time, word frequency and more",
    },
    icon: "📊",
    href: "/tools/text-counter",
    color: "from-orange-500 to-red-500",
    category: "text",
  },
  {
    id: "case-converter",
    name: { ko: "대소문자 변환", en: "Case Converter" },
    description: {
      ko: "텍스트를 다양한 형식으로 변환하세요",
      en: "Convert text between different cases",
    },
    icon: "🔠",
    href: "/tools/case-converter",
    color: "from-pink-500 to-rose-500",
    category: "text",
  },
  {
    id: "diff-checker",
    name: { ko: "텍스트 비교", en: "Diff Checker" },
    description: {
      ko: "두 텍스트의 차이점을 비교하세요",
      en: "Compare two texts and find differences",
    },
    icon: "🔀",
    href: "/tools/diff-checker",
    color: "from-emerald-500 to-green-500",
    category: "text",
  },
  {
    id: "lorem-ipsum",
    name: { ko: "Lorem Ipsum 생성기", en: "Lorem Ipsum Generator" },
    description: {
      ko: "더미 텍스트를 원하는 양만큼 생성하세요",
      en: "Generate placeholder text in any amount",
    },
    icon: "📝",
    href: "/tools/lorem-ipsum",
    color: "from-amber-500 to-orange-500",
    category: "text",
  },
  {
    id: "markdown-preview",
    name: { ko: "마크다운 미리보기", en: "Markdown Preview" },
    description: {
      ko: "마크다운을 실시간으로 미리보기하세요",
      en: "Preview Markdown in real-time",
    },
    icon: "📄",
    href: "/tools/markdown-preview",
    color: "from-violet-500 to-purple-500",
    category: "text",
  },
  {
    id: "instagram-line-break",
    name: { ko: "인스타 줄바꿈", en: "Instagram Line Break" },
    description: {
      ko: "인스타그램에서 줄바꿈이 제대로 되는 텍스트를 만드세요",
      en: "Create text with proper line breaks for Instagram",
    },
    icon: "📸",
    href: "/tools/instagram-line-break",
    color: "from-fuchsia-500 to-pink-500",
    category: "text",
  },

  // === 계산기 ===
  {
    id: "age-calculator",
    name: { ko: "만나이 계산기", en: "Age Calculator" },
    description: {
      ko: "생년월일로 만나이, 한국나이를 계산하세요",
      en: "Calculate your exact age from date of birth",
    },
    icon: "🎂",
    href: "/tools/age-calculator",
    color: "from-purple-500 to-indigo-500",
    category: "calculator",
  },
  {
    id: "dday-calculator",
    name: { ko: "D-day 계산기", en: "D-Day Calculator" },
    description: {
      ko: "특정 날짜까지 남은 일수를 계산하세요",
      en: "Calculate days remaining until a specific date",
    },
    icon: "📅",
    href: "/tools/dday-calculator",
    color: "from-red-500 to-orange-500",
    category: "calculator",
  },
  {
    id: "percent-calculator",
    name: { ko: "퍼센트 계산기", en: "Percent Calculator" },
    description: {
      ko: "퍼센트, 할인율, 증감률을 쉽게 계산하세요",
      en: "Calculate percentages, discounts, and changes",
    },
    icon: "💯",
    href: "/tools/percent-calculator",
    color: "from-green-500 to-teal-500",
    category: "calculator",
  },
  {
    id: "bmi-calculator",
    name: { ko: "BMI 계산기", en: "BMI Calculator" },
    description: {
      ko: "체질량지수(BMI)를 계산하고 건강 상태를 확인하세요",
      en: "Calculate your Body Mass Index and health status",
    },
    icon: "⚖️",
    href: "/tools/bmi-calculator",
    color: "from-cyan-500 to-blue-500",
    category: "calculator",
  },
  {
    id: "bmr-calculator",
    name: { ko: "기초대사량 계산기", en: "BMR Calculator" },
    description: {
      ko: "기초대사량과 일일 권장 칼로리를 계산하세요",
      en: "Calculate your Basal Metabolic Rate and daily calories",
    },
    icon: "🔥",
    href: "/tools/bmr-calculator",
    color: "from-orange-500 to-yellow-500",
    category: "calculator",
  },
  {
    id: "salary-calculator",
    name: { ko: "연봉 실수령액 계산기", en: "Salary Calculator" },
    description: {
      ko: "연봉에서 세금·4대보험 공제 후 실수령액을 계산하세요",
      en: "Calculate take-home pay after taxes and deductions",
    },
    icon: "💰",
    href: "/tools/salary-calculator",
    color: "from-emerald-500 to-cyan-500",
    category: "calculator",
  },
  {
    id: "gpa-calculator",
    name: { ko: "학점 계산기", en: "GPA Calculator" },
    description: {
      ko: "대학교 학점 평균(GPA)을 계산하세요",
      en: "Calculate your university Grade Point Average",
    },
    icon: "🎓",
    href: "/tools/gpa-calculator",
    color: "from-indigo-500 to-blue-500",
    category: "calculator",
  },

  // === 변환기 ===
  {
    id: "unit-converter",
    name: { ko: "단위 변환기", en: "Unit Converter" },
    description: {
      ko: "길이, 무게, 온도 등 다양한 단위를 변환하세요",
      en: "Convert length, weight, temperature and more",
    },
    icon: "📏",
    href: "/tools/unit-converter",
    color: "from-teal-500 to-green-500",
    category: "converter",
  },
  {
    id: "color-converter",
    name: { ko: "색상 변환기", en: "Color Converter" },
    description: {
      ko: "HEX, RGB, HSL 색상 코드를 실시간 변환",
      en: "Convert between HEX, RGB, and HSL color codes",
    },
    icon: "🎨",
    href: "/tools/color-converter",
    color: "from-indigo-500 to-violet-500",
    category: "converter",
  },
  {
    id: "base64",
    name: { ko: "Base64 인코더/디코더", en: "Base64 Encoder/Decoder" },
    description: {
      ko: "텍스트를 Base64로 인코딩하거나 디코딩하세요",
      en: "Encode or decode text with Base64",
    },
    icon: "🔤",
    href: "/tools/base64",
    color: "from-teal-500 to-cyan-500",
    category: "converter",
  },
  {
    id: "url-encoder",
    name: { ko: "URL 인코더/디코더", en: "URL Encoder/Decoder" },
    description: {
      ko: "URL을 인코딩하거나 디코딩하세요",
      en: "Encode or decode URLs",
    },
    icon: "🔗",
    href: "/tools/url-encoder",
    color: "from-sky-500 to-blue-500",
    category: "converter",
  },
  {
    id: "timestamp-converter",
    name: { ko: "타임스탬프 변환기", en: "Timestamp Converter" },
    description: {
      ko: "Unix 타임스탬프와 날짜를 변환하세요",
      en: "Convert between Unix timestamps and dates",
    },
    icon: "🕐",
    href: "/tools/timestamp-converter",
    color: "from-lime-500 to-green-500",
    category: "converter",
  },
  {
    id: "number-base-converter",
    name: { ko: "진법 변환기", en: "Number Base Converter" },
    description: {
      ko: "2진수, 8진수, 10진수, 16진수를 변환하세요",
      en: "Convert between binary, octal, decimal, hex",
    },
    icon: "🔢",
    href: "/tools/number-base-converter",
    color: "from-slate-500 to-gray-500",
    category: "converter",
  },

  // === 이미지 & 미디어 ===
  {
    id: "image-compressor",
    name: { ko: "이미지 압축", en: "Image Compressor" },
    description: {
      ko: "이미지를 압축하고 포맷을 변환하세요",
      en: "Compress images and convert formats",
    },
    icon: "🖼️",
    href: "/tools/image-compressor",
    color: "from-green-500 to-emerald-500",
    category: "media",
  },
  {
    id: "qr-generator",
    name: { ko: "QR코드 생성기", en: "QR Code Generator" },
    description: {
      ko: "URL, 텍스트로 QR코드를 만들어보세요",
      en: "Generate QR codes from URLs and text",
    },
    icon: "📱",
    href: "/tools/qr-generator",
    color: "from-purple-500 to-pink-500",
    category: "media",
  },

  // === 개발자 도구 ===
  {
    id: "json-formatter",
    name: { ko: "JSON 포맷터", en: "JSON Formatter" },
    description: {
      ko: "JSON을 예쁘게 정렬하고 검증하세요",
      en: "Format, validate, and beautify JSON",
    },
    icon: "{ }",
    href: "/tools/json-formatter",
    color: "from-orange-500 to-yellow-500",
    category: "developer",
  },
  {
    id: "password-generator",
    name: { ko: "비밀번호 생성기", en: "Password Generator" },
    description: {
      ko: "안전한 비밀번호를 생성하세요",
      en: "Generate strong, secure passwords",
    },
    icon: "🔒",
    href: "/tools/password-generator",
    color: "from-red-500 to-rose-500",
    category: "developer",
  },
  {
    id: "hash-generator",
    name: { ko: "해시 생성기", en: "Hash Generator" },
    description: {
      ko: "SHA-1, SHA-256, SHA-512 해시를 생성하세요",
      en: "Generate SHA-1, SHA-256, SHA-512 hashes",
    },
    icon: "#️⃣",
    href: "/tools/hash-generator",
    color: "from-fuchsia-500 to-pink-500",
    category: "developer",
  },
  {
    id: "regex-tester",
    name: { ko: "정규식 테스터", en: "Regex Tester" },
    description: {
      ko: "정규표현식을 테스트하고 매치 결과를 확인하세요",
      en: "Test regular expressions and see matches",
    },
    icon: "🔍",
    href: "/tools/regex-tester",
    color: "from-rose-500 to-red-500",
    category: "developer",
  },
  {
    id: "css-minifier",
    name: { ko: "CSS/JS 압축기", en: "CSS/JS Minifier" },
    description: {
      ko: "CSS, JavaScript 코드를 압축하세요",
      en: "Minify CSS and JavaScript code",
    },
    icon: "⚡",
    href: "/tools/css-minifier",
    color: "from-yellow-500 to-amber-500",
    category: "developer",
  },
  {
    id: "uuid-generator",
    name: { ko: "UUID 생성기", en: "UUID Generator" },
    description: {
      ko: "고유한 UUID를 생성하세요",
      en: "Generate unique UUIDs instantly",
    },
    icon: "🆔",
    href: "/tools/uuid-generator",
    color: "from-cyan-500 to-blue-500",
    category: "developer",
  },
];
