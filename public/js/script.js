// script.js

// Text-to-Speech (TTS) function
let interval;

function startLoggingCurrentTime() {
    const audio = document.getElementById('au');
    interval = setInterval(() => {
        console.log('Current time:', audio.currentTime);
        if (audio.currentTime >= audio.duration) {
            clearInterval(interval);
            console.log('Audio finished');
        }
    }, 1000);
}

function getAudioDuration() {
    const audio = document.getElementById('au');

    audio.addEventListener('loadedmetadata', () => {
        console.log('Audio duration:', audio.duration);
    });

    // If the metadata is already loaded, log the duration immediately
    if (audio.readyState >= 1) {
        console.log('Audio duration:', audio.duration);
    }

    audio.addEventListener('play', () => {
        console.log('Audio started');
        startSpeakingAnimation()
        startLoggingCurrentTime();
    });

    audio.addEventListener('pause', () => {
        console.log('Audio paused');
        clearInterval(interval);
        stopSpeakingAnimation()
    });

    audio.addEventListener('ended', () => {
        console.log('Audio ended');
        clearInterval(interval);
    });
}

// Call the function to initialize event listeners when the page loads
getAudioDuration();



/*
function speak(text) {

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
    window.speechSynthesis.speak(utterance);
    
    startSpeakingAnimation();

    utterance.onend = () => {
        stopSpeakingAnimation() // Revert to original image after speaking
    };
}

// Speech Recognition function
function listen() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        handleUserInput(transcript);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
}

// Handle user input
function handleUserInput(input) {
    console.log('User said:', input);

    let response = "I'm sorry, I didn't understand that.";
    if (input.toLowerCase().includes('hello')) {
        response = 'The Great Sphinx is a monumental sculpture with the body of a lion and the head of a human, believed to represent a pharaoh. It measures approximately 73 meters (240 feet) in length and 20 meters (66 feet) in height, making it one of the largest and oldest monolithic statues in the world. The Sphinx faces east, aligning with the rising sun, which is symbolic in ancient Egyptian culture.';
    } else if (input.toLowerCase().includes('your name')) {
        response = 'My name is Chatty!';
    }

    speak(response);

}
    */
function startSpeakingAnimation() {
    const characterImage = document.getElementById('character-image');
    let isSpeaking = true;

    speakingInterval = setInterval(() => {
        if (isSpeaking) {
            characterImage.src = 'img/photo_4.png'; // Speaking image
        } else {
            characterImage.src = 'img/photo_3.png'; // Idle image
        }
        isSpeaking = !isSpeaking;
    }, 350); // Switch images every 500ms
}

// Stop speaking animation

function stopSpeakingAnimation() {
        if (speakingInterval) {
            clearInterval(speakingInterval);
            speakingInterval = null; // Ensure the interval is cleared
        }
        const characterImage = document.getElementById('character-image');
        characterImage.src = 'img/photo_3.png'; // Revert to idle image
}
// Button event listener
/*
document.getElementById('talk-button').addEventListener('click', () => {
    listen();
    
});
*/
