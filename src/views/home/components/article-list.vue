<template>
  <div class="artcle-list">
    <van-pull-refresh
    v-model="isPullDownLoading"
    @refresh="onRefresh"
    :success-text="updataResults"
    :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <ArtcleItem
        v-for="(artcles,index) in artclelist"
        :key="index"
        :title="artcles.title"
        :artcles="artcles"
        >
        </ArtcleItem>
        <!-- <van-cell
        v-for="(artcles,index) in artclelist"
        :key="index"
        :title="artcles.title">
        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtcles } from '@/api/artcle.js'
import ArtcleItem from '@/components/artcle-item/index.vue'
export default {
  name: 'ArtcleList',
  components: {
    ArtcleItem
  },
  data() {
    return {
      artclelist: [], // 数据列表
      loading: false, // 控制加载中的loading状态
      finished: false, // 控制加载结束的状态 当加载结束 不会再触发加载更多
      timestamp: null, // 获取下一页数据的时间戳
      isPullDownLoading: false, // 默认下拉刷新的
      updataResults: ''
    }
  },
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  methods: {
    async onLoad() {
      // 上拉加载跟多
      // 异步更新数据
      const { data } = await getArtcles({
        channel_id: this.item.id, // 频道的ID
        timestamp: this.timestamp || Date.now() // 当前时间戳
      })
      const { results } = data.data
      this.artclelist.push(...results)
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh() {
      // 下拉刷新 组件自己就会展示 loading 状态
      // 1.请求获取数据
      const { data } = await getArtcles({
        channel_id: this.item.id, // 频道的ID
        timestamp: Date.now() // 当前时间戳
      })
      const { results } = data.data
      this.artclelist.unshift(...results)
      // 2.把数据放到数据列表中（往顶部追加）
      // 3.关闭刷新的状态
      this.isPullDownLoading = false
      this.updataResults = `更新了${results.length}条数据！`
    }
  }
}
</script>

<style lang="less" scoped>
.artcle-list{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
}

</style>
