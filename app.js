const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let isListening = false;

// 🔊 Speak Function
function speak(text) {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// 👋 Greeting
function wishMe() {
    let hour = new Date().getHours();

    if (hour < 12) {
        speak("Good morning boss");
    } 
    else if (hour < 17) {
        speak("Good afternoon boss");
    } 
    else {
        speak("Good evening boss");
    }
}

// 🚀 On Load
window.onload = () => {
    speak("Initializing Jarvis");
    wishMe();
};

// 🎤 Speech Recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;

// 🎧 When recognition starts
recognition.onstart = () => {
    content.textContent = "Listening...";
    console.log("Voice recognition started");
};

// 🎧 When speech detected
recognition.onresult = (event) => {

    const currentIndex = event.resultIndex;
    const transcript =
        event.results[currentIndex][0].transcript.toLowerCase();

    console.log(transcript);

    content.textContent = transcript;

    // 🛑 Stop Command
    if (
        transcript.includes("okay stop") ||
        transcript.includes("stop listening")
    ) {
        speak("Okay boss, stopping now");
        isListening = false;
        recognition.stop();
        content.textContent = "Tap to speak";
        return;
    }

    takeCommand(transcript);
};

// ❌ Error Handling
recognition.onerror = (event) => {
    console.log(event.error);

    if (event.error === "not-allowed") {
        speak("Please allow microphone permission");
    }

    if (event.error === "no-speech") {
        console.log("No speech detected");
    }
};

// 🔁 Restart automatically
recognition.onend = () => {
    console.log("Recognition ended");

    if (isListening) {
        recognition.start();
    }
};

// 🎙️ Button Click
btn.addEventListener('click', () => {

    if (!isListening) {

        isListening = true;

        recognition.start();

        speak("I am listening");

    } else {

        isListening = false;

        recognition.stop();

        content.textContent = "Tap to speak";

        speak("Stopped listening");
    }
});

// 🧠 Commands
function takeCommand(message) {

    // Greetings
    if (
        message.includes("hello") ||
        message.includes("hi")
    ) {
        speak("Hello boss, how can I help you?");
    }

    else if (message.includes("how are you")) {
        speak("I am functioning perfectly");
    }

    else if (message.includes("time")) {

        let time = new Date().toLocaleTimeString();

        speak("The time is " + time);
    }

    else if (message.includes("date")) {

        let date = new Date().toLocaleDateString();

        speak("Today's date is " + date);
    }

    // Open Websites
    else if (message.includes("open google")) {

        speak("Opening Google");

        window.open("https://google.com", "_blank");
    }

    else if (message.includes("open youtube")) {

        speak("Opening YouTube");

        window.open("https://youtube.com", "_blank");
    }

    else if (message.includes("open instagram")) {

        speak("Opening Instagram");

        window.open("https://instagram.com", "_blank");
    }

    // Search
    else if (message.includes("search")) {

        let query = message.replace("search", "");

        speak("Searching for " + query);

        window.open(
            `https://www.google.com/search?q=${query}`,
            "_blank"
        );
    }

    // Play Music
    else if (message.includes("play")) {

        let song = message.replace("play", "");

        speak("Playing " + song);

        window.open(
            `https://www.youtube.com/results?search_query=${song}`,
            "_blank"
        );
    }

    // Joke
    else if (message.includes("joke")) {

        speak(
            "Why do programmers prefer dark mode? Because light attracts bugs."
        );
    }

    // Default
    else {

        speak("I did not understand that");
    }
}