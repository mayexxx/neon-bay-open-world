export const keys= {
}
,pressed= {
}
,mouse= {
  x:0,y:0,down:false
}
;
addEventListener('keydown',e=> {
  if(!keys[e.code])pressed[e.code]=true;keys[e.code]=true;if(e.code==='Space'||e.code.startsWith('Arrow'))e.preventDefault()
}
);
addEventListener('keyup',e=>keys[e.code]=false);
addEventListener('mousemove',e=> {
  mouse.x=e.clientX;mouse.y=e.clientY
}
);
addEventListener('mousedown',()=>mouse.down=true);
addEventListener('mouseup',()=>mouse.down=false);
export function consume(k) {
  let v=pressed[k];
  delete pressed[k];
  return v
}
