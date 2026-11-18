import { colors, random, WORLD, distance } from './config.js';
import { moveCar, separateCars } from './collision.js';
export function createTraffic() { const rnd=random(77), cars=[]; for(let i=0;i<28;i++){const horizontal=i%2===0;cars.push({x:horizontal?rnd()*2700:Math.floor(rnd()*7)*400+30,y:horizontal?Math.floor(rnd()*6)*400+30:rnd()*2300,angle:horizontal?0:Math.PI/2,speed:55+rnd()*30,color:colors[i%colors.length], traffic:true});} return cars; }
export function updateTraffic(cars,dt,player,state){for(const c of cars){if(c===player.car)continue;if(c.traffic){if(moveCar(c,Math.cos(c.angle)*c.speed*dt,Math.sin(c.angle)*c.speed*dt))c.speed=0;if(c.x>=2790&&Math.cos(c.angle)>.5)c.x=25;if(c.y>=2370&&Math.sin(c.angle)>.5)c.y=25;if(distance(c,player)<48 && !player.car)c.speed=Math.max(0,c.speed-100*dt);else c.speed=Math.min(75,c.speed+12*dt);}}
  for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++){const a=cars[i],b=cars[j];if(separateCars(a,b)){if(a===player.car||b===player.car){if(Math.abs(player.speed)>70)state.shake=Math.max(state.shake,.16);player.speed*=.65;}if(a.traffic)a.speed*=.8;if(b.traffic)b.speed*=.8;}}
  if(player.car){player.x=player.car.x;player.y=player.car.y;}
  for(const c of cars)for(const ped of state.people)if(ped.health>0&&!ped.fallen&&distance(c,ped)<30&&Math.abs(c===player.car?player.speed:c.speed)>35){ped.fallen=5;ped.dir*=-1;if(c===player.car){state.wanted=Math.min(5,state.wanted+1);state.escape=0;state.message='HIT AND RUN  •  WITNESSES CALLED IT IN';state.messageTime=3;}}
}
