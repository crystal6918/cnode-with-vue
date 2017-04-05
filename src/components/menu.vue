<template>
 	<div class="menu" v-bind:class="{open:isOpen}">
 		
 		<router-link :to="{name:'all',query:{tab:'all'}}">全部</router-link>
 		<router-link :to="{name:'all',query:{tab:'good'}}">精华</router-link>
 		<router-link :to="{name:'all',query:{tab:'share'}}">分享</router-link>
 		<router-link :to="{name:'all',query:{tab:'ask'}}">问答</router-link>
 		<router-link :to="{name:'all',query:{tab:'job'}}">招聘</router-link>

 	</div>
</template>

<script>
import $ from 'webpack-zepto';
export default {
	props:{
		isOpen:false
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.menu {
		position:fixed;
		top:0;
		left:-150px;;
		height:100vh;
		background-color:#118AB2;
		width:150px;
		padding:10px;
		z-index:2;
		transition:all 0.5s;

		&.open{
			left:0;
		}
		a{
			display:block;
			text-align:center;
			text-decoration:none;
			color:#fff;
			margin-bottom:10px;
		}
	}
</style>
