import { createWebHistory, createRouter, Router } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/album',
        component: () => import('@/views/album/index.vue')
    },
    {
        path: '/artist',
        component: () => import('@/views/artist/index.vue')
    },
    {
        path: '/songList',
        component: () => import('@/views/songList/index.vue')
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
