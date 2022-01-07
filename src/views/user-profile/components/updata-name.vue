<template>
  <div class="updataName">
    <!-- 导航栏  -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onComfirmLeft"
      @click-right="onConfirmRight"
    />
    <!-- 输入框 -->
    <div class="namefield">
      <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
      border
    />
    </div>
  </div>
</template>

<script>
import { updataName } from '@/api/user.js'
export default {
  name: 'UpdataName',
  data() {
    return {
      message: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirmRight() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      if (this.message) {
        await updataName(
          {
            name: this.message
          }
        )
        this.$emit('close')
        this.$emit('input', this.message)
        this.$toast.success('更新成功')
      } else {
        this.$toast.fail('内容不能为空')
      }
    },
    onComfirmLeft() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.namefield{
  padding: 10px;
}

</style>
