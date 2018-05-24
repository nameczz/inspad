<template >
  <div class="inspad_home">
    <div class="new">
      <h4 class="time">Today</h4>
      <el-card 
      shadow="hover" class="edit_item add_new" 
      :body-style="{ padding: '0px'}">
      + Add
      </el-card>
    </div>
    <div v-for="(item,index) in contents" :key="`item${index}`">
      <h4 class="time">{{item.time}}</h4>
      <div>
        <router-link 
        :to="`/subject/${body.id}`"           
        v-for="(body,val) in item.bodys" :key="`body${val}`"
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
import { Row, Col, Card } from 'element-ui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card
  },
  data() {
    return {
      contents: [
        {
          time: 'Yesterday',
          bodys: [
            { body: 'Try to figure out the new substance emerged in test...', id: '1' },
            { body: 'Try to figure out the new substance emerged in test...', id: '2' },
          ]
        },
        {
          time: '2018-3-1',
          bodys: [
            { body: 'Result of test is good. We found a compound called...', id: '3' },
            { body: 'Result of test is good. We found a compound called...', id: '4' },
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~sty/var";
@import "~sty/mixins";

.inspad_home {
  padding: 20px;
  font-size: 14px;
  background: #fff;
  min-height: $min-height;
  box-shadow: 1px 1px 4px 1px rgba(32, 76, 101, 0.3);
  overflow-x: hidden;
  .time {
    font-size: 16px;
    margin-bottom: 1rem;
    color: #3c4e59;
  }
  @include card-item(#7592a4, 160px);

  .add_new {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
    &:hover {
      color: $blue;
      border: 1px solid $blue;
    }
  }
}
</style>

