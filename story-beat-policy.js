'use strict';
// Presentation policy: narrative belongs on the beamer; authoring, puzzle and route notes do not.
// This prevents accidental UI spoilers, but it cannot secure JavaScript inside a public repository.
(function(){
 const directiveAtStart=/^(?:PRIVATE\b|SOURCE\b|CASE_\d+\b|INVESTIGATION\b|TEAM ACTION\b|PHONE FOLLOW|FLORINE PHONE\b|MAXINE PHONE\b|ROUTE-DEPENDENT\b|PUBLIC PARTICIPATION\b|SEMINAR INTERACTIONS\b|DOCUMENT PAUSE\b|INSPECTION PAUSE\b|FINAL THEORY\b|THIS SCENE CANNOT\b|THE DIRECTOR\b|HOLD THE SHOT\b|NO (?:RESTRICTED|HIDDEN|MYSTERY)\b|DO NOT\b|WAIT UNTIL\b|W[0-9]+\b)/i;
 const internalTerms=/\b(?:director|gm-only|game master|canonical source|do not|must not|not implemented|player-specific route|personal flows|route scoring|route counters|engagement counters|original evidence card|unreleased contents|romance route|phone follow-ups|personal outcomes|puzzle checkpoint|case_\d+|p0\d{2}[a-z]?)\b/i;
 const isDirectorCue=beat=>{
  if(beat?.speaker!=='STAGE')return false;
  const line=String(beat.text||'').trim();
  // The content warning itself is meant for players; edit it so it never mentions a Director.
  return directiveAtStart.test(line)||internalTerms.test(line);
 };
 window.BlackthornBeatPolicy={
  publicBeats(id){return (window.BlackthornOpeningScript?.[id]||[]).filter(b=>!isDirectorCue(b));},
  directorCues(id){return (window.BlackthornOpeningScript?.[id]||[]).filter(isDirectorCue);}
 };
})();
