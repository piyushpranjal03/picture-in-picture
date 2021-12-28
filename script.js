const videoElement = document.querySelector(".video");
const captureBtn = document.querySelector(".capture");
const startStopBtn = document.querySelector(".start");

// Prompt to select the media stream,
// Passing the selected stream to the video element,
// Playing the streamed video.
async function selectMediaStream() {
  try {
    // navigator, mediaDevices and getDisplayMedia are the object and methods,
    // Inbuilt of browser which helps to find and capture the stream
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // Assigning the captured stream into video element source
    videoElement.srcObject = mediaStream;

    // Asking browser to play the video when the data is done loading
    videoElement.onloadedmetadata = () => videoElement.play();
    startStopBtn.style.cursor = "pointer";
    startStopBtn.disabled = false;
  } catch (error) {
    console.log("Woops!", error);
  }
}

// Giving prompt to select the stream
captureBtn.addEventListener("click", selectMediaStream);

// Running steam in Picture to Picture
startStopBtn.addEventListener("click", async () => {
  // After clicking the button disabling
  startStopBtn.disabled = true;
  startStopBtn.style.cursor = "not-allowed";

  // Start Picture in Picture effect
  // Waiting for video element to request pip effect
  await videoElement.requestPictureInPicture();

  // Turning start button to stop
  startStopBtn.disabled = false;
  startStopBtn.textContent = "STOP";
  startStopBtn.classList.remove("start");
  startStopBtn.classList.add("stop");
  startStopBtn.style.cursor = "pointer";
});

startStopBtn.addEventListener("click", () => {
  if (startStopBtn.textContent === "STOP") {
    document.exitPictureInPicture();

    // Turning stop button to start again
    startStopBtn.disabled = true;
    startStopBtn.textContent = "START";
    startStopBtn.classList.remove("stop");
    startStopBtn.classList.add("start");
    startStopBtn.style.cursor = "not-allowed";
  }
});
