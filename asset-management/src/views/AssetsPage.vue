<template>
  <div class="asset-section">
    <div class="button-section">
      <div style="display: flex; justify-content: center; align-items: center" class="asset-title">
        <div class="asset-logo">
          <v-icon color="green">mdi mdi-cube-outline</v-icon>
        </div>
        <div>
          <p style="font-size: 14px; color: rgb(52, 52, 52)">
            Asset Management
          </p>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center" class="search-filter-add">
        <div class="search-filter" style="display: flex;">
        <div style="margin-right: 1rem">
          <!-- <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search templates"
            variant="solo"
            hide-details
            single-line
            flat
            v-model="search"
          ></v-text-field> -->
          <SearchButton v-model="search"></SearchButton>
        </div>
        <!-- <div class="select-div" style="margin-right:1rem" >
          <select  id="status-select" v-model="selectedStatus" > 
            <option value="" disabled selected >Filter by status</option>
            <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
                </option>
                <option value="clear-filter" class="clear-filter-option">Clear Filter</option>
        </select>
      </div> -->
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          label="Filter by status"
          density="compact"  
          variant="solo"    max-width="150"   min-width="100" 
          hide-details
          :clearable="!!selectedStatus"
          flat  
          style="width: 230px; margin-right: 1rem"
          class="my-custom-select"
        ></v-select>
      </div>
        <div class="add-asset-btn-div">
          <v-btn
            @click="openCreateModal"
            flat
            class="add-asset-btn"
            style="
              padding: 5px;
              padding-right: 9px;
              border-radius: 7px;
              height: 40px;
            "
            ><v-icon style="margin-right: 2px">mdi mdi-plus</v-icon>Add New
            Asset</v-btn
          >
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <AssetTable
        :headers="headers"
        :filteredAssets="filteredAssets"
        :search="search"
        :statusClass="statusClass"
        :openEditModal="openEditModal"
        :confirmDelete="confirmDelete"
        :viewAsset="viewAsset"
      />
    </div>

    <!-- Confirmation Modal -->
    <v-dialog v-model="isDeleteModalOpen" max-width="400px">
      <v-card class="delete-dialog">
        <div class="delete-section">
          <v-icon>mdi mdi-trash-can-outline</v-icon>
        </div>

        <v-card-text class="delete-title">
          Are you sure you want to delete this asset?
        </v-card-text>
        <div
          style="display: flex; justify-content: center"
          class="delete-section-buttons"
        >
          <v-card-actions style="padding: 10px">
            <!-- <v-spacer></v-spacer> -->

            <v-btn @click="closeDeleteModal" class="cancel-button">No</v-btn>
            <v-btn @click="handleDelete" class="delete-button">Yes</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isModalOpen" max-width="600px" max-height="700px">
      <v-card>
        <div
          class="form-header"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div class="form-title">
            <v-card-title style="margin-left: 14rem">{{
              isEditMode ? 'Edit Asset' : 'Create Asset'
            }}</v-card-title>
          </div>
          <div><v-icon @click="closeModal">mdi mdi-close</v-icon></div>
        </div>

        <div class="form">
          <div class="step-indicators">
            <span
              v-for="(step, index) in steps"
              :key="index"
              :class="{
                active: currentStep === index + 1,
                completed: currentStep > index + 1,
                upcoming: currentStep < index + 1,
              }"
            >
              {{ index + 1 }}
            </span>
          </div>

          <!-- form section 1 -->
          <div
            v-if="currentStep === 1"
            style="margin-top: 20px; margin-bottom: 20px"
          >
            <div>
              <div class="image-upload">
                <input
                  type="file"
                  id="file-input"
                  ref="fileInput"
                  @change="handleImageUpload"
                  accept=".jpeg,.png"
                  multiple
                  hidden
                />
                <label for="file-input" class="upload-label">
                  <span class="mdi mdi-plus-circle-outline"></span>
                  <div class="image-add-title">Add your image here</div>
                  <div style="font-size: 12px; color: grey">
                    Support file: .JPEG and .PNG
                  </div>
                  <div style="font-size: 12px; color: grey">
                    Note: You cannot upload more than 5 files and each file must
                    be within 2 mb.
                  </div>
                </label>
                           <!-- Error Messages -->
    <div v-if="errorMessage"  class="image-errmsg">
      {{ errorMessage }}
    </div>
                <div v-if="form.assetImage?.length > 0" class="uploaded-images">
                  <div
                    v-for="(image, index) in form.assetImage"
                    :key="index"
                    class="image-container"
                  >
                    <img
                      :src="image"
                      alt="Uploaded Image"
                      class="preview-image"
                    />
                    <button @click="deleteImage(index)" class="delete-icon">
                      ✖
                    </button>
                  </div>
                </div>
                <div v-else class="no-img-upload"></div>
              </div>
            </div>

            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 0.6rem;
              "
            >
              <div style="margin-right: 10px">
                <div>
                  <label class="form-label"
                    >Asset Name <span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <v-text-field
                    class="form-input"
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    flat
                    v-model="form.assetName"
                    @input="
                      form.assetName = capitalizeFirstLetter(form.assetName)
                    "
                    :rules="[requiredRule]"
                  ></v-text-field>
                </div>
              </div>
              <div>
                <div>
                  <label class="form-label"
                    >Asset Number<span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    flat
                    class="form-input"
                    v-model="form.assetId"
                    :rules="[rules.required]"
                    @input="form.assetId = capitalizeFirstLetter(form.assetId)"
                    :disabled="isEditMode"
                  ></v-text-field>
                </div>
              </div>
            </div>

            <div
              style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div>
                <div><label class="form-label">Asset Category<span style="color: #cf1c1c"> *</span></label></div>
                <div>
                  <v-select
                    class="form-input"
                    density="compact"
                    label="Asset Category"
                    variant="solo"
                    :items="assetCategories"
                    v-model="form.assetCategory"
                    hide-details
                    single-line
                    flat
                  />
                </div>
              </div>
              <div style="margin-left: 1.1rem">
                <div>
                  <label
                    style="
                      font-size: 12px;
                      color: rgb(86 89 98);
                      margin-bottom: 8px;  
                    "
                    >Asset Status<span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <v-select
                    class="form-input"
                    density="compact"
                    label="Asset Status"
                    variant="solo"
                    hide-details
                    v-model="form.assetStatus"    :menu="true"
                    :items="assetStatus"
                    single-line  
                    flat
                  />
                </div>
              </div>
            </div>

            <div
              style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div>
                <div>
                  <label class="form-label"
                    >Model Name<span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    flat
                    class="form-input"
                    v-model="form.modelName"
                    @input="
                      form.modelName = capitalizeFirstLetter(form.modelName)
                    "
                  ></v-text-field>
                </div>
              </div>
              <div>
                <div>
                  <label class="form-label"
                    >Model Number<span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    flat  type="number"
                    class="form-input"
                    v-model="form.assetModelnumber"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </div>
            </div>

            <!-- <div>
    <div class="image-upload">
      <input type="file" id="file-input" ref="fileInput" @change="handleImageUpload" accept=".jpeg,.png" multiple  hidden />
      <label for="file-input" class="upload-label">
        <div class="upload-icon">+</div>
        <div>Add your image here</div>
        <div>Support file: .JPEG and .PNG</div>
        <div>Note: You cannot upload more than 5 files and each file must be within 2 MB.</div>
      </label>
      <div v-if="form.assetImage?.length > 0" class="uploaded-images">
        <div v-for="(image, index) in form.assetImage" :key="index" class="image-preview">
          <img :src="image" alt="Uploaded Image" class="preview-image" />
          <button @click="deleteImage(index)" class="delete-icon">✖</button>
        </div>
      </div>
      <div v-else>No images uploaded</div>
    </div>
  </div> -->
          </div>

          <!-- form section 2 -->
          <div
            v-if="currentStep === 2"
            style="margin-top: 20px; margin-bottom: 20px"
          >
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div style="margin-right: 10px">
                <div><label class="form-label">Asset Quantity</label></div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line    type="number"
                    flat
                    class="form-input"
                    v-model="form.assetQuantity"
                  ></v-text-field>
                </div>
              </div>
              <div>
                <div><label class="form-label">Asset Cost (₹)</label></div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    hide-details
                    single-line
                    flat    type="number"
                    class="form-input"
                    v-model="form.assetCost"
                  ></v-text-field>
                </div>
              </div>
            </div>

            <div
              style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div>
                <div>
                  <label class="form-label"
                    >Asset Allocated to<span style="color: #cf1c1c">
                      *</span
                    ></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    class="form-input"
                    flat
                    hide-details
                    single-line
                    v-model="form.assetAllocatedto"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label class="form-label"
                    >Purchase Date<span style="color: #cf1c1c"> *</span></label
                  >
                </div>
                <div>
                  <!-- <v-text-field
                    density="compact"
                    type="date"
                    variant="solo"
                    class="form-input"
                    flat
                    hide-details
                    single-line
                    v-model="form.purchaseDate"
                  /> -->
                  <!-- <VueDatePicker
                    v-model="form.purchaseDate"
                    month-picker
                    :config="{ modeHeight: 200, mobileBreakpoint: 200 }"
                    name="date-picker"
                  ></VueDatePicker> -->
                  <!-- <Datepicker v-model="form.purchaseDate"  /> -->

                  <!-- <v-text-field density="compact" variant="solo" class="form-input" flat hide-details single-line append-inner-icon="mdi mdi-calendar"
                  @click="showDatePicker = !showDatePicker" v-model="form.purchaseDate"/>
                  <v-date-picker
                    v-model="form.purchaseDate"
                    v-show="showDatePicker"
                    elevation="6" position="absolute"  style="z-index:2300;margin-left: -3rem;"
                    color="#2baf66"
                    width="310"
                    height="410" 
                  ></v-date-picker> -->
                  <!--actuall picker-->
                  <!-- <v-date-picker v-model="form.purchaseDate" elevation="24" color="#2baf66" width="310" height="410"></v-date-picker> -->
                  <!-- <v-date-input label="Date input" variant="solo" v-model="form.purchaseDate" :model-value="new Date(form.purchaseDate)" /> -->
                  <!-- <v-date-input 
  label="Date input" 
  variant="solo" 
  v-model="form.purchaseDate" 
