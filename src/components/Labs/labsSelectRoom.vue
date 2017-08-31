<template>
  <div class="layout-view">
    <!-- Select Room (Radio Button) -->
    <h2>Select Room</h2>
     <div>
       <label>
         <q-radio v-model="option" val="ATC 328" @input="downloadDevices()"></q-radio>
         ATC 328
       </label>
       <label>
         <q-radio v-model="option" val="ATC 329" @input="downloadDevices()"></q-radio>
         ATC 329
       </label>
       <label>
         <q-radio v-model="option" val="ATC 330" @input="downloadDevices()"></q-radio>
         ATC 330
       </label>
    </div>
    <br/>
    <br/>

    <!-- Show Required Device in INI File -->

    <div v-if="iniDevices != null" class="list" v-for="iniDevice in iniDevices">
      <q-collapsible icon="description" :label=" iniDevice.deviceType + ' : ' + iniDevice.deviceName">
          <div v-if="bookedDevices != null" class="item">
            <div class="item-content">
                Map This Device Into:  <q-select type="radio" v-model="select" :options="selectOptions"></q-select>
                </ul>
            </div>
          </div>
      </q-collapsible>
    </div>

    <br/>
    <br/>
    <!-- Collect Device Button -->
    <button button class="primary" @click="collectWork()">Collect Work</button>
  </div>

</template>

<script>

    export default{
        props:['credentials'],
        data: function() {
            return {
                option: null,
                select: 'book',
                bookedDevices: null,
                iniDevices: null,
                selectOptions: null
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
                                {deviceType: 'Router', deviceName: 'Enclosure Black Router 1 ', deviceNickname: 'My Router 1'},
                                {deviceType: 'Router', deviceName: 'Enclosure Black Router 2', deviceNickname: 'My Router 2'},
                                {deviceType: 'Switch', deviceName: 'Enclosure Black Switch 1', deviceNickname: 'My Switch 1'}]
            },
            showINIDevices: function() {
                //API Call
                return [
                                {deviceType: 'Router', deviceName: 'R1'},
                                {deviceType: 'Router', deviceName: 'R2'},
                                {deviceType: 'Switch', deviceName: 'S1'}]
            },
            populateSelectOption: function() {

                if (this.bookedDevices != null) {
                    this.selectOptions = [];
                    for (var i = 0 ; i < this.bookedDevices.length ; i++) {
                        this.selectOptions.push({label: this.bookedDevices[i].deviceNickname, value: this.bookedDevices[i].deviceNickname});
                    }
                }
                else {
                    alert('null');
                }
            },
            downloadDevices: function() {
                this.bookedDevices = this.showBookedDevice();
                this.iniDevices = this.showINIDevices();
                this.populateSelectOption();
            },
            collectWork: function() {
                 this.$emit('stateWasChanged', 'STATE_SHOW_LAB');
            }
        }
    }
</script>

<style>

</style>
