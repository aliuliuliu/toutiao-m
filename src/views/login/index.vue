<template>
  <div>
    <!-- 导航栏  -->
    <van-nav-bar
  class="app-nav-bar"
  title="登录/注册"
  left-arrow
  @click-left="$router.back()"
/>
<!-- 登录表单 -->
<van-form
    :show-error="false"
    :show-error-message="false"
    validate-first
    ref="login-form"
    @submit="onLogin"
    @failed="onFailed"
    >
  <van-field
    clearable
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    name='mobile'
    placeholder="请输入手机号"
    :rules="formRules.mobile"
    center
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    :rules="formRules.code"
    center
  >
  <template #button>
    <van-button
    v-if="!isTime"
    size="small"
    round
    class="send-btn"
    :loading="isSendSmsLoading"
    @click.prevent="onSendSms"
    >发送验证码</van-button>
    <van-count-down
    class="one"
    v-else
    format="ss s"
    @finish="isTime = false"
    :time="1000 * 60" />
  </template>
  </van-field>
  <div class="login-btn-wrap">
  <van-button type="info" block class="login-btn">登录
  </van-button>
</div>
</van-form>
  </div>
</template>

<script>
import { login, senfSms } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '246810' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          { pattern: /^[1]+[3,8]+\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写密码' },
          { pattern: /[0-9]{6}/, message: '验证码格式错误' }
        ]
      },
      isTime: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false // 发送验证码按钮的loging 状态
    }
  },
  methods: {
    async onLogin() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      try {
        const { data } = await login(this.user)
        // window.localStorage.setItem('token', data.data.token)
        // 将后端返回的用户登录状态 （token等数据）放到Vuex中
        this.$store.commit('setuser', data.data)
        this.$router.push('/my')
        // 提示成功信息
        this.$toast.success('登录成功')
      } catch (error) {
        // 提示失败信息
        this.$toast.fail('登录失败')
      }
      // 3.请求调用登录
      // 4.处理响应数据
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async onSendSms() {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')

        // 验证通过 请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的loading状态 防止网络慢 用户多次点击触发发送行为
        await senfSms(this.user.mobile)

        // 短信发出了 显示倒计时 隐藏发送按钮
        this.isTime = true
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误 需要有不同的提示 那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 短信发送失败的错误提示
          message = '发送太频繁,请稍后！'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误提示
          message = '发送失败！'
        }
        this.$toast({
          message,
          position: top
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-wrap{
  padding: 26px 16px;
  .login-btn{
  background-color: #6db4fb;
  border:none
  .van-button_text{
    font-size: 15px;
  }
  }
}
.send-btn{
  width: 80px;
  height: 23px;
  background-color: #ededed;
.van-button__text{
  font-size: 11px !important;
  color: #666;
  line-height: 23px;
}
}
.one{
  width: 60px;
  height: 23px;
  background-color: #ededed;
  font-size: 11px !important;
  color: #666;
  text-align: center;
  border-radius:45% ;
  line-height: 23px;
}
</style>
