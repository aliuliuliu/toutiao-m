<template>
<div class="article-container"
style="overflow:hidden"
:class="{
  type:isPostShow
}"
>
  <!-- 导航栏 -->
  <van-nav-bar
  class="app-nav-bar"
  title="文章详情"
  left-arrow
  @click-left="$router.back()"
/>
<!-- 文章标题 -->
  <h1 class="title">{{articledata.title}}</h1>
  <van-cell center class="user-info">
    <div
    slot="title"
    class="name"
    >
    {{articledata.aut_name}}
    </div>
    <van-image
      class="avatar"
      slot="icon"
      fit="cover"
      round
      :src="articledata.aut_photo"
  />
  <div slot="label" class="pubdate">{{articledata.pubdate | relativeTime}}</div>
  <van-button
    :icon="articledata.is_followed ? 'default' :'plus'"
    class="follow-btn"
    :type="articledata.is_followed ? '' :'info'"
    round
    size="small"
    :loading="isFollowLoading"
    @click="clickFollow()"
    >{{articledata.is_followed ? '已关注' :'关注'}}
  </van-button>
  </van-cell>
  <div
    class="content  markdown-body"
    v-html="articledata.content"
    ref="article-content">
  </div>
  <!-- 评论组件 -->
      <Commentlist
      :source="articleId"
      @updataTotalCount="totalCommentCount = $event"
      >
      </Commentlist>
  <!-- 底部导航栏 -->
  <div class="one">
    <!-- 写评论 -->
    <van-button
      @click="isPostShow = true"
      round
      size="small"
      class="oneBtn">写评论
    </van-button>
    <!-- 评论按钮 -->
    <van-icon
      name="comment-o"
      :badge="totalCommentCount"
      class="tree four"
    />
    <!-- 收藏按钮 -->
    <van-icon
      :name="articledata.is_collected ? 'star' : 'star-o' "
      class="tree"
      @click="clickColled"
      :color="articledata.is_collected ? 'orange' : '#777'"
      :loading="iscollectedLoading"
    />
    <!-- 点赞按钮 -->
    <van-icon
      :name="articledata.attitude === 1 ? 'good-job':'good-job-o'"
      class="tree"
      :color="articledata.attitude === 1 ? 'orange' : '#777'"
      @click="isLikeArticles"
    />
    <!-- 转发按钮 -->
    <van-icon
      name="share"
      class="tree five"/>
  </div>
  <!-- 发布评论 弹出层 -->
  <van-popup
    v-model="isPostShow"
    position="bottom"
  >
  <PostComment
  :articledata="articledata"
  @onPost-Success="onPostSuccess"
  ></PostComment>
  </van-popup>
  <!-- 评论回复 弹出层 -->
  <van-popup
    v-model="isReplyShow"
    position="bottom"
  >
  <CommentReply
  :comment="comment"
  @close="isReplyShow=false"
  ></CommentReply>
  </van-popup>
</div>
</template>

<script>
import './github-markdown.css'
import { getArticleById, CollectArticles, unCollectArticles, likeArticles, unlikeArticles } from '@/api/artcle.js'
import '@/utils/day.js'
import { ImagePreview } from 'vant'
import { focusUser, unfocusUser } from '@/api/user.js'
import Commentlist from '@/views/article/components/comment-list.vue'
import PostComment from '@/views/article/components/post-comment.vue'
import CommentReply from '@/views/article/components/comment-reply.vue'
// 在组件中获取动态路由参数：
//    方式一：this.$route.params.xxx
//    方式二：props 传参  推荐
export default {
  name: 'ArticleIndex',
  components: {
    Commentlist,
    PostComment,
    CommentReply
  },
  data() {
    return {
      articledata: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户的loading状态
      iscollectedLoading: false, // 收藏文章loading 状态
      islikeArticlesLoading: false, // 点赞文章loading 状态
      isPostShow: false, // 控制 弹出层显示与隐藏
      totalCommentCount: 0, // 评论总数量
      isReplyShow: false, // 控制回复的显示状态
      comment: ''
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId)
      this.articledata = data.data
      // 获取文章内容 DOM 容器

      // 数据改变影响视图更新（DOM数据）不是立即的
      // 所以如果需要在修改数据之后 马上操作被该数据影响的视图 DOM 需要把这个代码放到 $nextTick中
      // 得到所有的img 标签
      // this.$nextTick 是vue提供的一个方法
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      // 循环img列表 给img 注册点击事件
      // 在事件处理函数中调用 ImagePreview（） 预览
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function() {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async clickFollow() {
      this.isFollowLoading = true
      // 已关注 取消关注
      if (this.articledata.is_followed) {
        await unfocusUser(this.articledata.aut_id)
      } else {
        // 没有关注 添加关注
        await focusUser(this.articledata.aut_id)
      }
      this.articledata.is_followed = !this.articledata.is_followed
      this.isFollowLoading = false
    },
    async clickColled() {
      this.iscollectedLoading = true
      // 已收藏 取消关注
      if (this.articledata.is_collected) {
        await unCollectArticles(this.articledata.art_id)
      } else {
        // 没有收藏 添加关注
        await CollectArticles(this.articledata.art_id)
      }
      this.articledata.is_collected = !this.articledata.is_collected
      this.isFollowLoading = false
      this.$toast.success(`${this.articledata.is_collected ? '' : '取消'}收藏成功`)
    },
    async isLikeArticles() {
      this.islikeArticlesLoading = true
      // 已点赞 取消点赞
      if (this.articledata.attitude === 1) {
        await unlikeArticles(this.articledata.art_id)
        this.articledata.attitude = -1
      } else {
        // 没有点赞 添加点赞
        await likeArticles(this.articledata.art_id)
        this.articledata.attitude = 1
      }
      this.islikeArticlesLoading = false
      this.$toast.success(`${this.articledata.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    onPostSuccess() {
      // 把发布成功的评论数据对象放到评论列表顶部
      // xx.unshift(comment)
      // 关闭发布评论弹出层
      this.totalCommentCount++
      this.isPostShow = false
    },
    replyClick(data) {
      this.isReplyShow = true
      this.comment = data
    }
  },
  mounted() {
    this.$bus.$on('reply-click', this.replyClick)
  }
}
</script>

<style lang="less" scoped>
.article-container{
  padding-bottom: 47px;
}
ul{
  list-style: unset;
}
.title{
  font-size: 20px;
  color:#3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info{
  .avatar{
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name{
    font-size:12px;
  }
  .pubdate{
    font-size:12px;
    color: #b4b4b4;
  }
  .follow-btn{
    width: 85px;
    height: 29px;
  }
}
.markdown-body{
  padding: 14px;
  background-color: #fff;
}
.follow-btn{
  border:none
}
.one{
  width: 100%;
  height: 45px;
  background-color: #fff;
  border: solid 1px #ccc;
  border-left: none;
  position: fixed;
  left: 0;
  bottom:0;
  display: flex;
  align-items: center;
  padding-left:10px;
  .oneBtn{
    width: 180px;
    font-size:16px ;
    color: rgb(194, 189, 189);
    flex:2 ;
  }
  .tree{
    font-size: 20px;
    text-align: center;
    flex:1
  }
  .van-info{
    position: absolute;
    right:15px;
    top: 0;
  }
  .four{
    position: relative;
  }
  .type{
    padding-bottom: 1000px;
    z-index: 99;
  }
}
</style>
