<template>
  <div>
    <pre><code class="json" ref="code"></code></pre>
  </div>
</template>
<script>
import 'md/highlight/highlight.pack'

export default {
  props: ['json'],
  data() {
    return {
      text: '',
    }
  },
  watch: {
    json(val) {
      this.fillCode()
    },
  },
  methods: {
    fillCode() {
      let type = typeof this.json
      if(type === 'object'){
        this.$refs.code.innerHTML = JSON.stringify(this.json, null, 2)
      }else if(type === 'string'){
        this.$refs.code.innerHTML = this.json
      }else {
        this.$refs.code.innerHTML = ''
      }
      global.hljs.highlightBlock(this.$refs.code)
    },
  },
  mounted() {
    this.fillCode()
  },
}
</script>
<style lang="scss">
@import '~md/highlight/custom';
</style>
