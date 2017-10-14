import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
	return () => System.import(`components/${component}.vue`)
}

function loadStudentComponents (component) {
	return () => System.import(`components/studentLab/${component}.vue`)
}

function loadStaffComponents (component) {
	return () => System.import(`components/staffLab/${component}.vue`)
}

function loadUnitComponents (component) {
	return () => System.import(`components/unit/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

   routes: [
	//Loading the login component
	{ path: '/', component: load('Login') }, // Default
	{ path: '/login', component: load('Login') },

	//Loading the units components for student and staff
	{ path: '/units', component: loadUnitComponents('StudentUnit') },
	{ path: '/staff-units', component: loadUnitComponents('StaffUnit') },

	//Loading the lab components for student and staff
	{ path: '/units/labs', component: loadStudentComponents('StudentLabContainer') },
	{ path: '/staff-units/labs', component: loadStaffComponents('StaffLabContainer') },

	{ path: '*', component: load('Error404') }
	]
})
