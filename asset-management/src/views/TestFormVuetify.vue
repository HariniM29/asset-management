<template>
  <div class="dashboard-container">
    <!--Dashboard title section-->
    <div class="dashboard-title-container">
      <div class="asset-logo">
        <v-icon color="green">mdi mdi-cube-outline</v-icon>
      </div>
      <div><p>DashBoard Overview</p></div>
    </div>

    <!--Assets cards-->
    <div class="assets-cards-container">
      <div class="assetsCard">
        <div class="asset-logo-card"><v-icon>mdi mdi-cube-outline</v-icon></div>
        <div class="AssetTitle">
          <div class="cardTitle"><p>Total Assets</p></div>
          <div class="value">
            <p>{{ totalAssets }}</p>
          </div>
        </div>
      </div>
      <div class="assetsCard">
        <div class="asset-logo-card">
          <v-icon>mdi mdi-tag-multiple-outline</v-icon>
        </div>
        <div class="AssetTitle">
          <div class="cardTitle"><p>Total Categories</p></div>
          <div class="value">
            <p>{{ totalCategories }}</p>
          </div>
        </div>
      </div>
      <div class="assetsCard">
        <div class="asset-logo-card"><v-icon style="font-size: 19px;;">mdi mdi-currency-inr</v-icon></div>
        <div class="AssetTitle">
          <div class="cardTitle"><p>Total Assets Cost</p></div>
          <div class="value">
            <p>₹ {{ totalCost }}.00</p>
          </div>
        </div>
      </div>
      <div class="assetsCard">
        <div class="asset-logo-card">
          <v-icon style="font-size: 20px">mdi mdi-file-check-outline</v-icon>
        </div>
        <div class="AssetTitle">
          <div class="cardTitle"><p>Total Active Assets</p></div>
          <div class="value">
            <p>{{ totalActiveAssets }}</p>
          </div>
        </div>
      </div>
      <div class="assetsCard">
        <div class="asset-logo-card">
          <v-icon style="font-size: 20px">mdi mdi-file-alert-outline</v-icon>
        </div>
        <div class="AssetTitle">
          <div class="cardTitle"><p>Total Inactive Assets</p></div>
          <div class="value">
            <p>{{ totalInactiveAssets }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="graph-table-section">
      <div class="graph-2">
        <!-- <BarChart></BarChart> -->
        <BarChartPurchaseDate></BarChartPurchaseDate>
      </div>

      <div style="display: flex; flex-direction: column; margin-top: 1rem">
        <div class="graph-1">
          <!-- <h1>Status</h1> -->

          <!-- <DoughnutChart></DoughnutChart> -->
          <PieChart></PieChart>
        </div>
        <div class="table-1" style="margin-bottom: 3rem">
          <div class="status-table">
            <v-data-table
              :headers="headers"
              :items="filteredAssets"
              item-key="assetId"
              :search="search"
              :items-per-page="2"
              style="box-shadow: 0 0px 2px rgb(184 199 210); height: 174px"
              :disable-sort="true"
              :fixed-header="true"
              :hide-default-footer="true"
              height="600px;"
              class="custom-status-table"
            >
              <template v-slot:[`item.assetStatus`]="{ item }">
                <span :class="statusClass(item.assetStatus)">
                  {{ item.assetStatus }}
                </span>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAssetsStore } from '@/stores/useAssetsStore';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import BarChart from '@/components/BarChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import BarChartPurchaseDate from '@/components/BarChartPurchaseDate.vue';
import PieChart from '@/components/PieChart.vue';
// const router = useRouter();
// const assetsStore = useAssetsStore();

const store = useAssetsStore();

// const search = ref('');
const selectedStatus = ref('');
// const assets = computed(() => assetsStore.assets);

//to calculate total number of assets
const totalAssets = computed(() => store.assets.length);
const totalCategories = computed(() => {
  const categories = store.assets.map((asset) => asset.assetCategory);
  return new Set(categories).size;
});
//to calculate total cost of assets
const totalCost = computed(() => {
  return store.assets.reduce(
    (sum, asset) => sum + (parseFloat(asset.assetCost) || 0),
    0
  );
});

//To count all active assets
const totalActiveAssets = computed(() => {
  return store.assets.filter((asset) => asset.assetStatus === 'Active').length;
});
//To count all active assets
const totalInactiveAssets = computed(() => {
  return store.assets.filter((asset) => asset.assetStatus === 'Inactive')
    .length;
});

// const assetsByStatus = computed(() => {
//   return store.assets.reduce((statusCount, asset) => {
//     statusCount[asset.assetStatus] = (statusCount[asset.assetStatus] || 0) + 1;
//     return statusCount;
//   }, {});
// });

