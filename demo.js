var canvas = document.getElementById('canvas')
canvas.width = 200
canvas.height = 200
var ctx = canvas.getContext('webgl')//1、创建webgl画笔，可以调用webgl的API

var program = ctx.createProgram()//2、定义program,用于绑定顶点着色器和片元着色器

//shader源代码
var VSHADER_SOURCE = `
   attribute vec4 a_Position;
   void main (){
    gl_Position = a_Position;
   }
`

var FSHADER_SOURCE = `
   void main(){
    gl_FragColor = vec4(0.84, 0.74, 0.88, 1);
   }
`

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
ctx.attachShader(program, vertexShader)
ctx.attachShader(program, fragmentShader)
//5、program与ctx绑定
ctx.linkProgram(program)/*  */
ctx.useProgram(program)
ctx.program = program

//6、初始化一个vertex buffer,将点位置传到vertex buffer中，最终传到vertexShader中
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 1, 0, -1, 1, 0,
        0, 1, 0, -1, -1, 0,
        -0.5, 1, -0.5, 0.5, -1, 0.5,
        0.5, 1, 0.5, 0.5, 1, 0.5,
        -0.5, -1, -0.5, -0.5, -1, -0.5,
        0.5, -1, 0.5, -0.5, 1, -0.5,
    ])//在画布中的顶点坐标的数组，(0,0)在画布正中间,(0,1)在中间最上方
    var vertexBuffer = gl.createBuffer()
    var n = vertices.length / 2;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    //将数据写入buffer
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    //get顶点着色器里的变量a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    //从vertices中每次拿两个数,赋值给a_Position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    return n;
}

// 7、绘制
//clear时设置背景色
ctx.clearColor(1,1,1,1);

var n = initVertexBuffers(ctx)
function draw() {
    ctx.clear(ctx.COLOR_BUFFER_BIT)
    initVertexBuffers(ctx)
    ctx.drawArrays(ctx.TRIANGLES, 0, n)
}
draw()

