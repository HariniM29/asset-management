<template>
  <div class="asset-section">
    <div class="asset-container">
      <div class="section-1">
        <div class="image-section">
          <div v-if="asset?.assetImage && asset?.assetImage.length > 0" class="text-center image-container">
            <!-- Carousel -->
            <v-carousel
              v-model="currentSlide"
              hide-delimiters
              show-arrows="false"
              style="height: 283px"
            >
              <v-carousel-item
                v-for="(image, index) in asset?.assetImage"
                :key="index"
                :src="image"
                style="border-radius: 8px; padding: 30px"
              ></v-carousel-item>
            </v-carousel>

            <!-- Thumbnail Section with Custom Navigation -->
            <div
              class="thumbnail-section"
              style="display: flex; align-items: center; justify-content: center; margin-top: 10px;"
            >
              <!-- Thumbnails -->
              <div class="thumbnail-list" style="display: flex;">
                <img
                  v-for="(image, index) in asset?.assetImage"
                  :key="'thumb-' + index"
                  :src="image"
                  @click="currentSlide = index"
                  :style="{
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                    border: currentSlide === index ? '2px solid blue' : '1px solid gray',
                    borderRadius: '4px',
                    margin: '0 5px',
                    objectFit: 'cover'
                  }"
                  alt="Thumbnail"
                />
              </div>
            </div>
          </div>

          <!-- Show message when no images are available -->
          <div v-else class="no-images-message">
            No images available
          </div>
        </div>
        <div class="asset-details">
          <div class="asset-title-id">
            <div class="asset-title-section">{{ asset?.assetName }}</div>
            <div class="asset-id-section">
              <span class="asset-id-label">Asset Id</span>
              <span class="asset-id-value"> {{ asset?.assetId }}</span>
            </div>
          </div>
          <div class="asset-desc">{{ asset?.assetDesc }}</div>
          <div class="status">
            <p :class="['status-label', asset?.assetStatus?.toLowerCase()]">
              {{ asset?.assetStatus }}
            </p>
          </div>
          <div class="asset-allocated-category">
            <div class="asset-allocated-section">
              <span class="allocated-to-label">
                <v-icon>mdi mdi-account-outline</v-icon>Allocated To:
              </span>
              <span class="allocated-to-value">{{ asset?.assetAllocatedto }}</span>
            </div>
            <div class="asset-category-section">
              <span class="category-label">
                <v-icon>mdi mdi-tag-multiple-outline</v-icon>Asset Category:
              </span>
              <span class="category-value">{{ asset?.assetCategory }}</span>
            </div>
          </div>
          <div class="cost-category-section">
            <div class="asset-cost">
              <span class="cost-label">
                <v-icon>mdi mdi-currency-usd</v-icon>Asset Cost:
              </span>
              <span class="cost-value">{{ asset?.assetCost }}</span>
            </div>
            <div class="asset-quantity">
              <span class="quantity-label">
                <v-icon>mdi mdi-cube-outline</v-icon>Asset Quantity:
              </span>
              <span class="quantity-value">{{ asset?.assetQuantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-2">
        <div class="model-details">
          <p class="model-title">Model Details : </p>
          <div class="model-name">
            <span class="quantity-label">
              <v-icon>mdi mdi-pound</v-icon>Model Name
            </span>
            <span class="cost-value"> {{ asset?.modelName }}</span>
          </div>
          <div class="model-number">
            <span class="quantity-label">
              <v-icon>mdi mdi-pound</v-icon>Model Number
            </span>
            <span class="cost-value">{{ asset?.assetModelnumber }}</span>
          </div>
        </div>
        <div class="date-section">
          <p class="model-title">Important Dates</p>
          <div class="dates-cards">
            <div class="purchase-date">
              <span class="quantity-label">
                <v-icon>mdi mdi-calendar-range</v-icon>Purchase Date
              </span>
              <span> {{ asset?.purchaseDate }}</span>
            </div>
            <div class="recovery-date">
              <span class="quantity-label">
                <v-icon>mdi mdi-calendar-range</v-icon>Recovery Date
              </span>
              <span>{{ asset?.assetRecoveredDate }}</span>
            </div>
          </div>
          <div class="maintenance-date">
            <span class="quantity-label">
              <v-icon>mdi mdi-calendar-range</v-icon>Maintenance Date
            </span>
            <span>{{ asset?.assetLastMaintainanceDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAssetsStore, Asset } from '@/stores/useAssetsStore';

const route = useRoute();
const assetsStore = useAssetsStore();
const assetId = route.params.assetId as string;

const asset = computed(() =>
  assetsStore.assets.find((a: Asset) => a.assetId === assetId)
);
const currentSlide = ref(0);
</script>

<style scoped>
.asset-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f5f6f8;
  height: 100vh;
  padding: 3rem;
}

.asset-container {
  background-color: white;
  height: 86vh;
  width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0px 1px rgb(184 199 210);
}
.image-container {
  width: 24rem;
  height: 17rem;
  /* background-color: aliceblue; */
  border-radius: 1rem;
  box-shadow: 0 0px 1px rgb(184 199 210);
}
.v-window.v-theme--light.v-carousel {
  height: 269px !important;
}
.asset-details {
  /* background-color: aliceblue; */
  margin-left: 1rem;
  padding: 0.5rem;
}
.section-1 {
  display: flex;
  flex-direction: row;
}
.asset-title-id {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.asset-id-label {
  font-size: 15px;
  color: #2baf66;
  margin-right: 1rem;
}
.asset-allocated-category {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
}
.cost-category-section {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-between;
  margin-left: -8px;
}
.asset-title-section {
  color: grey;
  font-size: 1.5rem;
  font-weight: 500;
}
.asset-id-value {
  color: grey;
  font-weight: 600;
  font-size: 18px;
}
.asset-desc {
  margin-top: 1rem;
  font-size: 16px;
  color: grey;
}
.allocated-to-label {
  font-size: 15px;
  color: #2baf66;
  margin-right: 1rem;
}
.allocated-to-value {
  color: #585656;
  font-size: 16px;
}
.asset-allocated-section {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.mdi-account-outline::before {
  content: '\F0013';
  margin-bottom: 5px;
  margin-right: 1rem;
}
.category-label {
  font-size: 15px;
  color: #2baf66;
  margin-right: 1rem;
}
.mdi-tag-multiple-outline::before {
  content: '\F12F7';
  margin-right: 1rem;
}
.category-value {
  color: #585656;
  font-size: 16px;
}
.cost-label {
  font-size: 15px;
  color: #2baf66;
  margin-right: 1rem;
}
.quantity-label {
  font-size: 15px;
  color: #2baf66;
  margin-right: 1rem;
}
.mdi-cube-outline::before {
  content: '\F01A7';
  margin-right: 2rem;
}
.asset-quantity {
  margin-right: 3rem;
}
.cost-value {
  color: #585656;
  font-size: 16px;
}
.quantity-value {
  color: #585656;
  font-size: 16px;
}
.asset-id-section {
  border: 1px solid #2baf66;
  padding: 0.3rem;
  border-radius: 7px;
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

/*styles for section 2 */
.section-2 {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  /* background-color: aliceblue; */
  height: 16rem;
}
.mdi-calendar-range::before {
    content: "\F0679";
    margin-right: 0.5rem;
}
/* 
.model-details{
  margin:1.5rem;
  width:20rem;
  height:13rem;
  
  box-shadow: 0 0 2px rgb(205 222 237);
  border-radius:10px;
  background-color: #f5f6f8;
} */
.date-section {
  /* margin: 1.5rem;
  width: 20rem;
  height: 13rem; */
  /* background-color: white; */
  /* box-shadow: 0 0 2px rgb(205 222 237); */
  /* border-radius: 10px; */
  /* background-color: #f5f6f8; */
  margin-left:5rem;
}
.model-title {
  color: grey;
  font-size: 16px;
}
.no-images-message {
    font-size: 16px;
    color: #777;
    text-align: center;
    padding: 20px;
  }
.model-name {
  width: 227px;
  height: 72px;
  /* background-color: aliceblue; */
  border-radius: 10px;
  border: #2baf66 1px solid;
  display: flex;
  align-items: center;
  /* padding: 14px; */
  margin-top: 1rem;
  padding: 5px;
}

.model-number {
  width: 227px;
  height: 72px;
  /* background-color: aliceblue; */
  border-radius: 10px;
  border: #2baf66 1px solid;
  display: flex;
  align-items: center;
  /* padding: 14px; */
  margin-top: 1rem;
  padding: 5px;
}
.model-details {
  margin-right: 8rem;
}
.purchase-date {
  width: 250px;
  height: 72px;
  box-shadow: 0 0 2px rgb(205 222 237);
  margin-right:3rem;
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  padding:10px;
  background-color: #abeac742;
  border-radius: 10px;

}
.recovery-date {
  width: 250px;
  height: 72px;
  box-shadow: 0 0 2px rgb(205 222 237);
  margin-right:3rem;
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  padding:10px;
  background-color: #abeac742;
  border-radius: 10px;

}
.maintenance-date {
  /* width: 250px; */
  height: 72px;
  box-shadow: 0 0 2px rgb(205 222 237);
  margin-right:3rem;
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  padding:10px;
  background-color: #abeac742;
  border-radius: 10px;
  width: 267px;
  margin-left: 12rem;
}

.dates-cards{
  display: flex;
  flex-direction: row;
  margin-top:1rem;
  margin-left: 3rem;
  
  
}
</style>
