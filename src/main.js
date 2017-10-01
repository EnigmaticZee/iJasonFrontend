// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import auth from './auth'
import nav from './nav'


export const eventBus = new Vue();
Vue.use(Quasar) // Install Quasar Framework

router.beforeEach(function(to,from,next){
	if (!auth.user.authenticated && to.path !== "/login")
	{
		next('/login');
	}
	else
	{
		next();
	}

	if (!nav.unitClicked && from.path === "/units" && to.path === "/units/labs")
	{
		next('/units');
	}

})


Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