/> -->

                  <!-- <v-date-input label="Date input" variant="solo" v-model="form.purchaseDate"></v-date-input> -->
                <!-- <v-text-field
                density="compact"
                variant="solo"
                class="form-input"
                flat
                hide-details
                single-line
                @click="showDatePicker = !showDatePicker"
                v-model="form.purchaseDate"
              />

              <v-date-picker
                v-model="form.purchaseDate"
                v-show="showDatePicker"
                :landscape="true"
                elevation="6"
                position="absolute"
                style="z-index:2300;margin-left: -3rem;"
                color="#2baf66"
                width="310"   displayFormat="yyyy-MM-dd"
                height="410"
           
              /> -->
              <v-date-input 
                label="Date input" 
                variant="solo" 
                v-model="form.purchaseDate"   flat
                    hide-details
                    single-line     density="compact"    prepend-icon=""
        append-inner-icon="$calendar" 
              />

                </div>
              </div>
            </div>

            <div
              style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div>
                <div>
                  <label class="form-label"
                    >Last Recovered Date<span style="color: #cf1c1c">
                      *</span
                    ></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    type="date"
                    variant="solo"
                    flat
                    hide-details
                    single-line
                    class="date-icon form-input"
                    v-model="form.assetRecoveredDate"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label class="form-label"
                    >Last Maintenance Date<span style="color: #cf1c1c">
                      *</span
                    ></label
                  >
                </div>
                <div>
                  <v-text-field
                    density="compact"
                    type="date"
                    variant="solo"
                    class="form-input"
                    flat
                    hide-details
                    single-line
                    v-model="form.assetLastMaintainanceDate"
                  />
                </div>
              </div>
            </div>

            <div style="margin-top: 10px">
              <div>
                <div><label class="form-label">Asset Description</label></div>
                <div>
                  <v-textarea
                    label="Describe about the Asset "
                    variant="solo"
                    flat
                    hide-details
                    single-line
                    :no-resize="true"
                    v-model="form.assetDesc"
                    @input="
                      form.assetDesc = capitalizeFirstLetter(form.assetDesc)
                    "
                  ></v-textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation buttons -->

          <div class="navigation-buttons">
            <div>
              <button
                @click="prevStep"
                v-if="currentStep !== 1"
                style="font-size: 13px; color: #2baf66;display: flex;align-items: center;display: flex;align-items: center;margin-top:0.5rem;"
              >
                <v-icon style="margin-right: 2px;" class="form-prev"
                  >mdi mdi-chevron-left</v-icon
                >Previous
              </button>
            </div>
            <div>
              <v-btn
                :disabled="!isSection1Valid"
                @click="nextStep"
                flat
                v-if="currentStep < steps.length"
                class="next-btn"
                style="border-radius: 7px"
                >Next
                <v-icon style="margin-right: 2px"
                  >mdi mdi-chevron-right</v-icon
                ></v-btn
              >
              <v-btn
                flat
                v-if="currentStep === steps.length"
                class="submit-btn"
                style="border-radius: 7px; padding: 7px 19px"
                @click="saveAsset"
                >Submit</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.custom-table {

  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
}
/* .v-data-table thead tr th {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  z-index: 10;
} */
::-webkit-scrollbar {
  width: 5px;
  height:1px;
}
/* ::-webkit-scrollbar-track {

  background-color: grey;
  border-radius: 16px;
} */

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
  height:1px;
}
.v-list.v-theme--light.v-list--density-default.v-list--one-line{
  height:100px !important;
}
.date-picker {
  width: 600px;
}
.uploaded-images {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-container {
  position: relative;
  width: 100px; /* Adjust size as needed */
  height: 100px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.delete-icon {
  position: absolute;
  top: -4px;
  right: -3px;
  background-color: #c91f1feb;
  color: white;
  border: none;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  cursor: pointer;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* .custom-table {
  min-height: 568px;
} */
/* Disable ripple effect for checkboxes in the table */
.custom-table .v-input--selection-controls__ripple {
  display: none;
}

.custom-table .v-data-table__empty-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .v-label.v-field-label.v-field-label--floating{
  top:11px !important;
} */
/* Asset section style */
.asset-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f6f8;
  /* height: 100vh; */
  padding: 2.5rem;
}
.button-section {
  background-color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 0 2px rgb(211 230 239);
  justify-content: space-between;
}
.asset-logo {
  border-radius: 100%;
  padding: 5px;
  width: 34px;
  height: 36px;
  margin-right: 1rem;
  color: #2baf66;
  background-color: #0080002b;
}
input[type='text'] {
  border-radius: 7px;
  width: 200px;
  padding-left: 11px;
}

.mdi-magnify::before {
  content: '\F0349';
  color: grey;
  font-size: 18px;
}
.my-custom-select .v-input__control {
  position: relative !important;
}

.my-custom-select .v-label {
  transition: transform 0.2s ease !important;
}

.my-custom-select .v-input--is-focused .v-label,
.my-custom-select .v-input--has-value .v-label {
  transform: translateY(-20px) !important;
}

.my-custom-select .v-input__control input:focus + .v-label {
  transform: translateY(-20px) !important;
}
.v-menu > .v-overlay__content {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  width: 100px;

  padding-top: 0px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.v-selection-control--density-default {
  color: #4caf50;
}
.v-list-item-title {
  color: grey;
  font-size: 13px;
  padding-top: 0px !important;

  margin-top: 0 !important;
}

select {
  padding: 8px;
  color: #2baf66;
  border: #2baf66 2px solid;
  border-radius: 7px;
  font-size: 13px;
  outline: none;
}
/* select:hover{
background-color: #D1EDDE;
} */
.add-asset-btn {
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: #2baf66;
  color: white;
  font-size: 13px;
  font-weight: 400;
  padding: 5px;
  padding-right: 9px;

  border-radius: 7px;
}
.mdi-plus::before {
  content: '\F0415';
  color: white;
  font-size: 15px;
}

.v-btn.v-btn--flat.v-theme--light.v-btn--density-default.v-btn--size-default.add-asset-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}
.v-label.v-field-label {
  font-size: 13px;
}

.v-field__overlay {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 7px !important ;
  box-shadow: 0 0px 2px rgb(184 199 210) !important;
}

/* styles for form section */
.step-indicators {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: -29px;
  margin-left: 8px;
  position: relative;
  width: 100%;
}

.step-indicators span {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.step-indicators span.active {
  border: 3px solid #2baf66;
  background-color: rgba(43, 175, 102, 0.2); /* Light green background */
  color: #2baf66;
}

.step-indicators span.completed {
  border: 3px solid #2baf66;
  background-color: #2baf66;
  color: white;
}

.step-indicators span.upcoming {
  border: 3px solid grey;
  background-color: transparent;
  color: grey;
}

.step-indicators span::after {
  content: '';
  position: absolute;
  width: calc(100% + 223px);
  height: 2px;
  background: #979797;
  /* right: 36%; */
  z-index: -1;
  left: 108%;
}

.step-indicators span.completed::after {
  background: #2baf66; /* Green color for completed steps */
}

.step-indicators span:last-child::after {
  display: none;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}
.form {
  padding: 23px;
}

.form-title {
  display: flex;
  justify-content: center;
  padding: 17px;
  font-size: 10px;
  color: #6d6969;
}
.v-card .v-card-title {
  line-height: 1.6;
  font-size: 17px;
  margin-left: 14rem;
}
.v-text-field .v-field--single-line input {
  color: rgb(77 76 76) !important;
}
.v-card .v-card-title {
  line-height: 1.6;
  font-size: 17px;
}
.v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-locale--is-ltr.v-text-field {
  border-radius: 4px;
}

.v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field {
  border-radius: 5px;
}

.v-input
  .v-input--horizontal
  .v-input--density-compact
  .v-theme--light
  .v-locale--is-ltr
  .v-text-field
  .date-icon {
  background-color: aquamarine;
}
/* .next-btn{
    border: 1px solid black;
    width: 91px;
    border-radius: 7px;
    font-size: 13px;
    padding-top: 5px;
    padding-bottom: 5px;
} */
.v-field.v-field--active.v-field--center-affix.v-field--flat.v-field--single-line
  .v-field--no-label.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
  color: grey;
  font-size: 13px;
}

.v-text-field:disabled {
  /* background-color: #f5f5f5; */
  cursor: not-allowed;
  background-color: #2baf66 !important;
}

.v-label .v-field-label {
  color: grey;
  font-size: 13px;
}
.v-field__input {
  font-size: 13px;
  color: grey;
}
.next-btn {
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: #2baf66;
  color: white;
  font-size: 13px;
  font-weight: 400;
}
.v-btn.v-btn--flat.v-theme--light.v-btn--density-default.v-btn--size-default.next-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}
.mdi-chevron-right::before {
  content: '\F0142';
  margin-top: 2px;
}
.mdi-close::before {
  content: '\F0156';
  margin-right: 2rem;
  color: grey;
  font-size: 18px;
}
.submit-btn {
  box-shadow: 0 0px 2px rgb(184 199 210);
  background-color: #2baf66;
  color: white;
  font-size: 13px;
  font-weight: 400;
}
.v-btn.v-btn--flat.v-theme--light.v-btn--density-default.v-btn--size-default.submit-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}

