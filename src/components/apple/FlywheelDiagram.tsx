"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useWindowWidth } from "@lib/hooks";

// 5 nodes at clock positions: 12, ~2, ~4, ~8, ~10 o'clock
// Circle centre is 50%, 50%. r ≈ 38% of container so nodes land near the edge.
const R = 36; // % radius — slightly tighter so arrows have room

function pos(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0° is 12 o'clock
  return {
    left: `${50 + R * Math.cos(rad)}%`,
    top: `${50 + R * Math.sin(rad)}%`,
  };
}

const NODES = [
  { label: "Hardware",      value: "$416.2B Revenue",     angle: 0   },
  { label: "Installed Base",value: "2.5B Devices",        angle: 72  },
  { label: "Services",      value: "$109.2B Revenue",     angle: 144 },
  { label: "Profit",        value: "$112B Net Income",    angle: 216 },
  { label: "R&D",           value: "$34.6B Investment",   angle: 288 },
];

// Build curved SVG paths between consecutive nodes (and from last back to first).
// We use quadratic bezier curves that bow outward from the centre.
function buildPaths(containerSize: number) {
  const cx = containerSize / 2;
  const cy = containerSize / 2;
  const r  = (R / 100) * containerSize;
  const nodeW = 100; // approximate node card width
  const nodeH = 52;  // approximate node card height

  return NODES.map((node, i) => {
    const next = NODES[(i + 1) % NODES.length];
    const a1 = ((node.angle - 90) * Math.PI) / 180;
    const a2 = ((next.angle - 90) * Math.PI) / 180;

    // Node centre points (accounting for half-card offset)
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);

    // Move start/end to edge of each card
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const offset = 60; // pixels from centre to card edge
    const sx = x1 + ux * offset;
    const sy = y1 + uy * offset;
    const ex = x2 - ux * offset;
    const ey = y2 - uy * offset;

    // Control point: push outward from centre for curved arrows
    const midX = (sx + ex) / 2;
    const midY = (sy + ey) / 2;
    const toMidX = midX - cx;
    const toMidY = midY - cy;
    const toMidLen = Math.sqrt(toMidX * toMidX + toMidY * toMidY) || 1;
    const bow = 40; // more pronounced curve
    const cpX = midX + (toMidX / toMidLen) * bow;
    const cpY = midY + (toMidY / toMidLen) * bow;

    const isLoop = i === NODES.length - 1;
    return { d: `M ${sx} ${sy} Q ${cpX} ${cpY} ${ex} ${ey}`, isLoop };
  });
}

// ── Desktop circular layout ────────────────────────────────────────────────
function DesktopFlywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const SIZE = 440;
  const paths = buildPaths(SIZE);

  return (
    <div
      ref={ref}
      style={{ width: SIZE, height: SIZE }}
      className="relative mx-auto"
    >
      {/* SVG arrows layer */}
      <svg
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 overflow-visible"
        style={{ zIndex: 0 }}
      >
        <defs>
          {/* Standard arrowhead */}
          <marker
            id="arrow-grey"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#86868B" />
          </marker>
          {/* Loop arrowhead (slightly larger, dark) */}
          <marker
            id="arrow-loop"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#1D1D1F" />
          </marker>
        </defs>

        {paths.map(({ d, isLoop }, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={isLoop ? "#1D1D1F" : "#86868B"}
            strokeWidth={isLoop ? 2.5 : 1.5}
            markerEnd={isLoop ? "url(#arrow-loop)" : "url(#arrow-grey)"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.5, delay: 0.4 + NODES.length * 0.25 + i * 0.1 },
              opacity: { duration: 0.2, delay: 0.4 + NODES.length * 0.25 + i * 0.1 },
            }}
          />
        ))}
      </svg>

      {/* Node cards */}
      {NODES.map((node, i) => {
        const { left, top } = pos(node.angle);
        return (
          <motion.div
            key={node.label}
            className="absolute"
            style={{
              left,
              top,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              width: 120,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + i * 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              style={{
                background: "#FAFAFA",
                border: "1px solid #B8A99A",
                borderRadius: 8,
                padding: "6px 8px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#86868B",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {node.label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1D1D1F",
                  margin: 0,
                  marginTop: 3,
                  lineHeight: 1.2,
                }}
              >
                {node.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Mobile vertical stack ──────────────────────────────────────────────────
function MobileFlywheel() {
  return (
    <div className="flex flex-col items-center gap-0">
      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: "#FAFAFA",
              border: "1px solid #B8A99A",
              borderRadius: 8,
              padding: "8px 20px",
              width: 200,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#86868B",
                margin: 0,
              }}
            >
              {node.label}
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1D1D1F",
                margin: 0,
                marginTop: 2,
              }}
            >
              {node.value}
            </p>
          </div>
          {i < NODES.length - 1 && (
            <div style={{ width: 1, height: 12, background: "#B8A99A" }} />
          )}
        </motion.div>
      ))}
      {/* Loop indicator */}
      <motion.div
        className="flex flex-col items-center mt-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: NODES.length * 0.12 + 0.1 }}
      >
        <div style={{ width: 1, height: 10, background: "#86868B" }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#86868B",
            letterSpacing: "0.05em",
          }}
        >
          ↩ loops back to Hardware
        </span>
      </motion.div>
    </div>
  );
}

// ── Public export ──────────────────────────────────────────────────────────
export default function FlywheelDiagram() {
  const width = useWindowWidth();
  const isDesktop = width >= 768;

  return (
    <div>
      <p className="text-center text-xs font-medium tracking-[0.15em] uppercase text-[#86868B] mb-8">
        The Apple Flywheel
      </p>
      {isDesktop ? <DesktopFlywheel /> : <MobileFlywheel />}
    </div>
  );
}
