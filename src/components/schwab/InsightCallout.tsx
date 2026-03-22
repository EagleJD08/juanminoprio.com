interface InsightCalloutProps {
  label?: string;
  text: string;
}

export default function InsightCallout({ label = "Key Insight", text }: InsightCalloutProps) {
  return (
    <div className="mt-6 bg-mist rounded-md p-4 border-l-[3px] border-slate-navy">
      <p className="text-xs font-semibold text-slate-navy uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-charcoal leading-relaxed">{text}</p>
    </div>
  );
}
