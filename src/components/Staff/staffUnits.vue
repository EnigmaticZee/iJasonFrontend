<template>
  <q-layout id="particles-background" class="background">
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <div>
          <img src="~assets/ijason-logo.png">
           <span class="mobile-hide">iJason Virtual Lab Supervisor</span>
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

    <div class="layout-view col">
    <br><br><br><br>
      <div class="units-selection-welcome-message col">
        <h1 class="text-primary">iJason Virtual Lab Supervisor</h1>
        <p class="text-primary">Welcome back, student</p>
      </div>
      <br><br><br>
      <div class="units-container col">
        <div class="units-heading bg-secondary">
          Staff units
          <span @click="openModal(false)" class="pull-right add"><i class="material-icons">&#xE145;</i> Add  </span>
        </div>
        <div class="units-list">

            <span v-for="unit in units"
            :key="unit.unitCode"
            class="units-list__item single-unit">

              <div class="row">
                <img src="../../assets/units-icon.png" alt="">
              </div>
               <div @click="() => handleUnitClick(unit)" class="single-unit-description col">
               <br>

                <div class="row">{{ unit.unitTitle }}</div>
                <div class="row">{{ unit.unitCode}}</div>
              </div>

              <div class="single-unit-edit" @click="openModal(true, { unitTitle: unit.unitTitle, unitCode: unit.unitCode })">
                <i class="material-icons">&#xE254;</i> Edit
              </div>
              </span>

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

     <q-modal class="staff-modal" ref="staffUnitModal" :content-css="{padding: '50px 50px 0 50px', minWidth: '50vw'}">
        <h4>{{ modalTitle }} staff unit</h4>
        <input type="text" v-model="codeInput" class="full-width" placeholder="Code"/>

        <input type="text" v-model="nameInput" class="full-width" placeholder="Name"/>

        <div class="buttons text-right">
          <button @click="$refs.staffUnitModal.close()" class="primary">Close</button>
          <button @click="submitModal()" class="secondary">Submit</button>
        </div>

        <br>
        <p class="text-center">iJason Virtual Lab Supervisor</p>
    </q-modal>
  </q-layout>
</template>

<script>
import axios from 'axios'
import {unitsCall} from '../../api'
import {addUnit} from '../../api'
import {editUnit} from '../../api'
import { QInput } from 'quasar';
import auth from '../../auth';

import { mountParticles }  from '../../lib/particle-background.js';

export default {
  data () {
    return {
      modalTitle: 'Add',
      isEdit: false,
      codeInput: '',
      nameInput: '',
      units: [ ],
      semester :2,
      year: 2017
    }
  },
  components: {
    'q-input': QInput
  },

  mounted() {
    mountParticles('particles-background');
  },

  methods: {
    dummy () {
      var unitsURL = addUnit();
      var reqBody = {
          unitCode: 'Test1001',
          unitName: 'Test Unit'
      };

      axios.post(unitsURL, reqBody)
        .then(function(response){
          console.log('Result Add: ',response.data);
        })
        .catch(function(error){
          console.log(error);
        })
    },
    openModal (isEditValue, editData = {}) {
      this.isEdit = isEditValue
      if (this.isEdit) {
        this.modalTitle = 'Edit'
        this.nameInput = editData.unitTitle
        this.codeInput = editData.unitCode
      } else {
        this.nameInput = ''
        this.codeInput = ''
        this.modalTitle = 'Add'
      }
      this.$refs.staffUnitModal.open()
    },
    submitModal () {
      var unitsURL =  this.isEdit ? editUnit() : addUnit();
      console.log("Units URL" , unitsURL);
      var reqBody= {
          unitCode: this.codeInput,
		      unitName: this.nameInput
      }
      var self = this;

      axios.post(unitsURL, reqBody)
        .then(function(response){
          console.log(response.data);
          self.downloadUnits()
        })
        .catch(function(error){
          console.log(error);
        })
        self.$refs.staffUnitModal.close()
    },
    performSignOut () {
      console.log('Implement logic for signout here.')
    },

    handleUnitClick (unit) {
      console.log(unit)
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

    .add {
      background-color: transparent;
      cursor: pointer;
      font-size: 20px;
      margin-right: 15px;
    }
  }

  .units-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;


    &__item {
     cursor: pointer;
      padding: 0.3rem 1rem;
      background: #027be3;
      color: #fff;
    }

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

    .single-unit-edit {
      cursor: pointer;
      width: 100%;
      text-align: right;
      padding-top: 40px;
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
  // background-image: url("../../assets/background2.jpg");
  opacity: 20px;
  background-size: cover;
  background-repeat: no-repeat;

  > div {
    z-index: 10;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
}

.staff-modal {

  input {
    margin-bottom: 20px;
  }

  .buttons {
    margin-top: 20px;

    .secondary {
      background-color: #5cb85c;
    }
  }
}
</style>
