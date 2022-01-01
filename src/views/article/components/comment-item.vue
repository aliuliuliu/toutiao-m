<template>
<van-cell class="comment-item">
  <!-- 用户头像 -->
<van-image
  round
  slot="icon"
  class="avatar"
  :src="comment.aut_photo"
/>
<!-- 标题插槽 -->
<div slot="title">
  <!-- 用户名称   -->
  <div class="title-wrap">
    <div class="name">{{ comment.aut_name }}</div>
    <div class="like-wrap">
<!-- 点赞状态 -->
  <van-icon
    class="like-icon"
    :class="{
      liked:comment.is_liking
    }"
    @click="onCommentLike"
    :name=" comment.is_like ? 'good-job':'good-job-o'" />
<!-- 点击数量 -->
  <span class="like-count">{{comment.like_count}}</span>
    </div>
  </div>
  <!-- 评论内容 -->
  <div class="content">{{ comment.content }}</div>
  <div class="one">
    <!-- 评论时间 -->
    <span class="pubdate">{{ comment.pubdate | datatiem('MM-DD HH:mm') }}</span>
    <!-- 回复按钮 -->
    <van-button
    class="reply-btn"
    round
    size="mini"
    @click="$bus.$emit('reply-click',comment)"
    >
    {{comment.reply_count}}回复
    </van-button>
  </div>
</div>

</van-cell>
</template>

<script>
import { deleteCommentLike, addCommentLike } from '@/api/comment.js'
export default {
  name: 'commentItem',
  data() {
    return {
    }
  },
  props: {
    comment: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCommentLike() {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞取消点赞
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 没有点赞 添加点赞
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // await deleteCommentLike(commentId)
      // 跟新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size:14px;
    color:#406599
  }
  /deep/.content{
    font-size: 16px;
    color:#222;
  }
  .pubdate{
    font-size:10px;
    margin-right:10px;
  }
  .title-wrap{
    display: flex;
    justify-content: space-between;
  }
  .like-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .liked{
    color:#ff69b4
  }
  .one{
    display: flex;
    align-items: conter;
  }
  .reply-btn{
    width: 50px;
  }
}
</style>
