
'use strict';
const ROOT='nieuwe fotos_SFM/';
const img=n=>ROOT+encodeURIComponent(n+'.png');
const sceneList=[
{title:'Welcome to Blackthorn',chapter:'PROLOGUE · THE ARRIVAL',image:'Rainy Arrival at the Gothic Academy',text:'Beyond the rain-dark gates, Blackthorn Academy waits. Florine, Maxine and Sam have been invited to an extraordinary term among ancient halls, old friendships and traditions that refuse to fade.'},
{title:'Suite 417',chapter:'CHAPTER ONE · THE FRIENDS',image:'Candlelit Masquerade Boudoir Selfie',text:'Three friends, a shared suite, and a thousand reasons to laugh before the evening begins. The invitation to the Founders’ celebration lies on the dressing table.'},
{title:'Founders’ Evening',chapter:'CHAPTER ONE · THE CELEBRATION',image:'Event_Masked_ball_opening',text:'Beneath gold-lit chandeliers, the academy gathers for its most anticipated evening. Invitations are exchanged; old acquaintances exchange careful glances.'},
{title:'Across the Ballroom',chapter:'CHAPTER ONE · FIRST IMPRESSIONS',image:'Gothic Academy Masquerade Toast',text:'Music spills from the ballroom into the galleries. One conversation can change the course of an evening — especially when it becomes unexpectedly personal.'},
{title:'After the Music',chapter:'CHAPTER TWO · A QUIETER MOMENT',image:'Moonlit Gothic Music Salon',text:'The halls are quieter now. Beyond the dance floor, there is space for a private conversation, a question, and an answer that may be remembered.'},
{title:'A Change in the Air',chapter:'CHAPTER TWO · THE MYSTERY',image:'Rainy Gothic Academy',text:'A sudden change disturbs the rhythm of the evening. The three friends begin to compare what each of them noticed. No conclusion is safe without evidence.'},
{title:'An Unfinished Conversation',chapter:'CHAPTER THREE · PRIVATE MOMENTS',image:'Golden Tea in the Gothic Library (1)',text:'In the days that follow, classes and routines resume — but ordinary moments begin to mean more. Some people notice more than they say.'},
{title:'The Library After Hours',chapter:'CHAPTER THREE · TRUST',image:'Sam_Private_library_date',text:'There are questions that demand careful research, and others that require finding the courage to speak aloud. Both have brought people together after dark.'},
{title:'Rain over the Courtyard',chapter:'CHAPTER FOUR · IN BETWEEN',image:'Event_A_rainstorm_interrupts',text:'Rain sends everyone toward the nearest shelter. Unexpected company can transform an inconvenient moment into one that lingers.'},
{title:'A Choice of Words',chapter:'CHAPTER FOUR · CONNECTIONS',image:'Cozy Gothic Academy Tea Conversation',text:'The story is shaped not only by what the friends discover, but also by whom they decide to trust.'},
{title:'The Questions Remain',chapter:'CHAPTER FIVE · INVESTIGATION',image:'Rainy Gothic Academy',text:'Notes are compared, details are reconsidered, and assumptions are challenged. The real investigation belongs to the full private game.'},
{title:'The Next Chapter',chapter:'EPILOGUE PREVIEW · NO SPOILERS',image:'Event_Friends_find_each_other',text:'Whatever comes next, Florine, Maxine and Sam will need one another. This public preview ends here; the final story remains protected.'}
];
const moments={
florine:[
{at:0,photo:'Florine_Library_debate',title:'A Debate in the Library',text:'Alexander studies the book in your hands. “I had a perfectly good argument,” he says. “Then you arrived.”',choices:['You should try having a better argument.','Were you waiting for me?','Then perhaps we ought to work together.'],replies:['His mouth almost curves into a smile. “I will remember that.”','“That would be a remarkably arrogant assumption.” He does not look away.','He makes room beside the desk. “A sensible proposal. How unusual.”']},
{at:2,photo:'Florine_Formal_dance',title:'One Dance',text:'Alexander offers his hand beneath the chandeliers, an expression of elaborate patience hiding something warmer.',choices:['Accept, but challenge him to keep up.','Take his hand without saying a word.','Make him ask properly.'],replies:['“Competitive even here?” He offers a gloved hand. “Naturally.”','For a moment neither of you speaks. The music says enough.','He bows a fraction lower. “May I have this dance?”']},
{at:4,photo:'Florine_The_hand_flex',title:'The Space Between Hands',text:'As the dance ends, your fingers part. Alexander flexes his hand once, as though recovering from the briefest touch.',choices:['Ask whether something is wrong.','Let the moment remain unspoken.','Smile at him from across the room.'],replies:['“Not in the slightest,” he replies, much too quickly.','He meets your gaze once before turning away.','The answer is a look he does not bother to hide.']},
{at:6,photo:'Florine_Coffee_whithout_explenation',title:'A Cup Left Behind',text:'A coffee appears beside your notes, exactly as you like it. Alexander insists he had ordered too much.',choices:['Thank him quietly.','Point out the suspiciously perfect order.','Offer to share your table.'],replies:['“You are welcome,” he murmurs, pretending to read.','“Coincidence,” he says. Neither of you believes it.','He sits, careful to leave the coffee within your reach.']},
{at:8,photo:'Florine_Almost_kiss',title:'Almost',text:'After a heated exchange, the conversation falls still. There is little distance left between you.',choices:['Hold his gaze.','Break the tension with a challenge.','Step back and change the subject.'],replies:['For one heartbeat the world is very quiet.','He laughs under his breath. “You are impossible.”','He lets you set the pace, and the moment changes without becoming awkward.']}
],
maxine:[
{at:0,photo:'Maxine_Theo_First_private_rivalry',title:'A Worthy Opponent',text:'Theo has apparently decided that the best way to greet you is to dispute something you said five minutes ago.',choices:['Challenge him again.','Ask why he pays so much attention.','Concede one point — reluctantly.'],replies:['“Finally,” he says, “something interesting.”','“A question worth considering,” he answers, far too smoothly.','“I may have to write down the date,” he replies.']},
{at:1,photo:'Maxine_Adrian_Private_family_tension',title:'A Familiar Name',text:'Adrian approaches with the composure of someone who has learned to survive difficult conversations.',choices:['Ask what he really wants to say.','Deflect with a teasing remark.','Invite him to walk with you.'],replies:['His answer is unusually direct, and all the more interesting for it.','He meets your humour without missing a beat.','He falls into step beside you.']},
{at:3,photo:'Maxine_Theo_Dance_under_the_chandeliers',title:'A Dance with Theo',text:'Theo offers a dance with the same expression he uses when proposing a challenge.',choices:['Accept and take the lead.','Ask him to surprise you.','Decline graciously.'],replies:['“I expected nothing less,” he says as the music begins.','He takes your hand. “With pleasure.”','He nods, giving you room to choose for yourself.']},
{at:4,photo:'Maxine_Adrian_Formal_dance_alternative',title:'A Dance with Adrian',text:'Adrian makes an elegant invitation — no pressure, only the possibility of a conversation away from the crowd.',choices:['Accept the invitation.','Ask him to be less mysterious.','Save the conversation for another day.'],replies:['His smile is small but genuine.','“I was hoping you would ask,” he replies.','“Another day, then.” He means it.']},
{at:6,photo:'Maxine_Theo_Interrupted_almost_kiss',title:'The Interrupted Moment',text:'The argument with Theo ends with both of you standing unexpectedly close. An interruption makes the silence even more noticeable.',choices:['Laugh and step back.','Tell him he has not won.','Ask to continue this conversation later.'],replies:['The tension dissolves into laughter, but not entirely.','“Neither have you,” he says softly.','“I was counting on it.”']},
{at:7,photo:'Maxine_Adrian_Courtyard_date',title:'The Courtyard Walk',text:'Adrian has a rare quiet moment to spare, and asks whether you would walk with him beneath the covered arches.',choices:['Ask a question you have been saving.','Enjoy the quiet together.','Keep things friendly.'],replies:['He answers more honestly than you expected.','There is no need to fill every silence.','He respects the boundary without hesitation.']},
{at:9,photo:'Maxine_Private_choice_pause',title:'Your Own Direction',text:'Your conversations have taken different shapes. You owe nobody an answer before you are ready.',choices:['Spend more time with Theo.','Spend more time with Adrian.','Keep your options open.'],replies:['The next conversation with Theo will be on your terms.','You make space for another honest talk with Adrian.','For now, choosing yourself is a complete answer.']}
],
sam:[
{at:0,photo:'Sam_Noticed_in_the_crowd',title:'Someone Noticed',text:'Nate looks up when you enter. “You always take the quieter side of a crowded room,” he says, as if it is the most ordinary observation in the world.',choices:['Ask what else he notices.','Tease him about keeping track.','Ask him to join you.'],replies:['“More than I should admit,” he answers with a grin.','He laughs. “I walked into that one.”','He joins you without making a fuss.']},
{at:2,photo:'Sam_Inside_joke',title:'A Private Joke',text:'A remark that meant very little to anyone else sets you both laughing in the middle of a formal evening.',choices:['Keep the joke going.','Tell him you needed the laugh.','Change to a more serious subject.'],replies:['“We will never be allowed near a formal event again,” he says.','His expression softens. “I am glad.”','He listens with the same attention he gives your jokes.']},
{at:4,photo:'Sam_A_shared_umbrella',title:'One Umbrella',text:'Rain begins as you cross the courtyard. Nate appears with an umbrella and an entirely unconvincing claim that he was already going your way.',choices:['Make room for him.','Ask whether that was really a coincidence.','Suggest waiting out the rain.'],replies:['He adjusts the umbrella so you stay dry.','“Not entirely,” he admits.','“I know a place with better tea,” he suggests.']},
{at:6,photo:'Sam_Private_library_date',title:'A Quiet Date',text:'The library has emptied, leaving a corner table, two cups of tea, and a conversation that neither of you seems eager to end.',choices:['Ask him something personal.','Share a small detail about yourself.','Enjoy the companionable silence.'],replies:['He answers with unexpected honesty.','He remembers it — not as a performance, but because it matters.','Sometimes ease is its own kind of intimacy.']},
{at:8,photo:'Sam_Interrupted_by_laughter',title:'Laughter at the Wrong Moment',text:'Something funny breaks the tension just as the conversation grows unusually close.',choices:['Laugh with him.','Tell him he ruined a perfect moment.','Ask him to stay a while longer.'],replies:['The laughter makes everything feel easier.','“I have a gift for timing,” he admits.','“I would like that,” he says.']},
{at:10,photo:'Sam_Tulip_bouquet',title:'A Detail Remembered',text:'Nate arrives carrying a small bouquet of tulips. “You mentioned them once,” he says. “I remembered.”',choices:['Tell him what it means to you.','Tease him for remembering everything.','Accept them with a smile.'],replies:['His smile is gentle. “I hoped you would like them.”','“Only the important things,” he replies.','He seems genuinely pleased that you are pleased.']}
]};
const stateKey='blackthorn_public_preview_2026';
let state;try{state=JSON.parse(localStorage.getItem(stateKey)||'{}')}catch{state={}}
state={role:'projector',scene:0,answers:{},notes:{},paused:false,started:false,introStep:0,introChoice:null,...state};
const safeRole=x=>['projector','florine','maxine','sam','gm'].includes(x)?x:'projector';
const roleFromURL=new URLSearchParams(location.search).get('view');
if(roleFromURL){state.role=safeRole(roleFromURL);}
state.scene=Math.max(0,Math.min(sceneList.length-1,Number(state.scene)||0));
let soundOn=false,ctx=null,osc=null;
const $=id=>document.getElementById(id);
const save=()=>localStorage.setItem(stateKey,JSON.stringify(state));
function setPaused(value){state.paused=Boolean(value);save();syncPauseUI();if(state.paused&&ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});if(!state.paused&&ctx&&ctx.state==='suspended'&&soundOn)ctx.resume().catch(()=>{});}
function syncPauseUI(){const paused=Boolean(state.paused);document.body.classList.toggle('is-paused',paused);$('pauseOverlay').hidden=!paused;$('pauseGame').textContent=paused?'▶ Resume':'⏸ Pause';$('pauseGame').setAttribute('aria-pressed',String(paused));if(paused){$('resumeGame').focus({preventScroll:true});}}

