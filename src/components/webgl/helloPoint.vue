<template>
	<canvas id="webgl" width="400px" height="400px">
		您的浏览器不支持canvas！
	</canvas>

</template>

<script>
	import {getWebGLContext, initShaders} from '../base/util.js'

  export default {
  	name: 'helloPoint',
    data() {
      return {}
    },
  	mounted() {
      // 顶点着色器
      const VSHADER_SOURCE = 
        'void main() {\n' +
        '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
        '  gl_PointSize = 10.0;\n' +                    // Set the point size
        '}\n';

      // 片元着色器
      const FSHADER_SOURCE =
        'void main() {\n' +
        '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
        '}\n';

      let gl = getWebGLContext('webgl')

      //初始化着色器
      if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Fails to initialize shaders.')
        return;
      }

  		gl.clearColor(0, 0, 0, 1)
  		gl.clear(gl.COLOR_BUFFER_BIT)

      //绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1)
  	}
  }
</script>