import { WORLD, random } from './config.js';
export const districts = ['DOWNTOWN','OLD TOWN','MARINA & BEACH','THE HARBOR'];
export function district(x,y) { return y > 1600 ? 'THE HARBOR' : x > 2200 ? 'MARINA & BEACH' : x < 1050 ? 'OLD TOWN' : 'DOWNTOWN'; }
export function drawCity(ctx) {
  const { width:w,height:h,grid:g,road:r } = WORLD;
  ctx.fillStyle='#d8c9a4'; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#70bfb7'; ctx.fillRect(2800,0,400,h);
  ctx.fillStyle='#e9d29a'; ctx.fillRect(2600,0,200,h);
  for(let x=0;x<=2800;x+=g) { ctx.fillStyle='#b6b5a5'; ctx.fillRect(x-r/2-18,0,r+36,h); ctx.fillStyle='#52686a'; ctx.fillRect(x-r/2,0,r,h); }
  for(let y=0;y<=h;y+=g) { ctx.fillStyle='#b6b5a5'; ctx.fillRect(0,y-r/2-18,2800,r+36); ctx.fillStyle='#52686a'; ctx.fillRect(0,y-r/2,2800,r); }
  ctx.strokeStyle='rgba(250,232,179,.65)'; ctx.lineWidth=3; ctx.setLineDash([25,24]);
  for(let x=0;x<=2800;x+=g){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=0;y<=h;y+=g){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(2800,y);ctx.stroke();} ctx.setLineDash([]);
  const rnd=random(1987);
  for(let x=0;x<7;x++) for(let y=0;y<6;y++) {
    const bx=x*g+95, by=y*g+95, bw=210, bh=210;
    if(x===6 && y<4) { ctx.fillStyle='#dec48a';ctx.fillRect(bx,by,bw,bh); for(let i=0;i<5;i++){ctx.fillStyle=i%2?'#f4eee0':'#ef967c';ctx.beginPath();ctx.arc(bx+30+i*38,by+80+(i%2)*50,12,0,7);ctx.fill();} continue; }
    if((x+y*3)%9===0){ctx.fillStyle='#84b88d';ctx.fillRect(bx,by,bw,bh);for(let i=0;i<7;i++) tree(ctx,bx+20+rnd()*170,by+20+rnd()*170);continue;}
    ctx.fillStyle='#c1bba7';ctx.fillRect(bx,by,bw,bh);
    const palette=y>3?['#b4a995','#c6b39b','#a99e8b']:x<2?['#e3b293','#f1cfac','#d89480']:['#d3d2c1','#b8c7bd','#e4d5bc'];
    ctx.fillStyle='rgba(30,55,55,.18)';ctx.fillRect(bx+15,by+18,bw-16,bh-14);
    ctx.fillStyle=palette[Math.floor(rnd()*palette.length)];ctx.fillRect(bx+8,by+8,bw-25,bh-28);
    ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=3;ctx.strokeRect(bx+16,by+16,bw-41,bh-44);
    ctx.fillStyle='rgba(53,91,89,.24)'; for(let i=0;i<4;i++)ctx.fillRect(bx+28+i*40,by+28,23,10);
    if(y>3){ctx.fillStyle='#8c9c98';ctx.fillRect(bx+27,by+85,130,9);ctx.fillRect(bx+27,by+110,130,9);}
  }
  for(let y=140;y<1600;y+=400){ctx.fillStyle='#cfa97b';ctx.fillRect(2770,y,260,28);ctx.fillStyle='#faf1dc';ctx.beginPath();ctx.ellipse(3060,y+16,50,16,0,0,7);ctx.fill();ctx.fillStyle='#65969b';ctx.fillRect(3040,y+10,32,10);}
  for(let y=120;y<h;y+=200) for(let x=90;x<2700;x+=400) tree(ctx,x,y);
}
function tree(ctx,x,y){ctx.fillStyle='rgba(30,70,60,.2)';ctx.beginPath();ctx.ellipse(x+7,y+8,19,12,0,0,7);ctx.fill();ctx.fillStyle='#4b9275';ctx.beginPath();ctx.arc(x,y,16,0,7);ctx.fill();ctx.fillStyle='#76b08b';ctx.beginPath();ctx.arc(x-5,y-5,9,0,7);ctx.fill();}
