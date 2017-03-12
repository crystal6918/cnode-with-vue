<template>
 	<section>
 		<ul>
 			<li v-for="topic in topics">
				<img v-bind:src = "topic.author.avatar_url">
				<span>{{topic.reply_count}}|{{topic.visit_count}}</span>
				<span v-bind:class="getTag(topic.top,topic.god,topic.tab,true)">{{getTag(topic.top,topic.god,topic.tab,false)}}</span>
				<span>{{topic.title}}</span>
				<span>{{getTimeStr(topic.last_reply_at) || getTimeStr(topic.create_at)}}</span>
 			</li>
 		</ul>
 	</section>
</template>

<script>
import $ from 'webpack-zepto';

export default {
  data:function(){
  	return{
  		topics:[],
  		index:{}, //用于查看是否有重复的topic
  	}

  },
  mounted:function(){
  	this.getTopics();
  },
  methods:{
  	//ajax获得全部资源
  	getTopics:function(){
  		$.get(' https://cnodejs.org/api/v1/topics ',(d)=>{
  			if(d && d.data){
  				d.data.forEach(this.dealTopics);
  			}
  		})
  	},
  	//处理返回的资源
  	dealTopics:function(topic){
  		if(typeof this.index[topic.id] === "number"){
  			//如果存在的话就更新
  			const topicIndex = this.index[topic.id];
  			this.topics[topicIndex] = topic;
  		}else{
  			this.index[topic.id] = this.topics.length;
  			this.topics.push(topic);
  		}
  	},
  	getTag:function(top,good,tab,isClass){
  		var str,className;
  		if(top){
  			str = '置顶';
  			className = "top";
  		}else if(good){
  			str = '精华';
  			className = "good";
  		}else{
  			switch(tab){
  				case 'share':
                str = '分享';
                className = 'share';
                break;
            case 'ask':
                str = '问答';
                className = 'ask';
                break;
            case 'job':
                str = '招聘';
                className = 'job';
                break;
            default:
                str = '暂无';
                className = 'default';
                break;
  			}
  		}
  		return isClass?className:str;
  	},
  	getTimeStr:function(time){
  		var date = new Date(time).getHours();
  		var now = new Date().getHours();
  		return now-date;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
