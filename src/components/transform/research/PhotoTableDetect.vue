<template>
  <div>
    <div class="trans-header">
      <div class="container">
        图像表格提取
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc"></div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div class="clearfix">
              <div class="input-image">
                <el-button type="success"
                           size="small"
                           class="btn-upload"
                           :loading="uploading"
                           @click="startFileUpload">上传图片</el-button>
                <input class="file-field"
                       accept="image/png"
                       ref="file"
                       type="file"
                       name="file"
                       @change="fileChange">
                <span>仅限png</span>
              </div>
              <div class="out-container">
                <div class="out-image">
                  <img :src="image" @load="loadImageEnd" >
                  <div class="out-result">
                    <el-tooltip class="item"
                                v-for="(item,i) in result"
                                :key="i"
                                :style="item.style"
                                effect="dark"
                                :content="item.type"
                                placement="bottom">
                      <i></i>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <json-schema :json="json"></json-schema>
        </div>
      </div>
      <copyright/>
    </div>
  </div>
</template>

<script>
import {Tooltip, Message} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import apiResearch from 'api/research'
import {percent} from 'md/filters'
export default {
  components: {
    [Tooltip.name]: Tooltip,
    JsonSchema,
  },
  data() {
    return {
      uploading: false,
      json: '',
      image: null,
      result: null,
    }
  },
  methods: {
    startFileUpload() {
      this.$refs.file.click()
    },
    fileChange() {
      if(this.$refs.file.files.length > 0) {
        this.uploading = true
        let file = this.$refs.file.files[0]
        // let fileName = this.$refs.file.files[0].name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = this.readFileSuccess
        reader.onerror = this.readFileError
      }
    },
    readFileError(error) {
      console.log('Error: ', error)
    },
    async readFileSuccess(e) {
      try{
        let inputs = e.target.result.replace(/^data:image\/png;base64,/, '')
        let res = await apiResearch.imageExtract({
          data: {
            inputs: `__file__:${inputs}`,
          },
          session: 'string',
        })
        this.json = res
        this.uploading = false
        this.$refs.file.value = null
        this.drawResult(e.target.result, res.data)
      }catch (e) {
        this.uploading = false
        if(e.message !== 'unlogged') {
          Message({
            message: '文件上传失败',
            type: 'error',
          })
        }
      }
    },
    loadImageEnd() {
    },
    drawResult(base64,
      {detection_boxes: boxes, detection_classes: classes, detection_scores: scores, num_detections: num}) {
      this.image = base64
      this.result = []
      let types = ['化学式', '公式', '数字', '图像', '表格']
      for(let i = 0; i < num; i++) {
        if(scores[i] >= 0.98) {
          let box = boxes[i]
          this.result.push({
            type: types[classes[i] - 1],
            style: {
              left: percent(box[0]),
              top: percent(box[1]),
              width: percent(box[2] - box[0]),
              height: percent(box[3] - box[1]),
            },
          })
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  .file-field{
    display: none;
  }
  .input-text{
    width: 366px;
  }
  .btn-upload{
    width: 100%;
  }
  .input-image{
    float: left;
    margin-left: 20px;
    width: 112px;
    text-align: center;
    >span{
      color: #3f4546;
      font-size: 13px;
      display: block;
    }
  }
  .out-container{
    margin-left: 152px;
  }
  .out-image{
    width: 50%;
    position: relative;
    font-size: 14px;
    line-height: 1.5;
    box-sizing: border-box;
    >.out-result>.item{
      cursor: pointer;
      position: absolute;
      box-sizing: border-box;
      background: rgba(255,255,0,0.3);
      border: 1px solid red;
    }
  }
</style>
