<template>
  <div>
    <h1>我是子组件2</h1>
    <h3>我爸爸的爱好是{{hobby}}</h3>
    <h3>我的哥哥喜欢打{{game}}游戏</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '刘儿子2',
      age: 16,
      fruits: '桔子',
      game: ''
    }
  },
  props: {
    hobby: {
      type: String,
      required: true
    }
  },
  methods: {
    goEat(data) {
      this.game = data
    }
  },
  mounted() {
    this.$emit('close', this.age)
    this.$bus.$emit('bus', this.fruits)
    this.$bus.$on('game1', this.goEat)
  }

}
</script>

<style>

</style>
