<template>

 	<section>
    <czHead ref="head"></czHead>
 		<ul>
 			<li class="topicItem" v-for="topic in topics" v-on:click="toTopic(topic.id)">
				<img class="img-little" v-bind:src = "topic.author.avatar_url">
				
        <div class="topicTitle">
          <span v-bind:class="getTag(topic.top,topic.good,topic.tab,true)">{{getTag(topic.top,topic.good,topic.tab,false)}}</span>
          <span>{{topic.title}}</span>
        </div>
				<span class="reply">{{topic.reply_count}}</span><span class="visit">/{{topic.visit_count}}</span>
				<span class="time">{{getTimeStr(topic.last_reply_at) || getTimeStr(topic.create_at)}}</span>
 			</li>
 		</ul>
 	</section>
</template>

<script>
import $ from 'webpack-zepto';
import util from '../lib/util';
import czHead from './header';
export default {
  data:function(){
  	return{
  		topics:[],
  		index:{}, //用于查看是否有重复的topic
      searchKey:{
        page:1,
        tab:'all',
        limit:20
      },
      scroll:false
  	}

  },
  mounted:function(){
    if (this.$route.query && this.$route.query.tab) {
        this.searchKey.tab = this.$route.query.tab;
    }
  	this.getTopics();
    $(window).on('scroll',this.debounce(this.getScrollData,500))
  },
  methods:{
  	//ajax获得全部资源
  	getTopics(){
  		$.get(' https://cnodejs.org/api/v1/topics?'+$.param(this.searchKey),(d)=>{
  			if(d && d.data){
          console.log(this.searchKey.tab);
  				d.data.forEach(this.dealTopics);
          this.scroll = true;
  			}
  		})
  	},
  	//处理返回的资源
  	dealTopics(topic){
  		if(typeof this.index[topic.id] === "number"){
  			//如果存在的话就更新
  			const topicIndex = this.index[topic.id];
  			this.topics[topicIndex] = topic;
  		}else{
  			this.index[topic.id] = this.topics.length;
  			this.topics.push(topic);
  		}
  	},
  	getTag(top,good,tab,isClass){
      return util.getTag(top,good,tab,isClass);
  		
  	},
  	getTimeStr(time){
      return util.getTimeStr(time);
  	},
    toTopic(id){
      this.$router.push({
        name:'topic',
        params:{id:id}
      });
    },
    getScrollData(){

        if(this.scroll){
          if($(window).height()+$(window).scrollTop() + 50 >= $(document).height()){
            this.scroll = false;
            this.searchKey.page++;
            this.getTopics();
          }
      }
      
    },
    debounce(fn,delay){
      let timer = null;
      return function(){
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
          fn.apply(context,args);
        },delay)
      }
    }
  },
  watch: {
            // 由于多个路由匹配同一个组件，因此在切换分类时组件并不会重新渲染
            //因此通过watch $route 对象来对参数的变化作出响应，相当于手动渲染页面
            '$route' (to, from) {
                if (to.query && to.query.tab) {
                    this.searchKey.tab = to.query.tab;
                    this.topics = [];
                    this.index = {};
                }
                this.searchKey.page = 1;
                this.getTopics();
                this.$refs.head.isOpen = false;
            }
        },
  components:{
    czHead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
  ul{
    margin-top:40px;
  }
  .img-little{
      width:50px;
      height:50px;
    }
  li.topicItem {

    list-style:none;
    height:70px;
    border-bottom:1px solid #ddd;
    padding: 10px;
    position:relative;
    

    .topicTitle{
      display:inline-block;
      position:absolute;
      top:10px;
      cursor:pointer;

     
    }
     

    .reply,.visit{
      font-size:.8em;
    }
    .reply{
      color:#118AB2;
      font-weight:700;
    }
    .visit{
      color:#909090;
    }
    .time{
      float:right;
      font-size:.8em;
      color:#909090;
    }
  }

  //全局标签样式
  @mixin tag{
        padding:3px;
        border-radius:3px;
        font-size:0.8em;
        color:white;
      }
      .top{
        @include tag;
        background-color:#EF476F;       
      }
      .good{
        @include tag;
        background-color:#FFD166;    
      }
      .share{
        @include tag;
        background-color:#06D6A0;    
      }
      .ask{
        @include tag;
        background-color:#118AB2;    
      }
      .job{
        @include tag;
        background-color:#073B4C;    
      }

</style>
