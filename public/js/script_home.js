function listen() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
        document.getElementById('user_inp').value=transcript
 
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
}
document.getElementById('talk-button').addEventListener('click', () => {
    listen();
    
    
});


