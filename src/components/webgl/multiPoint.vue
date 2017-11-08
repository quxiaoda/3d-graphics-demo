<template>
  <div>
    <canvas id="webgl" width="400px" height="400px">
      您的浏览器不支持canvas！
    </canvas>
    </br>
    <RadioGroup v-model="type" @on-change="changeFn">
        <Radio label="POINTS">点</Radio>
        <Radio label="LINES">线段</Radio>
        <Radio label="LINE_STRIP">线条</Radio>
        <Radio label="LINE_LOOP">回路</Radio>
        <Radio label="TRIANGLES">三角形</Radio>
        <Radio label="TRIANGLES_STRIP" disabled>三角带</Radio>

    </RadioGroup>
  </div>
  
</template>

<script>
import '../base/reset.css'
import Radio from 'iview/src/components/radio'
import { getWebGLContext, initShaders, glClear } from '../base/util.js'

export default {
  name: 'getContext',
  data() {
    return {
      gl: null,
      a_Position: null,
      u_FragColor: null,
      points: [],
      colors: [],
      type: 'POINTS',
      n: 1
    }
  },
  components: {
    Radio,
    RadioGroup: Radio.Group
  },
  methods: {
    changeFn(value) {
      console.log(value)
      let gl = this.gl
      glClear(gl)
      gl.drawArrays(gl[value], 0, this.n);
    },

    initVeryexBuffers(gl){
      let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
      let n = 3; // 顶点的个数

      // 创建缓冲区对象
      let vertexBuffer = gl.createBuffer();
      
      if (!vertexBuffer) {
        console.log('Fail to create the buffer object')
        return -1
      }

      // 将缓冲区对象绑定到目标
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

      // 向缓冲区对象中写入数据
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

      this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')

      // 将缓冲区对象分配给a_Position变量
      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0)

      // 连接a_Position变量与分配给它的缓冲区对象
      gl.enableVertexAttribArray(this.a_Position)

      return n
    }
  },
  mounted() {
    // 顶点着色器
    // 注意：attribute 属性必须要定义在全局
    const VSHADER_SOURCE =
      'attribute vec4 a_Position;\n' +
      'void main() {\n' +
      '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
      '  gl_PointSize = 10.0;\n' +                    // Set the point size
      '}\n';

    // 片元着色器
    const FSHADER_SOURCE =
      'precision mediump float;\n' +
      'uniform vec4 u_FragColor;\n' +
      'void main() {\n' +
      '  gl_FragColor = u_FragColor;\n' + // Set the point color
      '}\n';
    let gl = getWebGLContext('webgl')
    this.gl = gl

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Fails to initialize shaders.')
      return;
    }

    let n = this.initVeryexBuffers(gl)
    this.n = n

    // 在js中获取顶点着色器变量的存储空间，构建映射关系
    // let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    // this.a_Position = a_Position
    this.u_FragColor = u_FragColor

    // if (a_Position < 0) {
    //   console.log('Failed to get the storage location of a_Position')
    //   return
    // }

    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.9)

    gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0)

    glClear(gl)

    // 绘制一个点
    // gl.drawArrays(gl.POINTS, 0, n)
    // 绘制三角形
    gl.drawArrays(gl[this.type], 0, n);
  }
}
</script>