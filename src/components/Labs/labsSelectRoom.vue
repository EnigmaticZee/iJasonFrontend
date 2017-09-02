<template>
  <div class="layout-view">
    <!-- Select Room (Radio Button) -->
    <div class="row">
        <span class="label bg-primary text-white full-width justify-center">Select Room</span>
    </div>
    <div class="row justify-center rooms">
        <div class="row">
        <label class="item">
            <div class="item-primary">
              <q-radio v-model="room" val="atc 328" @input="downloadDev()"></q-radio>
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
      
    <div class="col justify-center">
    <div  v-if="iniDevices != null" class="list" v-for="(iniDevice,index) in iniDevices">
      <q-collapsible icon="description" :label="'Configured ' +  iniDevice.deviceType + ' : ' + iniDevice.deviceName">
          <div  class="item">
            <div class="item-content">
                <q-select class="full-width" type="radio" v-model="select[index]"  :options="populateSelectOption"></q-select>
            </div>
          </div>
      </q-collapsible>
    </div>
    </div>
     
    
  
    <!-- Collect and Cancel Device Button -->
    <div class="buttons">
       <div class="col justify-center">
        <button  class="warning full-width" @click="cancelCollectWork()">Cancel</button>
    </div>
      <div class="col justify-center">
          
        <button  class="primary full-width" @click="collectWork()">Collect Work</button>
    </div>
    </div>
 
      
      
  </div>

</template>

<script>
    import user from '../../auth';
    import axios from 'axios'
    import {iniCall} from '../../api'
    import {bookedDevicesCall} from '../../api'
    import {collectCall} from '../../api'
    export default{  
        props:['labID'],
        data: function() {
            return {
                room: '',
                select: [],
                bookedDevices: [],
                iniDevices: []
            }
        },
        computed: {
              populateSelectOption: function() {
                  var bookedDev=[];                 
                    for (var i = 0 ; i < this.bookedDevices.length ; i++) {
                        bookedDev.push({label: this.bookedDevices[i].deviceName, value: i});
                    }
                  return bookedDev;
            }
            
        },
        methods: {
            dummy: function() {
                alert('dummy');
            },
            showBookedDevice: function() {
                //API Call

                //Pass in Booked Room (this.option)
                return [
                                {deviceType: 'Router', deviceName: 'Enclosure Black Router 1 ', deviceNickName: 'My Router 1'},
                                {deviceType: 'Router', deviceName: 'Enclosure Black Router 2', deviceNickName: 'My Router 2'},
                                {deviceType: 'Switch', deviceName: 'Enclosure Black Switch 1', deviceNickName: 'My Switch 1'}  ]
            },
            showINIDevices: function() {
                //API Call
                return [ 
                                {deviceType: 'Router', deviceName: 'R1'},
                                {deviceType: 'Router', deviceName: 'R2'},
                                {deviceType: 'Switch', deviceName: 'S1'} ]
            },
          
           
            constructCollectRequest: function() {
                
                console.log(this._data);
                var mappedDevices=[];
                for (var i = 0; i < this.iniDevices.length; i++)
                {
                    var device=this.iniDevices[i];
                    var devicemapping={};
                    devicemapping.inFileDevice=device.deviceName;
                    devicemapping.deviceType=device.deviceType;
//                    console.log("bookeddevices",this.bookedDevices);
//                    console.log("selectoptions",this.selectOptions[i].value);
                    console.log(this.select[i]);
                    if((typeof this.select[i]) !== 'undefined')
                    {                        
                        devicemapping.smartRackDeviceName=this.bookedDevices[this.select[i]].deviceName;
                        devicemapping.smartRackDeviceNickName=this.bookedDevices[this.select[i]].deviceNickName;
                    }
                    else
                    {
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
            downloadDevices: function() {  
                
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
                
                    axios.post(bookedDevicesURL, {username: user.credentials.username, password: user.credentials.password, roomNo: this.room })
                        .then(function(response){
                          console.log(response.data);
                          self.bookedDevices=response.data;
                        
                        })
                        .catch(function(error){
                          console.log(error);
                        })
            },
            
            
            downloadDev: function()
            {
                this.bookedDevices = this.showBookedDevice();
                this.iniDevices = this.showINIDevices();
                this.populateSelectOption();
            },
            
            collectWork: function() {
                
                 var reqBody=this.constructCollectRequest();
                var collectURL = collectCall();
                 var self = this;
                    axios.post(collectURL, reqBody)
                        .then(function(response){
                          console.log(response.data);
                          
                        })
                        .catch(function(error){
                          console.log(error);
                        })
//                 this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
            },
            cancelCollectWork: function(){
                this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
            }
        }
    }
</script>

<style>
    .label {
        font-size: 2em;
    }
    .rooms {
        padding:2em;
    }
    .buttons {
        padding: 2em 0em 2em 0em;
    }
</style>
