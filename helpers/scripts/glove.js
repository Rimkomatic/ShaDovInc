
var scene = new THREE.Scene();
document.addEventListener("mousemove", onMouseMove, false);
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var mouseX;
var mouseY;

const hero = document.getElementById('hero')

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
document.addEventListener("resize" ,(e)=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
})


hero.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var distance = Math.min(200, window.innerWidth / 4);
var geometry = new THREE.BufferGeometry();
var vertices = [];
var colors = [];

for (var i = 0; i < 3000; i++) {
  var vertex = new THREE.Vector3();

  var theta = Math.acos(THREE.Math.randFloatSpread(2));
  var phi = THREE.Math.randFloatSpread(360);

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  vertices.push(vertex.x, vertex.y, vertex.z);

  var color = new THREE.Color(Math.random() * 0xffffff);
  colors.push(color.r, color.g, color.b);
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
geometry.setAttribute(
  "customColor",
  new THREE.Float32BufferAttribute(colors, 3)
);

// Custom shader material
var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
    size: { value: 2.0 }
  },
  vertexShader: `
    attribute vec3 customColor;
    varying vec3 vColor;
    uniform float size;

    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `,
  transparent: true
});

var particles = new THREE.Points(geometry, shaderMaterial);

particles.boundingSphere = 50;

var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
var myTween;
function onMouseMove(event) {
  if (myTween) myTween.kill();

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  myTween = gsap.to(particles.rotation, {
    duration: 0.1,
    x: mouseY * -1,
    y: mouseX
  });
  particles.rotation.x = mouseY*-1;
  particles.rotation.y = mouseX;
}
function onTouchMove(event) {
  if (myTween) myTween.kill();

  mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;

  mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

  myTween = gsap.to(particles.rotation, {
    duration: 0.1,

    x: mouseY * -1,

    y: mouseX
  });
}

document.addEventListener("touchmove", onTouchMove, false);

animate();

// Scaling animation
var animProps = { scale: 1, xRot: 0, yRot: 0 };
// gsap.to(animProps, {
//   duration: 10,
//   scale: 1.3,
//   repeat: -1,
//   yoyo: true,
//   ease: "sine",
//   onUpdate: function () {
//     renderingParent.scale.set(
//       animProps.scale,
//       animProps.scale,
//       animProps.scale
//     );
//   }
// });

gsap.to(animProps, {
  duration: 120,
  xRot: Math.PI * 2,
  yRot: Math.PI * 4,
  repeat: -1,
  yoyo: true,
  ease: "none",
  onUpdate: function () {
    renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
  }
});
