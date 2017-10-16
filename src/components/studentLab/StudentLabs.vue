<template>
    <div class="layout-view">
    <!-- Tabs -->
    <q-tabs :refs="$refs" class="justified" default-tab="tab-1" >
        <q-tab name="tab-1" icon="description">
            Tutorial Labs
        </q-tab>
        <q-tab name="tab-2" icon="dns">
            Extra Practice Labs
        </q-tab>
    </q-tabs>

    <!-- Targets -->
        <div ref="tab-1">
            <div v-if="tutorialLabs.length === 0" class="col ">
                <div class="row full-width justify-center noLabs"><img src="~assets/file.png"></div>
                <div class="row full-width justify-center">No labs available for this week yet...</div>
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
                            <i class="item-primary">build</i>
                            <div class="item-content cursor-pointer" v-on:click="showRoom(t.labID,t.labTitle)" >
                                Check Lab Work
                            </div>
                        </div>
                    </q-collapsible>
                </div>
            </div>
        </div>

        <div ref="tab-2">
            <div v-if="practiceLabs.length === 0" class="col ">
                <div class="row full-width justify-center noLabs"><img src="~assets/file.png"></div>
                <div class="row full-width justify-center">No practice labs available for this week yet...</div>
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
                                <i class="item-primary">build</i>
                                <div class="item-content cursor-pointer" v-on:click="showRoom(t.labID,t.labTitle)" >
                                    Check Lab Work
                                </div>
                            </div>
                    </q-collapsible>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //Import Libraries
    import axios from 'axios';
    import {downloadLabCall} from '../../api';
    import nav from '../../nav';

    export default {

        //Passed Properties
        props: ['practiceLabs', 'tutorialLabs'],
        data: function() {
            return {
                labTasks: [],
                dropDowns: {
                  ranking: { open: false}
                },
                isShow: false,
                roomNum: ''
            }
        },
        methods: {
            /* ---Show Dialog---
            1. Show the Modal to the screen */
            showDialog: function (event) {
                return this.$refs.basicModal.open();
            },
            /* ---Show Room---
            1. Notify the parent component about the changes
                Changes Made:
                a) State is changed to STATE_SHOW_ROOM
                b) labID
                c) labTitle */
             showRoom: function(labID,labTitle) {
                 this.$emit('stateWasChanged', 'STATE_SHOW_ROOM');
                 this.$emit('chosenlabID', labID);
                 this.$emit('chosenlabTitle', labTitle);
             },
             /* Select Room
             1. Set the Room based on the selected radio button
             2. Set the show status to true
             Note: Show status indicates the visibilty of the next stage,
             which is setting up the routers and switches  */
             selectRoom: function(roomNum) {
                 this.roomNum = roomNum;
                 this.isShow = true;
             },
             /* Download Lab
             1. Get the URL for the selected Lab Sheet
             2. Open it on the new window*/
             downloadLab: function (labDownloadId) {
                 var downloadLabURL = downloadLabCall();
                 console.log('Download Lab URL:', downloadLabURL + "labID=" + labDownloadId);

                 //GET Request
                 axios.get(downloadLabURL+"labID=" + labDownloadId)
                 .then(function(response) {
                     console.log('Download Lab Response:', response.data);
                     window.open(downloadLabURL + "labID=" + labDownloadId, '_blank');
                  })
                  .catch(function(error) {
                      console.log(error);
                  })
              }
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
  .noLabs {
    margin: 10% 10% 2% 10%;
  }
</style>
