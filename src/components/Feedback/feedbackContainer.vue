<template>
    <q-layout>
      <div class="full-width" v-if="feedbacks.labName != null" >
        <div class="row">
            <span class="label bg-primary text-white full-width justify-center">Feedback for {{feedbacks.labName}}</span>
        </div>
        <div  v-for="feedback in feedbacks"  class="card">
          <div class="card-title bg-light-blue text-white">
            {{feedback.errors.error}} 
          </div>
          <div class="card-content ">
              {{feedback.errors.details}}
          </div>
        </div>
    </div>
    </q-layout>
</template>

<script>
</script>

<style>
    
</style>