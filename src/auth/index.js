import {router} from '../router'
import axios from 'axios'


const LOGIN_URL = '/api/auth.php'

export default {

  // User object will let us check authentication status
  credentials: {
    username: "",
    password:"Asd258456"
  },

  user: {
  	authenticated: false
  },

  userDetails: {},


  login: function(context, credentials, units){
  	
  	  var self = this;

  	  axios.post(LOGIN_URL, credentials)
                .then(function(response){
                	if(response.data[0].result === "Success")
                	{
                		self.credentials.username = credentials.username;
                		self.userDetails = response.data;
                		console.log(self.userDetails);
                		self.user.authenticated = true;
                		console.log("Authenticated!");
                		console.log(self.user.authenticated);
                		context.$router.push(units);
                	}
                })
                .catch(function(error){
                  console.log(error);
                })
  },

  logout: function(context)
  {
  	this.user.authenticated = false;
  	this.userDetails = [];
  	console.log(this.userDetails);
  	context.$router.push('login');
  }
}