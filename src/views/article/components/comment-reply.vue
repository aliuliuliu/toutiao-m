<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
    <van-icon  slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <CommentItem
    :comment="comment"
    >
    </CommentItem>
    <!-- 回复的回复 -->
    <van-cell title="所有回复"/>
    <Commentlist
    :success="comment.com_id"
    ></Commentlist>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import Commentlist from '@/views/article/components/comment-list.vue'
export default {
  name: 'commentReply',
  components: {
    CommentItem,
    Commentlist
  },
  data() {
    return {

    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
