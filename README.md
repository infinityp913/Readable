# Readable
Readable is a web app that uses your camera to capture hard to read text and read it back to you. It designed to be simple to use; ideal for the elderly, visually impaired, and less educated.

# Inspiration
To solve the problem of reading and understanding textual information in a convenient way. Something ideal for people with visual impairments and who struggle reading for things such as reading drug fact labels. It also allows you to listen to older books/text in an audio book style.

# What it does
Readable allows you to listen to text from something from your camera feed. It structured in a simple and easy-to-use way, ideal for the target demographic as well as incorporating accessibility features in the HTML.

# How I built it
Takes a snap of the video feed, it then runs an OCR that uses a neural network (LSTM) and outputs the text and finally Text-to-Speech script on the text to output the audio. This runs on a web app that is scalable to all devices, which makes it easy to use on mobile too.

# Challenges I ran into
Hosting the server and accessing the web cam transferring image data from client to server via dataURI/blobs

# Accomplishments that I'm proud of
Being able to successfully integrate the OCR, front end webcam, and transferring the image locally via DataURI

# What I learned
I learnt to use the tessearctOCR lib and the talkify its library, building a dynamic website, integrating all the different libraries an handling the incompatibilities between the different libs.

# What's next for Readable
Increasing the resolution of the video feed can get better inputs to the OCR. So, more accurate audio

Better training data for the OCR to include more diverse fonts, vocabulary and text with lesser contrast backgrounds

# Built With
bootstrap
css3
express.js
html5
javascript
tesseract


## Download Tesseract for OCR
    *For Windows:
        * [Installer Here] (https://github.com/UB-Mannheim/tesseract/wiki)
    *For Ubuntu
        * apt-get install tesseract-ocr

## Npm install it 
    *npm install node-tesseract-ocr
