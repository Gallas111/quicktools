import type { ToolGuideData } from "@/components/ToolGuide";

export const toolGuides: Record<string, ToolGuideData> = {
  "character-counter": {
    intro: {
      ko: "글자수 세기 도구는 단순해 보이지만 자기소개서·SNS·블로그 운영처럼 분량 제한이 있는 곳에서는 매번 손이 가요. 자주 만나는 케이스와 실수 패턴을 정리했습니다.",
      en: "Character counters look simple but become essential whenever a strict limit applies — essays, social media, blog SEO. Here are the patterns and pitfalls.",
    },
    sections: [
      {
        heading: { ko: "글자수와 단어수, 어떻게 다른가요?", en: "Characters vs. Words" },
        body: {
          ko: "한국어는 글자수(공백 포함/제외)가 기본이에요. 자기소개서·논문 분량 제한이 거의 글자수예요. 영문 글은 단어수(word count)로 잡거든요. 영문 1단어 ≈ 한국어 5자 정도예요. 영문 500 words 에세이를 한국어로 옮기면 대략 2,500자가 나와요.",
          en: "Korean writing uses character counts (with/without spaces). Essays, applications, and research papers in Korean usually have character limits. English writing uses word counts. Roughly 1 English word ≈ 5 Korean characters.",
        },
      },
      {
        heading: { ko: "분량 제한별 권장 작성 분량", en: "Recommended Lengths by Use Case" },
        body: {
          ko: "- 자기소개서 항목(800~1,000자): 95% 이상 채우세요\n- 트위터(X): 한국어 140자\n- 인스타 캡션: 첫 125자에 핵심 + 본문 800~1,200자\n- 블로그 SEO 글: 한글 1,500~3,000자\n- 자소서 한 줄 자기소개: 30자 이내\n- SMS: 80바이트(한글 27자)",
          en: "- Korean self-intro (800~1,000 chars): fill 95%+\n- X (Twitter): 280 chars EN / 140 KR\n- Instagram caption: first 125 chars hook, 800-1,200 total\n- Blog SEO: 1,000-2,000 words EN / 1,500-3,000 chars KR\n- SMS: 160 chars EN / 80 bytes KR",
        },
      },
      {
        heading: { ko: "바이트 수가 따로 있는 이유", en: "Why Bytes Matter" },
        body: {
          ko: "한글은 UTF-8 기준 1글자 3바이트, 영문은 1글자 1바이트예요. SMS 80바이트 제한이라면 한글 26~27자(공백 빼고)가 한도거든요. DB 컬럼 길이 제한, API 페이로드 크기, OG 메타태그 길이 같은 곳도 바이트 단위로 관리해요.",
          en: "Korean characters use 3 bytes each in UTF-8, English ones use 1. SMS, database VARCHAR limits, and OG meta tags all measure bytes — not characters. The counter shows both so you don't get bitten by silent truncation.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "공백을 글자수에 포함해야 하나요?", en: "Should spaces count?" },
        a: {
          ko: "기관마다 달라요. 한국 자소서는 공백 포함이 일반적이고, 학술지 일부는 공백 제외. 제출 전에 공지사항을 다시 한번 확인하세요.",
          en: "Depends on the institution. Korean essays usually include spaces; some academic journals exclude them. Always re-check submission guidelines.",
        },
      },
      {
        q: { ko: "이모지는 몇 글자로 잡히나요?", en: "How are emojis counted?" },
        a: {
          ko: "이모지는 글자수 1개로 잡혀요. 다만 바이트는 4바이트(UTF-8)이고, 트위터·SMS 같은 곳에서는 한 단어처럼 취급되니까 분량 빠듯할 때는 빼는 게 안전해요.",
          en: "Emojis count as 1 character but 4 bytes in UTF-8. On X/SMS they may count as 1-2 character units, so drop them if you're near the limit.",
        },
      },
      {
        q: { ko: "입력한 내용이 외부에 저장되나요?", en: "Is my text saved anywhere?" },
        a: {
          ko: "아니요. 모든 처리가 브라우저에서 끝나거든요. 새로고침하면 입력값도 사라져요. 비공개 자소서·계약서 초안도 안전하게 다루세요.",
          en: "No. All processing is local to your browser. Refreshing the page erases the text. Safe for confidential drafts.",
        },
      },
    ],
  },

  "hash-generator": {
    intro: {
      ko: "Hash 생성기는 파일 무결성 확인·비밀번호 해싱 학습·디지털 서명 검증 등에서 자주 쓰여요. MD5·SHA1·SHA256·SHA512를 한 번에 비교할 수 있어 디버깅에 편해요.",
      en: "Hash generators verify file integrity, demonstrate password hashing, and validate digital signatures. Compare MD5, SHA1, SHA256, and SHA512 side by side.",
    },
    sections: [
      {
        heading: { ko: "어떤 해시 알고리즘을 써야 하나요?", en: "Which Algorithm Should I Use?" },
        body: {
          ko: "- **MD5/SHA1**: 보안용 금지. 충돌 공격이 발견됐어요. 단순 무결성 체크(파일 손상 여부)에만 OK.\n- **SHA256**: 현재 표준. 비밀번호·디지털 서명·블록체인 모두 사용.\n- **SHA512**: SHA256보다 길지만 구형 시스템에서 약간 느림. 초고보안 요구일 때.\n- **bcrypt/argon2**: 비밀번호 저장 전용. 일반 SHA256으로 비밀번호 저장하면 안 돼요.",
          en: "- **MD5/SHA1**: Avoid for security — collision attacks exist. OK for casual integrity checks.\n- **SHA256**: Today's standard for signatures, passwords (when paired with KDFs), blockchains.\n- **SHA512**: Longer than SHA256, marginally slower. Use only when needed.\n- **bcrypt/argon2**: Use these for password storage, not raw SHA.",
        },
      },
      {
        heading: { ko: "파일 무결성 검증 절차", en: "How to Verify File Integrity" },
        body: {
          ko: "1. 다운로드한 파일의 SHA256 해시를 도구로 생성\n2. 배포처에서 공식적으로 알린 SHA256과 비교\n3. 한 글자라도 다르면 파일이 변조됐거나 손상된 거예요\n\n리눅스 ISO·우분투 설치 이미지·오픈소스 프로젝트 릴리즈에서 가장 자주 쓰여요. 운영체제 설치 직전에 한 번씩 검증하세요.",
          en: "1. Compute SHA256 of the downloaded file\n2. Compare with the publisher's official hash\n3. Even one character different means corruption or tampering\n\nMost common with Linux ISOs, Ubuntu installers, and open-source releases. Verify before installing OS images.",
        },
      },
      {
        heading: { ko: "해시 길이로 알고리즘 식별", en: "Identifying by Hash Length" },
        body: {
          ko: "결과만 보고 어떤 알고리즘인지 가늠할 때 자릿수를 보면 돼요.\n\n- 32자 hex: MD5\n- 40자 hex: SHA1\n- 64자 hex: SHA256\n- 128자 hex: SHA512\n\n주의: bcrypt 해시는 `$2b$`로 시작하고 60자 정도, argon2는 `$argon2id$`로 시작해요. 이건 별도 KDF 결과 형식이라 raw 해시랑 다르거든요.",
          en: "Tell algorithms apart by hash length:\n\n- 32 hex chars: MD5\n- 40 hex chars: SHA1\n- 64 hex chars: SHA256\n- 128 hex chars: SHA512\n\nNote: bcrypt outputs start with $2b$ (~60 chars), argon2 with $argon2id$. Those are KDF formats, not raw hashes.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "같은 입력은 항상 같은 해시가 나오나요?", en: "Does the same input always produce the same hash?" },
        a: {
          ko: "네. 결정적(deterministic)이에요. 한 글자라도 다르면 해시 전체가 완전히 달라져요. 이게 변조 탐지의 핵심이거든요.",
          en: "Yes — hashes are deterministic. Change one character and the entire hash changes completely. That's exactly how tamper detection works.",
        },
      },
      {
        q: { ko: "해시를 역으로 풀 수 있나요?", en: "Can I reverse a hash?" },
        a: {
          ko: "이론상 불가능해요. 일방향 함수거든요. 다만 약한 입력(예: 짧은 비밀번호 'password')은 레인보우 테이블로 역추적 가능해서, 비밀번호는 반드시 salt + KDF(bcrypt/argon2)를 거쳐야 해요.",
          en: "No — hashes are one-way. But weak inputs (e.g., 'password') are crackable via rainbow tables, so passwords must be salted and run through KDFs like bcrypt or argon2.",
        },
      },
      {
        q: { ko: "MD5는 정말 못 쓰나요?", en: "Is MD5 really unusable?" },
        a: {
          ko: "보안 목적은 금지. 충돌 공격이 실제 가능하거든요. 다만 비보안 무결성(예: 캐시 키, 단순 체크섬)에는 빠르고 간편해서 여전히 쓰여요.",
          en: "Forbidden for security — practical collision attacks exist. Still fine for non-security uses like cache keys or quick checksums.",
        },
      },
    ],
  },

  "url-encoder": {
    intro: {
      ko: "URL 인코더는 한국어·특수문자가 들어간 URL을 제대로 동작하게 만들어 줘요. API 호출, 검색 쿼리, 리다이렉트 처리에서 안 빼놓을 수 없는 도구거든요.",
      en: "URL encoders make Korean characters and special symbols work in URLs. Essential for API calls, search queries, and redirect chains.",
    },
    sections: [
      {
        heading: { ko: "URL 인코딩이 필요한 이유", en: "Why URL Encoding?" },
        body: {
          ko: "URL은 ASCII 문자만 안전해요. 한국어·이모지·공백·특수문자(`&`, `=`, `?`, `#`)가 그대로 들어가면 서버가 잘못 파싱해요.\n\n예시\n- `검색어=React` → `%EA%B2%80%EC%83%89%EC%96%B4%3DReact`\n- `hello world` → `hello%20world` (또는 `hello+world`)\n\n인코딩하면 서버·브라우저·중계 라우터 모두 같은 URL로 해석해요.",
          en: "URLs are safe only with ASCII. Non-ASCII characters, spaces, and reserved symbols (`&`, `=`, `?`, `#`) confuse parsers.\n\nExamples\n- `query=한글` → `query=%ED%95%9C%EA%B8%80`\n- `hello world` → `hello%20world` or `hello+world`\n\nEncoding ensures every layer (browser, server, proxy) interprets the URL identically.",
        },
      },
      {
        heading: { ko: "encodeURI vs encodeURIComponent", en: "encodeURI vs encodeURIComponent" },
        body: {
          ko: "JavaScript에는 두 가지 함수가 있어요.\n\n- **encodeURI**: 전체 URL용. `?`·`&`·`=`·`#`을 그대로 둬요.\n- **encodeURIComponent**: 쿼리값 한 조각용. 모든 특수문자 인코딩.\n\n쿼리 파라미터 값을 인코딩할 때는 반드시 encodeURIComponent를 써야 해요. encodeURI를 쓰면 `&`·`=`이 그대로 남아서 다음 파라미터와 충돌해요.",
          en: "JavaScript provides two functions:\n\n- **encodeURI**: For complete URLs — keeps `?`, `&`, `=`, `#` as-is.\n- **encodeURIComponent**: For single query values — escapes everything.\n\nAlways use encodeURIComponent for parameter values. encodeURI leaves `&` and `=` intact, breaking subsequent parameters.",
        },
      },
      {
        heading: { ko: "흔한 사고 패턴", en: "Common Mistakes" },
        body: {
          ko: "- **이중 인코딩**: 이미 인코딩된 URL을 또 인코딩하면 `%`가 `%25`로 바뀌어 깨져요\n- **공백 처리**: 쿼리에서는 `+` 또는 `%20` 둘 다 OK지만 path에서는 `%20`만 OK\n- **`#` 처리**: fragment 구분자라 인코딩 안 하면 그 뒤가 잘림\n- **한글 도메인**: punycode(`xn--...`)로 별도 변환 필요. URL 인코딩이랑 다른 표준이거든요",
          en: "- **Double encoding**: Encoding twice turns `%` into `%25`, breaking the URL\n- **Spaces**: `+` or `%20` both work in queries; only `%20` works in paths\n- **`#` handling**: It's the fragment separator — fail to encode, and everything after is dropped\n- **Korean domains**: Use punycode (`xn--...`), not URL encoding — different standard",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "이미 인코딩된 URL인지 어떻게 알아요?", en: "How do I tell if a URL is already encoded?" },
        a: {
          ko: "`%` 뒤에 16진수 두 자리가 붙어 있으면 거의 인코딩된 거예요. `%E`, `%2`, `%3` 같은 패턴이 보이면 디코더로 먼저 풀어 본 뒤 다시 인코딩하세요.",
          en: "If you see `%` followed by two hex digits (`%E`, `%2`, `%3`...), it's likely encoded. Decode first before re-encoding.",
        },
      },
      {
        q: { ko: "한글 검색어 인코딩 결과가 길게 나오는 이유는?", en: "Why does Korean text produce such long encoded strings?" },
        a: {
          ko: "한글 1글자가 UTF-8로 3바이트라서 인코딩하면 `%XX%XX%XX` 9자가 돼요. 영문 1글자는 인코딩 안 되거나 `%XX` 3자라서 짧게 보이는 거예요.",
          en: "One Korean character is 3 bytes in UTF-8, becoming `%XX%XX%XX` (9 characters) after encoding. English characters stay 1-3 chars.",
        },
      },
      {
        q: { ko: "공백을 +로 할까 %20으로 할까?", en: "Plus or %20 for spaces?" },
        a: {
          ko: "URL path에서는 `%20`만 안전해요. 쿼리스트링에서는 둘 다 OK지만 일관성을 위해 `%20`을 권장해요.",
          en: "Use `%20` for safety. In query strings, `+` also works, but `%20` is universally accepted.",
        },
      },
    ],
  },

  "base64": {
    intro: {
      ko: "Base64는 바이너리 데이터(이미지·파일)를 텍스트(ASCII)로 바꿔서 텍스트 기반 채널(JSON·XML·이메일)을 통해 전달할 때 쓰는 인코딩이에요.",
      en: "Base64 converts binary data (images, files) into ASCII text so it can travel over text-based channels like JSON, XML, or email.",
    },
    sections: [
      {
        heading: { ko: "Base64가 쓰이는 곳", en: "Where Base64 Is Used" },
        body: {
          ko: "- **이메일 첨부파일**: MIME 표준이 Base64 사용\n- **Data URL**: HTML/CSS에서 이미지를 인라인으로 (`data:image/png;base64,...`)\n- **JWT 토큰**: 헤더·페이로드 부분이 Base64URL 인코딩\n- **Basic Auth**: HTTP Basic 인증 헤더 (`Basic dXNlcjpwYXNz`)\n- **API 응답**: 작은 이미지·바이너리를 JSON에 끼워 넣을 때",
          en: "- **Email attachments**: MIME standard uses Base64\n- **Data URLs**: Inline images in HTML/CSS (`data:image/png;base64,...`)\n- **JWT tokens**: Header and payload are Base64URL-encoded\n- **Basic Auth**: HTTP Basic auth header (`Basic dXNlcjpwYXNz`)\n- **API responses**: Embedding small binaries in JSON",
        },
      },
      {
        heading: { ko: "Base64 vs Base64URL", en: "Base64 vs Base64URL" },
        body: {
          ko: "두 변형이 있어요.\n\n- **표준 Base64**: `A-Z a-z 0-9 + /` + 패딩 `=`\n- **Base64URL**: `+` → `-`, `/` → `_`, `=` 패딩 생략\n\nURL이나 파일명에 직접 넣을 때는 Base64URL이에요. JWT가 그래서 Base64URL을 써요. 표준 Base64에 `+/=`이 들어가면 URL에서 다시 인코딩되거나 깨질 수 있거든요.",
          en: "Two variants exist:\n\n- **Standard Base64**: `A-Z a-z 0-9 + /` plus `=` padding\n- **Base64URL**: `+` → `-`, `/` → `_`, no padding\n\nUse Base64URL when embedding in URLs or filenames. JWTs use Base64URL because `+/=` would otherwise need extra URL encoding.",
        },
      },
      {
        heading: { ko: "Base64는 암호화가 아니에요", en: "Base64 Is Not Encryption" },
        body: {
          ko: "이건 정말 중요해요. Base64는 누구나 바로 디코딩할 수 있어요. 비밀번호·API 키·민감 데이터를 Base64로 '숨기는' 코드가 가끔 보이는데, 보안 효과 0이에요. 진짜 보호하려면 AES 같은 대칭키 암호화나 RSA 같은 비대칭 암호화를 써야 해요.",
          en: "Critical: Base64 is encoding, not encryption. Anyone can decode it instantly. Don't 'hide' passwords or API keys in Base64 — it offers zero security. Use AES, RSA, or proper key management for actual protection.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "Base64 인코딩하면 데이터 크기가 어떻게 되나요?", en: "How much does Base64 inflate the data?" },
        a: {
          ko: "약 33% 커져요. 3바이트 원본이 4글자 Base64가 되거든요. 1MB 이미지를 Data URL로 넣으면 약 1.33MB가 돼요.",
          en: "About 33% larger. 3 bytes of input become 4 Base64 characters. A 1MB image becomes ~1.33MB as a Data URL.",
        },
      },
      {
        q: { ko: "Data URL과 외부 이미지, 어느 쪽이 좋아요?", en: "Data URL vs external image?" },
        a: {
          ko: "10KB 이하 작은 이미지는 Data URL이 HTTP 요청 1개를 줄여줘서 유리해요. 큰 이미지는 외부 파일이 캐시 가능하고 페이지 크기도 작아요.",
          en: "Small images (<10KB): Data URLs save an HTTP request. Larger images: external files cache better and keep HTML small.",
        },
      },
      {
        q: { ko: "끝에 = 표시는 뭐예요?", en: "What's the `=` at the end?" },
        a: {
          ko: "패딩이에요. Base64는 4글자 단위로 떨어져야 해서 부족하면 `=`로 채워요. `=` 1개나 2개가 붙어요. URL에서는 `=`도 인코딩 대상이라 Base64URL은 보통 패딩을 빼요.",
          en: "Padding. Base64 outputs in 4-char blocks, so 1-2 `=` are added when input doesn't divide evenly. Base64URL omits padding because `=` would need URL encoding.",
        },
      },
    ],
  },

  "number-base-converter": {
    intro: {
      ko: "10·2·8·16진수를 한 화면에서 동시에 비교할 수 있는 진법 변환기예요. 네트워크·임베디드·웹 색상까지 폭넓게 활용돼요.",
      en: "Convert between decimal, binary, octal, and hex side by side. Useful for networking, embedded systems, and web colors.",
    },
    sections: [
      {
        heading: { ko: "각 진법이 쓰이는 분야", en: "Where Each Base Is Used" },
        body: {
          ko: "- **2진수**: 컴퓨터 내부, 네트워크 서브넷 마스크, 비트 플래그\n- **8진수**: 리눅스 파일 권한 (`chmod 755`)\n- **10진수**: 일상 숫자\n- **16진수**: 웹 색상(`#FF5733`), 메모리 주소, MAC 주소, JWT 시크릿",
          en: "- **Binary**: Computer internals, subnet masks, bit flags\n- **Octal**: Linux file permissions (`chmod 755`)\n- **Decimal**: Everyday numbers\n- **Hex**: Web colors (`#FF5733`), memory addresses, MAC addresses, JWT secrets",
        },
      },
      {
        heading: { ko: "변환 방법 (수동)", en: "Manual Conversion" },
        body: {
          ko: "**10→2**: 2로 계속 나누고 나머지를 역순으로 읽기\n13 ÷ 2 = 6r1, 6÷2 = 3r0, 3÷2 = 1r1, 1÷2 = 0r1 → **1101**\n\n**2→16**: 4자리씩 끊기\n11010011 → 1101(D) 0011(3) → **D3**\n\n**16→10**: 자리값 × 16의 거듭제곱\nFF = F·16 + F = 15·16 + 15 = **255**",
          en: "**Decimal → Binary**: Divide by 2, read remainders in reverse\n13 ÷ 2 = 6r1, 6÷2 = 3r0, 3÷2 = 1r1, 1÷2 = 0r1 → **1101**\n\n**Binary → Hex**: Group in fours\n11010011 → 1101(D) 0011(3) → **D3**\n\n**Hex → Decimal**: Position × 16^n\nFF = F·16 + F = 15·16 + 15 = **255**",
        },
      },
      {
        heading: { ko: "실전 활용 예시", en: "Practical Examples" },
        body: {
          ko: "- IP 서브넷: 255.255.255.0의 2진수가 24비트 1로 시작 → /24 표기\n- chmod 755: 7=111(rwx), 5=101(r-x) → 소유자 모든 권한, 그룹·기타 읽기·실행\n- 웹 색상 #FFA500: FF=255 빨강 가득, A5=165 녹색 중간, 00=0 파랑 없음 → 주황\n- JWT의 randomBytes(32).toString('hex')는 64자 hex 문자열",
          en: "- IP subnet: 255.255.255.0 in binary starts with 24 ones → /24 notation\n- chmod 755: 7=111(rwx), 5=101(r-x) → owner full, group/others read+execute\n- Web color #FFA500: FF=255 red max, A5=165 green mid, 00=0 blue → orange\n- JWT secrets: randomBytes(32).toString('hex') yields 64 hex chars",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "큰 숫자도 처리되나요?", en: "Can it handle large numbers?" },
        a: {
          ko: "네. 64비트 정수 범위(약 9.2×10^18)까지 처리해요. 그 이상은 BigInt 모드가 필요해요.",
          en: "Yes — 64-bit integers (up to ~9.2×10^18). For larger values, use a BigInt-aware tool.",
        },
      },
      {
        q: { ko: "음수도 변환되나요?", en: "Negative numbers?" },
        a: {
          ko: "10진수 음수 입력은 처리해요. 2진수 음수 표현(2의 보수)은 자릿수에 따라 결과가 달라져서 별도 옵션으로 봐야 해요.",
          en: "Decimal negatives work directly. Binary negative representation (two's complement) depends on bit width and needs a separate option.",
        },
      },
      {
        q: { ko: "16진수 입력에 0x를 붙여야 하나요?", en: "Do I need to prefix hex with 0x?" },
        a: {
          ko: "도구가 자동으로 처리해요. `FF`·`0xFF`·`#FF` 모두 OK예요.",
          en: "The tool handles all formats — `FF`, `0xFF`, `#FF` all work.",
        },
      },
    ],
  },
};
