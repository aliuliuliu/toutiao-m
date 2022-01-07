<template>
  <div class="user-chat">
    <!-- 导航栏  -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group
      class="message-list"
      ref="message-list"
    >
      <van-cell
        :title="item.msg"
        v-for="(item,index) in messages" :key="index"
      />
    </van-cell-group>
    <!-- 底部输入框 -->
    <van-cell-group
      class="send-message-warp"
    >
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      />
      <van-button
      @click="onsend"
      class="send-message-btn"
      size="small"
      type="primary"
      >发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'UserChat',
  data() {
    return {
      message: '',
      socket: null, // 建立通讯数据
      messages: getItem('chat-messages') || []// 消息列表
    }
  },
  watch: {
    messages() {
      setItem('chat-messages', this.messages)
      // 如果你要在操作数据之后立即操作数据影响的视图DOM 那么最好把代码放到 nextTick函数中
      // 函数改变影响视图更新这件事儿 不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  mounted() {
    // 建立链接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.user
      },
      transports: ['websocket']
    })
    this.socket = socket
    socket.on('connect', () => {
      console.log('链接建立成功了')
    })

    // socket.on('event', function(data) {
    // })
    socket.on('disconnect', () => {
      console.log('断开链接了')
    })
    // 发送消息
    // socket.emit('消息类型',消息内容)
    // 收消息
    // socket.on('消息类型',function(data){})
    socket.on('message', (data) => {
      this.messages.push(data)
    })
    this.scrollToBottom()
  },
  methods: {
    onsend() {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把用户打出去的消息存储到数组中
      this.messages.push(data)
      // 清空输入框
      this.message = ''
    },
    scrollToBottom() {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }

}
</script>

<style lang="less" scoped>
.message-list{
  position:fixed;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message-warp{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 10px 0 ;
  align-items: center;
}
.send-message-btn{
  width: 50px;
}

</style>
