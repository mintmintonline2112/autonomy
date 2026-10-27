// Dựng mô hình xe đạp điện minh họa hoàn toàn bằng code (Three.js → glTF), không cần phần mềm 3D:
//   node scripts/procedural/ebike.mjs [id=ebike-city]   → source/<id>/scene.glb
// Mỗi node mang sẵn extras {part,key,side,end}; prepare-model.mjs dùng thẳng nhãn này thay cho phân loại theo hình học.
// Đơn vị mét; x = chiều dài (đầu xe về -x), y lên, z ngang (+z bên trái), bánh chạm y = 0.
import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {Document,NodeIO} from '@gltf-transform/core';

const id=process.argv[2]||'ebike-city';
const doc=new Document();const buffer=doc.createBuffer();const scene=doc.createScene(id);doc.getRoot().setDefaultScene(scene);

// ---- Kích thước chính ----------------------------------------------------------------------------
const WR=.336;                               // bán kính ngoài bánh 26″ (lốp 26×2.0)
const FA=[-.57,WR],RA=[.55,WR];              // trục bánh trước / sau → chiều dài cơ sở 1,12 m
const BB=[.05,.30];                          // trục giữa (cốt đạp)
const HT=[[-.455,.71],[-.40,.86]];           // ống cổ: đáy → đỉnh (góc ~70°)
const ST=[.189,.728];                        // đỉnh ống yên (góc ~72°)

// ---- Vật liệu ------------------------------------------------------------------------------------
const mat=(name,hex,{metal=0,rough=.5,emissive=null,double=false}={})=>{const c=new THREE.Color(hex);const m=doc.createMaterial(name).setBaseColorFactor([c.r,c.g,c.b,1]).setMetallicFactor(metal).setRoughnessFactor(rough).setDoubleSided(double);if(emissive){const e=new THREE.Color(emissive);m.setEmissiveFactor([e.r,e.g,e.b])}return m};
const M={
 paint:mat('paint green','#1f8a5b',{metal:.35,rough:.32}),fender:mat('paint green fender','#1f8a5b',{metal:.35,rough:.32,double:true}),
 rubber:mat('rubber','#151617',{rough:.9}),black:mat('black plastic','#1d1f22',{rough:.55}),alu:mat('aluminium','#c4c9cf',{metal:.9,rough:.28}),
 steel:mat('steel','#9aa1a8',{metal:.95,rough:.22}),motor:mat('motor casing','#3a3f45',{metal:.6,rough:.38}),pack:mat('battery casing','#2a2e33',{metal:.3,rough:.42}),
 cell:mat('cell wrap','#3f7fc4',{rough:.4}),copper:mat('copper','#b87333',{metal:.85,rough:.3}),cable:mat('cable','#f97645',{rough:.45}),
 leather:mat('saddle','#2b221d',{rough:.7}),screen:mat('display','#0d1117',{metal:.2,rough:.15,emissive:'#0b3a40'}),
 lamp:mat('lamp white','#f4f1e8',{rough:.2,emissive:'#fff6d8'}),tail:mat('lamp red','#b3121b',{rough:.25,emissive:'#d01020'}),
};

// ---- Hình học ------------------------------------------------------------------------------------
const v=p=>new THREE.Vector3(p[0],p[1],p[2]??0);
function rod(a,b,r,seg=20){const A=v(a),B=v(b),d=B.clone().sub(A);const g=new THREE.CylinderGeometry(r,r,d.length(),seg,1);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()));const c=A.add(B).multiplyScalar(.5);g.translate(c.x,c.y,c.z);return g}
function tube(points,r,{closed=false,seg=96,radial=14,tension=.5,type='catmullrom'}={}){return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v),closed,type,tension),seg,r,radial,closed)}
function box(size,at,{rotZ=0,radius=.006}={}){const g=new RoundedBoxGeometry(size[0],size[1],size[2],3,Math.min(radius,Math.min(...size)/2-1e-4));g.rotateZ(rotZ);g.translate(at[0],at[1],at[2]??0);return g}
function disc(r,depth,at,seg=64){const g=new THREE.CylinderGeometry(r,r,depth,seg);g.rotateX(Math.PI/2);g.translate(at[0],at[1],at[2]??0);return g}
function gear(teeth,r,depth,at){const s=new THREE.Shape();for(let k=0;k<teeth*4;k++){const a=k/(teeth*4)*Math.PI*2;const rr=k%4<2?r+.0035:r-.0025;if(k)s.lineTo(rr*Math.cos(a),rr*Math.sin(a));else s.moveTo(rr,0)}
 const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false,curveSegments:1});g.translate(at[0],at[1],(at[2]??0)-depth/2);return g}

