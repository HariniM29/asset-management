<template>
  <v-layout>
 
    <v-app-bar color="white" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile"></v-app-bar-nav-icon>
      <v-toolbar-title>Asset Management</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail && !isMobile"
      :temporary="isMobile"
      @click="isMobile && (drawer = false)" 
    >
      <!-- Header -->
      <v-list-item
         style="margin-left: 6px; margin-top: 12px; color: black"
        class="custom-active-color"
        prepend-avatar="../images/asset-page-logo-3.png"
        title="Asset Management"
      >
        <template v-slot:append>
          <v-btn
            v-if="!isMobile"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail" class="sidebar-chevron"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Navigation Links -->
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          @click="navigate('/dashboard-page')"
          :class="{ 'active-nav': currentRoute === '/dashboard-page' }"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi mdi-folder-multiple-plus-outline"
          title="Asset Page"
          @click="navigate('/asset-page')"
          :class="{
            'active-nav': currentRoute === '/asset-page' ||
            currentRoute.startsWith('/asset-page/'),
          }"
        ></v-list-item>
      </v-list>

      <!-- Logout -->
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        @click="logout"
        class="logout-nav"  style="color: #198754"
      ></v-list-item>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useDisplay } from 'vuetify';

const drawer = ref(true);
const rail = ref(false);
const router = useRouter();
const route = useRoute();
const { mobile } = useDisplay(); 
const isMobile = computed(() => mobile.value);
const currentRoute = computed(() => route.path);

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

<style scoped>

/* .active-nav .v-list-item-title,
.active-nav .v-icon {
  color: #2baf66 !important;
  font-weight: bold;
}


.logout-nav {
  position: absolute;
  bottom: 16px;
  color: #198754 !important;
} */
.v-list-item--active {
  background-color: transparent !important;
}
.v-list-item-title {
  color: #7b7f8b;
}

.active-nav .mdi-view-dashboard-outline {
  background-color: #e0f4e9 !important;
  color: #2baf66 !important;
  border-radius: 100%;
  font-size: 18px;
}
.active-nav .mdi-folder-multiple-plus-outline {
  background-color: #e0f4e9 !important;
  color: #2baf66 !important;
  border-radius: 100%;
  font-size: 18px;
}
.active-nav .mdi-file-search-outline {
  background-color: #e0f4e9 !important;
  color: #2baf66 !important;
  border-radius: 100%;
  font-size: 18px;
}
.active-nav .v-list-item-title {
  color: #2baf66 !important;
  font-weight: bold;
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
  font-size: 20px;
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
  font-size: 14px;
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
</style>
