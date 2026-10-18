'use strict';
// Cinematic projection layer. The canonical story data will be loaded from
// story-data.js when present; preview scenes remain a safe fallback.
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
const story=Array.isArray(window.BlackthornStory?.scenes)&&window.BlackthornStory.scenes.length ? window.BlackthornStory.scenes : scenes;
const storyLabel=window.BlackthornStory?.scenes?.length?'ORIGINAL STORY':'PREVIEW EDITION';
const pictureManifest=window.BlackthornImageManifest||{};
const photo=name=>'nieuwe%20fotos_SFM/'+encodeURIComponent(name+'.png');
const key='blackthorn_projector_cinematic_v1';
const oldKey='blackthorn_projector_screen_v2';
const q=new URLSearchParams(location.search);
const sync=window.BlackthornSync;
const live=Boolean(sync?.enabled);
const director=q.get('director')==='1';
let saved={};
try{saved=JSON.parse(localStorage.getItem(key)||localStorage.getItem(oldKey)||'{}')}catch(_){}
let state={scene:0,paused:false,started:false,...saved};
state.scene=Math.max(0,Math.min(story.length-1,Number(state.scene)||0));
let preferences={sound:false,reduceMotion:false};
try{preferences={...preferences,...JSON.parse(localStorage.getItem('blackthorn_preferences')||'{}')}}catch(_){}
const $=id=>document.getElementById(id);
const save=()=>localStorage.setItem(key,JSON.stringify(state));
const storePrefs=()=>localStorage.setItem('blackthorn_preferences',JSON.stringify(preferences));
const toast=text=>{const x=$('toast');x.textContent=text;x.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>x.hidden=true,2700);};
const currentScene=()=>story[state.scene];
const plainText=value=>typeof value==='string'?value:Array.isArray(value)?value.join(' '):String(value??'');
const sceneInfo=s=>{
 if(Array.isArray(s))return {chapter:s[0],title:s[1],body:s[2],image:s[3],kind:'narration'};
 return {chapter:s.kicker||s.stage||'BLACKTHORN ACADEMY',title:s.title||'',body:s.player_body||s.text||'',image:s.image||s.background||'',kind:s.type||'narration',lines:s.dialogue||[],display_location:s.display_location||''};
};
function applyImage(name){
 const filename=name||'Rainy Gothic Academy';
 const location=sceneInfo(currentScene()).display_location||'';
 const mapped=Object.entries(pictureManifest.locations||{}).find(([key])=>location.toUpperCase().includes(key));
 const preferred=mapped?.[1]||'';
 const preload=new Image();
 if(preferred){
  preload.onload=()=>{$('image').style.backgroundImage='linear-gradient(90deg,#090e18b0,#10192a33),url("'+preferred.replaceAll('"','%22')+'")'};
  preload.onerror=()=>{$('image').style.backgroundImage='linear-gradient(90deg,#090e18b0,#10192a33),url("'+photo(filename)+'")'};
  preload.src=preferred;
 }else $('image').style.backgroundImage='linear-gradient(90deg,#090e18b0,#10192a33),url("'+photo(filename)+'")';
}
function setMenu(open){
 $('menu').hidden=!open;$('game').hidden=open;
 $('pause').hidden=open||live&&!director;
 $('menuBack').hidden=open||live&&!director;
 if(open)applyImage('Rainy Gothic Academy');
 else renderScene();
}
function renderScene(){
 const s=sceneInfo(currentScene());
 $('chapter').textContent=plainText(s.chapter);
 $('progress').textContent=String(state.scene+1).padStart(2,'0')+' / '+String(story.length).padStart(2,'0');
 $('title').textContent=plainText(s.title);
 $('words').textContent=plainText(s.body);
 applyImage(s.image||'Rainy Gothic Academy');
 const lines=Array.isArray(s.lines)?s.lines:[];
 const hasDialogue=lines.length>=2 && lines[0].name && lines[1].name;
 $('narration').hidden=hasDialogue;$('dialogue').hidden=!hasDialogue;
 if(hasDialogue){
  const left=lines[0],right=lines[1];
  $('speakerLeft').textContent=left.name;$('nameLeft').textContent=left.name;$('lineLeft').textContent=plainText(left.text);
  $('speakerRight').textContent=right.name;$('nameRight').textContent=right.name;$('lineRight').textContent=plainText(right.text);
  $('portraitLeft').src=left.portrait||photo(left.image||'Florine_After_the_dance');
  $('portraitRight').src=right.portrait||photo(right.image||'Sam_Noticed_in_the_crowd');
  $('portraitLeft').alt=left.name;$('portraitRight').alt=right.name;
 }
 $('next').textContent=state.scene===story.length-1?'Return to menu →':'Continue →';
 $('previous').disabled=state.scene===0;
 $('paused').hidden=!state.paused;
 $('continueGame').disabled=!saved.started && !state.started;
}
function broadcast(){if(live&&director)sync.publish(state.scene,state.paused)}
function play(){
 if(live&&!director){toast('Waiting for Director');return}
 state.started=true;state.paused=false;save();setMenu(false);broadcast();
}
function next(){
 if(live&&!director || state.paused)return;
 if(state.scene>=story.length-1){state.started=false;save();setMenu(true);return}
 state.scene++;save();renderScene();broadcast();
}
function back(){
 if(live&&!director || state.paused)return;
 state.scene=Math.max(0,state.scene-1);save();renderScene();broadcast();
}
function pause(value){
 if(live&&!director)return;
 state.paused=Boolean(value);save();renderScene();broadcast();
}
function openModal(title,content){
 $('modalTitle').textContent=title;
 $('modalBody').replaceChildren();
 if(typeof content==='string'){$('modalBody').textContent=content;}
 else $('modalBody').append(content);
 $('modal').hidden=false;
}
function confirmNew(){
 const body=document.createElement('div');
 const p=document.createElement('p');p.textContent='Begin a new story from the first scene? This will replace the current projector checkpoint.';
 const b=document.createElement('button');b.textContent='✦ Start New Game';
 b.onclick=()=>{state={scene:0,paused:false,started:true};save();$('modal').hidden=true;setMenu(false);broadcast()};
 body.append(p,b);openModal('New Game',body);
}
function showSettings(){
 const body=document.createElement('div');
 const p=document.createElement('p');p.textContent='For the clearest projection, use fullscreen (F11). Phones keep their original Blackthorn Phones interface.';
 body.append(p);
 for(const [name,keyName] of [['Reduce animations','reduceMotion'],['Ambient audio (when supported)','sound']]){
  const label=document.createElement('label');label.textContent=name+' ';
  const check=document.createElement('input');check.type='checkbox';check.checked=!!preferences[keyName];check.style.width='auto';
  check.onchange=()=>{preferences[keyName]=check.checked;storePrefs();document.body.classList.toggle('reduce-motion',preferences.reduceMotion)};
  label.append(check);body.append(label);
 }
 const stat=document.createElement('p');stat.textContent=live?'Shared session: '+sync.session:'Local preview; add ?session=YOUR_SESSION&director=1 for synced play.';
 body.append(stat);openModal('Settings',body);
}
$('newGame').onclick=confirmNew;
$('continueGame').onclick=()=>{if(!state.started)return;setMenu(false);broadcast()};
$('loadGame').onclick=()=>{if(!state.started){toast('No saved checkpoint yet.');return}setMenu(false);toast('Checkpoint restored.');broadcast()};
$('settingsGame').onclick=showSettings;
$('creditsGame').onclick=()=>openModal('Credits','Blackthorn Academy · The Veiled Moon. A collaborative mystery experience for Florine, Maxine and Sam.');
$('modalClose').onclick=()=>{$('modal').hidden=true};
$('modal').onclick=e=>{if(e.target===$('modal'))$('modal').hidden=true};
$('next').onclick=next;$('previous').onclick=back;
$('pause').onclick=()=>pause(true);$('resume').onclick=()=>pause(false);
$('menuBack').onclick=()=>{if(live&&!director)return;save();setMenu(true)};
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,textarea'))return;
 if(e.key==='Escape'){$('modal').hidden=true;return}
 if(!$('menu').hidden && (e.key==='Enter')){e.preventDefault();if(state.started)setMenu(false);else confirmNew()}
 if($('game').hidden)return;
 if(['ArrowRight',' '].includes(e.key)){e.preventDefault();next()}
 if(e.key==='ArrowLeft'){e.preventDefault();back()}
 if(e.key.toLowerCase()==='p')pause(!state.paused);
});
if(live){
 const indicator=document.createElement('div');
 indicator.style.cssText='position:fixed;bottom:12px;left:12px;z-index:99;background:#0b1822e8;border:1px solid #a58455;padding:6px 10px;font:12px Georgia;color:#efdab6';
 document.body.append(indicator);
 sync.onStatus(status=>{indicator.textContent='BLACKTHORN · '+status+(director?' · DIRECTOR':' · BEAMER')});
 sync.subscribe(remote=>{
  if(director)return;
  const n=Math.min(story.length-1,Math.max(0,remote.scene));
  const changed=state.scene!==n||state.paused!==remote.paused||!state.started;
  state.scene=n;state.paused=remote.paused;state.started=true;
  if(changed){save();setMenu(false)}
 });
 if(director){
  const panel=document.createElement('details');panel.className='director-status';
  panel.style.cssText='position:fixed;top:5%;right:15%;z-index:98;background:#0b182de8;border:1px solid #bd9c6a;padding:12px;font:14px Georgia;color:#f6e5c2;max-width:320px';
  const summary=document.createElement('summary');summary.textContent='Director · Player choices';panel.append(summary);
  const log=document.createElement('div');log.textContent='Waiting for choices…';panel.append(log);
  const receipt=[];sync.onChoice(event=>{receipt.unshift(event.role+' · '+event.choiceId+' → '+(event.option+1));receipt.splice(10);log.textContent=receipt.join(' | ')});
  document.body.append(panel);
 }
 sync.connect();
}
document.body.classList.toggle('reduce-motion',preferences.reduceMotion);
setMenu(!state.started);
