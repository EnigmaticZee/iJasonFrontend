<!--==========================================================================
 |       Component: components/Login.vue
 |
 |=Authors=====================================================================
 |
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |
 |=History=====================================================================
 |
 |       Created: Aug 16, 2017
 |       Updated: Oct 23, 2017
 *==========================================================================-->
<template>
   <div class="container">
      <!-- Banner logo (iJason) -->
      <div>
         <img v-bind:src="img" class="responsive">
      </div>
      <!-- Form Input -->
      <div class="children">
         <form>
            <div class="floating-label">
               <input type="text" inverted="true" required class="full-width" v-model.trim="credentials.username" @input="$v.credentials.username.$touch()"/>
               <label>Username</label>
               <p v-if="!$v.credentials.username.required && $v.credentials.username.$dirty" class="text-red">Field is required</p>
            </div>
            <br><br>
            <div class="floating-label">
               <input type="password" class="full-width" required v-model="credentials.password" @input="$v.credentials.password.$touch()" />
               <label>Password</label>
               <p v-if="!$v.credentials.password.required && $v.credentials.password.$dirty" class="text-red">Field is required</p>
            </div>
            <p >
               <span class="text-red"> {{error}}</span>
            </p>
            <br>
            <p>
               <button class="primary full-width" @click="login()"> <i class="fa fa-sign-in" aria-hidden="true"></i>&nbspSign In</button>
            </p>
         </form>
      </div>
      <!--Footer Starts Here-->
      <footer class="footer-basic-centered">
         <a href="https://swin.edu.au"><img class="footer-company-motto" src="https://i.imgur.com/OddOZE8.png"></a>
         <p class="footer-links">
            <a @click="gotoContributors">Contributors</a>
         </p>
      </footer>
      <!--Footer Ends Here-->
   </div>
</template>

<script>
	//Import Libraries
	import auth from '../auth';
	import { required } from 'vuelidate/lib/validators';
	//Needed nav for contributors redirection
	import nav from '../nav';
	export default {
		data: function() {
			return {
				img: require('../assets/logo1.jpg'),
				credentials: {
					username: '',
					password: ''
				},
				error: ''
			};
		},
		validations: {
			credentials: {
				username: {
					required
				},
				password: {
					required
				}
			}
		},
		methods: {
			login: function() {
					auth.login(this, this.credentials)
				
			},
			//Implemented for Contributors Page
			gotoContributors(){
				nav.toContributors(this);
			}
		}
	}
</script>

<style scoped>
/* Used to align items in continer, horizontal - center */
.container{
	display: flex;
	flex-direction: column;
	height:100vh;
	justify-content: flex-start;
	align-items: center;
}
 /* Form width, used to centering form */
.children{
	width:300px;
}
.border{
	border: 5px solid red;
}
 /* Footer css, used to style and center */
.footer-basic-centered{
	background-color: #292c2f;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	font: normal 18px sans-serif;

	padding: 45px;
	margin-top: 80px;
}

.footer-basic-centered .footer-company-motto{
	color:  #8d9093;
	font-size: 24px;
	margin: 0;
	text-align: center;
}

.footer-basic-centered .footer-company-name{
	color:  #8f9296;
	font-size: 14px;
	margin: 0;
	text-align: center;
}

.footer-basic-centered .footer-links{
	list-style: none;
	font-weight: bold;
	color:  #ffffff;
	padding: 35px 0 23px;
	margin: 0;
	text-align: center;
}

.footer-basic-centered .footer-links a{
	display:inline-block;
	text-decoration: none;
	color: inherit;
	text-align: center;
}
/* If you don't want the footer to be responsive, remove these media queries */
@media (max-width: 600px) {

	.footer-basic-centered{
		padding: 35px;
	}

	.footer-basic-centered .footer-company-motto{
		font-size: 18px;
	}

	.footer-basic-centered .footer-company-name{
		font-size: 12px;
	}

	.footer-basic-centered .footer-links{
		font-size: 14px;
		padding: 25px 0 20px;
	}

	.footer-basic-centered .footer-links a{
		line-height: 1.8;
	}
}
</style>
