<template>
  <div v-if="!hasData" class="no-data">
    <v-icon class="no-data-icon">mdi mdi-database-alert-outline</v-icon>
    <p>No data available to display</p>
  </div>
  <div v-else style=" margin-bottom: 1rem" >
    <!-- <div><p class="header-title">Assets Status</p></div> -->
    <div><p class="header-title">Assets Status</p></div>

    <div class="pieChart-container">
      <!-- <Pie :data="chartData" :options="options" class="pie-chart-container" /> -->
      
      <Pie ref="chartRef" :data="chartData" :options="options" class="pie-chart"  />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { useAssetsStore } from '@/stores/useAssetsStore';
const store = useAssetsStore();
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
const chartRef = ref(null);
// ChartJS.register(ArcElement, Tooltip, Legend)

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
    // labels: Object.keys(statusData),
    labels: Object.keys(statusData),
    datasets: [
      {
        data: Object.values(statusData),
        label: `No of Assets`,

        // backgroundColor: ['#41B883','white','#00800026'],
        // borderColor:  ['#41B883', '#41B883', '#41B883'],

        backgroundColor: ['#41B883', '#00800026', 'white'],
        borderColor: ['#41B883', '#41B883', '#41B883'],

        marginTop: 20,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,


  plugins: {
    legend: {
      onClick: null,
      display: true,
      position: 'right',
      align: 'center',
      padding: 10,
      labels: {
        boxHeight: 10,
        padding: 10,
        font: {
          size: 15,
        },
        pointStyle: 'circle',
        usePointStyle: true,
        pointStyleWidth: 14,
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
      callbacks: {
        title: () => [],
        label: function (tooltipItem) {
          const label = tooltipItem.label || '';
          const value = tooltipItem.raw || 0;
          return `No of ${label.toLowerCase()} asset: ${value}`;
        },
      },
    },
  },

  layout: {
    padding: 2,
  },
};
const handleResize = () => {

if (chartRef.value && chartRef.value.chartInstance) {
  chartRef.value.chartInstance.resize();
}
};

onMounted(() => {

nextTick(() => {
  if (chartRef.value && chartRef.value.chartInstance) {
    chartRef.value.chartInstance.resize();
  }
}); 

window.addEventListener('resize', handleResize);


 window.addEventListener('beforeprint', beforePrintHandler);

window.addEventListener('afterprint', afterPrintHandler);

});

onBeforeUnmount(() => {

window.removeEventListener('resize', handleResize);
window.removeEventListener('beforeprint', beforePrintHandler);
window.removeEventListener('afterprint', afterPrintHandler);
});

const beforePrintHandler = () => {
  if (chartRef.value && chartRef.value.chartInstance) {
    chartRef.value.chartInstance.resize(600, 600); 
  }
};


const afterPrintHandler = () => {
  if (chartRef.value && chartRef.value.chartInstance) {
    chartRef.value.chartInstance.resize();  
  }
};
</script>

<style>
.pie-chart-container {
   width: 100%;
  height: auto;
}


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

.header-title {
  /* font-size: 14px;
  color: #8f8d8d; */
  font-size: 15px;
  color: #000000b0;
  font-weight: 500;
  padding: 7px;
}
.pieChart {
    width: 100%;
    /* padding: 0; */
    /* margin: 0 auto; */
    height:100%;
  }
  .pie-chart {
    max-width: 100%;
    height: 100%;
    /* height: 50%; */
  }



@media (max-width: 768px) {

  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;

    padding: 7px;
}
.pieChart-container {
  width: 100%;
  height: 100%;
 
}
.pie-chart {
  max-width: 100%;
  height: 100%;
 
  /* padding:1rem; */
  padding: 0.5rem;
}
  
}

@media (max-width: 480px) {

  .pieChart-container {
  width: 100%;
  height: 100%;
 
}
.pie-chart {
  max-width: 100%;
  height: 100%;

}
}
@media (min-width: 1281px) {
  /* .pie-chart {
    height: 50%;
  } */
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
    padding: 7px;
 
}
.pieChart-container {
  width: 100%;
  height: 100%;
  margin-top: -2.5rem;
        padding: 1rem;
 
}
.pie-chart {
  max-width: 100%;
  height: 12rem;
  padding-bottom: 0.5rem;
  margin-top:0.5rem;

  
}
  
}
@media (min-width: 769px) and (max-width: 1024px){
  
  .pieChart-container {
  width: 100%;
  height: 100%;
 
}
.pie-chart {
  max-width: 100%;
  height: 100%;
  /* height: 50%; */
  /* padding: 1rem; */
  padding: 0.5rem;
}
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
    padding: 7px;

}
  
}
@media (min-width: 1025px) and (max-width: 1280px){

  .pieChart-container {
  width: 100%;
  height: 100%;
 
}
.pie-chart {
  max-width: 100%;
  height: 100%;
  /* padding: 1rem; */
  /* height: 50%; */
  padding: 0.5rem;
}
  .header-title {
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;

    padding: 7px;
}
  
}


</style>
