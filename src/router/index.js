import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import children from '@/components/children'
import { resolve } from 'upath';

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/noticeList'     //路由重定向
    },{
      path: '/noticeList',
      name: 'noticeList',
      component: resolve => require(['@/components/notice/listPage'],resolve),
    },{
      path: '/detailed',
      name: 'detailed',
      component: resolve => require(['@/components/notice/detailed'],resolve)
    },{
      path: '/die',
      name: 'die',
      alias: ['/baba','/baba1'],
      component: resolve => require(['@/components/father'],resolve)
    },{
      path: '/erzi/:id',
      name: 'erzi',
      component: children ,
      meta:{
        login:true
      },
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
