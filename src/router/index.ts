import { createWebHistory, createRouter } from 'vue-router'

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
        path: '/album/details',
        component: () => import('@/views/album/details/index.vue')
    },
    {
        path: '/artist',
        component: () => import('@/views/artist/index.vue')
    },
    {
        path: '/playlist',
        component: () => import('@/views/playlist/index.vue')
    },
    {
        path: '/settings',
        component: () => import('@/views/settings/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
