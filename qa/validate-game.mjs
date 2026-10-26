// Static, spoiler-free Blackthorn V18 integrity checks.
// Run with: node qa/validate-game.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root=process.cwd();
const get=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={window:{}};
for(const file of ['story-data.js','image-manifest.js'])vm.runInNewContext(get(file),context,{filename:file});
vm.runInNewContext(get('opening-script.js'),context,{filename:'opening-script.js'});
for(const file of ['story-script-week2.js','story-script-west-route.js','story-script-records.js','story-script-closing.js'])vm.runInNewContext(get(file),context,{filename:file});
vm.runInNewContext(get('story-beat-policy.js'),context,{filename:'story-beat-policy.js'});
const opening=context.window.BlackthornOpeningScript||{};
const policy=context.window.BlackthornBeatPolicy;
for(const id of ['S06A','S09C','S13','S16A','S19D','S22','S25'])if(policy.publicBeats(id).some(b=>policy.directorCues(id).includes(b)))throw new Error('Director cues leaked: '+id);
if(policy.publicBeats('S13').length>=opening.S13.length)throw new Error('Private W3 cue still public');
for(const id of ['S00','S01','S02','S03','S04','S05','S06','S06A','S06B','S07','S08','S09A','S09B','S09C','S10','S11','S12A','S12B','S12C','S13','S14','S14B','S15','S16','S16A','S16B','S16C','S17','S18','S19A','S19B','S19C','S19D','S19E','S20','S21','S22','S23','S24A','S24B','S24C','S25','S26','S28','S29','S30']){
 const beats=opening[id];
 if(!Array.isArray(beats)||beats.length<2)throw new Error('Opening screenplay missing '+id);
 for(const b of beats)if(typeof b.speaker!=='string'||typeof b.text!=='string'||!b.text.trim())throw new Error('Invalid screenplay beat in '+id);
}
for(const id of ['S04','S10','S11','S13','S18','S21','S25','S28','S29'])if(opening[id].some(b=>['ALEXANDER','NATE','THEO'].includes(b.speaker)))throw new Error('Private romance dialogue leaked to shared screenplay: '+id);
for(const page of ['index.html','director.html'])for(const file of ['opening-script.js','story-script-week2.js','story-script-west-route.js','story-script-records.js','story-script-closing.js'])if(!get(page).includes(file))throw new Error(page+' missing '+file);
if(opening.S27)throw new Error('Protected canonical reveal must not be fabricated in public screenplay');
const {scenes,flows}=context.window.BlackthornStory||{};
const manifest=context.window.BlackthornImageManifest||{};
const problems=[];
const check=(value,message)=>{if(!value)problems.push(message)};
check(Array.isArray(scenes)&&scenes.length===47,'Expected 47 canonical V18 scenes');
check(Array.isArray(flows)&&flows.length===55,'Expected 55 original phone flows');

if(Array.isArray(scenes)&&Array.isArray(flows)){
 const sceneIds=new Set(),flowIds=new Set();
 for(const flow of flows){
  check(typeof flow.flow_id==='string'&&flow.flow_id.length>0,'Flow missing ID');
  check(!flowIds.has(flow.flow_id),'Duplicate flow ID (not printed)');
  flowIds.add(flow.flow_id);
  check(['Florine','Maxine','Sam','ALL'].includes(flow.character),'Unknown phone role in flow');
  check(typeof flow.opening_text==='string','Missing flow opening text');
  const choices=[flow.intent_1,flow.intent_2,flow.intent_3].filter(x=>String(x||'').trim());
  check(choices.length<=3,'Too many phone choices');
 }
 for(const scene of scenes){
  check(typeof scene.scene_id==='string'&&scene.scene_id.length>0,'Scene missing ID');
  check(!sceneIds.has(scene.scene_id),'Duplicate scene ID');
  sceneIds.add(scene.scene_id);
  check(typeof scene.player_body==='string'&&scene.player_body.length>0,'Scene missing narrative');
  const refs=String(scene.phone_flow_ids||'').split(/[|,;\s]+/).filter(Boolean);
  for(const ref of refs)check(flowIds.has(ref),'Scene has missing phone flow ref');
  const imageId=scene.scene_id;
  const loc=String(scene.display_location||'').toUpperCase();
  const keys=Object.keys(manifest.locations||{});
  check(Boolean((manifest.sceneImages||{})[imageId]||keys.some(x=>loc.includes(x))),'Scene has no location/photo mapping');
 }
 check(Object.keys(manifest.portraits||{}).length>=7,'Original role portraits not mapped');
}

