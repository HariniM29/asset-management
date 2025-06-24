<template>
    <!-- Modal content (conditionally rendered based on open prop) -->
    <div v-if="open" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="form-header" style="display: flex; justify-content: space-between; align-items: center;">
          <v-card-title>{{ isEditMode ? 'Edit Asset' : 'Create Asset' }}</v-card-title>
          <v-icon @click="closeModal">mdi mdi-close</v-icon>
        </div>
  
        
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 0.6rem;">
          <div style="margin-right: 10px;">
            <label class="form-label">Asset Name <span style="color: #cf1c1c">*</span></label>
            <v-text-field
              class="form-input"
              v-model="form.assetName"
              density="compact"
              variant="solo"
              hide-details
              single-line
              flat
              :rules="[requiredRule]"
            />
          </div>
          <div>
            <label class="form-label">Asset Number <span style="color: #cf1c1c">*</span></label>
            <v-text-field
              class="form-input"
              v-model="form.assetId"
              density="compact"
              variant="solo"
              hide-details
              single-line
              flat
              :rules="[requiredRule]"
              :disabled="isEditMode"
            />
          </div>
        </div>
  
        <!-- Other form fields -->
        <div style="margin-top: 10px; display: flex; flex-direction: row; justify-content: space-between;">
          <div>
            <label class="form-label">Asset Category</label>
            <v-select
              v-model="form.assetCategory"
              :items="assetCategories"
              class="form-input"
              label="Asset Category"
              density="compact"
              variant="solo"
              hide-details
              single-line
              flat
            />
          </div>
          <div>
            <label class="form-label">Asset Status <span style="color: #cf1c1c">*</span></label>
            <v-select
              v-model="form.assetStatus"
              :items="assetStatus"
              class="form-input"
              label="Asset Status"
              density="compact"
              variant="solo"
              hide-details
              single-line
              flat
            />
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <v-btn @click="closeModal" color="secondary">Cancel</v-btn>
          <v-btn @click="saveAsset" color="primary">Save Asset</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  // Define props and emit events for visibility control
  const props = defineProps({
    open: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:open']);  // Emit event to close modal
  
  // Form state
  const form = ref({
    assetName: '',
    assetId: '',
    assetCategory: '',
    assetStatus: '',
    modelName: '',
    assetModelnumber: '',
  });
  
  const isEditMode = ref(false); // Set to true if editing, false if creating
  
  // Example data for asset categories and status
  const assetCategories = ['Hardware', 'Software', 'Furniture'];
  const assetStatus = ['Active', 'Inactive', 'Maintenance'];
  
  // Validation rule
  const requiredRule = (value: any) => !!value || 'This field is required';
  
  // Close the modal
  const closeModal = () => {
    emit('update:open', false); // Emit update:open event to close modal
  };
  
  // Save the asset (you can add API call or store update logic here)
  const saveAsset = () => {
    console.log('Saving asset:', form.value);
    // Handle saving the asset (API call, store update, etc.)
    closeModal();  // Close the modal after saving
  };
  
  // Emit visibility changes
  const onInput = (value: boolean) => {
    emit('update:open', value); // Emit updated modal visibility state
  };
  </script>
  
  <style scoped>
  /* Custom Modal Styles */
  .custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .custom-modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    text-align: center;
  }
  
  .form-label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
  }
  
  .v-btn {
    margin-top: 10px;
  }
  </style>
  