import { createInput } from './input.js';
import { createAudio } from './audio.js';
import { createPlayer, updatePlayer } from './player.js';
import { createTraffic, updateTraffic } from './traffic.js';
import { createPedestrians, updatePedestrians } from './pedestrians.js';
import { updatePolice } from './police.js';
import { missions, updateMission, resetEncounter } from './missions.js';
import { renderWorld } from './render.js';
import { drawHud } from './hud.js';
import { loadGame, saveGame, clearSave } from './save.js';
import { stage } from './staging.js';
import { distance } from './config.js';

const canvas=document.querySelector('#world'),ctx=canvas.getContext('2d'),overlay=document.querySelector('#overlay'),input=createInput(canvas),audio=createAudio();
let state,playing=false,last=0,saveClock=0;
function makeState(saved){const s={player:createPlayer(saved),cars:createTraffic(),people:createPedestrians(),police:[],bullets:[],enemies:[],pickups:[],missionPhase:'',missionTimer:0,arrestTime:0,busted:0,shake:0,zoom:1,missions,mission:saved?.mission??0,money:saved?.money??250,wanted:0,escape:0,audio,message:'',messageTime:0};s.crime=(n)=>{if(s.people.some(p=>p.health>0&&distance(p,s.player)<230)||s.police.some(p=>distance(p,s.player)<350)){s.wanted=Math.min(5,s.wanted+n);s.escape=0;}};return s;}
function start(saved){state=makeState(saved);resetEncounter(state);playing=true;overlay.innerHTML='';audio.unlock();}
function menu(){playing=false;const saved=loadGame();state=makeState(saved);overlay.innerHTML=`<div class="menu"><div class="menu-inner"><div class="eyebrow">A SUN-SOAKED CITY OF SECRETS</div><div class="title">NEON<br><span>BAY.</span></div><div class="subtitle">The Sol Vega Files</div><div class="buttons"><button id="new">NEW GAME</button><button class="secondary" id="continue">CONTINUE</button></div><div class="menu-grid"><div><h3>HOW TO PLAY</h3><p>WASD / ARROWS — MOVE & DRIVE<br>E — ENTER / EXIT VEHICLE<br>MOUSE — AIM & FIRE<br>SPACE — PUNCH &nbsp; / &nbsp; R — RELOAD</p><p>Find the gold marker. Watch for witnesses.<br>Lose the heat by staying out of sight.</p></div><div><h3>THE SOL VEGA FILES</h3><ol>${missions.map((m,i)=>`<li class="${i<(saved?.mission??0)?'done':''}">${m.name} ${i<(saved?.mission??0)?'✓':''}</li>`).join('')}</ol></div></div></div></div>`;document.querySelector('#new').onclick=()=>{clearSave();start(null);};document.querySelector('#continue').onclick=()=>start(saved);}
function frame(t){const dt=Math.min((t-last)/1000||0,.05);last=t;canvas.width=innerWidth;canvas.height=innerHeight;if(playing){if(state.busted>0)state.busted-=dt;else{updatePlayer(state,input,dt);updateTraffic(state.cars,dt,state.player,state);updatePedestrians(state.people,dt,state.player);updatePolice(state,dt);if(!state.busted)updateMission(state,dt);}state.shake=Math.max(0,state.shake-dt);state.zoom+=( (state.player.car?1-Math.min(Math.abs(state.player.speed)/260,1)*.17:1)-state.zoom)*Math.min(1,dt*3);state.messageTime-=dt;audio.update(t,!!state.player.car,state.wanted);saveClock+=dt;if(saveClock>5){saveGame(state);saveClock=0;}if(state.player.health<=0){state.player.health=100;state.player.x=1200;state.player.y=800;state.player.car=null;state.player.speed=0;state.wanted=0;state.police=[];state.bullets=[];resetEncounter(state);state.money=Math.max(0,state.money-200);state.message='BACK ON YOUR FEET  −$200';state.messageTime=4;}}renderWorld(ctx,state,canvas.width,canvas.height);if(playing)drawHud(ctx,state,canvas.width,canvas.height);input.end();requestAnimationFrame(frame);}
menu();const scene=new URLSearchParams(location.search).get('scene');if(stage(state,scene)){playing=true;overlay.innerHTML='';}requestAnimationFrame(frame);
