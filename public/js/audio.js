// script.js

// Text-to-Speech (TTS) function
/*
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

*/
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



// Handle user input
function handleUserInput() {
    value=document.getElementById('user_inp').value
    console.log('User said:', value);

    

    speak(value);

}
handleUserInput();
function startSpeakingAnimation() {
    const characterImage = document.getElementById('character-image');
    let isSpeaking = true;

    speakingInterval = setInterval(() => {
        if (isSpeaking) {
            characterImage.src = 'img/img1_char.png'; // Speaking image
        } else {
            characterImage.src = 'img/img2.png'; // Idle image
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
        characterImage.src = 'img/img1_char.png'; // Revert to idle image
}

*/
let speakingInterval; // Define speakingInterval at the top to avoid scope issues

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
    window.speechSynthesis.speak(utterance);
    
    startSpeakingAnimation();

    utterance.onend = () => {
        stopSpeakingAnimation(); // Revert to the initial image after speaking
    };
}

// Handle user input
function handleUserInput() {
    const value = document.getElementById('user_inp').value;
    console.log('User said:', value);

    speak(value);
}
handleUserInput();
function startSpeakingAnimation() {
    const characterImage = document.getElementById('character-image');
    characterImage.src = 'img/animation_used.gif'; // Change to GIF when speaking starts

    // Optionally, you can use setInterval for more complex animations
    // let isSpeaking = true;
    // speakingInterval = setInterval(() => {
    //     if (isSpeaking) {
    //         characterImage.src = 'img/speaking.gif'; // Speaking GIF
    //     } else {
    //         characterImage.src = 'img/idle_image.png'; // Another frame, if needed
    //     }
    //     isSpeaking = !isSpeaking;
    // }, 350); // Switch images every 350ms
}

// Stop speaking animation
function stopSpeakingAnimation() {
    const characterImage = document.getElementById('character-image');
    characterImage.src = 'img/img1_char.png'; // Revert to the initial image

    // Clear the interval if it was used
    if (speakingInterval) {
        clearInterval(speakingInterval);
        speakingInterval = null; // Ensure the interval is cleared
    }
}

// Set the initial image on page load

