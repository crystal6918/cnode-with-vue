import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		userInfo:{}
	},
	mutations:{
		 setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
	},
	getters:{
		getUserInfo(){
			return state.userInfo;
		},
		setUserInfo(state,userInfo){
			state.userInfo = userInfo;
		}
	}
})
