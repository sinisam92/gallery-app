<template>
  <div>
    <search></search>
    <div class="col-lg-6 portfolio-item" v-for="gallery in galleries" :key="gallery.id">
      <div class="card h-100">
        <img class="card-img-top" :src="gallery.images[0].image_url" alt>
        <div class="card-body">
          <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
            <h4 class="card-title">
              <a href="#">{{ gallery.title }}</a>
            </h4>
          </router-link>
          <p>Author:</p>
          <router-link to="#" class="box-title">
            <h4>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
          </router-link>
          <small>Created at: {{ gallery.created_at | formatDate }}</small>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-dark" @click="loadMore">Load More</button>
  </div>
</template>

<script>
import galleriesService from "./../services/galleries-service";
import { DateMixin } from "./../utils/mixins";
import Search from "./../components/partials/Search";

export default {
  name: "AllGalleries",
  mixins: [DateMixin],
  components: {
    Search
  },
  data() {
    return {
      galleries: [],
      page: 1,
      term: ""
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleriesService.getGalleries(this.page, this.term).then(galleries => {
        this.galleries.push(...galleries);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getGalleries().then(response => {
      next(vm => {
        vm.galleries = response;
        console.log(vm.galleries);
      });
    });
  }
};
</script>

<style scoped>
.portfolio-item {
  display: inline-block;
  width: 50%;
  margin-bottom: 40px;
}
.h-100 {
  box-shadow: 10px 10px 5px #aaaaaa;
}
</style>
