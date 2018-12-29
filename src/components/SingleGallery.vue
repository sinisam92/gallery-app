<template>
  <div class="root">
    <h1 class="title">{{ gallery.title }}</h1>Author
    <router-link :to="{ name: 'authors-gallery', params: { id: userId }}">
      <h4 class="title author">{{ username }}</h4>
    </router-link>

    <small class="title">{{ gallery.created_at }}</small>
    <h4 class="card h-100 description">{{ gallery.description }}</h4>
    <div class="btn-group" v-if="currentUserId == userId">
      <router-link
        :to="{ name: 'edit', params: { id: gallery.id }}"
        class="btn btn-outline-dark"
      >Edit</router-link>
      <button class="btn btn-outline-dark" @click="deleteGallery">Delete</button>
    </div>
    <div>
      <b-carousel
        id="carousel1"
        class="carousel-slide"
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
    <div class="container" v-for="(comment, index) in gallery.comments" :key="comment.id">
      <p class="comment-author">Author: {{ comment.user.first_name }} {{ comment.user.last_name }}</p>
      <p class="comment-author">Created :{{ comment.created_at | diffForHumans }}</p>
      <p class="comment-author">{{ comment.body }}</p>
      <button
        v-if="comment.user_id == currentUserId"
        class="btn btn-outline-secondary"
        @click="deleteComment(comment.id, index)"
      >Delete</button>
      <hr>
    </div>
    <div class="form-group">
      <form v-if="currentUserId" @keyup.enter="addComment">
        <label for="exampleFormControlTextarea1">Leave a comment</label>
        <textarea
          class="form-control"
          v-model="newComment.body"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import galleriesService from "./../services/galleries-service";
import commentService from "./../services/comment-service";
import { DateMixin } from "./../utils/mixins";
export default {
  name: "Singlegallery",
  mixins: [DateMixin],
  data() {
    return {
      gallery: Object,
      newComment: {},
      username: null,
      userId: null,
      slide: 0,
      sliding: null,
      errors: null
    };
  },
  methods: {
    addComment() {
      commentService
        .addComment(this.$route.params.id, this.newComment)
        .then(galleries => {
          this.gallery.comments.push(galleries);
          this.newComment = {};
        });
    },
    deleteComment(id, index) {
      if (confirm("Are you sure?")) {
        this.gallery.comments.splice(index, 1);
        commentService.delete(id);
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    deleteGallery() {
      if (this.userId == this.currentUserId) {
        if (confirm("Are you sure?")) {
          galleriesService.deleteGallery(this.$route.params.id).then(() => {
            this.$router.push({ name: "my-galleries" });
          });
        }
      }
    }
  },
  computed: {
    currentUserId() {
      let id = Number(localStorage.getItem("id"));
      return id ? id : 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getSingleGallery(to.params.id).then(gallery => {
      next(vm => {
        vm.gallery = gallery;
        vm.userId = gallery.user_id;
        vm.username = gallery.user.first_name + " " + gallery.user.last_name;
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
.btn-outline-secondary {
  text-align: right;
}
.btn-outline-dark {
  margin-bottom: 4px;
}
.carousel-slide {
  box-shadow: 10px 10px 5px #aaaaaa;
}
.description {
  background-color: #e1e1e1;
}
</style>
