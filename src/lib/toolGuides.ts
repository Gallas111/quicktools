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

  "json-formatter": {
    intro: {
      ko: "JSON 포맷터는 API 응답 디버깅, 설정 파일 검증, 로그 분석처럼 매일 마주치는 JSON을 사람이 읽을 수 있게 만들어 줘요. 들여쓰기·압축·검증·트리뷰까지 한 화면에서 처리합니다.",
      en: "JSON formatters turn raw API responses, config files, and logs into readable structures. Beautify, minify, validate, and inspect — all in one place.",
    },
    sections: [
      {
        heading: { ko: "Beautify vs Minify", en: "Beautify vs. Minify" },
        body: {
          ko: "**Beautify(들여쓰기)**: 들여쓰기 2~4칸으로 펼쳐서 사람이 읽기 좋게 만들어요. 코드 리뷰·디버깅 표준이에요.\n\n**Minify(압축)**: 공백·줄바꿈 다 제거해서 파일 크기 30~50% 줄여요. 프로덕션 API 응답·설정 파일 배포에 써요. 파일 크기가 곧 네트워크 비용이거든요.\n\n둘 다 데이터는 똑같아요. 형식만 달라요.",
          en: "**Beautify**: Indent 2~4 spaces, line per key — standard for code review and debugging.\n\n**Minify**: Strip whitespace, shrink size 30~50% — for production payloads and deployed configs. Saves bandwidth and storage at scale.\n\nThe data is identical; only formatting differs.",
        },
      },
      {
        heading: { ko: "흔한 JSON 에러 4가지", en: "Common JSON Errors" },
        body: {
          ko: "1. **trailing comma**: `{\"a\": 1,}` ← 마지막 쉼표가 표준 JSON에서는 에러. JSON5는 허용하지만 fetch 응답 등 표준 환경에서는 금지.\n2. **single quote**: `{'a': 1}` ← JSON은 큰따옴표만 허용. 파이썬 dict 출력을 그대로 붙여넣으면 자주 만남.\n3. **주석**: `// comment` 도 표준 JSON에 없음. 설정 파일은 JSONC·YAML로.\n4. **숫자 앞 +**: `{\"a\": +1}` ← 양의 부호 명시 금지. `1`만 OK.",
          en: "1. **Trailing commas**: `{\"a\": 1,}` is invalid in standard JSON (JSON5 allows it).\n2. **Single quotes**: JSON requires double quotes — Python dicts pasted directly often fail.\n3. **Comments**: `//` and `/* */` not allowed in JSON. Use JSONC/YAML for configs.\n4. **Leading `+`**: `{\"a\": +1}` invalid — write `1`.",
        },
      },
      {
        heading: { ko: "큰 JSON 다룰 때 팁", en: "Working with Large JSON" },
        body: {
          ko: "10MB 이상 JSON은 브라우저 단순 포맷터에서 멈춰요. `jq`(CLI) 또는 스트리밍 파서(JSON Stream Parser) 추천. 또 nested depth가 100 단계 넘어가면 일부 라이브러리가 stack overflow 일으키니 평탄화(flatten) 검토.\n\nlog·analytics 데이터처럼 row 형태라면 NDJSON(줄당 1 JSON)으로 저장하세요. 파일 크기·파싱 속도 모두 유리해요.",
          en: "For files over 10MB, browser formatters often stall — try `jq` or a streaming parser. Nested depth over 100 levels can stack-overflow some libraries; flatten where possible.\n\nFor row-based data (logs, analytics), prefer NDJSON (one JSON per line) — better size and parse speed.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "JSON과 JavaScript 객체, 뭐가 다른가요?", en: "JSON vs JavaScript objects?" },
        a: {
          ko: "JSON은 데이터 형식, JS 객체는 런타임 값이에요. JSON은 큰따옴표·표준 자료형만 허용하고, 함수·undefined·circular reference 못 담아요.",
          en: "JSON is a data format; JS objects are runtime values. JSON allows only double-quoted strings and standard types — no functions, undefined, or circular refs.",
        },
      },
      {
        q: { ko: "한글 키나 값이 \\u로 깨져 보이는데요?", en: "Why are Korean characters shown as \\u escapes?" },
        a: {
          ko: "ASCII-safe 옵션이 켜진 거예요. `JSON.stringify`의 기본은 한글 그대로 출력이지만, 일부 라이브러리(JSON.NET 등)는 escape를 기본으로 해요. 인코딩 옵션을 unicode·utf-8로 바꾸세요.",
          en: "ASCII-safe escaping is on. Most parsers display Korean as-is by default, but some serializers escape to `\\uXXXX`. Switch to UTF-8 output mode.",
        },
      },
      {
        q: { ko: "API 응답이 깨졌어요. 어디부터 봐야 해요?", en: "Where to start when JSON is corrupt?" },
        a: {
          ko: "포맷터 에러 메시지의 라인·컬럼 번호 먼저. 90%는 trailing comma·따옴표 누락이에요. CRLF 줄바꿈 + 인코딩(BOM) 문제도 자주 나오니 hex 에디터로 첫 3바이트 확인하세요.",
          en: "Check the formatter's line/column error first — 90% are trailing commas or missing quotes. Also inspect for CRLF line endings or BOM bytes (`EF BB BF`) at the start.",
        },
      },
    ],
  },

  "qr-generator": {
    intro: {
      ko: "QR코드 생성기는 URL·텍스트·연락처를 카메라 한 번에 스캔되는 이미지로 만들어 줘요. 명함·포스터·메뉴판·설문지에 자주 들어가요.",
      en: "QR generators turn URLs, text, or contacts into scannable codes — perfect for business cards, posters, menus, and surveys.",
    },
    sections: [
      {
        heading: { ko: "QR코드 종류별 활용", en: "QR Code Types" },
        body: {
          ko: "- **URL QR**: 가장 흔함. 웹사이트·구글폼·인스타 프로필 연결\n- **WiFi QR**: SSID·비밀번호 자동 연결. 카페·매장 표준\n- **vCard QR**: 명함 정보 한 번에. 스캔만 하면 연락처 저장\n- **결제 QR**: 토스·네이버페이·카카오페이 결제 링크\n- **이벤트 QR**: 캘린더 이벤트(.ics) 자동 추가\n- **텍스트 QR**: 짧은 문구·할인 코드",
          en: "- **URL QR**: Most common — link to websites, Google Forms, Instagram\n- **WiFi QR**: Auto-connect SSID + password — café/retail standard\n- **vCard QR**: Save contact instantly\n- **Payment QR**: Toss, KakaoPay, Apple Pay\n- **Event QR**: Auto-add calendar events (.ics)\n- **Plain text QR**: Coupons, short messages",
        },
      },
      {
        heading: { ko: "오류 정정 레벨(L/M/Q/H)", en: "Error Correction Levels" },
        body: {
          ko: "QR코드는 일부 손상돼도 인식돼요.\n\n- **L(7%)**: 디지털 화면 전용. 인쇄 비추천\n- **M(15%)**: 일반 인쇄. 표준\n- **Q(25%)**: 야외 광고·로고 삽입\n- **H(30%)**: 야외 노출·먼지 많은 환경·로고 큰 삽입\n\n로고를 가운데 넣으면 그 부분이 손상으로 인식돼서 H 레벨이 안전해요.",
          en: "QR codes work even with partial damage:\n\n- **L (7%)**: Digital screens only — no print\n- **M (15%)**: Standard print quality\n- **Q (25%)**: Outdoor ads, small logo overlays\n- **H (30%)**: Outdoor, dirty environments, large logo overlays\n\nLogos in the center act as 'damage' — use H if you embed one.",
        },
      },
      {
        heading: { ko: "인쇄·디자인 가이드", en: "Print & Design Guide" },
        body: {
          ko: "- **최소 크기**: 명함 1.5cm, 일반 2cm, 포스터 5cm 이상\n- **여백**: QR 둘레 1셀 이상 (Quiet Zone). 없으면 인식률 급락\n- **색 대비**: 어두운 모듈 + 밝은 배경. 반전(흰 모듈+검은 배경)은 일부 스캐너 인식 못함\n- **테스트**: 인쇄 전 iOS·안드로이드 양쪽에서 스캔 테스트 필수\n- **단축 URL 병기**: 고연령층·구형 폰 대비 짧은 URL도 같이 표기",
          en: "- **Minimum size**: 1.5cm on cards, 2cm general, 5cm+ on posters\n- **Quiet zone**: 1+ module of margin around the QR — required\n- **Contrast**: Dark modules on light background; inverted colors fail on many scanners\n- **Test before print**: Always test on iOS and Android\n- **Print a short URL too**: Older devices and users still need a fallback link",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "QR코드는 만료되나요?", en: "Do QR codes expire?" },
        a: {
          ko: "정적 QR(직접 URL)은 만료 없어요. 동적 QR(중간 리다이렉트)은 서비스가 종료되면 죽어요. 평생 쓸 거면 정적 QR이 안전해요.",
          en: "Static QRs (direct URL) never expire. Dynamic QRs (with a redirector) die if the service shuts down. Use static for permanent codes.",
        },
      },
      {
        q: { ko: "PNG와 SVG 중 뭘 받아야 해요?", en: "PNG or SVG?" },
        a: {
          ko: "인쇄용은 SVG 필수예요. 어떤 크기로 키워도 깨끗하거든요. 디지털 화면·웹은 PNG로도 충분해요.",
          en: "For print, SVG — scales without quality loss. For screens, PNG is fine.",
        },
      },
      {
        q: { ko: "QR 안에 로고를 넣어도 되나요?", en: "Can I put a logo inside?" },
        a: {
          ko: "전체 면적의 20% 이내로 + 오류 정정 레벨 H. 그 이상은 인식 실패율 올라가요. 인쇄 전 반드시 테스트하세요.",
          en: "Yes — keep it under 20% of total area and use error correction H. Always test before print.",
        },
      },
    ],
  },

  "lorem-ipsum": {
    intro: {
      ko: "Lorem Ipsum은 디자인·UX 작업 중 '실제 콘텐츠 도착 전' 자리에 채워 넣는 표준 더미 텍스트예요. 1500년대 라틴어 단편에서 유래했고 지금도 출판·웹·앱 디자인의 사실상 표준이에요.",
      en: "Lorem Ipsum is the placeholder text used while real content is still in production — a publishing standard since the 1500s and still used across web, print, and app design.",
    },
    sections: [
      {
        heading: { ko: "왜 영문 더미 텍스트를 쓰나요?", en: "Why Use Latin Dummy Text?" },
        body: {
          ko: "한글이나 영문 의미 있는 문장으로 채우면 디자이너·클라이언트가 '내용'에 집중하기 시작해요. Lorem Ipsum은 의미가 없어서 시각 디자인·레이아웃·타이포그래피 자체에 시선이 가도록 만들어요. UX 리서치에서도 같은 이유로 쓰여요.",
          en: "Real text pulls focus to the content. Lorem Ipsum is meaningless on purpose, so reviewers can evaluate layout, typography, and visual hierarchy without getting distracted by what is being said.",
        },
      },
      {
        heading: { ko: "Lorem Ipsum 사용 시 주의", en: "When NOT to Use It" },
        body: {
          ko: "- **실제 글자수가 중요한 자리**: 헤드라인·CTA 버튼은 진짜 카피 길이로 검증해야 해요\n- **다국어 지원 화면**: 한국어 글자가 영문보다 짧아서 레이아웃 차이를 봐야 함. 한글 더미(가나다라마...)도 같이 쓰세요\n- **접근성 검토**: 스크린 리더 테스트는 의미 있는 텍스트로\n- **프로덕션 배포**: 더미가 그대로 라이브 나가면 회사 망신. 배포 전 grep으로 'Lorem' 검색 필수",
          en: "- **Headline/CTA copy**: Length matters — use real copy\n- **Multilingual layouts**: Korean is shorter than English; use Korean dummy too\n- **Accessibility tests**: Use real meaningful text for screen readers\n- **Production**: Don't ship Lorem to users — grep your codebase before deploying",
        },
      },
      {
        heading: { ko: "분량 단위", en: "Common Length Options" },
        body: {
          ko: "- **단어(words)**: 캡션·라벨용. 5~20단어\n- **문장(sentences)**: 카드·블럭 본문. 1~5문장\n- **문단(paragraphs)**: 블로그·기사. 1~10문단\n- **글자수(chars)**: 한글 자소서·SNS 분량 검증용. 200~3000자\n\n실제 콘텐츠가 들어올 분량과 비슷한 더미를 써야 레이아웃이 무너지지 않아요.",
          en: "- **Words**: Captions, labels — 5–20 words\n- **Sentences**: Cards, body blocks — 1–5 sentences\n- **Paragraphs**: Blog posts, articles — 1–10 paragraphs\n- **Characters**: Korean essays, SNS — 200–3000 chars\n\nMatch dummy length to expected real content so the layout holds up.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "Lorem Ipsum이 진짜 라틴어인가요?", en: "Is Lorem Ipsum real Latin?" },
        a: {
          ko: "원전은 키케로의 'De Finibus Bonorum et Malorum'(B.C.45)이지만 Lorem Ipsum은 거기서 단어를 짜집기·왜곡한 거라 정확한 라틴어 의미는 없어요.",
          en: "It's loosely derived from Cicero's 'De Finibus Bonorum et Malorum' (45 BC), but the Lorem Ipsum text itself is scrambled — no coherent Latin meaning.",
        },
      },
      {
        q: { ko: "한글 더미 텍스트도 있나요?", en: "Is there a Korean dummy text?" },
        a: {
          ko: "표준은 없지만 '가나다라마…' 또는 '나랏말싸미…' 훈민정음 발췌가 자주 쓰여요. 본 도구는 한글 모드도 제공해요.",
          en: "No single standard. Common picks are '가나다라마...' and Hunminjeongeum excerpts. This tool offers a Korean dummy mode too.",
        },
      },
      {
        q: { ko: "더미 텍스트가 SEO에 영향 주나요?", en: "Does dummy text affect SEO?" },
        a: {
          ko: "프로덕션에 그대로 나가면 thin content로 분류돼서 색인에서 빠질 수 있어요. 데모·스테이징·디자인 시안에서만 쓰세요.",
          en: "If shipped to production, search engines flag it as thin content. Keep it confined to demos, staging, and design mocks.",
        },
      },
    ],
  },

  "password-generator": {
    intro: {
      ko: "비밀번호 생성기는 대소문자·숫자·특수문자를 조합해 강력한 비밀번호를 만들어 줘요. 브라우저의 `crypto.getRandomValues`를 써서 예측 불가능해요.",
      en: "Password generators mix uppercase, lowercase, numbers, and symbols using `crypto.getRandomValues` for cryptographically unpredictable strings.",
    },
    sections: [
      {
        heading: { ko: "강한 비밀번호 기준 (2025 NIST)", en: "Strong Password Standards (2025 NIST)" },
        body: {
          ko: "- **길이 최소 12자, 권장 16자+**: 길이가 복잡도보다 중요해요\n- **대·소·숫·특수 혼합**: 모두 들어가면 brute force 비용 기하급수\n- **사전 단어 금지**: `password`·`12345`·`qwerty`는 0.1초 안에 풀려요\n- **개인정보 금지**: 이름·생일·전화번호는 social engineering 1순위\n- **사이트마다 다르게**: 한 사이트 유출이 모든 계정으로 번지지 않게",
          en: "- **At least 12 chars, ideally 16+**: Length beats complexity\n- **Mix all 4 categories**: Brute-force cost grows exponentially\n- **No dictionary words**: `password`/`12345`/`qwerty` crack in milliseconds\n- **No personal info**: Names, birthdays, phone numbers are social-engineering targets\n- **One per site**: Single breach shouldn't compromise everything",
        },
      },
      {
        heading: { ko: "패스프레이즈(passphrase) 대안", en: "Passphrase Alternative" },
        body: {
          ko: "기억해야 하는 비밀번호는 패스프레이즈가 더 안전해요. 무관한 단어 4~6개를 띄어쓰기로 잇는 방식이에요.\n\n예: `장미커피우산서울` 또는 `correct horse battery staple`\n\n복잡도 점수는 짧은 무작위 문자열보다 높고, 사람이 외우기 쉽거든요. xkcd 936 만화가 이 방식 인기를 끌었어요.",
          en: "For memorable passwords, passphrases beat random strings: 4–6 unrelated words separated by spaces.\n\nExample: `correct horse battery staple` (xkcd #936)\n\nHigher entropy than short random strings, much easier to recall.",
        },
      },
      {
        heading: { ko: "패스워드 매니저가 답이에요", en: "Use a Password Manager" },
        body: {
          ko: "사람이 16자 무작위 문자열을 100개 사이트마다 외울 수는 없어요. 패스워드 매니저(Bitwarden·1Password·Apple Keychain)를 써서 자동 생성·자동 입력하세요.\n\n매니저 마스터 비밀번호 + 2FA만 잘 지키면 나머지는 매니저가 대신 해 줘요. 무료 옵션(Bitwarden)도 충분해요.",
          en: "No one memorizes 100 unique 16-char passwords. Use a password manager (Bitwarden, 1Password, Apple Keychain) to generate and autofill.\n\nProtect the master password and enable 2FA — the manager handles the rest. Bitwarden's free tier is solid.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "비밀번호를 얼마나 자주 바꿔야 해요?", en: "How often should I rotate passwords?" },
        a: {
          ko: "최신 NIST 가이드는 정기 변경 권장 안 해요. 유출 정황이 있을 때만 바꾸는 게 맞아요. 강한 + 사이트별 + 2FA가 정기 변경보다 효과적이거든요.",
          en: "Modern NIST guidance no longer recommends scheduled rotation — change only on suspected breach. Strength + uniqueness + 2FA matters more.",
        },
      },
      {
        q: { ko: "특수문자를 못 받는 사이트는 어떻게 해요?", en: "What if a site rejects special characters?" },
        a: {
          ko: "도구 옵션에서 특수문자 끄고 길이를 더 늘리세요(20자+). 길이가 보안 핵심이에요.",
          en: "Disable symbols and bump the length to 20+ — length carries the security weight.",
        },
      },
      {
        q: { ko: "이 도구가 만드는 비밀번호는 안전한가요?", en: "Is this generator safe?" },
        a: {
          ko: "브라우저 `crypto.getRandomValues`(CSPRNG)로 만들어요. 외부 서버 안 거치고 메모리에서만 다뤄요. 새로고침하면 바로 사라져요.",
          en: "It uses `crypto.getRandomValues` (CSPRNG) in your browser — never sent to a server, gone on refresh.",
        },
      },
    ],
  },

  "case-converter": {
    intro: {
      ko: "대소문자 변환기는 텍스트를 UPPERCASE·lowercase·Title Case·camelCase·snake_case·kebab-case·CONSTANT_CASE 등으로 즉시 바꿔 줘요. 코드·문서·SQL 작업에서 자주 써요.",
      en: "Case converters transform text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE — useful for code, docs, and SQL.",
    },
    sections: [
      {
        heading: { ko: "언어·플랫폼별 컨벤션", en: "Conventions by Language" },
        body: {
          ko: "- **JavaScript / Java**: 변수·함수 camelCase, 클래스 PascalCase, 상수 CONSTANT_CASE\n- **Python**: 변수·함수 snake_case, 클래스 PascalCase, 상수 CONSTANT_CASE\n- **Ruby**: 변수 snake_case, 클래스 PascalCase, 상수 CONSTANT_CASE\n- **CSS / HTML**: kebab-case (class 이름·BEM)\n- **REST API URL**: kebab-case 권장 (`/user-profiles`)\n- **데이터베이스**: snake_case (`user_profiles`)",
          en: "- **JavaScript/Java**: camelCase variables, PascalCase classes, CONSTANT_CASE constants\n- **Python**: snake_case variables, PascalCase classes, CONSTANT_CASE constants\n- **Ruby**: snake_case, PascalCase, CONSTANT_CASE\n- **CSS/HTML**: kebab-case (BEM)\n- **REST URLs**: kebab-case (`/user-profiles`)\n- **Databases**: snake_case (`user_profiles`)",
        },
      },
      {
        heading: { ko: "Title Case 영문 규칙", en: "English Title Case Rules" },
        body: {
          ko: "- 첫 단어·마지막 단어는 항상 대문자\n- 명사·동사·형용사·부사: 대문자\n- 관사·전치사·접속사: 4글자 이하면 소문자 (a, an, the, of, in, on, and, but...)\n- 4글자 넘는 전치사·접속사: 대문자 (Through, Between)\n\n그래서 \"The Lord of the Rings\"이고 \"the lord of The rings\"가 아니에요. AP Style·Chicago Manual에 미세한 차이가 있어요.",
          en: "- First and last words: always capitalized\n- Nouns, verbs, adjectives, adverbs: capitalized\n- Articles, short prepositions/conjunctions (≤3 letters): lowercase\n- Long prepositions/conjunctions (4+ letters): capitalized (Through, Between)\n\nThus \"The Lord of the Rings\". Slight differences exist between AP and Chicago styles.",
        },
      },
      {
        heading: { ko: "변환 시 자주 만나는 함정", en: "Conversion Pitfalls" },
        body: {
          ko: "- **약어 처리**: `XMLParser` → snake_case로 갈 때 `x_m_l_parser`(잘못) vs `xml_parser`(맞음)\n- **숫자 분리**: `version2` → `version_2` 또는 `version2`? 라이브러리마다 다름\n- **유니코드 케이스**: 터키어 i ↔ İ는 영문 i ↔ I와 다름. ICU·Intl API 권장\n- **한글 상수**: 한글에는 대소문자 없으니 그대로 유지",
          en: "- **Acronyms**: `XMLParser` → `xml_parser` (right) vs `x_m_l_parser` (wrong)\n- **Numbers**: `version2` → `version_2` or `version2`? Varies by library\n- **Unicode case**: Turkish i↔İ differs from English; use ICU/Intl APIs\n- **Korean**: No case in Hangul — leave it as-is",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "PascalCase와 camelCase 차이는?", en: "PascalCase vs camelCase?" },
        a: {
          ko: "첫 글자만 달라요. PascalCase는 `UserProfile`(대문자 시작), camelCase는 `userProfile`(소문자 시작). 클래스에는 PascalCase, 변수·함수에는 camelCase가 일반적이에요.",
          en: "Only the first letter differs — `UserProfile` vs `userProfile`. PascalCase for classes, camelCase for variables/functions.",
        },
      },
      {
        q: { ko: "SCREAMING_SNAKE_CASE는 왜 써요?", en: "Why use SCREAMING_SNAKE_CASE?" },
        a: {
          ko: "전 언어 공통 '상수' 신호예요. 한눈에 '런타임에 안 바뀌는 값'이라고 알 수 있거든요. 환경변수·설정 키도 보통 이 형식이에요.",
          en: "It's a universal signal for constants — telling readers 'this never changes at runtime'. Also standard for environment variables.",
        },
      },
      {
        q: { ko: "URL에 camelCase 써도 되나요?", en: "Can I use camelCase in URLs?" },
        a: {
          ko: "기술적으로는 가능하지만 비추천. URL은 대소문자 구분이 모호한 환경(파일시스템·캐시)이 있어서 kebab-case가 안전해요. SEO에도 kebab이 표준.",
          en: "Technically possible but discouraged — case sensitivity is inconsistent across systems. kebab-case is safer and standard for SEO.",
        },
      },
    ],
  },

  "timestamp-converter": {
    intro: {
      ko: "Unix 타임스탬프(Epoch time)를 KST·UTC 날짜와 양방향 변환해요. API 디버깅·로그 분석·DB 점검·JWT 만료 확인에서 매일 한 번씩 만나요.",
      en: "Convert Unix timestamps (epoch time) to/from human-readable dates in any timezone. Essential for debugging APIs, logs, databases, and JWTs.",
    },
    sections: [
      {
        heading: { ko: "초·밀리초 자릿수 식별", en: "Identify Seconds vs Milliseconds" },
        body: {
          ko: "- **10자리(예: 1711843200)**: 초 단위 — Unix·Python `time()`·PHP·MySQL\n- **13자리(예: 1711843200000)**: 밀리초 — JavaScript `Date.now()`·Java\n- **16자리**: 마이크로초 (드뭄)\n\nJavaScript에서 백엔드 초 단위를 받으면 `* 1000`을 잊지 마세요. 가장 흔한 실수예요.",
          en: "- **10 digits (e.g., 1711843200)**: seconds — Unix, Python `time()`, PHP, MySQL\n- **13 digits**: milliseconds — JavaScript `Date.now()`, Java\n- **16 digits**: microseconds (rare)\n\nIn JavaScript, multiply backend seconds by 1000 — most common mistake.",
        },
      },
      {
        heading: { ko: "시간대 함정", en: "Timezone Pitfalls" },
        body: {
          ko: "타임스탬프 자체에는 시간대가 없어요. 항상 UTC 기준이에요. 한국(KST)은 UTC+9이라 같은 숫자가 한국에서는 9시간 앞서 보여요.\n\n사고 패턴:\n- DB에 KST로 저장 → 다른 지역 사용자에게 잘못된 시간\n- 서머타임 적용국(미국·유럽) → 4월·10월 경계에 1시간 어긋남\n- 화면 노출 직전에만 로컬 변환, 저장은 UTC로",
          en: "Timestamps themselves have no timezone — always UTC. KST (UTC+9) shows 9 hours ahead.\n\nPitfalls:\n- Storing in local time corrupts data for other regions\n- DST countries shift by 1 hour at boundaries\n- Best practice: store UTC, convert to local only for display",
        },
      },
      {
        heading: { ko: "Y2K38 문제", en: "The Y2K38 Problem" },
        body: {
          ko: "32비트 정수로 초 단위 timestamp를 저장하던 옛 시스템은 2038-01-19 03:14:07 UTC에 한계예요. 그 이후로는 음수로 돌아가요.\n\n현대 시스템은 64비트로 사실상 무한이지만, MySQL `TIMESTAMP` 타입(기본 32비트), 임베디드·IoT, 옛 C 코드는 대비 필요. 새 프로젝트는 `DATETIME` 또는 64비트 BIGINT로.",
          en: "Legacy 32-bit signed integer timestamps overflow on 2038-01-19 03:14:07 UTC. Modern systems use 64-bit (effectively infinite), but MySQL `TIMESTAMP` (32-bit default), embedded/IoT, and legacy C code still need migration. Use `DATETIME` or BIGINT for new projects.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "JWT의 iat·exp는 어떤 단위예요?", en: "JWT iat/exp units?" },
        a: {
          ko: "초 단위 Unix timestamp예요(RFC 7519). JavaScript에서 비교할 때 `Date.now() / 1000`로 맞춰야 해요.",
          en: "Seconds-based Unix timestamps per RFC 7519. In JavaScript, compare with `Date.now() / 1000`.",
        },
      },
      {
        q: { ko: "ISO 8601 문자열을 타임스탬프로 어떻게 바꿔요?", en: "ISO 8601 to timestamp?" },
        a: {
          ko: "JavaScript: `new Date('2024-03-31T00:00:00Z').getTime()` → 밀리초. `/1000`해서 초 단위로. 도구에 ISO 문자열 그대로 붙여넣어도 자동 변환돼요.",
          en: "JavaScript: `new Date('2024-03-31T00:00:00Z').getTime()` → ms. Divide by 1000 for seconds. The tool also auto-detects ISO strings.",
        },
      },
      {
        q: { ko: "`new Date(ts)`가 1970년으로 나와요?", en: "`new Date(ts)` returns 1970?" },
        a: {
          ko: "초 단위 timestamp를 그대로 넣은 거예요. JavaScript는 밀리초를 기대하니까 `* 1000`이 필요해요.",
          en: "You passed seconds — JS expects milliseconds. Multiply by 1000.",
        },
      },
    ],
  },

  "uuid-generator": {
    intro: {
      ko: "UUID 생성기는 중복 위험이 사실상 0인 128비트 식별자를 만들어 줘요. DB 기본키·API 추적 ID·세션 토큰·파일명 충돌 방지 등에 써요.",
      en: "UUIDs are 128-bit identifiers with practically zero collision risk — used as DB primary keys, API trace IDs, session tokens, and unique filenames.",
    },
    sections: [
      {
        heading: { ko: "UUID 버전별 차이", en: "UUID Versions" },
        body: {
          ko: "- **v1**: 시간 + MAC 주소 기반. 시간 순서 알 수 있지만 MAC 노출 위험\n- **v3 / v5**: 이름 기반 해시(MD5/SHA1). 같은 입력 = 같은 UUID\n- **v4**: 완전 난수. 가장 흔하게 쓰임. crypto.randomUUID()가 기본\n- **v7**: 시간 정렬 가능 + 난수. 2022 RFC 9562. DB 인덱스 성능 좋음\n\n특별한 이유 없으면 v4 또는 v7 추천. v1은 보안상 비추천.",
          en: "- **v1**: Time + MAC address — orderable but exposes MAC\n- **v3/v5**: Name-based (MD5/SHA1) — same input → same UUID\n- **v4**: Pure random — most common; `crypto.randomUUID()` defaults to v4\n- **v7**: Time-orderable + random — RFC 9562 (2022), better DB index performance\n\nUse v4 or v7 unless you have a specific reason. Avoid v1 for new code.",
        },
      },
      {
        heading: { ko: "UUID 충돌 확률", en: "Collision Probability" },
        body: {
          ko: "v4 UUID 충돌은 사실상 불가능이에요. 매초 10억 개씩 100년 만들어도 한 번 충돌 확률이 50%예요. 실제 시스템에서는 무시 가능.\n\n다만 약한 RNG·병렬 멀티프로세스에서 같은 시드 쓰면 충돌 가능성이 올라가요. 항상 `crypto.randomUUID()` 같은 CSPRNG 기반으로 만드세요. `Math.random()` 기반은 절대 금지.",
          en: "v4 collisions are practically impossible — generating 1 billion/sec for 100 years gives only 50% collision chance. Negligible in real systems.\n\nWeak RNG or shared seeds across parallel processes increase risk. Always use CSPRNG (`crypto.randomUUID()`); never `Math.random()`.",
        },
      },
      {
        heading: { ko: "UUID vs 자동증가 ID", en: "UUID vs Auto-Increment IDs" },
        body: {
          ko: "**UUID 장점**\n- 분산 환경에서 충돌 없음 (마이크로서비스·다중 DB)\n- 외부 노출돼도 다음 ID 추측 불가\n- 클라이언트가 미리 생성 가능 (offline-first)\n\n**자동증가 ID 장점**\n- 짧음 (8바이트 vs 16바이트)\n- 인덱스 성능 좋음 (정렬됨)\n- 사람이 읽기·말하기 쉬움\n\n결제·로그·외부 API에는 UUID, 내부 룩업이 잦은 큰 테이블에는 v7 UUID 또는 ULID 추천.",
          en: "**UUID pros**: Collision-free in distributed systems, hides record count, client-side generation\n\n**Auto-increment pros**: Smaller (8 vs 16 bytes), better index performance, human-readable\n\nUse UUIDs for payments, logs, external APIs; v7 or ULIDs for high-traffic internal tables.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "URL에 UUID 그대로 써도 되나요?", en: "UUID in URLs?" },
        a: {
          ko: "OK예요. URL-safe 문자(0-9, a-f, -)만 들어가요. 다만 36자라 길어서 슬러그·외부 노출에는 짧은 nanoid·short-uuid 추천.",
          en: "Yes — UUIDs use only URL-safe chars. But 36 chars is long; consider nanoid or short-uuid for slugs.",
        },
      },
      {
        q: { ko: "UUID v4와 v7 중 뭘 골라야 해요?", en: "v4 or v7?" },
        a: {
          ko: "DB 기본키처럼 자주 인덱스되는 곳은 v7 (시간 정렬). 외부 노출용 식별자는 v4 (예측 불가).",
          en: "Use v7 for DB primary keys (time-orderable indexes). Use v4 for externally exposed IDs (unpredictable).",
        },
      },
      {
        q: { ko: "한 번에 100개 UUID 만들 수 있나요?", en: "Generate 100 UUIDs at once?" },
        a: {
          ko: "도구의 batch 옵션을 쓰면 돼요. 모두 브라우저에서 CSPRNG로 만들어요. 충돌 걱정 없이 그대로 쓸 수 있어요.",
          en: "Use the batch option — all generated via CSPRNG in your browser. No collision concerns.",
        },
      },
    ],
  },

  "color-converter": {
    intro: {
      ko: "색상 코드 변환기는 HEX·RGB·HSL·CMYK를 양방향 변환해요. 웹 디자인·CSS·인쇄·브랜드 가이드 정리에 매번 손이 가요.",
      en: "Convert HEX, RGB, HSL, and CMYK in any direction — essential for web design, CSS, print, and brand systems.",
    },
    sections: [
      {
        heading: { ko: "각 모델이 쓰이는 곳", en: "Where Each Model Is Used" },
        body: {
          ko: "- **HEX (#FF5733)**: 웹·앱 표준. 가장 짧고 보편적\n- **RGB (255,87,51)**: 디지털 화면. 알파(투명도) 표현 가능 → RGBA\n- **HSL (12°,100%,60%)**: 디자이너 친화적. 색조·채도·명도 직관적\n- **CMYK (0,66,80,0)**: 인쇄 전용. RGB와 색역(gamut)이 달라서 변환 시 일부 색 사라짐\n- **HSV / HSB**: Photoshop·Figma 색 선택기 기본",
          en: "- **HEX (#FF5733)**: Web/app standard — shortest and universal\n- **RGB (255,87,51)**: Digital screens — supports alpha as RGBA\n- **HSL (12°,100%,60%)**: Designer-friendly — intuitive hue/saturation/lightness\n- **CMYK (0,66,80,0)**: Print only — different gamut from RGB; some colors lost in conversion\n- **HSV / HSB**: Default in Photoshop and Figma color pickers",
        },
      },
      {
        heading: { ko: "RGB ↔ CMYK 변환의 한계", en: "RGB ↔ CMYK Limitations" },
        body: {
          ko: "RGB(빛 합성)와 CMYK(잉크 흡수)는 표현 가능한 색 범위(gamut)가 달라요. 형광 색·진한 청록은 RGB에서만 표현 가능하고 인쇄하면 흐려져요.\n\n해결 방법:\n- **소프트 프루핑**: Photoshop View → Proof Setup → Working CMYK로 인쇄 모습 미리보기\n- **ICC 프로필 적용**: 프린터·잉크에 맞춘 변환 프로필 사용\n- **브랜드 컬러는 별도 spec**: HEX·CMYK·Pantone 따로 정의해 두기",
          en: "RGB (light) and CMYK (ink) cover different gamuts. Neon and deep cyan only render in RGB; they dull in print.\n\nMitigation:\n- **Soft proofing**: Photoshop's Proof Setup → Working CMYK previews print appearance\n- **ICC profiles**: Match printer and ink with the right profile\n- **Brand colors**: Define HEX, CMYK, and Pantone separately",
        },
      },
      {
        heading: { ko: "접근성 — 색 대비 비율", en: "Accessibility — Contrast Ratios" },
        body: {
          ko: "WCAG 가이드는 텍스트 가독성을 위한 최소 대비를 정의해요.\n\n- **AA 일반 텍스트**: 4.5:1 이상\n- **AA 큰 텍스트(18pt+ / 14pt+ 굵게)**: 3:1\n- **AAA 일반 텍스트**: 7:1\n\n흰 배경의 회색 텍스트(#999)는 대비 2.85:1로 AA 미달이에요. 본문은 #555 이하(#444 이하 권장).",
          en: "WCAG defines minimum contrast for readability:\n\n- **AA body text**: 4.5:1 minimum\n- **AA large text (18pt+, or 14pt+ bold)**: 3:1\n- **AAA body**: 7:1\n\nGrey text #999 on white is only 2.85:1 — below AA. Use #555 or darker for body text.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "HEX 3자리 #FFF는 #FFFFFF 같나요?", en: "Is #FFF the same as #FFFFFF?" },
        a: {
          ko: "네. CSS는 3자리 HEX를 6자리로 자동 확장해요(#F → #FF). 다만 #ABC = #AABBCC라서 임의 색은 표현 못 해요.",
          en: "Yes — CSS expands 3-digit HEX to 6 digits (each char doubles: #F → #FF). #ABC = #AABBCC; can't express arbitrary colors.",
        },
      },
      {
        q: { ko: "RGB와 sRGB 차이는?", en: "RGB vs sRGB?" },
        a: {
          ko: "RGB는 추상적 모델, sRGB는 구체 색공간(IEC 61966-2-1)이에요. 웹은 사실상 sRGB가 표준이고, 광고·영상은 P3·Rec.2020 같은 더 넓은 색공간을 써요.",
          en: "RGB is the abstract model; sRGB is a specific color space (IEC 61966-2-1). Web is effectively sRGB; broadcast/film uses wider spaces like P3 or Rec.2020.",
        },
      },
      {
        q: { ko: "투명도는 어떻게 표현해요?", en: "How to express transparency?" },
        a: {
          ko: "RGBA로 0~1 알파, 또는 8자리 HEX(#RRGGBBAA)로 표현. CSS는 둘 다 지원해요. `rgba(255,87,51,0.5)` ≡ `#FF573380`.",
          en: "Use RGBA (alpha 0–1) or 8-digit HEX (#RRGGBBAA). CSS accepts both: `rgba(255,87,51,0.5)` ≡ `#FF573380`.",
        },
      },
    ],
  },

  "instagram-line-break": {
    intro: {
      ko: "인스타그램이 캡션·바이오에서 빈 줄을 자동으로 지우는 정책 때문에 줄바꿈이 사라져요. 이 도구가 보이지 않는 특수문자(U+2800)를 빈 줄에 넣어서 줄바꿈을 그대로 유지시켜 줘요.",
      en: "Instagram strips consecutive blank lines from captions and bios. This tool inserts an invisible character (U+2800 Braille Pattern Blank) into empty lines so your line breaks survive.",
    },
    sections: [
      {
        heading: { ko: "줄바꿈이 사라지는 패턴", en: "Patterns That Lose Line Breaks" },
        body: {
          ko: "- 줄 끝에 공백이 자동 삽입된 경우 (모바일 키보드 자동완성)\n- 빈 줄을 두 줄 이상 연속으로 넣은 경우\n- 이모지 직후 엔터\n- 메모장에서 복사 시 줄바꿈 종류가 섞인 경우(LF/CRLF)\n\n결과적으로 단락 구분이 모두 사라지고 한 덩어리로 표시돼요. 가독성이 망가지면 인게이지먼트도 떨어져요.",
          en: "- Trailing spaces from auto-correct\n- Two or more blank lines in a row\n- Pressing enter immediately after an emoji\n- Mixed line endings from notes apps (LF/CRLF)\n\nCaptions collapse into a single block, killing readability and engagement.",
        },
      },
      {
        heading: { ko: "캡션 첫 125자가 핵심", en: "First 125 Characters Matter Most" },
        body: {
          ko: "인스타 캡션은 '더 보기' 누르기 전 125자만 보여요. 이 안에 후킹 문장 + 핵심 키워드를 배치하세요.\n\n구조 예시:\n- [1줄 후킹] (50자 이내)\n- [빈 줄]\n- [본문 단락 1: 문제 제시]\n- [빈 줄]\n- [본문 단락 2: 해결책]\n- [빈 줄]\n- [CTA + 해시태그]\n\n각 빈 줄에 보이지 않는 문자가 들어가서 구조가 그대로 살아요.",
          en: "Instagram shows the first 125 chars before 'More' — pack your hook and keyword there.\n\nIdeal structure:\n- [hook line, ≤50 chars]\n- [blank]\n- [problem paragraph]\n- [blank]\n- [solution paragraph]\n- [blank]\n- [CTA + hashtags]\n\nThe invisible char preserves blank lines.",
        },
      },
      {
        heading: { ko: "다른 플랫폼에서도 동작해요", en: "Works on Other Platforms Too" },
        body: {
          ko: "스레드(Threads), 페이스북, 링크드인도 빈 줄 자동 제거 정책이 비슷해요. 같은 변환 텍스트가 그대로 동작해요. 트위터(X)는 빈 줄 제거 안 하니까 변환 안 해도 OK.",
          en: "Threads, Facebook, and LinkedIn apply similar blank-line stripping — the converted text works on all of them. X (Twitter) keeps blank lines, so no conversion needed there.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "삽입된 문자가 검색되거나 노출되나요?", en: "Are the invisible characters visible or searchable?" },
        a: {
          ko: "U+2800은 점자 빈 칸 문자라 시각적으로 안 보여요. 검색·해시태그에는 영향 안 가요. 스크린리더 일부가 '빈칸'을 읽을 수 있긴 해요.",
          en: "U+2800 (Braille blank) is visually invisible and doesn't affect search or hashtags. Some screen readers may announce 'blank'.",
        },
      },
      {
        q: { ko: "스토리에서도 줄바꿈 도구가 필요한가요?", en: "Do Stories need this tool?" },
        a: {
          ko: "스토리 텍스트 편집기는 줄바꿈을 그대로 유지하니 필요 없어요. 캡션·바이오·댓글에서만 문제가 돼요.",
          en: "Story text editors preserve line breaks — tool not needed there. Issue is captions, bios, and comments.",
        },
      },
      {
        q: { ko: "변환된 텍스트 글자수가 더 길어지나요?", en: "Does converted text exceed character limits?" },
        a: {
          ko: "추가 문자만큼 +1자씩 늘어나요. 캡션 2,200자·바이오 150자 한도에서 빈 줄 수만큼 차감. 보통 5~10자 정도라 영향 적어요.",
          en: "Each added char counts as 1. With Instagram's 2,200-char caption limit, 5–10 added chars are negligible.",
        },
      },
    ],
  },

  "markdown-preview": {
    intro: {
      ko: "마크다운 미리보기는 작성 중인 글이 GitHub·Notion·블로그에서 어떻게 렌더링될지 실시간으로 보여 줘요. 헤더·코드블럭·체크박스·링크까지 다 지원해요.",
      en: "A live markdown preview shows how your text will render on GitHub, Notion, or blogs — headers, code blocks, checkboxes, links, and more.",
    },
    sections: [
      {
        heading: { ko: "마크다운 핵심 문법", en: "Core Markdown Syntax" },
        body: {
          ko: "- **헤더**: `#` 1~6개로 H1~H6\n- **굵게/기울임**: `**굵게**`, `*기울임*`\n- **링크**: `[텍스트](URL)`\n- **이미지**: `![alt](URL)`\n- **코드**: 인라인 `` `code` ``, 블록 ```` ```언어 ````\n- **리스트**: `-` 또는 `1.`\n- **체크박스(GFM)**: `- [ ]`, `- [x]`\n- **인용**: `> 문장`\n- **표**: `| 컬럼 | 컬럼 |`\n- **수평선**: `---`",
          en: "- **Headers**: `#` × 1–6\n- **Bold/italic**: `**bold**`, `*italic*`\n- **Links**: `[text](url)`\n- **Images**: `![alt](url)`\n- **Code**: inline `` `code` ``, block triple-backtick + language\n- **Lists**: `-` or `1.`\n- **Checkboxes (GFM)**: `- [ ]`, `- [x]`\n- **Quotes**: `> text`\n- **Tables**: `| col | col |`\n- **HR**: `---`",
        },
      },
      {
        heading: { ko: "표준 vs GFM(GitHub-Flavored)", en: "CommonMark vs GFM" },
        body: {
          ko: "마크다운 표준은 두 종이에요.\n\n- **CommonMark**: 헤더·리스트·코드 같은 핵심만\n- **GFM**: CommonMark + 표·체크박스·자동 링크·취소선·코드 syntax highlighting\n\nGitHub·GitLab·Notion·Obsidian·VSCode 다 GFM 지원. 옛 Jekyll·Docusaurus는 별도 플러그인 필요해요.",
          en: "Two standards:\n\n- **CommonMark**: Core syntax only\n- **GFM**: CommonMark + tables, checkboxes, autolinks, strikethrough, syntax highlighting\n\nGitHub, GitLab, Notion, Obsidian, VSCode support GFM. Older Jekyll/Docusaurus need plugins.",
        },
      },
      {
        heading: { ko: "자주 깨지는 패턴", en: "Common Rendering Failures" },
        body: {
          ko: "- **헤더 앞 빈 줄 누락**: 헤더 위에 빈 줄 없으면 인라인으로 합쳐짐\n- **리스트 들여쓰기**: 스페이스 2개 또는 4개 일관성, 탭은 깨지기 쉬움\n- **코드블럭 언어 누락**: 시작 ```뒤에 `js`/`python` 등 명시해야 highlighting\n- **`<` 부등호 escape**: 통계 `p<0.05` 같은 표현은 백틱(`` `p<0.05` ``) 또는 `&lt;`\n- **표 정렬 구분자**: `|---|---|` 줄 빠지면 표 인식 안 됨",
          en: "- **No blank line before header**: merges into previous paragraph\n- **List indentation**: stick to 2 or 4 spaces; tabs break\n- **Missing code block language**: required for syntax highlighting\n- **Unescaped `<`**: e.g., `p<0.05` needs backticks or `&lt;`\n- **Missing table separator**: `|---|---|` row required for tables to render",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "마크다운으로 작성한 글을 워드프레스에 올릴 수 있나요?", en: "Can I post markdown to WordPress?" },
        a: {
          ko: "WP는 기본은 HTML이지만 Jetpack·WP Markdown 플러그인 깔면 가능해요. 또는 도구의 HTML 출력 복사해서 붙여넣어도 OK.",
          en: "Default WP uses HTML, but Jetpack and WP Markdown plugins enable markdown. Alternatively, copy the HTML output from the previewer.",
        },
      },
      {
        q: { ko: "이미지를 본문 가운데에 정렬하려면?", en: "How to center an image?" },
        a: {
          ko: "표준 마크다운에는 정렬 문법이 없어요. HTML `<div align=\"center\">` 또는 CSS class를 쓰세요. GitHub README는 가운데 정렬 미지원.",
          en: "Standard markdown has no alignment syntax — use raw HTML `<div align=\"center\">` or CSS. GitHub READMEs don't support centered images.",
        },
      },
      {
        q: { ko: "내가 쓴 마크다운이 GitHub과 Notion에서 다르게 보여요", en: "Why does my markdown render differently across platforms?" },
        a: {
          ko: "각 플랫폼마다 GFM 확장 범위가 달라요. Notion은 표준에 가깝고, GitHub은 GFM 풀, Obsidian은 위키링크·embed 같은 자체 문법 추가. 호환성 위해 CommonMark 안에서 작성하세요.",
          en: "Each platform extends GFM differently. Notion is close to standard, GitHub uses full GFM, Obsidian adds wiki-links and embeds. Stick to CommonMark for portability.",
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
