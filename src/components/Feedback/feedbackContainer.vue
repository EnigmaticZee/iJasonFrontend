<template>
  <div class="layout-view">
        
         <div class="bg-primary justify-center full-width row feedbackTitleStyle" >Feedback for {{feedbacks.labName}}</div>

        <div class=" card feedback">
        <div class="row feedbackButtons">
          <button class="primary full-width"  @click="downloadFeedback()">Download PDF
                <i>file_download</i>
          </button>

          <button class="secondary full-width" @click="downloadConfig()">Download Configuaration
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
      import {downloadConfigCall} from '../../api' 
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
            downloadConfig : function() 
            {
              var downloadConfigUrl = downloadConfigCall();
              console.log(downloadConfigUrl+"username="+ user.credentials.username);
              axios.get(downloadConfigUrl+"username="+ user.credentials.username)
                  .then(function(response) {
                    console.log(response.data);
                    window.open(downloadConfigUrl+"username="+ user.credentials.username, '_blank');
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
    .feedbackTitleStyle {
    color: white;
    font-size: 1.4em;
    padding: 0.5em;
  }

</style>
