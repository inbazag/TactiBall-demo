const canvas = document.getElementById('pitch');
const ctx = canvas.getContext('2d');

// starting player positions (team) and opponents
const players = [{x:80,y:80},{x:160,y:200},{x:300,y:260}];
const opp = [{x:420,y:120},{x:480,y:220}];
let seq = [];

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // pitch background
  ctx.fillStyle = '#dff0d8';
  ctx.fillRect(30,20,540,360);
  ctx.strokeStyle = '#1b6d2b';
  ctx.lineWidth = 2;
  ctx.strokeRect(30,20,540,360);

  // center line
  ctx.beginPath();
  ctx.moveTo(30+270,20);
  ctx.lineTo(30+270,20+360);
  ctx.strokeStyle = '#cfeccc';
  ctx.stroke();

  // players (blue)
  players.forEach(p=>{
    ctx.beginPath(); ctx.fillStyle='#1e90ff'; ctx.arc(p.x,p.y,16,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white'; ctx.font='12px Arial'; ctx.textAlign='center'; ctx.fillText('P', p.x, p.y+4);
  });

  // opponents (red)
  opp.forEach(o=>{
    ctx.beginPath(); ctx.fillStyle='#ff5c5c'; ctx.arc(o.x,o.y,16,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white'; ctx.font='12px Arial'; ctx.textAlign='center'; ctx.fillText('O', o.x, o.y+4);
  });
}
draw();

// block click handlers
document.querySelectorAll('.block').forEach(b=>{
  b.addEventListener('click', ()=>{
    seq.push(b.dataset.cmd);
    document.getElementById('feedback').innerText = 'Sequence: ' + seq.join(' → ');
  });
});

document.getElementById('run').addEventListener('click', ()=>{
  // Quick Boost question (simplified interaction)
  const q = "Quick Boost: Which player would you pass to for the fastest goal?\n1) Left\n2) Centre\n3) Right\n(Press OK for Centre as example)";
  // For a demo we use confirm: OK means correct (Centre), Cancel means incorrect
  const qCorrect = confirm(q);
  if(!qCorrect){
    alert('Wrong choice — not enough energy. Try answering again.');
    return;
  }
  if(seq.length===0){ alert('Choose some blocks first!'); return; }
  const last = seq[seq.length-1];
  if(last==='SHOOT'){
    alert('Goal! You thought and scored!');
  } else {
    alert('No goal — add a SHOOT at the end of your sequence.');
  }
  seq=[];
  document.getElementById('feedback').innerText = '';
});
