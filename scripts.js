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

    /*
        TODO: add ability for user to change wave shape
    */
}

// Fetch notes from notes.json and create buttons for each note
fetch('notes.json')
.then(response => response.json())
.then(data => {
  // Iterate through each note and create a button
  Object.keys(data).forEach(note => {
    const button = document.createElement('button');
    if (note.includes('#')) {
      // Add class "sharp-key" to notes with #
      button.className = 'sharp-key'; 
    } else {
      // Set the text of the button to the note
      button.textContent = note; 
      // Add class "key" to notes without #
      button.className = 'key';
    }

    // Set onclick event to play the frequency of the note
    button.onclick = () => {
        console.log('data[note]:', data[note]); // Debugging line
        playFrequency(data[note].frequency);
    };

    // Set keydown event to trigger the button with the appropriate keybind
    document.addEventListener('keydown', (event) => {
      if (event.key === data[note].keybind) {
        button.click();
      }
    });

    // Append the button to the document body
    document.querySelector('.piano').appendChild(button);
  });
});
