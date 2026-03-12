"use client";

import { useState, useRef, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";

interface CompressedImage {
  original: { name: string; size: number; url: string };
  compressed: { size: number; url: string; blob: Blob };
  ratio: number;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [outputFormat, setOutputFormat] = useState<string>("same");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLocale();

  const compressImage = useCallback(
    (file: File): Promise<CompressedImage> => {
      return new Promise((resolve) => {
        const img = new Image();
        const originalUrl = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);

          let mimeType = file.type;
          if (outputFormat !== "same") {
            mimeType = `image/${outputFormat}`;
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                original: { name: file.name, size: file.size, url: originalUrl },
                compressed: { size: blob.size, url: compressedUrl, blob },
                ratio: Math.round((1 - blob.size / file.size) * 100),
              });
            },
            mimeType,
            quality / 100
          );
        };
        img.src = originalUrl;
      });
    },
    [quality, maxWidth, outputFormat]
  );

  const handleFiles = useCallback(
    async (files: FileList) => {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const results = await Promise.all(imageFiles.map(compressImage));
      setImages((prev) => [...prev, ...results]);
    },
    [compressImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const downloadImage = (img: CompressedImage) => {
    const a = document.createElement("a");
    a.href = img.compressed.url;
    const ext = outputFormat === "same" ? img.original.name.split(".").pop() : outputFormat;
    a.download = `compressed_${img.original.name.replace(/\.[^.]+$/, "")}.${ext}`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "이미지 압축" : "Image Compressor"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "이미지를 브라우저에서 바로 압축합니다. 서버로 전송되지 않아 안전합니다."
          : "Compress images directly in your browser. No data is sent to any server."}
      </p>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "품질" : "Quality"}: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-48"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "최대 너비" : "Max Width"}
          </label>
          <select
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value={640}>640px</option>
            <option value={1280}>1280px</option>
            <option value={1920}>1920px</option>
            <option value={3840}>3840px</option>
            <option value={99999}>{locale === "ko" ? "원본 유지" : "Original"}</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "출력 포맷" : "Output Format"}
          </label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="same">{locale === "ko" ? "원본과 동일" : "Same as original"}</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          isDragging
            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
        }`}
      >
        <div className="text-4xl mb-3">🖼️</div>
        <p className="text-gray-600 dark:text-gray-400">
          {locale === "ko"
            ? "이미지를 드래그하거나 클릭하여 업로드"
            : "Drag & drop images or click to upload"}
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          PNG, JPG, WebP
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-8 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-4">
                <img
                  src={img.compressed.url}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {img.original.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatSize(img.original.size)} → {formatSize(img.compressed.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    img.ratio > 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {img.ratio > 0 ? `-${img.ratio}%` : `+${Math.abs(img.ratio)}%`}
                </span>
                <button
                  onClick={() => downloadImage(img)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {t.download}
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setImages([])}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {t.clear}
          </button>
        </div>
      )}

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "이미지 압축이란?" : "What is Image Compression?"}
        </h2>
        <p>
          {locale === "ko"
            ? "이미지 압축은 이미지의 파일 크기를 줄여 웹사이트 로딩 속도를 높이고 저장 공간을 절약하는 도구입니다. 이 도구는 브라우저에서 직접 처리되므로 이미지가 서버로 전송되지 않아 개인정보가 안전합니다."
            : "Image compression reduces file sizes to improve website loading speeds and save storage space. This tool processes everything in your browser, so your images are never uploaded to any server."}
        </p>
      </div>
    </div>
  );
}
