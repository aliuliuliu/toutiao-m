<template>
<div class="comment-list">
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell
  v-for="(comment,index) in list"
  :key="index"
  :title="comment.content" /> -->
  <CommentItem
  v-for="(comment,index) in list"
  :key="index"
  :comment= "comment"
  >
  </CommentItem>
</van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from '@/views/article/components/comment-item.vue'
export default {
  name: 'comment-list',
  components: {
    CommentItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页的页面
      limit: 10 // 评论数据个数
    }
  },
  props: {
    // 如果获取文章 评论 则传递文章 ID
    // 如果获取评论回复 则传递评论 ID
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    async onLoad() {
    //  1.请求获取数据
      const { data } = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      // 2.把数据放到 列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.将本次的loading 关闭
      this.loading = false
      // 4.判断是否有数据
      if (results.length) {
        // 如果有.更新获取下一页数据的页面
        this.offset = data.data.last_id
      } else {
        // 如果没有则将 finished 设置为 true 不再触发加载更多了
        this.finished = true
      }
      this.$emit('updataTotalCount', data.data.total_count)
    },
    comeOn(data) {
      this.list.unshift(data)
    }
  },
  mounted() {
    this.$bus.$on('onpostList', this.comeOn)
  }
}
</script>

<style>

</style>
