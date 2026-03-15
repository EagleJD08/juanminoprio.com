interface PersonaFaceProps {
  ageGroupId: string;
  className?: string;
}

const faceFiles: Record<string, string> = {
  "under-25": "/projects/spending-viz/faces/under-25.png",
  "25-34": "/projects/spending-viz/faces/25-34.png",
  "35-44": "/projects/spending-viz/faces/35-44.png",
  "45-54": "/projects/spending-viz/faces/45-54.png",
  "55-64": "/projects/spending-viz/faces/55-64.png",
  "65-74": "/projects/spending-viz/faces/65-74.png",
  "75-plus": "/projects/spending-viz/faces/75-plus.png",
};

export default function PersonaFace({ ageGroupId, className = "" }: PersonaFaceProps) {
  const src = faceFiles[ageGroupId];
  if (!src) return null;
  return (
    <div className={`inline-block ${className}`}>
      <img src={src} alt="" className="w-full h-full object-contain" />
    </div>
  );
}
