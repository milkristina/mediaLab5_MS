let statue;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', function() {
  const scene = document.querySelector('a-scene');
  
  scene.addEventListener('loaded', function() {
    statue = document.querySelector('#statue');
    
    const buttons = {
      'btn-rotLeft': function() {
        let rotation = statue.getAttribute('rotation');
        statue.setAttribute('rotation', {x: rotation.x, y: rotation.y - 15, z: rotation.z});
      },
      'btn-rotRight': function() {
        let rotation = statue.getAttribute('rotation');
        statue.setAttribute('rotation', {x: rotation.x, y: rotation.y + 15, z: rotation.z});
      },
      'btn-back': function() {
        let position = statue.getAttribute('position');
        statue.setAttribute('position', {x: position.x, y: position.y, z: position.z - 0.3});
      },
      'btn-forward': function() {
        let position = statue.getAttribute('position');
        statue.setAttribute('position', {x: position.x, y: position.y, z: position.z + 0.3});
      },
      'btn-left': function() {
        let position = statue.getAttribute('position');
        statue.setAttribute('position', {x: position.x - 0.3, y: position.y, z: position.z});
      },
      'btn-right': function() {
        let position = statue.getAttribute('position');
        statue.setAttribute('position', {x: position.x + 0.3, y: position.y, z: position.z});
      },
      'btn-zoomIn': function() {
        let scale = statue.getAttribute('scale');
        statue.setAttribute('scale', {x: scale.x * 1.2, y: scale.y * 1.2, z: scale.z * 1.2});
      },
      'btn-zoomOut': function() {
        let scale = statue.getAttribute('scale');
        statue.setAttribute('scale', {x: scale.x * 0.8, y: scale.y * 0.8, z: scale.z * 0.8});
      },
      'btn-toggle': function() {
        isAnimating = !isAnimating;
        if (isAnimating) {
          statue.setAttribute('animation', {
            property: 'rotation',
            to: '-90 405 0',
            loop: true,
            dur: 10000,
            easing: 'linear'
          });
        } else {
          statue.removeAttribute('animation');
        }
      },
      'btn-reset': function() {
        statue.setAttribute('position', {x: 0, y: 0.5, z: -4});
        statue.setAttribute('rotation', {x: -90, y: 45, z: 0});
        statue.setAttribute('scale', {x: 0.1, y: 0.1, z: 0.1});
        if (isAnimating) {
          isAnimating = false;
          statue.removeAttribute('animation');
        }
      }
    };
    
    for (let btnId in buttons) {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('mouseenter', function() {
          this.setAttribute('scale', {x: 1.1, y: 1.1, z: 1.1});
        });
        btn.addEventListener('mouseleave', function() {
          this.setAttribute('scale', {x: 1, y: 1, z: 1});
        });
        btn.addEventListener('click', function() {
          console.log('Clicked:', btnId);
          buttons[btnId]();
        });
      }
    }
  });
});