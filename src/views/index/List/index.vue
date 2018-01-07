<template>
  <div class="">
    {{count}}
    <button type="button" name="button" @click="click">点击黄狗</button>
    <vc-loading></vc-loading>
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

    methods: {
      click() {
        this.count++
        bus.$emit('id-selected', this.count)
      }
    }
  }
</script>

<style lang="css">
</style>
