
// ═══════════ LOADING ═══════════
var p=0,ti=setInterval(function(){p+=Math.random()*10+3;if(p>=100){p=100;clearInterval(ti);document.getElementById('ltxt').textContent='加载完成';document.getElementById('lenter').classList.add('show')}document.getElementById('lbar').style.width=p+'%';if(p>40)document.getElementById('ltxt').textContent='正在唤醒千年玉魂...';if(p>75)document.getElementById('ltxt').textContent='即将开启时空之门...'},500);
function enter(){var l=document.getElementById('loading');l.style.transition='opacity .6s';l.style.opacity='0';setTimeout(function(){l.classList.add('hide');init();var b=document.getElementById('bgm');b.play().then(function(){document.getElementById('music-btn').style.display='block';document.getElementById('music-icon').style.animation='musicSpin 3s linear infinite'}).catch(function(){})},600)}

// ═══════════ GLOBAL ═══════════
var cur=1;
function toggleMusic(){var b=document.getElementById('bgm'),i=document.getElementById('music-icon');if(b.paused){b.play();i.style.animation='musicSpin 3s linear infinite'}else{b.pause();i.style.animation='none'}}
function goPage(n){
  if(n<1||n>4)return;
  for(var i=1;i<=4;i++)document.getElementById('pg'+i).classList.toggle('on',i===n);
  document.querySelectorAll('.nd').forEach(function(d,i){d.className='nd';if(i+1===n)d.classList.add('on');if(i+1<n)d.classList.add('past')});
  document.getElementById('nav-prev').style.display=n>1?'block':'none';
  document.getElementById('nav-next').style.display=n<4?'block':'none';
  document.getElementById('comic-nav').classList.toggle('on',n===1);
  cur=n;
  document.getElementById('music-btn').style.display=n>=1?'block':'none';
  if(n===1&&!window._rin){initComic();window._rin=true}
  if(n===3&&!window._tin){initTL();window._tin=true}
}

// ═══════════ INIT ═══════════
function init(){initBg();buildStrata();goPage(1)}
function initBg(){
  document.getElementById('bg-base').style.backgroundImage='url(背景.png)';
  var files=['祥云1.png','祥云2.png','祥云3.png','祥云4.png','祥云5.png','祥云6.png','祥云7.png','祥云8.png','祥云9.png'];
  [{id:'cloud-back',c:3,o:.2,s:.015,b:3,z:.35},{id:'cloud-mid',c:5,o:.3,s:.04,b:1.5,z:.24},{id:'cloud-front',c:7,o:.4,s:.09,b:0,z:.16}].forEach(function(l){
    var el=document.getElementById(l.id);el._sp=l.s;var cv=document.createElement('canvas');el.appendChild(cv);var ctx=cv.getContext('2d');
    var imgs=files.map(function(f){var i=new Image();i.src='祥云/'+f;return i});
    function rs(){cv.width=el.clientWidth||innerWidth;cv.height=el.clientHeight||innerHeight;r()}
    function r(){var w=cv.width,h=cv.height;ctx.clearRect(0,0,w,h);ctx.filter=l.b?'blur('+l.b+'px)':'none';ctx.globalAlpha=l.o;var th=h*3;
    for(var i=0;i<l.c*2;i++){var img=imgs[i%imgs.length];if(!img.complete)continue;var mw=w*l.z,sc=Math.min(mw/img.width,.6),dw=img.width*sc,dh=img.height*sc,sd=i%2,x=sd?5:w-dw-5,rh=th/(l.c*2),y=i*rh+(Math.sin(i*2.7)*rh*.3)-h;ctx.drawImage(img,x,y,dw,dh)}ctx.filter='none';ctx.globalAlpha=1}
    function chk(){if(imgs.every(function(i){return i.complete}))rs()}
    imgs.forEach(function(i){i.onload=chk;i.onerror=chk});chk();window.addEventListener('resize',rs)
  });
  document.querySelectorAll('.ps').forEach(function(el){el.addEventListener('scroll',function(){var sy=el.scrollTop;['bg-base','cloud-back','cloud-mid','cloud-front'].forEach(function(id){var e=document.getElementById(id);if(e&&e._sp)e.style.transform='translateY('+(sy*e._sp)+'px)'})})})
}

