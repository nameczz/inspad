<template>
  <span class="icon"
        :class="'icon-'+paint"
        v-html="html"></span>
</template>

<script>
export default {
  name: 'icon',
  props: {
    src: {
      type: String,
    },
    // fill stroke none
    paint: {
      type: String,
      default: 'fill',
    },
  },
  data() {
    return {}
  },
  computed: {
    html() {
      return this.src
    },
  },
  mounted() {
  },
}
</script>

<style>
  .icon{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
  }

  .icon > svg{
    height: 100%;
    display: block;
    width: 100%;
    fill: inherit;
    stroke: inherit;
  }
  .icon.icon-fill{
    fill: #333333;
    stroke: none;
  }
  .icon.icon-stroke{
    fill: none;
    stroke: #333333;
  }
</style>
