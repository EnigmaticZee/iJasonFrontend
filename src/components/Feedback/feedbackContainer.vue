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
          <a >
            <i>home</i> Units
          </a>
        </li>

        <li>
          <a >
            <i>mail</i> Labs
          </a>
        </li>
          
        <li>
          <a>
            <i>mail</i> Feedback    
          </a>
        </li>
      </ul>
    </div>
    </q-tabs>
 
    <div class="full-width">
       <div  v-for="feedback in feedbacks"  class="card">
      <div class="card-title bg-light-blue text-white">
        Error 
      </div>
      <div class="card-content ">
          {{feedback.commit.author}}
          {{feedback.commit.message}}
          {{feedback.commit.author.name}}
      </div>
    </div>
    </div>
 
        
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
    import axios from 'axios'
    var apiURL = 'https://api.github.com/repositories/11730342/commits?per_page=5&sha=';

    export default {
        data: {
    feedbacks: []    
  },

  created: function () {
    this.fetchData();
  },

  methods: {
    fetchData: function () {
    var self = this;
    axios.get(apiURL)
        .then(function(response){
          console.log(response.data);
          self.feedbacks=response.data;
        })
        .catch(function(error){
          handleAPIError(error,self);
        })
    }}};
</script>

<style>
    
</style>