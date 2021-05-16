import Router from 'vue-router'
import Vue from 'vue'


import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'


Vue.use(Router)


export default new Router({
    mode: 'history',
    routes : [
        {
            path: '/', 
            name: 'home',
            component: Home
        },
        {
            path: '/detail/:id',
            name: 'detail', 
            component: Detail
        },
        {
            path: '/register', 
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            
        },
      
    ]
})