// ---- Ghi node ------------------------------------------------------------------------------------
const acc=(arr,type)=>doc.createAccessor().setType(type).setArray(arr).setBuffer(buffer);
let count=0;
function add(name,geometry,material,part,key,{side=null,end=null}={}){
 const g=geometry;if(!g.attributes.normal)g.computeVertexNormals();
 const pos=Float32Array.from(g.attributes.position.array),nrm=Float32Array.from(g.attributes.normal.array);
 const idx=g.index?Uint32Array.from(g.index.array):Uint32Array.from({length:pos.length/3},(_,i)=>i);
 const prim=doc.createPrimitive().setAttribute('POSITION',acc(pos,'VEC3')).setAttribute('NORMAL',acc(nrm,'VEC3')).setIndices(acc(idx,'SCALAR')).setMaterial(material);
 scene.addChild(doc.createNode(name).setMesh(doc.createMesh(name).addPrimitive(prim)).setExtras({part,key,side,end}));count++;
}
const sides=[['L',1],['R',-1]];

// ---- Khung & phuộc ---------------------------------------------------------------------------------
add('frame.head',rod([...HT[0],0],[...HT[1],0],.024),M.paint,'body','frame.head');
// Ống dưới lượn chữ S, cách trục bánh trước > 0,4 m để không chạm lốp/chắn bùn.
add('frame.down',tube([[-.445,.755],[-.33,.68],[-.20,.56],[-.08,.40],[0,.31],[.05,.30]],.028),M.paint,'body','frame.down');
add('frame.bb',disc(.024,.078,BB),M.paint,'body','frame.bb');
add('frame.seat',rod([...BB,0],[...ST,0],.018),M.paint,'body','frame.seat');
for(const [s,z] of sides){
 add(`stay.chain ${s}`,rod([BB[0]+.02,BB[1],.022*z],[RA[0],RA[1],.068*z],.011),M.paint,'body','stay.chain',{side:s});
 add(`stay.seat ${s}`,rod([.172,.675,.02*z],[RA[0],RA[1]+.01,.068*z],.0095),M.paint,'body','stay.seat',{side:s});
 add(`fork.leg ${s}`,tube([[-.47,.69,.05*z],[-.51,.53,.05*z],[-.552,.41,.05*z],[FA[0],FA[1],.05*z]],.013,{seg:48}),M.paint,'body','fork.leg',{side:s});
}
add('fork.crown',box([.055,.032,.125],[-.468,.69,0],{rotZ:-.35,radius:.012}),M.paint,'body','fork.crown');
// Chắn bùn: dải trụ hở quanh bánh (θ đo từ đáy, chiều kim đồng hồ khi nhìn từ +z).
const fender=(at,start,length)=>{const g=new THREE.CylinderGeometry(WR+.03,WR+.03,.066,64,1,true,start,length);g.rotateX(Math.PI/2);g.translate(at[0],at[1],0);return g};
add('fender.front',fender(FA,THREE.MathUtils.degToRad(100),THREE.MathUtils.degToRad(150)),M.fender,'body','fender',{end:'F'});
add('fender.rear',fender(RA,THREE.MathUtils.degToRad(60),THREE.MathUtils.degToRad(145)),M.fender,'body','fender',{end:'R'});
add('rack',tube([[RA[0],RA[1]+.01,.08],[.665,.785,.08],[.24,.785,.07],[.24,.785,-.07],[.665,.785,-.08],[RA[0],RA[1]+.01,-.08]],.0065,{seg:220,radial:10,tension:.02}),M.black,'body','rack');
add('kickstand',rod([.17,.30,.05],[.115,.025,.19],.009),M.black,'body','kickstand');
{const g=new THREE.CylinderGeometry(.033,.027,.062,32);g.rotateZ(Math.PI/2);g.translate(-.479,.80,0);add('light.front',g,M.lamp,'body','light.front')}
add('light.rear',box([.032,.036,.088],[.68,.768,0],{radius:.008}),M.tail,'body','light.rear');

