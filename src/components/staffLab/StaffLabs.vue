 <!--==========================================================================
 |       Component: Components/staffLab/StaffLabs.vue
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
 |       Updated: Oct 19, 2017
 *==========================================================================-->

<template>
	<div id="q-app" class="layout-view">
		<!-- Tabs -->
		<q-tabs :refs="$refs" class="justified" default-tab="tab-1">
			<q-tab name="tab-3" icon="add">
				Add Lab
			</q-tab>
			<q-tab name="tab-1" icon="description">
				Tutorial Labs
			</q-tab>
			<q-tab name="tab-2" icon="dns">
				Extra Practice Labs
			</q-tab>
		</q-tabs>
		<div ref="tab-3">
			<div  class="col">

				<div class="row full-width justify-center addLab"><img class="upload_image" @click="openModal(false)" src="../../assets/upload_icon.png" alt=""></div>
				<div class="row full-width justify-center">Please upload a lab for this week!</div>
			</div>
			<div class="text-center">
			</div>
		</div>
		<!-- Targets -->
		<div ref="tab-1">
			<div v-if="tutorialLabs.length === 0" class="col ">
				<div class="row full-width justify-center noLabs"><img src="~assets/file.png"></div>
				<div class="row full-width justify-center">You have not added any tutorial labs for this week...</div>
			</div>
			<div v-else class="list" v-for="t in tutorialLabs">
				<div v-if="t.labType=='Regular'">
					<q-collapsible icon="description" :label="t.labTitle">
						<div class="item" >
							<i class="item-primary">file_download</i>
							<div class="item-content cursor-pointer" v-on:click="downloadLab(t.labID)">
								Download
							</div>
						</div>
						<div class="item" >
							<i class="item-primary">mode_edit</i>
							<div class="item-content cursor-pointer" v-on:click="openModal(true, {labID : t.labID, Name : t.labTitle, Type: t.labType })">
								Edit
							</div>
						</div>
					</q-collapsible>
				</div>
			</div>
		</div>
		<div ref="tab-2">
			<div v-if="practiceLabs.length === 0" class="col ">
				<div class="row full-width justify-center noLabs"><img src="~assets/file.png"></div>
				<div class="row full-width justify-center">You have not added any practice labs for this week...</div>
			</div>
			<div v-else class="list" v-for="t in practiceLabs">
				<div v-if="t.labType=='Practice'">
					<q-collapsible icon="description" :label="t.labTitle">
						<div class="item" >
							<i class="item-primary">file_download</i>
							<div class="item-content cursor-pointer" v-on:click="downloadLab(t.labID)">
								Download
							</div>
						</div>
						<div class="item" >
							<i class="item-primary">mode_edit</i>
							<div class="item-content cursor-pointer" v-on:click="openModal(true, {labID : t.labID, Name : t.labTitle, Type: t.labType })">
								Edit
							</div>
						</div>
					</q-collapsible>
				</div>
			</div>
		</div>
		<q-modal  noEscDismiss  noBackdropDismiss class="staff-modal" ref="staffLabModal" :content-css="{padding: '50px 50px 0 50px', minWidth: '50vw'}">
			<h4>{{ modalTitle }} Lab</h4>
			<input type="text" v-model="Name" class="full-width" placeholder="Name" @input="$v.Name.$touch()"/>
			<p v-if="!$v.Name.required && $v.Name.$dirty" class="text-red">Field is required</p>
			<p v-if="!$v.Name.maxLength" class="text-red">Name can only have {{ $v.Name.$params.maxLength.max }} characters </p>

			<label for="">Lab Type</label>
			<br>
			<br>
			<input type="radio" id="Regular" value="Regular" name="Regular" v-model="checkedType" >
			<label for="Regular">Regular</label>

			<input type="radio" id="Practice" value="Practice" name="Practice" v-model="checkedType">
			<label for="Practice" style="margin-right: 10px">Practice</label>

			<p v-if="!$v.checkedType.required && $v.checkedType.$dirty" class="text-red">Field is required</p>

			<br>
			<input type="hidden" name="MAX_FILE_SIZE" value="30000"/>
			<label for="">Choose lab sheet (.pdf)</label><span v-if="isEdit" class="text-warning"> (optional to edit)</span>
			<input  name="labSheet" class="full-width" type="file" @change="fileAdded($event.target.name, $event.target.files)">

			<label for="">Choose ini file (.ini)</label><span v-if="isEdit" class="text-warning"> (optional to edit)</span>
			<input  name="iniFile" class="full-width" type="file" @change="fileAdded($event.target.name, $event.target.files)">

			<div class="buttons text-right">
				<div class="row float-right">
					<div>
						<button @click="$refs.staffLabModal.close()" class="primary">Close</button>
					</div>
					<div v-if="!isEdit">
						<button @click="submitModal()" class="secondary" :disabled="$v.Name.$invalid || $v.checkedType.$invalid || iniFile == '' || labSheet == '' ">Submit</button>
					</div>
					<div v-if="isEdit">
						<button @click="submitModal()" class="secondary" :disabled="$v.Name.$invalid || $v.checkedType.$invalid">Submit</button>
					</div>
				</div>
			</div>
			<br>
			<p class="text-center">iJason Virtual Lab Supervisor</p>
		</q-modal>
	</div>
