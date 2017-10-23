 <!--==========================================================================
 |       Component: Components/Error404.vue
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
 |       Updated: Oct 16, 2017
 *==========================================================================-->

<template>
<q-layout>
	<div class="error-page window-height window-width bg-light column items-center">
		<div class="error-code bg-primary flex items-center justify-center">
			404
		</div>
		<div>
			<div class="error-card card bg-white column items-center justify-center">
				<i class="text-grey-5">error_outline</i>
				<p class="caption text-center">Oops. Nothing here...</p>
				<p class="text-center group">
					<button v-if="canGoBack" class="grey push small" @click="goBack">
						<i class="on-left">keyboard_arrow_left</i>
						Go back
					</button>
					
						<router-link to="/units">
							<button  class="grey push small">
								Units
								<i class="on-right">home</i>
							</button>
						</router-link>
				</p>
			</div>
		</div>
	</div>
	 <div slot="footer" class="toolbar">
            <div class="auto flex justify-center within-iframe-hide">
            iJason - Virtual Labs for Networking Students
            </div>
            <q-toolbar-title :padding="0" class="within-iframe-only">
            Footer
            </q-toolbar-title>
    </div>
    </q-layout>
</template>

<script>
import auth from '../auth'
export default {
	data () {
		return {
			canGoBack: window.history.length > 1
		}
	},
	methods: {
		goBack () {
			window.history.go(-1)
		}
	}
}
</script>

<style lang="stylus">
// Customize error message
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 15vh
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem
</style>
