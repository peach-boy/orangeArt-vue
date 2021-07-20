// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // student
      {
        path: '/student',
        redirect: '/student/list',
        component: RouteView,
        meta: { title: 'menu.student', icon: 'form' },
        children: [
          {
            path: '/student/list',
            name: 'list',
            component: () => import('@/views/student/list'),
            meta: { title: 'menu.student.list', keepAlive: true }
          },
          {
            path: '/student/create',
            name: 'create',
            component: () => import('@/views/student/create'),
            meta: { title: 'menu.student.create', keepAlive: true }
          }
        ]
      },
      // class
      {
        path: '/class',
        redirect: '/class/list',
        component: RouteView,
        meta: { title: 'menu.class', icon: 'form' },
        children: [
          {
            path: '/class/list',
            name: 'classList',
            component: () => import('@/views/class/list'),
            meta: { title: 'menu.class.list', keepAlive: true }
          },
          {
            path: '/class/create',
            name: 'createClass',
            component: () => import('@/views/class/create'),
            meta: { title: 'menu.class.create', keepAlive: true }
          }
        ]
      },
      // lesson
      {
        path: '/lesson',
        redirect: '/lesson/list',
        component: RouteView,
        meta: { title: 'menu.lesson', icon: 'form' },
        children: [
          {
            path: '/lesson/list',
            name: 'lessonList',
            component: () => import('@/views/lesson/list'),
            meta: { title: 'menu.lesson.list', keepAlive: true }
          },
          {
            path: '/lesson/create',
            name: 'createLesson',
            component: () => import('@/views/lesson/create'),
            meta: { title: 'menu.lesson.create', keepAlive: true }
          }
        ]
      },
      // courseOrder
      {
        path: '/courseOrder',
        redirect: '/courseOrder/list',
        component: RouteView,
        meta: { title: 'menu.courseOrder', icon: 'form' },
        children: [
          {
            path: '/courseOrder/list',
            name: 'courseOrderList',
            component: () => import('@/views/courseOrder/list'),
            meta: { title: 'menu.courseOrder.list', keepAlive: true }
          },
          {
            path: '/courseOrder/create',
            name: 'createCourseOrder',
            component: () => import('@/views/courseOrder/create'),
            meta: { title: 'menu.courseOrder.create', keepAlive: true }
          }
        ]
      },
      // courseware
      {
        path: '/courseware',
        redirect: '/courseware/list',
        component: RouteView,
        meta: { title: 'menu.courseware', icon: 'form' },
        children: [
          {
            path: '/courseware/list',
            name: 'coursewareList',
            component: () => import('@/views/courseware/list'),
            meta: { title: 'menu.courseware.list', keepAlive: true }
          },
          {
            path: '/courseware/create',
            name: 'createCourseware',
            component: () => import('@/views/courseware/create'),
            meta: { title: 'menu.courseware.create', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
