 /*==========================================================================
 |       Component: main.js
 |
 |=Authors===================================================================
 |
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |
 |=History===================================================================
 |
 |       Created: Aug 10, 2017
 |       Updated: Oct 17, 2017
 *=========================================================================*/

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

router.beforeResolve(function(to,from,next){
	//If the user is not authenticated and tries to access any page of iJason - they are redirected to login
	if (to.path === "/contributors")
	{
		next();
	}else if (!auth.user.authenticated && to.path !== "/login")
	{
		next('/login');
	}
	//If user is authenticated, they are taken to the page they have entered (Provided the below routing checks are satisfied)
	else 
	{
		next();
	}
	//if the user is authenticated 
	if (auth.user.authenticated)
	{	
		//if the user types in login while being authenticated as a student, redirect them to student units page
		if (to.path == "/login" && auth.userDetails[0].role == "Student" )
		{
			next('/units');
		}
		//if the user types in login while being authenticated as a staff, redirect them to staff units page
		if (to.path == "/login" && auth.userDetails[0].role == "Staff" )
		{
			next('/staff-units');
		}
		//if the staff has not clicked a unit and types in the labs page, redirect them to staff units page
		if (!nav.staffUnitClicked && to.path === "/staff-units/labs")
		{
			next('/staff-units');
		}
		//if the student has not clicked a unit and types in the labs page, redirect them to student units page
		if (!nav.studentUnitClicked && to.path === "/units/labs")
		{
			next('/units');
		}
		//If the user is authenticated as a student and tries to access the staff side, redirect them to student units page
		if (auth.userDetails[0].role == "Student" && (to.path === "/staff-units/labs" || to.path === "/staff-units" ))
		{
			next('/units');
		}
		//If the user is authenticated as a staff and tries to access the student side, redirect them to staff units page
		if (auth.userDetails[0].role == "Staff" && (to.path === "/units/labs" || to.path === "/units" ))
		{
			next('/staff-units');
		}
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
