<template>
  <q-layout id="particles-background" class="background">

    <div slot="header" class="toolbar">
        <q-toolbar-title :padding="1">
          <div>
            <img src="~assets/ijason-logo.png">
            <span class="mobile-hide">iJason Virtual Lab Supervisor</span>
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
        <div class="units-heading bg-secondary">
          <span >Units You Teach</span>
          <span @click="openModal(false)" class="pull-right add"><i class="material-icons">&#xE145;</i> Add  </span>
        </div>
        <div class="units-list">

            <span v-for="unit in units"
            :key="unit.unitCode"
            class="units-list__item single-unit">

              <div class="row">
                <img src="../../assets/units-icon.png" alt="">
              </div>
               <div @click="() => handleUnitClick(unit.unitCode, unit.unitTitle)" class="single-unit-description full-width col">
               <br>

                <div class="row">{{ unit.unitTitle }}</div>
                <div class="row">{{ unit.unitCode}}</div>
                <div v-if="unit.active == 0" class="row text-warning">Inactive Unit</div>
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
        <h4>{{ modalTitle }} Unit</h4>
        <input type="text" v-model="codeInput" class="full-width" @input="$v.codeInput.$touch()" placeholder="Code"/>
        <p v-if="!$v.codeInput.required && $v.codeInput.$dirty" class="text-red">Field is required</p>
        <p v-if="!$v.codeInput.maxLength" class="text-red">Code can only have {{ $v.codeInput.$params.maxLength.max }} characters </p>
        <p v-if="!$v.codeInput.alphaNum" class="text-red">Field can only contain letters or number</p>

        <input type="text" v-model="nameInput" class="full-width" placeholder="Name" @input="$v.nameInput.$touch()"/>
        <p v-if="!$v.nameInput.required && $v.nameInput.$dirty" class="text-red">Field is required</p>
        <p v-if="!$v.nameInput.maxLength" class="text-red">Name can only have {{ $v.nameInput.$params.maxLength.max }} characters </p>

        <div class="buttons text-right">
          <button @click="$refs.staffUnitModal.close()" class="primary">Close</button>
          <button @click="submitModal()" class="secondary" :disabled="$v.codeInput.$invalid || $v.nameInput.$invalid">Submit</button>
        </div>

        <br>
        <p class="text-center">iJason Virtual Lab Supervisor</p>
    </q-modal>
  </q-layout>
</template>

<script>
import axios from 'axios';
import {unitsCall, addUnit, editUnit } from '../../api';
import auth from '../../auth';
import nav from '../../nav';
import { QInput } from 'quasar';
import {Loading} from 'quasar';
import { mountParticles }  from '../../lib/particle-background.js';
import { required, maxLength, alpha, alphaNum } from 'vuelidate/lib/validators';
export default {
  data () {
    return {
      modalTitle: 'Add',
      isEdit: false,
      codeInput: '',
      nameInput: '',
      units: [ ]
    }
  },
  components: {
    'q-input': QInput
  },
  validations: {
      codeInput: {
          required,
          maxLength: maxLength(8),
          alphaNum
      },
      nameInput: {
          required,
          maxLength: maxLength(45)
      }
  },
  computed: {
    userDetails () {
      return auth.userDetails[0] || {
        name: 'Guest'
      }
    }
  },


  mounted() {
    mountParticles('particles-background');
  },

  methods: {
    performSignOut () {
        auth.logout(this);

    },

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
          self.downloadUnits();
        })
        .catch(function(error){
          console.log(error);
        })
        self.$refs.staffUnitModal.close()
    },


    handleUnitClick (unit, title) {
      console.log(unit);
      nav.staffUnitToLab(this, unit, title);
    },


    downloadUnits() {

      var unitsURL = unitsCall();
      var self = this;

      axios.get(unitsURL)
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
    console.log("Staff Unit Clicked" ,nav.staffUnitClicked);
    nav.studentUnitClicked = false;
    nav.staffUnitClicked = false;
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
    z-index: -1;

    .add {
      background-color: transparent;
      cursor: pointer;
      font-size: 20px;
      margin-right: 10px;
      z-index: 1;
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
      width: 25%;
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
