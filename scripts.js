function playFrequency(frequency) {
    // init audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // init oscillator
    const osc = audioContext.createOscillator();

    // note setup
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    osc.connect(audioContext.destination);
    osc.start();
    
    // stop notes after 1 second
    osc.stop(1);
}
