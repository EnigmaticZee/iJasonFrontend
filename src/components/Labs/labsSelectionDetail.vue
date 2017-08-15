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
        <div class="list">
          <q-collapsible icon="description" label="Tutorial Lab 01">
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
            <q-collapsible icon="description" label="Tutorial Lab 02">
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
            <q-collapsible icon="description" label="Tutorial Lab 03">
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
            <q-collapsible icon="description" label="Tutorial Lab 04">
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

<script></script>

<style></style>
