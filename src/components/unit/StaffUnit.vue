 <!--==========================================================================
 |       Component: Components/unit/StaffUnit.vue
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
 |       Updated: Oct 20, 2017
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
			<div class="units-container col">
				<div class="units-heading bg-secondary">
					<span>Units You Teach</span>
					<span @click="openModal(false)" class="pull-right add"><i class="material-icons">&#xE145;</i> Add  </span>
				</div>
				<div class="units-list">
					<span v-for="unit in units" :key="unit.unitCode" class="units-list__item single-unit">
						<div class="row">
							<img src="../../assets/units-icon.png" alt="">
						</div>
						<div @click="() => handleUnitClick(unit.unitCode, unit.unitTitle)" class="single-unit-description full-width col">
							<br>
							<div class="row">{{ unit.unitTitle }}</div>
							<div class="row">{{ unit.unitCode}}</div>
							<div v-if="unit.active == 0" class="row text-warning">Inactive Unit</div>
						</div>
						<div class="single-unit-edit" @click="openModal(true, { unitId: unit.unitID, unitTitle: unit.unitTitle, unitCode: unit.unitCode , unitActive: unit.active})">
							<i class="material-icons">&#xE254;</i> Edit
						</div>
					</span>
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

		<q-modal  noEscDismiss  noBackdropDismiss class="staff-modal" ref="staffUnitModal" :content-css="{padding: '50px 50px 0 50px', minWidth: '50vw'}">
			<h4>{{ modalTitle }} Unit</h4>
			<input type="text" v-model="codeInput" class="full-width" @input="$v.codeInput.$touch()" placeholder="Code"/>
			<p v-if="!$v.codeInput.required && $v.codeInput.$dirty" class="text-red">Field is required</p>
			<p v-if="!$v.codeInput.maxLength" class="text-red">Code can only have {{ $v.codeInput.$params.maxLength.max }} characters </p>
			<p v-if="!$v.codeInput.alphaNum" class="text-red">Field can only contain letters or number</p>

			<input type="text" v-model="nameInput" class="full-width" placeholder="Name" @input="$v.nameInput.$touch()"/>
			<p v-if="!$v.nameInput.required && $v.nameInput.$dirty" class="text-red">Field is required</p>
			<p v-if="!$v.nameInput.maxLength" class="text-red">Name can only have {{ $v.nameInput.$params.maxLength.max }} characters </p>
			<span v-if="isEdit">
			<input type="checkbox" id="checkbox" v-model="unitActiveInput">
			<label for="checkbox">Active</label>
			</span>
			<div class="buttons text-right">
				<button @click="$refs.staffUnitModal.close()" class="primary">Close</button>
				<button @click="submitModal()" class="secondary" :disabled="$v.codeInput.$invalid || $v.nameInput.$invalid">Submit</button>
			</div>
			
			<br>
			<p class="text-center">iJason Virtual Lab Supervisor</p>
		</q-modal>
	</q-layout>
</template>