const el=(tag,text,cls)=>{let e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
const button=(text,fn,cls='secondary')=>{let b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b};
function playTone(freq=440){if(!soundOn||state.paused)return;let A=window.AudioContext||window.webkitAudioContext;if(!A)return;ctx=ctx||new A();let o=ctx.createOscillator(),gain=ctx.createGain();o.type='sine';o.frequency.value=freq;gain.gain.setValueAtTime(.025,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.3);o.connect(gain).connect(ctx.destination);o.start();o.stop(ctx.currentTime+.31)}
function currentMoment(role){return moments[role]?.find(x=>x.at===state.scene)||null}
function makeChoices(role,m,parent){const key=role+':'+m.at,selected=state.answers[key];let head=el('h2',m.title);parent.append(head,el('p',m.text));let image=el('img');image.src=img(m.photo);image.alt='Illustration for '+m.title;image.style.cssText='display:block;width:100%;max-height:410px;object-fit:cover;border:1px solid #6b5b42;border-radius:3px';image.onerror=()=>image.remove();parent.append(image);
if(selected!==undefined){let reply=el('div','You chose: '+m.choices[selected]+'\n\n'+m.replies[selected],'reply');reply.style.whiteSpace='pre-line';parent.append(reply,el('p','This moment will stay in your story.','note'));}else{let wrap=el('div',undefined,'choices');m.choices.forEach((c,i)=>wrap.append(button(c,()=>{if(state.paused)return;state.answers[key]=i;save();playTone(560);render()},'choice')));parent.append(wrap)}}
function render(){document.querySelector('.roles').classList.toggle('game-started',Boolean(state.started));let role=safeRole(state.role),s=sceneList[state.scene],p=$('mainContent');p.replaceChildren();document.querySelectorAll('[data-role]').forEach(b=>{b.classList.toggle('active',b.dataset.role===role);b.setAttribute('aria-pressed',b.dataset.role===role?'true':'false')});let m=currentMoment(role);$('sceneLabel').textContent='SCENE '+(state.scene+1)+' / '+sceneList.length;$('chapter').textContent=s.chapter;$('sceneTitle').textContent=m&&role!=='projector'&&role!=='gm'?m.title:s.title;$('sceneText').textContent=m&&role!=='projector'&&role!=='gm'?m.text:s.text;$('heroImg').src=img(m&&role!=='projector'&&role!=='gm'?m.photo:s.image);$('panelName').textContent=role==='gm'?'DIRECTOR PREVIEW':role==='projector'?'PROJECTOR STORY':'PRIVATE · '+role.toUpperCase();$('progressText').textContent='Scene '+(state.scene+1)+' of '+sceneList.length;$('bar').style.width=((state.scene+1)/sceneList.length*100)+'%';
if(role==='gm'){p.append(el('h2','Director controls'),el('p','This is a spoiler-free standalone demonstration. Scene changes in this browser are not shared with phones. The full game needs a private backend.','muted'));let controls=el('div',undefined,'controls');controls.append(button('← Previous scene',()=>move(-1)),button('Next scene →',()=>move(1),'primary'),button('Reset preview',()=>{if(confirm('Reset preview progress?')){if(state.paused)return;state.scene=0;state.answers={};state.notes={};save();render()}}));p.append(controls);p.append(el('p','Do not treat this preview as a validated mystery game. Puzzle answers and hidden story notes have deliberately not been shipped to this public repository.','note'));return}
if(role==='projector'){p.append(el('h2','The story unfolds'),el('p',s.text));let gallery=el('div',undefined,'routecards');[['Florine','Florine_After_the_dance'],['Maxine','Maxine_Two_contrasting_glances'],['Sam','Sam_Noticed_in_the_crowd']].forEach(([name,photo])=>{let b=el('button');let im=el('img');im.src=img(photo);im.alt=name+' portrait';b.append(im,el('span',name));b.addEventListener('click',()=>{state.role=name.toLowerCase();save();render()});gallery.append(b)});p.append(gallery,el('p','Use the tabs to explore three distinct personal story previews.','note'));return}
if(m)makeChoices(role,m,p);else{p.append(el('h2','Your private chapter'),el('p','There is no new private encounter in this scene. You can review your earlier decisions, keep notes, or return to the projector story.'))}
p.append(el('h3','Your story journal'));let journal=el('div');let entries=Object.entries(state.answers).filter(([k])=>k.startsWith(role+':'));if(entries.length){entries.forEach(([k,v])=>{let mo=moments[role].find(x=>x.at===Number(k.split(':')[1]));if(mo)journal.append(el('p',mo.title+' — '+mo.choices[v],'note'))})}else journal.append(el('p','Your story is just beginning.','muted'));p.append(journal);
let textarea=el('textarea');textarea.value=state.notes[role]||'';textarea.placeholder='Private notes for '+role+' (saved automatically on this device)';textarea.setAttribute('aria-label','Private notes');textarea.addEventListener('input',()=>{state.notes[role]=textarea.value;save()});p.append(textarea)}
function move(delta){if(state.paused)return;let n=Math.max(0,Math.min(sceneList.length-1,state.scene+delta));if(n!==state.scene){state.scene=n;save();playTone(420);render();window.scrollTo({top:0,behavior:'smooth'})}}
document.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{if(state.paused)return;state.role=safeRole(b.dataset.role);save();render()}));
$('sound').addEventListener('click',()=>{if(state.paused)return;soundOn=!soundOn;$('sound').textContent=soundOn?'♪ Audio on':'♪ Audio off';if(soundOn)playTone(520)});
document.addEventListener('keydown',e=>{if(!state.paused&&state.role==='gm'&&e.target.tagName!=='TEXTAREA'){if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)}});

