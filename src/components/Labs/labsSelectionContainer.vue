<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
      <div>
          <img src="~assets/logo.jpg">
          iJason Virtual Lab Supervisor
      </div>

      <div>
          Student
          |
          <button @click="performSignOut" class="primary">
            Sign Out
          </button>

        </div>
      </q-toolbar-title>
    </div>

    <q-tabs slot="navigation">
     <div>
      <ul class="breadcrumb">
        <li>
          <a>
            <i>home</i> Units
          </a>
        </li>

        <li>
          <a >
            <i>mail</i> Labs
          </a>
        </li>
      </ul>
    </div>
    </q-tabs>

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
      @chosenlabID="selectedLabID = $event"></labs>


    <labRoom v-else-if="currentState=='STATE_SHOW_ROOM'" :labID="selectedLabID" @stateWasChanged="currentState = $event" @feedbacksWereCollected="feedbacks = $event"></labRoom>

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
import axios from 'axios'
import {labsCall} from '../../api'

export default {
  data() {
    return {
      //Constant
      LAB_API_URL : '',

      feedbacks:{},
      currentState: 'STATE_SHOW_LAB',
      weeks : 12,
      selectedLabID: 1,
      userCredentials:{username:'student', password: 'password'},
      selectedTasks: [],
      unit: 'TNE10011'
    }
  },

  mounted() {
    // loadWeeklyTask();
  },
  methods: {
    performSignOut () {
      console.log('Implement logic for signout here.')

    },
    loadWeeklyTask : function(aWeek) {
      console.log("Chosen week is", aWeek);
      console.log("chosen unit is", this.unit);

      var labsURL = labsCall();
      var reqBody=this.constructLabRequest(aWeek);
      var self = this;

      axios.post(labsURL, reqBody)
        .then(function(response){
          console.log(response.data);
          self.selectedTasks=response.data;
        })
        .catch(function(error){
          console.log(error);
        })

      console.log(this.selectedTasks);

      this.currentState = 'STATE_SHOW_LAB'

      /*  for (var i = 0; i < this.labTasks.length; i++)
                {
                    if(this.labTasks[i].week == aWeek)
                        this.selectedTasks.push(this.labTasks[i]);
                }*/
    },

    constructLabRequest (aWeek) {
      var requestBody={
        unitCode: this.unit,
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
  }
}
</script>

<style>
</style>
