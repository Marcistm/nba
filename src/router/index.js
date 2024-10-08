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
        path: '/register',
        component: () => import('@/views/login/Register'),
        hidden: true //导航菜单忽略选项
    },
  {
    path: '/resetPass',
    component: () => import('@/views/login/resetPass'),
    hidden: true //导航菜单忽略选项
  },
    {
        path: '',
        component: Layout,
        hidden: true,
    },
    {
        path: '/game',
        component: Layout,
        name:'game',
        children: [
            {
                path: '',
                component: () => import('@/views/Game'),
                name: 'index',
                meta: { title: 'Game', icon: 'el-icon-edit-outline', }
            }]
    },

    {
        path: '/player',
        component: Layout, //应用布局页
        name: 'player',
        children: [
            {
                path: '',
                component: () => import('@/views/Player'),
                name: 'index',
                meta: {
                    title: "Player",
                    icon: 'el-icon-edit',
                }
            }
        ]
    },

    {
        path: '/data',
        component: Layout,
        name:'data',
        meta: { title: 'Data', icon: 'el-icon-edit-outline', },
        children: [
            {
                path: 'radar/player',
                component: () => import('@/views/data/PlayerRadar'),
                name: 'Report',
                meta: { title: 'Player Radar', icon: 'el-icon-edit-outline', }
            },
            {
                path: 'radar/team',
                component: () => import('@/views/data/TeamRadar'),
                name: 'Report',
                meta: { title: 'Team Radar', icon: 'el-icon-edit-outline', }
            },
            {
                path: 'top',
                component: () => import('@/views/data/TOP'),
                name: 'Report',
                meta: { title: 'Top', icon: 'el-icon-edit-outline', }
            }
            ]
    },
]

// 动态路由
export const asyncRoutes = [
    {
        path: '/evaluate',
        component: Layout,
        redirect: '/evaluate',
        children: [
            {
                path: '',
                component: () => import('@/views/Evaluate'),
                name: 'Report',
                meta: { title: 'Evaluate', icon: 'el-icon-edit-outline', }
            }]
    },
    {
        path: '/community',
        component: Layout,
        redirect: '/community',
        children: [
            {
                path: '',
                component: () => import('@/views/Community'),
                name: 'Report',
                meta: { title: 'Community', icon: 'el-icon-edit-outline', }
            }]
    },
    {
        path: '/rank',
        component: Layout,
        redirect: '/rank',
        children: [
            {
                path: '',
                component: () => import('@/views/Rank'),
                name: 'Report',
                meta: { title: 'Rank', icon: 'el-icon-edit-outline', }
            }]
    },


    {
        path: '/user',
        component: Layout,
        redirect: '/user',
        children: [
            {
                path: '',
                component: () => import('@/views/User'),
                name: 'Report',
                meta: { title: 'User', icon: 'el-icon-edit-outline',roles:['admin'] }
            }]
    },
    {
        path: '/report',
        component: Layout,
        redirect: '/report',
        children: [
            {
                path: '',
                component: () => import('@/views/Report'),
                name: 'Report',
                meta: { title: 'Report', icon: 'el-icon-edit-outline' }
            }]
    },





]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

