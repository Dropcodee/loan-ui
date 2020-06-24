<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
      <div class="top-right-button-container">
        <b-dropdown id="ddown5" :text="$t('pages.actions')" size="lg" variant="outline-primary" class="top-right-button top-right-button-single" no-fade="true">
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
              <b-form >
                <b-form-group label-cols="2" horizontal label="Working College">
                  <b-form-input v-model="userData.college" :placeholder="userData.college"></b-form-input>
                </b-form-group>
                <b-form-group label-cols="2" horizontal label="Working Department">
                  <b-form-input v-model="userData.department" :placeholder="userData.department"></b-form-input>
                </b-form-group>
                <b-form-group label-cols="2" horizontal label="Staff ID Number">
                  <b-form-input v-model="userData.employed_valid_id_card" :placeholder="userData.employed_valid_id_card"></b-form-input>
                </b-form-group>
                <b-form-group label-cols="2" horizontal label="Email">
                  <b-form-input v-model="userData.email" :placeholder="userData.email"></b-form-input>
                </b-form-group>
                <b-button type="button" @click.prevent="updateProfile" variant="primary" class="mt-4">
                  UPDATE PROFILE
                </b-button>
              </b-form>
            </b-colxx>
            <b-colxx xxs="12" lg="5" xl="4" class="col-right">
              <single-lightbox :thumb="userData.avatar" :large="userData.avatar" class-name="img-thumbnail card-img social-profile-img" />
              <b-card class="mb-4" no-body>
                <b-card-body>
                  <div class="text-center pt-4">
                    <p class="list-item-heading pt-2">{{ userData.first_name }} {{ userData.last_name }}</p>
                  </div>
                  <p class="text-muted text-small mb-2">{{$t('pages.location')}}</p>
                  <p class="mb-3">Omu-Aran Kwara, Nigeria</p>
                  <p class="text-muted text-small mb-2">Your Role</p>
                  <p class="mb-3">
                    <b-badge variant="outline-secondary" class="mb-1 mr-1" pill>{{ userData.role }}</b-badge>
                  </p>
                  <p class="text-muted text-small mb-2">Employment</p>
                  <p class="mb-3"><span class="text-muted">College:</span> {{ userData.college ? userData.college : 'N/A' }}</p>
                  <p class="mb-3"><span class="text-muted">Department:</span> {{ userData.department ? userData.department : 'N/A' }}</p>
                  <p class="text-muted text-small mb-2">{{$t('menu.contact')}}</p>
                  <p><span class="text-muted">Address:</span> {{ userData.address ? userData.address : 'N/A' }}</p>
                  <p><span class="text-muted">Phone Number:</span> {{ userData.phone_number ? userData.phone_number : 'N/A' }}</p>
                  <p><span class="text-muted">Email:</span> {{ userData.email ? userData.email : 'N/A' }}</p>
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
        <b-tab :title="$t('pages.images')">
          <gallery-profile />
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
import { mapGetters, mapActions } from 'vuex'
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
    "vue-dropzone": VueDropzone
  },
  data() {
    return {
      userData: null,
      form: {
        email: '',
        college: '',
        department: '',
        staffId: ''
      },
    };
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    ...mapActions('loan', ['UpdateUserProfile']),
    onHorizontalSubmit() {
      console.log(JSON.stringify(this.horizontalForm));
    },
    updateProfile() {
      try {
      this.UpdateUserProfile(userData)
      }catch(err) {
        return err
      }
    }
  },
  watch: {
    currentUser: {
      immediate: true,
      handler: function(currentUser) {
        let as = this;
        if(currentUser && currentUser != null) {
          as.userData = currentUser;
          console.log(as.userData)
          console.log(currentUser)
        }
      }
    }
  },
  mounted() {}
};

</script>
