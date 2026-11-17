export function createAudio() {
  let context, lastEngine = 0, lastSiren = 0;
  function tone(freq, duration, type = 'sine', volume = .035) {
    if (!context) return;
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = type; osc.frequency.value = freq; gain.gain.setValueAtTime(volume, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    osc.connect(gain).connect(context.destination); osc.start(); osc.stop(context.currentTime + duration);
  }
  return { unlock() { context ||= new AudioContext(); if (context.state === 'suspended') context.resume(); }, shot() { tone(120,.12,'sawtooth',.08); }, pickup() { tone(720,.15,'sine'); }, mission() { [0,120,240].forEach((delay,i) => setTimeout(() => tone(440+i*150,.25),delay)); }, update(time, driving, wanted) { if (driving && time-lastEngine>220) { tone(70,.24,'sawtooth',.012); lastEngine=time; } if (wanted && time-lastSiren>600) { tone(Math.sin(time/500)>0?620:480,.5,'triangle',.015); lastSiren=time; } } };
}
