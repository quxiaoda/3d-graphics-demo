<template>
  <div>
    <canvas id="webgl" width="400px" height="400px">
      您的浏览器不支持canvas！
    </canvas>

    <ul class="option">
      <li>
        <span class="text">X: </span>
        <slider class="slider" v-model="x" :min="-10" :max="10" :tip-format="hideFormat" @on-input="setX"></slider>
      </li>
      <li>
        <span class="text">Y: </span>
        <slider class="slider" v-model="y" :min="-10" :max="10" :tip-format="hideFormat" @on-input="setY"></slider>
      </li>
      <li>
        <span class="text">Z: </span>
        <slider class="slider" v-model="z" :min="-10" :max="10" :tip-format="hideFormat" @on-input="setZ"></slider>
      </li>
      <li>
        <span class="text">Size: </span>
        <slider class="slider" v-model="size" :min="1" :max="100" @on-input="setSize"></slider>
      </li>
    </ul>  
  </div>
</template>

<style type="scss">
  .option{
    width: 400px;
    margin: 0 auto;
    text-align: left;
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
        size: 40.0,
        gl: null,
        X: 0,
        Y: 0,
        Z: 0,
        Size: 40
      }
    },
    methods: {
        hideFormat: function(val) {
            return val/10;
        },
        setX: function(value) {
          this.renderPoint({x: value/10})
        },
        setY: function(value) {
          this.renderPoint({y: value/10})
        },
        setZ: function(value) {
          this.renderPoint({z: value/10})
        },
        setSize: function(value) {
          this.renderPoint({size: value})
        },
        renderPoint: function({x, y, z, size}) {

          (x !== undefined) && (this.X = x);
          (y !== undefined) && (this.Y = y);
          (z !== undefined) && (this.Z = z);
          (size !== undefined) && (this.Size = size);

          let gl = this.gl

          this.glClear(gl)
          gl.vertexAttrib3f(this.a_Position, this.X, this.Y, this.Z)
          gl.vertexAttrib1f(this.a_PointSize, this.Size)
          // 绘制一个点
          gl.drawArrays(gl.POINTS, 0, 1)
        },
        glClear (gl) {
          gl.clearColor(0, 0, 0, 1)
          gl.clear(gl.COLOR_BUFFER_BIT)
        }
    },
  	mounted() {
      // 顶点着色器
      // 注意：attribute 属性必须要定义在全局
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

      // 在js中获取顶点着色器变量的存储空间，构建映射关系
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

  		// 清除缓冲区
      this.glClear(gl)

      // 绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1)
  	}
  }
</script>