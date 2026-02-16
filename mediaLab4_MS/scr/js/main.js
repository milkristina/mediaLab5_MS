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

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

function updateCanvasSize() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}

video.addEventListener('loadedmetadata', updateCanvasSize);
window.addEventListener('resize', updateCanvasSize);

snapshotButton.onclick = function() {
  canvas.className = filterSelect.value;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
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

  tracking.track(video, tracker, { camera: true });

  tracker.on('track', function (event) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      event.data.forEach(function (rect) {
          let scaleX = canvas.width / video.videoWidth;
          let scaleY = canvas.height / video.videoHeight;

          canvas.getContext('2d').strokeStyle = '#ff0000';
          canvas.getContext('2d').lineWidth = 2;
          canvas.getContext('2d').strokeRect(
              rect.x * scaleX, 
              rect.y * scaleY, 
              rect.width * scaleX, 
              rect.height * scaleY
          );
      });
  });
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);