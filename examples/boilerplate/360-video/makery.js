/* global AFRAME */

var portals = [];
var currentPortalName = "#makery1";
var camera = null;
var clicked;
var activePortal = 0;

AFRAME.registerComponent('makery', {
  init: function () {
    var sceneEl = document.querySelector('a-scene');
    portals = sceneEl.querySelectorAll('[portal]');
    goToPortal(activePortal);
  }
});

AFRAME.registerComponent('portal', {
  schema: {
    target: {type: 'selector'},
    src: {type: 'string'},
    position: {type: 'string'},
    rotation: {type: 'string'}
  },
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    var data = this.data;
    var element = this.el;
    element.setAttribute('position', data.position);
    element.setAttribute('geometry', {
      primitive: 'cylinder',
      segmentsHeight: 1,
      height: 2,
      radius: 0.5,
      openEnded: true
    });
    element.setAttribute('material', {
      shader: 'flat', 
      color: '#FFFFFF',
      opacity: 0.7,
      side: 'double',
      src: '#gradient',
      transparent: true,
      depthTest: false
    });
    //this.setupFadeAnimation();
    element.addEventListener('mousedown', function (event) {
      element.setAttribute('material', {
        shader: 'flat', 
        color: '#FFFFFF',
        opacity: 0.7,
        side: 'double',
        src: '#gradient',
        transparent: true,
        depthTest: false
      });
    });
    element.addEventListener('mouseup', function (event) {
      element.setAttribute('material', {
        shader: 'flat', 
        color: '#FFFFFF',
        opacity: 1,
        side: 'double',
        src: '#gradient',
        transparent: true,
        depthTest: false
      });
    });
    element.addEventListener('mouseenter', function (event) {
      element.setAttribute('material', {
        shader: 'flat', 
        color: '#FFFFFF',
        opacity: 1,
        side: 'double',
        src: '#gradient',
        transparent: true,
        depthTest: false
      });
    });
    element.addEventListener('mouseleave', function (event) {
      element.setAttribute('material', {
        shader: 'flat', 
        color: '#FFFFFF',
        opacity: 0.7,
        side: 'double',
        src: '#gradient',
        transparent: true,
        depthTest: false
      });
    });
    element.addEventListener('click', function (event) {
      // Fade out image.
      //data.target.emit('set-image-fade');
      var sceneEl = document.querySelector('a-scene');
      /**var els = sceneEl.querySelectorAll('[portal]');
      for (var i = 0; i < els.length; i++) {
        els[i].emit('set-image-fade');
      }**/
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src: ');
        document.querySelector(currentPortalName).pause();
        var newVid = document.querySelector(data.src);
        newVid.play();
        currentPortalName = data.src;
        data.target.setAttribute('material', 'src: '+data.src);
        data.target.setAttribute('material', 'src', data.src);
        data.target.setAttribute('position', data.position);
        //portals[activePortal].classList.add("link");
        portals[activePortal].setAttribute('visible', true);
        activePortal = (data.src.substring(7)) - 1;
        var secondCameraEl = document.querySelector("#camera");
        secondCameraEl.setAttribute('position', data.position);
        secondCameraEl.setAttribute('rotation', data.rotation);
        goToPortal(activePortal);
      }, 300);
    });
  }
});

function goToPortal(portal){
  var sceneEl = document.querySelector('a-scene');
  //portals[portal].classList.remove("link");
  portals[portal].setAttribute('visible', false);
  sceneEl.querySelector('[raycaster]').components.raycaster.refreshObjects();
}
