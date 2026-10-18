'use strict';
/* Private-in-practice Director desk; relies only on GitHub Pages and public ntfy.sh.
 * The original story is public by user's one-night-game preference.
 */
(function(){
 const $=id=>document.getElementById(id);
 const query=new URLSearchParams(location.search);
 let session=query.get('session')||'';
 if(!/^[A-Za-z0-9_-]{16,64}$/.test(session)){
   const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);
   session=[...bytes].map(x=>x.toString(16).padStart(2,'0')).join('');
   const url=new URL(location.href);url.searchParams.set('session',session);
   url.searchParams.set('director','1');location.replace(url.href);return;
 }
 if(query.get('director')!=='1'){const url=new URL(location.href);url.searchParams.set('director','1');location.replace(url.href);return;}
 const story=window.BlackthornStory?.scenes||[];
 const sync=window.BlackthornSync;
 const key='blackthorn_projector_cinematic_v1';
 let state={scene:0,paused:false,started:false};
 try{state={...state,...JSON.parse(localStorage.getItem(key)||'{}')}}catch(_){}
 state.scene=Math.max(0,Math.min(story.length-1,Number(state.scene)||0));
 const roles=['florine','maxine','sam'];
 const ready=new Map(),receipts=[],known=new Set(),submissions=new Map();
 const approvalKey='blackthorn_puzzle_approvals_'+session;
 let approvals={};try{approvals=JSON.parse(localStorage.getItem(approvalKey)||'{}')}catch(_){}
 const puzzleForScene=()=>{const marker=String(story[state.scene]?.puzzle_marker||'');return /^P[1-4]_READY$/.test(marker)?marker.slice(0,2):''};
 const persist=()=>localStorage.setItem(key,JSON.stringify(state));
 const root=new URL('./',location.href);
 const url=(path,params)=>{const u=new URL(path,root);for(const [k,v] of Object.entries(params))u.searchParams.set(k,v);return u.href};
 const links=[
  ['Director',url('director.html',{session,director:'1'})],
  ['Beamer',url('./',{session})],
  ['Florine',url('phone/',{character:'florine',session})],
  ['Maxine',url('phone/',{character:'maxine',session})],
  ['Sam',url('phone/',{character:'sam',session})]
 ];
 $('sessionCode').value=session;
 for(const [name,address] of links){
  const a=document.createElement('a');a.href=address;a.target='_blank';a.rel='noopener noreferrer';
  a.textContent=name+' ↗';a.title=address;$('links').append(a);
 }
 $('copyAll').onclick=async()=>{
  const content=links.map(([name,address])=>name+': '+address).join('\n');
  try{await navigator.clipboard.writeText(content);$('copyAll').textContent='✓ Links copied'}catch(_){
   $('copyAll').textContent='Open each link below to share';
  }
 };
 function readiness(){
  for(const role of roles){
   const el=$('ready'+role[0].toUpperCase()+role.slice(1));
   const yes=ready.get(role)===state.scene;
   el.classList.toggle('ready',yes);el.querySelector('b').textContent=yes?'✓ Ready':'○ Waiting';
  }
 }
 function renderReceipts(){
  const list=$('receipts');list.replaceChildren();
  if(!receipts.length){const li=document.createElement('li');li.textContent='No answers received yet.';list.append(li);return}
  for(const item of receipts.slice(0,14)){
   const li=document.createElement('li');
   li.textContent=item.role[0].toUpperCase()+item.role.slice(1)+' · '+item.flow+' · Option '+(item.option+1);
   list.append(li);
  }
 }
 function renderPuzzles(){
  const puzzle=puzzleForScene(),panel=$('puzzlePanel');
  panel.hidden=!puzzle;
  if(!puzzle)return;
  $('puzzleTitle').textContent='Investigation checkpoint '+puzzle;
  const solved=!!approvals[puzzle];
  $('puzzleStatus').textContent=solved?'✓ Approved. You may advance.':'Awaiting your approval. Read submitted answers before advancing.';
  $('approvePuzzle').hidden=solved;
  const list=$('puzzleSubmissions');list.replaceChildren();
  const items=submissions.get(puzzle)||[];
  if(!items.length){const li=document.createElement('li');li.textContent='No answers submitted yet.';list.append(li)}
  for(const item of items.slice(-10)){
   const li=document.createElement('li');
   const name=document.createElement('strong');name.textContent=item.role+': ';
   const quote=document.createElement('span');quote.textContent=item.text;li.append(name,quote);list.append(li);
  }
 }
 $('approvePuzzle').onclick=()=>{
  const puzzle=puzzleForScene();
  if(!puzzle||!confirm('Approve investigation checkpoint '+puzzle+' and allow the story to continue?'))return;
  approvals[puzzle]=true;
  localStorage.setItem(approvalKey,JSON.stringify(approvals));
  sync.publishApproval(puzzle,true);renderPuzzles();
 };
 function render(){
  const scene=story[state.scene]||{};
  $('position').textContent='SCENE '+(state.scene+1)+' / '+story.length;
  const english=window.BlackthornEnglish?.[scene.scene_id];
  $('sceneTitle').textContent=english?.[0]||'The Academy';
  $('sceneChapter').textContent=String(scene.stage||'').replaceAll('_',' ');
  $('sceneInstructions').textContent=english?.[1]||'English Director notes for this scene have not yet been prepared.';
  if(/^P[1-4]_READY$/.test(String(scene.puzzle_marker||'')))
   $('sceneInstructions').textContent+='\n\nInvestigation checkpoint: review player submissions before approval.';
  if(String(scene.shared_interactions||'').includes('WACHT TOT ALLE DRIE KLAAR ZIJN'))
   $('sceneInstructions').textContent+='\n\nWait until all three players have completed their private phone moments.';
  $('sceneInstructions').style.whiteSpace='pre-wrap';
  $('pause').disabled=!state.started||state.paused;
  $('resume').disabled=!state.started||!state.paused;
  $('previous').disabled=!state.started||state.scene===0;
  $('next').disabled=!state.started||state.paused||state.scene===story.length-1;
  readiness();renderReceipts();renderPuzzles();
 }
 function send(){persist();render();if(sync.enabled)sync.publish(state.scene,state.paused)}
 function requiresEveryone(){
  const s=story[state.scene]||{};
  return String(s.shared_interactions||'').includes('WACHT TOT ALLE DRIE KLAAR ZIJN');
 }
 $('start').onclick=()=>{
  if(state.started&&!confirm('Start a new game from scene 1? The current Director checkpoint will be replaced.'))return;
  state={scene:0,paused:false,started:true};ready.clear();receipts.length=0;known.clear();submissions.clear();approvals={};localStorage.setItem(approvalKey,'{}');send();
 };
 $('previous').onclick=()=>{if(state.paused||state.scene===0)return;state.scene--;ready.clear();send()};
 $('next').onclick=()=>{
  if(state.paused||state.scene>=story.length-1)return;
  const puzzle=puzzleForScene();
  if(puzzle&&!approvals[puzzle]){alert('Approve investigation checkpoint '+puzzle+' before advancing.');return;}
  const missing=roles.filter(r=>ready.get(r)!==state.scene);
  if(requiresEveryone()&&missing.length&&
    !confirm('Still waiting for '+missing.join(', ')+'. Continue anyway?'))return;
  state.scene++;ready.clear();send();
 };
 $('pause').onclick=()=>{state.paused=true;send()};
 $('resume').onclick=()=>{state.paused=false;send()};
 if(sync.enabled){
  sync.onStatus(text=>{$('connection').textContent='● '+text});
  sync.onChoice(ev=>{
   if(!roles.includes(ev.role)||!Number.isInteger(ev.option)||!ev.choiceId)return;
   const id=ev.source+':'+ev.choiceId+':'+ev.revision;
   if(known.has(id))return;known.add(id);
   receipts.unshift({role:ev.role,flow:ev.choiceId,option:ev.option});
   receipts.splice(20);renderReceipts();
  });
  sync.onSubmission(ev=>{
   if(!/^P[1-4]$/.test(ev.puzzle)||!roles.includes(ev.role)||typeof ev.text!=='string')return;
   const previous=submissions.get(ev.puzzle)||[];
   previous.push({role:ev.role,text:ev.text.slice(0,1200)});
   previous.splice(0,Math.max(0,previous.length-20));
   submissions.set(ev.puzzle,previous);
   renderPuzzles();
  });
  sync.onReady(ev=>{
   if(!roles.includes(ev.role)||ev.scene!==state.scene)return;
   ready.set(ev.role,ev.scene);readiness();
  });
  sync.onHello(()=>{
   if(state.started)sync.publish(state.scene,state.paused);
   for(const [puzzle,approved] of Object.entries(approvals))if(approved)sync.publishApproval(puzzle,true);
  });
  sync.connect();
 }else $('connection').textContent='Session not connected';
 window.addEventListener('storage',ev=>{
  if(ev.key!==key||!ev.newValue)return;
  try{const incoming=JSON.parse(ev.newValue);state={...state,...incoming};render()}catch(_){}
 });
 render();
})();