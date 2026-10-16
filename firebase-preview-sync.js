'use strict';
/*
 * OPTIONAL Firebase Realtime Database transport for non-secret rehearsal state.
 * No canonical V18 story, puzzle, roles, private messages or answers are loaded
 * from this public repo. A dedicated secured backend is needed for that.
 *
 * Activate only with ?backend=firebase&session=LONG_RANDOM_CODE.
 * The Firebase project must enable anonymous auth for spectators, email/password
 * auth for the Director, and install the strict database.rules.json below.
 */
(function(){
  const qs=new URLSearchParams(location.search);
  const session=qs.get('session')||'';
  const enabled=qs.get('backend')==='firebase' && /^[A-Za-z0-9_-]{16,64}$/.test(session);
  const config=window.BLACKTHORN_FIREBASE_CONFIG||{};
  const readyConfig=['apiKey','authDomain','databaseURL','projectId','appId'].every(k=>typeof config[k]==='string'&&config[k].length>3);
  const isDirector=qs.get('director')==='1';
  let onState=()=>{},onStatus=()=>{},status='offline',unsub=null,api=null,latestVersion=0,closed=false,loading=null;
  const setStatus=s=>{status=s;onStatus(s)};
  const imports=()=>loading||(loading=Promise.all([
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js')
  ]).then(([app,auth,db])=>{
    const firebaseApp=app.initializeApp(config,'blackthorn-preview');
    const authentication=auth.getAuth(firebaseApp);
    const database=db.getDatabase(firebaseApp);
    api={auth,db,authentication,database};
    return api;
  }));
  const path=()=> 'sessions/'+session+'/public';
  function valid(x){
    return x && Number.isInteger(x.scene) && x.scene>=0 && x.scene<=11 &&
      typeof x.paused==='boolean' && Number.isSafeInteger(x.version) && x.version>=0;
  }
  async function connect(callbacks){
    onState=callbacks.onState||onState;onStatus=callbacks.onStatus||onStatus;
    if(!enabled){setStatus('local preview');return false;}
    if(!readyConfig){setStatus('Firebase not configured');return false;}
    setStatus('connecting');
    try {
      const {auth,db,authentication,database}=await imports();
      // Do not downgrade a Director to anonymous. The Director must log in
      // first via the separate /firebase-director.html authentication page.
      await auth.authStateReady(authentication);
      if(!authentication.currentUser){
        if(isDirector){setStatus('Director login required');return false;}
        await auth.signInAnonymously(authentication);
      }
      if(closed)return false;
      const locationRef=db.ref(database,path());
      unsub=db.onValue(locationRef,snapshot=>{
        const v=snapshot.val();
        setStatus('Firebase connected');
        if(valid(v)&&v.version>=latestVersion){
          latestVersion=v.version;
          onState({scene:v.scene,paused:v.paused});
        }
      },error=>setStatus(error?.code==='PERMISSION_DENIED'?'Firebase access denied':'Firebase connection error'));
      return true;
    }catch(error){setStatus('Firebase unavailable');return false;}
  }
  async function publish(scene,paused){
    if(!enabled||!readyConfig||closed||!isDirector||!Number.isInteger(scene)||scene<0||scene>11)return false;
    try{
      const {db,database,authentication}=await imports();
      if(!authentication.currentUser || authentication.currentUser.isAnonymous){setStatus('Director login required');return false;}
      const record=db.ref(database,path());
      await db.runTransaction(record,current=>{
        const existingVersion=valid(current)?current.version:0;
        return {scene,paused:!!paused,version:existingVersion+1,updatedAt:Date.now()};
      },{applyLocally:false});
      return true;
    }catch(error){setStatus(error?.code==='PERMISSION_DENIED'?'Director permission denied':'Firebase save failed');return false;}
  }
  function close(){closed=true;if(unsub)unsub();}
  window.BlackthornFirebasePreviewSync={enabled,session,connect,publish,close,get status(){return status;}};
})();
