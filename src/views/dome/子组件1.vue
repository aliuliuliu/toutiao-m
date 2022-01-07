<template>
  <div>
    <h1>我是子组件</h1>
    <h3>我爸爸的爱好{{hobby}}</h3>
    <h3>我弟弟喜欢吃{{fruits}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    hobby: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: '刘儿子1',
      age: 18,
      fruits: '',
      game: 'LOL'
    }
  },
  methods: {
    nihao1(data) {
      this.fruits = data
    }
  },
  mounted() {
    this.$emit('close', this.age)
    this.$bus.$emit('game1', this.game)
    this.$bus.$on('bus', this.nihao1)
  }

}
</script>

<style>

</style>
