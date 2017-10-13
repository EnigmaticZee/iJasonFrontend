<template>
  <div class="layout-view">

         <div class="bg-primary justify-center full-width row feedbackTitleStyle" >Feedback for {{labName}}</div>

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
        <div v-if="feedback.length === 0"  class="card">
          <div class="card-title bg-red-5 text-white">
              Complete!
          </div>
          <div v-for="detail in feedback.details" class="card-content ">
              You have successfully completed {{labName}}
          </div>
        </div>

        <div v-else  v-for="feedback in feedbacks.errors"  class="card">
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
    //Import Libraries
    import axios from 'axios';
    import {downloadFeedbackCall, sendEmailCall, downloadConfigCall} from '../../api';
    import user from '../../auth';

    export default {
        props: ['feedbacks', 'labName'],

        data: function() {
            return {}
        },
        methods: {
            /* ---Download Feedback---
               1. Sends GET Request via API containing user's credentials
               2. API will send back the URL Location for download pdf
               3. Load it in the new tab. */
            downloadFeedback : function() {
                var downloadFeedbackURL = downloadFeedbackCall();

                //GET Request
                axios.get(downloadFeedbackURL + 'username=' + user.credentials.username)
                .then(function(response) {
                    console.log('Download Feedback Response:', response.data);
                    window.open(downloadFeedbackURL + 'username=' + user.credentials.username, '_blank');
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            /* ---Download Config---
               1. Sends GET Request via API containing user's credentials
               2. API will send back the URL Location for download configuration
               3. Load it in the new tab. */
            downloadConfig : function() {
                var downloadConfigUrl = downloadConfigCall();
                console.log(downloadConfigUrl+"username="+ user.credentials.username);
                axios.get(downloadConfigUrl+"username="+ user.credentials.username)
                .then(function(response) {
                    console.log('Download Config Response:',response.data);
                    window.open(downloadConfigUrl+"username="+ user.credentials.username, '_blank');
                  })
                  .catch(function(error) {
                    console.log(error);
                  })

            },
            /* ---Send Email---
               1. Sends POST Request via API containing user's credentials and Feedback
               2. The emailing is handled in the backend. */
            sendEmail: function() {
                var sendEmailUrl = sendEmailCall();
                console.log(this.feedbacks);
                var self = this;
                axios.post(sendEmailUrl, {username: user.credentials.username, feedback: this.feedbacks})
                .then(function(response) {
                     console.log(response.data);
                 })
                 .catch(function(error) {
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
