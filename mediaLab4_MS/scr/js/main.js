/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

const snapshotButton = document.querySelector('button#snapshot');
const filterSelect = document.querySelector('select#filter');

const video = document.querySelector('video');
const overlay = document.querySelector('canvas#overlay');
const snapshotCanvas = document.querySelector('canvas#snapshotCanvas');
const previewImg = document.querySelector('#snapshotPreview');
const snapStatus = document.querySelector('#snapStatus');


function updateCanvasSize() {
  overlay.width = video.videoWidth;
  overlay.height = video.videoHeight;

  snapshotCanvas.width = video.videoWidth;
  snapshotCanvas.height = video.videoHeight;
}

video.addEventListener('loadedmetadata', updateCanvasSize);
window.addEventListener('resize', updateCanvasSize);

snapshotButton.onclick = function () {
  const ctx = snapshotCanvas.getContext('2d');
  ctx.filter = cssFilterFromSelect(filterSelect.value);
  ctx.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
  ctx.filter = 'none';

  const dataUrl = snapshotCanvas.toDataURL('image/png');
  previewImg.src = dataUrl;
  previewImg.style.display = 'block';
  snapStatus.textContent = 'Snapshot saved ✅';

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `snapshot_${Date.now()}.png`;
  a.click();
};

filterSelect.onchange = function() {
  video.className = filterSelect.value;
};

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  video.srcObject = stream;

  let tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track(video, tracker);

  tracker.on('track', function (event) {
    const ctx = overlay.getContext('2d');
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    event.data.forEach(function (rect) {
      const scaleX = overlay.width / video.videoWidth;
      const scaleY = overlay.height / video.videoHeight;

      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        rect.x * scaleX,
        rect.y * scaleY,
        rect.width * scaleX,
        rect.height * scaleY
      );
    });
  });
}

function cssFilterFromSelect(value) {
  switch (value) {
    case 'none': return 'none';
    case 'blur': return 'blur(3px)';
    case 'grayscale': return 'grayscale(1)';
    case 'invert': return 'invert(1)';
    case 'sepia': return 'sepia(1)';
    default: return 'none';
  }
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