</template>

<script>
//Import Libraries
import axios from 'axios'
import {downloadLabCall} from '../../api'
import nav from '../../nav'
import {addLab} from '../../api'
import {editLab} from '../../api'
import { required, maxLength, alpha, alphaNum } from 'vuelidate/lib/validators'
export default {
	//Passed Properties
	props: ['practiceLabs', 'tutorialLabs', 'chosenWeek'],
	data: function(){
		return {
			modalTitle: 'Add',
			isEdit: false,
			labId: null,
			unitCode: '',
			week: '',
			Name: '',
			Type: '',
			checkedType: null,
			iniFile: {},
			labSheet: {},
			options: {
				paramName: 'file'
			},
			unitDetails: nav.unitsDetails
		}
	},
	validations: {
		Name: {
			required,
			maxLength: maxLength(30)
		},
		checkedType: {
			required
		},
		Type: {
			required
		}
	},
	methods: {
		/* ---Open Modal for Add/Edit Lab ---
	       1. Check if the user wants to edit/add lab
	       2. Edit - Fetch the lab details and assign it to the input fields 
	       3. Add - Clear all the input fields
	       4. Finally open the modal */
		openModal (isEditValue, editData = {}) {
			this.isEdit = isEditValue
			if (this.isEdit) {
				console.log("Editing")
				console.log("Lab type is ", editData.Type);
				this.modalTitle = 'Edit'
				this.labId = editData.labID
				this.Name = editData.Name
				this.checkedType = editData.Type
				this.iniFile = ''
				this.labSheet = ''
			} else {
				console.log("Adding");
				this.modalTitle = 'Add'
				this.unitCode = ''
				this.week = ''
				this.Name = ''
				this.Type = ''
				this.iniFile = ''
				this.labSheet = ''
			}
			this.$refs.staffLabModal.open()
		},
		/* ---Submit for Add/Edit Lab ---
	       1. Assign the api url based on whether the staff wants to edit or add lab
	       2. Edit - Create a formadata object based on all the inputs (All the fields are optional to edit)
	       3. Add - Create a formdata object based on all the inputs
	       4. Send a POST request , and passes the form data Object as the parameter */
		submitModal () {
			console.log("Is it edit? ", this.isEdit)
			var unitsURL =  this.isEdit ? editLab() : addLab();
			// If it is edit lab
			if (this.isEdit)
			{
				console.log("Editing a lab");
				//New formdata object - Appending all the user inputs
				var formData = new FormData();
				formData.append('labID', this.labId);
				formData.append('labName', this.Name);
				formData.append('labType', this.checkedType);
				//console.log ("Type of for labsheet", typeof this.labSheet)
				//console.log ("Type of for IniFile", typeof this.iniFile)
				//Appending the labsheet input only if the user wants to upload a new labsheet
				if (typeof this.labSheet != 'string')
				{
					formData.append('labSheet',this.labSheet);
				}
				//Appending the iniFile input only if the user wants to upload a new INI file
				if (typeof this.iniFile != 'string')
				{
					formData.append('INIFile', this.iniFile);
				}
				//Looping through the formdata object -Testing purpose
				for (var pair of formData.entries()) {
					console.log(pair[0]+ ', ' + pair[1]);
				}
			}
			// If it is add lab
			else {
				console.log("Adding a lab");
				//New formdata object - Appending all the user inputs
				var formData = new FormData();
				console.log("Week unit Data UNIT is ",this.unitDetails.unitCode);
				console.log("Week unit Data WEEK is ", this.chosenWeek);
				formData.append('unitCode', this.unitDetails.unitCode);
				formData.append('week', this.chosenWeek);
				formData.append('name', this.Name);
				formData.append('type', this.checkedType);
				formData.append('INIFile', this.iniFile);
				formData.append('labSheet',this.labSheet);

				//Looping through the formdata object -Testing purpose
				for (var pair of formData.entries()) {
					console.log(pair[0]+ ', ' + pair[1]);
				}

			}
			var self = this;
			//POST Request
			axios.post(unitsURL, formData)
			.then(function(response){
				console.log("Response from Editing/Adding lab", response.data);
			})
			.catch(function(error){
				console.log(error);
				console.log(error.description);
			})
			//Clear the iniFile and Labsheet
			this.iniFile = '';
			this.labSheet = '';
			//Close the modal
			self.$refs.staffLabModal.close();
		},
		/* ---Adding User uploads to the labSheet and IniFile properties ---
	       1. Checks the passed fieldname through parameter
	       2. Based on the input (FieldName), adds the first object of the files array to its respective property (labSheet, iniFile)*/
		fileAdded(fieldName, files)
		{
			if(fieldName == 'labSheet')
			{
				console.log("File Length", files.length);
				this.labSheet = files[0];
				files = [];
			}
			else if(fieldName == 'iniFile')
			{
				this.iniFile = files[0];
				files = [];
			}
		},
		  /* Download Lab
	         1. Get the lab id
	         2. Append the lab id to the download lab api
	         2. Open the response on a new window*/
		downloadLab: function (labDownloadId)
		{
			var downloadLabUrl = downloadLabCall();
			console.log(downloadLabUrl+"labID="+ labDownloadId);
			axios.get(downloadLabUrl+"labID="+ labDownloadId)
			.then(function(response) {
				console.log(response.data);
				window.open(downloadLabUrl+"labID="+ labDownloadId, '_blank');
			})
			.catch(function(error) {
				console.log(error);
					//self.$refs.collectWorkStatusModal.open();
				})
		}
	}
}
</script>

