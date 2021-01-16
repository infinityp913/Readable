const tesseract = require("node-tesseract-ocr");

//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){
  //add an event listener 
  document.getElementById('Read').addEventListener('click',startReading);
}



function startReading(){
  //Get frame from camera feed




  
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


