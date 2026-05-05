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

  "diff-checker": {
    intro: {
      ko: "텍스트 비교(Diff)는 두 글의 차이를 줄 단위로 보여 줘요. 코드 리뷰·계약서 변경 추적·번역 검수에서 매번 손이 가는 도구거든요.",
      en: "Diff checkers compare two texts line by line. Essential for code review, contract revisions, and translation QA.",
    },
    sections: [
      {
        heading: { ko: "Line diff vs Word diff vs Char diff", en: "Line vs Word vs Char Diff" },
        body: {
          ko: "- **Line diff(줄 단위)**: 코드·로그처럼 줄 자체가 의미 단위인 경우. Git diff 표준\n- **Word diff(단어 단위)**: 문장 안의 작은 변경을 봐야 할 때. 번역·계약서 검수\n- **Char diff(글자 단위)**: 짧은 문자열에서 한 글자 차이까지 보여줌. 키·해시 비교\n\n비교 종류를 잘못 고르면 '거의 똑같은 줄'도 완전 다른 줄로 표시되거든요. 본문 검수에는 word diff가 답이에요.",
          en: "- **Line diff**: When lines are the unit of meaning (code, logs) — Git's default\n- **Word diff**: For prose changes — translation, contracts\n- **Char diff**: Tiny short strings — keys, hashes\n\nWrong granularity makes near-identical lines look totally different. Use word diff for prose review.",
        },
      },
      {
        heading: { ko: "diff 결과 해석", en: "Reading Diff Output" },
        body: {
          ko: "- **추가된 줄(녹색, +)**: 새 텍스트에만 있음\n- **삭제된 줄(빨강, -)**: 옛 텍스트에만 있음\n- **변경된 줄**: 한 줄 통째로 빨강+녹색 쌍\n- **컨텍스트(회색)**: 변경되지 않은 주변 줄. 보통 위·아래 3줄\n\nGit `diff --stat`은 파일별 +/- 합계만 보여 줘서 큰 변경 빠르게 훑을 때 좋아요.",
          en: "- **Green (+)**: Added in new text\n- **Red (−)**: Removed (only in old)\n- **Changed line**: Red + green pair\n- **Context (grey)**: Unchanged surrounding lines (typically 3 above/below)\n\n`git diff --stat` summarizes +/- counts per file — useful for big changes.",
        },
      },
      {
        heading: { ko: "공백·줄바꿈 함정", en: "Whitespace Pitfalls" },
        body: {
          ko: "- **CRLF vs LF**: 윈도(`\\r\\n`)와 리눅스(`\\n`) 줄바꿈 다름. 같은 내용도 모든 줄이 변경된 것처럼 보여요. `git config core.autocrlf` 또는 도구의 'ignore line ending' 옵션 켜기\n- **탭 vs 스페이스**: 코드에서 자주 발생. 들여쓰기 정책 통일\n- **trailing whitespace**: 줄 끝 공백 삭제만으로 diff 폭발. ESLint·Prettier로 자동 정리",
          en: "- **CRLF vs LF**: Windows vs Unix line endings — every line looks changed. Enable `git config core.autocrlf` or 'ignore line ending'\n- **Tabs vs spaces**: Common in code — agree on indentation policy\n- **Trailing whitespace**: Stripping it inflates diffs. Auto-fix with ESLint/Prettier",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "두 PDF 본문도 비교할 수 있나요?", en: "Can I compare two PDFs?" },
        a: {
          ko: "PDF에서 텍스트 추출 후 붙여넣으세요. 표·이미지가 많으면 결과가 어그러질 수 있어 PDF 전용 비교 도구를 추천해요.",
          en: "Extract text from each PDF first and paste. For tables/images, use dedicated PDF comparison tools.",
        },
      },
      {
        q: { ko: "JSON 두 개 비교에 줄 diff가 안 맞아요", en: "Line diff doesn't work well for JSON" },
        a: {
          ko: "JSON은 키 순서·들여쓰기에 따라 줄이 어긋나요. 비교 전에 양쪽 모두 같은 포맷으로 beautify·정렬한 뒤 비교하세요.",
          en: "JSON line diffs misalign due to key order or indentation. Beautify and sort keys on both sides before comparing.",
        },
      },
      {
        q: { ko: "결과를 공유하려면?", en: "How to share results?" },
        a: {
          ko: "도구의 'export' 또는 화면 캡처를 활용하세요. 민감한 코드라면 이미지보다 텍스트로만 공유하는 게 안전해요.",
          en: "Use the tool's export or take a screenshot. For sensitive code, prefer plain text over images.",
        },
      },
    ],
  },

  "text-counter": {
    intro: {
      ko: "텍스트 분석기는 글자수·단어수·문장수에 더해 읽기 시간·말하기 시간·단어 빈도까지 보여 줘요. 블로그·연설·번역 분량 산정에 자주 써요.",
      en: "Text analyzers go beyond char counts — reading time, speaking time, and word frequency too. Useful for blog posts, speeches, and translation estimates.",
    },
    sections: [
      {
        heading: { ko: "읽기 시간 vs 말하기 시간", en: "Reading vs Speaking Time" },
        body: {
          ko: "- **읽기 시간**: 한국어 분당 500자(또는 200단어), 영어 분당 200~250 words\n- **말하기 시간**: 분당 120~150 words(영문 기준). 발표·낭독은 분당 100단어가 안전선\n\n블로그 5분 분량이 발표로는 8~10분이에요. 영상 스크립트 만드시면 말하기 기준으로 잡으세요.",
          en: "- **Reading time**: 200–250 wpm (English), 500 chars/min (Korean)\n- **Speaking time**: 120–150 wpm; safer at 100 wpm for presentations\n\nA 5-min reading post is 8–10 min spoken. Use speaking time for video scripts.",
        },
      },
      {
        heading: { ko: "단어 빈도 분석 활용", en: "Word Frequency Analysis" },
        body: {
          ko: "본문에서 자주 쓴 단어를 찾아 글의 톤·키워드 밀도를 점검할 수 있어요.\n\n- **SEO**: 타겟 키워드가 본문 100자당 1~2회 나오는지\n- **반복 점검**: 같은 단어를 너무 자주 써서 글이 단조로워졌는지\n- **번역 견적**: 자주 등장하는 용어집(glossary) 만들기\n- **연설·강연**: 핵심 메시지가 충분히 강조됐는지",
          en: "Frequent-word analysis reveals tone and keyword density.\n\n- **SEO**: Target keyword appears 1–2× per 100 chars\n- **Repetition check**: Spot overused words\n- **Translation estimates**: Build glossaries for recurring terms\n- **Speech writing**: Verify key message emphasis",
        },
      },
      {
        heading: { ko: "용도별 권장 분량", en: "Recommended Lengths by Purpose" },
        body: {
          ko: "- **블로그 SEO 글**: 한글 1,500~3,000자\n- **자기소개서 항목**: 800~1,000자, 95% 이상 채우기\n- **연설(5분)**: 영문 750 words / 한글 2,000자\n- **유튜브 쇼츠(60초)**: 150 words 이내\n- **이메일**: 영문 50~125 words 답장률 가장 높음\n- **트위터·X 1편**: 영문 280 / 한글 140자",
          en: "- **SEO blog**: 1,000–2,000 EN words / 1,500–3,000 KR chars\n- **Self-intro essay (KR)**: 800–1,000 chars, 95%+ filled\n- **5-min speech**: ~750 EN words\n- **YouTube Short (60s)**: ≤150 words\n- **Email**: 50–125 words gets highest reply rate\n- **X (Twitter)**: 280 EN / 140 KR",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "한국어와 영어 단어 수가 같은 글이 글자수가 다른 이유는?", en: "Why differing chars vs same word count?" },
        a: {
          ko: "한국어 한 단어는 평균 2~3자, 영어 한 단어는 평균 5자거든요. 같은 정보량이라도 한국어가 짧아지는 경우가 많아요.",
          en: "Korean words average 2–3 chars, English ~5 chars. Same meaning, fewer characters in Korean.",
        },
      },
      {
        q: { ko: "유튜브 영상 분량 가늠은 어떻게 해요?", en: "How to estimate YouTube length?" },
        a: {
          ko: "스크립트의 말하기 시간 기준 영상 길이 잡으세요. 분당 130 words(영문) / 분당 350자(한글)로 계산하면 실측과 거의 맞아요.",
          en: "Use speaking time at ~130 wpm (EN) or 350 chars/min (KR). Closely matches actual video length.",
        },
      },
      {
        q: { ko: "분석 결과 어디에 저장되나요?", en: "Is analysis stored?" },
        a: {
          ko: "전부 브라우저 메모리에서만 처리해요. 새로고침하면 사라져요. 외부 전송 0건.",
          en: "Everything stays in browser memory and is gone on refresh. No external requests.",
        },
      },
    ],
  },

  "age-calculator": {
    intro: {
      ko: "나이 계산기는 만나이·연나이·한국나이·띠·별자리까지 한 번에 알려 줘요. 2023년 6월부터 한국이 만나이로 통일됐지만 일상 대화에서는 한국나이가 여전히 쓰여요.",
      en: "Age calculators show international age (만나이), Korean age (한국나이), zodiac sign, and Chinese zodiac at once. Korea officially adopted international age in June 2023, but Korean age is still common in daily conversation.",
    },
    sections: [
      {
        heading: { ko: "만나이 vs 연나이 vs 한국나이", en: "International vs Year vs Korean Age" },
        body: {
          ko: "- **만나이(국제 표준)**: 출생 시 0세, 생일마다 +1세. 2023-06-28부터 한국 법·행정 기준\n- **연나이**: 현재 연도 - 출생 연도. 병역·청소년보호법 등 일부 법률에서 사용\n- **한국나이**: 출생 시 1세, 매년 1월 1일 +1세. 일상 대화·관습\n\n예: 12월 31일생 신생아는 만 0세, 한국나이 1세. 다음 날 1월 1일에는 만 0세, 한국나이 2세가 돼요. 그래서 신생아가 하루 만에 두 살이 된 셈이에요.",
          en: "- **International age**: 0 at birth, +1 each birthday. Korean legal/admin standard since 2023-06-28\n- **Year age (연나이)**: Current year − birth year. Used in military and youth protection laws\n- **Korean age**: 1 at birth, +1 every January 1. Conversational/traditional\n\nExample: A baby born on Dec 31 is 0 internationally but 1 in Korean age, then 2 in Korean age the next day. Hence 'two years old in two days'.",
        },
      },
      {
        heading: { ko: "어디서 어떤 나이가 쓰이나요?", en: "Where Each Age Applies" },
        body: {
          ko: "- **공식 문서·계약·의료**: 만나이\n- **민증·여권**: 만나이\n- **주민등록증 발급**: 만 17세 (만나이)\n- **선거권**: 만 18세\n- **음주·흡연**: 만 19세\n- **병역 신체검사**: 연나이 19세\n- **청소년보호법**: 연나이 19세 미만\n- **일상 대화·소개**: 한국나이가 여전히 흔해요",
          en: "- **Legal docs, contracts, medical**: International age\n- **ID/passport**: International age\n- **Voting**: Age 18 (intl)\n- **Alcohol/tobacco**: Age 19 (intl)\n- **Military physical**: Year age 19\n- **Youth protection law**: Year age <19\n- **Casual conversation**: Korean age still common",
        },
      },
      {
        heading: { ko: "띠·별자리 자동 산출", en: "Zodiac Auto-Calculation" },
        body: {
          ko: "**띠(12지)**: 출생 연도 기준 (2024 갑진년 = 청룡띠)\n**별자리(서양)**: 출생 월·일 기준 (3.21~4.19 양자리 등)\n\n띠 기준이 입춘(2월 초)인지 1월 1일인지 논쟁이 있어요. 사주 명리학은 입춘 기준, 일반 풍속은 1월 1일 기준이 많아요. 도구는 1월 1일 기준으로 계산해요.",
          en: "**Chinese zodiac (animals)**: Birth year (2024 = Wood Dragon)\n**Western zodiac**: Birth month/day (Aries 3.21–4.19, etc.)\n\nFor Chinese zodiac there's debate over Lunar New Year vs Jan 1 boundaries. Saju astrology uses 立春 (early Feb); folk practice uses Jan 1. The tool uses Jan 1.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "만나이는 언제부터 적용됐나요?", en: "When did Korea switch to international age?" },
        a: {
          ko: "2023년 6월 28일부터 행정·법령상 만나이로 통일했어요. 이전에 한국나이로 쓰여 있던 문서는 자동으로 만나이로 해석돼요.",
          en: "Effective June 28, 2023. Existing documents using Korean age are now interpreted as international age.",
        },
      },
      {
        q: { ko: "병역·청소년보호법은 만나이를 따르나요?", en: "Do military and youth laws use international age?" },
        a: {
          ko: "아니요. 일부 법률은 명시적으로 '연나이'를 쓴다고 적혀 있어서 그대로 유지돼요. 행정·민사가 만나이지만 법률 일부는 예외예요.",
          en: "No — certain laws explicitly use year age and remain unchanged. Civil/administrative use international age, but specific laws keep year age.",
        },
      },
      {
        q: { ko: "음력 생일도 계산되나요?", en: "Lunar birthdays?" },
        a: {
          ko: "도구는 양력 입력만 받아요. 음력 생일은 변환 도구로 양력으로 바꾼 뒤 입력하세요.",
          en: "The tool accepts solar dates only. Convert lunar to solar first.",
        },
      },
    ],
  },

  "image-compressor": {
    intro: {
      ko: "이미지 압축기는 사진·스크린샷 용량을 50~90% 줄여서 웹 로딩 속도와 저장 공간을 한 번에 잡아 줘요. 모든 처리가 브라우저에서 끝나서 사진이 외부 서버로 안 빠져요.",
      en: "Image compressors shrink photos and screenshots by 50–90%, improving page speed and saving storage. Everything happens locally — your images never leave the browser.",
    },
    sections: [
      {
        heading: { ko: "JPG vs PNG vs WebP", en: "JPG vs PNG vs WebP" },
        body: {
          ko: "- **JPG**: 사진·풍경·복잡한 색감. 손실 압축이라 작지만 텍스트·라인은 흐려져요\n- **PNG**: 로고·아이콘·스크린샷. 무손실, 투명 배경 지원. 사진은 용량 큼\n- **WebP**: 두 장점 결합. JPG 대비 25~35% 더 작음. 2024년 모든 메이저 브라우저 지원\n- **AVIF**: WebP보다 또 30% 작음. 사파리 16+·크롬·파이어폭스 지원\n\n웹용은 WebP, 인쇄·아이콘은 PNG, 사진은 JPG가 무난해요.",
          en: "- **JPG**: Photos, complex colors — lossy, but blurs text/lines\n- **PNG**: Logos, icons, screenshots — lossless, supports transparency, large for photos\n- **WebP**: Combines both — 25–35% smaller than JPG, supported in all major browsers (2024)\n- **AVIF**: 30% smaller than WebP — Safari 16+, Chrome, Firefox\n\nUse WebP for web, PNG for print/icons, JPG for photos.",
        },
      },
      {
        heading: { ko: "품질 설정 가이드", en: "Quality Setting Guide" },
        body: {
          ko: "JPG·WebP의 품질(quality) 옵션은 0~100이에요.\n\n- **95~100**: 사실상 무손실. 인쇄·아카이브\n- **80~90**: 웹 표준. 눈에 안 띄는 손실 + 50%+ 용량 감소\n- **60~75**: 썸네일·소셜 미디어. 큰 손실 가능\n- **50 이하**: 비추천. 가시적 압축 흔적\n\n블로그 본문 이미지는 75~85가 무난해요. 너무 낮추면 SEO 측 이미지 품질 평가에서 불리해질 수 있어요.",
          en: "JPG/WebP quality 0–100:\n\n- **95–100**: Visually lossless — print, archive\n- **80–90**: Web standard — invisible loss, 50%+ size reduction\n- **60–75**: Thumbnails, social — visible loss possible\n- **<50**: Avoid — obvious artifacts\n\nFor blog body images, 75–85 is the sweet spot. Going too low can hurt SEO image-quality scores.",
        },
      },
      {
        heading: { ko: "압축 전 해상도 점검", en: "Resize Before Compressing" },
        body: {
          ko: "스마트폰 사진은 4000×3000(12MP) 정도예요. 블로그 본문에는 1200~1600px가 적정이거든요. 원본 해상도 그대로 압축하면 용량은 줄어도 모바일 로딩이 느려요.\n\n작업 순서:\n1. 가로 1600px 이하로 리사이즈\n2. WebP 또는 JPG 품질 80\n3. 결과 비교 후 업로드\n\n이렇게만 해도 원본 5MB → 200KB(96% 감소)가 흔해요.",
          en: "Phone photos are ~4000×3000 (12MP). Blogs need 1200–1600px. Compressing without resizing keeps mobile loads slow.\n\nWorkflow:\n1. Resize to ≤1600px wide\n2. WebP or JPG quality 80\n3. Compare and upload\n\nTypical result: 5MB original → 200KB (96% reduction).",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "원본 화질 손상 없이 압축할 수 있나요?", en: "Can I compress without quality loss?" },
        a: {
          ko: "PNG는 무손실 압축이 가능해요. JPG·WebP는 품질 95+로 설정해도 미세 손실은 있지만 눈으로는 구분 어려워요.",
          en: "PNG is lossless. JPG/WebP at quality 95+ has imperceptible loss.",
        },
      },
      {
        q: { ko: "투명 배경이 사라졌어요", en: "Transparency disappeared" },
        a: {
          ko: "JPG로 변환했기 때문이에요. JPG는 투명도 미지원이라 배경이 흰색·검은색으로 채워져요. 투명 유지하려면 PNG나 WebP를 쓰세요.",
          en: "You converted to JPG — JPG doesn't support transparency. Use PNG or WebP to preserve it.",
        },
      },
      {
        q: { ko: "EXIF 메타데이터가 보존되나요?", en: "Is EXIF preserved?" },
        a: {
          ko: "도구는 압축 시 EXIF를 제거해요. 위치 정보 같은 민감 데이터가 빠져서 SNS 업로드에 안전해요. 보존 옵션은 제공 안 해요.",
          en: "EXIF is stripped on compression — strips sensitive data like GPS, safer for sharing. No preserve option.",
        },
      },
    ],
  },

  "bmi-calculator": {
    intro: {
      ko: "BMI 계산기는 키·체중을 넣으면 한국 기준·WHO 기준 동시에 비만도를 알려 줘요. 정상 범위·권장 체중·복부비만(허리둘레)까지 함께 점검할 수 있어요.",
      en: "Enter your height and weight to get BMI under both Korean and WHO standards, plus healthy weight range and abdominal obesity check via waist circumference.",
    },
    sections: [
      {
        heading: { ko: "한국 기준이 더 엄격한 이유", en: "Why Korean Standards Are Stricter" },
        body: {
          ko: "WHO 기준은 BMI 25부터 과체중인데, 한국(대한비만학회)은 23부터 과체중이에요. 아시아인이 같은 BMI에서도 체지방률이 높고 당뇨·고혈압 같은 대사질환 위험이 크거든요.\n\n특히 인도·동남아인은 BMI 23부터 당뇨 위험이 가파르게 올라간다는 연구가 다수예요. 그래서 외국 자료에서 'BMI 24면 정상'이라고 봤다고 안심하면 안 돼요. 한국에서는 과체중이거든요.",
          en: "WHO classifies overweight at BMI ≥25; Korea (Korean Obesity Society) at ≥23. Asians have higher body fat % and metabolic risk at lower BMI.\n\nDiabetes risk rises steeply for Indians/Southeast Asians from BMI 23. Don't rely on WHO-only norms in Korea.",
        },
      },
      {
        heading: { ko: "BMI의 한계 — 보완 지표 함께 보기", en: "BMI Limitations — Companion Metrics" },
        body: {
          ko: "BMI는 근육량·체지방 분포를 못 봐요.\n\n- **운동선수**: 근육이 많으면 BMI 28이어도 건강\n- **노년층(65세+)**: BMI 23~27이 사망률 가장 낮음. 살짝 통통한 쪽이 안전\n- **사과형 vs 서양배형**: 같은 BMI여도 복부비만이 더 위험\n- **소아청소년**: 성장기라 별도 백분위 차트 필요\n\n같이 보면 좋은 지표\n- 허리둘레: 남성 90cm·여성 85cm 이상이면 복부비만\n- 체지방률: 남성 25%·여성 30% 이상\n- 허리-키 비율: 0.5 이상이면 위험",
          en: "BMI ignores muscle and fat distribution.\n\n- **Athletes**: BMI 28 with low body fat — still healthy\n- **Elderly (65+)**: BMI 23–27 has lowest mortality\n- **Apple vs pear shape**: Same BMI, abdominal fat is more dangerous\n- **Children**: Use percentile charts, not adult BMI\n\nCompanion metrics:\n- Waist: M ≥90cm, F ≥85cm = abdominal obesity\n- Body fat %: M ≥25%, F ≥30%\n- Waist-to-height: ≥0.5 raises risk",
        },
      },
      {
        heading: { ko: "BMI 구간별 권장 액션", en: "Action by BMI Range" },
        body: {
          ko: "- **저체중(<18.5)**: 단백질 비중 ↑, 면역력·골다공증 주의\n- **정상(18.5~22.9)**: 유지. 주 3회 유산소 + 주 2회 근력\n- **과체중(23~24.9)**: 식이·운동만으로 정상 복귀 가능. 한 달 1~2kg 감량\n- **1단계 비만(25~29.9)**: 6개월 5~10% 감량 목표(의학적 표준)\n- **2단계 비만(30~34.9)**: 의사 상담, GLP-1 약물 옵션 검토\n- **3단계 비만(35+)**: 비만 클리닉·외과적 시술 상담\n\n주 1kg 이상 급격한 감량은 요요·근손실 위험이 커요. 0.5~0.7kg/주가 안전선이에요.",
          en: "- **Underweight (<18.5)**: Boost protein; watch immunity and bone density\n- **Normal (18.5–22.9)**: Maintain — 3 cardio + 2 strength sessions/week\n- **Overweight (23–24.9)**: Diet + exercise; lose 1–2kg/month\n- **Obesity I (25–29.9)**: 5–10% weight loss in 6 months\n- **Obesity II (30–34.9)**: Consult doctor; consider GLP-1 medication\n- **Obesity III (35+)**: Bariatric clinic\n\n>1kg/week is rebound-prone. 0.5–0.7kg/week is safe.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "BMI가 정상인데 뱃살이 나와요", en: "Normal BMI but big belly?" },
        a: {
          ko: "BMI는 분포를 못 봐요. 허리둘레가 남성 90cm·여성 85cm 이상이면 복부비만이고, 대사증후군 위험이 높아요. 식단보다 운동(특히 유산소) 비중을 늘리세요.",
          en: "BMI ignores fat distribution. Waist ≥90cm (M)/≥85cm (F) = abdominal obesity, raising metabolic syndrome risk. Increase cardio over diet alone.",
        },
      },
      {
        q: { ko: "운동을 많이 해서 BMI가 25예요", en: "BMI 25 from heavy training?" },
        a: {
          ko: "근육질 체형은 BMI가 높게 나와요. 체지방률(남 25%↓·여 30%↓)과 허리둘레가 정상이면 건강해요.",
          en: "Muscle elevates BMI. If body fat (<25% M / <30% F) and waist are normal, you're healthy.",
        },
      },
      {
        q: { ko: "어린이 BMI도 같은 기준인가요?", en: "Same BMI for children?" },
        a: {
          ko: "아니요. 만 19세 미만은 성장 단계라 질병관리청 소아청소년 표준성장도표(2017)의 백분위로 봐야 해요.",
          en: "No — under 19, use Korea KDCA pediatric growth percentile charts (2017 update).",
        },
      },
    ],
  },

  "css-minifier": {
    intro: {
      ko: "CSS 미니파이어는 공백·주석·불필요한 세미콜론을 제거해서 파일 크기를 30~70% 줄여 줘요. 페이지 로딩 속도·CDN 비용 모두에 영향을 미치는 표준 빌드 단계예요.",
      en: "CSS minifiers strip whitespace, comments, and redundant semicolons — shrinking files 30–70%. Standard step in any production build, affecting page speed and CDN costs.",
    },
    sections: [
      {
        heading: { ko: "왜 minify하나요?", en: "Why Minify?" },
        body: {
          ko: "- **로딩 속도**: 다운로드·파싱 모두 빨라짐. 모바일 3G에서 체감 큼\n- **대역폭 비용**: CDN 사용량 감소. 트래픽 많은 사이트는 월 단위로 비용 차이 큼\n- **gzip과 별개로 효과**: 미니파이된 CSS는 gzip 후에도 추가 절감 5~15%\n- **Critical CSS**: 첫 화면용 인라인 CSS는 minify 필수\n\n프로덕션 배포 전 빌드 도구(webpack/vite/parcel)가 자동으로 minify하지만, 직접 작성한 인라인 스타일·커스텀 빌드 단계에서는 수동 minify가 필요할 때가 있어요.",
          en: "- **Load speed**: Faster downloads and parsing — crucial on mobile 3G\n- **Bandwidth**: Lower CDN usage scales monthly\n- **Beyond gzip**: Minified CSS still saves 5–15% post-gzip\n- **Critical CSS**: Inline styles for first paint must be minified\n\nProduction bundlers (webpack/vite/parcel) handle this, but hand-written or custom builds may need manual minification.",
        },
      },
      {
        heading: { ko: "minify 시 깨지는 패턴", en: "What Breaks During Minification" },
        body: {
          ko: "- **마지막 세미콜론**: `color: red;}` → `color:red}` 가능 (원치 않는 단축)\n- **CSS hack**: `_property: value` 같은 옛 IE 핵은 일부 minifier가 제거\n- **calc 안 공백**: `calc(100% - 10px)` 의 공백은 필수. 일부 도구가 잘못 제거\n- **vendor prefix 순서**: 모든 prefix가 표준 위에 와야 호환\n- **!important**: 자체적으로는 안전하지만 specificity 변화 주의\n\n결과를 라이브 환경에 올리기 전에 시각적 회귀 테스트(visual regression) 한 번 돌리는 게 안전해요.",
          en: "- **Final semicolons**: Removed by aggressive minifiers — usually safe\n- **CSS hacks**: `_property: value` (old IE) may be stripped\n- **calc() spaces**: `calc(100% - 10px)` requires spaces — some tools strip them incorrectly\n- **Vendor prefix order**: All prefixes must precede the standard for fallback\n- **!important**: Safe in itself but watch specificity\n\nRun visual regression tests before deploying minified CSS.",
        },
      },
      {
        heading: { ko: "minify 후 추가 최적화", en: "Beyond Minification" },
        body: {
          ko: "Minify 다음 단계 최적화도 검토해보세요.\n\n- **PurgeCSS**: 안 쓰는 CSS 셀렉터 제거 (Tailwind는 기본 적용)\n- **Critical CSS 추출**: 첫 화면용만 인라인, 나머지는 lazy load\n- **HTTP/2 push 또는 preload**: CSS 빠른 도착\n- **gzip/brotli**: 서버 측 압축. brotli가 gzip 대비 15~25% 추가 감소\n- **CSS 나누기**: 페이지별 별도 CSS 번들\n\nLighthouse 점수에서 'Eliminate render-blocking resources' 항목이 이 최적화의 측정 지표예요.",
          en: "Steps after minification:\n\n- **PurgeCSS**: Remove unused selectors (Tailwind does this by default)\n- **Critical CSS extraction**: Inline first-paint CSS, lazy-load rest\n- **HTTP/2 push or preload**: Speed delivery\n- **gzip/brotli**: Server compression — brotli is 15–25% better than gzip\n- **CSS splitting**: Per-route bundles\n\nLighthouse measures this under 'Eliminate render-blocking resources'.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "minify된 CSS를 디버깅하기 힘들어요", en: "Hard to debug minified CSS" },
        a: {
          ko: "Source map을 켜세요. 빌드 도구에서 `sourceMap: true` 옵션이면 dev 환경에서 원본 파일·줄번호로 디버깅 가능해요. 프로덕션에는 sourceMap 노출 안 하는 게 보안에 좋아요.",
          en: "Enable source maps. Set `sourceMap: true` in your bundler for dev. Don't expose source maps in production for security.",
        },
      },
      {
        q: { ko: "SCSS/SASS도 minify되나요?", en: "Can SCSS/SASS be minified?" },
        a: {
          ko: "SCSS/SASS는 먼저 일반 CSS로 컴파일한 뒤 minify해요. 빌드 파이프라인이 두 단계로 처리해요.",
          en: "Compile SCSS/SASS to CSS first, then minify. Two-step pipeline.",
        },
      },
      {
        q: { ko: "minify가 SEO에 영향 주나요?", en: "Does minification affect SEO?" },
        a: {
          ko: "긍정적이에요. 페이지 로딩 속도가 Core Web Vitals(LCP·FCP)에 직결되거든요. 단, robots.txt나 보안 헤더에는 영향 없어요.",
          en: "Positive — page speed feeds into Core Web Vitals (LCP, FCP). No effect on robots.txt or security headers.",
        },
      },
    ],
  },

  "regex-tester": {
    intro: {
      ko: "정규식 테스터는 패턴이 의도한 문자열에만 매칭되는지 실시간으로 확인해 줘요. 입력 검증·로그 파싱·검색 치환에서 매번 손이 가요.",
      en: "Regex testers verify your pattern matches intended strings in real-time. Daily essential for input validation, log parsing, and search/replace.",
    },
    sections: [
      {
        heading: { ko: "정규식 핵심 메타문자", en: "Core Regex Metacharacters" },
        body: {
          ko: "- `.` 임의 한 글자 (줄바꿈 제외)\n- `*` 0회 이상 반복 / `+` 1회 이상 / `?` 0~1회\n- `^` 줄 시작 / `$` 줄 끝\n- `\\d` 숫자 / `\\w` 단어문자 / `\\s` 공백\n- `[abc]` 문자 집합 / `[^abc]` 부정\n- `(...)` 캡처 그룹 / `(?:...)` 비캡처\n- `|` OR\n- `\\b` 단어 경계\n\n예시: `^010-\\d{4}-\\d{4}$` → 한국 핸드폰 번호\n`\\b\\w+@\\w+\\.\\w+\\b` → 간단한 이메일 매칭",
          en: "- `.` Any char (except newline)\n- `*` 0+ / `+` 1+ / `?` 0–1\n- `^` start / `$` end\n- `\\d` digit / `\\w` word / `\\s` whitespace\n- `[abc]` set / `[^abc]` negation\n- `(...)` capture / `(?:...)` non-capture\n- `|` OR\n- `\\b` word boundary\n\nExamples:\n`^\\d{3}-\\d{4}-\\d{4}$` → US phone\n`\\b\\w+@\\w+\\.\\w+\\b` → simple email",
        },
      },
      {
        heading: { ko: "플래그(g, i, m, s, u)", en: "Flags (g, i, m, s, u)" },
        body: {
          ko: "- `g` 전역 검색 (모든 매치)\n- `i` 대소문자 무시\n- `m` 멀티라인 (`^`/`$`이 각 줄에 적용)\n- `s` dotall (`.`이 줄바꿈도 포함)\n- `u` 유니코드 (이모지·한글 제대로 처리)\n\n한글 매칭에는 `u` 플래그가 안전해요. 안 켜면 일부 한글이 제대로 안 잡혀요.\n\n조합 예: `/\\bemail\\b/gi` → 단어 경계 + 전역 + 대소문자 무시",
          en: "- `g` global (all matches)\n- `i` case-insensitive\n- `m` multiline (`^`/`$` per line)\n- `s` dotall (`.` matches newlines)\n- `u` unicode (handles emoji/Korean correctly)\n\nUse `u` for non-ASCII text. Combine: `/\\bemail\\b/gi` → word boundary + global + case-insensitive.",
        },
      },
      {
        heading: { ko: "흔한 함정", en: "Common Pitfalls" },
        body: {
          ko: "- **탐욕(Greedy) vs 비탐욕(Lazy)**: `.*`는 가능한 한 길게 매치. `.*?`로 최단 매치. HTML 파싱·따옴표 안 추출에서 자주 실수\n- **이메일·URL 정규식 신뢰성**: 표준 100% 매치는 매우 길고 복잡. 실전에서는 라이브러리(`validator.js`) 추천\n- **백트래킹 폭발**: `(a+)+` 같은 중첩 반복은 입력에 따라 ReDoS 공격 가능. 테스트 필수\n- **이스케이프**: `.` `?` `*` `+` `(` `)` `[` `\\` 같은 메타는 `\\.` 처럼 escape\n- **한글 범위**: `[가-힣]`이 한글 음절 범위, `[ㄱ-ㅎㅏ-ㅣ]`은 자모 분리",
          en: "- **Greedy vs lazy**: `.*` matches longest possible; `.*?` matches shortest — common HTML/quote-extraction mistake\n- **Email/URL regex**: True spec regex is huge — use a library like validator.js\n- **Catastrophic backtracking**: Nested repeats `(a+)+` can DoS. Test with malicious inputs\n- **Escape**: `.`, `?`, `*`, `+`, `(`, `)`, `[`, `\\` need `\\.`\n- **Korean ranges**: `[가-힣]` for Hangul syllables, `[ㄱ-ㅎㅏ-ㅣ]` for jamo",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "JavaScript regex와 Python regex가 다른가요?", en: "Is JS regex same as Python regex?" },
        a: {
          ko: "기본 문법은 비슷하지만 미묘한 차이가 있어요. JS는 lookbehind를 ES2018부터 지원, Python은 더 풍부한 기능. PCRE(Perl 호환)가 가장 풍부.",
          en: "Similar core, subtle differences. JS got lookbehind in ES2018; Python supports more advanced features. PCRE (Perl) is most extensive.",
        },
      },
      {
        q: { ko: "정규식 성능을 어떻게 측정해요?", en: "How to measure regex performance?" },
        a: {
          ko: "여러 입력 길이에서 매칭 시간 측정. 100k자 이상에서 갑자기 느려지면 backtracking 의심. regex101이 step count로 알려줘요.",
          en: "Measure across input sizes. Sudden slowdown at 100k+ chars suggests backtracking. regex101 shows step counts.",
        },
      },
      {
        q: { ko: "이메일 정규식 어디서 가져와요?", en: "Where to get a good email regex?" },
        a: {
          ko: "RFC 5322 완전 매치는 너무 길어서 비실용. HTML5 spec의 단순 패턴 또는 라이브러리(`validator.js`) 사용 추천.",
          en: "Full RFC 5322 regex is impractical. Use HTML5's pragmatic regex or `validator.js`.",
        },
      },
    ],
  },

  "bmr-calculator": {
    intro: {
      ko: "BMR(기초대사량) 계산기는 가장 정확한 Mifflin-St Jeor 공식을 써서 하루에 가만히 있어도 소비되는 칼로리를 알려 줘요. 활동량(TDEE)까지 곱하면 다이어트·증량 칼로리 계산이 정확해져요.",
      en: "BMR calculators use the Mifflin-St Jeor equation — the most accurate modern formula — to estimate resting energy expenditure. Multiply by activity level for TDEE, the foundation of any diet plan.",
    },
    sections: [
      {
        heading: { ko: "BMR vs RMR vs TDEE", en: "BMR vs RMR vs TDEE" },
        body: {
          ko: "- **BMR(Basal Metabolic Rate)**: 완전 안정 상태(공복·잠 직후)에서 생명 유지에 필요한 에너지. 12~14h 공복 + 22℃ 환경 측정\n- **RMR(Resting Metabolic Rate)**: 일반 휴식 상태. BMR보다 5~10% 높음. 실측 가능\n- **TDEE(Total Daily Energy Expenditure)**: BMR × 활동계수. 실제 하루 소비 칼로리\n\n다이어트 계산은 TDEE 기준이에요. BMR만 보면 너무 적게 먹게 돼서 근손실·기초대사량 저하 위험이 커요.",
          en: "- **BMR**: Resting energy in fully fasted, post-sleep state (12–14h fast, 22°C)\n- **RMR**: Casual rest — 5–10% higher than BMR, easier to measure\n- **TDEE**: BMR × activity factor — total daily burn\n\nUse TDEE for diet planning, not BMR alone. BMR-only diets risk muscle loss and metabolic adaptation.",
        },
      },
      {
        heading: { ko: "활동량 계수 가이드", en: "Activity Factor Guide" },
        body: {
          ko: "- **1.2 (sedentary)**: 사무직 + 운동 거의 없음\n- **1.375 (light)**: 주 1~3회 가벼운 운동\n- **1.55 (moderate)**: 주 3~5회 운동\n- **1.725 (active)**: 주 6~7회 강도 높은 운동\n- **1.9 (extra)**: 매일 강도 높은 운동 + 육체 노동\n\n대부분 자기 활동량을 과대평가해요. 실제로 만보 미만 + 헬스 주 2회면 1.375가 맞아요. 이걸 1.55로 잡으면 매일 200kcal 이상 잘못 계산하고 다이어트가 안 빠지는 원인이 돼요.",
          en: "- **1.2 (sedentary)**: Desk job, no exercise\n- **1.375 (light)**: 1–3 light workouts/week\n- **1.55 (moderate)**: 3–5 workouts/week\n- **1.725 (active)**: 6–7 hard workouts/week\n- **1.9 (extra)**: Daily intense work + manual labor\n\nMost people overestimate. <10k steps + 2 gym sessions/week is 1.375, not 1.55. Overestimating mis-counts 200+ kcal/day, stalling diets.",
        },
      },
      {
        heading: { ko: "다이어트·증량 칼로리 계산", en: "Cutting/Bulking Calorie Math" },
        body: {
          ko: "**감량(cut)**\n- 목표: TDEE − 300~500 kcal\n- 결과: 주 0.3~0.5kg 감량 (안전선)\n- 단백질: 체중 1kg당 1.6~2.2g 유지\n- 너무 적자: 근손실·기초대사량 저하·요요\n\n**증량(bulk)**\n- 목표: TDEE + 200~400 kcal\n- 결과: 주 0.2~0.4kg 증량\n- 단백질: 체중 1kg당 1.6~2.0g\n- 너무 많이: 지방만 늘어남\n\n**유지(recomp)**\n- TDEE 그대로, 단백질·근력 운동 강도 높여 근육 + 지방 동시 변화\n- 가장 어렵지만 처음 헬스 시작 6개월·복귀자에게 효과적",
          en: "**Cut**\n- Target: TDEE − 300–500 kcal\n- Result: 0.3–0.5kg/week loss (safe)\n- Protein: 1.6–2.2g per kg\n- Going lower risks muscle loss and metabolic slowdown\n\n**Bulk**\n- Target: TDEE + 200–400 kcal\n- Result: 0.2–0.4kg/week gain\n- Protein: 1.6–2.0g per kg\n\n**Recomp**\n- TDEE maintenance with high protein + heavy lifting\n- Hardest but works for beginners and returning lifters",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "공식이 여러 개인데 어느 게 정확해요?", en: "Which BMR formula is most accurate?" },
        a: {
          ko: "현재 표준은 Mifflin-St Jeor(1990). 옛 Harris-Benedict(1919)보다 5~10% 더 정확해요. Katch-McArdle은 체지방률 알 때 가장 정확.",
          en: "Mifflin-St Jeor (1990) is today's standard, 5–10% more accurate than Harris-Benedict (1919). Katch-McArdle is best if you know body fat %.",
        },
      },
      {
        q: { ko: "근육 많으면 BMR 더 높아져요?", en: "Does muscle raise BMR?" },
        a: {
          ko: "네. 근육 1kg이 하루 13kcal 소비. 5kg 근육 더 붙으면 하루 65kcal. 큰 차이는 아니지만 장기적으로 누적 효과 있음.",
          en: "Yes — 1kg muscle burns ~13 kcal/day. 5kg more muscle = +65 kcal/day. Modest but accumulates.",
        },
      },
      {
        q: { ko: "다이어트 중 정체기가 와요", en: "Diet plateau?" },
        a: {
          ko: "체중 줄면 BMR도 줄어요. 2~3주마다 새 BMR로 TDEE 다시 계산하세요. 또는 1주 maintenance(diet break)으로 호르몬 정상화.",
          en: "BMR drops as weight drops. Recalculate every 2–3 weeks. Or take a 1-week diet break at maintenance to reset hormones.",
        },
      },
    ],
  },

  "unit-converter": {
    intro: {
      ko: "단위 변환기는 길이·무게·온도·면적·부피·속도까지 한 화면에서 양방향 변환해요. 한국 평·미국 마일·헨리 사이즈·요리 컵 단위까지 한꺼번에 처리해요.",
      en: "Unit converters handle length, weight, temperature, area, volume, and speed bidirectionally — including Korean pyeong, US miles, Henry sizes, and cooking cups.",
    },
    sections: [
      {
        heading: { ko: "한국에서 자주 쓰는 비표준 단위", en: "Korean Non-Standard Units" },
        body: {
          ko: "- **평**: 1평 = 3.3058m². 부동산 면적 표기. 25평 = 82.6㎡(공급) ≈ 59㎡(전용)\n- **돈**: 1돈 = 3.75g. 금·귀금속 무게\n- **근**: 1근 = 600g(육류). 한약재는 375g, 채소는 400g 등 변동\n- **마지기**: 1마지기 = 660~1,000m². 농지 면적 (지역마다 차이)\n- **자(척)**: 1자 = 30.3cm. 한복·전통 건축\n- **푼·치·자**: 한자 단위. 1치 = 3.03cm",
          en: "- **Pyeong (평)**: 1 pyeong = 3.3058 m². Real estate. 25 pyeong = 82.6 m² (supply) ≈ 59 m² (private)\n- **Don (돈)**: 1 don = 3.75 g. Gold/jewelry\n- **Geun (근)**: 1 geun = 600 g (meat). Varies for herbs/vegetables\n- **Majigi (마지기)**: 660–1,000 m² farmland (region-dependent)\n- **Ja/Cheok (자)**: 30.3 cm. Hanbok and traditional building\n- **Pun/Chi/Ja**: Hanja units. 1 chi = 3.03 cm",
        },
      },
      {
        heading: { ko: "미국·영국 단위 함정", en: "US vs UK Unit Pitfalls" },
        body: {
          ko: "- **갤런**: 미국 1 gal = 3.785L, 영국 1 gal = 4.546L (20% 차이!)\n- **온스**: 무게(28.35g) vs 액체(29.57ml) 다름\n- **파인트**: 미국 473ml, 영국 568ml\n- **쿼터**: 미국 946ml, 영국 1.137L\n- **마일**: 통일(1.609km). 해리(nautical mile)는 1.852km\n- **인치/피트**: 통일(2.54cm/30.48cm)\n\n레시피·여행에서 헷갈리기 쉬워요. 도구는 미국 기준이 기본이지만 영국 단위 옵션도 있어요.",
          en: "- **Gallons**: US = 3.785 L, UK = 4.546 L (20% diff!)\n- **Ounces**: Weight (28.35 g) vs liquid (29.57 ml)\n- **Pints**: US 473 ml, UK 568 ml\n- **Quarts**: US 946 ml, UK 1.137 L\n- **Miles**: Unified (1.609 km). Nautical mile = 1.852 km\n- **Inches/feet**: Unified (2.54 cm / 30.48 cm)\n\nDefault to US units; the tool toggles UK.",
        },
      },
      {
        heading: { ko: "온도 변환 공식 외우기", en: "Memorizing Temperature Conversions" },
        body: {
          ko: "**℃ ↔ ℉**: ℉ = ℃ × 9/5 + 32 / ℃ = (℉ − 32) × 5/9\n\n빠른 머릿셈\n- 0℃ = 32℉ (얼음)\n- 20℃ = 68℉ (실온)\n- 30℃ = 86℉ (한여름)\n- 100℃ = 212℉ (끓는점)\n- 37℃ = 98.6℉ (체온)\n\n**K(절대온도)**: K = ℃ + 273.15. 과학·우주\n**Re(랭킨)**: ℉의 절대온도 버전. 미국 공학 일부",
          en: "**°C ↔ °F**: °F = °C × 9/5 + 32 / °C = (°F − 32) × 5/9\n\nMental shortcuts:\n- 0°C = 32°F (ice)\n- 20°C = 68°F (room)\n- 30°C = 86°F (hot summer)\n- 100°C = 212°F (boiling)\n- 37°C = 98.6°F (body)\n\n**Kelvin**: K = °C + 273.15 — science\n**Rankine**: °F absolute — US engineering",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "공급 면적과 전용 면적이 뭐가 달라요?", en: "Supply vs private area in real estate?" },
        a: {
          ko: "전용 면적: 실제 거주 공간. 공급 면적: 전용 + 주거공용(복도·계단). 25평 아파트 = 공급 82.6㎡, 전용 약 59㎡.",
          en: "Private = actual living space. Supply = private + shared corridors/stairs. 25 pyeong apartment ≈ 82.6 m² supply, ~59 m² private.",
        },
      },
      {
        q: { ko: "한국 운전면허로 미국에서 시속 표시 헷갈려요", en: "Confusing mph for Korean drivers?" },
        a: {
          ko: "60mph = 100km/h, 70mph = 113km/h, 100mph = 161km/h. 1.609 곱하면 km/h로 바뀌어요.",
          en: "60 mph = 100 km/h, 70 mph = 113 km/h, 100 mph = 161 km/h. Multiply by 1.609.",
        },
      },
      {
        q: { ko: "1근 = 600g인가요 400g인가요?", en: "Is 1 geun 600g or 400g?" },
        a: {
          ko: "용도마다 달라요. 육류 600g, 한약재 375g, 야채 400g, 곡물 600g. 정육점·한약방·시장 표기를 확인하세요.",
          en: "Depends — meat 600g, herbs 375g, vegetables 400g, grains 600g. Check the source market.",
        },
      },
    ],
  },

  "gpa-calculator": {
    intro: {
      ko: "학점(GPA) 계산기는 한국 4.5·4.3 만점, 미국 4.0 만점을 모두 지원해요. 학기·전공별 GPA·졸업 GPA·환산 점수까지 한 화면에서 확인할 수 있어요.",
      en: "GPA calculators support Korean 4.5/4.3 scales and US 4.0 scale. Compute term, major, and cumulative GPAs, plus US conversion in one place.",
    },
    sections: [
      {
        heading: { ko: "한국 4.5 vs 4.3 vs 미국 4.0", en: "Korean 4.5/4.3 vs US 4.0" },
        body: {
          ko: "- **한국 4.5 만점**: 대부분 대학. A+ = 4.5, A = 4.0, B+ = 3.5...\n- **한국 4.3 만점**: 서울대 등 일부. A+ = 4.3, A = 4.0... A+만 다르고 나머지 같음\n- **미국 4.0 만점**: A = 4.0, A− = 3.7, B+ = 3.3...\n\n유학 지원 시 한국 GPA를 미국 4.0으로 환산해요. 단순 비례는 부정확. 대부분 대학원·인증기관(WES, ECE)이 자체 환산표 사용해요.",
          en: "- **Korean 4.5**: Most universities. A+ = 4.5, A = 4.0, B+ = 3.5...\n- **Korean 4.3**: Seoul National Univ. and some others. A+ = 4.3, rest same\n- **US 4.0**: A = 4.0, A− = 3.7, B+ = 3.3...\n\nSimple proportional conversion is inaccurate for grad school applications. WES/ECE use their own tables.",
        },
      },
      {
        heading: { ko: "GPA 계산 공식", en: "How GPA Is Calculated" },
        body: {
          ko: "**GPA = Σ(학점 × 평점) ÷ Σ(학점)**\n\n예시: 3학점 A+(4.5) + 2학점 B+(3.5)\n= (3 × 4.5 + 2 × 3.5) ÷ (3 + 2)\n= (13.5 + 7) ÷ 5\n= 4.10\n\n주의\n- F 학점도 평점 0으로 계산에 포함 → 큰 페널티\n- P/F(통과/낙제)는 보통 GPA 계산 제외\n- 재수강은 학교마다 정책 다름. 둘 다 계산 vs 최종만\n- 휴학 학기는 계산에서 빠짐",
          en: "**GPA = Σ(credits × grade points) ÷ Σ(credits)**\n\nExample: 3-credit A+ (4.5) + 2-credit B+ (3.5)\n= (3 × 4.5 + 2 × 3.5) ÷ (3 + 2) = 4.10\n\nNotes:\n- F counts as 0 — big penalty\n- P/F (pass/fail) usually excluded\n- Retakes vary: some count both, some only final\n- Leave-of-absence terms excluded",
        },
      },
      {
        heading: { ko: "장학금·취업·유학 GPA 기준", en: "GPA Cutoffs for Scholarships, Jobs, Grad School" },
        body: {
          ko: "- **국가장학금 1등급**: 평균 평점 80% 이상 (4.5 만점에서 약 3.6+)\n- **성적우수장학금**: 학과별 다르지만 보통 상위 5% (대략 4.0+)\n- **삼성·SK 등 대기업 서류**: 명시적 기준은 없으나 평균 3.5+ 통과율 유리\n- **외국계·금융권**: 3.7+가 안전선\n- **미국 대학원**: 환산 GPA 3.0+ 필수, 명문은 3.5+\n- **MBA**: 3.5+가 평균. GMAT·경력으로 보완 가능\n\n매 학기 후 GPA 추적하시고, 학기별 목표 GPA 잡고 가는 게 효과적이에요.",
          en: "- **Korean national scholarship grade 1**: ~80% percentile (~3.6+ on 4.5)\n- **Merit scholarships**: Top 5% (~4.0+)\n- **Major corps (Samsung, SK)**: No explicit cutoff but 3.5+ improves screening\n- **Finance/foreign firms**: 3.7+ safer\n- **US grad school**: ≥3.0 required, ≥3.5 for top schools\n- **MBA**: 3.5+ average; GMAT and experience can offset\n\nTrack term GPAs and set per-term goals.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "재수강 GPA 계산이 학교마다 달라요", en: "Retake GPA varies by school?" },
        a: {
          ko: "맞아요. 둘 다 계산(평균), 최종만 계산, 최고만 계산 등. 학교 학사 안내 또는 학사관리시스템에서 정책 확인.",
          en: "Yes — average both, final only, or best only. Check your school's academic regulations.",
        },
      },
      {
        q: { ko: "한국 GPA를 미국으로 어떻게 환산해요?", en: "Convert Korean to US GPA?" },
        a: {
          ko: "단순 비례(4.5 ÷ 4.5 × 4.0)는 부정확. WES·ECE 같은 기관이 자체 표 사용. 대학원 지원 시 학교 요구 환산표 따르세요.",
          en: "Proportional (×4.0/4.5) is inaccurate. Use WES/ECE official tables for grad school applications.",
        },
      },
      {
        q: { ko: "P/F 학점이 GPA에 영향 있나요?", en: "Does P/F affect GPA?" },
        a: {
          ko: "보통 GPA 계산에서 제외돼요. 단, 졸업 학점에는 포함. 학교마다 다르니 안내 확인.",
          en: "Usually excluded from GPA but counted toward graduation credits. School-dependent.",
        },
      },
    ],
  },

  "percent-calculator": {
    intro: {
      ko: "퍼센트 계산기는 일상의 4가지 핵심 시나리오(부분%·비율%·할인%·증감%)를 한 화면에서 처리해 줘요. 쇼핑·시험·매출 분석에 매번 손이 가요.",
      en: "Percent calculators handle the four daily scenarios — % of, ratio %, discount %, and change % — all in one screen. Useful for shopping, exams, and business analytics.",
    },
    sections: [
      {
        heading: { ko: "4가지 계산 모드", en: "Four Calculation Modes" },
        body: {
          ko: "- **부분% (X의 P%는?)**: 50,000원의 30% = 15,000원\n- **비율% (X는 Y의 몇 %?)**: 240은 800의 30%\n- **할인% (할인 후 가격)**: 100,000원에서 20% 할인 = 80,000원\n- **증감% (변화율)**: 80→100은 +25% 증가, 100→80은 −20% 감소\n\n증감 계산은 기준점을 어디 잡느냐에 따라 결과가 달라요. 100→80은 −20%지만 80→100은 +25%거든요. 이걸 헷갈리는 게 가장 흔한 실수예요.",
          en: "- **% of (X% of Y)**: 30% of 50,000 = 15,000\n- **Ratio (X is Y% of Z)**: 240 is 30% of 800\n- **Discount price**: 100,000 with 20% off = 80,000\n- **Change %**: 80→100 is +25%, 100→80 is −20%\n\nChange % depends on which value you take as the base. 100→80 is −20% but 80→100 is +25% — most common confusion.",
        },
      },
      {
        heading: { ko: "할인 계산의 함정", en: "Discount Calculation Pitfalls" },
        body: {
          ko: "- **이중 할인**: 30% + 20% ≠ 50%. 첫 할인 후 남은 금액에서 두 번째 할인 적용 → 100,000 → 70,000 → 56,000원 (실제 44% 할인)\n- **할인 후 부가세**: 부가세 포함 가격에서 할인하면 부가세까지 줄어듦. 매출 신고 시 주의\n- **쿠폰 vs 캐시백**: 쿠폰은 결제 직전 차감, 캐시백은 사후 환급. 실질 할인율 다름\n- **무이자 할부**: 원금은 그대로, 이자만 면제. 할인이 아님",
          en: "- **Stacked discounts**: 30% + 20% ≠ 50%. Applied sequentially: 100,000 → 70,000 → 56,000 (actual 44% off)\n- **Tax-inclusive discounts**: Discounting a price including VAT also reduces VAT. Check accounting.\n- **Coupon vs cashback**: Coupon reduces at checkout; cashback returns later — effective discount differs\n- **Interest-free installments**: Principal unchanged, only interest waived — not a discount",
        },
      },
      {
        heading: { ko: "증감률 해석 — 함정 사례", en: "Change % Interpretation — Common Traps" },
        body: {
          ko: "- **회복 계산**: 50% 손실 후 50% 회복은 원금 75%만 회복. 원금 복구하려면 +100%가 필요\n- **'평균 수익률'**: 단순 평균이 아닌 기하평균(CAGR) 사용. 단순 평균은 변동성이 크면 부정확\n- **+200% vs ×3배**: 같은 의미. 100 → 300\n- **백분율 포인트(%p)**: 5% → 8%는 +3%p 또는 +60%. 둘 다 맞지만 쓰는 곳이 다름\n\n주식·환율·금리 뉴스 보면 'X% 상승'이 절대 변화인지 상대 변화인지 확인하는 습관이 중요해요.",
          en: "- **Recovery from loss**: 50% loss + 50% gain returns only 75% of original. You need +100% to fully recover\n- **'Average return'**: Use geometric mean (CAGR), not arithmetic mean — accuracy diverges with volatility\n- **+200% = ×3**: Same thing — 100 → 300\n- **Percentage points (%p)**: 5% → 8% is +3 %p or +60% — both correct, used differently\n\nWhen reading stock/forex/interest news, always verify whether 'X% up' is absolute or relative.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "팁 계산은 어떻게 해요?", en: "How to calculate tips?" },
        a: {
          ko: "미국 표준은 식사비의 18~20%. 부분%(X의 P%) 모드에서 식사비와 18~20% 입력하면 바로 나와요.",
          en: "US standard is 18–20% of meal cost. Use the '% of' mode with meal price and 18–20%.",
        },
      },
      {
        q: { ko: "부가세 빼고 받은 가격에 부가세는?", en: "Adding VAT to a tax-excluded price?" },
        a: {
          ko: "한국은 10%. 100,000원 × 1.1 = 110,000원. 부분% 모드로 10% 추가 후 더하기.",
          en: "Korea VAT is 10%. 100,000 × 1.1 = 110,000. Use % of for 10% then add.",
        },
      },
      {
        q: { ko: "두 회사 매출 증감률 비교가 안 맞아요", en: "Two-company revenue % comparison off?" },
        a: {
          ko: "기준점이 다르면 비교 무의미. 같은 시점·같은 기간으로 정규화한 뒤 비교하세요. CAGR(연복합성장률) 추천.",
          en: "Different bases make comparison meaningless. Normalize to same period and use CAGR for comparable growth rates.",
        },
      },
    ],
  },

  "dday-calculator": {
    intro: {
      ko: "D-day 계산기는 시험·기념일·프로젝트 마감을 자동으로 추적해 줘요. 매일 갱신되는 카운트다운이 동기부여 효과가 커서 학습·다이어트·런칭 준비에 효과적이에요.",
      en: "D-day calculators track exams, anniversaries, and project deadlines automatically. Daily countdowns drive motivation — proven for studying, diets, and product launches.",
    },
    sections: [
      {
        heading: { ko: "D-day 활용 7가지", en: "7 D-day Use Cases" },
        body: {
          ko: "1. **시험 카운트다운** — 수능·토익·자격증\n2. **자격증 단계 학습** — D-90 시작 / D-30 모의 / D-7 정리\n3. **취업 준비** — 공채 마감·면접일 역산\n4. **기념일** — 100일·1주년·생신\n5. **프로젝트 마감** — 시제품·마케팅·출시 단계별\n6. **개인 목표** — 다이어트·운동 챌린지\n7. **여행·이사·결혼식** — 항공권·청첩장·드레스 일정\n\n같은 마감이라도 단계별로 쪼개면 진척이 보여요. D-180 한 개보다 D-180/90/30/7 네 개가 효과적이에요.",
          en: "1. **Exam countdowns** — SAT, college entrance, certifications\n2. **Multi-stage cert prep** — D-90 start / D-30 mock / D-7 review\n3. **Job hunting** — application deadline reverse plan\n4. **Anniversaries** — relationships, birthdays, milestones\n5. **Project deadlines** — prototype, marketing, launch phases\n6. **Personal goals** — diets, fitness challenges\n7. **Travel, moving, weddings** — flights, invitations, dress fitting\n\nMulti-stage D-days (D-180/90/30/7) outperform single deadlines.",
        },
      },
      {
        heading: { ko: "D-day 효과 극대화 팁", en: "Maximizing D-day Effectiveness" },
        body: {
          ko: "- **눈에 보이는 곳에**: 책상·잠금화면·노트북 위젯\n- **현실적 거리**: D-7~D-90 구간이 가장 효과. D-180+는 긴급감 약함\n- **단계별 마일스톤**: 큰 D-day 1개를 작은 D-day 3~5개로\n- **매일 갱신**: 자동 위젯·알림 설정\n- **공유**: 친구·가족·팀과 공유하면 책임감 ↑\n- **실패 후 재설정**: 실패 분석 → 새 D-day. 실패한 D-day 무시 금지\n\n주의: D-day만 보고 진척 없는 게 가장 흔한 함정이에요. D-day는 알람이지 계획이 아니거든요.",
          en: "- **Place it visibly**: Desk, lock screen, laptop widget\n- **Realistic horizon**: D-7 to D-90 most effective; D-180+ feels distant\n- **Milestone breakdown**: One big D-day → 3–5 sub D-days\n- **Daily refresh**: Auto widgets/notifications\n- **Share with others**: Accountability boost\n- **Reset after failure**: Analyze, set new D-day, don't ignore failures\n\nWarning: Watching D-day without a plan is the #1 trap. D-day is the alarm, not the plan.",
        },
      },
      {
        heading: { ko: "기념일·과거 날짜 카운트", en: "Anniversaries and Past-Date Counting" },
        body: {
          ko: "도구는 미래 날짜는 D-N(남은 일수), 과거 날짜는 +N day(경과 일수)로 자동 표시해요.\n\n자주 쓰는 기념일\n- **연인**: 100일(약 3.3개월), 200일, 1주년(365일), 결혼기념일\n- **자녀**: 100일, 첫돌(365일), 입학식 카운트다운\n- **부모님**: 결혼기념일, 회갑(60세), 칠순(70세)\n- **추모일**: 매년 자동 갱신되는 +day\n\n음력 기념일은 해마다 양력 날짜가 다르니 음력 기준 별도 계산이 필요해요. 도구는 양력만 지원하므로 음력→양력 변환 후 입력하세요.",
          en: "The tool shows future dates as D-N (days remaining) and past dates as +N day (days elapsed).\n\nCommon anniversaries:\n- **Couples**: 100 days, 200 days, 1 year, wedding anniversary\n- **Children**: 100 days, 1st birthday, school enrollment\n- **Parents**: Wedding anniversary, 60th (Hwangap), 70th (Chilsun)\n- **Memorials**: Auto-refreshing +day each year\n\nLunar anniversaries shift solar dates each year — convert to solar first.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "D-day가 너무 멀면 효과 없나요?", en: "Distant D-days less effective?" },
        a: {
          ko: "맞아요. D-180+ 는 긴급감 약함. 큰 목표는 단계별 D-day(180→90→30→7)로 분할하세요.",
          en: "Yes — D-180+ feels distant. Break large goals into stages (180 → 90 → 30 → 7).",
        },
      },
      {
        q: { ko: "팀 공유는 어떻게?", en: "How to share with team?" },
        a: {
          ko: "구글 캘린더·노션·슬랙 위젯에 D-day 표기. 매주 1회 'D-X 진척률' 회의 정례화.",
          en: "Add D-days to Google Calendar, Notion, or Slack widgets. Schedule weekly 'D-X progress' check-ins.",
        },
      },
      {
        q: { ko: "음력 생일도 자동 갱신되나요?", en: "Auto-update for lunar birthdays?" },
        a: {
          ko: "이 도구는 양력만 지원해요. 음력 양력 변환 후 입력하면 다음 해는 다시 변환 필요해요.",
          en: "Solar dates only. Lunar dates need annual reconversion.",
        },
      },
    ],
  },

  "salary-calculator": {
    intro: {
      ko: "연봉 계산기는 세전 연봉을 입력하면 4대 보험·소득세·지방소득세를 차감한 실수령액을 알려 줘요. 부양가족 수·자녀 수까지 반영해서 정확도가 높아요.",
      en: "Salary calculators compute take-home pay after national insurance, income tax, and local tax — adjusted for dependents and children for accurate Korean payroll estimates.",
    },
    sections: [
      {
        heading: { ko: "4대 보험 요율 (2026 기준)", en: "Four Major Insurances (2026 rates)" },
        body: {
          ko: "근로자 부담분만 표시 (회사 부담 제외).\n\n- **국민연금**: 4.5% (월소득 590만원 상한)\n- **건강보험**: 3.545% (전체) + 장기요양 12.95% × 건보료\n- **고용보험**: 0.9%\n- **산재보험**: 0% (회사 100%)\n\n4대 보험만으로 약 8~9% 차감돼요. 여기에 소득세(누진)와 지방소득세(소득세의 10%)가 추가로 빠져요. 결과적으로 세전 5,000만원 → 실수령 약 4,200~4,300만원이 표준이에요.",
          en: "Employee portion only (excludes employer contribution).\n\n- **National Pension**: 4.5% (capped at ₩5.9M monthly)\n- **National Health Insurance**: 3.545% + Long-term care 12.95% of NHI premium\n- **Employment Insurance**: 0.9%\n- **Industrial Accident**: 0% (100% employer)\n\nTotal ~8–9% from 4 insurances, plus progressive income tax + local tax (10% of income tax). A pre-tax ₩50M typically nets ~₩42–43M.",
        },
      },
      {
        heading: { ko: "소득세 누진세율", en: "Progressive Income Tax" },
        body: {
          ko: "과세표준 구간별 세율 (2026)\n\n- 1,400만원 이하: 6%\n- 1,400~5,000만원: 15%\n- 5,000~8,800만원: 24%\n- 8,800만원~1억5천만원: 35%\n- 1억5천만원~3억원: 38%\n- 3억원~5억원: 40%\n- 5억원~10억원: 42%\n- 10억원 초과: 45%\n\n전체 소득에 최고 세율이 붙는 게 아니라 구간별로 누진 적용이에요. 연봉 6,000만원이면 24% 구간에 들지만 평균 실효세율은 약 15%거든요.",
          en: "2026 brackets (taxable income basis):\n\n- ≤14M won: 6%\n- 14–50M: 15%\n- 50–88M: 24%\n- 88–150M: 35%\n- 150–300M: 38%\n- 300–500M: 40%\n- 500M–1B: 42%\n- >1B: 45%\n\nProgressive — top bracket applies only to income within it. ₩60M earner falls in 24% bracket but effective rate is ~15%.",
        },
      },
      {
        heading: { ko: "공제 항목으로 실수령 늘리기", en: "Deductions That Boost Take-Home" },
        body: {
          ko: "연말정산에서 추가 공제 받으면 실질 세금이 줄어요.\n\n- **인적공제**: 본인 150만원 + 부양가족 1인당 150만원\n- **신용카드 등 사용액**: 총급여 25% 초과분의 15~30%\n- **의료비**: 총급여 3% 초과분 (5%p 추가 공제)\n- **교육비**: 본인·자녀 교육비 공제\n- **기부금**: 정치자금 10만원까지 100% 공제, 그 외 15~30%\n- **연금저축·IRP**: 연 700만원까지 13.2~16.5% 세액공제\n- **주택청약저축**: 연 240만원까지 40% 공제\n\n특히 IRP·연금저축은 가장 효율적이에요. 연 700만원 납입 시 약 92만원 환급이거든요.",
          en: "Year-end tax filing deductions reduce actual tax burden.\n\n- **Personal/dependent credit**: ₩1.5M each\n- **Card spending**: 15–30% of amount exceeding 25% of gross\n- **Medical**: Excess over 3% of gross (extra 5%pt deduction)\n- **Education**: Self and children's tuition\n- **Donations**: 100% for political donations up to ₩100k; 15–30% otherwise\n- **Pension savings/IRP**: 13.2–16.5% credit on up to ₩7M/year\n- **Housing savings**: 40% on up to ₩2.4M/year\n\nIRP/pension are highest ROI — ~₩920k refund on max ₩7M contribution.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "연봉이 1,000만원 늘어도 실수령은 600만원만 늘어요?", en: "Why does +10M raise only +6M take-home?" },
        a: {
          ko: "고소득 구간 진입 시 소득세 누진세율 + 4대 보험 → 약 35~40% 세금. 1,000만원 인상에서 약 350~400만원이 세금으로 빠지는 게 표준이에요.",
          en: "Higher brackets push income tax + 4 insurances to ~35–40% marginal. ₩10M raise sees ~₩3.5–4M in taxes — standard for higher earners.",
        },
      },
      {
        q: { ko: "프리랜서·외주 계약은?", en: "Freelancer/contract income?" },
        a: {
          ko: "이 계산기는 근로자 기준이에요. 프리랜서는 3.3% 원천징수 후 종합소득세 신고. 사업소득세는 별도 계산기 추천.",
          en: "This calculator is for salaried employees. Freelancers face 3.3% withholding then comprehensive income tax filing — use a separate tool.",
        },
      },
      {
        q: { ko: "퇴직금은 어떻게 계산해요?", en: "How is severance calculated?" },
        a: {
          ko: "법정 퇴직금 = 1일 평균임금 × 30 × (재직년수). 평균임금은 직전 3개월 임금 ÷ 90일. 회사 별도 규정 있으면 더 받을 수 있어요.",
          en: "Statutory severance = avg daily wage × 30 × years served. Avg daily wage = last 3 months ÷ 90 days. Some employers offer more by policy.",
        },
      },
    ],
  },

  "youtube-thumbnail": {
    intro: {
      ko: "유튜브 썸네일 도구는 영상 ID나 URL만 넣으면 1280×720 권장 해상도로 즉시 다운받을 수 있어요. 경쟁 영상 분석·자기 영상 백업·에셋 정리에 유용해요.",
      en: "Drop a YouTube URL or video ID to instantly download the 1280×720 thumbnail. Useful for competitor research, backups, and content asset management.",
    },
    sections: [
      {
        heading: { ko: "썸네일 해상도별 용도", en: "Thumbnail Resolutions" },
        body: {
          ko: "유튜브는 영상 1개당 여러 해상도의 썸네일을 자동 생성해요.\n\n- **maxresdefault.jpg (1280×720)**: 최고 화질. 풀 HD 업로드 영상만 존재\n- **sddefault.jpg (640×480)**: 표준 화질\n- **hqdefault.jpg (480×360)**: 고품질, 모든 영상 존재\n- **mqdefault.jpg (320×180)**: 중간 품질\n- **default.jpg (120×90)**: 작은 썸네일\n\n1280×720이 안 받아지면 영상 화질이 720p 미만이거나 옛날 영상이에요. hqdefault로 폴백하세요.",
          en: "YouTube auto-generates thumbnails in multiple resolutions per video.\n\n- **maxresdefault.jpg (1280×720)**: Highest — only for HD-uploaded videos\n- **sddefault.jpg (640×480)**: Standard\n- **hqdefault.jpg (480×360)**: High — exists for all videos\n- **mqdefault.jpg (320×180)**: Medium\n- **default.jpg (120×90)**: Tiny\n\nIf 1280×720 fails, the video is sub-720p or old. Fall back to hqdefault.",
        },
      },
      {
        heading: { ko: "썸네일이 클릭률을 좌우하는 이유", en: "Why Thumbnails Drive CTR" },
        body: {
          ko: "유튜브 알고리즘이 영상을 노출하면 첫 7초 안에 클릭 결정이 나요. 썸네일·제목 두 요소가 핵심이고, 썸네일 영향이 더 커요.\n\n좋은 썸네일 공통점\n- **얼굴 표정 또는 명확한 시각적 객체** (감정 인식 → 클릭)\n- **고대비 색상** (배경에서 튀어나옴)\n- **굵은 텍스트 3~5단어 이내** (모바일에서도 읽힘)\n- **썸네일과 제목 정보 중복 X** (서로 보완 관계)\n- **숫자 또는 화살표** (구체성)\n\n경쟁 영상의 썸네일을 다운받아 패턴 분석하면 자기 채널 톤이 잡혀요.",
          en: "When YouTube surfaces a video, viewers decide within 7 seconds. Thumbnail + title both matter, with thumbnail dominating.\n\nWinning thumbnails share:\n- **Facial expressions or clear visual subjects** (emotion = click)\n- **High-contrast colors** to pop in feed\n- **Bold 3–5 word text** legible on mobile\n- **Thumbnail and title complement, not repeat** info\n- **Numbers or arrows** for specificity\n\nDownload competitors' thumbnails to identify patterns for your channel tone.",
        },
      },
      {
        heading: { ko: "저작권·사용 가이드", en: "Copyright & Usage Guide" },
        body: {
          ko: "유튜브 썸네일은 영상 제작자의 저작물이에요. 그대로 복제·재게시는 저작권 위반이거든요.\n\n안전한 사용\n- **개인 보관·연구용**: 본인 채널 분석, 트렌드 리서치\n- **백업**: 자기 영상 썸네일 다운로드는 자유\n- **인용·리뷰**: '이 영상의 썸네일은 이렇다' 식으로 출처 명기 후 인용 (Fair Use 범위)\n\n금지\n- 자기 채널에 그대로 사용\n- 공식 채널처럼 사칭\n- 상업적 재배포",
          en: "Thumbnails are creators' copyrighted work. Re-uploading is infringement.\n\nSafe uses:\n- **Personal/research**: Channel analysis, trend research\n- **Backups**: Your own thumbnails free to keep\n- **Citation/reviews**: With attribution under Fair Use\n\nProhibited:\n- Reusing on your channel\n- Impersonating official channels\n- Commercial redistribution",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "1280×720 썸네일이 안 받아져요", en: "1280×720 not available?" },
        a: {
          ko: "원본 영상이 720p 이상으로 업로드 안 됐거나 옛 영상이에요. hqdefault.jpg(480×360)으로 자동 폴백되도록 설정하세요.",
          en: "The original video wasn't uploaded in HD or it's an old video. Use hqdefault.jpg (480×360) as fallback.",
        },
      },
      {
        q: { ko: "썸네일 추출이 API 키가 필요한가요?", en: "Does thumbnail download need API keys?" },
        a: {
          ko: "아니요. 유튜브 썸네일은 공개 CDN URL이에요. `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` 형식이거든요.",
          en: "No — thumbnails are public CDN URLs (`https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`).",
        },
      },
      {
        q: { ko: "쇼츠 썸네일도 가능해요?", en: "YouTube Shorts thumbnails?" },
        a: {
          ko: "쇼츠는 일반 비디오와 같은 URL 패턴이라 가능해요. 다만 쇼츠는 9:16 비율이라 다운로드된 썸네일은 16:9에 맞춰 일부가 잘려 있어요.",
          en: "Yes — Shorts use the same URL pattern. However, Shorts are 9:16 so the downloaded 16:9 thumbnail crops parts of the original.",
        },
      },
    ],
  },

  "ai-prompt-generator": {
    intro: {
      ko: "AI 프롬프트 생성기는 ChatGPT·Claude·Midjourney·Stable Diffusion에 그대로 쓸 수 있는 분야별 템플릿을 만들어 줘요. 매번 처음부터 짜지 말고 검증된 패턴부터 쌓으세요.",
      en: "Generate ready-to-use prompts for ChatGPT, Claude, Midjourney, and Stable Diffusion. Stop reinventing — start from proven templates.",
    },
    sections: [
      {
        heading: { ko: "좋은 프롬프트 5가지 요소", en: "Five Elements of Good Prompts" },
        body: {
          ko: "1. **역할(Role)**: '당신은 10년차 시니어 프론트엔드 개발자입니다'\n2. **맥락(Context)**: 작업 배경·제약·목표\n3. **태스크(Task)**: 구체적이고 검증 가능한 결과물\n4. **포맷(Format)**: '한 줄 요약 + 표 + 코드 블록'\n5. **예시(Examples)**: few-shot으로 톤·스타일 학습\n\n같은 질문이라도 위 5개를 다 명시하면 답변 품질이 2~10배 차이 나요. ChatGPT·Claude 같은 LLM은 맥락 정보가 풍부할수록 정확해지거든요.",
          en: "1. **Role**: 'You are a senior frontend engineer with 10 years of experience'\n2. **Context**: Background, constraints, goals\n3. **Task**: Specific, verifiable outcome\n4. **Format**: 'One-line summary + table + code block'\n5. **Examples**: Few-shot to teach tone and style\n\nWith all five, output quality jumps 2–10×. LLMs reward dense context.",
        },
      },
      {
        heading: { ko: "분야별 핵심 패턴", en: "Domain-Specific Patterns" },
        body: {
          ko: "- **이미지 생성(Midjourney)**: subject + scene + style + lighting + quality tags. 예: 'cyberpunk samurai, neon Tokyo street, cinematic lighting, hyper-detailed --ar 16:9'\n- **이미지 생성(Stable Diffusion)**: 쉼표 구분 키워드 + 품질 태그(masterpiece, 8k, sharp focus). 부정 프롬프트(negative prompt)도 활용\n- **코딩 도움(ChatGPT/Claude)**: 언어 + 프레임워크 명시 + 입력·출력 예시 + 제약(시간 복잡도, 메모리)\n- **글쓰기**: 톤(친근/공식) + 분량(1,500자) + 타깃 독자 + 키워드\n- **번역**: 원문 + 분야(법률/의학/마케팅) + 톤 + 용어집\n- **데이터 분석**: 데이터 형식 + 질문 + 시각화 형식\n\n분야가 명확할수록 프롬프트가 짧아져도 결과가 좋아요.",
          en: "- **Image (Midjourney)**: subject + scene + style + lighting + quality tags. E.g., 'cyberpunk samurai, neon Tokyo street, cinematic lighting, hyper-detailed --ar 16:9'\n- **Image (Stable Diffusion)**: Comma-separated keywords + quality tags (masterpiece, 8k, sharp focus). Use negative prompts.\n- **Coding (ChatGPT/Claude)**: Language + framework + I/O examples + constraints (time/memory)\n- **Writing**: Tone (casual/formal) + length + target reader + keywords\n- **Translation**: Source + domain (legal/medical/marketing) + tone + glossary\n- **Data analysis**: Data shape + question + chart format\n\nClearer domain = shorter prompts that still produce strong results.",
        },
      },
      {
        heading: { ko: "프롬프트 디버깅 — 결과 안 나올 때", en: "Debugging — When Prompts Fail" },
        body: {
          ko: "원하는 결과가 안 나오면 프롬프트의 어떤 부분이 부족한지 점검해보세요.\n\n- **장황한 답변**: '핵심 3가지만'·'최대 200자'로 제약\n- **잘못된 사실**: 'WebSearch 후 검증' 또는 '근거 출처 명시' 추가\n- **너무 일반적**: 구체적 시나리오·도메인 명시\n- **포맷 안 맞음**: 명확한 출력 구조 지정 (JSON, 마크다운 표, 단계별 리스트)\n- **톤 안 맞음**: 톤 예시 1~2개 제공 (few-shot)\n- **반복 응답**: temperature 0.7~0.9로 다양성 ↑, 또는 'Try 3 different angles' 추가\n\nClaude는 system prompt + user message 구조에 민감하니 system에 역할·제약, user에 구체 task를 분리해서 넣는 게 좋아요.",
          en: "When output disappoints, audit the prompt:\n\n- **Verbose**: Constrain with 'top 3 only' / 'max 200 chars'\n- **Hallucinations**: Add 'verify with WebSearch' or 'cite sources'\n- **Too generic**: Provide concrete scenarios/domain\n- **Wrong format**: Specify output structure (JSON, markdown table, step-list)\n- **Wrong tone**: Give 1–2 example outputs (few-shot)\n- **Repetitive**: Increase temperature to 0.7–0.9 or 'Try 3 different angles'\n\nClaude is sensitive to system vs user separation — put role and constraints in system, task in user message.",
        },
      },
    ],
    faqs: [
      {
        q: { ko: "ChatGPT와 Claude 프롬프트가 같은가요?", en: "Same prompt for ChatGPT and Claude?" },
        a: {
          ko: "기본 구조는 같지만 미세한 차이가 있어요. Claude는 더 긴 컨텍스트·세밀한 instruction following에 강하고, ChatGPT는 짧은 명령에도 빠릿하게 반응해요. 같은 프롬프트로 둘 다 시험해 보고 더 나은 쪽 선택.",
          en: "Core structure same, subtle differences. Claude excels with longer context and detailed instructions; ChatGPT responds quickly to short commands. Test both with the same prompt and pick the winner.",
        },
      },
      {
        q: { ko: "Midjourney 프롬프트에 한국어 써도 돼요?", en: "Korean prompts in Midjourney?" },
        a: {
          ko: "Midjourney는 영어 학습 비중이 압도적이라 영어 프롬프트가 결과 좋아요. 한국어 → 영어 번역 후 사용 추천.",
          en: "Midjourney is heavily English-trained. Translate Korean prompts to English for better results.",
        },
      },
      {
        q: { ko: "negative prompt는 뭐예요?", en: "What's a negative prompt?" },
        a: {
          ko: "Stable Diffusion에서 '결과에 포함되지 않게 할 요소'를 지정하는 옵션이에요. 'blurry, low quality, deformed' 같은 부정적 단어를 넣으면 그런 특징을 피하려고 해요.",
          en: "In Stable Diffusion, lists features to avoid. Adding 'blurry, low quality, deformed' steers the model away from those traits.",
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
