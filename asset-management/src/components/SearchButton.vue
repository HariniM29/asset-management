<template>
    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search templates"
      variant="solo"
      hide-details
      single-line
      flat
      :value="modelValue"
      @input="onInput"
    ></v-text-field>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define props
  defineProps({
    modelValue: {
      type: String,
      required: true,
    },
  });
  
  // Define emits
  const emit = defineEmits(['update:modelValue']);
  
  // Emiting the updated value when input changes
  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
  </script>
  