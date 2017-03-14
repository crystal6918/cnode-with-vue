<template>
 	<div class="header" v-bind:class="{open:isOpen}">
 		<div class="dark" v-if="isOpen" v-on:click="closeMenu()"></div>
 		<czMenu v-bind:isOpen="isOpen"></czMenu>
 		<img v-on:click="openMenu()" src="../assets/menu.png">
 		<span >{{name}}</span>
 	</div>
</template>

<script>
import $ from 'webpack-zepto';
import czMenu from './menu';
export default {
	data(){
		return {
			name:"",
			isOpen:false
		}
	},
	mounted(){
		this.getCurr();
	},
	methods:{
		getCurr(){
  			var curr = this.$route.name;
  			var str;
  			switch(curr){
  				case "all":
  				str = "全部"
  				break;
  				case "topic":
  				str = "主题"
  				break;
  				default:
  				str = "主题"
  				break;
  			}
  			this.name = str;
  		},
  		openMenu(){
  			this.isOpen = true;
  		},
  		closeMenu(){
  			this.isOpen = false;
  		}

	},
	components:{
		czMenu
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.header{
		position:fixed;
		top:0;
		left:0;
		height:40px;
		width:100%;
		background-color: white;
		z-index:100;
		padding:10px;
		box-shadow:0px 2px 2px 0px #e7e7e7; 
		
		&.open{
			left:150px;

			.dark{
				position:fixed;
				top:0;
				left:0;
				right:0;
				bottom:0;
				background-color:#333;
				opacity:0.5;
			}
		}
		img{
			border-radius:0;
			height:100%;
			width:auto;
			z-index:1;
		}

		span{
			display: inline-block;
    		text-align: center;
    		height: 100%;
    		width: 100%;
    		position: absolute;
    		top:10px;
    		left:0;
    		z-index: -1;
		}
	}
</style>
