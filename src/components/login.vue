<template>
	<section>
 		<czHead></czHead>
 		<input type="text" v-model="accessToken" placeholder="Access Token"> 
 		<button v-on:click="check()">登录</button>
 	</section>
</template>

<script>
import $ from 'webpack-zepto';
import czHead from './header'
export default {
	data(){
		return {
			accessToken:"",
		}
	},
	methods:{
		check(){
			if(!this.accessToken){
				alert("请输入信息")
			}
			 $.ajax({
                    type: 'POST',
                    url: 'https://cnodejs.org/api/v1/accesstoken',
                    data: {
                        accesstoken: this.accessToken
                    },
                    dataType: 'json',
                    success: (res) => {
                        let user = {
                            loginname: res.loginname,
                            avatar_url: res.avatar_url,
                            userId: res.id,
                            token: this.accessToken
                        };
                    
                        this.$store.commit('setUserInfo', user);
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                        this.$router.push({
                            path: redirect
                        });
                    },
                    error: (res) => {
                        var error = JSON.parse(res.responseText);
                        alert(error.error_msg);
                    }
                });
		}
	},
	components:{
    	czHead
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	section{
		padding:0 10px;
		input[type='text']{
			 -webkit-appearance:none;
			 appearance:none; 
			margin-top:50px;
			padding: 12px 0;
    		border: none;
    		border-bottom: 1px solid #4fc08d;
    		background-color: transparent;
    		width: 100%;
    		font-size: 14px;
    		color: #313131;
		}
		button{
			margin-top:20px;
			width:100%;
			height:40px;
			background-color:#4fc08d;
			border:1px #4fc08d solid;
			color:white;
			font-size:1em;
		}
	}
	
</style>
