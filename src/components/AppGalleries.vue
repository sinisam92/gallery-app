<template>
  <div>
      <search></search>
      <div class="row" v-for="gallery in galleries" :key="gallery.id">
        <div class="col-lg-6 portfolio-item">
          <div class="card h-100">
              <img class="card-img-top" :src="gallery.images[0].image_url" alt>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">{{ gallery.title }}</a>
              </h4>
              <p class="card-text">{{ gallery.description }}</p>
            </div>
          </div>
      </div>
    </div>
<!-- 
    <div class="gallery" v-for="gallery in galleries" :key="gallery.id">
      <img class="card-img-top" :src="gallery.images[0].image_url" alt>
      <h4 class="card-title">
                <a href="#">{{ gallery.title }}</a>
      </h4>
      <p class="card-text">{{ gallery.description }}</p>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Search from "./../components/partials/Search";

export default {
  name: "AllGalleries",
  components: {
    Search
  },
  data() {
    return {
      searchTerm: ""
    };
  },
  created() {
    this.getGalleries();
  },
  methods: {
    ...mapActions(["getGalleries"])
  },
  computed: {
    ...mapGetters({
      galleries: "getGalleries"
    })
  }
};
</script>

<style scoped>
/* .container  {
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 2rem;
}

.row {
    width: 400px;

} */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
* {
  box-sizing: border-box;
  
}
.portfolio-item {
    margin-bottom: 30px;
} 

</style>
