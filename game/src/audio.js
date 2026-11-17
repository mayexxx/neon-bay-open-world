let ctx,muted=false,last=0;
export function toggle() {
  muted=!muted;
  document.querySelector('#mute').textContent=muted?'×':'♪'
}
export function tone(f=440,d=.08,type='sine',vol=.035) {
  if(muted)return;
  try {
    ctx||=new AudioContext();
    if(ctx.state==='suspended')ctx.resume();
    let o=ctx.createOscillator(),g=ctx.createGain();
    o.type=type;
    o.frequency.value=f;
    g.gain.setValueAtTime(vol,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime+d)
  }
  catch {
  }
}
export function ambience(s,t) {
  if(t-last<.4)return;
  last=t;
  if(s.player.car)tone(65+Math.abs(s.player.car.speed)*.6,.2,'sawtooth',.008);
  if(s.wanted)tone(480+Math.sin(t*5)*180,.2,'sine',.01)
}
