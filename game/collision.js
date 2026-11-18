import { clamp } from './config.js';

// Match the solid roof rectangles drawn by city.js; parks and beach blocks are open.
export const buildings = [];
for (let x=0;x<7;x++) for (let y=0;y<6;y++) {
  if ((x===6 && y<4) || (x+y*3)%9===0) continue;
  buildings.push({x:x*400+103,y:y*400+103,w:185,h:182});
}
export function blocked(x,y,r=25) {
  return buildings.some(b => x+r>b.x && x-r<b.x+b.w && y+r>b.y && y-r<b.y+b.h);
}
export function moveCar(car,dx,dy) {
  let hit=false;
  // Small steps prevent tunnelling even during a slow frame.
  const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/8));
  for(let i=0;i<steps;i++) {
    const x=clamp(car.x+dx/steps,25,3175), y=clamp(car.y+dy/steps,25,2375);
    if(!blocked(x,car.y)) car.x=x; else hit=true;
    if(!blocked(car.x,y)) car.y=y; else hit=true;
  }
  return hit;
}
export function separateCars(a,b) {
  const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);
  if(d>=48)return false;
  const nx=d?dx/d:1,ny=d?dy/d:0,push=(48-d)/2;
  moveCar(a,-nx*push,-ny*push);moveCar(b,nx*push,ny*push);
  return true;
}
