<template>
  <div class="my-container">
    <van-cell-group  v-if="user" class="my-info">
    <van-cell
    class="base-info"
    center
    :border="false"
    >
      <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="currentUser.photo"
      />
      <div class="name" slot="title">{{currentUser.name}}</div>
      <van-button
      class="updata-btn"
      size="small"
      round
      >
      编辑资料
      </van-button>
    </van-cell>
    <van-grid
    :border="false"
    class="data-info"
    >
    <van-grid-item
    class="data-info-item"
    >
      <div slot="text" class="text-wrap">
        <span class="count">{{currentUser.art_count}}</span>
        <div class="text">头条</div>
      </div>
    </van-grid-item>
    <van-grid-item
    class="data-info-item"
    >
      <div slot="text" class="text-wrap">
        <span class="count">{{currentUser.follow_count}}</span>
        <div class="text">关注</div>
      </div>
    </van-grid-item>
    <van-grid-item
    class="data-info-item"
    >
      <div slot="text" class="text-wrap">
        <span class="count">{{currentUser.fans_count}}</span>
        <div class="text">粉丝</div>
      </div>
    </van-grid-item>
    <van-grid-item
    class="data-info-item"
    >
      <div slot="text" class="text-wrap">
        <span class="count">{{currentUser.like_count}}</span>
        <div class="text">获赞</div>
      </div>
    </van-grid-item>
</van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div class="moblie" @click="$router.push('/login')">
        <img src="./手机.png" alt="" width="100%">
      </div>
      <div class="text">
        登录 / 注册
      </div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
      class="nav-grid-item"
      icon-prefix="toutiao"
      icon="shoucang"
      text="收藏" />
      <van-grid-item
      class="nav-grid-item"
      icon-prefix="toutiao"
      icon="lishi"
      text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <van-cell  v-if="user" class="one" title="退出登录" @click="onLogin" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    onLogin() {
      // 提示用户确认退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          this.$store.commit('setuser', null)
        })
        .catch(() => {
          // on cancel
        })
      // 确认->处理退出
    },
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
  .my-info{
    background:url("./banner.png") no-repeat;
    background-size:cover;
    .base-info{
      box-sizing: border-box;
      padding-top:38px ;
      padding-bottom:11px ;
      height: 115px;
      background-color: unset;
      .avatar{
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right:11px ;
      }
      .name{
        color: #fff;
        font-size: 15px;
      }
      .updata-btn{
        height: 18px;
        font-size: 10px;
        color: #666;
      }
    }
    /deep/.van-grid-item__content{
      background-color: unset;
    }
  }
  .data-info{
    .data-info-item{
      height: 65px;
      color: #fff;
      .text-wrap{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .count{
        font-size: 18px;
        }
        .text{
        font-size: 11px; ;
        }
    }
    }
  }
  .nav-grid{
    .nav-grid-item{
      height:70px ;
      /deep/.toutiao{
        font-size: 22px;
      }
      /deep/.toutiao-shoucang{
        color: #eb5253;
      }
      /deep/.toutiao-lishi{
        color: #ff9d1d;
      }
      /deep/.van-grid-item__text{
        font-size:13px ;
        color: #333;
      }
    }
  }
  .not-login{
    background: url("./banner.png") no-repeat;
    background-size:100%;
    box-sizing: border-box;
    height: 180px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .moblie{
      height: 66px;
      width: 66px;
    }
    .text{
      color: #fff;
      font-size:14px ;
      margin-top:7px ;
    }
  }
}
.one{
  text-align: center;
  color: #d86262;
}
.mb-4{
  margin-bottom:4px ;
}
</style>
