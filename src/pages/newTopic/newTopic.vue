<template >
    <div class="inspad_new">
        <h4 class="title">New Topic</h4>
        <el-form :label-position="labelPosition" label-width="80px" :model="newTopic">
            <el-form-item label="Title">
                <el-input v-model="newTopic.name" :rows="4" placeholder="Topic Title Name"></el-input>
            </el-form-item>
            <el-form-item label="Content">
                <el-input v-model="newTopic.content" type="textarea" :rows="8" placeholder="Topic Description"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="float-right" size="small" @click="NewTopic">Create Topic</el-button>
    </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'

// import apiData from 'api/data'
// import Cookies from 'js-cookie'
// import { cookieUserId } from '@/const/cookies'

export default {
    components: {
        [Input.name]: Input,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    data() {
        return {
            labelPosition: 'right',
            newTopic: {
                name: '',
                content: ''
            }
        }
    },
    methods: {
        NewTopic() {
            console.log(this.newTopic)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~sty/var";

.inspad_new {
  height: 100%;
  .title {
    margin-bottom: 1rem;
  }
}
</style>

