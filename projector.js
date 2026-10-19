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
const readiness=new Map();
const playerNames=['florine','maxine','sam'];
let updateDirectorReadiness=()=>{};
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
function reactionDialogue(scene){
 const raw=String(scene?.npc_and_shared_reactions||'');
 const re=/([A-Z][A-Z .-]{2,36}):\s*[“"]([^”"]{5,700})[”"]/g;
 const lines=[...raw.matchAll(re)].map(m=>({name:m[1].trim(),text:m[2]}));
 // Only literal scripted speech can become portrait dialogue. Never generate lines.
 return lines.length>=2?lines.slice(0,2):[];
}
function silhouette(name){
 const initials=String(name||'✦').split(/\s+/).map(x=>x[0]||'').slice(0,2).join('');
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><defs><radialGradient id="g"><stop stop-color="#334456"/><stop offset="1" stop-color="#101a2a"/></radialGradient></defs><circle cx="128" cy="128" r="128" fill="url(#g)"/><circle cx="128" cy="128" r="108" fill="none" stroke="#bd985e" stroke-width="2"/><text x="128" y="153" font-family="Georgia" font-size="64" text-anchor="middle" fill="#f2d8a5">'+initials.replace(/[&<>"]/g,'')+'</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function portraitFor(name){
 const person=String(name||'').toLowerCase();
 const found=Object.entries(pictureManifest.portraits||{}).find(([key])=>person.includes(key));
 if(found){
  const candidates=found[1];
  return Array.isArray(candidates)?candidates:[candidates];
 }
 return [silhouette(name)];
}
function setPortrait(imgId,name){
 const candidates=portraitFor(name);
 const el=$(imgId);
 const tryPhoto=n=>{
  if(n>=candidates.length){el.src=silhouette(name);return;}
  el.onerror=()=>tryPhoto(n+1);
  el.src=candidates[n];
 };
 tryPhoto(0);
}
const sceneInfo=s=>{
 if(Array.isArray(s))return {chapter:s[0],title:s[1],body:s[2],image:s[3],kind:'narration'};
 const en=window.BlackthornEnglish?.[s.scene_id];
 return {chapter:String(s.stage||'BLACKTHORN ACADEMY').replaceAll('_',' '),title:en?.[0]||'The Academy',body:en?.[1]||'The story continues. Please ask the Director to check the original scene.',image:s.image||s.background||'',kind:s.type||'narration',lines:[],display_location:s.display_location||''};
};
let imageRequest=0;
const existingSceneFallback=name=>'nieuwe%20fotos_SFM/'+encodeURIComponent(name+'.png');
function imageCandidates(scene,menu=false){
 // Curated scene routes are authoritative. Never use an unrelated location
 // photograph or generic academy image when a chosen image fails.
 if(menu)return ["extra-original-photos/blackthorn_academy_exterior_rainy_evening.webp"];
 const id=String(scene?.scene_id||'');
 return pictureManifest.sceneImages?.[id]||[];
}
function applyImage(_name,menu=false){
 const request=++imageRequest;
 const candidates=imageCandidates(menu?null:currentScene(),menu);
 const element=$('image');
 // Immediately remove the previous scene's background, avoiding stale photos.
 element.style.removeProperty('--scene-photo');
 const attempt=index=>{
  if(request!==imageRequest)return;
  if(index>=candidates.length){
   console.warn('Blackthorn: no usable curated scene image for',menu?'MENU':currentScene()?.scene_id);
   return;
  }
  const src=candidates[index];
  const probe=new Image();
  probe.onload=()=>{
   if(request===imageRequest)
    element.style.setProperty('--scene-photo','url("'+src.replaceAll('"','%22')+'")');
  };
  probe.onerror=()=>attempt(index+1);
  probe.src=src;
 };
 attempt(0);
}
function setMenu(open){
 $('menu').hidden=!open;$('game').hidden=open;
 $('pause').hidden=open||live&&!director;
 $('menuBack').hidden=open||live&&!director;
 if(open)applyImage('Rainy Gothic Academy',true);
 else renderScene();
}
function renderScene(){
 const s=sceneInfo(currentScene());
 const stageLabels={FOUNDERS_MORNING:'Founders Week',GETTING_READY:'Founders Evening',BALL:'The Masquerade',INCIDENT:'The Incident',WEEK1:'Week One',WEEK2:'Week Two',WEEK3:'Week Three',WEEK4:'Week Four',FINALE:'The Finale',EPILOGUE:'Epilogue'};
 $('chapter').textContent=stageLabels[currentScene()?.stage]||'Blackthorn Academy';
 $('progress').textContent=String(state.scene+1).padStart(2,'0')+' / '+String(story.length).padStart(2,'0');
 const id=String(currentScene()?.scene_id||'');
 const titleScenes=new Set(['S00','S06','S08','S12A','S17','S23','S26','S29','S30']);
 const showTitle=titleScenes.has(id);
 $('title').textContent=showTitle?plainText(s.title):'';
 $('title').hidden=!showTitle;
 $('words').textContent=plainText(s.body);
 $('narration').classList.toggle('has-scene-title',showTitle);
 applyImage(s.image||'Rainy Gothic Academy');
 const lines=Array.isArray(s.lines)?s.lines:[];
 const hasDialogue=lines.length>=2 && lines[0].name && lines[1].name;
 $('narration').hidden=hasDialogue;$('dialogue').hidden=!hasDialogue;
 if(hasDialogue){
  const left=lines[0],right=lines[1];
  $('speakerLeft').textContent=left.name;$('nameLeft').textContent=left.name;$('lineLeft').textContent=plainText(left.text);
  $('speakerRight').textContent=right.name;$('nameRight').textContent=right.name;$('lineRight').textContent=plainText(right.text);
  if(left.portrait)$('portraitLeft').src=left.portrait;else setPortrait('portraitLeft',left.name);
  if(right.portrait)$('portraitRight').src=right.portrait;else setPortrait('portraitRight',right.name);
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
function requiresReady(){
 const meta=currentScene();
 return !!(meta&&!Array.isArray(meta)&&String(meta.shared_interactions||'').includes('WACHT TOT ALLE DRIE KLAAR ZIJN'));
}
function readyList(){
 return playerNames.filter(role=>readiness.get(role)===state.scene);
}
function performNext(){
 if(state.scene>=story.length-1){state.started=false;save();setMenu(true);return}
 state.scene++;readiness.clear();save();renderScene();updateDirectorReadiness();broadcast();
}
function next(){
 if(live&&!director || state.paused)return;
 if(live&&director&&requiresReady()&&readyList().length<3){
  const content=document.createElement('div');
  const missing=playerNames.filter(role=>!readyList().includes(role));
  const message=document.createElement('p');
  message.textContent='Still waiting for: '+missing.map(x=>x[0].toUpperCase()+x.slice(1)).join(', ')+'.';
  const continueBtn=document.createElement('button');
  continueBtn.textContent='Continue anyway';
  continueBtn.onclick=()=>{$('modal').hidden=true;performNext()};
  content.append(message,continueBtn);
  openModal('Players not ready',content);
  return;
 }
 performNext();
}
function back(){
 if(live&&!director || state.paused)return;
 state.scene=Math.max(0,state.scene-1);readiness.clear();save();renderScene();updateDirectorReadiness();broadcast();
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
 b.onclick=()=>{state={scene:0,paused:false,started:true};readiness.clear();save();$('modal').hidden=true;setMenu(false);updateDirectorReadiness();broadcast()};
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
  const readyPanel=document.createElement('p');
  readyPanel.style.cssText='font-size:13px;color:#e9d5ad';
  panel.append(readyPanel);
  updateDirectorReadiness=()=>{
   const ready=readyList();
   readyPanel.textContent='Ready for scene '+(state.scene+1)+': '+playerNames.map(p=>(ready.includes(p)?'✓ ':'○ ')+p).join(' · ');
  };
  sync.onReady(message=>{
   if(!playerNames.includes(message.role)||message.scene!==state.scene)return;
   readiness.set(message.role,message.scene);updateDirectorReadiness();
  });
  sync.onHello(()=>{if(state.started)broadcast()});
  updateDirectorReadiness();
  document.body.append(panel);
 }
 sync.connect();
}
document.body.classList.toggle('reduce-motion',preferences.reduceMotion);
setMenu(!state.started);
