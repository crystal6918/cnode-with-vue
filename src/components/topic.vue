<template>
	<div class="container">
		<czHead></czHead>
		<div class="main">
			<div class="header">
				<span v-bind:class="getTag(topic.top,topic.good,topic.tab,true)">{{getTag(topic.top,topic.good,topic.tab,false)}}</span>
				<span >{{topic.title}}</span>
			</div>
			<div class="topicInfo">
				发布于{{getTimeStr(topic.create_at)}} · 作者{{topic.author.loginname}} · {{topic.visit_count}}次浏览
			</div>
			<hr>
			<div class="content" v-html="topic.content">
			</div>
		</div>
		<div class="comment" v-if="comments.length">
			<div class="comment-num">{{comments.length}}条回复</div>
			<ul>
				<li  v-for="comment in comments">
					<img class="img-little" v-bind:src="comment.author.avatar_url">
					<span>{{comment.author.loginname}} {{getTimeStr(comment.create_at)}}</span>
					<span class="comment-content" v-html="comment.content"></span>
				</li>
			</ul>
		</div>
	</div> 
</template>

<script>
import $ from 'webpack-zepto';
import util from '../lib/util';
import czHead from './header'
export default {
  data:function(){
  	return{
  		topic:{},
		comments:[]
  	}

  },
  mounted:function(){
  	this.getDetail(this.$route.params.id);
  },
  methods:{
  	getDetail(id){
  			//这里要用箭头函数写回调！这样函数内的this指向的才是当前的vm！
			$.get('https://cnodejs.org/api/v1/topic/'+id,(d)=>{
				if(d.success){
					this.topic = d.data;
					this.comments = d.data.replies;
				}
			})
	},
	getTag(top,good,tab,isClass){
      return util.getTag(top,good,tab,isClass); 		
  	},
  	getTimeStr(time){
      return util.getTimeStr(time);
  	},
  },
  	components:{
		czHead
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import url("../assets/air.css");

	.container{
		background-color:#e7e7e7;
		padding:20px 0;
		min-height:100vh;
	}
	@mixin basic{
		width:80%;
		margin: 0 auto;
		background-color:white;
		padding:20px 50px;
	}
	.main{
		@include basic;
		margin-top:40px;
		
		.header {
			margin-bottom:10px;
			&>:first-child{
				vertical-align: super;
			}
			&>:nth-child(2){
				font-size:3rem;
				font-weight:700;
			}
		}
		.content{
			word-break: break-all;
		}
		.topicInfo{
			margin-bottom:10px;
		}		

	}
	.comment{
		@include basic;
		padding:0;
		margin-top:20px;
		
		&>.comment-num{
			padding:5px;
		}

		li{
			min-height:70px;
			height:auto;
			list-style:none;
			border-bottom:1px solid #ddd;
			position:relative;
			padding:10px;

			&:first-child{
				border-top:1px solid #ddd;
			}
			&>span:first-of-type{
				position:absolute;
				top:10px;
			}
		}
		.comment-content{
			display:inline-block;
		}
	}

	
	
</style>
