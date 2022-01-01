<template>
  <div class="channel-edit">
    <van-cell
    :border="false"
    center
    >
      <div
      slot="title"
      class="channel-title"
      >我的频道</div>
      <van-button
      class="one"
      type="danger"
      plain
      round
      size="mini"
      style="width:50px"
      @click="isShowEdit"
      >{{isEdit ? '完成' :'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
    <van-grid-item
    :class="{active:index === active}"
    v-for="(channel,index) in userChannels"
    :key="index"
    :text="channel.name"
    :icon="(isEdit && index !==0) ?'clear':''"
    @click="onUserChannelClick(channel,index)"
    />
</van-grid>
    <van-cell
    :border="false"
    center
    >
    <div
    slot="title"
    class="channel-title"
    >频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
    <van-grid-item
    v-for="(channel,index) in recommendChannels"
    :key="index"
    :text="channel.name"
    @click="onAdd(channel)"
    />
</van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getchannel, addUserChannel, deteleUserChannel } from '@/api/channel.js'
import { setItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [], //  所有频道列表
      isEdit: false // 控制编辑显示状态
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      typeof: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    recommendChannels() {
      // 思路：所有的频道 - 我的频道 = 推荐频道
      // // filter 方法：过滤器根据方法返回布尔值 true 来收集数据
      // return this.allChannels.filter(channel => {
      //   // 判断 channel 是否属于用户频道
      //   return !this.userChannels.find(userChannel => {
      //     // 找到满足该条件的元素
      //     return userChannel.id === channel.id
      //   })
      // })
      // forEach 写法
      const arr = []
      this.allChannels.forEach(item => {
        let flag = false
        for (let i = 0; i < this.userChannels.length; i++) {
          if (this.userChannels[i].id === item.id) {
            flag = true
            break
          }
        }
        if (!flag) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods: {
    async onAdd(item) {
      this.userChannels.push(item)
      // 数据持久化
      if (this.user) {
        // 登录了数据存储到线上
        await addUserChannel({
          channels: [{
            id: item.id,
            seq: this.userChannels.length
          }]
        })
      } else {
        // 没有登录 数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    isShowEdit() {
      this.isEdit = !this.isEdit
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态删除频道
        this.deteleChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    // 删除频道方法
    async deteleChannel(channel, index) {
      if (index <= this.active) {
        this.$emit('close', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        // 登录了 持久化到线上
        await deteleUserChannel(channel.id)
      } else {
        // 没有登录 持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换频道
    switchChannel(index) {
      this.$emit('close2', index)
    }
  },
  async mounted() {
    const { data } = await getchannel()
    this.allChannels = data.data.channels
  }
}
</script>

<style lang="less" scoped>
.channel-edit{
  padding-top:54px ;
}
.channel-title{
  font-size: 16px;
  color: #333;
}
.van-grid-item{
  width: 80px;
  height: 43px;
  }
  /deep/ .van-grid-item__icon{
    z-index: 999;
    position: absolute;
    right: -5px;
    top: -5px;
    font-size: 20px;
    color: #ee4f4f;
  }
  .active{
    /deep/ .van-grid-item__text{
      color: red !important;
    }

  }
  /deep/.van-grid-item__content{
  background: #f4f5f6;
    .van-grid-item__text{
    margin-top:0;
    font-size: 13px;
    color: rgb(22, 22, 22);
  }
  }

</style>
