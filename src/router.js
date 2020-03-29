import Vue from 'vue'
import Router from 'vue-router'
import IntroPage from './views/IntroPage.vue'
import LoginPage from './views/Login.vue'
import RegisterPage from './views/Register.vue'
import EditPage from './views/Edit.vue'
import HomePage from './views/Home.vue'
import InitMatchPage from './views/InitMatch.vue'
import GeneratePinPage from './views/GeneratePin.vue'
import ViewRequestPage from './views/ViewRequest.vue'

Vue.use(Router)

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }

      // bypass #1number check
      if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
        console.log(position)
        return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false
    }

    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        console.log("scroll to top")
        position.x = 0
        position.y = 0
      }else if(to.matched.some(m => m.meta.scrollToBundle)){
        console.log("scroll to bundle")
        position.selector = "#bundle-view"
      }

      // wait for the out transition to complete (if necessary)
      this.app.$root.$once('triggerScroll', () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        resolve(position)
      })
    })
  }
}

export const router = new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    {
      path: '/intro',
      name: 'intro',
      component: IntroPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/edit', component: EditPage, meta: {scrollToTop: true} },
    { path: '/initMatch', component: InitMatchPage},
    { path: '/generatePin', component: GeneratePinPage},
    { path: '/viewRequest', component: ViewRequestPage},
    { path: '*', redirect: '/intro' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register','/intro'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})