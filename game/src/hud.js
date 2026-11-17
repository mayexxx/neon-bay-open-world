import {
  missions
}
from './missions.js';
export function drawHud(c,s,w,h) {
  let m=missions[s.mission];
  c.save();
  c.textAlign='left';
  c.fillStyle='#12363cdd';
  c.beginPath();
  c.roundRect(24,24,330,86,8);
  c.fill();
  c.fillStyle='#80dfcd';
  c.font='bold 10px Arial';
  c.fillText('SOL VEGA  /  THE WATERFRONT FILES',42,46);
  c.fillStyle='#fff';
  c.font='bold 18px Arial';
  c.fillText(m?m.name.toUpperCase():'THE STORY IS YOURS',42,69);
  c.font='13px Arial';
  c.fillStyle='#d3e9de';
  c.fillText(m?m.text+'  ·  E':'Explore Neon Bay',42,92);
  c.textAlign='right';
  c.fillStyle='#fff';
  c.font='bold 25px Arial';
  c.fillText('$'+s.cash.toLocaleString(),w-28,48);
  c.fillStyle='#ffdf70';
  c.font='22px Arial';
  c.fillText('★'.repeat(s.wanted)+'☆'.repeat(5-s.wanted),w-28,76);
  c.fillStyle='#193b40dd';
  c.fillRect(w-170,88,142,7);
  c.fillStyle='#f2786c';
  c.fillRect(w-170,88,142*s.health/100,7);
  c.font='10px Arial';
  c.fillStyle='#fff';
  c.fillText('HEALTH',w-177,95);
  let x=25,y=h-171;
  c.fillStyle='#173b40ee';
  c.beginPath();
  c.roundRect(x,y,180,145,8);
  c.fill();
  c.save();
  c.beginPath();
  c.roundRect(x+8,y+8,164,112,4);
  c.clip();
  c.fillStyle='#d8d3a5';
  c.fillRect(x+8,y+8,164,112);
  c.fillStyle='#81c9bd';
  c.fillRect(x+145,y+8,28,112);
  c.strokeStyle='#8b9690';
  c.lineWidth=5;
  for(let i=0;i<7;i++) {
    let p=i*400/3200;
    c.beginPath();
    c.moveTo(x+8+p*164,y+8);
    c.lineTo(x+8+p*164,y+120);
    c.moveTo(x+8,y+8+p*112);
    c.lineTo(x+172,y+8+p*112);
    c.stroke()
  }
  if(m) {
    c.fillStyle='#f7d768';
    c.beginPath();
    c.arc(x+8+m.x/3200*164,y+8+m.y/3200*112,4,0,7);
    c.fill()
  }
  c.fillStyle='#fff';
  c.beginPath();
  c.arc(x+8+s.player.x/3200*164,y+8+s.player.y/3200*112,4,0,7);
  c.fill();
  for(const p of s.police) {
    c.fillStyle='#e76461';
    c.fillRect(x+8+p.x/3200*164,y+8+p.y/3200*112,3,3)
  }
  c.restore();
  c.fillStyle='#fff';
  c.textAlign='left';
  c.font='bold 10px Arial';
  c.fillText('NEON BAY',x+10,y+136);
  c.textAlign='right';
  c.fillStyle='#9ed7ca';
  c.fillText('N ↑',x+167,y+136);
  c.textAlign='left';
  c.fillStyle='#173b40dd';
  c.beginPath();
  c.roundRect(220,h-82,180,56,6);
  c.fill();
  c.fillStyle='#fff';
  c.font='bold 14px Arial';
  c.fillText(s.player.car?Math.round(Math.abs(s.player.car.speed))+' KM/H':'ON FOOT  ·  '+s.ammo+' ROUNDS',235,h-49);
  c.font='10px Arial';
  c.fillStyle='#a8d2c8';
  c.fillText(s.player.car?'E  EXIT VEHICLE':'E  ENTER VEHICLE',235,h-34);
  if(s.noticeTime>0) {
    c.textAlign='center';
    c.font='bold 14px Arial';
    c.fillStyle='#16373be9';
    c.fillRect(w/2-300,h-110,600,42);
    c.fillStyle='#fff3c0';
    c.fillText(s.notice,w/2,h-84)
  }
  c.restore()
}
