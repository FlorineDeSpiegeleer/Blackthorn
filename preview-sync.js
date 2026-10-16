'use strict';
/**
 * Spoiler-free cross-device PREVIEW sync only.
 * Public ntfy.sh topics are not authenticated. NEVER publish private story content,
 * secrets, access tokens, personal messages, choices, or player notes here.
 * The actual V18 mystery uses the private role-authenticated game server.
 */
(function () {
  const params = new URLSearchParams(location.search);
  const session = params.get('session') || '';
  const enabled = /^[a-zA-Z0-9_-]{12,64}$/.test(session);
  const topic = enabled ? 'blackthorn-preview-v1-' + session : '';
  const base = enabled ? 'https://ntfy.sh/' + topic : '';
  const source = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random();
  let stream = null;
  let lastStamp = 0;
  let closed = false;
  let status = 'offline';
  let onState = () => {};
  let onStatus = () => {};
  function setStatus(next) { status = next; onStatus(next); }
  function valid(msg) {
    return msg && msg.kind === 'blackthorn-preview-scene-v1' &&
      Number.isInteger(msg.scene) && msg.scene >= 0 && msg.scene <= 11 &&
      typeof msg.paused === 'boolean' && Number.isSafeInteger(msg.stamp) &&
      msg.stamp > 0 && msg.stamp < Date.now() + 60000;
  }
  function accept(msg) {
    if (!valid(msg) || msg.stamp <= lastStamp || msg.source === source) return;
    lastStamp = msg.stamp;
    onState({scene: msg.scene, paused: msg.paused});
  }
  function connect(callbacks) {
    onState = callbacks.onState || onState;
    onStatus = callbacks.onStatus || onStatus;
    if (!enabled) { setStatus('local preview'); return false; }
    if (!window.EventSource) { setStatus('sync unsupported'); return false; }
    stream = new EventSource(base + '/sse?since=1h');
    stream.onopen = () => setStatus('preview connected');
    stream.onerror = () => setStatus('reconnecting');
    stream.onmessage = event => {
      try {
        const outer = JSON.parse(event.data);
        if (outer.event !== 'message') return;
        accept(JSON.parse(outer.message));
      } catch (_) { /* Ignore unrelated or malformed public channel messages. */ }
    };
    return true;
  }
  async function publish(scene, paused) {
    if (!enabled || closed || !Number.isInteger(scene) || scene < 0 || scene > 11) return false;
    const stamp = Math.max(Date.now(), lastStamp + 1);
    lastStamp = stamp;
    const message = JSON.stringify({kind:'blackthorn-preview-scene-v1',scene,paused:!!paused,stamp,source});
    try {
      const response = await fetch(base, {method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:message});
      if (!response.ok) { setStatus('send failed'); return false; }
      return true;
    } catch (_) { setStatus('network unavailable'); return false; }
  }
  function close() { closed = true; if (stream) stream.close(); }
  window.BlackthornPreviewSync = {enabled,session,connect,publish,close,get status(){return status;}};
})();