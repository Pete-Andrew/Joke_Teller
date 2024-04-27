//Comment out this let API_KEY and comment back in the API from apiKey.js if you want to pull from the local API
let API_KEY = "";

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//voiceRSS is in a separate JS sheet as a global variable. 

// disable/enable button
function toggleButton () {
    // simple way to set up a toggle when clicked. Makes the button change flip between disable/enabled
    button.disabled = !button.disabled;
}

// passing the joke to voiceRSS API 
function tellMe(joke) {
    console.log("tell me: ", joke);
    VoiceRSS.speech({
        // replace API_KEY below with your personal API key in quotes '<API KEY>' 
        // you need to sign up to rapid API to enable this https://rapidapi.com/voicerss/api/text-to-speech-1/
        key: API_KEY,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from Joke API - this API DOES NOT USE AN API KEY! 
async function getJokes () {
// joke variable has been created so that both one and two part jokes can be told (2 part jokes have different set up in the JSON)
let joke = "";
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
        // if data.setup exists (e.g. the joke is 2 part), else if it doesn't (e.g. the joke is a one liner) then joke = data.joke
       if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
        // console.log(data)
     } else {
        joke = data.joke;
        // console.log(data)
     }
     //text-to-speech
     tellMe(joke);
     //disables the button
     toggleButton();
    } catch (error) {
        // Catch errors here
        console.log("API is not responding, error: ", error);
        alert("Looks like you ain't got no API key, so here's your joke in a prompt! \n \n" + joke)

        // console.log("will pull joke from local JSON")
        // if API fails, use local JSON 
        //joke = localJokes[5];
        // tellMe(joke);
        // toggleButton();
    }   
}

// add event listener to the button, alternative to this is to put: onclick="getJokes()"; in the HTML button info (e.g. next to button id)
button.addEventListener('click', getJokes);
// add audio event listener to prevent the button being pressed again during a joke. 
//The event listener waits until the joke has 'ended' before calling the toggle button function which re-enables the button.
audioElement.addEventListener('ended', toggleButton);

function APIsubmitBtnClick() {
    // enteredAPI updates the global variable, previously I was creating a new one which was unnecessary. 
    enteredAPI = document.getElementById("user_API_KEY_id").value;
    console.log("API that has been input = " + enteredAPI);
    API_KEY = enteredAPI;
    return API_KEY;
    }


// https://rapidapi.com/collection/best-text-to-speech-apis

// to get an API key for the voiceRSS app you need to sign up to VoiceRSS
// https://www.voicerss.org/api/

//You can then take the API key generated by VoiceRSS to rapid API to test it (you'll need to sign up to rapidAPI)
// https://rapidapi.com/voicerss/api/text-to-speech-1/

// https://www.voicerss.org/sdk/javascript.aspx

// the joke API website
// https://sv443.net/jokeapi/v2/