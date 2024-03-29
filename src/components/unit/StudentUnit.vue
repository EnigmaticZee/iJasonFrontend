 <!--==========================================================================
 |       Component: Components/unit/StudentUnit.vue
 |
 |=Authors=====================================================================
 |
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |
 |=History=====================================================================
 |
 |       Created: Oct 13, 2017
 |       Updated: Oct 17, 2017
 *==========================================================================-->

<template>
	<q-layout id="particles-background" class="background">
		<div slot="header" class="toolbar">
			<q-toolbar-title :padding="1">
				<div>
					<img src="~assets/ijason-logo.png">
					<span class="mobile-hide">iJason Virtual Lab Supervisor</span>
				</div>
				<div class="row">
					<div>
						<i class="fa fa-user" aria-hidden="true" ></i> {{userDetails.name}}
					</div>
					<div>
						<span>&nbsp&nbsp|&nbsp&nbsp</span>
					</div>
					<div @click="performSignOut" class="primary cursor-pointer">
						<i class="fa fa-sign-in"></i>   Sign Out
					</div>
				</div>
			</q-toolbar-title>
		</div>

		<div class="layout-view col">
			<br><br><br><br>
			<div class="units-selection-welcome-message col">
				<h1 class="text-primary">iJason Virtual Lab Supervisor</h1>
				<p class="text-primary">Welcome back, {{userDetails.name}} </p>
			</div>
			<br><br><br>
			<div class="units-container col"  v-if="units.length === 0" >
				<div class="units-selection-welcome-message ">
					<div class="col">
						<img  class="primary" src="../../assets/university.png" alt="">
					</div>
					<div class="units-selection-welcome-message col">
						<br><br>
						<div class="row text-warning">You don't seem to be enrolled in any subjects</div>
						<div class="row text-primary">Contact your convenor to enrol you in a subject</div>
					</div>
				</div>
			</div>

			<div class="units-container col" v-else >
				<div class="units-heading  bg-secondary">
					Units You Study
				</div>
				<div class="units-list" v-for="unit in units">
					<button @click="() => handleUnitClick(unit.unitCode, unit.unitTitle)" v-if="unit.active == 1" class="primary single-unit">
						<div class="row">
							<img src="../../assets/units-icon.png" alt="">
						</div>
						<div class="single-unit-description col">
							<br><br>
							<div class="row">{{ unit.unitTitle}}</div>
							<div class="row">{{ unit.unitCode}}</div>
							<div class="row">Sem 0{{semester}} | {{year}}</div>
						</div>
					</button>
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
//Import Libraries
import axios from 'axios';
import {unitsCall} from '../../api';
import auth from '../../auth';
import nav from '../../nav';
import moment from 'moment';
import { mountParticles }  from '../../lib/particle-background.js';
export default {
	data () {
		return {
			units: [],
			semester : null ,
			year: null,
		}
	},
	computed: {
		userDetails () {
			return auth.userDetails[0] || {
				name: 'Guest'
			}
		}
	},
	mounted () {
		mountParticles('particles-background');
	},
	methods: {
		/* ---Perform Signout---
               1. Call the logout function inside auth */
		performSignOut () {
			auth.logout(this);

		},
		/* ---Navigate to labs page of student---
               1. Call the unit to lab funtion in nav */
		handleUnitClick (unit, title) {
			console.log(unit);
			nav.unitToLab(this, unit, title);
		},
		/* ---Download units ---
           1. Construct a request object
       	   2. Send a POST request , and passes the Object as the parameter
           3. Populate the local units array based on the response */
		downloadUnits() {

			var unitsURL = unitsCall();
			var reqBody=this.constructUnitsReqBody();
			var self = this;
			 //POST Request
			axios.post(unitsURL, reqBody)
			.then(function(response){
				console.log(response.data);
				//Populate units array
				self.units=response.data;
				console.log(self.units[0].unitTitle);
				console.log(self.units[0].unitCode);
			})
			.catch(function(error){
				console.log(error);
			})
		},
		/* ---Construct Unit Request ---
               1. Construct a request Object 
               2. The Object should contain the username, semester and year
               3. Returns the constructed object */
		constructUnitsReqBody (){
			var requestBody={
				username: auth.credentials.username,
				semester:this.semester,
				year:this.year
			};

			console.log(requestBody);
			return requestBody;
		}
	},
	/*  1. Get the current month and year.
		2. Set the studentUnitClicked to false in nav
		3. Set the year and month properties to current year and month
		4. Download the units 
		5. Then display the units page to the student */
	beforeMount () {
		console.log("Student Unit Clicked" ,nav.studentUnitClicked);
		nav.studentUnitClicked = false;
		nav.staffUnitClicked = false;
		//Get the year and month from moment wrapper
		this.year = moment().year();
		var month = moment().month();
		
		if (month > 1 && month < 7)
		{
			this.semester = 1;
		}
		else if (month >= 7 && month < 12)
		{
			this.semester = 2;
		}
		console.log("Year is ", this.year);
		console.log("Semester ", this.semester);
		console.log("Nav Object" , nav);
		//download units
		this.downloadUnits();
	}
}

</script>

<style lang="scss">
// Logo
.logo-container {
	width:3px;
	perspective: 800px;
	margin: top;
	margin-top: -260px;
}
.logo {
	img {
		max-width: 100%;
	}
}
// Used for text
.units-selection-welcome-message {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 23px;
		font-weight:bolder;

		p {
			color: #ccc;
		}
	}
}

// Container to display units
.units-container {
	img  {
		width: 100px;
		height: 100px;
	}

	// Title: Units You Study 
	.units-heading {
		text-align: center;
		width: 400px;
		margin: auto;
		font-size: 25px;
		border-bottom: none;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		color: #fff;
		padding: 10px 0;
	}

	// Container - for loop, for items
	.units-list {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	// For loop - single unit
	.single-unit {
		display: flex;
		justify-content: left;
		width: 400px;
		border: 1px solid #ccc;
		border-top: none;
		&:not(:last-child) {
			border-bottom: none;
			margin-bottom: 2px;
		}
		h2 {
			margin-top: 0;
			margin-bottom: 0;
			font-size: 20px;
		}
		p {
			font-size: 16px;
			color: #ccc;
		}

		// Info about unit, title, unit code, semester
		.single-unit-description {
			padding-top: 10px;
		}
		.no-unit {
			width: 100%;
		}
	}
}

// Navigation
.toolbar-content {
	// Navigation - logo
	img {
		max-width: 150%;
		width: 66.66665px;
		height: 50px;
		margin-right: 5px;
	}
	
	.toolbar-title {
		> div {
			display: flex;
			align-items: center;
			justify-content: space-between;

			// Navigation - logo and project title parrent div
			> div:first-child {
				display: flex;
				align-items: center;
			}
		}
	}
}

// Background for whole page
.background {
	// background-image: url("../assets/background2.jpg");
	opacity: 20px;
	background-size: cover;
	background-repeat: no-repeat;
	> div {
		z-index: 10;
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}
}
</style>
