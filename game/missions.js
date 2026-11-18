import { distance } from './config.js';
import { saveGame } from './save.js';
export const missions=[
  {name:'A favor in the sun',objective:'Meet Luma at the corner café',x:1600,y:800},
  {name:'Borrowed wheels',objective:'Find a car and drive to the garage',x:2000,y:1200,car:true},
  {name:'Paper trail',objective:'Collect the ledger in Old Town',x:600,y:600},
  {name:'Heat on the harbor',objective:'Reach the warehouse',x:1600,y:2000,encounter:true},
  {name:'The handoff',objective:'Reach the marina to start the delivery',x:2600,y:800,delivery:true},
  {name:'Signal fire',objective:'Reach the signal at the north pier',x:2760,y:400}
];
function spawn(s,m){s.enemies=[[-95,-40],[95,-45],[0,105]].map(([x,y],i)=>({x:m.x+x,y:m.y+y,health:3,shot:1+i*.45}));}
export function resetEncounter(s){s.enemies=[];s.missionPhase='';s.missionTimer=0;missions[3].objective='Reach the warehouse';missions[4].objective='Reach the marina to start the delivery';}
export function updateMission(s,dt){const m=missions[s.mission];if(!m)return;
  if(m.encounter&&s.missionPhase==='fight'){m.objective=`Clear the warehouse guards (${s.enemies.length} left)`;if(!s.enemies.length)complete(s);return;}
  if(m.delivery&&s.missionPhase==='delivery'){s.missionTimer-=dt;m.objective=`Deliver to the north pier: ${Math.max(0,Math.ceil(s.missionTimer))}s`;if(s.missionTimer<=0){resetEncounter(s);m.objective='Delivery missed — return to the marina';s.message='DELIVERY FAILED — TRY AGAIN';s.messageTime=4;}else if(distance(s.player,{x:2760,y:400})<65)complete(s);return;}
  if(m.delivery&&s.missionPhase==='fight'){m.objective=`Defeat the rival crew (${s.enemies.length} left)`;if(!s.enemies.length){s.missionPhase='delivery';s.missionTimer=90;s.message='DELIVER THE LEDGER TO THE NORTH PIER';s.messageTime=4;}return;}
  if(distance(s.player,m)<65&&(!m.car||s.player.car)){if(m.encounter||m.delivery){s.missionPhase='fight';spawn(s,m);s.message=m.delivery?'RIVAL CREW!':'WAREHOUSE AMBUSH!';s.messageTime=3;}else complete(s);}
}
function complete(s){s.mission++;s.money+=500;s.wanted=0;s.police=[];resetEncounter(s);s.message=s.mission===6?'THE SOL VEGA FILES COMPLETE':'MISSION COMPLETE  +$500';s.messageTime=4;s.audio.mission();saveGame(s);}
export function missionTarget(s){return s.mission===4&&s.missionPhase==='delivery'?{x:2760,y:400}:missions[s.mission];}
