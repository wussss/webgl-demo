var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE

VSHADER_SOURCE = `
   attribute vec4 a_Position;
   uniform mat4 u_ModelMatrix;
   void main(){
    gl_Position =  u_ModelMatrix * a_Position;
   }
`

FSHADER_SOURCE = `
   void main(){
    gl_FragColor = vec4(0.84, 0.74, 0.88, 1);;
   }
`

function createShader(gl, sourceCode, type) {
    // create shader
    var shader = gl.createShader(type)
    gl.shaderSource(shader, sourceCode)
    gl.compileShader(shader)
    return shader
}

// define vertex shader
var vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
// define frament shader
var fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

// attach shader to program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// link program to context
gl.linkProgram(program)
gl.useProgram(program)
gl.program = program

var currentAngle = 0
var g_last = Date.now()



function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, 0, 0.5, 0,
        0, -0.5, -0.5, 0, 0.5, 0
    ])
    var n = vertices.length / 2
    var vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // get attribute a_Position address in vertex shader
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // enable a_Position variable
    gl.enableVertexAttribArray(a_Position)
    return n
}

// write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl)

var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
var modelMatrix = new Matrix4()


function animate() {
    var now = Date.now()
    var duration = now - g_last
    g_last = now
    currentAngle = currentAngle + duration / 1000 * 180
}
gl.clearColor(1, 1, 1, 1)
function draw() {
    modelMatrix.setRotate(currentAngle, 0, 1, 0)
    //write postion data
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)
    // clear canvas and add background color
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, n)
}
var tick = function () {
    // update the new rotation angle
    animate()
    // draw
    draw()
    requestAnimationFrame(tick)
}
tick()

