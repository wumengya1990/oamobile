import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

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
    }
  ]
})
