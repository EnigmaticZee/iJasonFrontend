<template>
  <div class="layout-view">
    <!-- Tabs -->
    <q-tabs :refs="$refs" class="justified" default-tab="tab-1">
      <q-tab name="tab-3" icon="add">
        Add Labs
      </q-tab>
      <q-tab name="tab-1" icon="description">
        Tutorial Labs
      </q-tab>
      <q-tab name="tab-2" icon="dns">
        Extra Practice Labs
      </q-tab>

    </q-tabs>

    <div class="text-center add-container">
       <span @click="openModal(false)" class="add"><i class="material-icons">&#xE145;</i> Add  </span>
    </div>

    <!-- Targets -->
    <div ref="tab-1">
        <div class="list" v-for="t in tasks">
        <div v-if="t.labType=='Regular'">
        <q-collapsible icon="description" :label="t.labTitle">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showRoom(t.labID,t.labTitle)" >
                Check Lab Work
              </div>
            </div>
        </q-collapsible>
        </div>
        </div>
    </div>

    <div ref="tab-2">
        <div class="list" v-for="t in tasks">
        <div v-if="t.labType=='Practice'">
        <q-collapsible icon="description" :label="t.labTitle">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showRoom(t.labID)" >
                Check Lab Work
              </div>
            </div>
          </q-collapsible>
        </div>
        </div>
    </div>

    <q-modal class="staff-modal" ref="staffLabModal" :content-css="{padding: '50px 50px 0 50px', minWidth: '50vw'}">
        <h4>{{ modalTitle }} lab</h4>
        <input type="text" v-model="Name" class="full-width" placeholder="Name"/>

        <label for="">Type</label>
        <br>
        <br>
        <input type="checkbox" id="practice" value="Practice" v-model="checkedTypes">
        <label for="jack" style="margin-right: 10px">Practice</label>
        <input type="checkbox" id="regular" value="Regular" v-model="checkedTypes">
        <label for="john">Regular</label>
        <br>

        <label for="">Choose lab sheet (PDF) file</label>
        <input class="full-width" type="file" @change="onLabFileChange"> 

        <label for="">Choose ini file</label>
        <input class="full-width" type="file" @change="onIniFileChange"> 

        <div class="buttons text-right">
          <button @click="$refs.staffLabModal.close()" class="primary">Close</button>
          <button @click="submitModal()" class="secondary">Submit</button>
        </div>

        <br>
        <p class="text-center">iJason Virtual Lab Supervisor</p>
    </q-modal>

    <q-modal  ref="basicModal" :content-css="{minWidth: '50vw', minHeight: '50vh', background:'#eeeeee'}">
        <header class="modal-header">Select Configuration</header>
        <div id="modal-content">
            <div id="menu"class="row">
              <ul class="menu">
                <li class="menu__item menu__item--dropdown" v-on:click="toggle('ranking')" v-bind:class="{'open' : dropDowns.ranking.open}">
                  <a class="menu__link menu__link--toggle">
                      <span>Select Rooms></span>

                  </a>

                  <ul class="dropdown-menu">
                      <li class="dropdown-menu__item" v-on:click="selectRoom('328')">
                          <a class="dropdown-menu__link">328</a>
                      </li>

                      <li class="dropdown-menu__item" v-on:click="selectRoom('329')">
                          <a class="dropdown-menu__link">329</a>
                      </li>

                      <li class="dropdown-menu__item" v-on:click="selectRoom('330')">
                          <a class="dropdown-menu__link">330</a>
                      </li>
                  </ul>
                </li>
              </ul>
              <span>room number: {{roomNum}}</span>
            </div>
            <div v-show="isShow">
              <div>
                <span>Switches</span>
                <div class="list" v-for="t in switches">
                    <div class="item" >
                      <div class="item-content">
                        {{t.deviceName}}
                      </div>
                    </div>
                </div>
              </div>
              <div>
                <span>Routers</span>
                <div class="list" v-for="t in routers">
                    <div class="item" >
                      <div class="item-content">
                        {{t.deviceName}}
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <footer>
          <button color="primary" @click="$refs.basicModal.close()">Close</button>
          <button color="primary" v-on:click="getFeedback()">Get Feedback</button>
        </footer>
    </q-modal>
    <q-modal  ref="feedbackModal" :content-css="{minWidth: '50vw', minHeight: '50vh', background:'#eeeeee'}">
        <header class="modal-header">Feedback</header>
        <div id="modal-content">
            <div>iniFileDevice:"sw"</div>
				    <div>deviceType:"Switch"</div>
    				<div>smartRackDevice:"Enclosure"</div>
				    <div>smartRackDeviceNickName:"mySwi"</div>
        </div>
        <footer>
          <button color="primary" @click="$refs.feedbackModal.close()">Close</button>
        </footer>
    </q-modal>
  </div>