// ═══════════ BOX ═══════════
function openBox(){
  var vo=document.getElementById('video-overlay'),v=document.getElementById('intro-video');
  vo.style.display='flex';requestAnimationFrame(function(){requestAnimationFrame(function(){vo.style.opacity='1'})});
  v.play().then(function(){}).catch(function(){ev()});v.onended=ev;
  document.getElementById('skip-video').onclick=function(){ev()};
  function ev(){v.pause();v.currentTime=0;vo.style.opacity='0';setTimeout(function(){vo.style.display='none';document.getElementById('box-img').src='玉匣打开.png';document.getElementById('box-glow').classList.add('on');document.getElementById('box-hint').textContent='玉匣已开';var sw=document.getElementById('scroll-wrap');sw.style.display='block';sw.classList.add('open');document.getElementById('strata-section').style.display='block';document.getElementById('scroll-hint').style.display='block'},800)}
}

// ═══════════ STRATA ═══════════
var sa=[{id:'yuhu',name:'玉虎',d:2.0,x:12,w:200,h:180,s:0},{id:'yufeng',name:'玉凤',d:3.0,x:60,w:205,h:185,s:1},{id:'yuren',name:'玉人首',d:4.2,x:18,w:195,h:175,s:2},{id:'yuchan',name:'玉婵',d:5.5,x:54,w:200,h:180,s:3},{id:'taoding',name:'陶鼎',d:6.8,x:20,w:205,h:185,s:4},{id:'yuying',name:'玉鹰',d:8.0,x:56,w:200,h:180,s:0}];
var spx=100;
function buildStrata(){
  var col=document.getElementById('strata-col'),soils=[{h:3*spx,bg:'#4A3828'},{h:2.5*spx,bg:'#3D2A18'},{h:2.5*spx,bg:'#352418'},{h:2*spx,bg:'#2A1A10'},{h:1.5*spx,bg:'#1E1208'}];
  var th=0;soils.forEach(function(s){th+=s.h});col.style.height=th+'px';
  soils.forEach(function(s){var d=document.createElement('div');d.className='soil';d.style.cssText='height:'+s.h+'px;background:'+s.bg;col.appendChild(d)});
  [{t:6*spx,x:75,em:'🪨'},{t:7*spx,x:70,em:'🦴'},{t:7.5*spx,x:20,em:'🦴'},{t:8*spx,x:55,em:'🐚'},{t:8.5*spx,x:15,em:'🪨'},{t:9*spx,x:65,em:'🦴'},{t:9.5*spx,x:60,em:'💀'},{t:10*spx,x:25,em:'🦷'},{t:10.5*spx,x:30,em:'🦴'},{t:11*spx,x:50,em:'🐚'}].forEach(function(f){var el=document.createElement('div');el.className='fossil';el.style.cssText='top:'+f.t+'px;left:'+f.x+'%';el.textContent=f.em;col.appendChild(el)});
  var ruler=document.getElementById('strata-ruler');for(var m=0;m<=11.5;m+=0.5){var tk=document.createElement('div');tk.className='tk'+(m%1===0?' mj':'');tk.style.top=(m*spx)+'px';ruler.appendChild(tk);if(m%1===0){var l=document.createElement('div');l.className='tkl';l.style.top=(m*spx)+'px';l.textContent=m+'m';ruler.appendChild(l)}}
  sa.forEach(function(a){
    var blob=document.createElement('div');blob.className='blob';blob.style.cssText='top:'+(a.d*spx)+'px;left:'+a.x+'%;width:'+a.w+'px;height:'+a.h+'px';
    var img=document.createElement('img');img.src='古画风/'+a.name+'.png';img.alt=a.name;img.style.cssText='width:100%;height:100%;object-fit:contain;opacity:0';blob.appendChild(img);
    var cv=document.createElement('canvas');cv.width=a.w;cv.height=a.h;cv.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%';blob.appendChild(cv);
    var ripple=document.createElement('div');ripple.className='ripple';ripple.innerHTML='<div class="r"></div><div class="r"></div><div class="r"></div>';blob.appendChild(ripple);
    col.appendChild(blob);blob._a=a;blob._cv=cv;blob._ripple=ripple;
    var clickBtn=document.createElement('div');clickBtn.style.cssText='position:absolute;inset:0;z-index:5;display:none';clickBtn.addEventListener('click',function(e){e.stopPropagation();openV(a.id)});blob.appendChild(clickBtn);blob._cb=clickBtn;
    setTimeout(function(){initBlob(blob)},150)
  })
}
function blobPath(ctx,w,h,seed){
  ctx.beginPath();var pts=7+seed,cx=w/2,cy=h/2,rx=w/2-5,ry=h/2-5;
  for(var i=0;i<pts;i++){var ang=(i/pts)*Math.PI*2,rx2=rx*(.65+Math.sin(i*(3+seed*.7))*.35),ry2=ry*(.65+Math.cos(i*(2.5+seed*.8))*.35);if(i===0)ctx.moveTo(cx+Math.cos(ang)*rx2,cy+Math.sin(ang)*ry2);else ctx.lineTo(cx+Math.cos(ang)*rx2,cy+Math.sin(ang)*ry2)}ctx.closePath()
}
function initBlob(blob){
  var a=blob._a,cv=blob._cv,ctx=cv.getContext('2d'),w=cv.width,h=cv.height,ripple=blob._ripple,img=blob.querySelector('img'),clickBtn=blob._cb;
  cv.style.cursor='url(铲子-32.png) 16 16, grab';
  ctx.save();blobPath(ctx,w,h,a.s);ctx.clip();ctx.fillStyle='#2E1C0E';ctx.fillRect(0,0,w,h);
  for(var i=0;i<600;i++){ctx.fillStyle='rgba('+(30+Math.random()*20)+','+(15+Math.random()*10)+','+(5+Math.random()*6)+','+(.25+Math.random()*.3)+')';ctx.beginPath();ctx.arc(Math.random()*w,Math.random()*h,Math.random()*2.5,0,Math.PI*2);ctx.fill()}ctx.restore();
  var br=Math.max(22,w*.08),ac=false,sc=0,wasScratch=false,maxOp=0;
  function getXY(e){var r=cv.getBoundingClientRect(),cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;return{sx:(cx-r.left)*(w/r.width),sy:(cy-r.top)*(h/r.height)}}
  function sa(x,y){ctx.save();blobPath(ctx,w,h,a.s);ctx.clip();ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x,y,br,0,Math.PI*2);ctx.fill();ctx.restore();ctx.globalCompositeOperation='source-over';sc++}
  function setOp(){var op=Math.max(maxOp,Math.min(1,sc/35));maxOp=op;img.style.opacity=op}
  cv.addEventListener('mousedown',function(e){ac=true;wasScratch=false;if(!blob._done){var p=getXY(e);sa(p.sx,p.sy)}});
  window.addEventListener('mousemove',function(e){if(!ac)return;var p=getXY(e);sa(p.sx,p.sy);wasScratch=true;setOp();if(sc>35&&!blob._done){blob._done=true;ripple.classList.add('show');img.style.opacity=1;clickBtn.style.display='block'}});
  window.addEventListener('mouseup',function(){ac=false;if(wasScratch)blob._js=true});
  cv.addEventListener('touchstart',function(e){ac=true;wasScratch=false;if(!blob._done){var p=getXY(e);sa(p.sx,p.sy)}e.preventDefault()});
  window.addEventListener('touchmove',function(e){if(!ac)return;e.preventDefault();var p=getXY(e);sa(p.sx,p.sy);wasScratch=true;setOp();if(sc>35&&!blob._done){blob._done=true;ripple.classList.add('show');img.style.opacity=1;clickBtn.style.display='block'}},{passive:false});
  window.addEventListener('touchend',function(){ac=false;if(wasScratch)blob._js=true})
}

