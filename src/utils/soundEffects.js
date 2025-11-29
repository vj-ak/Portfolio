let audioContext = null;

export const getAudioContext = () => {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioContext = new AudioContext();
        }
    }
    return audioContext;
};

export const initAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
        ctx.resume();
    }
};

const playTone = (freq, type, duration, volume = 0.1) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

export const playHoverSound = () => {
    // High-pitched, short sine wave for hover
    playTone(440, 'sine', 0.1, 0.05);
};

export const playClickSound = () => {
    // Percussive, fast decay sound for click
    playTone(600, 'triangle', 0.1, 0.1);
};

export const playStartupSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNote = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    // Play a C Major 7 chord (C4, E4, G4, B4)
    const now = ctx.currentTime;
    playNote(261.63, now, 1.5); // C4
    playNote(329.63, now + 0.1, 1.5); // E4
    playNote(392.00, now + 0.2, 1.5); // G4
    playNote(493.88, now + 0.3, 1.5); // B4
};

export const playPageTransitionSound = () => {
    // Soft sweep effect for page transitions
    playTone(300, 'sine', 0.2, 0.05);
    setTimeout(() => playTone(400, 'sine', 0.2, 0.05), 50);
    setTimeout(() => playTone(500, 'sine', 0.2, 0.05), 100);
};