</template>

<script>
    import axios from 'axios'
    import {addLab} from '../../api'
    import {editLab} from '../../api'

    export default {
        props: ['tasks', 'weekUnitData'],
        data: function()
        {
            return {
                modalTitle: 'Add',
                isEdit: false,
                unitCode: '',
                week: '',
                Name: '',
                Type: '',
                checkedTypes: [],
                INIFile: null,
                LabSheet: null,
                options: {
                  paramName: 'file'
                },
                labTasks: [],
                dropDowns: {
                  ranking: { open: false}
                },
                switches: [
                    {deviceName: 'Sw 1'},
                    {deviceName: 'Sw 2'},
                    {deviceName: 'Sw 3'}
                ],
                routers: [
                    {deviceName: 'router 1'},
                    {deviceName: 'router 2'},
                    {deviceName: 'router 3'}
                ],
                isShow: false,
                roomNum: ''


            }

        },
        methods: {
          openModal (isEditValue, editData = {}) {
            this.isEdit = isEditValue
            if (this.isEdit) {
              this.modalTitle = 'Edit'
              this.unitCode = editData.unitCode
              this.week = editData.week
              this.Name = editData.Name
              this.Type = editData.Type
              this.INIFile = editData.INIFile
              this.LabSheet = editData.LabSheet
            } else {
              this.modalTitle = 'Add'
              this.unitCode = ''
              this.week = ''
              this.Name = ''
              this.Type = ''
              this.INIFile = ''
              this.LabSheet = ''
            }
            this.$refs.staffLabModal.open()
          },
          submitModal () {
            console.log(this.isEdit)
            var unitsURL =  this.isEdit ? editLab() : addLab();

            var formData = new FormData();
            formData.append('unitCode', this.weekUnitData.unitCode);
            formData.append('week', this.weekUnitData.week);
            formData.append('Name', this.Name);
            formData.append('Type', this.checkedTypes);
            formData.append('INIFile', this.INIFile);
            formData.append('LabSheet',this.LabSheet);

            // TODO: Remove this
            for (var pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
            }

            var self = this;

            axios.post(unitsURL, formData)
              .then(function(response){
                location.reload()
              })
              .catch(function(error){
                console.log(error);
              })
              self.$refs.staffLabModal.close()
          },
          onLabFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            this.LabSheet = files[0]
          },
          onIniFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            this.INIFile = files[0]
          },
          showDialog: function (event) {

            return this.$refs.basicModal.open();
          },

          showRoom: function(labID,labTitle) {

              this.$emit('stateWasChanged', 'STATE_SHOW_ROOM');
              this.$emit('chosenlabID', labID);
              this.$emit('chosenlabTitle', labTitle);
          },
          toggle: function(dropdownName) {
            this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
          },
          selectRoom: function(roomNum) {
            this.roomNum = roomNum;
            this.isShow = true;
          },
          getFeedback: function() {
            return this.$refs.feedbackModal.open();
          }
        }
    }
</script>

<style lang="scss">
  #modal-content {
    height: 45vh;
    overflow-y: auto;
  }
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

  .staff-modal {

    input {
      margin-bottom: 20px;
    }

    .buttons {
      margin-top: 20px;

      .secondary {
        background-color: #5cb85c;
      }
    }
  }
</style>
