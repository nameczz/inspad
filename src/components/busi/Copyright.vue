<template>
  <div class="copyright" :class="position">Copyright © 2018 Patsnap. All rights reserved</div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
    },
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  .copyright{
    height: 80px;
    background-color: #133c44;
    line-height: 80px;
    text-align: center;
    color: #000000;
    font-size: 18px;
    color: rgba(255,255,255,0.5);

    &.absolute{
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
</style>
