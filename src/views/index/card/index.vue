<template>
  <div class="">
    {{count}}
  </div>
</template>

<script>
  import bus from 'mods/config.js'
  export default {
    data() {
      return {
        count: 1
      }
    },

    computed: {
    },

    mounted() {
      var that = this
      bus.$on('id-selected', function (id) {
        console.log('card', id);
        that.count = id
      })
    },

    watch: {

    }
  }
</script>

<style lang="css">
</style>
