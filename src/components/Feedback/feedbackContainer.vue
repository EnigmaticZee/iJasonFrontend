<template>
    <q-layout>
      <div class="full-width">
        <div class="row">
            <span class="label bg-primary text-white full-width justify-center">Feedback for {{feedbacks.labName}}</span>
        </div>
        <div  v-for="feedback in feedbacks.errors"  class="card">
          <div class="card-title bg-light-blue text-white">
            {{feedback.error}}
          </div>
          <div v-for="detail in feedback.details" class="card-content ">
              {{detail}}
          </div>
        </div>
    </div>
    </q-layout>

    <!-- <div>
        <button @click="dummy()">Check Feedback</button>
    </div> -->
</template>

<script>
    export default {
        props: ['feedbacks'],

        data: function() {
            return{}
        },

        methods: {
            dummy : function () {
                console.log(this.feedbacks);
                alert(this.feedbacks);
            }
        }
    }
</script>

<style>

</style>
