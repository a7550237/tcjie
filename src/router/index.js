import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views//home/Home')
const Category = () => import('../views/category/Category')
const News = () => import('../views/cart/News')
const Profile = () => import('../views/profile/Profile')
const ArticleDetail = () => import('../views/home/ArticleDetail')
// 1.安装vue-router
Vue.use(VueRouter)
// 2.定义变量

const routes = [
  {
    path:'/',
    redirect: '/home',
    meta:{
      keepAlive:true,
      scrollTop: 0
    }
  },
  {
    path:'/home',
    component: Home,
    meta:{
      keepAlive:true,
      scrollTop: 0
    }
    
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/news',
    component: News
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/toArticleDetail',
    component: ArticleDetail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
// 3导出
export default router
