<template>
	<canvas id="webgl" width="400px" height="400px">
		您的浏览器不支持canvas！
	</canvas>

</template>

<script>
	import '../base/reset.css'
	import {getWebGLContext, initShaders} from '../base/util.js'

  export default {
  	name: 'getContext',
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
        'precision mediump float;\n' +
        'uniform vec4 u_FragColor;\n' +
        'void main() {\n' +
        '  gl_FragColor = u_FragColor;\n' + // Set the point color
        '}\n';
      let gl = getWebGLContext('webgl')
      
      // 初始化着色器
      if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Fails to initialize shaders.')
        return;
      }

      // 在js中获取顶点着色器变量的存储空间，构建映射关系
      let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
      
      let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
      }

      gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.9)
      gl.vertexAttrib1f(a_PointSize, 40.0)

      gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0)

  		gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      
      // 绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1)
  	}
  }
</script>