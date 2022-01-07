<template>
  <div class="updata-photo">
    <img
      class="img"
      :src="image"
      ref="image"
    />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updataPhoto } from '@/api/user.js'
export default {
  name: 'updata-photo',
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  props: {
    file: {
      required: true
    }
  },
  methods: {
    getCroppedCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    // 发请求
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // 如果要求 Content-Type 是 multipart/form-data 则一定要提交 FromDate 数据对象 专门用于文件上传的 不能提交 {} 没有
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updataPhoto(fd)
      this.$toast.success('保存成功')

      // 更新父组件的用户头像
      this.$emit('updata-photo', window.URL.createObjectURL(file))

      // 关闭弹出层
      this.$emit('close')
    }
  },
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.toolbar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}

</style>
