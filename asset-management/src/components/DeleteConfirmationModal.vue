<template>
  
    <div v-if="open" class="custom-modal-overlay">
      <div class="custom-modal">
        <!-- Modal Content -->
        <div class="delete-section">
          <v-icon>mdi mdi-trash-can-outline</v-icon>
        </div>
  
        <v-card-text class="delete-title">
          Are you sure you want to delete this asset  
        </v-card-text>
  
        <div class="delete-section-buttons" style="display: flex; justify-content: center">
          <v-card-actions style="padding: 10px">
            <v-btn @click="closeModal" class="cancel-button">No</v-btn>
            <v-btn @click="confirmDelete" class="delete-button">Yes</v-btn>
          </v-card-actions>
        </div>
      </div>
    </div>

    <!-- <DeleteConfirmationModal
      v-model:open="isDeleteModalOpen"
      :assetId="deleteAssetId"
      @deleteConfirmed="handleDelete"
    /> -->
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define props for modal visibility and asset ID
  const props = defineProps({
    open: {
      type: Boolean,
      required: true,
    },
    assetId: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:open', 'deleteConfirmed']);  // Emit events for closing modal and confirming deletion
  
  // Close the modal
  const closeModal = () => {
    emit('update:open', false);  // Emit update:open event to close modal
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    emit('deleteConfirmed', props.assetId);  // Emit deleteConfirmed event with the assetId
    closeModal();  // Close the modal after confirming
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
    max-width: 400px;
    text-align: center;
  }
  
  .delete-section {
    font-size: 27px;
    color: grey;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .delete-title {
    font-size: 16px;
    margin-top: 10px;
  }
  
  .delete-section-buttons {
    display: flex;
    justify-content: center;
  }
  
  .cancel-button {
    border: 1px solid #8080801a;
    width: 79px;
    background-color: #80808014;
    font-size: 13px;
    color: #5b636f;
    margin-right: 0.5rem;
    border-radius: 7px;
  }
  
  .delete-button {
    border: 1px solid #8080801a;
    width: 79px;
    font-size: 13px;
    color: white;
    background-color: #c91f1c;
    border-radius: 7px;
  }
  </style>
  