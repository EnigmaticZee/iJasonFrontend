<template>
  <div class="layout-view">
        <div class="row">
            <span class="label bg-primary text-white full-width justify-center">Feedback for {{feedbacks.labName}}</span>
        </div>
        <div class=" card feedback">
        <div class="row feedbackButtons">
          <button class="primary full-width">Download Configuaration
                <i>file_download</i>
          </button>

          <button class="secondary full-width"  @click="downloadFeedback()">Download PDF
                <i>file_download</i>
          </button>
          
           <button class="default full-width" @click="sendEmail()">Email 
                <i>email</i>
          </button>
         
        </div>
        <div  v-for="feedback in feedbacks.errors"  class="card">
          <div class="card-title bg-red-5 text-white">
            {{feedback.error}}
               
          </div>
          <div v-for="detail in feedback.details" class="card-content ">
              {{detail}}
          </div>
        </div>

        </div>
    </div>
    <!-- <div>
        <button @click="dummy()">Check Feedback</button>
    </div> -->
</template>

<script>
      import axios from 'axios'
      import user from '../../auth';
      import {downloadFeedbackCall} from '../../api'
      import {sendEmailCall} from '../../api'
    export default {
        props: ['feedbacks'],

        data: function() {
            return{}
        },

        methods: {
            dummy : function () {
                console.log(this.feedbacks);
                alert(this.feedbacks);
            },
            downloadFeedback : function() 
            {
              var downloadFeedbackUrl = downloadFeedbackCall();
              console.log(downloadFeedbackUrl+"username="+ user.credentials.username);
              axios.get(downloadFeedbackUrl+"username="+ user.credentials.username)
                  .then(function(response) {
                    console.log(response.data);
                    window.open(downloadFeedbackUrl+"username="+ user.credentials.username, '_blank');
                  })
                  .catch(function(error) {
                    console.log(error);
                    //self.$refs.collectWorkStatusModal.open();
                  })

            },
            sendEmail: function()
            {

              var sendEmailUrl = sendEmailCall();

              console.log(this.feedbacks);
              var self = this;
              axios.post(sendEmailUrl, {username: user.credentials.username, feedback: this.feedbacks})
                .then(function(response){
                  console.log(response.data);
                })
                .catch(function(error){
                  console.log(error);
                })

            }
        }
    }
</script>

<style>
  .feedback {
      padding: 2em;
    }
    .feedbackButtons{
      padding-bottom: 1em;
    }

</style>
