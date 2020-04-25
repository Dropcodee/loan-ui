<template>
    <b-card>
    <b-card-header class="p-0 position-relative" v-if="noSuffle!=false">
        <div class="position-absolute handle card-icon">
            <i class="simple-icon-shuffle" />
        </div>
    </b-card-header>
    <b-card-body class=" align-items-center">
        <b-card-text>
        <h5 class="mb-0 card-title lead">{{ serviceTitle }}</h5>
           <p class="mt-4" style="font-size: 20px; max-width: 40rem">{{ serviceDesc }}</p>
        </b-card-text>
        <router-link :to="serviceLink" size="lg" class="btn mb-2 btn-primary btn-lg">{{ serviceButtontext }}</router-link>.
    </b-card-body>
</b-card>
</template>

<script>
export default {
  name: 'ListcardComponent',
  props: {
    serviceDesc: {
        type: String,
        required: true
    },
    serviceTitle: {
        type: String,
        required: true
    },
     serviceLink: {
        type: String,
        required: true
    },
    serviceButtontext: {
        type: String,
        required: true
    }
  },
  data() {
    return {
        noSuffle: false
    };
  },
};
</script>

<style lang="css" scoped>
</style>
