const hash=(x,y)=> {
  let n=Math.sin(x*127.1+y*311.7)*43758.5453;
  return n-Math.floor(n)
}
;
function tree(c,x,y) {
  c.fillStyle='#426b50';
  c.beginPath();
  c.arc(x+4,y+5,20,0,7);
  c.fill();
  c.fillStyle='#6da875';
  c.beginPath();
  c.arc(x,y,18,0,7);
  c.fill();
  c.fillStyle='#9bce8c';
  c.beginPath();
  c.arc(x-5,y-5,8,0,7);
  c.fill()
}
export function drawCity(c) {
  c.fillStyle='#e8d598';
  c.fillRect(0,0,3200,3200);
  c.fillStyle='#83cfbf';
  c.fillRect(2700,0,500,3200);
  c.fillStyle='#edcc87';
  c.fillRect(2580,0,190,3200);
  c.strokeStyle='#ffffff55';
  c.lineWidth=3;
  for(let y=40;y<3200;y+=110) {
    c.beginPath();
    c.moveTo(2800+y%220,y);
    c.lineTo(2900+y%220,y);
    c.stroke()
  }
  for(let i=0;i<=6;i++) {
    let p=i*400+200;
    c.fillStyle='#c8c2aa';
    c.fillRect(p-67,0,134,3200);
    c.fillRect(0,p-67,2700,134);
    c.fillStyle='#64716c';
    c.fillRect(p-55,0,110,3200);
    c.fillRect(0,p-55,2700,110)
  }
  c.strokeStyle='#e9dda5';
  c.lineWidth=2;
  c.setLineDash([18,19]);
  for(let i=0;i<=6;i++) {
    let p=i*400+200;
    c.beginPath();
    c.moveTo(p,0);
    c.lineTo(p,3200);
    c.moveTo(0,p);
    c.lineTo(2700,p);
    c.stroke()
  }
  c.setLineDash([]);
  for(let gx=0;gx<7;gx++)for(let gy=0;gy<8;gy++) {
    let x=gx*400+270,y=gy*400+270;
    if(x>2550)continue;
    let r=hash(gx,gy);
    if((gx===1&&gy===2)||(gx===4&&gy===5)) {
      c.fillStyle='#86b883';
      c.fillRect(x,y,250,250);
      for(let j=0;j<9;j++)tree(c,x+35+j%3*85,y+30+Math.floor(j/3)*80);
      continue
    }
    let bw=180+hash(gy,gx)*60,bh=160+hash(gx+4,gy)*70;
    c.fillStyle='#324e4a55';
    c.fillRect(x+10,y+13,bw,bh);
    c.fillStyle=['#edab83','#f5d2a0','#c9dbbe','#eaa79b','#a9c7bf'][Math.floor(r*5)];
    c.fillRect(x,y,bw,bh);
    c.strokeStyle='#ffffff88';
    c.lineWidth=3;
    c.strokeRect(x+4,y+4,bw-8,bh-8);
    c.fillStyle='#69837a';
    for(let k=0;k<4;k++)c.fillRect(x+20+k*45,y+25,22,8);
    c.fillStyle='#809f91';
    c.fillRect(x+40,y+65,65,42);
    c.fillStyle='#e4e0b6';
    c.fillRect(x+48,y+72,49,25)
  }
  c.fillStyle='#c7aa7e';
  for(let y=320;y<3000;y+=500) {
    c.fillRect(2660,y,310,18);
    for(let x=2750;x<3000;x+=100) {
      c.fillStyle='#f8f5e7';
      c.beginPath();
      c.ellipse(x,y+36,13,30,0,0,7);
      c.fill();
      c.fillStyle='#c7aa7e'
    }
  }
  for(let y=100;y<3200;y+=130) {
    tree(c,2575,y);
    c.fillStyle=y%260?'#fa8274':'#f7e7a8';
    c.beginPath();
    c.arc(2650,y+45,16,0,7);
    c.fill();
    c.strokeStyle='#fff9';
    c.stroke()
  }
}
