<template>
  <div class="Search-suggestion">
    <van-cell
    icon="search"
    v-for="(item,index) in suggestions"
    :key="index"
    @click="$emit('search',item)"
    >
    <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 属性 名要监视数据的名称
    // searchText() {
    //   console.log('hello')
    // }
    // 这才是 监视的完整写法
    searchText: {
      // 当数据变化时则会执行 handler 处理函数
      handler: debounce(async function() {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // async handler() {
      //   // 找到数据接口
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   this.suggestions = data.data.options
      //   // 请求获取数据
      //   // 末班绑定展示
      // },
      // immediate 该回调将会在侦听开始以后被立即调用
      immediate: true
    }
  },
  methods: {
    highlight(item) {
      // 正则表达式 /中间的内容 /都会当作正则匹配模式字符来对待
      // new RefExp() 是正则表达式的构造函数
      // 参数1 字符串
      // 参数2 匹配模式
      // 返回值 正则对象
      // new RefExp(this.searchText, 'gi')
      return item.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
