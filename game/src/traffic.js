const colors=['#f06f62','#f6cf66','#a7dad0','#f7e9ce','#768ca1','#d38bb1'];
export function makeTraffic() {
  let a=[];
  for(let i=0;i<38;i++) {
    let horizontal=i%2===0,lane=Math.floor(i/2)%6,dir=i%4<2?1:-1;
    a.push( {
      x:horizontal?(i*347)%2700:200+lane*400+(dir>0?22:-22),y:horizontal?200+lane*400+(dir>0?22:-22):(i*293)%3000,angle:horizontal?(dir>0?0:Math.PI):(dir>0?Math.PI/2:-Math.PI/2),speed:55+i%4*9,dir,horizontal,color:colors[i%6],traffic:true
    }
    )
  }
  return a
}
export function makePeds() {
  return Array.from( {
    length:45
  }
  ,(_,i)=>( {
    x:130+(i*317)%2400,y:125+Math.floor(i/7)*400+(i%2)*145,dir:i%2?1:-1,color:['#f7c59e','#345b68','#f3e5c1','#d96e60'][i%4]
  }
  ))
}
export function updateTraffic(s,dt) {
  for(const car of s.cars) {
    if(car===s.player.car||!car.traffic)continue;
    if(car.horizontal)car.x+=car.speed*car.dir*dt;
    else car.y+=car.speed*car.dir*dt;
    if(car.x<0)car.x=2700;
    if(car.x>2700)car.x=0;
    if(car.y<0)car.y=3200;
    if(car.y>3200)car.y=0
  }
  for(const p of s.peds) {
    p.x+=p.dir*18*dt;
    if(p.x<100||p.x>2550)p.dir*=-1
  }
}
export function drawCar(c,a) {
  c.save();
  c.translate(a.x,a.y);
  c.rotate(a.angle);
  c.fillStyle='#263c3b55';
  c.fillRect(-24,-8,50,25);
  c.fillStyle=a.police?'#f0f3e9':a.color;
  c.beginPath();
  c.roundRect(-25,-13,50,26,7);
  c.fill();
  c.fillStyle=a.police?'#294b56':'#435e5d';
  c.fillRect(-9,-10,19,20);
  c.fillStyle='#bad8cf';
  c.fillRect(5,-9,5,18);
  c.fillStyle='#f5edc8';
  c.fillRect(21,-9,3,6);
  c.fillRect(21,3,3,6);
  if(a.police) {
    c.fillStyle='#f16261';
    c.fillRect(-4,-5,4,10);
    c.fillStyle='#6abde3';
    c.fillRect(0,-5,4,10)
  }
  c.restore()
}
export function drawPed(c,p) {
  c.fillStyle='#253c3866';
  c.beginPath();
  c.ellipse(p.x+2,p.y+5,8,5,0,0,7);
  c.fill();
  c.fillStyle=p.color;
  c.beginPath();
  c.arc(p.x,p.y,6,0,7);
  c.fill();
  c.fillStyle='#e7ac86';
  c.beginPath();
  c.arc(p.x,p.y-3,3,0,7);
  c.fill()
}
