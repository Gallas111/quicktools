"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

/* ──────────────────────── types ──────────────────────── */

type Tab = "text" | "image";

type TextCategory =
  | "blog"
  | "marketing"
  | "email"
  | "coding"
  | "translation"
  | "summarization"
  | "brainstorming"
  | "social"
  | "resume"
  | "business";

type Tone = "professional" | "friendly" | "humorous" | "formal" | "casual";
type Length = "short" | "medium" | "long";
type Lang = "ko" | "en";

type ImageStyle = "photo" | "illustration" | "3d" | "anime" | "watercolor" | "oil" | "pixel" | "popart";
type Mood = "bright" | "dark" | "warm" | "cool" | "dramatic" | "soft" | "neon" | "golden";
type CameraAngle = "closeup" | "wide" | "birdeye" | "low";
type ColorPalette = "pastel" | "vivid" | "monochrome" | "earth";
type ImagePlatform = "midjourney" | "dalle" | "stable";

/* ──────────────────── label maps ─────────────────────── */

const categoryLabels: Record<TextCategory, { ko: string; en: string; icon: string }> = {
  blog: { ko: "블로그 글쓰기", en: "Blog Writing", icon: "pencil-line" },
  marketing: { ko: "마케팅 카피", en: "Marketing Copy", icon: "megaphone" },
  email: { ko: "이메일 작성", en: "Email Writing", icon: "mail" },
  coding: { ko: "코딩 도움", en: "Coding Help", icon: "code-xml" },
  translation: { ko: "번역", en: "Translation", icon: "languages" },
  summarization: { ko: "요약", en: "Summarization", icon: "text" },
  brainstorming: { ko: "브레인스토밍", en: "Brainstorming", icon: "lightbulb" },
  social: { ko: "SNS 콘텐츠", en: "Social Media", icon: "share-2" },
  resume: { ko: "자기소개서", en: "Resume / Cover Letter", icon: "file-user" },
  business: { ko: "비즈니스 기획", en: "Business Planning", icon: "briefcase-business" },
};

const toneLabels: Record<Tone, { ko: string; en: string }> = {
  professional: { ko: "전문적", en: "Professional" },
  friendly: { ko: "친근한", en: "Friendly" },
  humorous: { ko: "유머러스", en: "Humorous" },
  formal: { ko: "격식체", en: "Formal" },
  casual: { ko: "캐주얼", en: "Casual" },
};

const lengthLabels: Record<Length, { ko: string; en: string }> = {
  short: { ko: "짧게", en: "Short" },
  medium: { ko: "보통", en: "Medium" },
  long: { ko: "길게", en: "Long" },
};

const imageStyleLabels: Record<ImageStyle, { ko: string; en: string }> = {
  photo: { ko: "사진", en: "Photo" },
  illustration: { ko: "일러스트", en: "Illustration" },
  "3d": { ko: "3D 렌더", en: "3D Render" },
  anime: { ko: "애니메이션", en: "Anime" },
  watercolor: { ko: "수채화", en: "Watercolor" },
  oil: { ko: "유화", en: "Oil Painting" },
  pixel: { ko: "픽셀아트", en: "Pixel Art" },
  popart: { ko: "팝아트", en: "Pop Art" },
};

const moodLabels: Record<Mood, { ko: string; en: string }> = {
  bright: { ko: "밝은", en: "Bright" },
  dark: { ko: "어두운", en: "Dark" },
  warm: { ko: "따뜻한", en: "Warm" },
  cool: { ko: "차가운", en: "Cool" },
  dramatic: { ko: "드라마틱", en: "Dramatic" },
  soft: { ko: "소프트", en: "Soft" },
  neon: { ko: "네온", en: "Neon" },
  golden: { ko: "황금시간", en: "Golden Hour" },
};

const cameraLabels: Record<CameraAngle, { ko: string; en: string }> = {
  closeup: { ko: "클로즈업", en: "Close-up" },
  wide: { ko: "와이드", en: "Wide Shot" },
  birdeye: { ko: "버드아이", en: "Bird's Eye View" },
  low: { ko: "로우앵글", en: "Low Angle" },
};

