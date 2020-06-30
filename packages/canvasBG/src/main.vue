<template>
  <div id="dsj-lzCanvas"></div>
</template>
<script>
import ParticleNetworkAnimation from './canvasbg.js'
export default {
  name: 'dsj-bgLz',
  data () {
    return {
      PNA: null
    }
  },
  props: {
    particleColors: {
      type: Array,
      default: () => {
        return ['#fff', '#666', '#ttt']
      }
    },
    netLineColor: {
      type: String,
      default: '#fff'
    }
  },
  mounted () {
    this.PNA = new ParticleNetworkAnimation()
    this.PNA.init(document.getElementById('dsj-lzCanvas'), {
      particleColors: this.particleColors,
      netLineColor: this.netLineColor
    })
  }
}


</script>
<style scoped>
#dsj-lzCanvas {
  height: 100%;
  width: 100%;
}
</style>