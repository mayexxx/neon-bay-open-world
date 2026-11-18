import { random, distance } from './config.js';
export function createPedestrians(){const rnd=random(45), people=[];for(let i=0;i<40;i++)people.push({x:100+rnd()*2500,y:Math.floor(rnd()*6)*400+95,dir:rnd()>.5?1:-1,color:['#e99483','#f4d1a4','#71b7b0','#f5ece0'][i%4],health:100});return people;}
export function updatePedestrians(people,dt,player){for(const p of people){if(p.health<=0)continue;if(p.fallen>0){p.fallen-=dt;continue;}const near=distance(p,player)<130;p.x+=p.dir*(near?75:23)*dt;if(p.x<90||p.x>2700)p.dir*=-1;}}
