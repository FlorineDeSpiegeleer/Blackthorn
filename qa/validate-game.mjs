// Static, spoiler-free Blackthorn V18 integrity checks.
// Run with: node qa/validate-game.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root=process.cwd();
const get=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={window:{}};
for(const file of ['story-data.js','image-manifest.js'])vm.runInNewContext(get(file),context,{filename:file});
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

for(const file of ['story-data.js','image-manifest.js','blackthorn-sync.js','projector.js','phone/phone.js']){
 try{new vm.Script(get(file),{filename:file})}catch(_){problems.push(file+' has invalid JavaScript syntax')}
}
for(const file of ['index.html','phone/index.html']){
 const html=get(file);
 check(html.includes('blackthorn-sync.js'),file+' missing sync');
 check(html.includes('story-data.js'),file+' missing canonical story import');
}
if(problems.length){
 console.error('Blackthorn static checks FAILED ('+problems.length+').');
 for(const message of [...new Set(problems)])console.error('- '+message);
 process.exit(1);
}
console.log('Blackthorn static QA passed: 47 scenes, 55 flows, image routes, script syntax and page imports.');
console.log('Not a substitute for browser testing, visual QA or complete puzzle/branch playthrough.');
