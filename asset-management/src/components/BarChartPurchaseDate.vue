

<template>
  <div class="header-section" >
      <div><p class="header-title">Assets Purchased</p></div>
      <!-- Dropdown to select a year -->
      <!-- <div class="year-dropdown-section">
      <label for="year-select" class="header-title">Select Year :</label>
      <select id="year-select" v-model="selectedYear" class="year-dropdown">
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div> -->

    <v-select  
      v-model="selectedYear"
      :items="availableYears"
      label="Select Year"
      density="compact"
      variant="solo"  
      hide-details
     
      flat     class="custom-select-year"
    ></v-select>

      <!-- Bar chart -->
      
    </div>
    <div v-if="!hasData" class="no-data" >
      
      <v-icon class="no-data-icon">mdi mdi-database-alert-outline</v-icon>
      <p>No data available to display</p>
    </div>

    <div v-else>
   
    <div class="barChart-container"> 
      <!-- <Bar :data="filteredBarChartData" :options="chartOptions" height="165px" width="300px" class="bar-chart" /> -->
      <Bar ref="chartRef" :data="filteredBarChartData" :options="chartOptions"  class="bar-chart"/>
    </div>
   
  </div>
  </template>
  
  <script setup>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  import { Bar } from 'vue-chartjs';
  import { ref, computed } from 'vue';
  import { useAssetsStore } from '@/stores/useAssetsStore';
import { watch } from 'vue';
  import { onMounted, onBeforeUnmount, nextTick } from 'vue';

  const chartRef = ref(null);





  const store = useAssetsStore();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  

  // const availableYears = computed(() => {
  //   const years = store.assets.map(asset => new Date(asset.purchaseDate).getFullYear());
  //   return [...new Set(years)].sort((a, b) => b - a); 
  // });
  const availableYears = computed(() => {
  const years = store.assets
    .map(asset => {
      const year = new Date(asset.purchaseDate).getFullYear();
    
      return isNaN(year) ? null : year;
    })
    .filter(year => year !== null); 
    
  return [...new Set(years)].sort((a, b) => b - a); 
});
  // const selectedYear = computed(() => {
  //   return availableYears.value.length > 0 ? availableYears.value[0] : null;
  // });

  const selectedYear = ref(null); // Use ref for reactivity


watch(availableYears, (newYears) => {
  if (newYears.length > 0 && !selectedYear.value) {
    selectedYear.value = newYears[0];  
  }
}, { immediate: true });

  // const selectedYear = ref(availableYears.value[0]); 
  
  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return months[monthIndex];
  };
  
  
  const filteredBarChartData = computed(() => {
    if (!selectedYear.value) return { labels: [], datasets: [] };

const monthlyCounts = store.assets.reduce((counts, asset) => {
  const purchaseDate = new Date(asset.purchaseDate);
  const year = purchaseDate.getFullYear();
  const month = purchaseDate.getMonth();

  if (year === selectedYear.value) {
    counts[month] = (counts[month] || 0) + 1;
  }

  return counts;
}, {});
  
    return {
      labels: Object.keys(monthlyCounts).map((monthIndex) => getMonthName(parseInt(monthIndex, 10))),
      datasets: [
        {
          data: Object.values(monthlyCounts),
          backgroundColor: '#41B883',
          label: `Assets purchased in ${selectedYear.value}`,
          maxBarThickness: 20,
          barThickness: 15,
          // borderColor:'#2BAF66',
          hoverBackgroundColor:'#2BAF66',
          // borderWidth:2
          
        },
      ],
    };
  });
  

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    radius: 80,
    cutout: 77,
    borderRadius: 14,
    borderSkipped:false,
    scales: {
    y: {
      title: {
        display: true,
        text: 'No. of assets purchased'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Months'
      }
    }
  },
    
 
    plugins: {
     
        tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#000000',
        bodyColor: '#000000',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxRadius: 7,
        usePointStyle: true,
        // padding:30,
        // padding:70,
        
      
      },
      legend: {
      onClick: null,
      position: 'top', 
      align:'center',
      labels: {
      boxHeight:10,
      // padding: 20,
      font: {
            size: 13
            },
      pointStyle:'circle',
      usePointStyle:true,
      pointStyleWidth:14,
              
      },
      // boxRadius: 50,
      // useBorderRadius:true,
      
    },
   
    },
  };

  const hasData = computed(() => {
  return filteredBarChartData.value.datasets[0]?.data.some(value => value > 0);
  });
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
  
<style scoped>
.header-section{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom:3px; */
  margin-bottom: 22px;
  }.year-dropdown-section {
  display: flex;
  align-items: center;
}

.year-dropdown {
  width: 80px; 
  margin-left: 10px;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #f1f1f1; 
  border: 1px solid #ccc; 
  appearance: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.year-dropdown:hover {
  background-color: #e0e0e0; 
}

.year-dropdown:focus {
  outline: none; 
  border-color: #41b883; 
  background-color: #fff; 
}

.year-dropdown::-ms-expand {
  display: none; 
}

.year-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.year-dropdown-wrapper::after {
  content: '▼'; 
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
  pointer-events: none; 
}

.custom-select-year{

  width:50px !important;

  margin-left: 19rem;

}
.header-title{
  /* font-size: 14px;
    color: #8f8d8d; */
    font-size: 15px;
    color: #000000b0;
    font-weight: 500;
}
.barChart-container {
  width: 100%;
  height: 100%;
 
}
.bar-chart {
  max-width: 100%;
  height: 100%;
}

@media (max-width: 480px) {
  .header-title{
  /* font-size: 14px;
    color: #8f8d8d; */
    font-size: 13px;
    color: #000000b0;
    font-weight: 500;
}
    .custom-select-year[data-v-41e98aaa] {
        width: 50px !important;
        margin-left: 8rem !important;
    }
.v-input__control{
  width:100px !important;
}
.barChart-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
  .bar-chart {
    max-width: 100%;
    height: 100%;
  }
}
@media (max-width: 768px) {
.custom-select-year{

     width: 50px !important;
    margin-left: 11rem !important;

}
}

@media (min-width: 1025px) and (max-width: 1280px){
  /* .bar-chart{
    height:300px;
    padding:0rem;
  } */
}

@media (min-width: 1281px) {
  /* .bar-chart {
    height: 50rem;
  } */
  .bar-chart {
    height: 100%;
  }
  .barChart-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    height:100%;
  }
  .v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field.v-select.v-select--single.v-select--selected{
    margin-left:11rem !important;
  }
}

@media (min-width: 1025px) and (max-width: 1280px){
  .bar-chart {
    height: 100%;
  }
  .barChart-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    height:100%;
  }
}

@media (min-width: 1536px) {
  /* .bar-chart {
    height: 50rem;
  } */
  .bar-chart {
    height: 100%;
  }
  .barChart-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    height:100%;
  }
}
</style>