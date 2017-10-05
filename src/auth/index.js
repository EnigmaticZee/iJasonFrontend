import {router} from '../router'
import axios from 'axios'


const LOGIN_URL = '/api/auth.php'

export default {

  // User object will let us check authentication status
  credentials: {
    username: "",
    password: ""
  },

  user: {
  	authenticated: false
  },

  userDetails: {},


  login: function(context, credentials){
  	
  	  var self = this;

  	  axios.post(LOGIN_URL, credentials)
                .then(function(response){
                	if(response.data[0].result === "Success")
                	{
                		self.credentials.username = credentials.username;
                    self.credentials.password = credentials.password;
                		self.userDetails = response.data;
                		console.log(self.userDetails);
                    console.log(self.credentials.role)
                		self.user.authenticated = true;
                		console.log("Authenticated!");
                    console.log(self.userDetails[0].role);
                		console.log(self.user.authenticated);

                    if (self.userDetails[0].role === "Student")
                    {
                      context.$router.push('units');
                    }
                    else if (self.userDetails[0].role === "Staff")
                    {
                      context.$router.push('staff-units');
                    }
                		
                	}

                  if(response.data[0].result === "Fail")
                  {
                    context.error = "Login failed: Invalid id or password!";
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
    this.credentials = {};
  	console.log(this.userDetails);
  	context.$router.push('login');
  }
}