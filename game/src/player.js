import {
  keys,consume,mouse
}
from './input.js';
import {
  clamp,dist,SIZE
}
from './config.js';
import {
  tone
}
from './audio.js';
export function updatePlayer(s,dt) {
  let p=s.player;
  if(consume('KeyE')) {
    if(p.car) {
      p.x=p.car.x+35;
      p.y=p.car.y+25;
      p.car.speed=0;
      p.car=null;
      tone(220)
    }
    else {
      let car=s.cars.find(c=>dist(c,p)<58);
      if(car) {
        p.car=car;
        car.traffic=false;
        car.speed=0;
        s.wanted=Math.max(s.wanted,1);
        s.notice='Vehicle acquired. The police noticed.';
        s.noticeTime=3;
        tone(330)
      }
    }
  }
  let up=keys.KeyW||keys.ArrowUp,down=keys.KeyS||keys.ArrowDown,left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight;
  if(p.car) {
    let c=p.car;
    c.speed+=((up?160:0)-(down?120:0)-c.speed*.8)*dt;
    c.speed=clamp(c.speed,-100,240);
    c.angle+=((right?1:0)-(left?1:0))*dt*2.4*clamp(Math.abs(c.speed)/60,0,1)*(c.speed<0?-1:1);
    c.x=clamp(c.x+Math.cos(c.angle)*c.speed*dt,20,SIZE-20);
    c.y=clamp(c.y+Math.sin(c.angle)*c.speed*dt,20,SIZE-20);
    p.x=c.x;
    p.y=c.y
  }
  else {
    let dx=(right?1:0)-(left?1:0),dy=(down?1:0)-(up?1:0),len=Math.hypot(dx,dy)||1;
    p.x=clamp(p.x+dx/len*150*dt,10,SIZE-10);
    p.y=clamp(p.y+dy/len*150*dt,10,SIZE-10);
    p.angle=Math.atan2(mouse.y-innerHeight/2,mouse.x-innerWidth/2);
    if(consume('Space')) {
      tone(120,.1,'square');
      for(const q of s.peds)if(dist(p,q)<45) {
        q.x+=40;
        s.wanted=Math.max(s.wanted,1)
      }
    }
    if(mouse.down&&s.cooldown<=0&&s.ammo>0) {
      s.ammo--;
      s.cooldown=.24;
      s.flash=.1;
      tone(150,.08,'sawtooth');
      s.wanted=Math.max(s.wanted,1);
      for(const cop of s.police)if(dist(p,cop)<260&&Math.abs(Math.atan2(Math.sin(Math.atan2(cop.y-p.y,cop.x-p.x)-p.angle),Math.cos(Math.atan2(cop.y-p.y,cop.x-p.x)-p.angle)))<.25) {
        cop.x+=50;
        cop.y+=30
      }
    }
  }
  s.cooldown-=dt;
  s.flash-=dt
}
export function drawPlayer(c,p,s) {
  if(p.car)return;
  c.save();
  c.translate(p.x,p.y);
  c.rotate(p.angle);
  c.fillStyle='#18383266';
  c.beginPath();
  c.ellipse(3,5,11,8,0,0,7);
  c.fill();
  c.strokeStyle='#ffffff';
  c.lineWidth=3;
  c.beginPath();
  c.arc(0,0,13,0,7);
  c.stroke();
  c.fillStyle='#f4d86c';
  c.beginPath();
  c.arc(0,0,9,0,7);
  c.fill();
  c.fillStyle='#a45d42';
  c.beginPath();
  c.arc(2,0,5,0,7);
  c.fill();
  c.fillStyle='#24404a';
  c.fillRect(4,-3,13,5);
  if(s.flash>0) {
    c.fillStyle='#fff4ac';
    c.beginPath();
    c.arc(21,0,6,0,7);
    c.fill()
  }
  c.restore()
}
