import React from "react";
import { C } from "../theme";
import { Star } from "./Brand";

const STARS = [
  { x: 40, y: 30, r: 1.2, d: 0 }, { x: 80, y: 18, r: 1, d: 1.1 },
  { x: 140, y: 40, r: 1.4, d: 0.4 }, { x: 190, y: 22, r: 1, d: 1.6 },
  { x: 230, y: 50, r: 1.2, d: 0.8 }, { x: 280, y: 26, r: 1, d: 2.0 },
  { x: 360, y: 64, r: 1.3, d: 0.2 }, { x: 110, y: 64, r: 1, d: 1.3 },
  { x: 300, y: 60, r: 1.1, d: 0.6 }, { x: 60, y: 56, r: 1, d: 1.8 },
];

function Palm({ x, y, flip }) {
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -1 : 1},1)`}>
      <path d="M0 0 q-3 -26 4 -44" fill="none" stroke="#0A1430" strokeWidth="4" />
      <path d="M4 -44 q-18 -6 -26 4 q16 -2 26 4 z" />
      <path d="M4 -44 q18 -6 26 4 q-16 -2 -26 4 z" />
      <path d="M4 -44 q-8 -18 -22 -22 q12 8 18 22 z" />
      <path d="M4 -44 q8 -18 22 -22 q-12 8 -18 22 z" />
    </g>
  );
}

// A whimsical, generic fairground skyline: ferris wheel, coaster loop, a
// slender spire, a rocket (Space Coast nod) and palms under a Florida
// twilight. Every shape is original — no castle silhouette, no characters.
export default function SkylineScene({ style }) {
  return (
    <svg style={style} viewBox="0 0 400 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="ob-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navyDeep} />
          <stop offset="0.55" stopColor={C.indigo} />
          <stop offset="0.85" stopColor="#5b3a6e" />
          <stop offset="1" stopColor={C.coral} />
        </linearGradient>
        <radialGradient id="ob-glow" cx="0.5" cy="1" r="0.7">
          <stop offset="0" stopColor={C.amber} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.amber} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="170" fill="url(#ob-sky)" />
      <ellipse cx="200" cy="170" rx="240" ry="80" fill="url(#ob-glow)" />

      {STARS.map((s, i) => (
        <circle key={i} className="twinkle" style={{ animationDelay: `${s.d}s` }}
          cx={s.x} cy={s.y} r={s.r} fill={C.star} />
      ))}

      {/* crescent moon */}
      <g transform="translate(330,34)">
        <circle r="13" fill={C.star} opacity=".95" />
        <circle r="13" cx="6" cy="-3" fill={C.indigo} />
      </g>

      <g fill="#0A1430">
        <Palm x={26} y={150} />

        {/* ferris wheel */}
        <g transform="translate(96,150)">
          <line x1="0" y1="0" x2="0" y2="-58" stroke="#0A1430" strokeWidth="3" />
          <circle cx="0" cy="-58" r="34" fill="none" stroke="#0A1430" strokeWidth="3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (Math.PI / 4) * i;
            return <line key={i} x1="0" y1="-58" x2={34 * Math.cos(a)} y2={-58 + 34 * Math.sin(a)} stroke="#0A1430" strokeWidth="2" />;
          })}
          <circle cx="0" cy="-58" r="4" fill={C.amber} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (Math.PI / 4) * i;
            return <circle key={i} cx={34 * Math.cos(a)} cy={-58 + 34 * Math.sin(a)} r="2.4" fill={C.amber} />;
          })}
        </g>

        {/* coaster loop */}
        <path d="M150 150 q22 -70 44 0 a18 18 0 1 1 18 -28 q14 28 36 28" fill="none" stroke="#0A1430" strokeWidth="3" />

        {/* slender spire */}
        <g transform="translate(250,150)">
          <rect x="-7" y="-56" width="14" height="56" />
          <polygon points="0,-86 9,-56 -9,-56" />
          <rect x="-7" y="-44" width="14" height="3" fill={C.indigo} />
          <line x1="0" y1="-86" x2="0" y2="-94" stroke="#0A1430" strokeWidth="2" />
          <path d="M0 -94 L0 -100 L9 -97 L0 -95 Z" fill={C.coral} />
          <g className="pulse"><Star cx={0} cy={-92} r={3} fill={C.amber} /></g>
        </g>

        {/* rocket */}
        <g transform="translate(312,150)">
          <rect x="-4" y="-44" width="8" height="36" rx="4" />
          <polygon points="0,-58 5,-44 -5,-44" fill={C.coral} />
          <polygon points="-4,-8 -10,2 -4,-2" />
          <polygon points="4,-8 10,2 4,-2" />
          <circle cx="0" cy="-34" r="2.4" fill={C.amber} />
        </g>

        <Palm x={372} y={150} flip />
      </g>
    </svg>
  );
}
