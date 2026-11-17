export const WORLD = { width: 3200, height: 2400, road: 140, grid: 400 };
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const colors = ['#f2bc68', '#e98672', '#7db9b3', '#d9e0d0', '#527a83', '#ecdbc0'];
export function random(seed) { let n = seed; return () => { n = (n * 1664525 + 1013904223) >>> 0; return n / 4294967296; }; }
