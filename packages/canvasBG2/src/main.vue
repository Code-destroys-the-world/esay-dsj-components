<template>
  <div class="fd-canvas__bg">
    <canvas id="canvas__bg2"></canvas>
  </div>
</template>
<script>
import initCanvas from './initCanvas.js'
export default {
  name: 'dsj-canvasbg2',
  created () {
    initCanvas()
  }
}
</script>
<style>
  .fd-canvas__bg {
    width: 100%;
    height: 100%;
  }
</style>

