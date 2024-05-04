import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../store/auth'
import Home from '../views/Home.vue'

const authGuard = (to, from, next) => {
    const { getAuthData } = useAuth()
    if (to.name !== 'Login' && to.name !== 'Register' && !getAuthData) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // nested admin routes
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue')
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('../views/BlogDetail.vue')
    },
    {
        path: '/resume',
        name: 'Resume',
        component: () => import('../views/Resume.vue')
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Gallery.vue')
    },
    {
        path: '/gallery/:id',
        name: 'GalleryDetail',
        component: () => import('../views/GalleryDetail.vue')
    },
    {
        path: '/project',
        name: 'Project',
        component: () => import('../views/Project.vue')
    },
    {
        path: '/project/:id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetail.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(authGuard)

export default router