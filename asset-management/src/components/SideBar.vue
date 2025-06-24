<template>
  <v-layout>
  
    <v-app-bar  elevation="0" v-if="isMobile">
      <v-app-bar-nav-icon @click="drawer = !drawer" style="font-size: 15px;"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title style="font-size: 15px;">Asset Management</v-toolbar-title> -->
    </v-app-bar>

  
    <!-- <v-navigation-drawer
      v-model="drawer"
      :rail="rail && !isMobile"  
      :temporary="isMobile"  
      @click="isMobile && (drawer = false)"
      :permanent="!isMobile"
    > -->
    <!-- <v-navigation-drawer
      v-model="drawer"
      :rail="rail" 
      permanent
      @click="rail = false"
    > -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail && !isMobile"  
      :temporary="isMobile" 
      :permanent="!isMobile"
      @click="rail = false"
    >
     
      <v-list-item
        style="margin-left: -1px; margin-top: 12px; color: black"
        class="custom-active-color"
        prepend-avatar="../images/asset-page-logo-3.png"
        title="Asset Management"
      >
        <template v-slot:append>
     
          <v-btn
            v-if="!isMobile" 
            icon="mdi-chevron-left"
         
            class="sidebar-chevron"
              @click.stop="rail = !rail"
            
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

   
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          @click="navigate('/dashboard-page')"
          :class="{ 'active-nav': currentRoute === '/dashboard-page' }"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-folder-multiple-plus-outline"
          title="Asset Page"
          @click="navigate('/asset-page')"
          :class="{
            'active-nav': currentRoute === '/asset-page' ||
            currentRoute.startsWith('/asset-page/'),
          }"
        ></v-list-item>
      </v-list>

     
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        @click="logout"
        class="logout-nav" style="color: #198754"
      ></v-list-item>
    </v-navigation-drawer>

   
    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useDisplay } from 'vuetify';

const drawer = ref(true);
const rail = ref();  
const router = useRouter();
const route = useRoute();
const { mobile } = useDisplay(); 
const isMobile = computed(() => mobile.value);
const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
  rail.value = !rail.value;  
};

const navigate = (path: string) => {
  router.push(path);
  if (isMobile.value) drawer.value = false; 
};

const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    navigate('/login-page');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style>

.v-list-item--active {
  background-color: transparent !important;
}

.v-list-item-title {
  color: #7b7f8b;
}


.active-nav .mdi-view-dashboard-outline,
.active-nav .mdi-folder-multiple-plus-outline {
  background-color: #e0f4e9 !important;
  color: #2baf66 !important;
  border-radius: 100%;
  font-size: 18px;
}


.active-nav .v-list-item-title {
  color: #2baf66 !important;
  font-weight: bold;
}


.mdi-view-dashboard-outline.mdi,
.mdi-folder-multiple-plus-outline.mdi {
  padding: 10px;
  width: 30px;
  height: 30px;
  margin-left: -3px;
  font-size: 18px;
}
.active-nav .mdi-file-search-outline {
  background-color: #e0f4e9 !important;
  color: #2baf66 !important;
  border-radius: 100%;
  font-size: 18px;
}
.mdi-view-dashboard-outline.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  padding: 10px;
  width: 30px;
  height: 30px;
  margin-left: -3px;
  font-size: 18px;
}
.mdi.mdi-folder-multiple-plus-outline.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  padding: 10px;
  width: 30px;
  height: 30px;
  margin-left: -3px;
  font-size: 18px;
}
.mdi.mdi-file-search-outline.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  padding: 10px;
  width: 30px;
  height: 30px;
  margin-left: -3px;
  font-size: 18px;
}


.v-list-item.v-list-item--link.v-list-item--nav.v-list-item--density-compact.v-list-item--one-line.v-list-item--rounded.v-list-item--variant-text:hover {
  background-color: transparent !important;
  color: #2baf66;
}


.mdi-chevron-left::before {
  content: '\F0141';
  color: #2baf66 !important;
  font-size: 20px !important;
}
.v-btn--icon.v-btn--density-default {
    height: calc(var(--v-btn-height) + -7px);
    width: calc(var(--v-btn-height) + -6px);
    box-shadow: none !important;
}
.v-avatar.v-avatar--size-default {
    --v-avatar-height: 34px;
}
.sidebar-chevron .mdi-chevron-left:hover {
  content: '\F0141';
  color: #2baf66;
}

p {
  margin-top: 0;
  margin-bottom: 0 !important;
}

.v-list-item--nav .v-list-item-title {
  font-size: 14px !important;
  color: #000000b0;
}

.logout-nav {
  display: flex;
  position: absolute;
  bottom: 11px;
  font-size: 13px;
}

.v-list-item.v-list-item--link.v-theme--light.v-list-item--density-default.rounded-0.v-list-item--variant-text.logout-nav {
  display: flex;
  position: absolute;
  bottom: 11px;
  font-size: 13;
  color: #198754;
}
.mdi-menu::before {
    content: "\F035C";
    /* color: green; */
    color: white;
}
.v-toolbar__content{
  /* background-color: #2baf66a6; */
  background-color: #2baf66a6;
}



</style>
