<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
      <div class="top-right-button-container">
        <b-dropdown
          id="ddown5"
          :text="$t('pages.actions')"
          size="lg"
          variant="outline-primary"
          class="top-right-button top-right-button-single"
          no-fade="true"
        >
          <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
          <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
        </b-dropdown>
      </div>
      <piaf-breadcrumb />
      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab :title="$t('pages.profile')">
          <b-row>
            <b-colxx xxs="12" class="mb-5">
              <!-- <b-card>
                <single-lightbox
                  thumb="/assets/img/social-header.jpg"
                  large="/assets/img/social-header.jpg"
                  class-name="social-header card-img"
                />
              </b-card>-->
            </b-colxx>
            <b-colxx xxs="12" lg="7" xl="8" class="col-left">
              <div class="generate link mb-5">
                <b-card>
                  <div v-show="showForm">
                    <p>Request for a token, in order to edit your profile</p>
                    <b-button variant="primary" @click.prevent="generateToken">Generate Token</b-button>
                  </div>
                  <div v-show="!showForm">
                    <h3>Please here is your generated token</h3>
                    <h1>Token: {{token}}</h1>
                    <h5>Instructions on how to use your token</h5>
                    <ul>
                      <li>
                        <p>Step 1: Take this code to the office, either take a screenshot or copy the code.</p>
                      </li>
                      <li>
                        <p>Step 2: Fill out your form, including the details you will like to change and also include your token at the top of the form.</p>
                      </li>
                      <li>
                        <p>Step 3: Submit your form to the co-operative staff, and the rest will be handled.</p>
                      </li>
                    </ul>
                  </div>
                </b-card>
              </div>
              <div class="generate link mb-5">
                <b-card>
                  <div v-show="showSavings">
                    <p>Request for a token, in order to edit your savings account</p>
                    <b-button variant="primary" @click.prevent="generateSavingsToken">Generate Token</b-button>
                  </div>
                  <div v-show="!showSavings">
                    <h3>Please here is your generated token</h3>
                    <h1>Token: {{savingsToken}}</h1>
                    <h5>Instructions on how to use your token</h5>
                    <ul>
                      <li>
                        <p>Step 1: Take this code to the office, either take a screenshot or copy the code.</p>
                      </li>
                      <li>
                        <p>Step 2: Fill out your form, including the details you will like to change and also include your token at the top of the form.</p>
                      </li>
                      <li>
                        <p>Step 3: Submit your form to the co-operative staff, and the rest will be handled.</p>
                      </li>
                    </ul>
                  </div>
                </b-card>
              </div>
            </b-colxx>
            <b-colxx xxs="12" lg="5" xl="4" class="col-right">
              <single-lightbox
                :thumb="userData.avatar"
                :large="userData.avatar"
                class-name="img-thumbnail card-img social-profile-img"
              />
              <b-card class="mb-4" no-body>
                <b-card-body>
                  <div class="text-center pt-4">
                    <p
                      class="list-item-heading pt-2"
                    >{{ userData.first_name }} {{ userData.last_name }}</p>
                  </div>
                  <p class="text-muted text-small mb-2">{{$t('pages.location')}}</p>
                  <p class="mb-3">Omu-Aran Kwara, Nigeria</p>
                  <p class="text-muted text-small mb-2">Your Role</p>
                  <p class="mb-3">
                    <b-badge variant="outline-secondary" class="mb-1 mr-1" pill>{{ userData.role }}</b-badge>
                  </p>
                  <p class="mb-3">
                    <span class="text-muted">Staff ID:</span>
                    {{ userData.employed_valid_id_card ? userData.employed_valid_id_card : 'N/A' }}
                  </p>
                  <p class="mb-3">
                    <span class="text-muted">College:</span>
                    {{ userData.college ? userData.college : 'N/A' }}
                  </p>
                  <p class="mb-3">
                    <span class="text-muted">Department:</span>
                    {{ userData.department ? userData.department : 'N/A' }}
                  </p>
                  <p>
                    <span class="text-muted">Address:</span>
                    {{ userData.address ? userData.address : 'N/A' }}
                  </p>
                  <p>
                    <span class="text-muted">Phone Number:</span>
                    {{ userData.phone_number ? userData.phone_number : 'N/A' }}
                  </p>
                  <p>
                    <span class="text-muted">Email:</span>
                    {{ userData.email ? userData.email : 'N/A' }}
                  </p>
                  <div class="social-icons">
                    <ul class="list-unstyled list-inline">
                      <li class="list-inline-item">
                        <router-link to="#">
                          <i class="simple-icon-social-facebook"></i>
                        </router-link>
                      </li>
                      <li class="list-inline-item">
                        <router-link to="#">
                          <i class="simple-icon-social-twitter"></i>
                        </router-link>
                      </li>
                      <li class="list-inline-item">
                        <router-link to="#">
                          <i class="simple-icon-social-instagram"></i>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </b-card-body>
              </b-card>
              <!-- <b-card class="mb-4" no-body>
                <b-card-body>
                  <b-card-title>{{$t('pages.similar-projects')}}</b-card-title>
                  <gallery-detail />
                </b-card-body>
              </b-card>-->
            </b-colxx>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-colxx>
  </b-row>