// Filter assets based on selected status
const filteredAssets = computed(() => {
  return selectedStatus.value
    ? store.filterAssetsByStatus(selectedStatus.value)
    : store.assets.filter((asset) => asset.assetStatus === 'Active');
});

// Table headers
const headers = [
  { title: 'Asset Name', key: 'assetName' },
  { title: 'Asset Status', key: 'assetStatus' },
];

// Status classes for styling
function statusClass(status) {
  switch (status) {
    case 'Active':
      return 'status-active';
    case 'Inactive':
      return 'status-inactive';
    case 'Maintenance':
      return 'status-maintenance';
    default:
      return '';
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f6f8;
  height: 100vh;
  /* padding: 2.1rem; */
  padding: 1.5rem;
}

/*dashboard ttle styles */
.asset-logo {
  border-radius: 100%;
  padding: 5px;
  width: 34px;
  height: 36px;
  margin-right: 1rem;
  color: #2baf66;
  background-color: #0080002b;
}
.dashboard-title-container {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 13px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 0px 2px rgb(184 199 210);
}

.dashboard-title-container p {
  color: #000000b0;
  font-size: 16px;
  font-weight: 500;
}
.assets-cards-container {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 1rem;
  /* height:10rem; */
  /* padding:2rem; */
  /* justify-content: space-around; */
  /* justify-content: space-between; */
  justify-content: space-around;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0px 2px rgb(184 199 210);
}

.assetsCard {
  /* width: 215px; */
  
  background-color: #f8f8f86b;

  border-radius: 15px;
  display: flex;
  flex-direction: row;

  padding: 14px;
  box-shadow: 0 0px 2px rgb(184 199 210);
  width: 100%; /* Default to full width for small screens */
  max-width: 215px; /* Restrict max width */
  margin-bottom: 1rem; /* Add spacing between cards */
}

.AssetTitle {
  display: flex;
  flex-direction: column;
  margin-left: 13px;
  /* color: #000000b0; */
}
.cardTitle p {
  color: #2baf66 !important;
  font-weight: 500;
}
.value {
  display: flex;
  align-items: center;
  margin-top: 3px;
  color: #8f8d8d;
  font-weight: 500;
  font-size: 17px;
}
.value p {
  font-size: 18px;
}
.v-icon {
  color: #2baf66;
}

/*styles for table*/
.status-table {
  padding-top: 1rem;
  /* width: 400px; */
  margin-left: 22px;
  border-radius: 7px;
  /* box-shadow: 0 0px 2px rgb(184 199 210); */
}
.custom-status-table {
  width: 525px;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background-color: #2baf6629 !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #2baf662b !important;
  box-shadow: inset 0 -1px 0 rgba(var(--v-border-color), var(--v-border-opacity));
  z-index: 1;
}

/* styles for graph and table section */
.graph-table-section {
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
}

.graph-1 {
  width: 525px;
  /* height:255px; */
  height: 242px;
  border-radius: 10px;
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: white;
  margin-left: 22px;
  /* padding:20px; */
}
.graph-2 {
  box-shadow: 0 0px 2px rgb(184 199 210);
  width: 100%;
  height: 436px;
  margin-top: 1rem;
  background-color: white;
  border-radius: 10px;
  /* padding:10px; */
  padding: 1rem;
}
/* Responsive styles for small screens (mobile) */
@media (max-width: 768px) {
  .dashboard-title-container {
    flex-direction: column;
    align-items: flex-start; 
    padding: 1rem;
  }

  .assets-cards-container {
    flex-direction: column; 
    align-items: center; 
    padding: 1rem;
  }

  .assetsCard {
    width: 90%; 
    margin: 0 auto 1rem;
  }

  .graph-table-section {
    flex-direction: column; 
  }

  .graph-1,
  .graph-2,
  .status-table {
    width: 100%;
    margin: 1rem auto; 
  }
}

/* Responsive styles for medium screens (tablets) */
@media (min-width: 769px) and (max-width: 1024px) {
  .assetsCard {
    width: 45%; 
  }

  .graph-table-section {
    flex-direction: column; 
  }

  .graph-1,
  .graph-2,
  .status-table {
    width: 100%;
    margin: 1rem auto;
  }
}


@media (max-width: 480px) {
  /* Adjust the assets cards container */
  .assets-cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 1rem;
    justify-content: center;
  }
  .dashboard-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f6f8;
  height: 100% !important;
  /* padding: 2.1rem; */
  padding: 1.5rem;
}
  .assetsCard {
    width: 100%; 
    max-width: none;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .asset-logo-card {
    margin-bottom: 0.5rem; 
  }

  .AssetTitle {
    margin-left: 0; 
  }

  .cardTitle p {
    font-size: 14px; 
  }

  .value p {
    font-size: 16px; 
  }
  .assetsCard:nth-child(5) {
    grid-column: span 2; 
  }
}

</style>
