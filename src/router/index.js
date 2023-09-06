import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/store/auth'
import page from './page'

const router = createRouter({
  history: createWebHistory(),
  routes: page,
})

function haveToken () {
  const auth = useAuthUserStore()

  return !!(auth.token)
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly) && !haveToken()) {
    next({
      path: "login",
    })
  } else if (to.matched.some(record => record.meta.guestOnly) && haveToken()) {
    next({
      path: 'dashboard',
    })
  } else {
    next()
  }
})

export default router
