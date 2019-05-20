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
      redirect:'/menuAll'     //路由重定向
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },{
      path: '/menuAll',
      name: 'menuAll',
      component: resolve => require(['@/components/menuAll'],resolve),
    },{
      path: '/noticeList',
      name: 'noticeList',
      component: resolve => require(['@/components/notice/listPage'],resolve),
    },{
      path: '/detailed',
      name: 'detailed',
      component: resolve => require(['@/components/notice/detailed'],resolve)
    },{
      path: '/gwnoticeList',
      name: 'gwnoticeList',
      component: resolve => require(['@/components/document/listPage'],resolve),
    },{
      path: '/gwdetailed',
      name: 'gwdetailed',
      component: resolve => require(['@/components/document/detailed'],resolve)
    },{
      path: '/gwaddnew',
      name: 'gwaddnew',
      component: resolve => require(['@/components/document/addnew'],resolve)
    },{
      path: '/leaveList',
      name: 'leaveList',
      component: resolve => require(['@/components/leave/listPage'],resolve),
    },{
      path: '/leaveDetailed',
      name: 'leaveDetailed',
      component: resolve => require(['@/components/leave/detailed'],resolve),
    },{
      path: '/addLeave',
      name: 'addLeave',
      component: resolve => require(['@/components/leave/addLeave'],resolve)
    }
  ]
})