const paletteLabels: Record<ColorPalette, { ko: string; en: string }> = {
  pastel: { ko: "파스텔", en: "Pastel" },
  vivid: { ko: "비비드", en: "Vivid" },
  monochrome: { ko: "모노크롬", en: "Monochrome" },
  earth: { ko: "어스톤", en: "Earth Tones" },
};

const platformLabels: Record<ImagePlatform, string> = {
  midjourney: "Midjourney",
  dalle: "DALL-E",
  stable: "Stable Diffusion",
};

/* ─────────────── text prompt templates ────────────────── */

function buildTextPrompt(
  category: TextCategory,
  topic: string,
  tone: Tone,
  length: Length,
  lang: Lang,
  extra: string
): string {
  const toneEn = toneLabels[tone].en.toLowerCase();
  const lengthMap: Record<Length, string> = {
    short: "approximately 200-300 words",
    medium: "approximately 500-800 words",
    long: "approximately 1200-1500 words",
  };
  const lengthStr = lengthMap[length];
  const langStr = lang === "ko" ? "Korean" : "English";
  const extraLine = extra.trim() ? `\n\nAdditional requirements:\n${extra.trim()}` : "";

  const templates: Record<TextCategory, string> = {
    blog: `You are a professional blog writer with extensive experience in content creation and SEO optimization. Your task is to write an engaging blog post.

**Topic:** ${topic}

**Instructions:**
1. Write a compelling headline that grabs attention and includes relevant keywords.
2. Start with a hook that draws the reader in within the first two sentences.
3. Structure the content with clear H2 and H3 subheadings for easy scanning.
4. Include practical examples, data points, or anecdotes to support your arguments.
5. Use transitional phrases between sections for smooth flow.
6. End with a strong conclusion that includes a call-to-action.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    marketing: `You are a senior copywriter at a top creative agency, specializing in persuasive and conversion-driven copy. Your task is to create compelling marketing copy.

**Product/Service/Topic:** ${topic}

**Instructions:**
1. Identify the target audience and their primary pain points.
2. Craft a powerful headline using proven copywriting formulas (AIDA, PAS, or BAB).
3. Write benefit-driven body copy that addresses the audience's needs.
4. Include a strong unique value proposition (UVP).
5. Add social proof elements (suggest where testimonials or stats would go).
6. End with a clear, urgent call-to-action (CTA).

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    email: `You are an expert email communication specialist who understands professional etiquette and persuasive writing. Your task is to compose an effective email.

**Subject/Purpose:** ${topic}

**Instructions:**
1. Write a clear, concise subject line that encourages opening.
2. Start with an appropriate greeting based on the context.
3. State the purpose in the first paragraph — be direct and respectful.
4. Provide necessary context or details in the body, using bullet points where appropriate.
5. Include a specific call-to-action or next steps.
6. Close with a professional sign-off appropriate to the relationship.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    coding: `You are a senior software engineer and technical mentor with deep expertise across multiple programming languages and frameworks. Your task is to provide coding assistance.

**Task/Problem:** ${topic}

**Instructions:**
1. First, briefly explain the approach and reasoning before writing code.
2. Write clean, well-commented, production-ready code.
3. Follow best practices and established design patterns.
4. Handle edge cases and include basic error handling.
5. After the code, explain key decisions and any trade-offs made.
6. Suggest potential improvements or optimizations if applicable.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write code comments and explanations in ${langStr}.${extraLine}`,

    translation: `You are a professional translator and linguist with native-level fluency in multiple languages, specializing in natural and culturally appropriate translations. Your task is to translate and localize content.

**Content to translate:** ${topic}

**Instructions:**
1. Translate the content accurately while preserving the original meaning and intent.
2. Adapt idioms, metaphors, and cultural references to be natural in the target language.
3. Maintain the original formatting, structure, and emphasis.
4. If there are ambiguous terms, choose the most contextually appropriate translation and note alternatives.
5. Ensure the translation reads naturally — it should not feel like a translation.
6. Preserve any technical terms that are commonly used in their original form.

**Tone:** ${toneEn}
**Target language:** ${langStr}${extraLine}`,

    summarization: `You are an expert analyst and editor skilled at distilling complex information into clear, concise summaries. Your task is to create a well-structured summary.

**Content/Topic to summarize:** ${topic}

**Instructions:**
1. Identify and highlight the key points, main arguments, and critical findings.
2. Organize the summary with clear structure (use bullet points or numbered lists).
3. Preserve the essential meaning without unnecessary detail.
4. Include any important data, statistics, or conclusions.
5. Note any significant implications or actionable takeaways.
6. Keep the summary focused and avoid introducing new information.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    brainstorming: `You are a creative strategist and innovation consultant experienced in design thinking and ideation frameworks. Your task is to brainstorm creative ideas.

**Topic/Challenge:** ${topic}

**Instructions:**
1. Generate a diverse range of ideas — aim for both practical and unconventional approaches.
2. Organize ideas into categories (e.g., quick wins, long-term strategies, innovative/moonshot ideas).
3. For each idea, provide a brief description and potential impact.
4. Consider different perspectives: user, business, technology, and market angles.
5. Identify the top 3 most promising ideas and explain why.
6. Suggest next steps or ways to validate the best ideas.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    social: `You are a social media strategist and content creator with deep knowledge of platform algorithms, trends, and engagement tactics. Your task is to create engaging social media content.

**Topic/Message:** ${topic}

**Instructions:**
1. Create content optimized for maximum engagement (likes, shares, comments).
2. Write an attention-grabbing opening line (hook).
3. Use short paragraphs and line breaks for mobile readability.
4. Include relevant emoji usage that enhances the message.
5. Suggest 5-10 relevant hashtags (mix of popular and niche).
6. Add a conversation-starting question or CTA at the end.
7. Optionally suggest an image or visual concept to pair with the post.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    resume: `You are a professional career coach and resume writer with expertise in HR and recruitment. You understand what hiring managers look for. Your task is to help write a compelling self-introduction, resume section, or cover letter.

**Position/Context:** ${topic}

**Instructions:**
1. Highlight key strengths, achievements, and relevant experience.
2. Use action verbs and quantifiable results where possible.
3. Tailor the content to the specific role or industry mentioned.
4. Show personality while maintaining professionalism.
5. Address potential concerns or gaps proactively if relevant.
6. Structure the content for easy scanning by recruiters (bullet points, clear sections).

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,

    business: `You are a seasoned business strategist and management consultant with experience across startups and enterprises. Your task is to create a business plan or strategic document.

**Business idea/Topic:** ${topic}

**Instructions:**
1. Start with a clear executive summary of the concept.
2. Analyze the market opportunity: target audience, market size, and competitive landscape.
3. Define the value proposition and business model.
4. Outline key strategies for marketing, operations, and growth.
5. Identify potential risks and mitigation strategies.
6. Include a rough timeline or milestones for implementation.
7. Suggest key metrics (KPIs) to track success.

**Tone:** ${toneEn}
**Length:** ${lengthStr}
**Language:** Write entirely in ${langStr}.${extraLine}`,
  };

  return templates[category];
}

/* ─────────────── image prompt builder ─────────────────── */

function buildImagePrompt(
  subject: string,
  style: ImageStyle,
  mood: Mood,
  camera: CameraAngle,
  palette: ColorPalette,
  platform: ImagePlatform,
  quality: boolean
): string {
  const styleMap: Record<ImageStyle, string> = {
    photo: "realistic photography",
    illustration: "digital illustration",
    "3d": "3D render, octane render",
    anime: "anime style, studio ghibli inspired",
    watercolor: "watercolor painting",
    oil: "oil painting, classical art style",
    pixel: "pixel art, 16-bit retro style",
    popart: "pop art, bold colors, Andy Warhol inspired",
  };

  const moodMap: Record<Mood, string> = {
    bright: "bright lighting, cheerful atmosphere",
    dark: "dark moody lighting, dramatic shadows",
    warm: "warm tones, cozy golden light",
    cool: "cool blue tones, serene atmosphere",
    dramatic: "dramatic cinematic lighting, high contrast",
    soft: "soft diffused lighting, gentle atmosphere",
    neon: "neon glow, cyberpunk lighting, vibrant colors",
    golden: "golden hour sunlight, warm lens flare",
  };

  const cameraMap: Record<CameraAngle, string> = {
    closeup: "close-up shot, detailed",
    wide: "wide-angle shot, expansive view",
    birdeye: "bird's eye view, aerial perspective",
    low: "low angle shot, looking up, dramatic perspective",
  };

  const paletteMap: Record<ColorPalette, string> = {
    pastel: "pastel color palette, soft muted tones",
    vivid: "vivid saturated colors, bold palette",
    monochrome: "monochrome, black and white",
    earth: "earth tones, natural warm colors, muted greens and browns",
  };

  const qualityTags = {
    midjourney: ", highly detailed, masterpiece, best quality",
    dalle: "",
    stable: ", masterpiece, best quality, highly detailed, sharp focus, 8k uhd, high resolution",
  };

  const styleStr = styleMap[style];
  const moodStr = moodMap[mood];
  const cameraStr = cameraMap[camera];
  const paletteStr = paletteMap[palette];
  const qTag = quality ? qualityTags[platform] : "";

  if (platform === "midjourney") {
    return `${subject}, ${styleStr}, ${moodStr}, ${cameraStr}, ${paletteStr}${qTag} --ar 16:9 --v 6 --q 2`;
  }

  if (platform === "dalle") {
    return `Create a ${styleStr} of ${subject}. The scene has ${moodStr}. Compose it as a ${cameraStr}. Use a ${paletteStr}.${quality ? " Make the image highly detailed with exceptional quality." : ""}`;
  }

  // Stable Diffusion — keyword-based
  return `${subject}, ${styleStr}, ${moodStr}, ${cameraStr}, ${paletteStr}${qTag}`;
}

/* ────────────────────── component ─────────────────────── */

export default function AIPromptGenerator() {
  const { locale } = useLocale();
  const ko = locale === "ko";

  /* shared */
  const [tab, setTab] = useState<Tab>("text");
  const [copied, setCopied] = useState(false);

  /* text tab */
  const [category, setCategory] = useState<TextCategory | null>(null);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [promptLang, setPromptLang] = useState<Lang>("ko");
  const [extra, setExtra] = useState("");

  /* image tab */
  const [imgSubject, setImgSubject] = useState("");
  const [imgStyle, setImgStyle] = useState<ImageStyle>("photo");
  const [imgMood, setImgMood] = useState<Mood>("bright");
  const [imgCamera, setImgCamera] = useState<CameraAngle>("wide");
  const [imgPalette, setImgPalette] = useState<ColorPalette>("vivid");
  const [imgPlatform, setImgPlatform] = useState<ImagePlatform>("midjourney");
  const [imgQuality, setImgQuality] = useState(true);

  /* derived prompts */
  const textPrompt =
    category && topic.trim()
      ? buildTextPrompt(category, topic.trim(), tone, length, promptLang, extra)
      : "";

  const imagePrompt = imgSubject.trim()
    ? buildImagePrompt(imgSubject.trim(), imgStyle, imgMood, imgCamera, imgPalette, imgPlatform, imgQuality)
    : "";

  const currentPrompt = tab === "text" ? textPrompt : imagePrompt;

  const handleCopy = async () => {
    if (!currentPrompt) return;
    await navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── helpers ─── */

  const pillBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-indigo-600 text-white shadow-md"
        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
    }`;

  const sectionTitle = (text: string, step: number) => (
    <div className="flex items-center gap-2 mb-3">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold">
        {step}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text}</h3>
    </div>
  );

  /* ─── render ─── */

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* title */}
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {ko ? "AI 프롬프트 생성기" : "AI Prompt Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {ko
          ? "ChatGPT, Midjourney, DALL-E, Stable Diffusion 등에서 사용할 수 있는 고품질 프롬프트를 쉽게 만들어보세요."
          : "Easily create high-quality prompts for ChatGPT, Midjourney, DALL-E, Stable Diffusion and more."}
      </p>

      {/* tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => { setTab("text"); setCopied(false); }}
          className={`flex-1 py-3 rounded-xl text-center font-semibold transition-all ${
            tab === "text"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {ko ? "텍스트 AI (ChatGPT / Claude)" : "Text AI (ChatGPT / Claude)"}
        </button>
        <button
          onClick={() => { setTab("image"); setCopied(false); }}
          className={`flex-1 py-3 rounded-xl text-center font-semibold transition-all ${
            tab === "image"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {ko ? "이미지 AI (Midjourney / DALL-E)" : "Image AI (Midjourney / DALL-E)"}
        </button>
      </div>

      {/* ═══════ TEXT TAB ═══════ */}
      {tab === "text" && (
        <div className="space-y-8">
          {/* Step 1 — Category */}
          <section>
            {sectionTitle(ko ? "카테고리 선택" : "Select Category", 1)}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {(Object.keys(categoryLabels) as TextCategory[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all text-center ${
                    category === key
                      ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {ko ? categoryLabels[key].ko : categoryLabels[key].en}
                </button>
              ))}
            </div>
          </section>

          {/* Step 2 — Details */}
          {category && (
            <section className="space-y-5">
              {sectionTitle(ko ? "세부 설정" : "Detail Settings", 2)}

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {ko ? "주제 / 내용" : "Topic / Subject"}
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={ko ? "예: 재택근무의 장단점" : "e.g. Pros and cons of remote work"}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {ko ? "톤 / 어조" : "Tone"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(toneLabels) as Tone[]).map((t) => (
                    <button key={t} onClick={() => setTone(t)} className={pillBtn(tone === t)}>
                      {ko ? toneLabels[t].ko : toneLabels[t].en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {ko ? "길이" : "Length"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(lengthLabels) as Length[]).map((l) => (
                    <button key={l} onClick={() => setLength(l)} className={pillBtn(length === l)}>
                      {ko ? lengthLabels[l].ko : lengthLabels[l].en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {ko ? "출력 언어" : "Output Language"}
                </label>
                <div className="flex gap-2">
                  <button onClick={() => setPromptLang("ko")} className={pillBtn(promptLang === "ko")}>
                    한국어
                  </button>
                  <button onClick={() => setPromptLang("en")} className={pillBtn(promptLang === "en")}>
                    English
                  </button>
                </div>
              </div>

              {/* Additional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {ko ? "추가 지시사항 (선택)" : "Additional Instructions (optional)"}
                </label>
                <textarea
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  rows={3}
                  placeholder={ko ? "예: 초보자 대상으로 쉽게 설명해주세요" : "e.g. Explain for beginners in simple terms"}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </section>
          )}

          {/* Step 3 — Output */}
          {textPrompt && (
            <section>
              {sectionTitle(ko ? "생성된 프롬프트" : "Generated Prompt", 3)}
              <div className="relative rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
                  {textPrompt}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  {copied ? (ko ? "복사됨!" : "Copied!") : (ko ? "복사" : "Copy")}
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ═══════ IMAGE TAB ═══════ */}
      {tab === "image" && (
        <div className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {ko ? "주제 (무엇을 그릴까요?)" : "Subject (What to create?)"}
            </label>
            <input
              type="text"
              value={imgSubject}
              onChange={(e) => setImgSubject(e.target.value)}
              placeholder={ko ? "예: 미래 도시의 일몰 풍경" : "e.g. Sunset over a futuristic cityscape"}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ko ? "스타일" : "Style"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(imageStyleLabels) as ImageStyle[]).map((s) => (
                <button key={s} onClick={() => setImgStyle(s)} className={pillBtn(imgStyle === s)}>
                  {ko ? imageStyleLabels[s].ko : imageStyleLabels[s].en}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ko ? "분위기 / 조명" : "Mood / Lighting"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(moodLabels) as Mood[]).map((m) => (
                <button key={m} onClick={() => setImgMood(m)} className={pillBtn(imgMood === m)}>
                  {ko ? moodLabels[m].ko : moodLabels[m].en}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Angle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ko ? "카메라 앵글" : "Camera Angle"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(cameraLabels) as CameraAngle[]).map((c) => (
                <button key={c} onClick={() => setImgCamera(c)} className={pillBtn(imgCamera === c)}>
                  {ko ? cameraLabels[c].ko : cameraLabels[c].en}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ko ? "컬러 팔레트" : "Color Palette"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(paletteLabels) as ColorPalette[]).map((p) => (
                <button key={p} onClick={() => setImgPalette(p)} className={pillBtn(imgPalette === p)}>
                  {ko ? paletteLabels[p].ko : paletteLabels[p].en}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {ko ? "플랫폼" : "Platform"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(platformLabels) as ImagePlatform[]).map((p) => (
                <button key={p} onClick={() => setImgPlatform(p)} className={pillBtn(imgPlatform === p)}>
                  {platformLabels[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Quality toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setImgQuality(!imgQuality)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                imgQuality ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  imgQuality ? "translate-x-6" : ""
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {ko ? "고품질 키워드 추가" : "Add quality/detail keywords"}
            </span>
          </div>

          {/* Output */}
          {imagePrompt && (
            <div className="relative rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
                {imagePrompt}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {copied ? (ko ? "복사됨!" : "Copied!") : (ko ? "복사" : "Copy")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════ INFO SECTION ═══════ */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {ko ? "좋은 AI 프롬프트 작성법" : "How to Write Great AI Prompts"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: ko ? "1. 역할을 지정하세요" : "1. Assign a Role",
              desc: ko
                ? "\"당신은 10년 경력의 마케팅 전문가입니다\"처럼 AI에게 역할을 부여하면 더 전문적인 답변을 얻을 수 있습니다."
                : "Giving the AI a specific role like \"You are a senior marketing expert\" helps produce more specialized and authoritative responses.",
            },
            {
              title: ko ? "2. 구체적으로 작성하세요" : "2. Be Specific",
              desc: ko
                ? "모호한 요청 대신 원하는 형식, 길이, 대상 독자, 톤을 명확하게 지정하세요."
                : "Instead of vague requests, clearly specify the desired format, length, target audience, and tone.",
            },
            {
              title: ko ? "3. 맥락을 제공하세요" : "3. Provide Context",
              desc: ko
                ? "배경 정보나 예시를 포함하면 AI가 의도를 더 정확하게 파악할 수 있습니다."
                : "Including background information or examples helps the AI understand your intent more accurately.",
            },
            {
              title: ko ? "4. 출력 형식을 지정하세요" : "4. Specify Output Format",
              desc: ko
                ? "\"표 형식으로\", \"불릿 포인트로\", \"단계별로\" 등 원하는 출력 형식을 명시하면 더 활용하기 좋은 결과를 얻습니다."
                : "Specifying formats like \"in a table\", \"as bullet points\", or \"step by step\" produces more usable results.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {ko ? "이미지 프롬프트 팁" : "Image Prompt Tips"}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              {ko
                ? "Midjourney: 키워드 나열 + 파라미터(--ar, --v, --q) 형식이 효과적입니다."
                : "Midjourney: Keyword listing + parameters (--ar, --v, --q) format works best."}
            </li>
            <li>
              {ko
                ? "DALL-E: 자연스러운 문장으로 설명하는 것이 더 좋은 결과를 냅니다."
                : "DALL-E: Natural language descriptions tend to produce better results."}
            </li>
            <li>
              {ko
                ? "Stable Diffusion: 쉼표로 구분된 키워드 + 품질 태그가 핵심입니다."
                : "Stable Diffusion: Comma-separated keywords + quality tags are essential."}
            </li>
            <li>
              {ko
                ? "부정 프롬프트(negative prompt)를 활용하면 원치 않는 요소를 제거할 수 있습니다."
                : "Use negative prompts to remove unwanted elements from generated images."}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