// ═══════════ 3D VIEWER ═══════════
var vArts=[{id:'yuhu',name:'玉虎',meta:'长4.8cm · 肖家屋脊 · 距今4200年',desc:'呈蹲踞状，虎首高昂，双目圆睁。虎身以阴线刻出斑纹，整体浑厚威猛。1987年出土。',n:8,path:'3D/玉虎/',files:['玉虎正左.png','玉虎前左.png','玉虎正前.png','玉虎前右.png','玉虎正右.png','玉虎后右.png','玉虎正后.png','玉虎后左.png']},{id:'yufeng',name:'玉凤',meta:'长7.5cm · 肖家屋脊 · 距今4200年',desc:'被誉为「中华第一凤」。凤鸟展翅欲飞，线条流畅细腻。',n:8,path:'3D/玉凤/',files:['玉凤1.png','玉凤2.png','玉凤3.png','玉凤4.png','玉凤5.png','玉凤6.png','玉凤7.png','玉凤8.png']},{id:'yuren',name:'玉人首',meta:'谭家岭 · 距今4200-4000年',desc:'圆雕作品，面部刻画细致，双耳佩环，头顶冠饰。',n:8,path:'3D/玉人首/',files:['玉人首1.png','玉人首2.png','玉人首3.png','玉人首4.png','玉人首5.png','玉人首6.png','玉人首7.png','玉人首8.png']},{id:'yuchan',name:'玉蝉',meta:'谭家岭 · 距今4200-4000年',desc:'造型写实，蝉翼纹理清晰。蝉象征复活与永生。',n:8,path:'3D/玉蝉/',files:['玉蝉1.png','玉蝉2.png','玉蝉3.png','玉蝉4.png','玉蝉5.png','玉蝉6.png','玉蝉7.png','玉蝉8.png']},{id:'taoding',name:'陶鼎',meta:'邓家湾 · 距今4500年',desc:'石家河文化典型陶器，三足鼎立，器身饰有篮纹。',n:4,path:'3D/陶鼎/',files:['陶鼎正面.png','陶鼎右侧.png','陶鼎背面.png','陶鼎左侧.png']},{id:'yuying',name:'玉鹰',meta:'谭家岭 · 距今4000年',desc:'玉鹰展翅，造型矫健有力。可能是部落图腾或权力的象征。',n:8,path:'3D/玉鹰/',files:['玉鹰1.png','玉鹰2.png','玉鹰3.png','玉鹰4.png','玉鹰5.png','玉鹰6.png','玉鹰7.png','玉鹰8.png']}];
var vCa=0,vCf=0,vF=[];
function vFrm(a,fi){return a.path+a.files[fi%a.n]}
var vpRunning=false;
function startVP(){
  var pc=document.getElementById('vo-particles'),pctx=pc.getContext('2d');pc.width=innerWidth;pc.height=innerHeight;
  var ps=[];for(var i=0;i<80;i++)ps.push({x:Math.random()*pc.width,y:Math.random()*pc.height,r:Math.random()*1.5+.6,vx:(Math.random()-.5)*.35,vy:-(Math.random()*.5+.1),o:Math.random()*.5+.2});
  if(vpRunning)return;vpRunning=true;
  (function lp(){if(!vpRunning)return;pctx.clearRect(0,0,pc.width,pc.height);ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.y<-10){p.y=pc.height+10;p.x=Math.random()*pc.width}pctx.beginPath();pctx.arc(p.x,p.y,p.r,0,Math.PI*2);pctx.fillStyle='rgba(189,155,74,'+p.o+')';pctx.fill()});requestAnimationFrame(lp)})()
}
function stopVP(){vpRunning=false}
function openV(id){
  var i=vArts.findIndex(function(a){return a.id===id});if(i<0)return;vCa=i;var a=vArts[i];vF=[];for(var j=0;j<a.n;j++)vF.push(vFrm(a,j));vCf=0;
  document.getElementById('v-img').src=vF[vCf];document.getElementById('v-name').textContent=a.name;document.getElementById('v-meta').textContent=a.meta;document.getElementById('v-desc').textContent=a.desc;document.getElementById('v-info').textContent='拖拽旋转 360 · '+a.n+'个角度';
  document.getElementById('vo').style.display='flex';startVP()
}
document.getElementById('v-wrap').addEventListener('pointerdown',function(e){var dx=e.clientX,sf=vCf;this.setPointerCapture(e.pointerId);var mv=function(e){if(!this.hasPointerCapture(e.pointerId))return;var nf=((sf+Math.round((e.clientX-dx)/35))%vArts[vCa].n+vArts[vCa].n)%vArts[vCa].n;if(nf!==vCf){vCf=nf;document.getElementById('v-img').src=vF[vCf]}};this._mv=mv;this.addEventListener('pointermove',mv)});
document.getElementById('v-wrap').addEventListener('pointerup',function(e){this.removeEventListener('pointermove',this._mv);this.releasePointerCapture(e.pointerId)});

