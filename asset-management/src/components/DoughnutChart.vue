<template>
  <div v-if="!hasData" class="no-data">
    <v-icon class="no-data-icon">mdi mdi-database-alert-outline</v-icon>
    <p>No data available to display</p>
  </div>
  <div v-else style="margin-top: 20px; margin-left: 0px">
    <Doughnut
      :data="chartData"
      :options="options"
      height="200px"
      width="500px"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAssetsStore } from '@/stores/useAssetsStore';
const store = useAssetsStore();
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const hasData = computed(() => {
  return chartData.value.datasets[0]?.data.some((value) => value > 0);
});

const assetsByStatus = computed(() => {
  return store.assets.reduce((statusCount, asset) => {
    statusCount[asset.assetStatus] = (statusCount[asset.assetStatus] || 0) + 1;
    return statusCount;
  }, {});
});

const chartData = computed(() => {
  const statusData = assetsByStatus.value;
  return {
    labels: Object.keys(statusData),
    datasets: [
      {
        data: Object.values(statusData),
        // backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56'],
        // backgroundColor: ['#00800026', '#80808024', '#ffa50026'],
        // borderColor:  ['#41B883', 'grey', 'orange'],
        // hoverBackgroundColor: ['#41B883', 'grey', 'orange'],
        // backgroundColor: ['#00800026','#ffa50026','#80808024'],
        // borderColor:  ['#41B883', 'orange', 'grey'],
        backgroundColor: ['#41B883', 'white', '#00800026'],
        borderColor: ['#41B883', '#41B883', '#41B883'],
        marginTop: 20,
      },
    ],
  };
});

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   radius:70,
//   cutout:70,
//   borderRadius:4
// }
const options = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 80,
  cutout: 77,
  borderRadius: 4,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
      labels: {
        boxHeight: 10,
        padding: 20,
        font: {
          size: 13,
        },
        pointStyle: 'circle',
        usePointStyle: true,
        pointStyleWidth: 15,
      },
      // boxRadius: 50,
      // useBorderRadius:true,
    },

    title: {
      display: true,
      text: 'Asset Status',
      position: 'top',
      padding: {},
      font: {
        size: 14,
      },
    },
    tooltip: {
      backgroundColor: '#FFFFFF', //tooltip box color
      titleColor: '#000000', //title of tooltip
      bodyColor: '#000000', //color of txt value
      borderColor: '#CCCCCC', //border color of tooltip box
      borderWidth: 1,
      displayColors: true,
      boxWidth: 30, //width of tooltip box
      boxHeight: 10,
      boxRadius: 5,
      usePointStyle: true,
      pointStyle: 'circle',
    },
  },

  layout: {
    padding: 2,
  },
};
</script>

<style>
.no-data-icon {
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2baf66;
  font-weight: 300;
}
.no-data {
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.no-data p {
  color: #8f8d8d;
  font-weight: 500;
}
</style>
