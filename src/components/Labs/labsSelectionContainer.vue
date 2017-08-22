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
          <a>
            <i>home</i> Units
          </a>
        </li>

        <li>
          <a>
            <i>mail</i> Labs
          </a>
        </li>
      </ul>
    </div>
    </q-tabs>
      

    <q-drawer ref="leftDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Semester Week   
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="view_week" to="/labsSelecntion" exact>
          Week 1 
        </q-drawer-link>
          <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/labsSelectionDetail">
          Week 2
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/tabs">
          Week 3
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 4
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 5
        </q-drawer-link>
           <hr>
         <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 6
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 7
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 8
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 9
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 10
        </q-drawer-link>
           <hr>
        <q-drawer-link icon="view_week" to="/showcase/layout/drawer">
          Week 11
        </q-drawer-link>
           <hr>
     
      </div>
    </q-drawer>

    <router-view class="layout-view">
    
    </router-view>

    <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Right-side Drawer
        </q-toolbar-title>
      </div>
    </q-drawer>
    
      
    
      
    <labsSelectionDetail/>
    
    <div slot="footer" class="toolbar">
      <div class="auto flex justify-center within-iframe-hide">
        iJason - Virtual Labs for Networking Students
      </div>
      <q-toolbar-title :padding="0" class="within-iframe-only">
        Footer
      </q-toolbar-title>
    </div>
      
    <labs></labs>
  </q-layout>
</template>

<script>
    import LabsSelection from './labsSelectionDetail.vue';
    
    export default {
        components: {
            'labs':LabsSelection
        }
    }
</script>

<style>

    
</style>


