const KEY = 'neon-bay-save-v1';
export function loadGame() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } }
export function saveGame(state) { try { localStorage.setItem(KEY, JSON.stringify({ mission: state.mission, money: state.money, health: state.player.health, x: state.player.x, y: state.player.y })); } catch {} }
export function clearSave() { localStorage.removeItem(KEY); }
