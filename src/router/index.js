import Vue from 'vue'
import VueRouter from 'vue-router'
/* import Home from '../views/home'
import About from '../views/about'
import User from '../views/user' */
const Home = () => import('../views/home');
const About = () => import('../views/about');
const User = () => import('../views/user');
// 1.安装vue-router
Vue.use(VueRouter)
// 2.定义变量
const router = new VueRouter({
  routes: [
    {
      path:"",
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path:'/user/:aaa',
      component:User
    }
  ],
  mode: 'history'
})
// 3导出
export default router