</template>
<script>
import SingleLightbox from "../../../../components/Pages/SingleLightbox";
import GalleryDetail from "../../../../components/Pages/GalleryDetail";
import GalleryProfile from "../../../../components/Pages/GalleryProfile";
import UserFollow from "../../../../components/Cards/UserFollow";
import RecentPost from "../../../../components/Common/RecentPost";
import UserCardBasic from "../../../../components/Cards/UserCardBasic";
import Post from "../../../../components/Cards/Post";

import VueDropzone from "vue2-dropzone";
import InputTag from "@/components/Form/InputTag/";
import produtcs from "../../../../data/products";
import recentPosts from "../../../../data/recentPosts";
import followers from "../../../../data/follow";
import posts from "../../../../data/posts";
// Application Imports
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    "single-lightbox": SingleLightbox,
    "gallery-detail": GalleryDetail,
    "gallery-profile": GalleryProfile,
    "user-follow": UserFollow,
    "recent-post": RecentPost,
    "user-card-basic": UserCardBasic,
    post: Post,
    InputTag,
    "vue-dropzone": VueDropzone,
  },
  data() {
    return {
      userData: null,
      requestError: null,
      token: null,
      savingsToken: null,
      showForm: true,
      showSavings: true,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser", "processing"]),
    ...mapState("user", ["updateToken"]),
    ...mapState("savings", ["savingsUpdateToken"]),
    ...mapState("notification", ["notifications"]),
  },
  methods: {
    ...mapActions("user", ["GenerateToken"]),
    ...mapActions("savings", ["GenerateSavingsToken"]),
    ...mapActions("notification", ["remove"]),
    removeNotification(notification) {
      // console.log(notification)
      this.remove(notification);
    },
    onHorizontalSubmit() {
      console.log(JSON.stringify(this.horizontalForm));
    },
    generateToken() {
      // generate token
      const payload = {
        id: this.userData.id,
      };
      this.GenerateToken(payload);
    },
    generateSavingsToken() {
      const payload = {
        id: this.userData.id,
      };
      this.GenerateSavingsToken(payload);
    },
  },
  watch: {
    currentUser: {
      immediate: true,
      handler: function (currentUser) {
        let as = this;
        if (currentUser && currentUser != null) {
          as.userData = currentUser;
          // console.log(as.userData);
          // console.log(currentUser);
        }
      },
    },
    updateToken: {
      handler: function (token) {
        this.token = token;
        this.showForm = false;
      },
    },
    savingsUpdateToken: {
      handler: function (token) {
        this.savingsToken = token;
        this.showSavings = false;
      },
    },
    notifications(notifications) {
      // loop through all notifications and
      // display one at a time
      notifications.forEach((notification) => {
        this.$notify(`${notification.type}`, notification.message, {
          duration: 8000,
          permanent: false,
        });
        if (notification.type == "error") {
          this.requestError = true;
        }
        // let as = this;
        if (notification.type == "success") {
          this.requestError = false;
        }
        this.removeNotification(notification);
      });
    },
  },
  mounted() {},
};
</script>
