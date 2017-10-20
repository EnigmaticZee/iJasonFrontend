//Import Libraries
import {router} from '../router'
import axios from 'axios'

//Constant Declaration
const LOGIN_URL = '/api/auth.php'

export default {
	// User object will let us check authentication status
	credentials: { username: "", password: "" },
	user: { authenticated: false },
	userDetails: {},
	/* ---Login---
	   1. If the user is succesfully connected,
	   the user.authenticated status would be set to true
	   else it would be set to false
	   2. After succesfully connected , assign the User Details,
	role and authentication status to the properties. */
	login: function(context, credentials) {
		console.log("Inside Login function");
		var self = this;
		 //POST Request
		 axios.post(LOGIN_URL, credentials)
		 .then(function(response) {
		 	console.log("Response is", response.data[0].result);
			if(response.data[0].result === "Success"){
				//Updating the credentials
				self.credentials.username = credentials.username;
				self.credentials.password = credentials.password;

				//Get the response and set it to the user details
				self.userDetails = response.data;

				//Set the User authentication status
				self.user.authenticated = true;

				console.log('User Details:', self.userDetails);
				console.log('User Authentication Status:', self.user.authenticated);
				console.log('User Role:', self.userDetails[0].role);

				//Route the user to the specific page depending on the role
				if (self.userDetails[0].role === "Student")
					context.$router.push('units');
				else if (self.userDetails[0].role === "Staff")
					context.$router.push('staff-units');
			}
			else if(response.data[0].result === "Fail")
				context.error = "Login failed: Invalid id or password!";
		})
		 .catch(function(error) {
			console.log(error);
		 })
		},

  /* ---Logout---
  1. Clear the credentials, and change the authentication status. */
  logout: function(context) {
	this.user.authenticated = false;
	this.userDetails = [];
	this.credentials = {};

	console.log(this.userDetails);

	  //Route the user back to the login screen
	  context.$router.push('/login');
	}
}
