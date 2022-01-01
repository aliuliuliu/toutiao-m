<template>
  <div class="Search-history">
    <van-cell
    title="历史记录"
    >
    <div>
      <span v-if="isone" @click="$emit('undata-history',[])">全部删除</span>
      &nbsp;&nbsp;
      <span v-if="isone" @click="isone = false" >完成</span>
      <van-icon name="delete" v-else @click="isone = true"/>
    </div>
    <div>
    </div>
    </van-cell>
    <van-cell
    v-for="(item,index) in searchHistory"
    :key="index"
    :title="item"
    @click="two(index,item)"
    >
      <van-icon name="close" v-show="isone" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      isone: false
    }
  },
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  methods: {
    two(index, item) {
      // 如果是删除状态 则执行删除操作
      if (this.isone) {
        return this.searchHistory.splice(index, 1)
        // 持久化处理
        // 1.修改本地存储的数据
        // 2.请求接口 修改线上数据
        // return setItem('search-history', this.istwo)
      }
      // 非删除状态 展示搜索结果
      this.$emit('search', item)
    }
  }
}
</script>

<style>

</style>
