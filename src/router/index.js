import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
    if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
    return originalPush.call(this, location).catch((e)=>{})
}
// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
      path: '/login',
      component: () => import('@/views/login/Login'),
      hidden: true //导航菜单忽略选项
  },
  {
    path: '/resetPass',
    component: () => import('@/views/login/resetPass'),
    hidden: true //导航菜单忽略选项
  },
  {
      path: '',
      component: Layout, //应用布局页
      redirect: '/index',
      hidden: true,
  },

  {
      path: '/index',
      component: Layout, //应用布局页
      name: 'index',
      meta:{
          title: "index", //导航菜单项标题
          icon: 'el-icon-edit' //导航菜单图标
      },
      children: [
        {
          path: '',
          component: () => import('@/views/index/index.vue'),
          name: 'indexs',
          meta: {
            title: "index",
            icon: 'el-icon-edit',
            roles: ['admin']
          }
        }
      ]
  },
]

// 动态路由
export const asyncRoutes = [
    {
        path: '/print',
        component: () => import('@/views/tooling/Print'),
        hidden:true,
        meta: {
            roles:['admin']
        }
    },
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan',
      children: [
          {
              path: '',
              component: () => import('@/views/tooling/Plan'),
              name: 'Plan',
              meta: { title: 'Game', icon: 'el-icon-s-order', roles: ['admin'] }
          }]
  },
    {
        path: '/game',
        component: Layout,
        redirect: '/game',
        children: [
            {
                path: '',
                component: () => import('@/views/tooling/Report'),
                name: 'Report',
                meta: { title: 'Game', icon: 'el-icon-edit-outline', roles: ['worker','admin'] }
            }]
    },





]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

