export interface Tool {
  id: string;
  name: { ko: string; en: string };
  description: { ko: string; en: string };
  icon: string;
  href: string;
  color: string;
}

export const tools: Tool[] = [
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
  },
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
  },
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
  },
];
