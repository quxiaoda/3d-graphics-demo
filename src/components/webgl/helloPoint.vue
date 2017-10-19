<template>
  <div>
    <canvas id="webgl" width="400px" height="400px">
      您的浏览器不支持canvas！
    </canvas>

    <ul class="option">
      <li>
        <span class="text">X: </span>
        <slider class="slider" v-model="x" :min="0" :max="10" :tip-format="hideFormat" @on-input="setX"></slider>
      </li>
      <li>
        <span class="text">Y: </span>
        <slider class="slider" v-model="y" :min="0" :max="10" :tip-format="hideFormat" @on-input="setY"></slider>
      </li>
      <li>
        <span class="text">Z: </span>
        <slider class="slider" v-model="z" :min="0" :max="10" :tip-format="hideFormat" @on-input="setZ"></slider>
      </li>
    </ul>  
  </div>
</template>

<style type="scss">
  .option{
    width: 400px;
    margin: 0 auto;
  }
  .text{
    display: inline-block;
    font-size: 16px;
    height: 34px;
    vertical-align: text-bottom;
  }
  .slider{
    display: inline-block;
    width: 300px;
    margin-left: 10px;
  }
</style>

<script>
  import '../base/reset.css'
	import {getWebGLContext, initShaders} from '../base/util.js'

  export default {
  	name: 'helloPoint',
    data() {
      return {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        size: 10.0,
        gl: null,
        X: 0,
        Y: 0,
        Z: 0,
      }
    },
    methods: {
        hideFormat: function(val) {
            return val/10;
        },
        setX: function(value) {
          this.renderPoint({x: value/10})
          console.log(value)
        },
        setY: function(value) {
          this.renderPoint({y: value/10})
          console.log(value)
        },
        setZ: function(value) {
          this.renderPoint({z: value/10})
          console.log(value)
        },
        renderPoint: function({x, y, z}) {
          let gl = this.gl

          x && (this.X = x)
          y && (this.Y = y)
          z && (this.Z = z)

          gl.clearColor(0, 0, 0, 1)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.vertexAttrib3f(this.a_Position, this.X, this.Y, this.Z)
          // gl.vertexAttrib1f(this.a_PointSize, 40.0)
          // 绘制一个点
          gl.drawArrays(gl.POINTS, 0, 1)
        }
    },
  	mounted() {
      // 顶点着色器
      // attribute 属性必须要定义在全局
      const VSHADER_SOURCE = 
        'attribute vec4 a_Position;\n'+
        'attribute float a_PointSize;\n'+
        'void main() {\n' +
        '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
        '  gl_PointSize = a_PointSize;\n' +                    // Set the point size
        '}\n';

      // 片元着色器
      const FSHADER_SOURCE =
        'void main() {\n' +
        '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
        '}\n';

      let gl = getWebGLContext('webgl')
      this.gl = gl //全局变量

      // 初始化着色器
      if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Fails to initialize shaders.')
        return;
      }

      let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')

      this.a_Position = a_Position
      this.a_PointSize = a_PointSize

      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
      }
      gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.9)
      gl.vertexAttrib1f(a_PointSize, 40.0)


  		gl.clearColor(0, 0, 0, 1)
  		gl.clear(gl.COLOR_BUFFER_BIT)

      // 绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1)
  	}
  }
</script>