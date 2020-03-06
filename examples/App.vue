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
      <div class="fd-annularCharts">
        <dsj-annularCharts :propData="score2" :props="propsData" @click="annularChartsChange"></dsj-annularCharts>
        <input type="text" v-model="score2.code">
      </div>
      <h2>扩散动画</h2>
      <dsj-diffusion></dsj-diffusion>
      <h2>canvas动画</h2>
      <dsj-bgLz></dsj-bgLz>
      <div class="canvasBG">
        <dsj-canvasbg2></dsj-canvasbg2>
      </div>
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
      score: '30%',
      score2: {
        code: 50,
        id: '213dwadwa'
      },
      propsData: {
        data: 'code'
      }
    }
  },
  methods: {
    abc () {
      console.log(123312)
    },
    annularChartsChange (_item) {
      console.log(_item)
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
.fd-annularCharts {
  width: 100px;
  height: 100px;
}
.canvasBG {
  width: 100%;
  height: 80vh;
}
</style>
