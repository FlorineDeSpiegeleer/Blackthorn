'use strict';
/*
 * Blackthorn's one-night, GitHub-Pages-only transport.
 * Uses ntfy.sh exactly like DigitalWorkstation. No login or backend.
 * Participants knowingly accept that the topic and posted events aren't private.
 * To avoid easy unintended spoilers, never include narrative content in events.
 */
(function(){
 const query=new URLSearchParams(location.search);
 const session=query.get('session')||'';
 const enabled=/^[A-Za-z0-9_-]{16,64}$/.test(session);
 const topic='blackthorn-game-'+session;
 const root=enabled?'https://ntfy.sh/'+topic:'';
 const instance=Math.random().toString(36).slice(2)+Date.now().toString(36);
 const listeners=new Set(), statusListeners=new Set(), choiceListeners=new Set(), readyListeners=new Set(), helloListeners=new Set(), submissionListeners=new Set(), approvalListeners=new Set();
 let lastRevision=0, connected=false, es=null, current=null, cooldown=0;
 const storageKey='blackthorn_remote_'+session;
 try {const saved=JSON.parse(sessionStorage.getItem(storageKey)||'null');if(saved&&Number.isInteger(saved.revision)){lastRevision=saved.revision;current=saved;}}catch(_){}
 function notify(){listeners.forEach(cb=>cb(current));}
 function status(value){statusListeners.forEach(cb=>cb(value));}
 function valid(s){return s&&s.protocol===1&&s.type==='state'&&Number.isSafeInteger(s.revision)&&s.revision>0&&
 Number.isInteger(s.scene)&&s.scene>=0&&s.scene<100&&typeof s.paused==='boolean';}
 function accept(state){
  if(!valid(state)||state.revision<=lastRevision)return;
  lastRevision=state.revision;current=state;
  try{sessionStorage.setItem(storageKey,JSON.stringify(state));}catch(_){}
  notify();
 }
 function connect(){
  if(!enabled){status('local');return;}
  if(es)return;
  if(!window.EventSource){status('unsupported');return;}
  es=new EventSource(root+'/sse?since=2h');
  es.onopen=()=>{connected=true;status('connected');if(query.get('director')!=='1')askState();};
  es.onerror=()=>{connected=false;status('reconnecting');};
  es.onmessage=event=>{
   try{
    const data=JSON.parse(event.data);
    if(data.event!=='message'||typeof data.message!=='string')return;
    const message=JSON.parse(data.message);
    if(message.protocol!==1)return;
    if(message.type==='choice'){choiceListeners.forEach(cb=>cb(message));return;}
    if(message.type==='ready'){readyListeners.forEach(cb=>cb(message));return;}
    if(message.type==='submission'){submissionListeners.forEach(cb=>cb(message));return;}
    if(message.type==='approval'){approvalListeners.forEach(cb=>cb(message));return;}
    if(message.type==='hello'){helloListeners.forEach(cb=>cb(message));return;}
    accept(message);
   }catch(_){}
  };
 }
 async function send(payload){
  if(!enabled)return false;
  const now=Date.now();if(now<cooldown)return false;
  try{
   const response=await fetch(root,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(payload)});
   if(response.status===429){cooldown=Date.now()+15000;status('rate limited');return false;}
   if(!response.ok){status('send error');return false;}
   return true;
  }catch(_){status('offline');return false;}
 }
 async function publish(scene,paused){
  if(!Number.isInteger(scene)||scene<0||scene>=100)return false;
  const revision=Math.max(Date.now()*1000, lastRevision+1);
  const payload={protocol:1,type:'state',scene,paused:!!paused,revision,source:instance};
  accept(payload);return send(payload);
 }
 async function publishChoice(role,choiceId,option){
  if(!['florine','maxine','sam'].includes(role))return false;
  if(typeof choiceId!=='string'||choiceId.length>90||!/^[\w:.-]+$/.test(choiceId))return false;
  if(!Number.isInteger(option)||option<0||option>20)return false;
  return send({protocol:1,type:'choice',role,choiceId,option,revision:Date.now()*1000,source:instance});
 }
 async function publishReady(role,scene){
  if(!['florine','maxine','sam'].includes(role)||!Number.isInteger(scene)||scene<0||scene>=100)return false;
  return send({protocol:1,type:'ready',role,scene,revision:Date.now()*1000,source:instance});
 }
 async function publishSubmission(role,puzzle,text){
  if(!['florine','maxine','sam'].includes(role)||!/^P[1-4]$/.test(puzzle))return false;
  const answer=String(text||'').trim().slice(0,1200);
  if(!answer)return false;
  return send({protocol:1,type:'submission',role,puzzle,text:answer,revision:Date.now()*1000,source:instance});
 }
 async function publishApproval(puzzle,approved){
  if(!/^P[1-4]$/.test(puzzle))return false;
  return send({protocol:1,type:'approval',puzzle,approved:!!approved,revision:Date.now()*1000,source:instance});
 }
 async function askState(){
  if(!enabled)return false;
  return send({protocol:1,type:'hello',revision:Date.now()*1000,source:instance});
 }
 function close(){if(es){es.close();es=null;}}
 window.BlackthornSync={enabled,session,connect,publish,publishChoice,publishReady,publishSubmission,publishApproval,askState,close,subscribe(cb){listeners.add(cb);if(current)cb(current);return()=>listeners.delete(cb);},
  onStatus(cb){statusListeners.add(cb);return()=>statusListeners.delete(cb);},onChoice(cb){choiceListeners.add(cb);return()=>choiceListeners.delete(cb);},onReady(cb){readyListeners.add(cb);return()=>readyListeners.delete(cb);},onHello(cb){helloListeners.add(cb);return()=>helloListeners.delete(cb);},onSubmission(cb){submissionListeners.add(cb);return()=>submissionListeners.delete(cb);},onApproval(cb){approvalListeners.add(cb);return()=>approvalListeners.delete(cb);},get current(){return current;},get connected(){return connected;}};
})();
