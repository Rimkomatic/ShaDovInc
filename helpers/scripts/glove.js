{
  
let scene = new THREE.Scene();
document.addEventListener("mousemove", onMouseMove, false);
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let mouseX;
let mouseY;

const hero = document.getElementById('hero')

let renderer = new THREE.WebGLRenderer();
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

let distance = Math.min(200, window.innerWidth / 4);
let geometry = new THREE.BufferGeometry();
let vertices = [];
let colors = [];

for (let i = 0; i < 5000; i++) {
  let vertex = new THREE.Vector3();

  let theta = Math.acos(THREE.Math.randFloatSpread(2));
  let phi = THREE.Math.randFloatSpread(360);

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  vertices.push(vertex.x, vertex.y, vertex.z);

  let color = new THREE.Color(Math.random() * 0xffffff);
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
let shaderMaterial = new THREE.ShaderMaterial({
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

let particles = new THREE.Points(geometry, shaderMaterial);

particles.boundingSphere = 50;

let renderingParent = new THREE.Group();
renderingParent.add(particles);

let resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

let animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
let myTween;
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
let animProps = { scale: 1, xRot: 0, yRot: 0 };
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

}