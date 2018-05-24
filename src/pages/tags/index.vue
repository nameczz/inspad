<template>
  <div class="inspad_tags">
    <div v-for="(item,index) in contents" :key="index">
      <div>
        <el-tag class="tag" color="#52a6d8">{{item.keyword}}</el-tag>
        <span>{{item.count}} notes</span>
      </div>
      <div>
        <router-link 
        :to="`/note/${body.id}`"  
          v-for="(body,num) in item.bodys" :key="`body${num}`"
        >
          <el-card 
          :body-style="{ padding: '0px'}"
          shadow="hover" class="edit_item"
          >
            <p>
              {{body.body}}
            </p>
          </el-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Tag, Card } from 'element-ui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Card.name]: Card
  },
  data() {
    return {
      contents: [
        {
          count: 10,
          keyword: 'material',
          bodys: [
            { body: 'Try to figure out the new substance emerged in test...', id: '1' },
            { body: 'Try to figure out the new substance emerged in test...', id: '2' },
          ]
        },
        {
          count: 12,
          keyword: 'patent',
          bodys: [
            { body: 'Try to figure out the new substance emerged in test...', id: '3' },
            { body: 'Try to figure out the new substance emerged in test...', id: '4' },
          ]
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
@import "~sty/var";
@import "~sty/mixins";

.inspad_tags {
  font-size: 14px;
  .tag {
    margin-right: 1rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  @include card-item(#7592a4, 160px);
}
</style>