$('pauseGame').addEventListener('click',()=>setPaused(!state.paused));
$('resumeGame').addEventListener('click',()=>setPaused(false));
document.addEventListener('keydown',e=>{
  if((e.key==='p'||e.key==='P')&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA'].includes(e.target.tagName)){e.preventDefault();setPaused(!state.paused);}
});
window.addEventListener('storage',e=>{
  if(e.key!==stateKey||!e.newValue)return;
  try{const latest=JSON.parse(e.newValue);state.paused=Boolean(latest.paused);syncPauseUI()}catch{}
});
save();render();renderIntro();syncPauseUI();

const opening=[
{tag:'A LETTER FROM BLACKTHORN',title:'An Invitation',image:'Rainy Gothic Academy',body:'The rain has followed you all the way to Blackthorn Academy. Beyond the iron gates, a thousand illuminated windows shine through the dusk.',speaker:'THE NARRATOR',line:'Some places promise a new beginning. Others remember far too much.',next:'Approach the academy'},
{tag:'PROLOGUE · THE ARRIVAL',title:'Beyond the Gates',image:'Rainy Arrival at the Gothic Academy',body:'The carriage wheels fall silent against the wet stone. Somewhere inside the old academy, a bell begins to ring.',speaker:'A VOICE NEAR THE DOOR',line:'You must be our new arrivals. Welcome to Blackthorn.',next:'Enter the great hall'},
{tag:'CHAPTER ONE · SUITE 417',title:'The Three of You',image:'Event_Friends_find_each_other',body:'The familiar sound of laughter reaches you through the corridor. Florine, Maxine and Sam have finally found one another again.',speaker:'THE NARRATOR',line:'Whatever this term brings, it begins with friendship.',next:'Begin your story'}
];
function renderIntro(){
 const overlay=$('introOverlay');if(!overlay)return;
 overlay.hidden=Boolean(state.started);
 if(state.started)return;
 const step=Math.max(0,Math.min(5,Number(state.introStep)||0));
 const bg=$('introBg'),tag=$('introTag'),title=$('introHeadline'),body=$('introBody'),controls=$('introControls'),bottom=$('introBottom');
 body.replaceChildren();controls.replaceChildren();
 const action=(label,callback,cls)=>{const b=button(label,()=>{if(state.paused)return;callback()},cls||'primary');controls.append(b);return b};
 if(step===0){
   bg.style.backgroundImage='url("'+img('Rainy Gothic Academy')+'")';
   tag.textContent='AN INTERACTIVE STORY';title.textContent='The Veiled Moon';
   body.append(el('p','A new term. Three old friends. And an academy where every conversation might matter.'));
   action('✦ Enter Blackthorn Academy',()=>{state.introStep=1;save();renderIntro()});
   action('Continue a saved game',()=>{state.started=true;save();render();renderIntro()},'intro-aux');
   bottom.textContent='A STORY OF FRIENDSHIP, ROMANCE & MYSTERY';
 }else if(step===1){
   bg.style.backgroundImage='url("'+img('Event_Friends_find_each_other')+'")';
   tag.textContent='CHOOSE YOUR EXPERIENCE';title.textContent='Who are you?';
   body.append(el('p','Choose your own perspective. Private choices belong to the person holding this device.'));
   const wrap=el('div',undefined,'intro-personas');
   [['florine','Florine','Florine_After_the_dance','Sharp wit · fierce loyalty'],['maxine','Maxine','Maxine_Two_contrasting_glances','Bold heart · difficult choices'],['sam','Sam','Sam_Noticed_in_the_crowd','Quiet courage · keen eyes']].forEach(([role,name,photo,desc])=>{
      const b=el('button');const im=el('img');im.src=img(photo);im.alt=name;b.append(im,el('strong',name),el('small',desc));b.addEventListener('click',()=>{state.role=role;state.introStep=2;state.introChoice=null;save();renderIntro()});wrap.append(b);
   });body.append(wrap);
   action('I am using the shared projector',()=>{state.role='projector';state.introStep=2;save();renderIntro()},'secondary');
   action('Director preview',()=>{state.role='gm';state.introStep=2;save();renderIntro()},'intro-aux');
   bottom.textContent='YOUR CHOICE WILL SHAPE THE WAY YOU SEE THE STORY';
 }else if(step===2){
   const labels={florine:'Florine',maxine:'Maxine',sam:'Sam',projector:'The Shared Story',gm:'Director'};
   bg.style.backgroundImage='url("'+img(state.role==='florine'?'Florine_After_the_dance':state.role==='maxine'?'Maxine_Two_contrasting_glances':state.role==='sam'?'Sam_Noticed_in_the_crowd':'Event_Friends_find_each_other')+'")';
   tag.textContent='YOUR CHAPTER BEGINS';title.textContent=labels[state.role]||'Blackthorn';
   body.append(el('p',state.role==='gm'?'You will control the pace of this spoiler-free preview.':state.role==='projector'?'The shared screen shows the academy and its story. Private decisions should stay on individual phones.':'Your words will matter. Your own private conversations will unfold alongside the shared story.'));
   action('Begin the prologue',()=>{state.introStep=3;save();renderIntro()});
   action('← Change character',()=>{state.introStep=1;save();renderIntro()},'intro-aux');
   bottom.textContent='YOU MAY PAUSE AT ANY TIME';
 }else{
   let idx=Math.min(2,Math.max(0,step-3)),o=opening[idx];
   bg.style.backgroundImage='url("'+img(o.image)+'")';tag.textContent=o.tag;title.textContent=o.title;
   body.append(el('p',o.body));let box=el('div',undefined,'intro-dialogue');box.append(el('div',o.speaker,'eyebrow'),el('p',o.line,'quote'));body.append(box);
   action(o.next,()=>{if(idx<2){state.introStep+=1}else{state.started=true;state.scene=0}save();render();renderIntro();window.scrollTo({top:0})});
   bottom.textContent='CLICK TO CONTINUE · YOUR PROGRESS SAVES AUTOMATICALLY';
 }
}
renderIntro();