<script>
//Import Libraries
import axios from 'axios';
import {unitsCall, addUnit, editUnit } from '../../api';
import auth from '../../auth';
import nav from '../../nav';
import { QInput } from 'quasar';
import {Loading} from 'quasar';
import { mountParticles }  from '../../lib/particle-background.js';
import { required, maxLength, alpha, alphaNum } from 'vuelidate/lib/validators';
export default {
	data () {
		return {
			modalTitle: 'Add',
			isEdit: false,
			unitId: null,
			codeInput: '',
			nameInput: '',
			unitActiveInput: false,
			units: [ ]
		}
	},
	components: {
		'q-input': QInput
	},
	validations: {
		codeInput: {
			required,
			maxLength: maxLength(8),
			alphaNum
		},
		nameInput: {
			required,
			maxLength: maxLength(45)
		}
	},
	computed: {
		userDetails () {
			return auth.userDetails[0] || {
				name: 'Guest'
			}
		}
	},
	mounted() {
		mountParticles('particles-background');
	},
	methods: {
		/* ---Perform Signout---
               1. Call the logout function inside auth */
		performSignOut () {
			auth.logout(this);

		},
		/* ---Open Modal for Add/Edit Unit ---
	       1. Check if the user wants to edit/add Unit
	       2. Edit - Fetch the unit details and assign it to the input fields 
	       3. Add - Clear all the input fields
	       4. Finally open the modal */
		openModal (isEditValue, editData = {}) {
			this.isEdit = isEditValue
			if (this.isEdit) {
				console.log("Edit data is ", editData);
				this.unitId = editData.unitId
				this.nameInput = editData.unitTitle
				this.codeInput = editData.unitCode
				if(editData.unitActive == 0 )
				{
					this.unitActiveInput = false;
				}
				else {
					this.unitActiveInput = true;
				}
				this.modalTitle = 'Edit'
			} else {
				this.nameInput = ''
				this.codeInput = ''
				this.modalTitle = 'Add'
			}
			
			this.$refs.staffUnitModal.open()
		},
		/* ---Submit for Add/Edit Unit ---
	       1. Assign the api url based on whether the staff wants to edit or add unit
	       2. STILL IN PROGRESS */
	      
		submitModal () {
			var unitsURL =  this.isEdit ? editUnit() : addUnit();
			console.log("Units URL" , unitsURL);
			var active;
			if(this.unitActiveInput == false)
			{
				active = 0;
			}
			else 
			{
				active = 1;
			}
			if(this.isEdit)
			{
				var reqBody= {
				unitID: this.unitId,
				unitCode: this.codeInput,
				unitName: this.nameInput,
				unitActive: active
				}

				console.log("Edit unit data is ", reqBody);
				var self = this;

				axios.put(unitsURL, reqBody)
				.then(function(response){
					console.log(response.data);
					self.downloadUnits();
				})
				.catch(function(error){
					console.log(error);
				})

			}
			else {

				var reqBody= {
				unitCode: this.codeInput,
				unitName: this.nameInput
				}
				var self = this;

				axios.post(unitsURL, reqBody)
				.then(function(response){
					console.log(response.data);
					self.downloadUnits();
				})
				.catch(function(error){
					console.log(error);
				})

			}
			
			self.$refs.staffUnitModal.close()
		},
		/* ---Navigate to labs page of STAFF---
               1. Call the staff unit to lab funtion in nav */
		handleUnitClick (unit, title) {
			console.log(unit);
			nav.staffUnitToLab(this, unit, title);
		},
		/* ---Download units ---
       	   1. Send a GET request
           2. Populate the local units array based on the response */
		downloadUnits() {

			var unitsURL = unitsCall();
			var self = this;

			axios.get(unitsURL)
			.then(function(response){
				console.log(response.data);
				self.units=response.data;
				console.log(self.units[0].unitTitle);
				console.log(self.units[0].unitCode);
				console.log(self.units[0].active);
			})
			.catch(function(error){
				console.log(error);
			})
		}
	},
	/*  1. Set the studentUnitClicked to false in naV
		2. Download the units 
		3. Then display the units page to the student */
	beforeMount () {
		console.log("Staff Unit Clicked" ,nav.staffUnitClicked);
		nav.studentUnitClicked = false;
		nav.staffUnitClicked = false;
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

	// Title: Units You Teach
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
		z-index: -1;
		.add {
			background-color: transparent;
			cursor: pointer;
			font-size: 20px;
			margin-right: 10px;
			z-index: 1;
		}
	}

	// Container - for loop, for items
	.units-list {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		&__item {
			cursor: pointer;
			padding: 0.3rem 1rem;
			background: #027be3;
			color: #fff;
		}
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
		.single-unit-edit {
			cursor: pointer;
			width: 25%;
			text-align: right;
			padding-top: 40px;
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
.background {
	// background-image: url("../../assets/background2.jpg");
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

// Add/Edit lab modal 
.staff-modal {

	// Space between input fields
	input {
		margin-bottom: 20px;
	}

	// Close and submit buttons
	.buttons {
		margin-top: 20px;

		.secondary {
			background-color: #5cb85c;
		}
	}
}

</style>
