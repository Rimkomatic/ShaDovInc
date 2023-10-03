{
    // examples
// https://threejs.org/examples/?q=particle#webgl_points_billboards

let camera2
let scene2
let renderer2
let material2
let mouseX2 = 0
let mouseY2 = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

init()
animate2()

function init () {
  camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
  camera2.position.z = 500

  scene2 = new THREE.Scene()
  scene2.fog = new THREE.FogExp2('#0ed8f8', 0.001)

  const geometry2 = new THREE.BufferGeometry()
  const vertices2 = []
  const size = 2000

  for ( let i = 0; i < 1500; i ++ ) {
    const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
    const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
    const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

    vertices2.push(x, y, z)
  }

  geometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3))

  material2 = new THREE.PointsMaterial({
    size: 1,
    color: 'lightblue',
  })

  const particles2 = new THREE.Points(geometry2, material2)
  scene2.add(particles2)

  renderer2 = new THREE.WebGLRenderer()
  renderer2.setPixelRatio(window.devicePixelRatio)
  renderer2.setSize(window.innerWidth, window.innerHeight)
  const stars = document.getElementById('stars')
  stars.appendChild(renderer2.domElement)

  stars.style.touchAction = 'none'
  stars.addEventListener('pointermove', onPointerMove)
  window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera2.aspect = window.innerWidth / window.innerHeight
  camera2.updateProjectionMatrix()
  renderer2.setSize(window.innerWidth, 1.5 * window.innerHeight)
}

function onPointerMove (event) {
  mouseX2 = event.clientX - windowHalfX 
  mouseY2 = event.clientY - windowHalfY
}

function animate2 () {
  requestAnimationFrame(animate2)
  render()
}

function render () {
  camera2.position.x += (mouseX2 * 2 - camera2.position.x) * 0.02
  camera2.position.y += (-mouseY2 * 2 - camera2.position.y) * 0.02
  camera2.lookAt(scene2.position)
  renderer2.render(scene2, camera2)
  scene2.rotation.x += 0.001
  scene2.rotation.y += 0.002
}

}