<template>
  <b-card>
    <b-card-header class="p-0 position-relative" v-if="noSuffle!=false">
      <div class="position-absolute handle card-icon">
        <i class="simple-icon-shuffle" />
      </div>
    </b-card-header>
    <b-card-body class=" align-items-center">
      <b-card-text>
        <h5 class="mb-0 card-title lead">{{ service.title }}</h5>
        <p class="mt-4" style="font-size: 20px; max-width: 40rem">{{ service.description }}</p>
      </b-card-text>
      <div v-if="service.type == 'modal'">
        <b-button v-b-modal.smallmodal size="lg" class="btn mb-2 btn-primary btn-lg">{{ service.buttonText }}</b-button>
        <b-modal id="smallmodal" ref="smallmodal" :title="service.title">
          <ul>
            <li v-for="(applink, index) in service.location" :key="index">
              <router-link :to="{ name: `${applink.link}` }">{{ applink.title }}</router-link>
            </li>
          </ul>
          <template slot="modal-footer">
            <b-button variant="secondary" @click="hideModal('smallmodal')">Cancel</b-button>
          </template>
        </b-modal>
      </div>
      <div v-else="service.type.mode == 'link'">
        <router-link :to="service.type.location" size="lg" class="btn mb-2 btn-primary btn-lg">{{ service.buttonText }}</router-link>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
// import SmallModal from '@/components/payo/SmallModal'
export default {
  name: 'ListcardComponent',
  props: {
    service: {
      type: Object,
      required: true
    },
  },
  // components: { 'small-modal': SmallModal },
  data() {
    return {
      noSuffle: false
    };
  },
  methods: {
    hideModal(refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
    somethingModal(refname) {
      this.$refs[refname].hide()
      console.log('something modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    }
  }
};

</script>
<style lang="css" scoped>
</style>
