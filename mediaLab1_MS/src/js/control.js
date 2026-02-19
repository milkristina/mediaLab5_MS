var player = videojs('video');

function updateSpeedSliderColor() {
  var slider = document.getElementById("speedSlider");
  if (!slider) return;

  var min = parseFloat(slider.min);
  var max = parseFloat(slider.max);
  var val = parseFloat(slider.value);

  var percent = ((val - min) / (max - min)) * 100;

  slider.style.background =
    "linear-gradient(to right, #c4ffc4 0%, #c4ffc4 " + percent + "%, #fdabd4 " + percent + "%, #fdabd4 100%)";
}

window.addEventListener('DOMContentLoaded', function() {
  loadURL2();
  updateSpeedSliderColor();
});

function playVideo() {
  player.play();
}

function pauseVideo() {
  player.pause();
}

function stopVideo() {
  player.pause();
  player.currentTime(0);
}

function jumpForward() {
  player.currentTime(player.currentTime() + 5);
}

function jumpBackward() {
  player.currentTime(player.currentTime() - 5);
}

function loadURL(url) {
  player.src({
    src: url,
    type: 'application/x-mpegURL'
  });
  player.load();
  player.play();
}

function loadURL1() {
  loadURL(document.getElementById("url1").value);
}

function loadURL2() {
  loadURL(document.getElementById("url2").value);
}

function shuffleVideo() {
  var urls = [
    document.getElementById('url1').value,
    document.getElementById('url2').value
  ];
  var randomUrl = urls[Math.floor(Math.random() * urls.length)];
  player.src({
    src: randomUrl,
    type: 'application/x-mpegURL'
  });
  player.load();
  player.play();
}

function toggleMute() {
  if (player.muted()) {
    player.muted(false);
    document.getElementById('muteBtn').textContent = 'Mute';
  } else {
    player.muted(true);
    document.getElementById('muteBtn').textContent = 'Unmute';
  }
}


function changeSpeed(speed) {
  player.playbackRate(parseFloat(speed));
  document.getElementById('speedValue').textContent = speed;
  updateSpeedSliderColor();
}


