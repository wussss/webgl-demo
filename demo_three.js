const canvas = document.getElementById('canvas')
const height = 400
const width = 400
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2,-height / 2, -100, 100)
renderer.setSize(400, 400)

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide

});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 1)
scene.add(mesh);
camera.position.set(-10, 10, 10)
camera.lookAt(new THREE.Vector3(0, 0, 0))
const axesHelper = new THREE.AxesHelper(200);
axesHelper.position.set(0, 0, 0.5)
scene.add(axesHelper);
renderer.render(scene, camera)
let currentAngle = 0
let last = Date.now()
console.log(last)
function animate() {
    const now = Date.now()//当前帧时间戳
    const duration = now - last
    last = now
    currentAngle += duration / 1000 * Math.PI
}
function render() {
    animate()
    mesh.rotation.set(currentAngle, currentAngle, currentAngle)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
renderer.setClearColor(new THREE.Color(0, 0, 0, 1))
render()