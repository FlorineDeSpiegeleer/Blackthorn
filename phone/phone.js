'use strict';
const ROLE=new URLSearchParams(location.search).get('character');
const VALID=['florine','maxine','sam'];
const params=new URLSearchParams(location.search);
const KEY='blackthorn_phone_public_preview_v2_';
let role=VALID.includes(ROLE)?ROLE:'';
const STAGES=['ARRIVAL','FOUNDERS','BALL','AFTERMATH','ACADEMY'];
const contacts={florine:'Alexander',maxine:'Theo',sam:'Nate'};
const portrait={florine:'Florine_After_the_dance',maxine:'Maxine_Two_contrasting_glances',sam:'Sam_Noticed_in_the_crowd'};
const photos={
 florine:['Florine_After_the_dance','Florine_Formal_dance','Florine_Library_debate','Florine_Coffee_whithout_explenation','Florine_Quiet_animal_encounter','Florine_Shared_shelter'],
 maxine:['Maxine_Two_contrasting_glances','Maxine_Theo_Dance_under_the_chandeliers','Maxine_Adrian_Courtyard_date','Maxine_Theo_First_private_rivalry','Maxine_Adrian_Formal_dance_alternative','Maxine_Private_choice_pause'],
 sam:['Sam_Noticed_in_the_crowd','Sam_A_shared_umbrella','Sam_Private_library_date','Sam_A_dog_interrupts','Sam_Tulip_bouquet','Sam_Inside_joke']
};
const photo=name=>'../nieuwe%20fotos_SFM/'+encodeURIComponent(name+'.png');
const memory=()=>{try{return JSON.parse(localStorage.getItem(KEY+role)||'{}')}catch{return {}}};
let state={stage:0,view:'home',thread:null,answers:{},notes:'',...memory()};
const screen=document.getElementById('screen');
const sync=window.BlackthornSync;
const live=!!sync?.enabled;
let remotelyPaused=false;
let status='connecting';

