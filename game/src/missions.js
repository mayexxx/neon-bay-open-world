import {
  dist
}
from './config.js';
import {
  consume
}
from './input.js';
import {
  tone
}
from './audio.js';
import {
  save
}
from './save.js';
export const missions=[ {
  name:'A favor in the sun',text:'Meet Sol Vega at the palms',x:600,y:600,reward:200,beat:'SOL: The waterfront is being sold from under us. I need a driver.'
}
, {
  name:'Borrowed wheels',text:'Bring a car to the marina',x:2450,y:1000,reward:350,beat:'SOL: Good. Now we can move without asking permission.',car:true
}
, {
  name:'Paper trail',text:'Find the ledger in Old Town',x:1000,y:1800,reward:450,beat:'SOL: Those names are the whole story. Keep them safe.'
}
, {
  name:'Heat on the harbor',text:'Reach the harbor lookout',x:2450,y:2200,reward:600,beat:'SOL: They know we have it. Keep moving.',heat:2
}
, {
  name:'The handoff',text:'Deliver the evidence to the park',x:600,y:1400,reward:750,beat:'SOL: One last stop and the city gets the truth.'
}
, {
  name:'Signal fire',text:'Take the story to the broadcast tower',x:1800,y:400,reward:1200,beat:'SOL: We did it. Neon Bay belongs to its people again.'
}
];
export function updateMission(s) {
  let m=missions[s.mission];
  if(!m)return;
  if(dist(s.player,m)<65&&consume('KeyE')) {
    if(m.car&&!s.player.car) {
      s.notice='Bring a car to complete this job.';
      s.noticeTime=3;
      return
    }
    s.cash+=m.reward;
    s.notice=m.beat+'  +$'+m.reward;
    s.noticeTime=7;
    s.mission++;
    if(m.heat)s.wanted=Math.max(s.wanted,m.heat);
    tone(660,.2);
    save(s)
  }
}
export function drawMarker(c,s,t) {
  let m=missions[s.mission];
  if(!m)return;
  c.strokeStyle='#ffe478';
  c.lineWidth=4;
  c.beginPath();
  c.arc(m.x,m.y,24+Math.sin(t*4)*4,0,7);
  c.stroke();
  c.fillStyle='#ffe47888';
  c.beginPath();
  c.arc(m.x,m.y,19,0,7);
  c.fill();
  c.fillStyle='#fff';
  c.font='bold 18px Arial';
  c.textAlign='center';
  c.fillText('★',m.x,m.y+6);
  c.textAlign='left'
}
