// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Quasar from 'quasar'
import router from './router'
import auth from './auth'
import nav from './nav'
import 'quasar-extras/fontawesome'

export const eventBus = new Vue();
Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuelidate) // Vue Validation Framework

/*router.beforeEach(function(to,from,next){
	if (!auth.user.authenticated && to.path !== "/login")
	{
		next('/login');
	}
	else
	{
		next();
	}
	
	if (auth.user.authenticated)
	{
		if (to.path == "/login" && auth.userDetails[0].role == "Student" )
		{
				next('/units');
		}
		if (to.path == "/login" && auth.userDetails[0].role == "Staff" )
		{
				next('/staff-units');
		}
		if (!nav.staffUnitClicked && to.path === "/staff-units/labs")
		{
			next('/staff-units');
		}
		if (!nav.studentUnitClicked && to.path === "/units/labs")
		{
			next('/units');
		}
		if (auth.userDetails[0].role == "Student" && (to.path === "/staff-units/labs" || to.path === "/staff-units" ))
		{
			next('/units');
		}
		if (auth.userDetails[0].role == "Staff" && (to.path === "/units/labs" || to.path === "/units" ))
		{
			next('/staff-units');
		}
	}

})
*/

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
