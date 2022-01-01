// 发布评论
<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
  />
  <van-button
  class="one"
  size="small"
  @click="onPost"
  >
  发布
  </van-button>
  </div>
</template>

<script>
import { addComments } from '@/api/comment.js'
export default {
  name: 'PostComment',
  data() {
    return {
      message: '' // 输入框内容
    }
  },
  props: {
    articledata: {
      type: [Number, Object, String],
      required: true
    }
  },
  methods: {
    async onPost() {
      // 找到数据接口
      // 封装请求方法
      // 请求提交数据
      // 处理响应结构
      const { data } = await addComments({
        target: this.articledata.art_id.toString(),
        content: this.message,
        art_id: this.articledata.art_id ? toString() : null
      })
      console.log(data)
      this.message = ''
      this.$emit('onPost-Success')
      this.$bus.$emit('onpostList', data.data.new_obj)
    }
  }

}
</script>

<style lang="less" scoped>
.post-comment{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
}
.one{
  width: 50px;
}
</style>
