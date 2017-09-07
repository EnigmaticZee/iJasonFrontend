<template>
  <div class="layout-view">
    <!-- Select Room (Radio Button) -->
    <div class="row">
      <span class="label bg-primary text-white full-width justify-center">Collection Process</span>
    </div>

    <div class="row">
      <span class="sublabel bg-primary text-white full-width">Select Room</span>
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

    <!-- Show Required Device in INI File -->
    <div class="row">
      <span class="sublabel bg-primary text-white full-width">Map Configured Devices to Lab</span>
    </div>
    <div class="col justify-center">
      <div  v-if="iniDevices != null" class="list" v-for="(iniDevice,index) in iniDevices">
        <q-collapsible
          icon="description"
          :label="'Lab Device ' +  iniDevice.deviceType + ' : ' + iniDevice.deviceName">

          <div  class="item">
            <div class="item-content">
              <q-select
                class="full-width"
                type="radio" v-model="select[index]"
                :options="populateSelectOption"></q-select>
            </div>
          </div>
        </q-collapsible>
      </div>
    </div>


    <!-- Collect and Cancel Device Button -->
    <div class="buttons">
      <div class="col justify-center">
        <button  class="warning full-width" @click="cancelCollectWork()">
          Cancel
        </button>
      </div>

      <div class="col justify-center">
        <button
          class="primary full-width"
          @click="collectWork()"
        :disabled="room==null">

          Collect Work
        </button>
      </div>

<!--   -->

      <div class="col justify-center" v-if="work_collection_response.result && work_collection_status_response.result === 'Success'">
        <button
          class="secondary full-width"

          @click="getFeedback">
          Get Feedback
        </button>
      </div>
    </div>

    <!-- Feedback container -->


      <!-- Modal -->
    <q-modal @open="timer()"class="noBackdropDismiss" ref="collectWorkStatusModal">

        <div class="row">
            <span class="label bg-primary text-white full-width justify-center">Collecting Work</span>
        </div>

      <q-progress
        style="height: 25px"
        class="indeterminate stripe" >
        </q-progress>

      <div>
        <button
          @click="getFeedback"
          v-if="work_collection_status_response.result === 'Success'"
          class="primary">
          Get Feedback
        </button>

        <div v-if="work_collection_status_response.result === 'Fail'">
         <div>
              <h4>Some tasks failed during collection...</h4>
          <ul>
            <li v-for="device in work_collection_status_response.devices">
              {{device}}
            </li>
          </ul>
        </div>


          <!-- You could close the modal here like that:-->
          <!-- @click="$refs.collectWorkStatusModal.close()" -->
          <button class="primary">
            OK
          </button>
        </div>
      </div>
    </q-modal>
  </div>

</template>

<script>
import user from '../../auth';
import axios from 'axios'
import {iniCall} from '../../api'
import {bookedDevicesCall} from '../../api'
import {collectCall, collectStatusCall} from '../../api'
import {feedbackCall} from '../../api'

