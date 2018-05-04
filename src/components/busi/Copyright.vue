<template>
  <div class="copyright" :class="position">Copyright © 2017 Patsnap. All rights reserved</div>
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
    margin: 20px 0;
    line-height: 17px;
    opacity: 0.3;
    font-size: 12px;
    text-align: center;
    color: #000000;

    &.absolute{
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
</style>
