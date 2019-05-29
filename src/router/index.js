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
      redirect:'/login'     //路由重定向
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },{
      path: '/menuAll',
      name: 'menuAll',
      component: resolve => require(['@/components/menuAll'],resolve),
    },
    {
      path: '/tzMain',
      name: 'tzMain',
      redirect:'/tzMain/tznoticeListS',
      component: resolve => require(['@/components/notice/tzMain'],resolve),
      children:[
        {
          path: 'tzTop',
          name: 'tzTop',
          component: resolve => require(['@/components/notice/top'],resolve)
        },{
          path: 'tznoticeListS',
          name: 'tznoticeListS',
          component: resolve => require(['@/components/notice/listPageS'],resolve)
        },{
          path: 'tznoticeListF',
          name: 'tznoticeListF',
          component: resolve => require(['@/components/notice/listPageF'],resolve)
        },{
          path: 'tzdetailed',
          name: 'tzdetailed',
          component: resolve => require(['@/components/notice/detailed'],resolve)
        }
      ]
    },
    {
      path: '/noticeList',
      name: 'noticeList',
      component: resolve => require(['@/components/notice/listPage'],resolve),
    },{
      path: '/detailed',
      name: 'detailed',
      component: resolve => require(['@/components/notice/detailed'],resolve)
    },{
      path: '/gwMain',
      name: 'gwMain',
      redirect:'/gwMain/gwnoticeListS',
      component: resolve => require(['@/components/document/gwMain'],resolve),
      children:[
        {
          path: 'gwTop',
          name: 'gwTop',
          component: resolve => require(['@/components/document/top'],resolve)
        },{
          path: 'gwnoticeListS',
          name: 'gwnoticeListS',
          component: resolve => require(['@/components/document/listPageS'],resolve)
        },{
          path: 'gwnoticeListF',
          name: 'gwnoticeListF',
          component: resolve => require(['@/components/document/listPageF'],resolve)
        },{
          path: 'gwdetailed',
          name: 'gwdetailed',
          component: resolve => require(['@/components/document/detailed'],resolve)
        },{
          path: 'gwaddnew',
          name: 'gwaddnew',
          component: resolve => require(['@/components/document/addnew'],resolve)
        }
      ]
    },
    // {
    //   path: '/gwnoticeList',
    //   name: 'gwnoticeList',
    //   component: resolve => require(['@/components/document/listPage'],resolve),
    // },{
    //   path: '/gwdetailed',
    //   name: 'gwdetailed',
    //   component: resolve => require(['@/components/document/detailed'],resolve)
    // },{
    //   path: '/gwaddnew',
    //   name: 'gwaddnew',
    //   component: resolve => require(['@/components/document/addnew'],resolve)
    // },
    {
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
