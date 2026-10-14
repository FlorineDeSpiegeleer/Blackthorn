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
const photo=x=>'nieuwe%20fotos_SFM/'+encodeURIComponent(x+'.png');
function render(){const s=scenes[state.scene];$('chapter').textContent=s[0];$('title').textContent=s[1];$('words').textContent=s[2];$('image').style.backgroundImage='url("'+photo(s[3])+'")';$('next').textContent=state.scene===scenes.length-1?'Restart preview ↻':state.scene===0?'Enter Blackthorn Academy →':'Continue →';$('paused').hidden=!state.paused;}
function advance(){if(state.paused)return;state.scene=(state.scene+1)%scenes.length;save();render()}
function pause(v){state.paused=v;save();render()}
$('next').onclick=advance;$('pause').onclick=()=>pause(true);$('resume').onclick=()=>pause(false);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance()}else if(e.key.toLowerCase()==='p'){pause(!state.paused)}});
save();render();
