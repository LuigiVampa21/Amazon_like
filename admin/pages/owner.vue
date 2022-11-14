<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new owner</h2>
          <form>
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input class="a-input-text" style="width: 100%" v-model="name" />
            </div>

            <!-- About -->
            <div class="a-spacing-top-medium">
              <label>About</label>
              <input class="a-input-text" style="width: 100%" v-model="about" />
            </div>

            <!-- Photo file -->
            <div class="a-spacing-top-medium">
              <label style="margin-bottom: 0px;">Add Photo</label>
              <div class="a-row a-spacing-top-medium">
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input type="file" @change="onFileSelected" />
                  <p style="margin-top: -70px">{{ fileName }}</p>
                </label>
              </div>
            </div>

            <!-- Button -->
            <hr />
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                </span>
              </span>
            </div>
          </form>
          <br />
          <ul class="list-group">
            <li v-for="owner in owners" :key="owner._id" class="list-group-item">{{ owner.name }}</li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get("http://localhost:5000/api/v1/amazon/owners");
      return {
        owners: response.owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddOwner() {
      try {
        const data = new FormData()
          data.append('name', this.name);
          data.append('about', this.about);
        // data.append("photo", this.selectedFile, this.selectedFile.name);
        console.log(this.name);
        const response = await this.$axios.$post(
          "http://localhost:5000/api/v1/amazon/owners",{
            name: this.name,
            about: this.about,
          }
        );
        this.owners.push({name: this.name});
        console.log(this.owners);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>

.container-fluid{
  width: 60%;
  margin: auto;
}

.list-group-item{
  border: 1px solid grey;
  padding: 10px;
  margin-bottom: 5px;
}
</style>

