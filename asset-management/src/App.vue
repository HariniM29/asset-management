<template>
   <div :style="showSidebar ? 'display: flex; padding: 0; margin: 0;' : ''">
  <SideBar v-if="showSidebar"></SideBar>
  <RouterView></RouterView>
</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';
import { computed } from 'vue';
const route = useRoute();
const showSidebar = computed(() => !route.meta.hideSidebar);
</script>
