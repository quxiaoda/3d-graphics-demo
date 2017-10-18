<template>
	<canvas id="webgl" width="400px" height="400px">
		您的浏览器不支持canvas！
	</canvas>

</template>

<script>
	import {getWebGLContext} from '../base/util.js'

  export default {
  	name: 'getContext',
  	mounted() {
  		let gl = getWebGLContext('webgl')

  		gl.clearColor(0, 0, 0, 1)
  		gl.clear(gl.COLOR_BUFFER_BIT)
  	}
  }
</script>