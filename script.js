let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
}

if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function selectVoice() {
  speech.voice = voices[voiceSelect.value];
}

function speakText() {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
}

voiceSelect.addEventListener("change", selectVoice);
document.querySelector("button").addEventListener("click", speakText);

// Additional logic for mobile devices
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobileDevice) {
  document.addEventListener("DOMContentLoaded", loadVoices);
}
