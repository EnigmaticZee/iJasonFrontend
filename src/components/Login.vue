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
	</div>
</template>

<script>
	//Import Libraries
	import auth from '../auth'
	import { required } from 'vuelidate/lib/validators'
	export default {
		data: function() {
			return {
				img: require('../assets/logo.jpg'),
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
				
			}
		}
	}
</script>

<style scoped>
.container{
	display: flex;
	flex-direction: column;
	height:100vh;
	justify-content: flex-start;
	align-items: center;
}
.children{
	width:300px;
}
.border{
	border: 5px solid red;
}

</style>