<style lang="scss">
// Feedback modal container 
#modal-content {
	height: 45vh;
	overflow-y: auto;
}

// Feedback modal header color
.modal-header {
	color: black;
}
ul {
	list-style: none;
}
#menu {
	z-index: 999;
}
.menu__item {
	position: relative;
	padding-right: 3rem;
}
.menu__link {
	color: red;
	text-transform: uppercase;
}
.menu__link:hover {
	color: gray;
}
.menu__icon {
	margin: 0 !important;
}
.open .dropdown-menu {
	display: block;
}

// Customize dropdown menu
.dropdown-menu {
	font-size: 0.9rem;
	position: absolute;
	min-width: 130px;
	top: 2.2rem;
	display: none;
	box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	z-index: 999;
}
.dropdown-menu__item:first-child .dropdown-menu__link {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
}
.dropdown-menu__item:last-child .dropdown-menu__link {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
}
.dropdown-menu__link {
	display: block;

	padding: 1rem;
	color: blue;
	background-color: #fafafa;
}
.dropdown-menu__link:hover {
	color: green;
	background-color: #ccc;
}
.add {
	background-color: #5cb85c;
	padding: 5px 10px;
}
.add-container {
	margin-top: 10px;
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

// Text: Please upload a lab for this week!
.upload_image {
	cursor: pointer;
	margin-top: 1rem;
	height: 8rem;
}

// Upload add lab icon
.noLabs, .addLab {
	margin: 10% 10% 2% 10%;
}
</style>
