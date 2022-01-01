<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
      class="searh-btn"
      slot="title"
      icon="search"
      type="info"
      round
      to="/search"
    >搜索</van-button>
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs  class="channel-tabs" v-model="active">
      <van-tab
      class="tab-item"
      v-for="item in channels"
      :key="item.id"
      :title="item.name "
      >
      <ArtcleList :item=item></ArtcleList>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
        <div slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
        >
        <van-icon name="wap-nav" />
        </div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
    v-model="isChannelEditShow"
    position="bottom"
    class="channel-edit-popup"
    closeable
    close-icon-position="top-left"
    get-container="body"
    style="height:100%"
    >
    <ChannelEdit
    :userChannels="channels"
    :active="active"
    @close='clsose'
    @close2='clsose2'
    ></ChannelEdit>
    </van-popup>
  </div>
</template>
<script>
import { getChannelUser } from '@/api/user.js'
import ArtcleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'Home',
  components: {
    ArtcleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0, // 控制被激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道的显示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
    // 请求接口获取频道数据
      // const { data } = await getChannelUser()
      // this.channels = data.data.channels
      let channels = []
      if (this.user) {
        // 已经登录 获取线上的用户频道列表数据
        const { data } = await getChannelUser()
        channels = data.data.channels
      } else {
        // 没有登录 判断是否有本地存储列表数据
        const loadChannels = getItem('user-channels')
        if (loadChannels) {
          channels = loadChannels
        } else {
        // 用户没有登录 也没有本地存储的频道 就请求获取默认推荐的频道列表
          const { data } = await getChannelUser()
          channels = data.data.channels
        }
      }
      // 把处理好的数据放到data中 以供视图使用
      this.channels = channels
    },
    clsose(index) {
      this.active = index
    },
    clsose2(index) {
      this.active = index
      this.isChannelEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  /deep/.van-nav-bar__title{
    background-color: #3296fa;
    max-width:none;
    border: none;
  }
  .searh-btn{
    height: 32px;
    width: 228px;
    background-color: #5babfb;
    font-size: 14px;
    color: #fff;
    border: none;
    .van-icon{
      font-size: 16px;
    }
  }
  .channel-tabs{
    /deep/.van-tab{
      border-right:1px solid #edeff3 ;
      border-bottom:1px solid #edeff3 ;
    }
    /deep/.van-tabs__line{
      width: 15px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
  .wap-nav-wrap{
    position: fixed;
    height: 40px;
    width: 33px;
    right: 0;
    // top: 46px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .9;
    text-align: center;
    .van-icon{
      font-size: 24px;
    }
  }
  .wap-nav-placeholder{
    width: 26px;
    flex-shrink: 0;
  }
}
</style>
