// const tesseract = require("node-tesseract-ocr");


//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){

  // talkify config stuff
  talkify.config.remoteService.host = 'https://talkify.net';
  talkify.config.remoteService.apiKey = '558cecb3-7843-4ad6-b759-993123affadc';
  talkify.config.ui.audioControls.enabled = true;
  //add an event listener 
  document.getElementById('read').addEventListener('click',startReading);
  live();

}
let w = 0;
let h=0;
function live() {
  const video = document.getElementById('livevid');
  // const canvas = document.getElementById('canvas');
  window.navigator.mediaDevices.getUserMedia(constraint)
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();
        console.log("vidoe's"+video.videoWidth+" "+video.videoHeight);
        console.log(w+" "+h);
        w = video.videoWidth;
        h = video.videoHeight;
        console.log(w+" "+h);
        canvas.width = w;
        canvas.height = h;
        };
    })

    .catch( () => {
        alert('Camera permission required');
    });
}


function snapshot(){
  const canvas = document.createElement('canvas');
  const context = canvas.getContext("2d");
  const video = document.getElementById('livevid');
  console.log("vidoe's"+video.videoWidth+" "+video.videoHeight);
  console.log(w+" "+h);
  context.drawImage(video, 0, 0, w, h);
  const dataURI = canvas.toDataURL('image/jpeg');
  // localStorage.setItem("image", dataURI);
  // const blob = canvas.toBlob(); 
  return dataURI;
}

const constraint = 
    {
        audio: false,
        video: {
            frameRate: { ideal: 10, max: 15 },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: "environment" }
        }
    }

//function to return the image text
async function getText(dataURI){
  console.log(dataURI);
  const response = await fetch('/get_text',{method:'POST', headers:{'ContentType':'application/json'}, body:dataURI});
  if (response.ok){
    const json = await response.text();
    return json;
  }
}

async function startReading(){
  //Get frame from camera feed
  const uri = snapshot();

  //Analyse frame using tesseract
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  const textData = await (async()=>getText(uri))();
  console.log(textData);
  // tesseract.recognize("image.jfif", config)
  //   .then(text => {
  //     console.log("Result:", text)
  //     textData = text
  //   })
  //   .catch(error => {
  //     console.log(error.message)
  //     textData = "Sorry I didn't catch that."
  //   })

  //Generate audio based on the text
  const player = new talkify.TtsPlayer()
  .forceVoice({name: "Zira"});
  player.setRate(-1);
  player.playText(textData);
}
