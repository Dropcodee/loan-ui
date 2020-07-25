<template>
    <div>
        <h1>Ooopsy!!!</h1>
        <h4>The page you're looking for is not found</h4>
        <router-link :to="{ name: 'login' }"> Back to home page </router-link>
    </div>
</template>

<script>
export default {

  name: 'NotFound-404',

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>
