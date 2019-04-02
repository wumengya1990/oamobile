import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import father from '@/components/father'
import children from '@/components/children'
import { resolve } from 'upath';
// import sunzi from '@/components/sunzi'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/die'
    },{
      path: '/die',
      name: 'die',
      component: father
    },{
      path: '/erzi/:id',
      name: 'erzi',
      component: children ,
      children:[
        {
          path:'sunzi',
          name:'sunzi',
          component: resolve => require(['@/components/sunzi'],resolve)
        }
      ]
    }
  ]
})
