
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
  .no-images-message {
    font-size: 16px;
    color: #777;
    text-align: center;
    padding: 20px;
  }
  </style>
  
  
  
  
  
  