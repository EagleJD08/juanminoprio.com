import { useRef, useCallback } from "react";
import type { QuizResult } from "../../lib/quiz/types";
import { MARKETER_TYPE_INFO, MARKETER_TYPES } from "../../lib/quiz/types";

interface ShareCardProps {
  result: QuizResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primary = MARKETER_TYPE_INFO[result.primaryType];

  const generateCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, W, H);

    // Top accent bar
    ctx.fillStyle = "#6B4226";
    ctx.fillRect(0, 0, W, 6);

    // "My Marketing Archetype" label
    ctx.fillStyle = "#6B4226";
    ctx.font = "bold 14px Inter, system-ui, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("MY MARKETING ARCHETYPE", 60, 60);

    // Type name
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 48px Plus Jakarta Sans, system-ui, sans-serif";
    ctx.fillText(primary.name, 60, 120);

    // Tagline
    ctx.fillStyle = "#4A4A4A";
    ctx.font = "italic 20px Lora, Georgia, serif";
    ctx.fillText(primary.tagline, 60, 155);

    // Mini bar chart for top 5
    const sorted = [...MARKETER_TYPES].sort(
      (a, b) => (result.scores.normalized[b] ?? 0) - (result.scores.normalized[a] ?? 0)
    );
    const top5 = sorted.slice(0, 5);
    const barY = 200;
    const barHeight = 24;
    const barGap = 36;
    const maxBarWidth = 500;

    top5.forEach((typeId, i) => {
      const info = MARKETER_TYPE_INFO[typeId];
      const score = result.scores.normalized[typeId] ?? 0;
      const y = barY + i * barGap;

      // Label
      ctx.fillStyle = "#4A4A4A";
      ctx.font = "500 13px Inter, system-ui, sans-serif";
      ctx.fillText(info.name.replace("The ", ""), 60, y + 16);

      // Bar background
      ctx.fillStyle = "#E8E4DF";
      ctx.beginPath();
      ctx.roundRect(260, y, maxBarWidth, barHeight, 4);
      ctx.fill();

      // Bar fill
      ctx.fillStyle = typeId === result.primaryType ? "#6B4226" : "#B8A99A";
      const barWidth = (score / 100) * maxBarWidth;
      ctx.beginPath();
      ctx.roundRect(260, y, barWidth, barHeight, 4);
      ctx.fill();

      // Score
      ctx.fillStyle = "#4A4A4A";
      ctx.font = "600 13px Inter, system-ui, sans-serif";
      ctx.fillText(`${score}%`, 770, y + 16);
    });

    // Branding
    ctx.fillStyle = "#B8A99A";
    ctx.font = "500 14px Inter, system-ui, sans-serif";
    ctx.fillText("juanminoprio.com/tools/marketer-quiz", 60, H - 40);

    // Description (wrapped)
    ctx.fillStyle = "#4A4A4A";
    ctx.font = "400 15px Inter, system-ui, sans-serif";
    const descLines = wrapText(ctx, primary.description, 380);
    descLines.slice(0, 6).forEach((line, i) => {
      ctx.fillText(line, 820, 200 + i * 22);
    });

    // Right side header
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 16px Plus Jakarta Sans, system-ui, sans-serif";
    ctx.fillText("About this type", 820, 175);
  }, [result, primary]);

  const handleDownload = useCallback(() => {
    generateCard();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `marketer-type-${result.primaryType}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [generateCard, result.primaryType]);

  return (
    <div className="text-center">
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-lg hover:bg-terracotta/90 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Result Card
      </button>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
