<template>
  <div>
    <search @search="search"></search>
    <div class="col-lg-6 portfolio-item" v-for="gallery in galleries" :key="gallery.id">
      <div class="card h-100">
        <img class="card-img-top" :src="gallery.images[0].image_url" alt>
        <div class="card-body">
          <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
            <h4 class="card-title">
              <h4>{{ gallery.title }}</h4>
            </h4>
          </router-link>
          <p>Author:</p>
          <h4>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
          <small>Created at: {{ gallery.created_at | formatDate }}</small>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
    <button
      class="btn btn-outline-dark load-more"
      v-if=" page != last_page"
      @click="loadMore"
    >Load More</button>
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
      term: "",
      last_page: null
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleriesService.getGalleries(this.page, this.term).then(galleries => {
        this.galleries.push(...galleries.data);
        this.last_page = galleries.last_page;
      });
    },
    search(term) {
      this.page = 1;
      this.term = term;
      galleriesService.getGalleries(this.page, this.term).then(galleries => {
        this.galleries = galleries.data;
        this.last_page = galleries.last_page;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getGalleries().then(galleries => {
      next(vm => {
        vm.galleries = galleries.data;
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
.load-more {
}
</style>
