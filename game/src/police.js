import {
  dist
}
from './config.js';
import {
  tone
}
from './audio.js';
export function updatePolice(s,dt) {
  if(s.wanted&&s.police.length<Math.min(1+s.wanted,5)) {
    let p=s.player;
    s.police.push( {
      x:p.x-350-Math.random()*200,y:p.y+100,angle:0,speed:0,police:true
    }
    )
  }
  for(const c of s.police) {
    let p=s.player,angle=Math.atan2(p.y-c.y,p.x-c.x),diff=Math.atan2(Math.sin(angle-c.angle),Math.cos(angle-c.angle));
    c.angle+=Math.max(-2,Math.min(2,diff))*dt;
    c.speed+=(175-c.speed)*dt;
    c.x+=Math.cos(c.angle)*c.speed*dt;
    c.y+=Math.sin(c.angle)*c.speed*dt;
    if(dist(c,p)<35) {
      s.health-=dt*(p.car?5:15);
      if(p.car)p.car.speed*=.98
    }
  }
  if(s.health<=0) {
    s.cash=Math.max(0,s.cash-150);
    s.health=100;
    s.wanted=0;
    s.police=[];
    s.player.car=null;
    s.player.x=600;
    s.player.y=600;
    s.notice='BUSTED  ·  $150 release fee';
    s.noticeTime=5;
    tone(120,.4)
  }
}
