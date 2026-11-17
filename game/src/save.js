const key='neon-bay-save';
export function save(s) {
  try {
    localStorage.setItem(key,JSON.stringify( {
      mission:s.mission,cash:s.cash,health:s.health,x:s.player.x,y:s.player.y
    }
    ))
  }
  catch {
  }
}
export function load() {
  try {
    return JSON.parse(localStorage.getItem(key))
  }
  catch {
    return null
  }
}
export function clear() {
  try {
    localStorage.removeItem(key)
  }
  catch {
  }
}