// ---- Tay lái & yên ---------------------------------------------------------------------------------
add('stem',tube([[...HT[1],0],[-.392,.965],[-.418,1.018]],.0145,{seg:32}),M.alu,'cabin','stem');
add('handlebar',tube([[-.29,1.02,-.30],[-.312,1.021,-.24],[-.39,1.025,-.14],[-.425,1.026,0],[-.39,1.025,.14],[-.312,1.021,.24],[-.29,1.02,.30]],.011,{seg:96}),M.alu,'cabin','handlebar');
for(const [s,z] of sides){
 add(`grip ${s}`,rod([-.313,1.021,.225*z],[-.287,1.02,.33*z],.017),M.rubber,'cabin','grip',{side:s});
 add(`brake.lever ${s}`,box([.018,.014,.105],[-.345,1.005,.25*z],{radius:.005}),M.black,'cabin','brake.lever',{side:s});
}
add('display',box([.052,.034,.085],[-.452,1.058,0],{rotZ:.5,radius:.008}),M.screen,'cabin','display');
add('seatpost',rod([...ST,0],[.252,.905,0],.0135),M.alu,'cabin','seatpost');
{const g=new THREE.SphereGeometry(1,40,20);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i);p.setZ(i,p.getZ(i)*(.5+.5*(x+1)/2))}
 g.scale(.145,.036,.088);g.translate(.262,.935,0);g.computeVertexNormals();add('saddle',g,M.leather,'cabin','saddle')}

// ---- Pin: vỏ + khối cell 18650 bên trong, nằm trên ống dưới -------------------------------------
{const ang=Math.atan2(-.28,.25);const at=[-.154,.585];const T=new THREE.Matrix4().makeRotationZ(ang).setPosition(at[0],at[1],0);
 const shell=new RoundedBoxGeometry(.34,.07,.086,4,.02).applyMatrix4(T);add('battery.case',shell,M.pack,'battery','battery.case');
 const cells=[];for(let i=0;i<15;i++)for(const y of [-.0115,.0115]){const c=new THREE.CylinderGeometry(.009,.009,.062,16);c.rotateX(Math.PI/2);c.translate(-.133+i*.019,y,0);cells.push(c.applyMatrix4(T))}
 add('battery.cells',mergeGeometries(cells),M.cell,'battery','battery.cells'); // 30 cell = 10S3P
}

