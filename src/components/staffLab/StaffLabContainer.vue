<template>
	<q-layout>
		<div slot="header" class="toolbar">
			<button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
				<i>menu</i>
			</button>
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
		<q-tabs slot="navigation">
			<div>
				<ul class="breadcrumb">
					<li  @click="goToUnitPage">
						<a>
							<i>home</i> Units
						</a>
					</li>
					<li>
						<a >
							<i>mail</i> Labs - {{unitDetails.unitCode}}
						</a>
					</li>
				</ul>
			</div>
		</q-tabs>
		<div class="justify-center full-width row unitTitleStyle" slot="navigation">{{unitDetails.unitCode}} - {{unitDetails.unitName}}</div>
		<q-drawer ref="leftDrawer">
			<div class="toolbar light">
				<q-toolbar-title :padding="1">
					Semester Week
				</q-toolbar-title>
			</div>
			<div class="list no-border platform-delimiter">
				<button class="primary big  outline full-width" icon="view_week" v-for="week in weeks" @click="loadWeeklyTask(week)">
					<i class="on-left">view_week</i>  Week {{ week }}
				</button>
			</div>
		</q-drawer>

		<router-view class="layout-view"></router-view>

		<q-drawer right-side swipe-only ref="rightDrawer">
			<div class="toolbar light">
				<q-toolbar-title :padding="1">Right-side Drawer</q-toolbar-title>
			</div>
		</q-drawer>
		<labs v-if="currentState=='STATE_SHOW_LAB'" :chosenWeek="chosenWeek" :practiceLabs="practiceLabs" :tutorialLabs="tutorialLabs"
		@stateWasChanged="currentState = $event" @chosenlabID="selectedLabID = $event" @chosenlabTitle="selectedLabName = $event">
		</labs>
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
import StaffLabs from './StaffLabs.vue';
import axios from 'axios';
import {labsCall} from '../../api';
import auth from '../../auth';
import nav from '../../nav';
export default {
	data() {
		return {
				//Constant
				LAB_API_URL : '',
				feedbacks:{},
				currentState: 'STATE_SHOW_LAB',
				weeks : 12,
				selectedLabID: 1,
				selectedLabName: null,
				userCredentials:{username:'student', password: 'password'},
				selectedTasks: [],
				practiceLabs: [],
				tutorialLabs: [],
				unitDetails: nav.unitsDetails,
				chosenWeek : 1
			}
			},
			computed: {
				userDetails () {
					return auth.userDetails[0] || {
						name: 'Guest'
					}
				}
			},

			methods: {
				/* ---Perform Signout---
               1. Call the logout function inside auth */
				performSignOut: function () {
					auth.logout(this);
				},

				/* ---Load Weekly Task ---
               1. Construct an request Object based on the chosen week
               2. Send a POST request , and passes the Object as the parameter
               3. Populate the local array based on the result (tasks) type
                    a. If the Task is a regular, push it to the regular task array
                    b. If the task is a practice, push it to the practice array
               4. Finally changes the currentState to the STATE_SHOW_LAB */
				loadWeeklyTask : function(aWeek) {
					var labsURL = labsCall();
					//Construct the request
					var reqBody=this.constructLabRequest(aWeek);
					var self = this;
					this.chosenWeek = aWeek;
					 //POST Request
					axios.post(labsURL, reqBody)
					.then(function(response){
						console.log(response.data);
						//Clear the Labs
						self.tutorialLabs = [];
						self.practiceLabs = [];
						/*Loop through the response, and assign the
                    	tutorialLabs / practiceLabs array based on the type*/
						for (var i = 0; i<response.data.length; i++)
						{
							if (response.data[i].labType =='Regular')
							{
								self.tutorialLabs.push(response.data[i]);
							}
							else if (response.data[i].labType =="Practice")
							{
								self.practiceLabs.push(response.data[i]);
							}
						}
						console.log("Tutorial Labs", self.tutorialLabs);
						console.log("Practice Labs", self.practiceLabs);
					})
					.catch(function(error){
						console.log(error);
					})
					//Change the currenState to STATE_SHOW_LAB
					this.currentState = 'STATE_SHOW_LAB'
				},
				/* ---Construct Lab Request ---
               1. Construct a request Object based on the chosen week
               2. The Object should contain the unitCode and the week
               3. Returns the constructed object */
				constructLabRequest : function(aWeek)
				{
					var requestBody={
						unitCode: nav.unitsDetails.unitCode,
						weekNo: aWeek
					};
					console.log(requestBody);
					return requestBody;
				},
				/* ---Navigate to Unit page of Staff---
               1. Call the to staff unit function in nav */
				goToUnitPage: function()
				{
					nav.toStaffUnit(this);
				},
			},
			//Component List
			components: {
				'labs':StaffLabs
			},
			//Load the weekly tasks for week 1 before showing the labs container to the user.
			beforeMount () {
				this.loadWeeklyTask(1);
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

	// Title
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
		.single-unit-description {
			padding-top: 10px;
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

// Title: Semester Week
.unitTitleStyle {
	color: white;
	font-size: 1.4em;
	padding-bottom: 1.5em;
}
</style>
