<template>
  <div class="">
    <mt-header fixed title="固定在顶部"></mt-header>
    这是黄狗{{count}}
    <List></List>
    <card></card>
    <vc-button></vc-button>
    <vc-loading></vc-loading>
    <mt-button @click.native="handleClick">按钮</mt-button>
  </div>
</template>

<script>
  import bus from 'mods/config.js'
  import List from './List/index.vue'
  import card from './card/index.vue'
  export default {
    data() {
      return {
        count: 1
      }
    },

    mounted() {
      bus.$on('id-selected', (id) => {
        console.log('card', id);
        this.count = id
      })
    },

    methods: {
      handleClick: function() {
        this.$toast('Hello world!')
      }
    },

    components: {
      List,
      card
    }
  }
</script>

<style lang="scss" scoped>

</style>
