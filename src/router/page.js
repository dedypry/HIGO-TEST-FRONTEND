export default [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/form/index.vue'),
        meta: {
          authOnly: true,
        },
      },
      {
        path: 'form/create',
        component: () => import('../views/form/create.vue'),
        meta: {
          authOnly: true,
        },
      },
      {
        path: 'form/edit/:id',
        component: () => import('../views/form/edit.vue'),
        meta: {
          authOnly: true,
        },
      },
      {
        path: 'form/detail/:id',
        component: () => import('../views/form/detail.vue'),
        meta: {
          authOnly: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
        meta: {
          guestOnly: true,
        },
      },
      {
        path: 'survey/:id',
        name: 'survey',
        component: () => import('../views/survey/index.vue'),
      },
      {
        path: 'survey',
        name: 'survey-finish',
        component: () => import('../views/survey/finish.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/error/[...all].vue'),
      },
    ],
  },
]
