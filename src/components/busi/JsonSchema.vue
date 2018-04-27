
<template>
  <section>
    <header>
      <icon src="~svg/code.svg"/> Json Schema
      <a class="toggle" @click="opened=!opened"><icon :src="opened?icon.close:icon.open"></icon></a>
    </header>
    <highlight v-if="opened" :json="json"></highlight>
  </section>
</template>

<script>
import Highlight from 'md/highlight/Highlight'

export default {
  props: ['json'],
  components: {
    Highlight,
  },
  data() {
    return {
      opened: false,
      icon: {
        close: require('svg/close.svg'),
        open: require('svg/expand.svg'),
      },
    }
  },
}
</script>

<style scoped lang="scss">
</style>