for(const file of ['story-data.js','image-manifest.js','blackthorn-sync.js','projector.js','phone/phone.js','director.js']){
 try{new vm.Script(get(file),{filename:file})}catch(_){problems.push(file+' has invalid JavaScript syntax')}
}
check(get('director.html').includes('director.js'),'Director HTML missing controller');
check(get('director.html').includes('blackthorn-sync.js'),'Director HTML missing sync');
for(const file of ['index.html','phone/index.html']){
 const html=get(file);
 check(html.includes('blackthorn-sync.js'),file+' missing sync');
 check(html.includes('story-data.js'),file+' missing canonical story import');
}
// Exercise the actual role-condition evaluator with test-only state (no story text).
const phone=get('phone/phone.js');
const cStart=phone.indexOf('const engagementRules=');
const cEnd=phone.indexOf('\nfunction storeCanonicalChoice(',cStart);
check(cStart>=0&&cEnd>cStart,'Phone condition evaluator missing');
if(cStart>=0&&cEnd>cStart){
 try{
  const snippet=phone.slice(cStart,cEnd);
  const sandbox={state:{flags:{map_opened:'true',hazard_choice:'A',w6_route:'Theo',theo_engagement:2,adrian_engagement:1},answers:{P062A1:0,P062B1:1}}};
  const evaluate=vm.runInNewContext(snippet+';conditionSatisfied',sandbox);
  check(evaluate('map_opened=true')===true,'map=true conditional not working');
  check(evaluate('map_opened=false')===false,'map=false conditional not working');
  check(evaluate('hazard_choice=A')===true,'choice-based gate failed');
  check(evaluate('w6_route=Adrian')===false,'alternate route gate incorrectly opened');
  check(evaluate('abs(theo_engagement-adrian_engagement)<=1')===true,'engagement gate failed');
  check(evaluate('after P062A1 and P062B1')===true,'joint prerequisite gate failed');
  check(evaluate('unknown_secret=true')===false,'Unknown flag should not unlock');
 }catch(_){problems.push('Phone condition evaluator failed to execute')}
}
const projector=get('projector.js');
const pStart=projector.indexOf('function reactionDialogue(scene){');
const pEnd=projector.indexOf('\nfunction silhouette(',pStart);
check(pStart>=0&&pEnd>pStart,'Original dialogue extractor missing');
if(pStart>=0&&pEnd>pStart){
 try{
  const snippet=projector.slice(pStart,pEnd);
  const test='ALPHA: “A test line.” | BETA: “Another test line.”';
  const count=vm.runInNewContext(snippet+';reactionDialogue({npc_and_shared_reactions:'+JSON.stringify(test)+'}).length');
  check(count===2,'Canonical dialogue parser failed');
 }catch(_){problems.push('Dialogue extractor failed to execute')}
}
// English-facing story localization must be complete, otherwise Dutch GM notes leak into UI.
const english={window:{}};
vm.runInNewContext(get('story-english.js'),english,{filename:'story-english.js'});
vm.runInNewContext(get('phone-english.js'),english,{filename:'phone-english.js'});
if(Array.isArray(scenes)){
 for(const scene of scenes){
  const e=english.window.BlackthornEnglish?.[scene.scene_id];
  check(Array.isArray(e)&&e.length===2&&e.every(v=>typeof v==='string'&&v.trim()),'Missing English scene localization');
 }
}
if(Array.isArray(flows)){
 for(const flow of flows){
  const e=english.window.BlackthornEnglishFlows?.[flow.flow_id];
  check(Array.isArray(e)&&typeof e[0]==='string'&&e[0].trim(),'Missing English phone flow');
  const choices=[flow.intent_1,flow.intent_2,flow.intent_3].filter(v=>String(v||'').trim()).length;
  for(let k=0;k<choices;k++)check(typeof e?.[k+1]==='string'&&e[k+1].trim(),'Missing English phone option');
 }
}
check(get('index.html').includes('story-english.js'),'Beamer missing English scene loader');
check(get('director.html').includes('story-english.js'),'Director missing English scene loader');
check(get('phone/index.html').includes('phone-english.js'),'Phone missing English dialogue loader');
// Every scene must have a deliberately selected, physically present background,
// rather than silently falling through to generic academy / portrait placeholders.
if(Array.isArray(scenes)){
 const routes=context.window.BlackthornImageManifest?.sceneImages||{};
 for(const scene of scenes){
  const imgs=routes[scene.scene_id];
  check(Array.isArray(imgs)&&imgs.length>0,'Scene missing curated background: '+scene.scene_id);
  const raw=imgs?.[0]||'';
  const decoded=decodeURIComponent(raw);
  check(raw&&fs.existsSync(path.join(root,decoded)),'Scene art missing on disk: '+scene.scene_id);
 }
}
check(get('projector.css').includes('background-size:contain'),'Projector no longer preserves full scenery');
check(get('projector.js').includes('titleScenes'),'Projector chapter title rules missing');
if(problems.length){
 console.error('Blackthorn static checks FAILED ('+problems.length+').');
 for(const message of [...new Set(problems)])console.error('- '+message);
 process.exit(1);
}
console.log('Blackthorn static QA passed: 47 scenes, 55 flows, image routes, script syntax and page imports.');
console.log('Not a substitute for browser testing, visual QA or complete puzzle/branch playthrough.');
