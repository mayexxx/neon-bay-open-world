// Compose fixed scenes for the store screenshots without advancing simulation.
export function stageShot(name, state) {
  state.screen = name === 'start' ? 'title' : 'play';
  if (name === 'start') return;

  const player = state.player;
  if (name === 'foot') {
    state.mission = 2;
    Object.assign(player, { x: 1100, y: 1800, angle: 0 });
    Object.assign(state.cars[0], {
      x: 1180, y: 1800, angle: 0, speed: 0,
      traffic: false, color: '#ef826e'
    });
    state.peds.push(
      { x: 1060, y: 1755, dir: 1, color: '#f2bb9a' },
      { x: 1140, y: 1750, dir: 1, color: '#dd7661' },
      { x: 1040, y: 1840, dir: 1, color: '#345b68' }
    );
  } else {
    const chase = name === 'chase';
    state.mission = chase ? 3 : 1;
    Object.assign(player, { x: chase ? 2510 : 1200, y: chase ? 2200 : 1000 });
    const car = state.cars[0];
    Object.assign(car, {
      x: player.x, y: player.y, angle: 0, speed: 150,
      traffic: false, color: '#e97860'
    });
    player.car = car;
    state.wanted = chase ? 4 : 3;
    state.police = [
      { x: player.x - 85, y: player.y - 28, angle: 0.15, speed: 175, police: true },
      { x: player.x - 145, y: player.y + 30, angle: -0.12, speed: 175, police: true }
    ];
  }
  state.camera.x = player.x;
  state.camera.y = player.y;
}
