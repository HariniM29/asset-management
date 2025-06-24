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
        <div class="asset-logo-card">
          <v-icon style="font-size: 19px">mdi mdi-currency-inr</v-icon>
        </div>
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
          <div class="cardTitle"><p>Active Assets</p></div>
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
      <div class="charts-row">
        <div class="graph-sec1">
          <div class="graph-2">
            <BarChartPurchaseDate></BarChartPurchaseDate>
          </div>
        </div>

        <!-- <div style="display: flex; flex-direction: column; margin-top: 1rem" class="pie-table"> -->
        <div style="display: flex; margin-top: 1rem" class="pie-table">
          <!-- <div class="graph-sec2" style="width: 100%;height:50%"> -->
          <div class="graph-sec2">
            <div class="graph-1">
              <!-- <h1>Status</h1> -->

              <!-- <DoughnutChart></DoughnutChart> -->
              <PieChart></PieChart>
            </div>
          </div>
          <div class="table-1">
            <div class="status-table">
              <v-data-table
                :headers="headers"
                :items="filteredAssets"
                item-key="assetId"
                :search="search"
                :items-per-page="10"
                style="box-shadow: 0 0px 2px rgb(184 199 210)"
                :disable-sort="true"
                :fixed-header="true"
                :hide-default-footer="true"
                class="custom-status-table"
              >
                <!-- :items-per-page="5"  height="600px;" -->
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
  justify-content: space-around;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0px 2px rgb(184 199 210);
}

.assetsCard {
  /* width: 215px; */
  /* margin-bottom: 1rem; */
  background-color: #f8f8f86b;

  border-radius: 15px;
  display: flex;
  flex-direction: row;

  padding: 14px;
  box-shadow: 0 0px 2px rgb(184 199 210);
  width: 100%; 
  max-width: 215px; 

}

.AssetTitle {
  display: flex;
  flex-direction: column;
  margin-left: 13px;

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
 
}


/* Styles for status batch */
.status-active {
  color: green;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 11px;
  width: 50px;
  padding-bottom: 2px;
  padding-top: 2px;
  margin-left: 29px;
  border: 1px solid green;
  background-color: #00800026;
  opacity: 0.7;
  box-shadow: 0 0 2px rgb(205 222 237);
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
  margin-top: 2rem;
  flex-direction: row;
}

.graph-1 {
  border-radius: 10px;
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: white;
  margin-left: 22px;
  /* padding:20px; */
}
.graph-2 {
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: white;
  border-radius: 10px;
  /* padding:10px; */
  padding: 1.5rem;
}

.pie-table {
  display: flex;
  flex-direction: column;
  height: 100%; 
  width: 50%; 
}




