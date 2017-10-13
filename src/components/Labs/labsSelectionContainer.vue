<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <div>
          <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
            <i>menu</i>
          </button>

          <div class="mobile-hide">
            <img src="~assets/ijason-logo.png">
            <span class="mobile-hide">iJason Virtual Lab Supervisor</span>
          </div>
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
        <li @click="goToUnitPage">
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

    <div class="justify-center full-width row unitTitleStyle" slot="navigation">{{unitDetails.unitCode}} - {{unitDetails.unitName}}
    </div>

    <q-drawer ref="leftDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Semester Week
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <button
          class="primary big  outline full-width"
          icon="view_week"
          v-for="week in weeks"
          @click="loadWeeklyTask(week)">

          <i class="on-left">view_week</i>  Week {{ week }}
        </button>
     </div>
    </q-drawer>

    <router-view class="layout-view">

    </router-view>

    <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Right-side Drawer
        </q-toolbar-title>
      </div>
    </q-drawer>

    <labs
      v-if="currentState=='STATE_SHOW_LAB'"
      :practiceLabs="practiceLabs" :tutorialLabs="tutorialLabs"
      @stateWasChanged="currentState = $event"
      @chosenlabID="selectedLabID = $event" @chosenlabTitle="selectedLabName = $event"></labs>


    <labRoom v-else-if="currentState=='STATE_SHOW_ROOM'" :labID="selectedLabID" :labName="selectedLabName" @stateWasChanged="currentState = $event" @feedbacksWereCollected="feedbacks = $event"></labRoom>

    <feedBack v-else  :labName="selectedLabName" :feedbacks="feedbacks"></feedBack>

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
    import axios from 'axios'
    import auth from '../../auth';
    import nav from '../../nav';
    import LabsSelection from './labsSelectionDetail.vue';
    import LabSelectRoom from './labsSelectRoom.vue';
    import FeedbackContainer from '../Feedback/feedbackContainer.vue'
    import {labsCall} from '../../api'

    export default {
        data: function() {
            return {
                feedbacks:{},
                currentState: 'STATE_SHOW_LAB',
                weeks : 12,
                selectedLabID: 1,
                selectedLabName: null,
                practiceLabs: [],
                tutorialLabs: [],
                unitDetails: nav.unitsDetails
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
            /* ---Sign out---
               1. Call the logout function inside auth */
           performSignOut: function () {
               auth.logout(this);
            },
            /* ---Go To Unit Page---
               1. Call the toUnit function inside nav*/
            goToUnitPage: function() {
                nav.toUnit(this);
            },
            /* ---Load Weekly Task ---
               1. Construct an request Object based on the chosen week
               2. The Object should contain the unitCode and the week
               3. Send a POST request , and passes the Object as the parameter
               4. Populate the local array based on the result (tasks) type
                    a. If the Task is a regular, push it to the regular task array
                    b. If the task is a practice, push it to the practice array
               5. Finally changes the currentState to the STATE_SHOW_LAB */

            loadWeeklyTask : function(aWeek) {
                console.log("Nav in Labs", nav);
                console.log('Week:', aWeek);
                console.log ('Unit Details:', nav.unitDetails);

                var labsURL = labsCall();
                var reqBody = {
                    unitCode: nav.unitsDetails.unitCode,
                    weekNo: aWeek };
                var self = this;

                //POST Request
                axios.post(labsURL, reqBody)
                .then(function(response) {
                    console.log('Lab Tasks:', response.data);

                    //Clear the Labs
                    self.tutorialLabs = [];
                    self.practiceLabs = [];

                    /*Loop through the response, and assign the
                    tutorialLabs / practiceLabs array based on the type*/
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].labType =='Regular')
                            self.tutorialLabs.push(response.data[i]);
                        else if (response.data[i].labType =="Practice")
                            self.practiceLabs.push(response.data[i]);
                    }

                    console.log("Tutorial Labs", self.tutorialLabs);
                    console.log("Practice Labs", self.practiceLabs);
                  })
                  .catch(function(error) {
                      console.log(error);
                  })

                  //Change the currenState to STATE_SHOW_LAB
                  this.currentState = 'STATE_SHOW_LAB'
            }

        },
        //Component List
        components: {
            'labs':LabsSelection,
            'labRoom': LabSelectRoom,
            'feedBack': FeedbackContainer
        },

        beforeMount () {
          this.loadWeeklyTask(1);
        }
    }
</script>

<style lang="scss">
  .logo-container {
    width:3px;
    perspective: 800px;
    margin: top;
    margin-top: -260px;
  }

 .toolbar-content .toolbar-title > div {
   @media(max-width: 560px) {
     align-items: flex-start !important;
     flex-flow: column;
   }
 }

  .logo {
    img {
      max-width: 100%;
    }
  }

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

  .units-container {
    img  {
      width: 100px;
      height: 100px;
    }

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

    .units-list {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

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

  .breadcrumb-container {
    display: flex;
    flex: 1 1 auto;
    justify-content: space-between;
    align-items: center;

    > ul {
      margin: 0;
    }

    > div {
      width: 100px;

      @media (min-width: 772px) {
        display: none;
      }

      img {
        width: 100%;
        display: block;
      }
    }
  }

  .toolbar-content {
    img {
      max-width: 150%;
      width: 66.66665px;
      height: 50px;
      margin-right: 5px;
    }

    .toolbar-title {
      > div {
        display: flex;
        align-items: center !important;
        justify-content: space-between;
        flex-direction: row;

        @media (max-width: 772px) {
          justify-content: space-between;
        }

        > div:first-child {
          display: flex;
          align-items: center;


          > div {
            display: flex;
            align-items: center;
            @media (max-width: 772px) {
              // display: none;
            }
          }
        }
      }
    }

  }

  .unitTitleStyle {
    color: white;
    font-size: 1.4em;
    padding-bottom: 1.5em;
  }
</style>
