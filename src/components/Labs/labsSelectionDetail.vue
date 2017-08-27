<template>
  <div class="layout-view">
    <!-- Tabs -->
    <q-tabs :refs="$refs" class="justified" default-tab="tab-1">

      <q-tab name="tab-1" icon="description">
        Tutorial Labs
      </q-tab>
      <q-tab name="tab-2" icon="dns">
        Extra Practice Labs
      </q-tab>

    </q-tabs>

    <!-- Targets -->
    <div ref="tab-1">
        <div class="list" v-for="t in tasks">
          <q-collapsible icon="description" :label="t.labTitle">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()" >
                Check Configuration
              </div>
            </div>
          </q-collapsible>
        </div>
    </div>


    <div ref="tab-2">
        <div class="list">
          <q-collapsible icon="description" label="Practice Lab 01">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 02">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 03">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
            <q-collapsible icon="description" label="Practice Lab 04">
            <div class="item" >
              <i class="item-primary">file_download</i>
              <div class="item-content">
                Download
              </div>
            </div>
            <div class="item" >
              <i class="item-primary">build</i>
              <div class="item-content" v-on:click="showDialog()">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
        </div>
    </div>
    <q-modal  ref="basicModal" :content-css="{minWidth: '50vw', minHeight: '50vh', background:'#eeeeee'}">
        <header class="modal-header">Configuration</header>
        <div id="modal-content">
            <div id="menu"class="row">
              <ul class="menu">
                <li class="menu__item menu__item--dropdown" v-on:click="toggle('ranking')" v-bind:class="{'open' : dropDowns.ranking.open}">
                  <a class="menu__link menu__link--toggle">
                      <span>Rooms></span>
                      
                  </a>

                  <ul class="dropdown-menu">
                      <li class="dropdown-menu__item">
                          <a class="dropdown-menu__link">328</a>
                      </li>

                      <li class="dropdown-menu__item">
                          <a class="dropdown-menu__link">329</a>
                      </li>

                      <li class="dropdown-menu__item">
                          <a class="dropdown-menu__link">330</a>
                      </li>
                  </ul>
                </li>
              </ul> 
            </div>    
            
        </div>
        <footer>
          <button color="primary" @click="$refs.basicModal.close()">Close</button>  
          <button color="primary">Get Feedback</button>  
        </footer>
    </q-modal>
  </div>
  
</template>

<script>
    
    export default {
        props: ['week','tasks'],
        data: function()
        {
            return {
                labTasks: [
                    {labID: 1, labTitle: 'Lab Task 1'},
                    {labID: 2, labTitle: 'Lab Task 2'},
                    {labID: 3, labTitle: 'Lab Task 3'},
                    {labID: 4, labTitle: 'Lab Task 4'},
                    {labID: 5, labTitle: 'Lab Task 5'},
                    {labID: 6, labTitle: 'Lab Task 6'},
                    {labID: 7, labTitle: 'Lab Task 7'},
                    {labID: 8, labTitle: 'Lab Task 8'},
                    {labID: 9, labTitle: 'Lab Task 9'},
                    {labID: 10, labTitle: 'Lab Task 10'},
                    {labID: 11, labTitle: 'Lab Task 11'},
                    {labID: 12, labTitle: 'Lab Task 12'},
                    {labID: 13, labTitle: 'Lab Task 13'},
                    {labID: 14, labTitle: 'Lab Task 14'},
                    {labID: 15, labTitle: 'Lab Task 15'},
                    {labID: 16, labTitle: 'Lab Task 16'},
                ],
                dropDowns: {
                  ranking: { open: false}  
              }
            }
            
        },
        methods: {
          showDialog: function (event) {
          
            return this.$refs.basicModal.open();
          },
          toggle: function(dropdownName) {
            this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
            
          }
          

        },
        components: {
         
        }

    }
</script>

<style>
  #modal-content {
    height: 45vh;
  }
  .modal-header {
    color: black;
  }

  ul {
    list-style: none;
  }

  .menu__item {
    position: relative;
    padding-right: 3rem;
  }
  .menu__link {
    color: red;
    text-transform: uppercase;
  }
  .menu__link:hover {
    color: gray;
  }
  .menu__icon {
    margin: 0 !important;
  }
  .open .dropdown-menu {
      display: block;
  }

  .dropdown-menu {
      font-size: 0.9rem;
      position: absolute;
      min-width: 130px;
      top: 2.2rem;
      display: none;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
  }

  .dropdown-menu__item:first-child .dropdown-menu__link {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
  }

  .dropdown-menu__item:last-child .dropdown-menu__link {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
  }

  .dropdown-menu__link {
      display: block;

      padding: 1rem;
      color: blue;
      background-color: #fafafa;
  }
  .dropdown-menu__link:hover {
          color: green;
          background-color: #ccc;
  }
</style>