/* Responsive styles for tablets */
@media (max-width: 768px) {
  .graph-2{
    margin-bottom: 2rem;
  }
  .graph-table-section {
    display: flex;
    flex-direction: row !important;
  }
  .dashboard-title-container {
    /* flex-direction: column; */
    align-items: flex-start;
    padding: 1rem;
    margin-top: 4rem;
  }
  .dashboard-container {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    background-color: #f5f6f8;
    height: 100% !important;
    /* padding: 2.1rem; */
    padding: 1.5rem;
  }
  .dashboard-title-container p[data-v-cba730ac] {
    color: #000000b0;
    font-size: 15px;
    font-weight: 500;
    margin-top: 0.4rem;
  }


  .assets-cards-container {
    /* flex-direction: column;  */
    align-items: center;
    padding: 1rem;
    margin-top: 2rem;
    margin-right:1rem;
  }

  .assetsCard {
    width: 90%;
    margin: 0 auto 1rem;
  }
  .graph-1 {
    margin-top: 0px !important;
    margin-left: 0px !important;
    padding: 0rem;
  }
  .status-table,
  .table-1 {
    /* margin-top: 0px !important;
      margin-bottom:0px !important; */
    padding-top: 0.3rem;
  }

  .custom-status-table {
    width: 100%;
  }
  .pie-table {
    display: flex !important;
    /* flex-direction: row !important; */
    width: 100%;
    height: 50%;
  }
  .charts-row {
    width: 100%;
    height: 100%;
  }
  .graph-table-section {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: flex-start; */
    gap: 1rem;
    height: 100%;
    margin-top: 2rem;
    flex-direction: row !important;
    width: 100%;
  }
  .graph-sec2 {
    height: 100%;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .table-1 {
    height: 100%;
    width: 100%;
  }
  .graph-sec1 {
    height: 50%;
    width: 100%;
  }
  .custom-status-table {
    /* Set fixed height for scrollable area */
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
  }
  .status-table{
    margin-left:0px !important;
  }
}

/* Responsive styles for mobile */
@media (max-width: 480px) {
  .v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field.v-select.v-select--single.v-select--selected {
    margin-right: 0rem;
}
 
  .graph-sec1 {
    height: 50%;
    width: 100%;
    margin-top: 1rem;
  }
  .status-table {
    margin-left: 0px !important;
  }
  .assets-cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
  .dashboard-container {
    display: flex;
    width: 100%;
    background-color: #f5f6f8;
    height: 100% !important;
    padding: 1.5rem;
  }
  .value p[data-v-cba730ac] {
    font-size: 18px;
   
  }
  .value{
    justify-content: center;
  }

  .cardTitle p[data-v-cba730ac] {
    font-size: 15px;
  }
  .dashboard-title-container p[data-v-cba730ac] {
    color: #000000b0;
    font-size: 14px;
    font-weight: 500;
    margin-top: 0.4rem;
  }
  .assetsCard {
    width: 100%;
    max-width: none;
    padding: 0.3rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  .v-input__control {
    display: flex;
    grid-area: control;
    width: 70px !important;
    margin-left: 8.6rem !important;
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

  .graph-table-section {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    margin-top: -1rem;
  }

  .graph-2 {
    width: 100%;
    height: auto;
    margin: 0 auto;
    /* padding: 0.5rem;  */
    margin-left: 0rem;
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .graph-1 {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0.5rem;
    margin-left: 0rem;
  }
  .graph-2 {
    margin-top: 2rem;
    padding: 1.5rem;
  }
  .graph-1 {
    /* margin-top:0rem !important; */
    height: 100%;
    width: 100%;
  }
  .pie-table {
    display: flex;
    flex-direction: column !important;
    height: 50%;
    width: 100%;
  }
  .table-1 {
    width: 100%;
    height: 100%;
    margin-top: 1rem;
  }
  .graph-sec2 {
    width: 100%;
    height: 100%;
    margin-right: 2rem;
    margin-top: 1rem;
  }
  .v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field.v-select.v-select--single.v-select--selected {
    margin-right: 0rem !important;
}
}


/* Responsive styles for laptops */
@media (min-width: 769px) and (max-width: 1024px) {
  .assetsCard[data-v-cba730ac] {
        margin-right: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
    margin-left: 1rem !important;
    margin-top: 1rem !important;
  }
  .status-table[data-v-cba730ac] {
    padding-top: 0rem;
    /* width: 400px; */
    margin-left: 0px;
    border-radius: 7px;
 
}
  .custom-status-table[data-v-cba730ac] {
    width: 100%;
    margin-top: 1rem;
  }
  .dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f5f6f8;
    height: 100%;
    padding: 1.5rem;
  }
  .dashboard-title-container[data-v-cba730ac] {
    display: flex;

    flex-direction: row;
    background-color: white;
    padding: 13px;
    border-radius: 10px;
    align-items: center;
    box-shadow: 0 0px 2px rgb(184 199 210);
    margin-top: 4.5rem;
  }
  
  .custom-status-table {
    width: 100%;
  }
  .assets-cards-container {
    margin-top: 2rem;
  }
  .charts-row {
    width: 100%;
    height: 100%;
  }
  .graph-table-section {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: flex-start; */
    gap: 1rem;
    height: 100%;
    margin-top: 2rem;
    flex-direction: row !important;
    width: 100%;
  }
  .graph-sec2 {
    height: 100%;
    width: 100%;
  }
  .table-1 {
    height: 100%;
    width: 100%;
  }
  .graph-sec1 {
    height: 50%;
    width: 100%;
  }
  .custom-status-table {
    /* Set fixed height for scrollable area */
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
  }
  .pie-table[data-v-cba730ac] {
    display: flex
;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.graph-1{
  margin-left:0px !important;
}
.graph-2{
  margin-bottom: 2rem;
}
}
/*syles for larger desktop and laptops */
@media (min-width: 1025px) and (max-width: 1280px) {
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
    margin-left: 1rem !important;
    margin-top: 1rem !important;
  }
  .custom-status-table[data-v-cba730ac] {
    width: 100%;
    margin-top: 1rem;
  }
  .dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f5f6f8;
    height: 100%;
    /* padding: 2.1rem; */
    /* height: 105vh; */
    padding: 1.5rem;
  }
  .dashboard-title-container[data-v-cba730ac] {
    display: flex;

    flex-direction: row;
    background-color: white;
    padding: 13px;
    border-radius: 10px;
    align-items: center;
    box-shadow: 0 0px 2px rgb(184 199 210);
    margin-top: 4.5rem;
  }
  
  .custom-status-table {
    width: 100%;
  }
  .assets-cards-container {
    margin-top: 2rem;
  }
  .charts-row {
    width: 100%;
    height: 100%;
  }
  .graph-table-section {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: flex-start; */
    gap: 1rem;
    height: 100%;
    margin-top: 2rem;
    flex-direction: row !important;
    width: 100%;
  }
  .graph-sec2 {
    height: 100%;
    width: 100%;
  }
  .table-1 {
    height: 100%;
    width: 100%;
  }
  .graph-sec1 {
    height: 50%;
    width: 100%;
  }
  .custom-status-table {
    /* Set fixed height for scrollable area */
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
  }
  .pie-table[data-v-cba730ac] {
    display: flex
;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.assetsCard{
  margin-right: 1rem;;
}
.graph-1{
  margin-left:0px !important;
}
.status-table{
  margin-left: 0px !important;
}
.graph-2{
  margin-bottom: 2rem;;
}
.assetsCard[data-v-cba730ac] {
        margin-right: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
}



@media (min-width: 1281px) {
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  
  .graph-table-section {
    margin-bottom: 0px !important;
    height: 100%;
    margin-top: 2rem;
    width: 100%;
  }
  .dashboard-container[data-v-cba730ac] {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color:  #f5f6f8;;
    padding:1.6rem;
  }

  .dashboard-title-container[data-v-cba730ac] {
  
    margin-top: 0.5rem;
}
 
  .assets-cards-container[data-v-cba730ac] {
    margin-top: 2.3rem;
  }
  .graph-table-section[data-v-cba730ac] {
    margin-bottom: 0px !important;
    margin-top: 1rem;
    margin-top: 2.3rem;
    height: 100%;
    width: 100%;
  }
  .graph-1 {
    padding: 2px;
    height: 100%;

  }
  .graph-2 {
    box-shadow: 0 0px 2px rgb(184 199 210);

    margin-top: 1rem;
    background-color: white;
    border-radius: 10px;

    padding: 1.2rem;
  }
  .charts-row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-top: -1rem;
  }
  .graph-table-section {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: flex-start; */
    gap: 1rem;
    height: 100%;
    margin-top: 2rem;
    flex-direction: row !important;
    width: 100%;
  }
  .graph-sec2 {
    /* height: 50%; */
    height: 50%;
    width: 100%;
  }
  .table-1 {
    /* height: 50%; */
    height: 20%;
    width: 100%;
    /* margin-top: 2rem; */
  }
  .graph-sec1 {
    height: 100%;
    width: 50%;
  }
  .custom-status-table {

  max-height: 170px;
  overflow-y: auto;
  border: 1px solid #ddd;
}
  .pie-table {
    display: flex;
    margin-top: 1rem;
    width: 50%;
    flex-direction: column;
    height: 100%;
  }
}
</style>
