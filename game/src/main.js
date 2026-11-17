import {
  makeTraffic,makePeds,updateTraffic,drawCar,drawPed
}
from './traffic.js';
import {
  drawCity
}
from './city.js';
import {
  updatePlayer,drawPlayer
}
from './player.js';
import {
  updatePolice
}
from './police.js';
import {
  updateMission,drawMarker,missions
}
from './missions.js';
import {
  drawHud
}
from './hud.js';
import {
  consume
}
from './input.js';
import {
  toggle,ambience,tone
}
from './audio.js';
import {
  save,load,clear
}
from './save.js';
import {
  stageShot
}
from './shots.js';
const canvas=document.querySelector('canvas'),c=canvas.getContext('2d');
let s,last=0;
const overlay=document.querySelector('#overlay'),pause=document.querySelector('#pause');
function fresh() {
  return {
    screen:'title',player: {
      x:600,y:700,angle:0,car:null
    }
    ,camera: {
      x:600,y:700
    }
    ,cars:makeTraffic(),peds:makePeds(),police:[],wanted:0,health:100,cash:0,ammo:60,mission:0,cooldown:0,flash:0,notice:'',noticeTime:0
  }
}
function start(continuing) {
  s=fresh();
  if(continuing) {
    let d=load();
    if(d) {
      s.mission=d.mission||0;
      s.cash=d.cash||0;
      s.health=d.health||100;
      s.player.x=d.x||600;
      s.player.y=d.y||700;
      s.camera.x=s.player.x;
      s.camera.y=s.player.y
    }
  }
  else clear();
  s.screen='play';
  overlay.style.display='none';
  pause.style.display='none';
  tone(440,.15)
}
document.querySelector('#new').onclick=()=>start(false);
document.querySelector('#continue').onclick=()=>start(true);
document.querySelector('#mute').onclick=toggle;
s=fresh();
let shot=new URLSearchParams(location.search).get('shot');
if(shot) {
  stageShot(shot,s);
  if(s.screen==='play')overlay.style.display='none'
}
function frame(t) {
  let dt=Math.min((t-last)/1000||0,.04);
  last=t;
  let w=canvas.width=innerWidth,h=canvas.height=innerHeight;
  if(consume('KeyM'))toggle();
  if(consume('KeyL')&&s.screen==='play') {
    s.notice=missions.map((m,i)=>(i<s.mission?'✓ ':i===s.mission?'→ ':'· ')+m.name).join('   /   ');
    s.noticeTime=8
  }
  if(consume('Escape')&&s.screen!=='title') {
    s.screen=s.screen==='pause'?'play':'pause';
    pause.style.display=s.screen==='pause'?'grid':'none';
    if(s.screen==='pause')save(s)
  }
  if(s.screen==='play'&&!shot) {
    updateMission(s);
    updatePlayer(s,dt);
    updateTraffic(s,dt);
    updatePolice(s,dt);
    s.noticeTime-=dt;
    s.camera.x+=(s.player.x-s.camera.x)*Math.min(1,dt*4);
    s.camera.y+=(s.player.y-s.camera.y)*Math.min(1,dt*4);
    ambience(s,t/1000)
  }
  c.fillStyle='#83cfbf';
  c.fillRect(0,0,w,h);
  c.save();
  c.translate(w/2-s.camera.x,h/2-s.camera.y);
  drawCity(c);
  drawMarker(c,s,t/1000);
  for(const p of s.peds)drawPed(c,p);
  for(const car of s.cars)drawCar(c,car);
  for(const car of s.police)drawCar(c,car);
  drawPlayer(c,s.player,s);
  c.restore();
  if(s.screen!=='title')drawHud(c,s,w,h);
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame);
setInterval(()=> {
  if(s.screen==='play'&&!shot)save(s)
}
,10000);
