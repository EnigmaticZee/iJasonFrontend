<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        <div>
          <img src="~assets/logo.jpg">
          iJason Virtual Lab Supervisor
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

    <div class="layout-view">
      <div class="logo-container non-selectable no-pointer-events">
        <div class="logo">
          <img src="~assets/logo.png">
        </div>

      </div>
      <div class="units-selection-welcome-message">
        <h1>iJason Virtual Lab Supervisor</h1>
        <br><br><br><br>
        <p>Welcome back, student</p>
      </div>

      <div class="units-container">
        <h3 class="units-heading">
          Units You study
        </h3>

        <div class="units-list">
          <button
            @click="() => handleUnitClick(unit)"
            v-for="unit in units" 
            class="deep-purple single-unit">
            
              <img :src="unit.img" alt="">
              <div class="single-unit-description">
                <h2>{{ unit.title }}</h2>
                <p>{{ unit.type}}</p>
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

export default {
  data () {
    return {
      units: [
        {
          title: 'Networking',
          type: 'COS80002',
          img: require('../assets/units-icon.png')
        },

        {
          title: 'Advance123 Switching',
          type: 'COS80003',
          img: require('../assets/units-icon.png')
        },

        {
          title: 'Advance Routing',
          type: 'COS80004',
          img: require('../assets/units-icon.png')
        }
      ]
    }
  },

  computed: {
  },

  methods: {
    performSignOut () {
      console.log('Implement logic for signout here.')
    },

    handleUnitClick (unit) {
      console.log(unit)
    }

  },

  mounted () {
  }

}
</script>

<style lang="scss">
.toolbar {
  background: #7342bf;
}

.logo-container {
  width:300px;
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
    background: #7342bf;
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
    max-width: 100%;
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

</style>
