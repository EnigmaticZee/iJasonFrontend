import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

function loadLabsComponent (component) {
  return () => System.import(`components/Labs/${component}.vue`)
}

function loadStaffLabsComponent (component) {
  return () => System.import(`components/Staff/${component}.vue`)
}

function loadFeedbackComponent (component) {
  return () => System.import(`components/Feedback/${component}.vue`)
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
    { path: '/', component: load('Login') }, // Default
    { path: '/units', component: load('unitSelection') },
    { path: '/units/:code', component: loadLabsComponent('labsSelectionContainer') },
    { path: '/staff-units', component: load('Staff/staffUnits') },
    { path: '/staff-units/labs', component: loadStaffLabsComponent('labsSelectionContainer') },
    { path: '*', component: load('Error404') },
    { path: '/login', component: load('Login') }
  ]
})
