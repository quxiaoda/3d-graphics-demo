<template>
	<canvas id="webgl" width="400px" height="400px">
		您的浏览器不支持canvas！
	</canvas>

</template>

<script>
  export default {
  	name: 'demo1',
  	mounted() {
  		let webgl = document.getElementById('webgl')
  		let gl = webgl.getContext('webgl')

  		gl.clearColor(0, 0, 0, 1)
  		gl.clear(gl.COLOR_BUFFER_BIT)
  	}
  }
</script>