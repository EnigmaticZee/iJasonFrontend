 <!--==========================================================================
 |       Component: Components/studentLab/StudentLabWorkCollection.vue
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
    <div class="layout-view">
    <!-- Select Room (Radio Button) -->
        <div class="bg-primary justify-center full-width row feedbackTitleStyle" >Feedback for {{labName}}</div>


        <div class="room">
            <div class="row">
                <span class="sublabel bg-secondary text-white full-width">Select Room</span>
            </div>
            <div class="row justify-center rooms">
                <div class="row">
                    <label class="item">
                        <div class="item-primary">
                            <q-radio v-model="room" val="atc 328" @input="downloadDevices()"></q-radio>
                        </div>
                        <div class="item-content">
                            ATC 328
                        </div>
                    </label>
                    <label class="item">
                        <div class="item-primary">
                            <q-radio v-model="room" val="atc 329" @input="downloadDevices()"></q-radio>
                        </div>
                        <div class="item-content">
                            ATC 329
                        </div>
                    </label>
                    <label class="item">
                        <div class="item-primary">
                            <q-radio v-model="room" val="atc 330" @input="downloadDevices()"></q-radio>
                        </div>
                        <div class="item-content">
                            ATC 330
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <!-- Show Required Device in INI File -->
        <div  class="room" v-if="bookedDevices.length != 0">
            <div class="row">
                <span class="sublabel bg-secondary text-white full-width">Choose Configured Lab Devices</span>
            </div>

            <div class="list booking" v-for="(iniDevice,index) in iniDevices">
                <div class="item" :device="iniDevice.deviceType" >
                Configured Lab {{iniDevice.deviceType}} : {{iniDevice.deviceName}}
                    <div v-if="iniDevice.deviceType == 'Switch'" >
                        <q-select
                        :label="'Booked ' + iniDevice.deviceType"
                        v-model="select[index]"
                        :options="populateSelectOptionSwitch">
                        </q-select>
                    </div>
                    <div v-if="iniDevice.deviceType == 'Router'" >
                        <q-select
                        :label="'Booked ' + iniDevice.deviceType"
                        v-model="select[index]"
                        :options="populateSelectOptionRouter">
                        </q-select>
                    </div>
                </div>
                </br></br>
            </div>
        </div>

        <!-- Collect and Cancel Device Button -->
        <div class="row room">
            <div class="auto flex justify-center">
                <button  class="warning full-width" @click="cancelCollectWork()">
                    Cancel
                </button>
            </div>

            <div class="auto flex justify-center">
                <button
                class="primary full-width"
                @click="collectWork();"
                :disabled="bookedDevices.length == 0">
                    Collect Work
                </button>
            </div>
        </div>

        <!-- Modal -->
        <q-modal @open="timer()" noEscDismiss  noBackdropDismiss ref="collectWorkStatusModal">
            <div class="row">
                <span v-if="work_collection_status_response.result === 'Success'" class="label bg-primary text-white full-width justify-center">{{work_collection_status_response.details}}</span>
                <span v-else class="label bg-primary text-white full-width justify-center">{{work_collection_response.details}}</span>
            </div>
            <div v-if="progressBarStatus.active == 'yes'">
                <q-progress :percentage="progressBarStatus.percentage"class="animate stripe"
                style="height: 25px"
                />
            </div>
            <div class="col">
                <div v-if="work_collection_status_response.result === 'Success'">
                    <div class="row full-width justify-center">
                        <div class="row statusButton  justify-center"> <img src="~assets/success.png"></div>
                        <div class="col statusButton full-width ">
                            <div class="row statusButton full-width ">You are all set to get your feedback!</div>
                        </div>
                    </div>
                </div>

                <div v-if="work_collection_status_response.result === 'Pending'">
                    <div class="row full-width justify-center">
                        <div class="row statusButton  justify-center"> <img src="~assets/warning.png"></div>
                        <div class="col statusButton full-width ">
                            <div class="row statusButton full-width ">{{work_collection_status_response.details}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="work_collection_status_response.result === 'Fail'">
                    <div class="row full-width justify-center">
                        <div class="col statusButton  justify-center"> <img src="~assets/error.png"></div>
                        <div class="col statusButton full-width ">
                            <div class="col statusButton full-width ">{{work_collection_status_response.details}}!
                                <ul class="row">
                                    <li v-for="device in work_collection_status_response.devices">
                                        Device: {{device}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <button  class="warning full-width " @click="cancelCollectWork()">
                Cancel
                </button>
                <button class="primary full-width" @click="getFeedback" v-if="work_collection_status_response.result === 'Success'">
                Get Feedback
                </button>
            </div>
        </q-modal>
    </div>
</template>

<script>
    //Import Libraries
    import axios from 'axios';
    import {iniCall, bookedDevicesCall, collectCall, collectStatusCall, feedbackCall} from '../../api';
    import user from '../../auth';
    import { Dialog } from 'quasar';

    export default {
        //Passed Properties
        props:['labID','labName'],
        data: function() {
            return {
                room: null,
                select: [null],
                timerInterval: null,
                progressBarStatus: {seconds: 0, percentage: 0, active:'yes'},
                bookedDevices: [],
                iniDevices: [],
                feedbacks:{},
                work_collection_status_response: {},
                work_collection_response: {},
                mappingStatus: 1
            }
        },

        /* ---Populate Select Option Switch---
           1. After downloading the booked devices from the API Call
           Populate the switches to a local array of select options [Dropdown]
           if the type is Switch*/
        computed: {
            populateSelectOptionSwitch: function() {
                var bookedDev = [];
                for (var i = 0 ; i < this.bookedDevices.length ; i++) {
                    if (this.bookedDevices[i].deviceType === 'Switch') {
                        bookedDev.push({label: this.bookedDevices[i].deviceName, value: i, type:this.bookedDevices[i].deviceType});
                    }
                }
                console.log('Booked Switches Array', bookedDev);
                return bookedDev;
            },
            /* ---Populate Select Option Router---
               1. After downloading the booked devices from the API Call
               Populate the switches to a local array of select options [Dropdown]
               if the type is Router*/
            populateSelectOptionRouter: function()
            {
                var bookedDev = [];
                for (var i = 0 ; i < this.bookedDevices.length ; i++) {
                    if (this.bookedDevices[i].deviceType === 'Router') {
                        bookedDev.push({label: this.bookedDevices[i].deviceName, value: i, type:this.bookedDevices[i].deviceType});
                    }
                }
                console.log('Booked Router Array', bookedDev);
                return bookedDev;
            }
        },
        methods: {
              /* ---Construct Collect Request---
                1. Prepare the object for Mapping,
                2. Mapping Process
                    a) Clear the mappedDevices array
                    b) Go through the select options, and compare it to the ini devices.
                    c) If the select option is not empty, map the smartrack device into
                    the required ini file devices.
                    d) However, if it's empty, nickname is set to empty string
                3. Return the object, containing
                    a) Credentials
                    b) LabID,
                    c) Room Number
                    d) Mapped Objects*/
            constructCollectRequest: function() {
                var mappedDevices = [];
                console.log("Select has", this.select);
                for (var i = 0; i < this.iniDevices.length; i++) {
                    var device = this.iniDevices[i];
                    var devicemapping = {};
                    devicemapping.iniFileDevice = device.deviceName;
                    devicemapping.deviceType = device.deviceType;
                    if ( this.select[i] != null) {
                        devicemapping.smartRackDeviceName = this.bookedDevices[this.select[i]].deviceName;
                        devicemapping.smartRackDeviceNickName = this.bookedDevices[this.select[i]].deviceNickName;
                    }
                    else {
                        devicemapping.smartRackDeviceName = "";
                        devicemapping.smartRackDeviceNickName = "";
                    }
                    mappedDevices.push(devicemapping);
              }
              console.log('Mapped Devices', mappedDevices);
              var cred = user.credentials;
              var requestBody = {
                  credentials: cred,
                  labID:this.labID,
                  roomNo:this.room,
                  deviceMapping:mappedDevices
                };
              return requestBody;
            },

            /* ---Download Devices---
              1. Make a POST Request for downloading INI Devices
              according to the labID
              2. Make another POST Request for downloading
              booked devices on SmartRack, according the room Number
              and credentials
              3. If there is no booked devices, a dialog would appear*/

            downloadDevices: function() {
                var iniURL = iniCall();
                var bookedDevicesURL = bookedDevicesCall();
                var self = this;

                //POST Request for getting INI Device List
                axios.post(iniURL, {labID: this.labID})
                .then(function(response) {
                    console.log("INI Devices", response.data);
                    self.iniDevices = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                })
                //POST Request for getting Booked Device List via Smartrack

                axios.post(bookedDevicesURL,
                {
                  username: user.credentials.username,
                  password: user.credentials.password,
                  roomNo: this.room
                })
                .then(function(response) {
                    console.log('Booked SmartRack Devices', response.data);
                    self.bookedDevices = response.data;

                    //If There is no Booked Devices , show a Dialog
                    if (self.bookedDevices.length == 0) {
                        Dialog.create({
                            title: 'No Bookings Found!',
                            message: 'No bookings found in room ' + self.room + ' for your credentials',
                            buttons: [
                                'Cancel'
                            ]
                        })
                    }
                })
                .catch(function(error)  {
                    console.log(error);
                })
            },

            /* ---Collect Work---
              1. Make an Object via constructRequestCall
              2. Loop through the object, and check if the devices is mapped properly
              3. If Object is not properly mapped, then show a Dialog
              4. If Object is properly mapped then construct a POST Request , and begin
              the collection */
            collectWork: function() {
                var reqBody = this.constructCollectRequest();
                var collectURL = collectCall();
                var self = this;
                this.mappingStatus = 1;

                for(var i = 0; i < reqBody.deviceMapping.length; i++) {
                    if(reqBody.deviceMapping[i].smartRackDeviceName == "") {
                        console.log("mapping status" , this.mappingStatus)
                        this.mappingStatus = 0;
                    }
                }
                if (this.mappingStatus == 0) {
                    Dialog.create({
                        title: 'Choose configured Lab Devices',
                        message: 'Please choose your configured lab devices before collecting work',
                        buttons: [
                          'Cancel'
                        ]})
                    }
                else {
                    axios.post(collectURL, reqBody)
                    .then(function(response) {
                        console.log(response.data);
                        self.work_collection_response = response.data;

                        if (self.work_collection_response.result === 'Failure') {
                            console.log("Collection Failure");
                            return;
                        }
                        else {
                            console.log("Collection success");
                            self.$refs.collectWorkStatusModal.open();
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                }
            },
            /* ---Timer---
            1. Interval functions (get called repeatedly) for updating
            progress bar during collection*/
            timer: function() {
                var seconds = this.work_collection_response.duration;
                setTimeout(this.checkStatus, seconds*1000);
                this.timerInterval = setInterval(this.updateProgressBar,100);
            },
            /* ---Update Progress Bar---
            1. Check the condition, if it met either Success, Pending , or Fail
            it will clear the timer, and set the progress bar status to non-active
            2. If it's still going, add the percentage based on the duration */
            updateProgressBar: function () {
                if (this.progressBarStatus.percentage >= 100 || this.progressBarStatus.seconds >= this.work_collection_response.duration ||
                    this.work_collection_status_response.result == "Success" || this.work_collection_status_response.result == "Fail") {
                        if (this.work_collection_status_response.result != "Pending") {
                            this.progressBarStatus.active = 'no';
                            clearInterval(this.timerInterval);
                        }
                    }
                    else {
                        console.log("Timer Going");
                        this.progressBarStatus.active = 'yes';
                        this.progressBarStatus.seconds+= 0.1;
                        this.progressBarStatus.percentage = ((this.progressBarStatus.seconds) / this.work_collection_response.duration) * 100
                    }
                },
            /* ---Check Status---
            1. Check the Status of the collection, via POST request */
            checkStatus: function() {
                console.log("Checking Status");
                var checkStatusURL = collectStatusCall();
                var self = this;
                var reqBody = {collectID:this.work_collection_response.collectID,username:user.credentials.username};

                //POST Request
                axios.post(checkStatusURL, reqBody)
                .then(function(response) {
                    console.log(response.data);
                    self.work_collection_status_response=response.data;
                    if(self.work_collection_status_response.result == "Pending") {
                        setTimeout(self.checkStatus, 3000);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            /* ---Cancel Collect Work---
            1. Cancel the collection Process
            and notify the parent component that the state is
            changed back to STATE_SHOW_LAB */
            cancelCollectWork: function() {
                this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
            },

            /* ---Get Feedback---
            1. Make a POST Request, and notify the parent component
            that the state is changed back to STATE_SHOW_FEEDBACK */
            getFeedback: function() {
                var feedbackURL = feedbackCall();
                var self = this;
                axios.post(feedbackURL, {labID: self.labID, username: user.credentials.username})
                .then(function(response)
                {
                    console.log('Feedback:', response.data);
                    self.feedbacks = response.data;

                    //State change will occur after the feedbacks is collected, since if we emit outside the callback,
                    //the feedbacks may not be collected yet , but we already changed the state.
                    self.$emit('feedbacksWereCollected' , self.feedbacks);
                    self.$emit('stateWasChanged', 'STATE_SHOW_FEEDBACK');
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        }
    }
</script>

<style>
    .label {
        font-size: 2em;
    }
    .sublabel {
        font-size: 1.5em;
        padding-left: 1em;
    }

    /* Add space bellow text: Select Room */
    .rooms {
        padding:2em;
    }

    /* Dialog buttons */
    .buttons {
        padding: 2em 0em 2em 0em;
    }

    /* Collect and Cancel Device Button */
    .room {
      padding: 2em;
    }

    /* Foor loop - add specing above */
    .booking {
      padding: 2em;
    }

    /* Added padding around button image */
    .statusButton{
      padding: 1em;
    }

    /* Title: Feedback for {{labName}} */
    .feedbackTitleStyle {
    color: white;
    font-size: 1.4em;
    padding: 0.5em;
  }
</style>
