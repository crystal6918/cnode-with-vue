import Vue from 'vue'
import Router from 'vue-router'
import preLoader from '@/components/preLoader'
import all from '@/components/all'
/*import topic from '@/components/topic'
import about from '@/components/about'*/

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
    /*{
    	path:'/topic/:id',
    	name:'topic',
    	component:topic
    },
    {
    	path:'/about',
    	name:'about',
    	component:about
    }*/
  ]
})