// ---- Mô-tơ & truyền động -----------------------------------------------------------------------
add('motor.hub',disc(.1,.075,[...RA,0]),M.motor,'drive','motor.hub');
add('motor.stator',disc(.078,.05,[...RA,0],48),M.copper,'drive','motor.stator');
add('controller',box([.12,.042,.056],[-.085,.30,0],{rotZ:-.5,radius:.01}),M.black,'drive','controller');
add('cable.battery',tube([[-.06,.44,.035],[-.085,.38,.04],[-.1,.33,.03]],.0045,{seg:24,radial:8}),M.cable,'drive','cable');
add('cable.motor',tube([[-.04,.27,.03],[.06,.265,.045],[.30,.30,.075],[.50,.33,.082],[.53,.335,.04]],.0045,{seg:64,radial:8}),M.cable,'drive','cable');
add('bb.axle',rod([BB[0],BB[1],-.08],[BB[0],BB[1],.08],.009),M.steel,'drive','bb.axle');
add('crank R',box([.175,.024,.013],[BB[0]-.0875,BB[1],-.075],{radius:.006}),M.alu,'drive','crank',{side:'R'});
add('crank L',box([.175,.024,.013],[BB[0]+.0875,BB[1],.075],{radius:.006}),M.alu,'drive','crank',{side:'L'});
add('pedal R',box([.072,.02,.095],[BB[0]-.17,BB[1],-.135],{radius:.006}),M.black,'drive','pedal',{side:'R'});
add('pedal L',box([.072,.02,.095],[BB[0]+.17,BB[1],.135],{radius:.006}),M.black,'drive','pedal',{side:'L'});
add('chainring',gear(38,.086,.004,[...BB,-.06]),M.alu,'drive','chainring');
add('cog',gear(16,.036,.004,[...RA,-.06]),M.steel,'drive','cog');
{const zc=-.06,R1=.087,R2=.037,beta=Math.atan2(RA[1]-BB[1],RA[0]-BB[0]);const at=(c,r,a)=>[c[0]+r*Math.cos(a),c[1]+r*Math.sin(a),zc];
 const straight=(a,b,n)=>Array.from({length:n},(_,k)=>a.map((x,i)=>x+(b[i]-x)*(k+1)/(n+1)));
 const front=Array.from({length:17},(_,k)=>at(BB,R1,beta+Math.PI/2+k/16*Math.PI));const rear=Array.from({length:11},(_,k)=>at(RA,R2,beta-Math.PI/2+k/10*Math.PI));
 const pts=[...front,...straight(front.at(-1),rear[0],8),...rear,...straight(rear.at(-1),front[0],8)];
 add('chain',tube(pts,.0045,{closed:true,seg:320,radial:8,type:'centripetal'}),M.steel,'drive','chain')}

// ---- Bánh xe & phanh --------------------------------------------------------------------------------
function wheel(c,end,hubR,flange){
 const tire=new THREE.TorusGeometry(WR-.026,.026,20,144);tire.translate(c[0],c[1],0);add(`tire ${end}`,tire,M.rubber,'wheels','tire',{end});
 const rim=new THREE.TorusGeometry(WR-.049,.0105,10,144);rim.scale(1,1,1.9);rim.translate(c[0],c[1],0);add(`rim ${end}`,rim,M.alu,'wheels','rim',{end});
 const spokes=[];for(let i=0;i<32;i++){const a=i/32*Math.PI*2,z=i%2?1:-1,lace=(i%4<2?1:-1)*.42;
  spokes.push(rod([c[0]+hubR*Math.cos(a+lace),c[1]+hubR*Math.sin(a+lace),flange*z],[c[0]+(WR-.058)*Math.cos(a),c[1]+(WR-.058)*Math.sin(a),0],.0011,5))}
 add(`spokes ${end}`,mergeGeometries(spokes),M.steel,'wheels','spokes',{end});
 add(`brake.disc ${end}`,disc(.08,.0025,[...c,.074]),M.steel,'brakes','disc',{end});
}
wheel(FA,'F',.026,.035);wheel(RA,'R',.092,.03);
add('hub F',disc(.024,.1,[...FA,0],32),M.alu,'wheels','hub',{end:'F'});
add('brake.caliper F',box([.056,.03,.024],[FA[0]+.075,FA[1]-.027,.086],{rotZ:1.2,radius:.006}),M.black,'brakes','caliper',{end:'F'});
add('brake.caliper R',box([.056,.03,.024],[RA[0]-.075,RA[1]+.027,.086],{rotZ:1.2,radius:.006}),M.black,'brakes','caliper',{end:'R'});

const out=path.join('source',id,'scene.glb');fs.mkdirSync(path.dirname(out),{recursive:true});
await new NodeIO().write(out,doc);
const box3=new THREE.Box3();for(const n of scene.listChildren()){const a=n.getMesh().listPrimitives()[0].getAttribute('POSITION');const lo=a.getMin([]),hi=a.getMax([]);box3.expandByPoint(v(lo));box3.expandByPoint(v(hi))}
const size=box3.getSize(new THREE.Vector3());
console.log(`${count} node → ${out}; dài ${size.x.toFixed(3)} m, cao ${size.y.toFixed(3)} m, rộng ${size.z.toFixed(3)} m, đáy y=${box3.min.y.toFixed(3)}`);
