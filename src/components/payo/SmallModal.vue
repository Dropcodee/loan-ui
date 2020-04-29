<template>
  <b-modal id="smallmodal" ref="smallmodal" :title="$t('modal.modal-title')">
    <div v-if="appModal.type == 'links">
      <ul v-for="(applink, index) in applinks" :key="index">
        <li>
          <router-link :to="applink.link">{{ applink.title }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>{{ appModal.content }}</p>
    </div>
    <template slot="modal-footer">
      <b-button variant="secondary" @click="hideModal('smallmodal')">Cancel</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {

  name: 'SmallModal',
  props: {
    appModal: {
        type: Object,
        required: true
    },
    applinks: {
        type: Array,
        required: true
    }
  },
  data() {
    return {
      selectedBackdrop: 'true',
      backdropOptions: ['true', 'false', 'static']
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
