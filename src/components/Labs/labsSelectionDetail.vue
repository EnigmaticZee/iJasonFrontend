<template>
  <div class="layout-view">
    <!-- Tabs -->
    <q-tabs :refs="$refs" class="justified" default-tab="tab-1">

      <q-tab name="tab-1" icon="description">
        Tutorial Labs
      </q-tab>
      <q-tab name="tab-2" icon="dns">
        Extra Practice Labs
      </q-tab>

    </q-tabs>

    <!-- Targets -->
    <div ref="tab-1">
        <div class="list" v-for="t in tasks">
          <q-collapsible icon="description" :label="t.labTitle">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showRoom()" >
                Check Lab Work
              </div>
            </div>
          </q-collapsible>
        </div>
    </div>


    <div ref="tab-2">
        <div class="list">
          <q-collapsible icon="description" label="Practice Lab 01">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 02">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 03">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 04">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
        </div>
    </div>
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

    export default {
        props: ['tasks'],
        data: function()
        {
            return {
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
          showDialog: function (event) {

            return this.$refs.basicModal.open();
          },

          showRoom: function() {
              this.$emit('stateWasChanged', 'STATE_SHOW_ROOM');
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

        },
        components: {

        }

    }
</script>

<style>
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
</style>
