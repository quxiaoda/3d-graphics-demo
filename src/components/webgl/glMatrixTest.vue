<template>
	<div class="hello">
		<h1>请打开控制台查看</h1>
	</div>
</template>

<style>
	.hello h1 {
		font-size: 18px;
		color: #ccc;
	}
</style>

<script>
	// import * as Matrix from '../../libs/gl-matrix-min.js'
	import Matrix4 from '../../libs/cuon-matrix.js'
	export default {
		name: 'test-glmatrix',
		created () {
			window.Matrix4 = Matrix4; // 全局注册Matrix4供控制台调用
			console.info('%c下面的输出是Z轴旋转90再X平移0.5的复合变换结果，你也可以在控制台直接操控Matrix4尝试下', 'color: green;font-size: 16px;')
		},
		mounted () {
			let angle = 90; // 旋转角度
			let tx = 0.5; // 平移距离

			let modelMatrix = new Matrix4();

			modelMatrix.setRotate(angle, 0, 0, 1); // Z轴旋转90
			modelMatrix.translate(tx, 0, 0); // X轴平移

			console.log(modelMatrix.elements)
		}

	}

</script>
