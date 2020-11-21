var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('webgl'); //1、创建webgl画笔，可以调用webgl的API

var program = ctx.createProgram(); //2、定义program,用于绑定顶点着色器和片元着色器

//shader源代码
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + 
  'void main () {\n' + 
    'gl_Position = a_Position;\n' + 
  '}\n'

var FSHADER_SOURCE =
  'void main () {\n' + 
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + 
  '}\n'


//3、声明顶点着色器和片元着色器
function createShader(context, sourceCode, type) {
    var shader = context.createShader(type) //创建一个类型为type的着色器
    context.shaderSource(shader, sourceCode) //绑定源代码
    context.compileShader(shader)//编译源代码
    return shader
}

var vertexShader = createShader(ctx, VSHADER_SOURCE, ctx.VERTEX_SHADER)
var fragmentShader = createShader(ctx, FSHADER_SOURCE, ctx.FRAGMENT_SHADER)

//4、着色器与program绑定
ctx.attachShader(program, vertexShader);
ctx.attachShader(program, fragmentShader);
//5、program与ctx绑定
ctx.linkProgram(program); //5、绑定program
ctx.useProgram(program); //6、使用program
ctx.program = program

//6、初始化一个vertex buffer,将顶点位置传到vertex buffer中，最终传到vertexShader中
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    var n = 3
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
var n = initVertexBuffers(ctx)

//7、绘制
ctx.clearColor(0, 1, 0, 1)
function render() {
    ctx.clear(ctx.COLOR_BUFFER_BIT)
    ctx.drawArrays(ctx.TRANGERS, 0, n)
}
render()

