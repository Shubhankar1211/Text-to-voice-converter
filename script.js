let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let isSpeaking = false;

// Buttons
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resumeBtn = document.getElementById("resumeBtn");
let stopBtn = document.getElementById("stopBtn");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
})

// Play button
playBtn.addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    
    // If speech is already in progress, cancel it and start fresh
    if (isSpeaking) {
        window.speechSynthesis.cancel();
    }
    
    window.speechSynthesis.speak(speech);
    isSpeaking = true;
})

// Pause button
pauseBtn.addEventListener("click", () => {
    if (isSpeaking) {
        window.speechSynthesis.pause();
    }
});

// Resume button
resumeBtn.addEventListener("click", () => {
    if (isSpeaking) {
        window.speechSynthesis.resume();
    }
});

// Stop button
stopBtn.addEventListener("click", () => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
    }
});

// Update the speaking state when speech ends
speech.onend = function() {
    isSpeaking = false;
};