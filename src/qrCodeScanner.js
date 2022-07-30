const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");//
const outputData = document.getElementById("outputData");//
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;
//need to modify
qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;//
    
    scanning = false;
    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;//
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    /*var url = "https/127.0.0.1:8080/server/server.js";
    var params = {
        method: 'post',
        headers:{
        'Content-Type': 'application/json'
      },
        body: res.text()
    }
    fetch(url,params).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
    });*/
    var jso = { "code" : res };
    console.log((jso));
    async function postName() {
        const response = await fetch('http://127.0.0.1:8000/sending', {
        method: 'POST',
        body: JSON.stringify(jso),
        headers:{
          'Content-Type' : 'application/json'
        }
      });
      const responseText = await response.text();
      console.log(responseText); // logs 'OK'
    }
    postName();
    window.open("stuData.html");
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;//
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
