<template>
 	<img class="preloader" src ='../assets/loader.gif'>
</template>

<script>
export default {
	//挂载时设定定时任务，将路由跳转到all
  mounted:function(){
  	setTimeout(()=>{
  		this.$router.push({
  			name:'all'
  		});
  	},2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	img.preloader{
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
	}
</style>
