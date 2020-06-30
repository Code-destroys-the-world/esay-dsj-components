<template>
  <canvas id="target"></canvas>
</template>
<script>
import initC from './initCanvas.js'
export default {
  name: 'dsj-canvasbg2',
  mounted () {
    initC.creatCanvas(document.getElementById('target'))
  }
}
</script>
<style>
  #target {
    width: 100%;
    height: 100%;
  }
</style>

