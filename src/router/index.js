import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {name: 'home', path: '/', component: HomeView },
    {name: 'qrcode', path: '/qrcode', component: () => import('@/views/QrcodeView.vue') },
  ]
})

export default router
