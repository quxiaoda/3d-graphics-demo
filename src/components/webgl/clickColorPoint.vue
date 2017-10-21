<template>
  <canvas id="webgl" width="400px" height="400px" @click="clickFn">
    您的浏览器不支持canvas！
  </canvas>
</template>

<script>
import '../base/reset.css'
import { getWebGLContext, initShaders, glClear } from '../base/util.js'

export default {
  name: 'getContext',
  data() {
    return {
      gl: null,
      a_Position: null,
      a_PointSize: null,
      u_FragColor: null,
      points: [],
      colors: []
    }
  },
  methods: {
    clickFn(e) {
      let [x, y] = this.getPoint(e)
      this.points.push([x, y])
      this.colors.push(this.getPointColor(x, y))

      this.render()

    },
    render() {
      if (!this.points.length) return
      let {gl, a_Position, u_FragColor, colors} = this
      glClear(gl)
      
      this.points.forEach(function(v, i){
        let curColor = colors[i]
        gl.vertexAttrib2f(a_Position,v[0], v[1])
        gl.uniform4f(u_FragColor, curColor[0], curColor[1], curColor[2], curColor[3])
        
        // 绘制一个点
        gl.drawArrays(gl.POINTS, 0, 1)
      })
    },
    /**
     * 获取当前鼠标点击位置的webgl坐标
     */
    getPoint(e) {
      let { x, y } = e
      let rect = this.getCanvasRect(e)
      
      return this.pointForWebgl(x, y, rect)
    },
    /**
     * 根据当前点的坐标判断处于四象限的位置，返回相应的颜色
     */
    getPointColor(x, y) {
      const RED = [1.0, 0.0, 0.0, 1.0] // 一象限
      const GREEN = [0.0, 1.0, 0.0, 1.0] // 二象限
      const BLUE = [0.0, 0.0, 1.0, 1.0] // 三象限
      const WHITE = [1.0, 1.0, 1.0, 1.0] // 四象限

      if (y >= 0.0) {
        return (x >= 0.0) ? RED : GREEN
      } else {
        return (x >= 0.0) ? WHITE : BLUE
      }
    },
    /**
     * 获取画布边界
     */
    getCanvasRect(e) {
      return e.target.getBoundingClientRect()
    },
    /**
     * 转化为webgl坐标
     */
    pointForWebgl(x, y, rect) {
      let canvas = document.getElementById('webgl')
      let glX = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
      let glY = -1 * ((y - rect.top) - canvas.height / 2) / (canvas.height / 2)

      return [glX, glY]
    }
  },
  mounted() {
    // 顶点着色器
    // 注意：attribute 属性必须要定义在全局
    const VSHADER_SOURCE =
      'attribute vec4 a_Position;\n' +
      'attribute float a_PointSize;\n' +
      'void main() {\n' +
      '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
      '  gl_PointSize = a_PointSize;\n' +                    // Set the point size
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

    // 在js中获取顶点着色器变量的存储空间，构建映射关系
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    this.a_Position = a_Position
    this.a_PointSize = a_PointSize
    this.u_FragColor = u_FragColor

    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position')
      return
    }

    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.9)
    gl.vertexAttrib1f(a_PointSize, 10.0)

    // gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0)

    glClear(gl)

    // 绘制一个点
    // gl.drawArrays(gl.POINTS, 0, 1)
  }
}
</script>