// ═══════════ COMIC ═══════════
var comicSub=0,comicR=[0,0,0],comicPA=[],comicPB=[],comicPC=[],comicDone=false;
function makeComicPanels(gid,labels,colors,lid){
  var grid=document.getElementById(gid);
  var layoutA=[[{w:'50%',h:'200px'},{w:'50%',h:'200px'}],[{w:'33.33%',h:'190px'},{w:'33.34%',h:'190px'},{w:'33.33%',h:'190px'}],[{w:'55%',h:'210px',trap:'r'},{w:'45%',h:'210px',trap:'l'}],[{w:'100%',h:'190px'}]];
  var layoutB=[[{w:'100%',h:'210px'}],[{w:'50%',h:'200px'},{w:'50%',h:'200px'}],[{w:'25%',h:'180px'},{w:'25%',h:'180px'},{w:'25%',h:'180px'},{w:'25%',h:'180px'}],[{w:'100%',h:'240px'}]];
  var layout=lid===0?layoutA:layoutB,result=[],pi=0;
  layout.forEach(function(row){
    var rd=document.createElement('div');rd.className='comic-row';
    row.forEach(function(col){
      if(pi>=labels.length)return;
      var p=document.createElement('div');p.className='comic-panel';
      var clip='',extra='';if(col.trap==='r'){clip=';clip-path:polygon(0 0,100% 0,85% 100%,0 100%)';extra=';margin-right:-8%'}if(col.trap==='l'){clip=';clip-path:polygon(15% 0,100% 0,100% 100%,0 100%)';extra=';margin-left:-8%'}
      p.style.cssText='width:'+col.w+';height:'+col.h+clip+extra;
      var fn=lid===0?(pi+1):(pi+9);var pngs=[1,3,4,7,11,15];var ext=pngs.indexOf(fn)>=0?'.png':'.jpg';
      var img=document.createElement('img');img.src='漫画/'+fn+ext;p.appendChild(img);
      var lbl=document.createElement('div');lbl.className='pl';lbl.textContent=labels[pi];p.appendChild(lbl);
      rd.appendChild(p);result.push(p);pi++
    });grid.appendChild(rd)
  });return result
}
function initComic(){
  var labelsA=['夜空繁星','先民汇聚','祭司步入','玉琮礼天','玉璧礼地','玉圭祭祖','祭品陈列','火盆静候'];
  var labelsB=['对天祷告','敬告大地','呼唤先祖','火星溅起','火焰燃起','凤鸟火光','先民跪拜','仪式完成'];
  var colors=['#1A1410','#241A10','#2A1A12','#2E1C14','#241810','#1E1610','#2A1C12','#221810'];
  comicPA=makeComicPanels('grid-a',labelsA,colors,0);comicPB=makeComicPanels('grid-b',labelsB,colors,1);
  ['玉匣/a.jpg','玉匣/b.jpg','玉匣/c.jpg'].forEach(function(src,i){
    var p=document.createElement('div');p.className='comic-panel';p.style.cssText='width:80%;height:180px';
    var img=document.createElement('img');img.src=src;p.appendChild(img);document.getElementById('grid-c').appendChild(p);comicPC.push(p)
  });
  switchCS(0);
  function addClick(el,idx,hintId,onDone){
    el.addEventListener('click',function(e){
      if(e.target.tagName==='BUTTON')return;
      var h=document.getElementById(hintId);if(h)h.style.display='none';
      if(comicR[idx]<(idx===2?3:8)){var panels=idx===0?comicPA:idx===1?comicPB:comicPC;panels[comicR[idx]].classList.add('show');comicR[idx]++;updateCN()}
    })
  }
  addClick(document.getElementById('comic-a'),0,'tap-hint-a');
  addClick(document.getElementById('comic-b'),1,'tap-hint-b');
  document.getElementById('comic-c').addEventListener('click',function(e){
    if(e.target.tagName==='BUTTON')return;
    var h=document.getElementById('tap-hint-c');if(h)h.style.display='none';
    if(comicR[2]<3){comicPC[comicR[2]].classList.add('show');comicR[2]++;updateCN()}
    else if(comicR[2]>=3&&!comicDone){comicDone=true;comicPC.forEach(function(p){p.style.transition='opacity .8s';p.style.opacity='0'});
      setTimeout(function(){document.getElementById('final-img').style.transform='translate(-50%,-50%) scale(1)';setTimeout(function(){goPage(2)},1500)},900)}
  })
}
function switchCS(n){
  var pages=[document.getElementById('comic-a'),document.getElementById('comic-b'),document.getElementById('comic-c')];
  pages.forEach(function(p,i){p.style.visibility=i===n?'visible':'hidden';p.style.pointerEvents=i===n?'auto':'none';if(i===2)p.style.display=i===n?'flex':'none'});
  document.getElementById('tap-hint-a').style.display=n===0&&comicR[0]<8?'block':'none';
  document.getElementById('tap-hint-b').style.display=n===1&&comicR[1]<8?'block':'none';
  document.getElementById('tap-hint-c').style.display=n===1&&comicR[2]<4?'block':'none';
  comicSub=n;updateCN()
}
function updateCN(){
  var prev=document.getElementById('comic-prev'),next=document.getElementById('comic-next');
  prev.classList.toggle('show',comicSub>=1);next.classList.toggle('show',comicSub<=1);
  if(comicSub===0)next.style.opacity=comicR[0]>=8?'1':'0.3';else if(comicSub===1)next.style.opacity=comicR[1]>=8?'1':'0.3'
}
function goComicPrev(){if(comicSub>0)switchCS(comicSub-1)}
function goComicNext(){if(comicSub===0&&comicR[0]>=8)switchCS(1);else if(comicSub===1&&comicR[1]>=8)switchCS(2)}

