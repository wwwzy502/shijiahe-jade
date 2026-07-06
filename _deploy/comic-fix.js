// Replacement JS for comic panels
const fs=require('fs');
let html=fs.readFileSync('index.html','utf8');

const oldStart='function makeComicPanels(gridId,labels,colors){';
const newCode=`function makeComicPanels(gridId,labels,colors,layoutId){
  var grid=document.getElementById(gridId);
  // Two tessellated layouts - every row sums to 100%
  var layoutA=[ // rows: 2+3+2+1=8
    [{w:'50%',h:'200px'},{w:'50%',h:'200px'}],
    [{w:'28%',h:'190px'},{w:'44%',h:'190px',trap:'r'},{w:'28%',h:'190px',trap:'l'}],
    [{w:'42%',h:'210px'},{w:'58%',h:'210px'}],
    [{w:'100%',h:'190px'}],
  ];
  var layoutB=[ // rows: 1+2+3+2=8
    [{w:'100%',h:'210px'}],
    [{w:'56%',h:'200px'},{w:'44%',h:'200px'}],
    [{w:'30%',h:'200px'},{w:'40%',h:'200px'},{w:'30%',h:'200px'}],
    [{w:'48%',h:'200px',trap:'r'},{w:'52%',h:'200px',trap:'l'}],
  ];
  var layout=(layoutId===0?layoutA:layoutB);
  var result=[],pi=0;
  layout.forEach(function(row){
    var rowDiv=document.createElement('div');rowDiv.className='comic-row';
    row.forEach(function(col){
      if(pi>=labels.length)return;
      var p=document.createElement('div');p.className='comic-panel';
      var clip='';
      if(col.trap==='r')clip=';clip-path:polygon(0 0,100% 0,90% 100%,0 100%)';
      if(col.trap==='l')clip=';clip-path:polygon(10% 0,100% 0,100% 100%,0 100%)';
      p.style.cssText='width:'+col.w+';height:'+col.h+clip;
      var c=document.createElement('canvas');c.width=240;c.height=160;var cx=c.getContext('2d');
      cx.fillStyle=colors[pi%colors.length];cx.fillRect(0,0,240,160);
      cx.fillStyle='rgba(255,255,255,.1)';cx.font='bold 16px KaiTi,serif';cx.textAlign='center';cx.fillText(labels[pi],120,70);
      cx.fillStyle='rgba(255,255,255,.06)';cx.font='10px sans-serif';cx.fillText('占位'+(pi+1),120,96);
      cx.fillStyle='rgba(189,155,74,.2)';cx.fillRect(0,0,240,2);
      var img=document.createElement('img');img.src=c.toDataURL();p.appendChild(img);
      var lbl=document.createElement('div');lbl.className='pl';lbl.textContent=labels[pi];p.appendChild(lbl);
      rowDiv.appendChild(p);result.push(p);pi++;
    });
    grid.appendChild(rowDiv);
  });
  return result;
}`;

// Find end of old function
const startIdx=html.indexOf(oldStart);
const endMarker='// ═══════════ 3D VIEWER';
const endIdx=html.indexOf(endMarker,startIdx);

html=html.slice(0,startIdx)+newCode+'\n'+html.slice(endIdx);
fs.writeFileSync('index.html',html);
console.log('Replaced');
