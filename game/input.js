export function createInput(canvas) {
  const keys = new Set(), pressed = new Set(), mouse = { x: 0, y: 0, down: false };
  addEventListener('keydown', e => { if (!keys.has(e.code)) pressed.add(e.code); keys.add(e.code); if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault(); });
  addEventListener('keyup', e => keys.delete(e.code));
  addEventListener('blur', () => { keys.clear(); mouse.down = false; });
  canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener('mousedown', () => mouse.down = true);
  addEventListener('mouseup', () => mouse.down = false);
  return { keys, pressed, mouse, end() { pressed.clear(); } };
}
