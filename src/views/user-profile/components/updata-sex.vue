<template>
  <div class="updataSex">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="defaulitIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onSexChange"
    />
  </div>
</template>
<script>
import { updataName } from '@/api/user.js'
export default {
  name: 'UpdataSex',
  data() {
    return {
      columns: ['男', '女'],
      defaulitIndex: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      await updataName(
        {
          gender: this.defaulitIndex
        }
      )
      this.$emit('input', this.defaulitIndex)
      this.$emit('close')
      this.$toast.success('更新成功')
    },
    onSexChange(picker, value, index) {
      // console.log(picker, value, index)
      this.defaulitIndex = index
    }
  }
}
</script>

<style lang="less" scoped>

</style>
