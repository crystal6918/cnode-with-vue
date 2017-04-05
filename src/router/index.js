import Vue from 'vue'
import Router from 'vue-router'
import preLoader from '@/components/preLoader'
import all from '@/components/all'
import topic from '@/components/topic'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: preLoader
    },
    {
    	path:'/all',
    	name:'all',
    	component:all
    },
    {
    	path:'/topic/:id',
    	name:'topic',
    	component:topic
    },
    {
    	path:'/login',
    	name:'login',
    	component:login
    }
  ]
})
