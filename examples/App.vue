<template>
  <div id="app">
    <h2>水波球</h2>
    <dsj-button type="4">保存</dsj-button>
    <dsj-waterBall
      @click="abc"
      :titleSold='true'
      :suffix='"分"'
      :Subheading="'我是副标题'"
      :score='score'
      :color='bollColor'
      :data="'4657'"
      :distance='distance'/>
      <input type="text" v-model="score">
      <h2>扩散动画</h2>
      <sdj-diffusion></sdj-diffusion>
      <h2>canvas动画</h2>
      <dsj-bgLz></dsj-bgLz>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      bollColor: [{
        to: 'rgba(254,200,85, 1)',
        from: 'rgba(255,202,87, 0.2)'
      },{
        to: 'rgba(254,200,85, 0.6)',
        from: 'rgba(255,202,87, 0.2)'
      }],
      distance: {
        w: 155,
        h: 155
      },
      score: '30%'
    }
  },
  methods: {
    abc () {
      console.log(123312)
    }
  }
}
</script>

<style>
#app,html,body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #E1332D;
  font-family: 'Roboto', sans-serif;
}
</style>
