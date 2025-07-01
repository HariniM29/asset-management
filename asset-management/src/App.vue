<template>
   <div :style="showSidebar ? 'display: flex; padding: 0; margin: 0;' : ''">
  <SideBar v-if="showSidebar"></SideBar>
  <RouterView></RouterView>
</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';
import { ref, watch } from 'vue';

const route = useRoute();
const showSidebar = ref(true);

watch(
  () => route.fullPath,
  () => {
    showSidebar.value = !route.meta?.hideSidebar;
  },
  { immediate: true }
);
</script>
