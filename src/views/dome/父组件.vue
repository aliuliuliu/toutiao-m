<template>
  <div>
    <h1>我是父组件</h1>
    <h3>我大儿子今年{{age}}岁</h3>
    <h3>我二儿子今年{{age2}}岁</h3>
    <Son1 :hobby="hobby1" @close="receive"></Son1>
    <Son2 :hobby="hobby1" @close="receive2"></Son2>
  </div>
</template>

<script>
import Son1 from '@/views/dome/子组件1.vue'
import Son2 from '@/views/dome/子组件2.vue'
export default {
  components: {
    Son1,
    Son2
  },
  data() {
    return {
      name: '刘爸爸',
      hobby1: '喝酒',
      age: '',
      age2: ''
    }
  },
  methods: {
    receive(data) {
      this.age = data
    },
    receive2(data) {
      this.age2 = data
    }
  }

}
</script>

<style>

</style>
