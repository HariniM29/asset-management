<template>
    <v-data-table
      :headers="headers"
      :items="filteredAssets"
      :item-value="item => `${item.assetName}-${item.assetId}`"
      item-key="assetId"
      :search="search"
      :items-per-page="10"
      :disable-sort="true"
      :fixed-header="true"
      class="custom-table"
      show-select
      :show-current-page="true"
    >
      <!-- <template v-slot:[`data-table-select`]="{ props }">
        <v-checkbox v-bind="props" :ripple="false" />
      </template> -->
  

      <template v-slot:[`item.assetName`]="{ item }: { item: Asset }">
        <router-link :to="`/asset-page/${item.assetId}`" class="asset-link">
          {{ item.assetName }}
        </router-link>
      </template>
  
   
      <template v-slot:[`item.assetStatus`]="{ item }: { item: Asset }">
        <span :class="statusClass(item.assetStatus)">
          {{ item.assetStatus }}
        </span>
      </template>
  
   
      <template v-slot:[`item.actions`]="{ item }: { item: Asset }">
        <v-btn icon style="width: 31px; height: 30px" flat class="manipulation-container" @click="openEditModal(item)" >
          <v-icon  class="manipulation-icons">
            mdi mdi-pencil-outline
          </v-icon>
        </v-btn>
        <v-btn icon style="width: 31px; height: 30px" flat class="manipulation-container" @click="confirmDelete(item.assetId)">
          <v-icon class="manipulation-icons">
            mdi mdi-delete-outline
          </v-icon>
        </v-btn>
        <v-btn icon style="width: 31px; height: 30px" flat class="manipulation-container" @click="viewAsset(item.assetId)">
          <v-icon  class="manipulation-icons">
            mdi-eye-outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  // Define the type for each asset
  interface Asset {
    assetId: string;
    assetName: string;
    assetStatus: string;
 
  }
  
  //props
  const props = defineProps({
    headers: {
      type: Array as () => Header[],  
      required: true,
    },
    filteredAssets: {
      type: Array as () => Asset[],  
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
    statusClass: {
      type: Function,
      required: true,
    },
    openEditModal: {
      type: Function,
      required: true,
    },
    confirmDelete: {
      type: Function,
      required: true,
    },
    viewAsset: {
      type: Function,
      required: true,
    },
  });
  

  interface Header {
    text: string;
    value: string;
    sortable?: boolean;
  }
  </script>
  
  <style scoped>
  .custom-table {
    min-height: 568px;
  }
  </style>
  