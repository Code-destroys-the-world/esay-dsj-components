<template>
  <div id="app">
    <h2>水波球</h2>
    <dsj-button type="4">保存</dsj-button>
    <dsj-waterBall
      @click="abc"
      :score='score'
      :distance='distance'/>
      <input type="text" v-model="score">
      <div class="fd-annularCharts">
        <dsj-annularCharts :propData="score2.code" :graphColor="'#7ee8ff'" @click="annularChartsChange"></dsj-annularCharts>
        <input type="text" v-model="score2.code">
      </div>
      <h2>扩散动画</h2>
      <dsj-diffusion></dsj-diffusion>
      <h2>canvas动画1</h2>
      <dsj-bgLz></dsj-bgLz>
      <h2>canvas动画2</h2>
      <div class="canvasBG">
        <dsj-canvasbg2></dsj-canvasbg2>
      </div>
      <h2>canvas动画3</h2>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
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
