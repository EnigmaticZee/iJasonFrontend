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
              <div class="item-content">
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
              <div class="item-content">
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
              <div class="item-content">
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
              <div class="item-content">
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
              <div class="item-content">
                Check Configuration
              </div>
            </div>
          </q-collapsible>
        </div>
    </div>
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
            }
        },


    }
</script>

<style></style>
