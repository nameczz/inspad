import Vue from 'vue'
import Router from 'vue-router'
import 'core-js/fn/array/find'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'topicsSearch',
      },
    },
    {
      path: '',
      component: () => import('@/pages/index.vue'),
      children: [
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/pages/tags/index.vue'),
        },
        {
          path: 'subjects',
          name: 'subjects',
          component: () => import('@/pages/subjects/index.vue'),
        },
        {
          path: 'note/:noteId',
          name: 'noteDetail',
          component: () => import('@/pages/noteDetail/index.vue'),
        },
        {
          path: 'topics/new',
          name: 'newTopic',
          component: () => import('@/pages/newTopic/newTopic.vue'),
        },
        {
          path: 'topics/search',
          name: 'topicsSearch',
          component: () => import('@/pages/search/index.vue'),
        },
        {
          path: 'topics/topic/idea/:ideaId',
          name: 'ideaDetail',
          component: () => import('@/pages/ideaDetail/ideaDetail.vue'),
        },
        {
          path: 'subject/:subjectId',
          name: 'subjectDetail',
          component: () => import('@/pages/subjectDetail/index.vue'),
          redirect: 'subject/:subjectId/search',
          children: [
            {
              path: 'search',
              name: 'subjectSearch',
              component: () => import('@/pages/search/index.vue'),
            },
          ]
        }
      ],
    },
  ],
})

if (process.env.NODE_ENV !== 'testing') {
  router.beforeEach((to, from, next) => {
    next()
  })
}

export default router
