 <!--==========================================================================
 |       Component: App.vue
 |
 |=Authors=====================================================================
 |
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |
 |=History=====================================================================
 |
 |       Created: Aug 10, 2017
 |       Updated: Oct 14, 2017
 *==========================================================================-->

<template>
	<!-- Don't drop "q-app" class -->
	<div id="q-app">
		<router-view></router-view>
	</div>
</template>

<script>
/*
 * Root component
 */
 export default {}
 </script>

 <style lang="scss">
 .mobile-hide {
 	@media(max-width: 772px) {
 		display: none;
 	}
 }
 </style>