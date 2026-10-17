'use strict';
const scenes=[
['THE INVITATION','Blackthorn Academy','Beyond the rain-dark gates, a new chapter begins. Three friends have come to Blackthorn, where every choice might matter.','Rainy Gothic Academy'],
['PROLOGUE · ARRIVAL','The Gates','The road falls silent behind you. Rain shimmers on the stone, and a distant bell welcomes the academy’s newest arrivals.','Rainy Arrival at the Gothic Academy'],
['CHAPTER ONE · SUITE 417','Together Again','Three familiar voices meet in the halls of Blackthorn. The evening ahead promises more than any of you expect.','Event_Friends_find_each_other'],
['CHAPTER ONE · FOUNDERS’ EVENING','The Masquerade','The Great Hall glows beneath chandeliers. Music, old traditions and new introductions fill the night.','Event_Masked_ball_opening'],
['CHAPTER ONE · THE BALL','A Night to Remember','Among the masks and music, some conversations prove impossible to forget.','Gothic Academy Masquerade Toast'],
['CHAPTER TWO · AFTER HOURS','The Quiet Halls','After the celebrations, the silence feels different. The academy seems to be keeping its own counsel.','Moonlit Gothic Music Salon'],
['CHAPTER TWO · CHANGE','An Unexpected Turn','An unforeseen event disrupts the evening. The three friends must decide what to do next.','Rainy Gothic Academy'],
['CHAPTER THREE · THE LIBRARY','What Remains Unsaid','Some questions are best asked in the quiet. Others have followed you into the room.','Golden Tea in the Gothic Library (1)'],
['CHAPTER THREE · BETWEEN CLASSES','The Days After','Life at the academy continues, even while friendships, loyalties and possibilities grow more complicated.','Cozy Gothic Academy Tea Conversation'],
['CHAPTER FOUR · THE COURTYARD','A Sudden Storm','Rain changes everyone’s plans. Sometimes an interruption becomes an invitation.','Event_A_rainstorm_interrupts'],
['CHAPTER FOUR · FRIENDSHIP','A Moment Together','Florine, Maxine and Sam find time for each other in the middle of a strange term.','Event_Friends_find_each_other'],
['PREVIEW END','To Be Continued','The complete private mystery continues in the synchronized V16 server game. This public projection is a spoiler-free preview.','Rainy Gothic Academy']
];
const key='blackthorn_projector_screen_v2';
let state;try{state=JSON.parse(localStorage.getItem(key)||'{}')}catch{state={}}
state={scene:0,paused:false,...state};state.scene=Math.min(scenes.length-1,Math.max(0,state.scene|0));
const $=id=>document.getElementById(id);const save=()=>localStorage.setItem(key,JSON.stringify(state));
const sync=window.BlackthornSync;
const live=!!sync?.enabled;
const director=new URLSearchParams(location.search).get('director')==='1';
const syncBadge=document.createElement('div');
if(live){
 syncBadge.style.cssText='position:fixed;left:14px;bottom:14px;z-index:999;background:#091522ec;color:#eedebe;font:12px system-ui;padding:7px 12px;border:1px solid #8b7957;border-radius:5px';
 syncBadge.textContent='Synchronizing…';
 document.body.append(syncBadge);
 if(!director){$('next').hidden=true;$('pause').hidden=true;$('resume').hidden=true;}
}
function broadcast(){if(live&&director)sync.publish(state.scene,state.paused);}

function render(){const s=scenes[state.scene];$('chapter').textContent=s[0];$('title').textContent=s[1];$('words').textContent=s[2];$('image').style.backgroundImage='url("'+photo(s[3])+'")';$('next').textContent=state.scene===scenes.length-1?'Restart preview ↻':state.scene===0?'Enter Blackthorn Academy →':'Continue →';$('paused').hidden=!state.paused;}
function advance(){if((live&&!director)||state.paused)return;state.scene=(state.scene+1)%scenes.length;save();render();broadcast()}
function pause(v){if(live&&!director)return;state.paused=Boolean(v);save();render();broadcast()}
$('next').onclick=advance;$('pause').onclick=()=>pause(true);$('resume').onclick=()=>pause(false);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance()}else if(e.key.toLowerCase()==='p'){pause(!state.paused)}});
save();render();
if(live){
 sync.subscribe(remote=>{
   if(director)return;
   const n=Math.min(scenes.length-1,Math.max(0,remote.scene));
   if(state.scene!==n||state.paused!==remote.paused){
    state.scene=n;state.paused=remote.paused;save();render();
   }
 });
 sync.onStatus(status=>syncBadge.textContent='Blackthorn · '+status+(director?' · DIRECTOR':' · BEAMER'));
 if(director){
  const panel=document.createElement('details');
  panel.style.cssText='position:fixed;top:12px;right:12px;z-index:999;background:#102030ef;color:#f8e8c8;padding:12px;border:1px solid #9c875f;max-width:280px;font:13px system-ui';
  const summary=document.createElement('summary');summary.textContent='Director · player replies';panel.append(summary);
  const log=document.createElement('div');log.textContent='Waiting for replies…';panel.append(log);
  const history=[];sync.onChoice(ev=>{
   history.unshift(ev.role.toUpperCase()+' · '+ev.choiceId+' → '+(ev.option+1));
   history.splice(8);log.textContent=history.join(' | ');
  });
  document.body.append(panel);
 }
 sync.connect();
}
