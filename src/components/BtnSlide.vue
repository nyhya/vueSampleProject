<template>
	<div class="slide-btn-wrap">
		<button class="slide-btn left"></button>
		<div class="slide-num">
			<p class="current">1</p>
			<p class="total-num">15</p>
		</div>
		<button class="slide-btn right"></button>
	</div>
</template>

<script>
export default {};
</script>

<style>
.slide-btn-wrap {
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	margin-top: 40px;
}

.slide-btn-wrap > * {
	display: inline-block;
}

.slide-btn {
	width: 24px;
	height: 24px;
	background-color: #2d2e36;
	border-radius: 50%;
}

.slide-btn.left {
	background-color: #f6f7f9;
}

.slide-num {
	margin: 0px 9px;
}

.slide-num > * {
	position: relative;
	display: inline-block;
	line-height: 24px;
}

.slide-num p.current {
	font-family: Roboto;
	font-size: 15px;
	font-weight: bold;
	color: #fff;
}

.slide-num p.current::after {
	display: inline-block;
	content: ' \002F';
	color: #fff;
	padding: 0px 3px;
}
.slide-num p.total-num {
	font-family: Roboto;
	font-size: 15px;
	font-weight: bold;
	color: #555;
}
</style>
