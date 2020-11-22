var canvas = document.getElementById('canvas')
var height = 400
var width = 400
var renderer = new THREE.WebGLRenderer({ canvas: canvas })
var scene = new THREE.Scene()
var camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, height / 2, -1000, -1000)
renderer.setClearColor(new THREE.Color(0xE8DAEF, 1))
renderer.setSize(400, 400)

var heartShape = new THREE.Shape()

heartShape.moveTo(0,100)
heartShape.lineTo(-100, -100)
heartShape.lineTo(100, -100)
heartShape.lineTo(0, 100)

var geometry = new THREE.ShapeGeometry(heartShape);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side:THREE.DoubleSide

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