export default{
  props:['labID'],

  data: function() {
    return {
      room: null,
      select: [],
      bookedDevices: [],
      iniDevices: [],
        feedbacks:{},
        work_collection_status_response: {},

      work_collection_response: {}
    }
  },

  computed: {
    populateSelectOption() {
      var bookedDev=[];

      for (var i = 0 ; i < this.bookedDevices.length ; i++) {
        bookedDev.push({label: this.bookedDevices[i].deviceName, value: i});
      }

      return bookedDev;
    }
  },

  methods: {
    dummy() {
      alert('dummy');
    },

    showBookedDevice() {
      //API Call
      //Pass in Booked Room (this.option)
      return [
        {deviceType: 'Router', deviceName: 'Enclosure Black Router 1 ', deviceNickName: 'My Router 1'},
        {deviceType: 'Router', deviceName: 'Enclosure Black Router 2', deviceNickName: 'My Router 2'},
        {deviceType: 'Switch', deviceName: 'Enclosure Black Switch 1', deviceNickName: 'My Switch 1'}  ]
    },

    showINIDevices() {
      //API Call
      return [
        {deviceType: 'Router', deviceName: 'R1'},
        {deviceType: 'Router', deviceName: 'R2'},
        {deviceType: 'Switch', deviceName: 'S1'} ]
    },
    constructCollectRequest() {
      console.log(this._data);
      var mappedDevices=[];

      for (var i = 0; i < this.iniDevices.length; i++) {
        var device=this.iniDevices[i];
        var devicemapping={};

        devicemapping.iniFileDevice=device.deviceName;
        devicemapping.deviceType=device.deviceType;

        // console.log("bookeddevices",this.bookedDevices);
        // console.log("selectoptions",this.selectOptions[i].value);
        console.log(this.select[i]);

        if ((typeof this.select[i]) !== 'undefined') {
          devicemapping.smartRackDeviceName=this.bookedDevices[this.select[i]].deviceName;
          devicemapping.smartRackDeviceNickName=this.bookedDevices[this.select[i]].deviceNickName;
        } else {
          devicemapping.smartRackDeviceName="";
          devicemapping.smartRackDeviceNickName="";

        }

        mappedDevices.push(devicemapping);
      }

      console.log(mappedDevices);

      var cred=user.credentials;

      var requestBody={
        credentials: cred,
        labID:this.labID,
        roomNo:this.room,
        deviceMapping:mappedDevices
      };

      console.log(requestBody);

      return requestBody;

      //                for (var i = 0; i < iniDevices.length; i++)
      //                {
      //                     var mappedDevice = {iniFileDevice: iniFileDevices[i].deviceName, deviceType: iniFileDevices[i].deviceType,
      //                                         smartRackDeviceName: bookedDevices[i].deviceName, smartRackDeviceNickName: bookedDevice.deviceNickName };
      //                }
      //                deviceMapping.splice(index, 1, mappedDevice);
    },

    downloadDevices() {
      var iniURL = iniCall();
      var bookedDevicesURL = bookedDevicesCall();
      var self = this;

      axios.post(iniURL, {labID: this.labID})
        .then(function(response){
          console.log(response.data);
          self.iniDevices=response.data;
        })
        .catch(function(error){
          console.log(error);
        })

      axios.post(
        bookedDevicesURL,
        {
          username: user.credentials.username,
          password: user.credentials.password,
          roomNo: this.room
        }
      )
        .then(function(response){
          console.log(response.data);
          self.bookedDevices=response.data;

        })
        .catch(function(error){
          console.log(error);
        })
    },

    downloadDev() {
      this.bookedDevices = this.showBookedDevice();
      this.iniDevices = this.showINIDevices();
      this.populateSelectOption();
    },

    collectWork() {
      var reqBody=this.constructCollectRequest();
      var collectURL = collectCall();
      var self = this;

      axios.post(collectURL, reqBody)
        .then(function(response) {

          console.log(response.data);
          self.work_collection_response=response.data;
          console.log("im here");

          if (self.work_collection_response.result === 'Failure'){
              console.log("Collection Failure");
              return;
          }
          else{
            console.log("Collection success");
             self.$refs.collectWorkStatusModal.open();
          }


        })
        .catch(function(error) {
          console.log(error);
          //self.$refs.collectWorkStatusModal.open();
        })

      // this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
    },
    timer: function() {
        console.log("here");

        var seconds = this.work_collection_response.duration;

        setTimeout(this.checkStatus, seconds*1000);


    },
    checkStatus: function()
      {
          console.log("Checking status after a while!!");
          var checkStatusURL = collectStatusCall();
          var self = this;
          var reqBody={collectID:this.work_collection_response.collectID,username:user.credentials.username};
          axios.post(checkStatusURL, reqBody)
            .then(function(response){
              console.log(response.data);
              self.work_collection_status_response=response.data;
            })
            .catch(function(error){
              console.log(error);
            })


      },

    cancelCollectWork: function(){
      this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
    },

    getFeedback () {



        var feedbackURL = feedbackCall();

      var self = this;

      axios.post(feedbackURL, {labID: self.labID, username: user.credentials.username})
        .then(function(response){
          console.log(response.data);
          self.feedbacks=response.data;

          //State change will occur after the feedbacks is collected, since if we emit outside the callback,
          //the feedbacks may not be collected yet , but we already changed the state.

        self.$emit('feedbacksWereCollected' , self.feedbacks);
        self.$emit('stateWasChanged', 'STATE_SHOW_FEEDBACK');

        })
        .catch(function(error){
          console.log(error);
        })

        

      console.log('get feedback');
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
    }
    .rooms {
        padding:2em;
    }
    .buttons {
        padding: 2em 0em 2em 0em;
    }

</style>
