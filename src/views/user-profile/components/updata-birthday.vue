<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updataName } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'updataBirthday',
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
      defaulitIndex: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm(index) {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updataName({
        birthday: date
      })
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('更新成功')
    }
  }

}
</script>

<style lang="less" scoped>

</style>
