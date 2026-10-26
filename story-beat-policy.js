'use strict';
// Scene-beat presentation policy: director cues never appear on the public projector.
// Both Director and projector use the same filtered beat array so the synchronized beat index matches.
(function(){
 const cue=/^(?:PRIVATE\b|SOURCE\b|CASE_\d+\b|INVESTIGATION\b|TEAM ACTION\b|PHONE FOLLOW|FLORINE PHONE\b|MAXINE PHONE\b|ROUTE-DEPENDENT\b|PUBLIC PARTICIPATION\b|SEMINAR INTERACTIONS\b|DOCUMENT PAUSE\b|INSPECTION PAUSE\b|FINAL THEORY\b|THIS SCENE CANNOT\b|THE DIRECTOR\b|HOLD THE SHOT\b|NO (?:RESTRICTED|HIDDEN|MYSTERY)|DO NOT\b|WAIT UNTIL\b|W[0-9]+\b)/i;
 const isDirectorCue=beat=>beat?.speaker==='STAGE'&&cue.test(String(beat.text||'').trim());
 window.BlackthornBeatPolicy={
  publicBeats(id){return (window.BlackthornOpeningScript?.[id]||[]).filter(b=>!isDirectorCue(b));},
  directorCues(id){return (window.BlackthornOpeningScript?.[id]||[]).filter(isDirectorCue);}
 };
})();