.v-input.v-input--horizontal.v-input--density-default.v-theme--light.v-locale--is-ltr.v-textarea.v-text-field.v-textarea--no-resize {
  border-radius: 4px;
}
::placeholder {
  font-size: 13px;
}
.v-text-field .v-field--single-line input {
  color: grey;
}
.date-icon.v-text-field .v-field--single-line input {
  /* margin:0 !important; */
  /* padding:0 !important;
  margin: 0 !important; */
  /* margin-right:20px !important; */
}
.mdi-calendar::before {
    content: "\F00ED";
    font-size: 17px !important;
}
.v-input.v-input--horizontal.v-input--density-default.v-theme--light.v-locale--is-ltr.v-textarea.v-text-field.v-textarea--no-resize {
  border-radius: 10px;
}

/* table styles */
.v-data-table-header__content span {
  font-size: 13px;
  color: #000000b0;
}

.v-data-table__td.v-data-table-column--align-start {
  color: grey;
  font-size: 13px;
}

.v-data-table__wrapper {
  max-height: 100%;
  overflow-y: auto;
}
.mdi-checkbox-blank-outline.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
  font-size: 16px;
}
.v-data-table-rows-no-data td {
  font-size: 12px;
  height: 36px !important;
  padding-top: 12px !important;
}
.v-selection-control .v-selection-control--density-default .v-checkbox-btn {
  color: #000000b0;
}
.v-data-table thead tr th:nth-child(6) .v-data-table-header__content {
  margin-left: 17px;
}
.manipulation-container:hover .v-icon {
  background-color: #0080002b;
  width: 31px; height: 30px;
  border-radius: 100%;
  color: #2baf66 !important;
  
}
.manipulation-icons {
  color: #787c88;
  font-size: 16px;
}
.manipulation-icons:hover {
  color: #2baf66 !important;
}
.v-divider.v-theme--light {
  display: none !important;
}
.form-label {
  font-size: 12px;
  color: rgb(86 89 98);
  margin-bottom: 8px;
}