// ═══════════ TIMELINE ═══════════
function initTL(){
  var evs=[{yr:"1954",t:"遗址首次发现",d:"湖北省文管会配合石龙过江水库工程调查时，首次发现石家河遗址。",folder:"1954"},{yr:"1955",t:"首次考古发掘",d:"中国科学院考古研究所对遗址进行了首次正式考古发掘。",folder:"1955出土文物实拍"},{yr:"1987",t:"肖家屋脊遗址发掘",d:"出土玉虎、玉凤等精美玉器，引起国内外学术界广泛关注。",folder:"1987"},{yr:"1990",t:"罗家柏岭遗址发掘",d:"发现大型祭祀遗存，包括祭坛、祭祀坑和燎祭遗迹。",folder:"1990"},{yr:"2008",t:"中华文明探源工程",d:"石家河遗址被纳入探源工程重点遗址。",folder:"2008"},{yr:"2015",t:"谭家岭瓮棺葬重大发现",d:"发现4座瓮棺葬，出土精美玉器240余件，是长江中游之最。",folder:"2015"},{yr:"2017",t:"全国十大考古新发现",d:"凭借多年重大考古成果入选，获学术界最高级别认可。",folder:"2017"},{yr:"2021",t:"百年百大考古发现",d:"入选百年百大考古发现，成为中国考古里程碑式遗址。",folder:"2021"},{yr:"2024",t:"考古70周年",d:"持续考古发掘与保护利用，积极推动石家河遗址申报世界文化遗产。",folder:"2024"}];
  var container=document.getElementById("tl-vertical");
  // Pre-scan folders for available images
  var knownFiles=[
    ["石家河遗址鸟瞰图.webp"],
    ["1955出土玉团凤.png","鸟首玉璜.png"],
    ["肖家屋脊成套玉器.png"],
    ["罗家柏岭出土石锛.jpg"],
    ["石家河古城墙航拍标注图.png","探源工程聚落地形图.jpg"],
    ["虎形玉如意.png","虎座双鹰玉佩.png","连体双人头像玉玦.png","谭家岭古城壕发掘探方.jpg","谭家岭遗址标识碑（2015实拍）.jpg"],
    ["古城夯土地层剖面.jpg","谭家岭城垣城壕剖面.jpg","印信台祭祀台复原实拍.png","印信台祭祀土台.png"],
    ["石家河遗址大门标识.png","玉凤主题雕塑.png"],
    ["凤归故里主视觉墙.png","玉神特展展厅全景.png","玉团凤返乡展柜.png"]
  ];
  var heights=[220,220,220,220,220,220,220,220,220];
  evs.forEach(function(ev,i){
    ev._files=knownFiles[i];
    var wrap=document.createElement("div");wrap.style.cssText="position:relative;height:220px;display:flex;align-items:center;flex-shrink:0";
    var line=document.createElement("div");line.style.cssText="position:absolute;left:8px;top:0;bottom:0;width:1.5px;background:#44403C";wrap.appendChild(line);
    var dot=document.createElement("div");dot.style.cssText="position:absolute;left:3px;top:50%;transform:translateY(-50%);width:12px;height:12px;border-radius:50%;background:#27272A;border:2px solid #44403C;z-index:1;transition:all .3s";wrap.appendChild(dot);
    var yr=document.createElement("div");yr.style.cssText="position:absolute;left:28px;top:30%;font-size:16px;color:#666;font-weight:700;white-space:nowrap;font-family:Georgia,serif";yr.textContent=ev.yr;wrap.appendChild(yr);
    var tt=document.createElement("div");tt.style.cssText="position:absolute;left:28px;top:55%;font-size:13px;color:#555;white-space:nowrap";tt.textContent=ev.t;wrap.appendChild(tt);
    var imgWrap=document.createElement("div");imgWrap.style.cssText="position:absolute;left:160px;top:50%;transform:translateY(-50%);width:220px;height:150px;border-radius:6px;overflow:hidden;cursor:pointer";
    var imgBg=document.createElement("div");imgBg.style.cssText="position:absolute;inset:0;background-size:cover;background-position:center;border-radius:6px;opacity:.45;background-color:#1E1A16";
    if(ev._files.length>0)imgBg.style.backgroundImage="url("+ev.folder+"/"+ev._files[0]+")";
    imgWrap.appendChild(imgBg);
    var dirtCv=document.createElement("canvas");dirtCv.width=220;dirtCv.height=150;dirtCv.style.cssText="position:absolute;inset:0;border-radius:6px;transition:opacity .3s";imgWrap.appendChild(dirtCv);
    var dctx=dirtCv.getContext("2d");dctx.fillStyle="#3D2A18";dctx.fillRect(0,0,220,150);
    for(var k=0;k<400;k++){dctx.fillStyle="rgba("+(35+Math.random()*25)+","+(18+Math.random()*15)+","+(8+Math.random()*10)+","+(.3+Math.random()*.4)+")";dctx.beginPath();dctx.arc(Math.random()*220,Math.random()*150,Math.random()*2.5,0,Math.PI*2);dctx.fill()}
    wrap.appendChild(imgWrap);
    var popup=document.createElement("div");popup.style.cssText="position:absolute;right:4px;top:50%;transform:translateY(-50%);width:200px;padding:14px 16px;background:#1E1A16;border-radius:6px;border-left:2px solid #BD9B4A;opacity:0;transition:all .3s;pointer-events:none";
    var pd=document.createElement("div");pd.style.cssText="font-size:13px;color:#C0B8A8;line-height:1.8";pd.textContent=ev.d;popup.appendChild(pd);wrap.appendChild(popup);
    wrap.addEventListener("mouseenter",function(){imgBg.style.opacity=".7";imgWrap.style.transform="translateY(-50%) scale(1.05)";imgWrap.style.transition="all .3s";imgWrap.style.border="1px solid rgba(189,155,74,.5)";imgWrap.style.boxShadow="0 0 20px rgba(189,155,74,.3)";popup.style.opacity="1";dot.style.background="#BD9B4A";dot.style.boxShadow="0 0 10px rgba(189,155,74,.4)";yr.style.color="#BD9B4A";tt.style.color="#F0E8D8"});
    wrap.addEventListener("mouseleave",function(){imgBg.style.opacity=imgWrap._revealed?".7":".45";imgWrap.style.transform="translateY(-50%) scale(1)";imgWrap.style.border="none";imgWrap.style.boxShadow="none";popup.style.opacity="0";dot.style.background="#27272A";dot.style.boxShadow="none";yr.style.color="#666";tt.style.color="#555"});
    dirtCv.addEventListener("click",function(e){e.stopPropagation();
      if(imgWrap._revealed){showTLDetail(ev);return}
      imgWrap._revealed=true;
      var particles=[],w=220,h=150;
      for(var p=0;p<80;p++){particles.push({x:Math.random()*w,y:Math.random()*w,vx:(Math.random()-.5)*4,vy:-(Math.random()*3+1),life:1,r:2+Math.random()*3})}
      (function anim(){dctx.clearRect(0,0,w,h);var alive=false;particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.1;p.life-=.02;if(p.life>0){alive=true;dctx.fillStyle="rgba(61,42,24,"+p.life+")";dctx.beginPath();dctx.arc(p.x,p.y,p.r,0,Math.PI*2);dctx.fill()}});if(alive)requestAnimationFrame(anim);else dirtCv.style.opacity="0"})();
      imgBg.style.opacity=".7";popup.style.opacity="1";imgWrap.style.border="1px solid rgba(189,155,74,.3)";
    });
    container.appendChild(wrap);
  });
  function showTLDetail(ev){
    var ci=0,ov=document.createElement("div");ov.style.cssText="position:fixed;inset:0;z-index:500;background:rgba(4,2,0,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer";
    var pic=document.createElement("div");pic.style.cssText="width:min(440px,90vw);height:min(340px,65vh);border-radius:10px;background-size:contain;background-repeat:no-repeat;background-position:center;border:1px solid rgba(189,155,74,.2);transition:background-image .3s";
    var imgTitle=document.createElement("div");imgTitle.style.cssText="font-size:16px;color:#F0E8D8;margin-top:10px;text-align:center;max-width:440px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";ov.appendChild(imgTitle);
    function setTitle(){var f=ev._files[ci];if(f&&imgTitle){var dt=f.lastIndexOf('.');imgTitle.textContent=dt>0?f.substring(0,dt):f}}
    function upPic(){pic.style.backgroundImage="url("+ev.folder+"/"+ev._files[ci]+")";setTitle()}
    upPic();
    var picRow=document.createElement("div");picRow.style.cssText="display:flex;align-items:center;justify-content:center";
    ov.appendChild(picRow);setTitle();
    var yr2=document.createElement("div");yr2.style.cssText="font-size:16px;color:rgba(189,155,74,.5);margin-top:16px;letter-spacing:.2em;font-family:Georgia,serif";yr2.textContent=ev.yr;ov.appendChild(yr2);
    var tt2=document.createElement("div");tt2.style.cssText="font-size:24px;color:#BD9B4A;margin-top:4px;font-family:Georgia,serif";tt2.textContent=ev.t;ov.appendChild(tt2);
    if(ev._files.length>1){
      var lb=document.createElement("div");lb.style.cssText="color:rgba(255,255,255,.6);font-size:44px;cursor:pointer;padding:0 12px";lb.textContent="◂";lb.addEventListener("click",function(e){e.stopPropagation();ci=(ci-1+ev._files.length)%ev._files.length;upPic()});
      var rb=document.createElement("div");rb.style.cssText="color:rgba(255,255,255,.6);font-size:44px;cursor:pointer;padding:0 12px";rb.textContent="▸";rb.addEventListener("click",function(e){e.stopPropagation();ci=(ci+1)%ev._files.length;upPic()});
      picRow.appendChild(lb);picRow.appendChild(pic);picRow.appendChild(rb);
      var ct=document.createElement("div");ct.style.cssText="color:#444;font-size:10px;margin-top:8px";ct.textContent=(ci+1)+" / "+ev._files.length;ov.appendChild(ct);
    } else {picRow.appendChild(pic);}
    ov.addEventListener("click",function(){ov.style.opacity="0";ov.style.transition="opacity .4s";setTimeout(function(){ov.remove()},400)});
    document.body.appendChild(ov);
  }
}
// ═══════════ CERT ═══════════
var userName='';
function makeCert(){var n=document.getElementById('c-inp').value.trim();if(!n)return;userName=n;document.getElementById('c-name').textContent=n;var now=new Date();document.getElementById('c-date').textContent=now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日';document.getElementById('cert-msg').innerHTML=n+'，你已完成石家河<br>地层穿越之旅';document.getElementById('cert-input').style.display='none';document.getElementById('cert-quote').style.display='block';document.getElementById('cert-show').style.display='flex'}
function saveCert(){var c=document.createElement('canvas');c.width=680;c.height=520;var ctx=c.getContext('2d');ctx.fillStyle='#F0E8D8';ctx.fillRect(0,0,680,520);ctx.fillStyle='#8B5E3C';ctx.fillRect(10,10,660,500);ctx.fillStyle='#F0E8D8';ctx.fillRect(16,16,648,488);ctx.fillStyle='rgba(139,94,60,.25)';ctx.fillRect(32,32,616,456);ctx.fillStyle='#6B4A2A';ctx.font='bold 36px Georgia,serif';ctx.textAlign='center';ctx.fillText('考古发现证书',340,90);var now=new Date();var rows=[['探索者',userName],['发现文物','玉虎 玉凤 玉人首 玉蝉 陶鼎 玉鹰'],['点燃圣火','已完成'],['探索历程','石家河七十载'],['日期',now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日']];rows.forEach(function(r,i){ctx.font='16px Georgia,serif';ctx.textAlign='left';ctx.fillStyle='#5A3A20';ctx.fillText(r[0],100,155+i*45);ctx.font='bold 17px Georgia,serif';ctx.textAlign='right';ctx.fillStyle='#3D2E1F';ctx.fillText(r[1],580,155+i*45)});ctx.save();ctx.translate(520,380);ctx.rotate(-0.15);ctx.fillStyle='#9B3A3A';ctx.font='bold 26px Georgia,serif';ctx.strokeStyle='#9B3A3A';ctx.lineWidth=3;ctx.strokeRect(458,318,132,52);ctx.fillText('石家河',524,357);ctx.restore();c.toBlob(function(b){var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download='石家河考古证书.png';a.click();URL.revokeObjectURL(u)})}
function shareCert(){var txt=userName+'完成了叩玉·石家河四千年文明之旅！';if(navigator.share){navigator.share({title:'叩玉·石家河',text:txt}).catch(function(){})}else{var ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;left:-9999px';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);alert('链接已复制！')}}
