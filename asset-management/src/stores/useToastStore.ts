
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toastNoAccess = ref('');
  const toastType = ref(''); 

 
  const setToastMessage = (message: string, type: 'success' | 'error' |'warn' = 'success') => {
    toastNoAccess.value = message;
    toastType.value = type; 
    setTimeout(() => {
      toastNoAccess.value = '';  
      toastType.value = '';  
    }, 3000);
  };

  return { toastNoAccess, toastType, setToastMessage };
});
