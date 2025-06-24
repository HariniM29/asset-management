<template>
  <!-- Asset Details container -->
  <div class="asset-section">
    <!-- Asset details section with image,id,category and status -->
    <div class="section-1">
      <!-- Asset image section -->
      <div v-if="asset?.assetImage" class="text-center my-4 image-container">
        <v-carousel hide-delimiters style="height: 214px">
          <v-carousel-item
            v-for="(image, index) in asset.assetImage"
            :key="index"
            :src="image"
            style="border-radius: 8px; padding: 30px"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <!-- Asset status section -->
      <div class="status">
        <p :class="['status-label', asset?.assetStatus?.toLowerCase()]">
          <!--dynamically binding the class for the status--->
          {{ asset?.assetStatus }}
        </p>
      </div>
      <!--Asset Id section-->
      <div class="asset-Id-section">
        <div style="display: flex; align-items: center">
          <v-icon style="color: #6e7583; font-size: 18px; margin-right: 10px"
            >mdi mdi-cube-outline</v-icon
          >
          <p style="color: #6e7583; font-size: 14px">Asset Id</p>
        </div>
        <div>
          <p
            style="
              color: rgb(69 69 69);
              font-size: 13px;
              margin-left: 15px;
              padding: 10px;
            "
          >
            {{ asset?.assetId }}
          </p>
        </div>
      </div>
      <!--Asset allocated to section-->
      <div class="Allocated-to-section">
        <div style="display: flex; align-items: center">
          <v-icon style="color: #6e7583; font-size: 18px; margin-right: 10px"
            >mdi mdi-account-outline</v-icon
          >
          <p style="color: #6e7583; font-size: 14px">Allocated to</p>
        </div>
        <div>
          <p
            style="
              color: rgb(69 69 69);
              font-size: 13px;
              margin-left: 15px;
              padding: 10px;
            "
          >
            {{ asset?.assetAllocatedto }}
          </p>
        </div>
      </div>
      <!--Asset Category section-->
      <div class="Category">
        <div style="display: flex; align-items: center">
          <v-icon style="color: #6e7583; font-size: 18px; margin-right: 10px"
            >mdi mdi-tag-multiple-outline</v-icon
          >
          <p style="color: #6e7583; font-size: 14px">Asset Category</p>
        </div>
        <div>
          <p
            style="
              color: rgb(69 69 69);
              font-size: 13px;
              padding: 10px;
              margin-left: 15px;
            "
          >
            {{ asset?.assetCategory }}
          </p>
        </div>
      </div>
    </div>

    <!-- Asset model and date section -->
    <div class="section-2">
      <div class="detailed-section">
        <!-- Asset Name and Description -->
        <div class="details-1">
          <div class="asset-name">
            <p style="color: rgb(69 69 69); font-size: 20px; font-weight: 600">
              {{ asset?.assetName }}
            </p>
          </div>
          <div class="asset-desc">
            <p style="color: #6e7583; font-size: 14px">
              {{ asset?.assetDesc }}
            </p>
          </div>
        </div>

        <!-- Model and Date -->
        <div class="details-2">
          <div class="model">
            <!-- Model name section-->
            <div class="model-name">
              <div style="display: flex; align-items: center">
                <v-icon
                  style="color: #6e7583; font-size: 18px; margin-right: 10px"
                  >mdi mdi-pound</v-icon
                >
                <p style="color: #6e7583; font-size: 14px">Model Name</p>
              </div>
              <div>
                <p
                  style="
                    color: rgb(69 69 69);
                    font-size: 13px;
                    padding: 10px;
                    margin-left: 15px;
                  "
                >
                  {{ asset?.modelName }}
                </p>
              </div>
            </div>
            <!-- Model number section -->
            <div class="model-number">
              <div style="display: flex; align-items: center">
                <v-icon
                  style="color: #6e7583; font-size: 18px; margin-right: 10px"
                  >mdi mdi-pound</v-icon
                >
                <p style="color: #6e7583; font-size: 14px">Model Number</p>
              </div>
              <div>
                <p
                  style="
                    color: rgb(69 69 69);
                    font-size: 13px;
                    padding: 10px;
                    margin-left: 15px;
                  "
                >
                  {{ asset?.assetModelnumber }}
                </p>
              </div>
            </div>
          </div>
          <!-- Asset price details section -->
          <div class="asset-price">
            <!-- Asset cost section -->
            <div class="asset-cost">
              <div style="display: flex; align-items: center">
                <v-icon
                  style="color: #6e7583; font-size: 18px; margin-right: 10px"
                  >mdi mdi-currency-usd</v-icon
                >
                <p style="color: #6e7583; font-size: 14px">Asset Cost</p>
              </div>
              <div>
                <p
                  style="
                    color: rgb(69 69 69);
                    font-size: 13px;
                    padding: 10px;
                    margin-left: 15px;
                  "
                >
                  {{ asset?.assetCost }}
                </p>
              </div>
            </div>
            <!-- Asset quantity section -->
            <div class="asset-quantity">
              <div style="display: flex; align-items: center">
                <v-icon
                  style="color: #6e7583; font-size: 18px; margin-right: 10px"
                  >mdi mdi-cube-outline</v-icon
                >
                <p style="color: #6e7583; font-size: 14px">Asset Quantity</p>
              </div>
              <div>
                <p
                  style="
                    color: rgb(69 69 69);
                    font-size: 13px;
                    padding: 10px;
                    margin-left: 15px;
                  "
                >
                  {{ asset?.assetQuantity }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Asset date details -->
      <div class="date-section">
        <div>
          <p style="color: rgb(69 69 69); font-size: 15px; font-weight: 500">
            Important Dates
          </p>
        </div>
        <div class="dates">
          <!-- Asset purchase date section -->
          <div class="purchase-date">
            <div style="display: flex; align-items: center">
              <v-icon
                style="color: #6e7583; font-size: 18px; margin-right: 10px"
                >mdi mdi-calendar-range</v-icon
              >
              <p style="color: #6e7583; font-size: 14px">Purchase Date</p>
            </div>
            <div>
              <p
                style="
                  color: rgb(69 69 69);
                  font-size: 13px;
                  margin-left: 15px;
                  padding: 10px;
                "
              >
                {{ asset?.purchaseDate }}
              </p>
            </div>
          </div>
          <!-- Asset recovery date section -->
          <div class="recovery-date">
            <div style="display: flex; align-items: center">
              <v-icon
                style="color: #6e7583; font-size: 18px; margin-right: 10px"
                >mdi mdi-calendar-range</v-icon
              >
              <p style="color: #6e7583; font-size: 14px">Recovery Date</p>
            </div>
            <div>
              <p
                style="
                  color: rgb(69 69 69);
                  font-size: 13px;
                  margin-left: 15px;
                  padding: 10px;
                "
              >
                {{ asset?.assetRecoveredDate }}
              </p>
            </div>
          </div>
          <!-- Asset maintenance date section -->
          <div class="maintenance-date">
            <div style="display: flex; align-items: center">
              <v-icon
                style="color: #6e7583; font-size: 18px; margin-right: 10px"
                >mdi mdi-calendar-range</v-icon
              >
              <p style="color: #6e7583; font-size: 14px">Maintainance Date</p>
            </div>
            <div>
              <p
                style="
                  color: rgb(69 69 69);
                  font-size: 13px;
                  margin-left: 15px;
                  padding: 10px;
                "
              >
                {{ asset?.assetLastMaintainanceDate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAssetsStore, Asset } from '@/stores/useAssetsStore';

const route = useRoute();
const router = useRouter();
const assetsStore = useAssetsStore();
const assetId = route.params.assetId as string;

const asset = computed(() =>
  assetsStore.assets.find((a: Asset) => a.assetId === assetId)
);

// const items=asset.assetImage

// function goBack() {
//   router.back();

// }
</script>

<style scoped>
.v-carousel__controls {
  height: 30px !important;
  width: 30px !important;
}

.v-carousel__controls .v-btn {
  height: 24px !important;
  width: 24px !important;
  border-radius: 50% !important;
  box-shadow: none !important;
  background-color: rebeccapurple;
}

.v-carousel__controls .v-btn .v-btn__content {
  font-size: 16px !important; /* Adjust icon size */
}

.asset-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f5f6f8;
  height: 100vh;
  padding: 3rem;
}

.section-1 {
  margin-right: 36px;
  /* height:38rem; */
  height: 39rem;
  /* width:21rem; */
  width: 33rem;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 14px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.section-2 {
  width: 100%;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

/* General status batch styles */
.status-label {
  border-radius: 11px;
  text-align: center;
  display: inline-block;
  margin-top: 1rem;
  width: 110px;
  margin-bottom: 1rem;
}

.active {
  color: green;
  border: 1px solid green;
  background-color: #00800026;
  opacity: 0.7;
  box-shadow: 0 0 2px rgb(205 222 237);
  font-size: 13px;
  padding-bottom: 2px;
  padding-top: 2px;
}

.inactive {
  color: gray;
  border: 1px solid grey;
  background-color: #80808024;
  opacity: 0.7;
  box-shadow: 0 0 2px rgb(205 222 237);
  font-size: 13px;
  padding-bottom: 2px;
  padding-top: 2px;
}

.maintenance {
  color: orange;
  border: 1px solid orange;
  background-color: #ffa50026;
  font-size: 13px;
  box-shadow: 0 0 2px rgb(205 222 237);
  opacity: 0.7;
  padding-bottom: 2px;
  padding-top: 2px;
}

/*image styles including carosoul*/

.image-container {
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 0 2px rgb(179 183 210);
}
.v-img__img--contain {
  -o-object-fit: contain;
  object-fit: contain;
  width: 185px !important;
  margin-left: 15px !important;
}
.v-window-item.v-window-item--active.v-carousel-item {
  padding: 16px;
}

.v-btn.v-btn--elevated.v-btn--icon.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated.v-window__right {
  height: none !important;
  width: none !important;
  background-color: red;
  outline: none !important;
}
.mdi-chevron-right::before {
  content: '\F0142';
  margin-top: 2px;
  color: #2baf66 !important;
}
.v-btn--icon.v-btn--density-default {
  height: calc(var(--v-btn-height) + 12px);
  width: calc(var(--v-btn-height) + 12px);
  box-shadow: none !important;
}
.v-btn--icon.v-btn--size-default {
  --v-btn-size: 4rem !important;
  color: #2baf66 !important;
}
.mdi-chevron-left.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  font-size: 10px;
}

.asset-Id-section {
  box-shadow: 0 0 2px rgb(179 183 210);
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 11px;
  /* width: 260px; */
  height: 80px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  /* margin-left:10px; */
  margin-right: 10px;
  margin-left: 22px;
  width: 300px;
}
.Allocated-to-section {
  box-shadow: 0 0 2px rgb(179 183 210);
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 11px;
  /* width: 260px; */
  width: 300px;
  height: 80px;
  margin-bottom: 1rem;
  margin-left: 22px;
  margin-right: 10px;
}

.Category {
  box-shadow: 0 0 2px rgb(179 183 210);
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  width: 260px;
  padding: 15px;
  border-radius: 11px;
  height: 80px;
  width: 300px;
  /* margin-left:10px; */
  margin-left: 22px;
  margin-right: 10px;
}

/* styles for detailed section contains model details and date */
.detailed-section {
  height: 20rem;
  margin-bottom: 34px;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 14px;
  background-color: white;
  /* padding:25px; */
  width: 47rem;
  padding: 19px;
}
.date-section {
  height: 15rem;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 14px;
  background-color: white;
  width: 47rem;
  padding: 19px;
}

.details-2 {
  display: flex;
  flex-direction: column;
}

/*styles  for model details and date */
.model {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 20px;
}

/* styles for asset price */
.asset-price {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 36px;
}

/* styles for asset cost container */
.asset-cost {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
}

/* styles for asset quantity container */
.asset-quantity {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
}

/* styles for model name container */
.model-name {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
}

/* styles for asset number container */
.model-number {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
}

/* styles for date section */
.date-section {
  display: flex;
  flex-direction: column;
  padding: 25px;
}

/* date section */
.dates {
  display: flex;
  flex-direction: row;
  padding: 45px;
  justify-content: space-evenly;
}

/* styles for purchase date container */
.purchase-date {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
  margin-right: 3rem;
}

/* styles for recovery date container */
.recovery-date {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
  margin-right: 3rem;
}

/* styles for maintenance date container */
.maintenance-date {
  background-color: #f9fafb;
  box-shadow: 0 0 2px rgb(179 183 210);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 10px;
}
</style>
