import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
import Framework from './views/Framework.vue'
import Login from     './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Mygames from   './views/Mygames.vue'
import Gameshop from  './views/Gameshop.vue'
import Gamepage from  './views/Gamepage.vue'
import Settings from  './views/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'framework',
      component: Framework,
      children: [
        {
          path: '/',
          name: 'login',
          component: Login
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/mygames',
          name: 'mygames',
          component: Mygames
        },
        {
          path: '/gameshop',
          name: 'gameshop',
          component: Gameshop
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings
        },
        {
          path: '/gamepage/:addr',
          name: 'gamepage',
          component: Gamepage
        }
      ]
    }
    // {
    //   path: '/vuehome',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // }
  ]
})
