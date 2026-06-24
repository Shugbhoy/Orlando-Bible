import React from "react";
import { C } from "../theme";

// Five-point star generator used across the brand + skyline.
export function Star({ cx, cy, r, fill }) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
}

// Original logo mark: a slender fairytale spire + star in a rounded badge.
// Deliberately NOT a castle/ears/globe — no third-party IP.
export function Mark({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" aria-hidden="true">
      <rect x="1" y="1" width="44" height="44" rx="13" fill={C.teal} />
      <rect x="1" y="1" width="44" height="44" rx="13" fill="url(#ob-mark-grad)" opacity=".5" />
      <defs>
        <linearGradient id="ob-mark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2bd0bd" />
          <stop offset="1" stopColor={C.teal} />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="6" height="15" fill="#fff" rx="1" />
      <polygon points="23,9 27,21 19,21" fill={C.amber} />
      <path d="M23 9 L23 5 L29 6.5 L23 8 Z" fill={C.coral} />
      <Star cx={23} cy={6} r={2.2} fill={C.star} />
      <circle cx="13" cy="33" r="1.4" fill={C.amber} />
      <circle cx="33" cy="31" r="1.2" fill={C.star} />
    </svg>
  );
}
