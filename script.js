const apiKey = "577fc7d3b12b460297220009d3b8c1aa";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass the jokes to TTS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const jokeApiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(jokeApiUrl);
    const data = await response.json();
    if (data.joke) {
      joke = data.joke;
    } else {
      joke = `${data.setup}......${data.delivery}`;
    }
    //TTS
    tellMe(joke);
    //Disable button
    toggleButton();
  } catch (error) {
    //Error
  }
}

//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