.form-input {
  width: 260px;
}
.v-data-table-footer {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* padding: 0px 222px; */
  padding: 0px;
  /* margin-top: 3px; */
  margin-top: -16px;
  /* margin-bottom: -13px; */
  padding-left: 10px;
  padding-left: 21px;
  padding-right: 42px;
  font-size: 13px;
}
/* .v-divider.v-theme--light{
display: none;
} */

.v-data-table-footer__items-per-page {
  font-size: 12px;
}

/* .mdi-chevron-left::before {
  content: "\F0141";
  color: black;
} */
.mdi-chevron-left
  .mdi
  .v-icon
  .notranslate
  .v-theme--light
  .v-icon--size-default {
  color: black;
}

/* .mdi-page-first::before {
  content: "\F0600";
  font-size: 18px;
} */
.v-data-table-footer__items-per-page span {
  color: #000000b0;
}

.v-pagination__item.v-pagination__item--is-active {
  width: 34px;
  height: 34px;
  background-color: #0080002b;
  border-radius: 100%;
}
.v-pagination__list {
  display: inline-flex;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  margin-top: 10px;
}
.v-data-table-footer__info {
  display: flex;
  justify-content: flex-end;
  min-width: 116px;
  padding: 0 16px;
  font-size: 12px;
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
.status-inactive {
  color: gray;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 11px;
  width: 53px;
  padding-bottom: 2px;
  padding-top: 2px;
  margin-left: 29px;
  border: 1px solid grey;
  background-color: #80808024;
  opacity: 0.7;
  box-shadow: 0 0 2px rgb(205 222 237);
}
.status-maintenance {
  color: orange;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 11px;
  width: 78px;
  padding-left: 24px;
  padding-right: 22px;
  margin-left: 22px;
  border: 1px solid orange;
  background-color: #ffa50026;
  opacity: 0.7;
  box-shadow: 0 0 2px rgb(205 222 237);
  padding-bottom: 3px;
  padding-top: 3px;
}

.v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field {
  border-radius: 12px;
}

.v-data-table-footer.v-data-table-footer__items-per-page.v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field {
  border-radius: 4px !important;
}

.asset-link {
  text-decoration: none;
  color: #808080;
}

.asset-link:hover {
  text-decoration: underline;
}

/* image upload section styles */
.mdi-plus-circle-outline::before {
  content: '\F0419';
  font-size: 25px;
}
.image-add-title {
  font-size: 13px;
  color: #696666;
  font-weight: 700;
}
.image-upload {
  border: 2px dashed #cccccc;
  padding: 0.4rem;
  text-align: center;
  position: relative;
  width: 100%;
  margin: auto;
  border-radius: 7px;
}

.upload-label {
  display: block;
  cursor: pointer;
  color: #333;
}

.upload-icon {
  font-size: 33px;
  font-weight: bold;
  margin-bottom: 10px;
}

.uploaded-images {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.image-preview {
  width: 60px;
  height: 60px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 92%;
  object-fit: cover;
}
.no-img-upload {
  font-size: 12px;
  color: #212529;
  margin-top: 1.2rem;
}
.image-errmsg{
  /* color: red;
  font-size: 12px;
  margin-top: 10px; */
  /* position:absolute; */
  color: #dc3545;
    font-size: 10px;
    margin-top: 2px;
    position: absolute;
    padding: -19px;
    top: 9rm;
    display: flex
;
    align-items: center;
    justify-content: center;
    margin-left: 12rem;
    /* padding-bottom: 9rem; */
    
}
/* delete dialog */
.delete-dialog {
  width: 400px;
  border-radius: 20px;
  padding: 0.6rem;
  box-shadow: 0 0px 2px rgb(184 199 210);
}
.delete-section {
  margin-top: 10px;
  font-size: 27px;
  color: grey;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > form > .v-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* padding:0.3rem; */
  text-transform: none !important;
  letter-spacing: normal !important;
}
.v-card-text {
  color: grey;
  font-size: 10px;
  font-weight: 400;
}
.cancel-button {
  border: 1px solid #8080801a;
  width: 79px;
  background-color: #80808014;
  font-size: 13px;
  box-shadow: 0 0px 1px rgb(184 199 210);
  color: #5b636f;
  margin-right: 0.5rem;
  border-radius: 7px;
  text-transform: capitalize;
}
.delete-button {
  border: 1px solid #8080801a;
  width: 79px;
  font-size: 13px;
  box-shadow: 0 0px 1px rgb(184 199 210);
  color: white;
  background-color: #c91f1feb;
  border-radius: 7px;
  text-transform: capitalize;
}
.delete-section-buttons {
  display: flex;
  justify-content: center;
  /* margin-bottom:10px; */
}

.delete-title {
  letter-spacing: normal !important;
  font-size: 15px;
}
.v-btn__content {
  grid-area: content;
  justify-content: center;
  white-space: nowrap;
  letter-spacing: normal !important;
}
.v-dialog > .v-overlay__content > .v-card > .v-card-text,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-text {
  /* letter-spacing: .03125em; */

  /* padding: 16px 24px 15px; */
  padding: 10px;
  padding-left: 28px;
  padding-right: 28px;
}

.v-input.v-input--horizontal.v-input--center-affix.v-input--density-compact.v-theme--light.v-locale--is-ltr.v-text-field.v-select.v-select--single.v-select--selected {
  margin-right: 1rem;
}
.mdi-close-circle.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default.v-icon--clickable {
  font-size: 16px;
}
@media (min-width: 769px) and (max-width: 1024px) {
  .asset-section{
    margin-top: 4rem;
    height: none !important;
  }

  /* .v-table__wrapper{
    height:68rem;
  } */
  .button-section {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 2px rgb(211 230 239);
    justify-content: space-between;
    flex-direction: row;
}
.custom-table[data-v-544b41ee] {
    min-height: 632px;
}
}
@media (min-width: 1025px) {
  /* .asset-section{
    margin-top: 4rem;
  } */
  /* .asset-section{
    margin-top: 4rem;
  } */
  /* .v-table__wrapper{
    height:50rem;
  } */
  .button-section {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 2px rgb(211 230 239);
    justify-content: space-between;
    flex-direction: row;
    margin-top: 0rem;
}

}

@media (max-width: 480px) {

  .asset-section{
    margin-top: 4rem;
  }

  .button-section {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 2px rgb(211 230 239);
    justify-content: space-between;
    flex-direction: column;
}
.search-filter{
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.search-filter-add{
  display: flex;
  flex-direction: column;
  
}
.add-asset-btn-div{
  margin-top:1rem;
}
.v-data-table-footer {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* padding: 0px 222px; */
    padding: 0px;
    /* margin-top: 3px; */
    margin-top: 23px;
    padding-left: 34px;
    padding-right: 41px;
    font-size: 13px;
    flex-direction: row;
}
.v-data-table-footer__info {
    display: flex
;
    justify-content: center;
    min-width: 116px;
    padding: 0 16px;
    font-size: 12px;
    margin-left: 5rem;
}
.v-data-table-footer__items-per-page {
    align-items: center;
    display: flex
;
    justify-content: center;
    margin-left: 5rem;
}

  .custom-table th:nth-child(1),
.custom-table td:nth-child(1) {
  position: sticky;
  left: 0;
  background-color: white;
  /* z-index: 3;  */
}

.custom-table th:nth-child(2),
.custom-table td:nth-child(2) {
  position: sticky;
  left: 40px; 
  background-color: white;
  /* z-index: 2; */
}

.custom-table[data-v-544b41ee] {
    min-height: 525px;
}

}
@media (max-width: 768px) {
  .asset-section{
    margin-top: 4rem;
  }
  .custom-table[data-v-544b41ee] {
    min-height: 565px;
}
  /* .v-table__wrapper{
    height:50rem;
  } */
  .button-section {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 2px rgb(211 230 239);
    justify-content: space-between;
    flex-direction: column;
}
.search-filter{
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.search-filter-add{
  display: flex;
  flex-direction: column;
  
}
.add-asset-btn-div{
  margin-top:1rem;
}
.v-data-table-footer {
    align-items: center;
    display: flex
;
    flex-wrap: wrap;
    justify-content: space-between;
    /* padding: 0px 222px; */
    padding: 0px;
    /* margin-top: 3px; */
    margin-top: 23px;
    /* margin-bottom: -13px; */
    /* padding-left: 10px;
    padding-left: 21px;
    padding-right: 42px; */
    padding-left: 34px;
    padding-right: 41px;
    font-size: 13px;
    flex-direction: row;
}
table > tbody > tr > td:nth-child(2),
  table > thead > tr > th:nth-child(2) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    /* z-index: 9998; */
    background: white;
  }
  table > tbody > tr > td:nth-child(1),
  table > thead > tr > th:nth-child(1){
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    /* z-index: 9998; */
    background: white;
  }
}
table > tbody > tr > td:nth-child(2),
  table > thead > tr > th:nth-child(2){
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    /* z-index: 9998; */
    background: white;
  }
  table > tbody > tr > td:nth-child(1),
  table > thead > tr > th:nth-child(1){
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    /* z-index: 9998; */
    background: white;
  }
  table > thead > tr > th:nth-child(1) {
    /* z-index: 1000; */
  }

</style>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAssetsStore, Asset } from '@/stores/useAssetsStore';
import { useRouter } from 'vue-router';
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';
import AssetTable from '@/components/AssetTable.vue';
import SearchButton from '@/components/SearchButton.vue';
import { VDateInput } from 'vuetify/labs/VDateInput'
// import Datepicker from 'vue3-datepicker';
// import 'vue3-datepicker/dist/vue3-datepicker.css';
const router = useRouter();
const assetsStore = useAssetsStore();

const isModalOpen = ref<boolean>(false);
const isEditMode = ref<boolean>(false);
const isDeleteModalOpen = ref(false);
const search = ref('');
const selectedStatus = ref('');
const deleteAssetId = ref<string>('');
// const errorMessage = ref(""); 

const currentStep = ref(1);
const steps = ref(['Asset Identity', 'Asset Info']);
const assetCategories = ref(['Hardware', 'Software']);
const assetStatus = ref(['Active', 'Inactive', 'Maintenance']);
const statusOptions = ['Active', 'Inactive', 'Maintenance'];
const assets = computed(() => assetsStore.assets);

const purchaseDate = ref(null);  
const showDatePicker = ref(false);  


// const purchaseDate = ref(null);  
// const showDatePicker = ref(false);  

// const showDatePicker = ref(false);
// const form = ref({
//   purchaseDate: ''
// });




// const toggleDatePicker = () => {
//   showDatePicker.value = !showDatePicker.value;
// };

//form input fields initialized to empty string
const form = ref<Asset>({
  assetName: '',
  assetId: '',
  assetCategory: '',
  assetAllocatedto: '',
  assetStatus: '',
  modelName: '',
  assetDesc: '',
  assetModelnumber: '',
  // purchaseDate:new Date(''),
  // purchaseDate:'',
  purchaseDate: undefined,
  assetQuantity: '',
  assetWarantynumber: '',
  assetCost: '',
  assetRecoveredDate: '',
  assetLastMaintainanceDate: '',

  assetImage: [] as string[],
});
// const parsedDate = typeof form.value.purchaseDate === 'string' 
//   ? new Date(form.value.purchaseDate) 
//   : form.value.purchaseDate;
//   function isSameDay(date1: Date | string, date2: Date | string): boolean {
//   const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
//   const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
//   return d1.toDateString() === d2.toDateString();
// }
// function formatDate(date:Date) {
//   const formattedDate = new Date(date);
//   const day = String(formattedDate.getDate()).padStart(2, '0'); 
//   const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
//   const year = formattedDate.getFullYear();
//   form.value.purchaseDate = `${day}/${month}/${year}`;
//   showDatePicker.value = false;
// }

// const parsedDate = typeof form.purchaseDate === 'string' ? new Date(form.purchaseDate) : form.purchaseDate;

const parsedDate = typeof form.value.purchaseDate === 'string' 
  ? new Date(form.value.purchaseDate) 
  : form.value.purchaseDate;
  function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return d1.toDateString() === d2.toDateString();
}


//datepicker
interface Config {
  allowStopPropagation?: boolean;
  closeOnScroll?: boolean;
  modeHeight?: number;
  allowPreventDefault?: boolean;
  closeOnClearValue?: boolean;
  closeOnAutoApply?: boolean;
  noSwipe?: boolean;
  keepActionRow?: boolean;
  onClickOutside?: (validate: () => boolean) => void;
  tabOutClosesMenu?: boolean;
  arrowLeft?: string;
  keepViewOnOffsetClick?: boolean;
  timeArrowHoldThreshold?: number;
  shadowDom?: boolean;
  mobileBreakpoint?: number;
  setDateOnMenuClose?: boolean;
}

const filteredAssets = computed(() => {
  return selectedStatus.value
    ? assetsStore.filterAssetsByStatus(selectedStatus.value)
    : assetsStore.assets;
});
const requiredRule = (value: Asset) => !!value || 'This field is required';

// Function to handle the image upload
function handleImageUpload(event: Event) {
  const files = (event.target as HTMLInputElement)?.files;

  if (files && files.length > 0) {
    const images: string[] = [];

    if (files.length > 5) {
      // alert('You can only upload a maximum of 5 files.');
      errorMessage.value="You can only upload a maximum of 5 files."
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 2 * 1024 * 1024) {
        // alert('Each file must be less than 2 MB.');
        errorMessage.value="Each file must be less than 2 MB."
        return;
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        // alert('Only JPEG and PNG files are allowed.');
        errorMessage.value="Only JPEG and PNG files are allowed."
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        images.push(result);

        if (images.length === files.length) {
          form.value.assetImage = images;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}

function deleteImage(index: number) {
  form.value.assetImage?.splice(index, 1); // Remove the image from the array
}
const errorMessage = ref(""); 

// input field required function
const rules = {
  required: (value: Asset) => !!value || 'This field is required',
};

const capitalizeFirstLetter = (value: string) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// function to open the form modal
function openCreateModal() {
  isModalOpen.value = true;
  isEditMode.value = false;
}

//function to switch to edit mode
function openEditModal(asset: Asset) {
  isEditMode.value = true;
  form.value = { ...asset };
  isModalOpen.value = true;
}

//function to save the asset to the store when the details are entered or editted
function saveAsset() {
  if (isEditMode.value) {
    assetsStore.updateAsset({ ...form.value });
  } else {
    assetsStore.addAsset(form.value);
  }
  clearModal();
  closeModal();
}

//function to clear the input fields
function clearModal() {
  form.value = {
    assetName: '',
    assetId: '',
    assetCategory: '',
    assetAllocatedto: '',
    assetStatus: '',
    modelName: '',
    assetWarantynumber: '',
    assetDesc: '',
  };
}
//function to close the form modal
function closeModal() {
  isModalOpen.value = false;
  currentStep.value = 1;
  clearModal();
  search.value = '';
  selectedStatus.value = '';
}


//form functions for steps
// Computed property to check if Section 1 fields are filled
const isSection1Valid = computed(() => {
  return (
    form.value.assetName &&
    form.value.assetId &&
    form.value.assetCategory &&
    form.value.assetStatus &&
    form.value.modelName &&
    form.value.assetModelnumber
  );
});


const nextStep = () => {
  if (currentStep.value < steps.value.length && isSection1Valid.value) {
    currentStep.value++;
  }
};

// Logic to go to the previous step
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};


//table column names
const headers = [
  { title: 'Asset Name', key: 'assetName' },
  { title: 'Asset Id', key: 'assetId' },
  { title: 'Asset Category', key: 'assetCategory' },
  { title: 'Asset Allocated To', key: 'assetAllocatedto' },
  { title: 'Asset Status', key: 'assetStatus' },
  { title: 'Actions', key: 'actions', sortable: true },
];
function statusClass(status: string) {
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
// //function to delet the form model using assetId
// function deleteAsset(assetId: string) {
// assetsStore.deleteAsset(assetId);
// }
// function deleteAsset(assetId: string) {
//     if (confirm("Are you sure you want to delete this asset?")) {
//         assetsStore.deleteAsset(assetId);
//     }
// }
const confirmDelete = (assetId: string) => {
  deleteAssetId.value = assetId; // Store the ID of the item to delete
  isDeleteModalOpen.value = true; // Open the modal
};
const handleDelete = () => {
  assetsStore.deleteAsset(deleteAssetId.value); // Delete the asset
  closeDeleteModal(); // Close the modal
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  deleteAssetId.value = ''; // Reset the ID
};

//function to view the asset using router params
function viewAsset(assetId: string) {
  router.push({ path: `/asset-page/${assetId}` });
}

// Method to handle "Clear Filter" option
// const handleSelectChange = () => {
//   if (selectedStatus.value === 'clear-filter') {
//     selectedStatus.value = ''; // Reset the filter when "Clear Filter" is selected
//   }
// };
</script>
