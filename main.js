// const tesseract = require("node-tesseract-ocr");
import * as tesseract from "./node_modules/node-tesseract-ocr";


//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){
  //add an event listener 
  document.getElementById('read').addEventListener('click',startReading);
  live();
}
console.log('whatever');

function live() {
    const video = document.getElementById('livevid');
    
    window.navigator.mediaDevices.getUserMedia(constraint)
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    })
    .catch( () => {
        alert('Camera permission required');
    });
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

function startReading(){
  //Get frame from camera feed
  const video = document.getElementById('livevid');

  const cameraSensor = document.getElementById('camera-sensor');

  console.log(type(cameraSensor.getContext('2d').drawImage(cameraView, 0, 0)))

  //Analyse frame using tesseract
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  let textData = ""
  tesseract.recognize("image.jfif", config)
    .then(text => {
      console.log("Result:", text)
      textData = text
    })
    .catch(error => {
      console.log(error.message)
      textData = "Sorry I didn't catch that."
    })

  //Generate audio based on the text

}