

import { defineStore } from "pinia";
import { ref,onMounted } from "vue";
// import { sampleAssets } from "@/assets/assets";
// import { sampleAssets } from "@/assets/assets.json";  
export interface Asset{
    assetName:string,
    assetId:string,
    assetCategory:string,
    assetAllocatedto:string,
    assetStatus:string,
    modelName: string; // New fields
    // publishedDate?: string;
    assetDesc:string,
    assetModelnumber?:string,
    purchaseDate?:Date,
    // purchaseDate?:string,
    assetQuantity?:string,
    assetWarantynumber:string,
    assetCost?:string,
    assetRecoveredDate?:string,
    assetLastMaintainanceDate?:string,
    // assetImage?: string;
    assetImage?: string[];
    
  
   

}

export const useAssetsStore=defineStore('assets',()=>{
    const assets=ref<Asset[]>(

        // {
        //     assetName: "Laptop",
        //     assetId: "A001",
        //     assetCategory: "Software",
        //     assetAllocatedto: "John Doe",
        //     assetStatus: "Active",
        //     modelName: "Dell Inspiron",
        //     assetDesc: "Business laptop with enhanced security features and Intel Core i7 processor, 16GB RAM 512GB SSD",
        //     assetModelnumber: "DI-5000",
        //     // purchaseDate: new Date("2023-01-15"),
        //     // purchaseDate: "2023-04-15",
        //     purchaseDate: new Date("2023-04-15"),

        //     assetQuantity: "1",
        //     assetWarantynumber: "W123456",
        //     assetCost: "800 USD",
        //     assetRecoveredDate: "2023-05-01",
        //     assetLastMaintainanceDate: "2024-01-15",
        //     assetImage: [],
        // },
        // {
        //     assetName: "Monitor",
        //     assetId: "A002",
        //     assetCategory: "Hardware",
        //     assetAllocatedto: "Jane Smith",
        //     assetStatus: "Active",
        //     modelName: "HP UltraWide",
        //     assetDesc: "27-inch monitor for workstation with enhanced security features",
        //     assetModelnumber: "HP27WQ",
        //     purchaseDate: "2023-04-15",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "2",
        //     assetWarantynumber: "W654321",
        //     assetCost: "300 USD",
        //     assetRecoveredDate: "2023-06-10",
        //     assetLastMaintainanceDate: "2024-02-20",
        //     assetImage: [],
        //   },
        //   {
        //     assetName: "Printer",
        //     assetId: "A003",
        //     assetCategory: "Hardware",
        //     assetAllocatedto: "Michael Brown",
        //     assetStatus: "Maintenance",
        //     modelName: "Canon Pixma",
        //     assetDesc: "Color printer for office use with enhanced features and functions",
        //     assetModelnumber: "CNPX300",
        //     purchaseDate: "2022-11-10",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "1",
        //     assetWarantynumber: "W897654",
        //     assetCost: "150 USD",
        //     assetRecoveredDate: "",
        //     assetLastMaintainanceDate: "2023-12-05",
        //     assetImage: [],
        //   },
        //   {
        //     assetName: "Tablet",
        //     assetId: "A004",
        //     assetCategory: "Software",
        //     assetAllocatedto: "Emily Johnson",
        //     assetStatus: "Inactive",
        //     modelName: "Samsung Galaxy Tab",
        //     assetDesc: "Tablet with stylus support suitable for office and personal use",
        //     assetModelnumber: "SGT-700",
        //     purchaseDate: "2023-02-01",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "1",
        //     assetWarantynumber: "W456789",
        //     assetCost: "600 USD",
        //     assetRecoveredDate: "2023-10-20",
        //     assetLastMaintainanceDate: "2024-03-05",
        //     assetImage: [],
        //   },
        //   {
        //     assetName: "Chair",
        //     assetId: "A005",
        //     assetCategory: "Furniture",
        //     assetAllocatedto: "David Lee",
        //     assetStatus: "Inactive",
        //     modelName: "Ergo Chair Pro",
        //     assetDesc: "Ergonomic office chair with good quality",
        //     assetModelnumber: "ERG-PRO-01",
        //     purchaseDate: "2023-03-13",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "5",
        //     assetWarantynumber: "W234567",
        //     assetCost: "150 USD each",
        //     assetRecoveredDate: "",
        //     assetLastMaintainanceDate: "2024-04-10",
        //     assetImage: [],
        //   },
        //   {
        //     assetName: "Projector",
        //     assetId: "A006",
        //     assetCategory: "Hardware",
        //     assetAllocatedto: "Sarah Davis",
        //     assetStatus: "Active",
        //     modelName: "Epson PowerLite",
        //     assetDesc: "High-resolution projector for presentations usefull for project meetings",
        //     assetModelnumber: "EPPL-500",
        //     purchaseDate: "2023-03-18",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "1",
        //     assetWarantynumber: "W123987",
        //     assetCost: "1200 USD",
        //     assetRecoveredDate: "",
        //     assetLastMaintainanceDate: "2024-02-25",
        //     assetImage: [],
        //   },
        //   {
        //     assetName: "Laptop",
        //     assetId: "A007",
        //     assetCategory: "Software",
        //     assetAllocatedto: "John Doe",
        //     assetStatus: "Active",
        //     modelName: "Dell Inspiron",
        //     assetDesc: "Business laptop with enhanced security features and Intel Core i7 processor, 16GB RAM 512GB SSD",
        //     assetModelnumber: "DI-5000",
        //     purchaseDate: "2023-05-01",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "1",
        //     assetWarantynumber: "W123456",
        //     assetCost: "800 USD",
        //     assetRecoveredDate: "2023-05-01",
        //     assetLastMaintainanceDate: "2024-01-15",
        //     assetImage: [],
        // },
        // {
        //     assetName: "Monitor",
        //     assetId: "A008",
        //     assetCategory: "Hardware",
        //     assetAllocatedto: "Jane Smith",
        //     assetStatus: "Active",
        //     modelName: "HP UltraWide",
        //     assetDesc: "27-inch monitor for workstation with enhanced security features",
        //     assetModelnumber: "HP27WQ",
        //     purchaseDate: "2023-04-15",
        //     // purchaseDate: new Date("2023-01-15"),
        //     assetQuantity: "2",
        //     assetWarantynumber: "W654321",
        //     assetCost: "300 USD",
        //     assetRecoveredDate: "2023-06-10",
        //     assetLastMaintainanceDate: "2024-02-20",
        //     assetImage: [],
        //   },
          
      
          


   []);
   const isLoading = ref(true);
   const loadAssets = async () => {
    try {
      const response = await fetch('/assets/assets.json');
      if (response.ok) {
        const data = await response.json();
        assets.value = data;
      } else {
        console.error("Failed to load assets data.");
      }
    } catch (error) {
      console.error("Error loading assets:", error);
    }
    finally {
      isLoading.value = false; 
    }
  };
    // Load assets when the component is mounted
    onMounted(() => {
      loadAssets();
    });
    function addAsset(asset:Asset){
        assets.value.push(asset);
    }

    function updateAsset(updatedAsset:Asset){
        const index = assets.value.findIndex((a) => a.assetId === updatedAsset.assetId);
        if (index !== -1) {
        assets.value[index] = updatedAsset;
    }
    }

    function deleteAsset(assetId: string) {
        // Log the assetId to verify it is correct
        console.log('Deleting asset with ID:', assetId);
        assets.value = assets.value.filter((asset: Asset) => asset.assetId !== assetId);
    }
    
    
      function filterAssetsByStatus(status: string) {
        return assets.value.filter((asset: Asset) => asset.assetStatus === status);
      }
      

  
    return{
        assets,
        addAsset,
        deleteAsset,
        updateAsset,
        filterAssetsByStatus,
        isLoading
        
    }
})