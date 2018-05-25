<template >
  <div class="inspad_home">
    <div>123</div>
  </div>
</template>

<script>
import { Row, Col, Card, Dialog, Form, FormItem, Input } from 'element-ui'
import apiData from 'api/data'
import Cookies from 'js-cookie'
import { cookieUserId } from '@/const/cookies'

export default {
  components: {
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card
  },
  data() {
    return {
    }
  },
  methods: {
    async getTopics() {
      const userId = Cookies.get(cookieUserId)
      const res = await apiData.getTopics({ uid: userId })
      console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~sty/var";
@import "~sty/mixins";

.inspad_home {
  height: 100%;
}
</style>

