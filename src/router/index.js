import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/login'     //路由重定向
    },{
      path: '/singleLogin',
      name: 'singleLogin',
      component: resolve => require(['@/components/singleSignOn'],resolve),
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
    },{
      path: '/menuAll',
      name: 'menuAll',
      component: resolve => require(['@/components/menuAll'],resolve),
    },{
      path: '/errorPage',
      name: 'errorPage',
      component: resolve => require(['@/components/errorPage'],resolve),
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
    {
      path: '/qjMain',
      name: 'qjMain',
      redirect:'/qjMain/qjTodoList',
      component: resolve => require(['@/components/leave/qjMain'],resolve),
      children:[
        {
          path: 'qjTop',
          name: 'qjTop',
          component: resolve => require(['@/components/leave/top'],resolve)
        },{
          path: 'myApplyFor',
          name: 'myApplyFor',
          component: resolve => require(['@/components/leave/myApplyFor'],resolve)
        },{
          path: 'qjTodoList',
          name: 'qjTodoList',
          component: resolve => require(['@/components/leave/listPageS'],resolve)
        },{
          path: 'qjHavedoList',
          name: 'qjHavedoList',
          component: resolve => require(['@/components/leave/listPageF'],resolve)
        },{
          path: 'qjDetails',
          name: 'qjDetails',
          component: resolve => require(['@/components/leave/detailed'],resolve)
        },{
          path: 'applyFor',
          name: 'applyFor',
          component: resolve => require(['@/components/leave/addLeave'],resolve)
        }
      ]
    }
  ]
})

//添加路由过滤
router.beforeEach((to, from, next) => {
  if (to.meta.Authorize) {
    // 判断该路由是否需要登录权限
    if (window.localStorage.Token) {
      // 通过vuex state获取当前的token是否存在
      let uRole = Number(window.localStorage.userRole);
      if (uRole <= to.meta.userRole) {
        next();
      } else {
        next({
          path: "/menuAll",
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      window.localStorage.setItem("Token", "");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
