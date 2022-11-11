<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new Product</h2>
            <form>
              <!-- Category Dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option
                    v-for="category in categories"
                    :value="category._id"
                    :key="category._id"
                  >
                  {{ category.type }}
                  </option>
                 </select>
              </div>

               <!-- Owner Dropdown -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerID">
                   <option
                    v-for="owner in owners"
                    :value="owner._id"
                    :key="owner._id"
                  >
                   {{ owner.name }}
                   </option>
                 </select>
              </div>
              <!-- Title input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Title</label>
                <!-- <input type="text" class="a-input-text" style="width: 100%" v-model="title" /> -->
              </div>

              <!-- Price input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Price</label>
                <!-- <input type="number" class="a-input-text" style="width: 100%" v-model="price" /> -->
              </div>

              <!-- StockQuantity input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Stock Quantity</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                />
              </div>

              <!-- Description textarea -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Description</label>
                <!-- <textarea
                  placeholder="Provide details such as a product description"
                  style="width: 100%"
                  v-model="description"
                ></textarea> -->
              </div>

              <!-- Photo file -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <!-- <input type="file" @change="onFileSelected" /> -->
                    <!-- <p style="margin-top: -70px">{{ fileName }}</p> -->
                    <p style="margin-top: -70px">fileName</p>
                  </label>
                </div>
              </div>
              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <!-- <span class="a-button-text" @click="onAddProduct">Add product</span> -->
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
 async asyncData({ $axios }){
  try{

    let categories = $axios.$get('http://localhost:5000/api/v1/amazon/categories')
    let owners = $axios.$get('http://localhost:5000/api/v1/amazon/owners')

  const [dataCategories, dataOwners] = await Promise.all([categories, owners])

  return {
    categories: dataCategories.categories,
    owners: dataOwners.owners
  }

  }catch(err){
    console.error(err);
  }
 }
}
</script>

<style>
.container-fluid{
  width: 60%;
  margin: auto;
}
</style>
