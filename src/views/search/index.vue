<template>
  <div class="search-container">
    <!-- 顶部搜索栏-->
    <form action="/">
      <van-search
      v-model="searchText"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      show-action
      @focus="isResultShow=false"
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow"
    :searchText=searchText
    />
    <!-- 联想建议 -->
    <SearchSuggestion
    v-else-if="searchText"
    :searchText=searchText
    @search="onSearch"
    />
    <SearchHistory
    :searchHistory="searchHistory"
    @search="onSearch"
    @undata-history="searchHistory = $event"
    />
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage.js'
// import { getSearchHistories } from '@/api/search.js'
export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制所搜结果的显示状态
      searchHistory: getItem('search-history') || []// 搜索历史
    }
  },
  watch: {
    // 监视搜索历史记录的变化 存储到本地存储
    searchHistory() {
      setItem('search-history', this.searchHistory)
    }
  },
  methods: {
    // 事件在点击键盘上的搜索/回车按钮后触发
    onSearch(searchText) {
      this.searchText = searchText
      // 记录搜索历史记录
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(this.searchText)
      // 如果用户已登录 则把搜索历史记录存储到线上
      // 。。。提示只要我们调用获取搜索结构的数据接口 后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录  则把搜索历史记录存储到本地
      // setItem('search-history', this.searchHistory)
      // 展示搜搜结果的组件
      this.isResultShow = true
    }
  }
}
</script>

<style>

</style>
