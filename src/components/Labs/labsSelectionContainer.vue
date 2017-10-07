<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
       <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
       <i>menu</i>
    </button>
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
      :tasks="selectedTasks"
      @stateWasChanged="currentState = $event"
      @chosenlabID="selectedLabID = $event" @chosenlabTitle="selectedLabName = $event"></labs>


    <labRoom v-else-if="currentState=='STATE_SHOW_ROOM'" :labID="selectedLabID" :labName="selectedLabName" @stateWasChanged="currentState = $event" @feedbacksWereCollected="feedbacks = $event"></labRoom>

    <feedBack v-else :feedbacks="feedbacks"></feedBack>

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
    import LabsSelection from './labsSelectionDetail.vue';
    import LabSelectRoom from './labsSelectRoom.vue';
    import FeedbackContainer from '../Feedback/feedbackContainer.vue'
    import {labsCall} from '../../api'
    import auth from '../../auth';
    import nav from '../../nav';
    import axios from 'axios'



    export default {
        data() {
            return {
                //Constant
                LAB_API_URL : '',

                feedbacks:{},
                currentState: 'STATE_SHOW_LAB',
                weeks : 12,
                selectedLabID: 1,
                selectedLabName: null,
                /*userCredentials:{username:'student', password: 'password'},*/
                selectedTasks: [],
                userDetails: auth.userDetails[0],
                unitDetails: nav.unitsDetails

            }
        },

        mounted() {
            // loadWeeklyTask();
        },
        methods: {
           performSignOut: function () {
              auth.logout(this);
             
            },
            goToUnitPage: function() 
            {
              nav.toUnit(this);
            },
            loadWeeklyTask : function(aWeek) {

                console.log("Authentication", auth);
                console.log("Nav in Labs", nav);
                console.log("Chosen week is", aWeek);
                console.log("chosen unit is", this.unitDetails.unitCode);
                console.log ("unit Details", this.unitDetails);

                var labsURL = labsCall();
                var reqBody=this.constructLabRequest(aWeek);
                var self = this;

                axios.post(labsURL, reqBody)
                  .then(function(response){
                    console.log(response.data);
                    self.selectedTasks=response.data;
                    
                    console.log("selected task title", self.selectedTasks[0].labSheetLink);
                    //console.log(self.selectedTasks.labSheetLink);
                    console.log("For some reason the selected task is undefined ???");  
                  })
                  .catch(function(error){
                    console.log(error);
                  })

                console.log(this.selectedTasks);
                console.log(this.selectedTasks.labSheetLink);


                this.currentState = 'STATE_SHOW_LAB'

              /*  for (var i = 0; i < this.labTasks.length; i++)
                {
                    if(this.labTasks[i].week == aWeek)
                        this.selectedTasks.push(this.labTasks[i]);
                }*/
            },
            constructLabRequest : function(aWeek)
            {
              var requestBody={
              unitCode: nav.unitsDetails.unitCode,
              weekNo: aWeek
              };

              console.log(requestBody);

              return requestBody;
            }

        },
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
        align-items: center;
        justify-content: space-between;

        > div:first-child {
        display: flex;
        align-items: center;

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
