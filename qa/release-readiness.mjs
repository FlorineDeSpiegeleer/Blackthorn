// Run separately from integrity QA: node qa/release-readiness.mjs
// A green integrity CI must never be misread as story-release approval.
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const scene=read('story-data.js'),en=read('story-english.js'),phone=read('phone-english.js');
const report=[
 ['CANONICAL_FINALE','BLOCKED',scene.includes('FINAL_REVEAL_BLOCK_GM_03')?'Original V18 S27 still references protected reveal block; source not present.':'Requires authored finale verification.'],
 ['PRIVATE_CONSEQUENCES','BLOCKED',/P050:\["Your private assessment will be available/.test(phone)?'P050–P052 contain placeholder assessments.':'Verify all individual endings manually.'],
 ['OPENING_SCRIPT','IMPLEMENTED_UNTESTED',fs.existsSync('opening-script.js')?'Opening scenes now have screenplay beats; cross-device human check is still required.':'Missing opening screenplay.'],
 ['SHARED_SCENES','DRAFT_INTEGRATED','Shared screenplay beats are present for S00–S26 and S28–S30. S27 is blocked; scripts require dialogue quality review and evidence integration.'],
 ['PRIVATE_ROUTES','TO_AUTHOR','Phone flows exist but still need comprehensive natural-dialogue authoring, branching validation and consistent route-specific outcomes.'],
 ['EVIDENCE_OBJECTS','BLOCKED','S06A and S09A–S12B require source-faithful inspectable evidence cards; the new scene beats only prompt inspection, not an implemented evidence viewer.'],
 ['PUZZLES_BRANCHING','TO_TEST','Director-approved checkpoints are not equivalent to complete original mystery-answer validation.'],
 ['AUDIO','OPTIONAL','No final independent voices are selected or integrated.'],
 ['FIVE_SCREEN_REHEARSAL','TO_TEST','Test Director, beamer, 3 phones, all-ready gating, pause, reconnect, branches and finale.']
];
console.log('BLACKTHORN RELEASE READINESS — manual blockers (not a CI substitute)');
for(const [name,status,note] of report)console.log(status.padEnd(22),name.padEnd(24),note);
if(report.some(([_,status])=>status==='BLOCKED'))process.exitCode=2;