const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
const save=()=>localStorage.setItem(KEY+role,JSON.stringify(state));
const go=(view,thread=null)=>{state.view=view;state.thread=thread;save();render();scrollTo(0,0)};
function uiButton(text,fn,cls){const b=node('button',text,cls);b.type='button';b.onclick=fn;return b}
function img(name,cls){const im=node('img',undefined,cls);im.src=photo(name);im.alt=name.replaceAll('_',' ');im.loading='lazy';im.onerror=()=>{im.style.display='none'};return im}
function time(){return new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit'}).format(new Date())}
function wrap(){let w=node('div',undefined,'phone');screen.replaceChildren(w);return w}
function header(w,title){const hd=node('div',undefined,'appheader');hd.append(uiButton('‹ Back',()=>go('home'),'navback'),node('h1',title),node('span','✦'));w.append(hd)}
function nav(w){const n=node('div',undefined,'bottomnav');[['⌂','Home','home'],['✉','Messages','messages'],['▧','Photos','photos'],['✎','Notes','notes']].forEach(([ico,name,view])=>n.append(uiButton(ico+' '+name,()=>go(view))));w.append(n)}
function drawHome(w){const h=node('section',undefined,'home');h.style.backgroundImage='linear-gradient(#17243a77,#0b1929b3),url("'+photo(portrait[role])+'")';
const bar=node('div',undefined,'topbar');bar.append(node('span','BLACKTHORN'),node('span',time()+'  ▰ ▴'));h.append(bar);
const intro=node('div',undefined,'identity');intro.append(node('div',time(),'clock'),node('div',role.toUpperCase(),'person'),node('div','BLACKTHORN ACADEMY','academy'));h.append(intro);
const grid=node('div',undefined,'grid');const apps=[['✉','Messages','messages'],['▧','Photos','photos'],['▣','Camera','camera'],['✦','Blackthorn','blackthorn'],['⌖','Map','map'],['✎','Notes','notes'],['▦','Calendar','calendar'],['☎','Calls','calls']];
apps.forEach(([ico,label,view])=>{const b=node('button',undefined,'appbutton');const symbol=node('span',ico,'appicon');b.append(symbol,node('span',label));if(view==='messages'&&state.stage>0){b.append(node('span','●','bubble'))}b.onclick=()=>go(view);grid.append(b)});
h.append(grid);const dock=node('div',undefined,'dock');[['✉','messages'],['☎','calls'],['✎','notes']].forEach(([ico,v])=>dock.append(uiButton(ico,()=>go(v),'appicon')));h.append(dock);w.append(h)}
function canonicalEntries(){
 const source=window.BlackthornStory;
 if(!source || !Array.isArray(source.scenes) || !Array.isArray(source.flows))return null;
 const latest=Math.max(0,Math.min(source.scenes.length-1,Number(state.canonicalScene)||0));
 const seen=new Set();
 const flowById=new Map(source.flows.map(f=>[String(f.flow_id).trim(),f]));
 const result=[];
 for(let i=0;i<=latest;i++){
  const s=source.scenes[i];
  const refs=String(s.phone_flow_ids||'').split(/[|,;\s]+/).filter(Boolean);
  for(const ref of refs){
   if(seen.has(ref))continue;seen.add(ref);
   const f=flowById.get(ref);
   if(!f || ![role.toLowerCase(),'all'].includes(String(f.character||'').toLowerCase()))continue;
   const choices=[f.intent_1,f.intent_2,f.intent_3].map(x=>String(x||'').trim()).filter(Boolean);
   const responses=[f.reaction_1,f.reaction_2,f.reaction_3].slice(0,choices.length).map(x=>String(x||''));
   result.push({
     at:i,thread:String(f.thread||'Academy Notices'),
     from:String(f.thread||'Blackthorn Academy'),
     text:String(f.opening_text||''),choices, responses,
     id:String(f.flow_id),canonical:true,
     conditional:Boolean(String(f.condition||'').trim())
   });
  }
 }
 return result;
}
function visibleEntries(){
 const canonical=canonicalEntries();
 if(canonical!==null)return canonical;

const shared=[
{at:0,thread:'Suite 417',from:'Blackthorn Guest Services',text:'Welcome to Blackthorn Academy. Please keep your invitation available at check-in.'},
{at:1,thread:'Suite 417',from:'Suite 417',text:'Are we all meeting downstairs? I refuse to miss the first evening together.'},
{at:2,thread:'Suite 417',from:'Suite 417',text:'Founders’ Evening starts soon. Everyone ready?'},
{at:3,thread:'Academy Notices',from:'Academy Reception',text:'Students: please follow tonight’s updated hall notices.'},
{at:4,thread:'Suite 417',from:'Suite 417',text:'Library after lunch? We have plenty to talk about.'}
];
const personal={
florine:[
{at:1,thread:'Alexander',from:'Alexander',text:'Still certain your argument was better than mine?',choices:['Of course.','Perhaps we should compare notes.','I have more important things to do.'],responses:['Somehow, I expected that.','A surprisingly reasonable offer.','Fair enough. Another time.']},
{at:2,thread:'Alexander',from:'Alexander',text:'I believe there is a dance left unclaimed.',choices:['Then ask me properly.','I might say yes.','Not tonight.'],responses:['May I have this dance?','That is encouraging.','I understand.']},
{at:4,thread:'Alexander',from:'Alexander',text:'A seat has opened up by the library window. If you want it.',choices:['Save it for me.','You remembered my favourite table?','Maybe another day.'],responses:['Consider it done.','Pure coincidence, obviously.','No pressure.']},
],
maxine:[
{at:1,thread:'Theo',from:'Theo',text:'You were remarkably confident back there.',choices:['I was right.','Did you enjoy losing?','Are you always like this?'],responses:['That remains under discussion.','You think I lost? Interesting.','Only with worthy opponents.']},
{at:2,thread:'Adrian',from:'Adrian',text:'Would you like a quieter conversation after the dance?',choices:['I would.','Only if you promise to be honest.','Not this evening.'],responses:['I will find you then.','I can do that.','Of course. Another time.']},
{at:4,thread:'Theo',from:'Theo',text:'Our conversation was interrupted. I still disagree with you.',choices:['Then meet me and explain.','You just want the last word.','We can leave it there.'],responses:['With pleasure.','You know me too well.','As you wish.']},
{at:4,thread:'Adrian',from:'Adrian',text:'A walk through the courtyard might be a welcome change.',choices:['Meet me at the arches.','Tell me what is on your mind first.','I need some time alone.'],responses:['I will be there.','I was hoping you would ask.','Then I will not intrude.']}
],
sam:[
{at:1,thread:'Nate',from:'Nate',text:'You looked like you could use somewhere quieter.',choices:['How did you notice?','Do you know somewhere?','I am fine, thank you.'],responses:['I pay attention.','The library is usually empty at this hour.','Glad to hear it.']},
{at:2,thread:'Nate',from:'Nate',text:'I still think the map is to blame for that near collision.',choices:['Clearly the map.','You were not looking either.','At least it was funny.'],responses:['Thank you for your support.','I admit nothing.','That, I agree with.']},
{at:4,thread:'Nate',from:'Nate',text:'The window table is free, if you want somewhere quiet to work.',choices:['I will be there.','That is thoughtful of you.','Another time?'],responses:['See you soon.','It seemed like something you would appreciate.','Whenever you like.']}
]};
return [...shared,...personal[role]].filter(x=>x.at<=state.stage).map((x,i)=>({...x,id:x.thread+'-'+x.at+'-'+i}))}
function listMessages(w){header(w,'Messages');const all=visibleEntries(),threads=[...new Set(all.map(x=>x.thread))];const cont=node('div');threads.forEach(thread=>{let entries=all.filter(x=>x.thread===thread),last=entries[entries.length-1];let b=node('button',undefined,'thread');let av=node('div',thread.slice(0,1),'avatar'),detail=node('div');detail.append(node('strong',thread),node('p',last.text));b.append(av,detail);b.onclick=()=>go('thread',thread);cont.append(b)});if(!threads.length)cont.append(node('p','No new messages.','blank'));w.append(cont);nav(w)}
function drawThread(w){const thread=state.thread||'Suite 417';header(w,thread);const entries=visibleEntries().filter(x=>x.thread===thread);let messages=node('div',undefined,'messages');entries.forEach(entry=>{let box=node('div',undefined,'msg');box.append(node('div',entry.from+' · Received','who'),node('div',entry.text));messages.append(box);if(state.answers[entry.id]!==undefined){let chosen=state.answers[entry.id];let mine=node('div',entry.choices[chosen],'msg mine');messages.append(mine);messages.append(node('div',entry.responses[chosen],'msg'))}});w.append(messages);
const pending=entries.filter(x=>x.choices&&state.answers[x.id]===undefined);if(pending.length){let current=pending[0],options=node('div',undefined,'replychoices');options.append(node('p','Choose your reply:','notice'));current.choices.forEach((c,i)=>options.append(uiButton(c,()=>{state.answers[current.id]=i;save();if(live)sync.publishChoice(role,current.id,i);render()},'plainbutton')));w.append(options)}nav(w)}
function drawPhotos(w){header(w,'Photos');const content=node('div',undefined,'content');const grid=node('div',undefined,'photogrid');photos[role].forEach(photoName=>{const a=img(photoName);a.addEventListener('click',()=>go('photo',photoName));grid.append(a)});content.append(grid);w.append(content);nav(w)}
function drawPhoto(w){header(w,'Photo');let content=node('div',undefined,'content');content.append(img(state.thread,'largephoto'));w.append(content);nav(w)}
function drawNotes(w){header(w,'Notes');const content=node('div',undefined,'content');content.append(node('p','Private notes — saved on this device only.','notice'));const a=node('textarea',undefined,'notearea');a.placeholder='Write down what you noticed…';a.value=state.notes||'';a.addEventListener('input',()=>{state.notes=a.value;save()});content.append(a);w.append(content);nav(w)}
function drawOther(w){const view=state.view;header(w,({blackthorn:'Blackthorn',map:'Academy Map',calendar:'Calendar',calls:'Calls',camera:'Camera'}[view]||view));const content=node('div',undefined,'content');
if(view==='blackthorn'){const card=node('div',undefined,'card');card.append(node('h3','Personal Academy Portal'),node('p','Preview chapter: '+STAGES[state.stage]+'. New messages appear in Messages as chapters are released.'));content.append(card);content.append(node('p',window.BlackthornStory?.scenes?'Your chapter updates as the Director advances.':'Preview only: this button simulates a new chapter on this phone.','notice'));if(!live)content.append(uiButton('Simulate next chapter →',()=>{state.stage=(state.stage+1)%STAGES.length;save();go('messages')},'plainbutton'));else content.append(node('p','Director controls the shared chapter.','notice'))}
if(view==='map'){const card=node('div',undefined,'card');card.append(node('h3','Academy grounds'),node('p','Great Hall · Library · Courtyard · Observatory'));content.append(card)}
if(view==='calendar'){let items=[['Arrival','Check-in and settle in'],['Founders’ Evening','Formal academy gathering'],['Classes','Academic timetable']];items.filter((x,i)=>i<=state.stage).forEach(([title,description])=>{let card=node('div',undefined,'card');card.append(node('h3',title),node('p',description));content.append(card)})}
if(view==='calls'){content.append(node('p','No recent calls.','blank'))}
if(view==='camera'){content.append(node('p','Camera preview is not available in this public version.','notice'))}
w.append(content);nav(w)}
function chooser(){const w=wrap(),c=node('div',undefined,'introphone');c.append(node('p','BLACKTHORN ACADEMY'),node('h1','Your private phone'),node('p','Choose the character who will use this device. Every player should use a separate phone.'));VALID.forEach(r=>c.append(uiButton(r[0].toUpperCase()+r.slice(1),()=>{const url=new URL(location.href);url.searchParams.set('character',r);location.href=url.href})));w.append(c)}
function render(){if(!role){chooser();return}document.body.dataset.person=role;const w=wrap();if(state.view==='home')drawHome(w);else if(state.view==='messages')listMessages(w);else if(state.view==='thread')drawThread(w);else if(state.view==='photos')drawPhotos(w);else if(state.view==='photo')drawPhoto(w);else if(state.view==='notes')drawNotes(w);else drawOther(w);
 if(live){
  const badge=node('div','LIVE · '+status.toUpperCase(),'live-indicator');
  badge.style.cssText='position:fixed;z-index:500;right:6px;top:6px;background:#102030e8;color:#eadcbb;border:1px solid #9f875b;padding:4px 6px;font:10px system-ui;pointer-events:none';
  w.append(badge);
  if(remotelyPaused){
    const overlay=node('div',undefined,'game-pause');
    overlay.style.cssText='position:fixed;inset:0;z-index:999;background:#0b1724f0;color:#f7e8c8;display:grid;place-items:center;font:22px Georgia,serif;text-align:center';
    overlay.append(node('p','The story is paused.'));w.append(overlay);
  }
 }
}
render();
if(live){
 sync.subscribe(remote=>{
  const canon=window.BlackthornStory?.scenes;
  const total=Array.isArray(canon)&&canon.length?canon.length:12;
  const newScene=Math.max(0,Math.min(total-1,remote.scene));
  const stage=Math.min(STAGES.length-1,Math.floor(newScene*STAGES.length/total));
  state.canonicalScene=newScene;
  if(state.stage!==stage||remotelyPaused!==remote.paused||state.lastRenderedScene!==newScene){state.stage=stage;state.lastRenderedScene=newScene;remotelyPaused=remote.paused;save();render();}
 });
 sync.onStatus(next=>{status=next;render();});
 sync.connect();
}

