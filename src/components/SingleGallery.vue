<template>
  <div class="root">
    <h1 class="title">{{ gallery.title }}</h1>Author
    <router-link to="#">
      <h4 class="title author">{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
    </router-link>Created At:
    <small class="title">{{ gallery.created_at }}</small>
    <h4 class="card h-100">{{ gallery.description }}</h4>
    <div>
      <b-carousel
        id="carousel1"
        controls
        indicators
        :interval="4000"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <div v-for="image in gallery.images" :key="image.id">
          <a :href="image.image_url" target="_blank">
            <b-carousel-slide>
              <img
                slot="img"
                class="d-block img-fluid w-100"
                :src="image.image_url"
                alt="image slot"
              >
            </b-carousel-slide>
          </a>
        </div>
      </b-carousel>
    </div>
    <hr>
    <div class="container" v-for="comment in gallery.comments" :key="comment.id">
      <p class="comment-author">Author: {{ comment.user.first_name }} {{ comment.user.last_name }}</p>
      <p class="comment-author">Created :{{ comment.created_at | diffForHumans }}</p>
      <p class="comment-author">{{ comment.body }}</p>
      <hr>
    </div>
    <div v-if="user">
      <b-form-textarea
        id="textarea1"
        v-model="newComment.body"
        placeholder="Enter something"
        :rows="3"
        :max-rows="6"
      ></b-form-textarea>
      <b-button variant="outline-secondary" class="comment-button" @click="addComment">Submit</b-button>
    </div>
  </div>
</template>

<script>
import galleriesService from "./../services/galleries-service";
import commentService from "./../services/comment-service";
import { DateMixin } from "./../utils/mixins";
import { mapGetters } from "vuex";
export default {
  name: "Singlegallery",
  mixins: [DateMixin],
  data() {
    return {
      gallery: Object,
      newComment: {},
      errors: null
    };
  },
  methods: {
    addComment() {
      commentService
        .addComment(this.$route.params.id, this.newComment)
        .then(response => {
          this.gallery.comments.push(response.data[0]);
          this.newComment = "";
        })
        .catch(error => {
          this.errors = error;
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getSingleGallery(to.params.id).then(response => {
      next(vm => {
        vm.gallery = response.data;
        console.log(response.data);
      });
    });
  }
};
</script>

<style scoped>
hr {
  height: 10px;
}
.comment-author {
  text-align: left;
}
.root {
  margin-bottom: 50px;
}
.comment-button {
  margin-top: 10px;
  float: right;
}
</style>
