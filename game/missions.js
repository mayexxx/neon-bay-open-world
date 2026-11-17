import { distance } from './config.js';
import { saveGame } from './save.js';
export const missions=[
  {name:'A favor in the sun',objective:'Meet Luma at the corner café',x:1600,y:800},
  {name:'Borrowed wheels',objective:'Find a car and drive to the garage',x:2000,y:1200,car:true},
  {name:'Paper trail',objective:'Collect the ledger in Old Town',x:600,y:600},
  {name:'Heat on the harbor',objective:'Reach the warehouse and shake the heat',x:1600,y:2000},
  {name:'The handoff',objective:'Deliver the ledger to the marina',x:2600,y:800},
  {name:'Signal fire',objective:'Reach the signal at the north pier',x:2760,y:400}
];
export function updateMission(s){const m=missions[s.mission];if(!m)return;if(distance(s.player,m)<65&&(!m.car||s.player.car)){s.mission++;s.money+=500;s.wanted=0;s.police=[];s.message=s.mission===6?'THE SOL VEGA FILES COMPLETE':'MISSION COMPLETE  +$500';s.messageTime=4;s.audio.mission();saveGame(s);}}
