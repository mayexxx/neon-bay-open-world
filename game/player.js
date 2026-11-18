import { clamp, distance, WORLD } from './config.js';
import { moveCar, blocked } from './collision.js';
export function createPlayer(saved){return {x:saved?.x??1220,y:saved?.y??840,angle:0,health:saved?.health??100,ammo:24,car:null,speed:0,cooldown:0};}
export function updatePlayer(s,input,dt){const p=s.player,k=input.keys;let dx=(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0),dy=(k.has('KeyS')||k.has('ArrowDown')?1:0)-(k.has('KeyW')||k.has('ArrowUp')?1:0);p.cooldown=Math.max(0,p.cooldown-dt);
  if(input.pressed.has('KeyE')){if(p.car){for(const side of [1,-1]){const x=p.x+Math.cos(p.angle+Math.PI/2)*48*side,y=p.y+Math.sin(p.angle+Math.PI/2)*48*side;if(!blocked(x,y,10)){p.x=x;p.y=y;break;}}p.car=null;p.speed=0;}else{const car=s.cars.find(c=>distance(c,p)<65);if(car){p.car=car;p.angle=car.angle;car.traffic=false;s.crime(1);}}}
  if(p.car){p.speed=clamp(p.speed+(-dy*230-p.speed*1.1)*dt,-100,260);p.angle+=dx*dt*2.3*clamp(Math.abs(p.speed)/80,0,1)*(p.speed<0?-1:1);const hit=moveCar(p,Math.cos(p.angle)*p.speed*dt,Math.sin(p.angle)*p.speed*dt);if(hit){if(Math.abs(p.speed)>70)s.shake=Math.max(s.shake,.2);p.speed*=.35;}Object.assign(p.car,{x:p.x,y:p.y,angle:p.angle});}else{const length=Math.hypot(dx,dy)||1;p.x+=dx/length*145*dt;p.y+=dy/length*145*dt;if(dx||dy)p.angle=Math.atan2(dy,dx);}
  p.x=clamp(p.x,20,WORLD.width-20);p.y=clamp(p.y,20,WORLD.height-20);
  if(input.pressed.has('KeyR'))p.ammo=24;
  if((input.mouse.down||input.pressed.has('Space'))&&p.cooldown<=0){p.cooldown=input.mouse.down?.24:.5;if(input.mouse.down&&p.ammo>0){p.ammo--;s.audio.shot();s.crime(1);const a=Math.atan2(input.mouse.y-innerHeight/2,input.mouse.x-innerWidth/2);s.bullets.push({x:p.x,y:p.y,vx:Math.cos(a)*650,vy:Math.sin(a)*650,life:1,owner:'player'});}else if(input.pressed.has('Space')){for(const person of s.people)if(distance(person,p)<48){person.health-=50;s.crime(1);}}}
}
