<template>
  <q-layout class="background">
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <div>
          <img src="~assets/ijason-logo.png">
          iJason Virtual Lab Supervisor
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

    <div class="layout-view col">
    <br><br><br><br>
      <div class="units-selection-welcome-message col">
        <h1 class="text-primary">iJason Virtual Lab Supervisor</h1>
        <p class="text-primary">Welcome back, {{userDetails.name}} </p>
      </div>
      <br><br><br>
      <div class="units-container col">
        <div class="units-heading  bg-secondary">
          Units You study
        </div>
        <div class="units-list">
          <button
            @click="() => handleUnitClick(unit.unitCode, unit.unitTitle)"
            v-for="unit in units"
            class="primary single-unit">
              <div class="row">
                <img src="../assets/units-icon.png" alt="">
              </div>
              
              <div class="single-unit-description col">
              <br><br>
                <div class="row">{{ unit.unitTitle }}</div>
                <div class="row">{{ unit.unitCode}}</div>
              </div>
          </button>
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
import {unitsCall} from '../api'
import auth from '../auth';
import nav from '../nav'

export default {
  data () {
    return {
      units: [],
      semester :2,
      year: 2017,
      userDetails: auth.userDetails[0]
    }
  },

  computed: {
  },

  methods: {
    performSignOut () {
      auth.logout(this);
     
    },

    handleUnitClick (unit, title) {
      console.log(unit);
      nav.unitToLab(this, unit, title);
    }, 
    constructUnitsReqBody (){

      var requestBody={
        username: auth.credentials.username,
        semester:this.semester,
        year:this.year
      };

      console.log(requestBody);

      return requestBody;
    },

    downloadUnits() {

      var unitsURL = unitsCall();
      var reqBody=this.constructUnitsReqBody();
      var self = this;

      axios.post(unitsURL, reqBody)
        .then(function(response){
          console.log(response.data);
          self.units=response.data;
          console.log(self.units[0].unitTitle);
          console.log(self.units[0].unitCode);
        })
        .catch(function(error){
          console.log(error);
        })
    }



  },

  beforeMount () {
    console.log(nav.unitClicked);
    nav.unitClicked = false;

    console.log("Nav Object" , nav);
    this.downloadUnits();

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

.background {
  background-image: url("../assets/background2.jpg");
  opacity: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}

</style>
