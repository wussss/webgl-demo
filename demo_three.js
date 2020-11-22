var canvas = document.getElementById('canvas')
var height = 400
var width = 400
var renderer = new THREE.WebGLRenderer({ canvas: canvas })
var scene = new THREE.Scene()
var camera = new THREE.OrthographicCamera(-width / 2, width / 2, -height / 2, height / 2, -1000, 1000)
renderer.setSize(400, 400)

var x = -50, y = -100;

var heartShape = new THREE.Shape();

heartShape.moveTo(x, y);
heartShape.bezierCurveTo(x + 50, y + 50, x + 40, y, x, y);//绘制一条三次贝塞尔曲线
heartShape.bezierCurveTo(x - 60, y, x - 60, y + 70, x - 60, y + 70);
heartShape.bezierCurveTo(x - 60, y + 110, x - 30, y + 154, x + 50, y + 190);
heartShape.bezierCurveTo(x + 120, y + 154, x + 160, y + 110, x + 160, y + 70);
heartShape.bezierCurveTo(x + 160, y + 70, x + 160, y, x + 100, y);
heartShape.bezierCurveTo(x + 70, y, x + 50, y + 50, x + 50, y + 50);

var geometry = new THREE.ShapeGeometry(heartShape);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide

});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = 1
scene.add(mesh);
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
camera.lookAt(new THREE.Vector3(0, 0, 1))

renderer.render(scene, camera)
var currentAngle = 0
var last = Date.now()
console.log(last)
function animate() {
    var now = Date.now()//当前帧时间戳
    var duration = now - last
    last = now
    currentAngle += duration / 1000 * Math.PI
    // console.log(duration, currentAngle)
}
function render() {
    animate()
    mesh.rotation.set(0, currentAngle, 0)//绕Y轴转动
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
renderer.setClearColor(new THREE.Color(0xE8DAEF, 1))
render()