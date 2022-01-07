<template>
  <div class="user-profile">
    <!-- 导航栏  -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
  <!-- 头像 -->
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow=true"
    />
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男':'女'"
      @click="isEditSexShow=true"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow=true"
    />

    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <!--  当你传递给子组件的数据即要使用 又要修改 例如这里的name
          这种情况下我们可以使用 v-model 简写-->

      <!-- @close="closeName"
          :name="user.name" -->

      <!-- v-model="user.name"
        默认传递一个名字叫 value的数据
        :value="user.name"
        默认监听 input 事件 @input="user.name = $event" -->

      <!-- v-model 的本质还是父子组件通信 它仅仅是简化了父组件的使用 -->

      <!-- v-model 只能使用一次 -->

      <!-- 如果有多个数据需要保持同步 使用 .sync修饰符 -->
      <!-- :gender="user.gender"
            @updata-gender="user.gender=$event"

            :gender.sync="user.gender"

            :gender="user.gender"
            @updata-gender="user.gender=$event" -->
            <!-- @updata-属性名="user.gender=$event" -->

            <!-- 我们一般把最常用的数据设计为 v-model 绑定
            把不太常用的数据设计为  .sync -->

    <UpdataName
      v-if="isEditNameShow"
      v-model="user.name"
      @close="closeName"
    >
    </UpdataName>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      v-model="isEditSexShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateSex
      v-if="isEditSexShow"
        v-model="user.gender"
        @close="isEditSexShow = false"
      >
      </UpdateSex>
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateBirthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow = false"
      ></UpdateBirthday>
    </van-popup>

    <!-- 修改用户头像 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdataPhoto
      v-if="isEditPhotoShow"
      :file="previewImage"
      @close="isEditPhotoShow = false"
      @updata-photo="user.photo = $event"
      >
      </UpdataPhoto>
    </van-popup>
  </div>
</template>

<script>
import { userFlie } from '@/api/user.js'
import UpdataName from '@/views/user-profile/components/updata-name.vue'
import UpdateSex from '@/views/user-profile/components/updata-sex.vue'
import UpdateBirthday from '@/views/user-profile/components/updata-birthday.vue'
import UpdataPhoto from '@/views/user-profile/components/updata-photo.vue'
export default {
  name: 'User-profile',
  components: {
    UpdataName,
    UpdateSex,
    UpdateBirthday,
    UpdataPhoto
  },
  data() {
    return {
      user: {},
      isEditNameShow: false, // 编辑昵称的显示状态
      isEditSexShow: false, // 编辑性别的显示状态
      isEditBirthdayShow: false, // 编辑生日的显示状态
      isEditPhotoShow: false, // 编辑头像的显示状态
      previewImage: null // 上传预览图片
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      const { data } = await userFlie()
      this.user = data.data
    },
    closeName() {
      this.isEditNameShow = false
      // this.loadUserProfile()
    },
    closeSex() {
      this.isEditSexShow = false
      this.loadUserProfile()
    },
    onFileChange() {
      // 展示弹出层
      // 在弹出层预览图片
      //  为了解决相同文件不触发 change事件 清空 file 的value
      // const blod = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      this.previewImage = file
      this.$refs.file.value = ''
      this.isEditPhotoShow = true
    }
  }

}
</script>

<style lang="less" scoped>
.van-popup{
  background-color: #f5f7f9;
}
.update-photo-popup{
  background-color: #000;
}

</style>
