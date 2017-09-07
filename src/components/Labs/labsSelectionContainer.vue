<template>
  <q-layout>

    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
          iJason Virtual Lab Supervisor
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
          <a>
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
      @stateWasChanged="currentState = $event"></labs>
      

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


    export default {
        data() {
            return {
                //Constant
                LAB_API_URL : '',

                feedbacks:[],
                currentState: 'STATE_SHOW_LAB',
                weeks : 12,
                selectedLabID: 0,
                userCredentials:{username:'student', password: 'password'},
                selectedTasks: [{labID: 1, labTitle: 'Lab Task 1', week: 1} , {labID: 13, labTitle: 'Lab Task 13', week: 1}],
                labTasks:[
                {labID: 1, labTitle: 'Lab Task 1', week: 1},
                {labID: 2, labTitle: 'Lab Task 2', week: 1},
                {labID: 3, labTitle: 'Lab Task 3', week: 1},
                {labID: 4, labTitle: 'Lab Task 4', week: 2},
                {labID: 5, labTitle: 'Lab Task 5', week: 2},
                {labID: 6, labTitle: 'Lab Task 6', week: 3},
                {labID: 7, labTitle: 'Lab Task 7', week: 4},
                {labID: 8, labTitle: 'Lab Task 8', week: 5},
                {labID: 9, labTitle: 'Lab Task 9', week: 6},
                {labID: 10, labTitle: 'Lab Task 10', week: 7},
                {labID: 11, labTitle: 'Lab Task 11', week: 8},
                {labID: 12, labTitle: 'Lab Task 12', week: 9},
                {labID: 13, labTitle: 'Lab Task 13', week: 10},
                {labID: 14, labTitle: 'Lab Task 14', week: 11},
                {labID: 15, labTitle: 'Lab Task 15', week: 12}
                ]
            }
        },

        mounted() {
            // loadWeeklyTask();
        },
        methods: {
            loadWeeklyTask : function(aWeek) {
                this.currentState = 'STATE_SHOW_LAB'
                this.selectedTasks = [];

                for (var i = 0; i < this.labTasks.length; i++)
                {
                    if(this.labTasks[i].week == aWeek)
                        this.selectedTasks.push(this.labTasks[i]);
                }
            },
            // downloadTasks : function()
            // {
            //     this.labTasks = [
            //     {labID: 1, labTitle: 'Lab Task 1', week: 1},
            //     {labID: 2, labTitle: 'Lab Task 2', week: 1},
            //     {labID: 3, labTitle: 'Lab Task 3', week: 1},
            //     {labID: 4, labTitle: 'Lab Task 4', week: 2},
            //     {labID: 5, labTitle: 'Lab Task 5', week: 2},
            //     {labID: 6, labTitle: 'Lab Task 6', week: 3},
            //     {labID: 7, labTitle: 'Lab Task 7', week: 4},
            //     {labID: 8, labTitle: 'Lab Task 8', week: 5},
            //     {labID: 9, labTitle: 'Lab Task 9', week: 6},
            //     {labID: 10, labTitle: 'Lab Task 10', week: 7},
            //     {labID: 11, labTitle: 'Lab Task 11', week: 8},
            //     {labID: 12, labTitle: 'Lab Task 12', week: 9},
            //     {labID: 13, labTitle: 'Lab Task 13', week: 10},
            //     {labID: 14, labTitle: 'Lab Task 14', week: 11},
            //     {labID: 15, labTitle: 'Lab Task 15', week: 12},
            // ]
            // },
            dummy : function()
            {
                alert('dummy');
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
