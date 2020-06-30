<template>
  <div ref="canvasBoll" :class="['fd-canvasParent', `icon-${classType}_canvas`]">
    <canvas style="border-radius: 100%;" @click="$emit('click')" ref="canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'dsj-waterBall',
  props: {
    data: {
      type: [String, Number],
      default: ''
    },
    fz: {
      type: [String, Number],
      default: 20
    },
    score: {
      type: [ String, Number ],
      default: 100,
      required: true
    },
    distance: {
      type: Object,
      default: () => {
        return {
          w: 155,
          h: 155
        }
      }
    },
    titleSold: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  watch: {
    'score': {
      handler () {
        this.canvasBoll.INIT_SCORE = this.initSCORE(this.score)
        this.canvasBoll.BOLL_SCORE = this.canvasBoll.INIT_SCORE / 100
        this.switchColor()
      }
    }
  },
  data () {
    return {
      classType: '',
      canvasBoll: {
        BOLL_STEP: 0, // 循环次数
        BOLL_LINES: [], // 颜色
        BOLL_SCORE: 100, // 分数
        BOLL_CANVAS: null, // canvas body
        BOLL_CTX: null, // ctx
        BOLL_SCORELAST: 0
      },
      dataColorList: {
        max: [{
          to: '#19cb9b',
          from: '#4ae222'
        }, {
          to: '#aff581',
          from: '#aff581'
        }],
        center: [{
          to: '#e9930c',
          from: '#f5b223'
        }, {
          to: '#e5b941',
          from: '#e5b941'
        }],
        min: [{
          to: '#fa1e1e',
          from: '#f1612e'
        }, {
          to: '#f8724a',
          from: '#f8724a'
        }]
      }
    }
  },
  created () {
    this.canvasBoll.BOLL_LINES = this.color
    this.canvasBoll.INIT_SCORE = this.initSCORE(this.score)
    this.canvasBoll.BOLL_SCORE = this.canvasBoll.INIT_SCORE / 100
    this.switchColor()
  },
  mounted () {
    this.$refs.canvasBoll.style.width = this.distance.w + 14 + 'px'
    this.$refs.canvasBoll.style.height = this.distance.h + 14 + 'px'
    // this.canvasBoll.BOLL_CANVAS = document.getElementById('dsj-canvas__boll')
    this.canvasBoll.BOLL_CANVAS = this.$refs.canvas
    this.canvasBoll.BOLL_CANVAS.width = this.distance.w
    this.canvasBoll.BOLL_CANVAS.height = this.distance.h
    this.canvasBoll.BOLL_CTX = this.canvasBoll.BOLL_CANVAS.getContext('2d')
    this.loop()
  },
  methods: {
    switchColor () {
      if (this.canvasBoll.INIT_SCORE >= 90) {
        this.classType = 'max'
        this.canvasBoll.BOLL_LINES = this.dataColorList.max
      } else if (this.canvasBoll.INIT_SCORE < 90 && this.canvasBoll.INIT_SCORE >= 60) {
        this.classType = 'center'
        this.canvasBoll.BOLL_LINES = this.dataColorList.center
      } else {
        this.classType = 'min'
        this.canvasBoll.BOLL_LINES = this.dataColorList.min
      }
    },
    initSCORE (_score) {
      let score
      if (typeof _score !== 'number') {
        if (_score.indexOf('%') !== -1) {
          score = Number(_score.replace('%', ''))
        } else {
          score = Number(_score)
        }
      } else {
        score = _score
      }
      if (score < 0) {
        score = 0
      }
      return score
    },
    requestAnimFrame (callback) {
      window.setTimeout(callback, 1000 / 60)
    },
    async loop () {
      this.canvasBoll.BOLL_CTX.clearRect(0, 0, this.canvasBoll.BOLL_CANVAS.width, this.canvasBoll.BOLL_CANVAS.height)
      this.canvasBoll.BOLL_CTX.fillStyle = 'rgb(13, 73, 110)'
      this.canvasBoll.BOLL_CTX.fillRect(0, 0, this.canvasBoll.BOLL_CANVAS.width, this.canvasBoll.BOLL_CANVAS.height)
      this.canvasBoll.BOLL_STEP++
      await this.rectLine()
      if (this.titleSold) {
        this.canvasBoll.BOLL_CTX.font = `${this.fz}px bold 黑体`
        this.canvasBoll.BOLL_CTX.fillStyle = '#fff'
        this.canvasBoll.BOLL_CTX.textAlign = 'center'
        this.canvasBoll.BOLL_CTX.fillText((this.data ? this.data : (isNaN(Number(String(this.score).slice(-1))) ? this.score : this.score + '%')) + this.suffix, this.canvasBoll.BOLL_CANVAS.width / 2, this.canvasBoll.BOLL_CANVAS.height / 2 + 10)
      }
      this.requestAnimFrame(this.loop)
    },
    rectLine () {
      return new Promise((resolve) => {
        for (let j = this.canvasBoll.BOLL_LINES.length - 1; j >= 0; j--) {
          let mygradient = this.canvasBoll.BOLL_CTX.createLinearGradient(0, 0, 0, 170)
          if (j === 1) {
            mygradient.addColorStop(0, this.canvasBoll.BOLL_LINES[j].to)
            mygradient.addColorStop(1, this.canvasBoll.BOLL_LINES[j].from)
            this.canvasBoll.BOLL_CTX.fillStyle = mygradient
          } else {
            mygradient.addColorStop(0, this.canvasBoll.BOLL_LINES[j].to)
            mygradient.addColorStop(1, this.canvasBoll.BOLL_LINES[j].from)
            this.canvasBoll.BOLL_CTX.fillStyle = mygradient
          }
          // 每个矩形的角度都不同，每个之间相差45度

          let angle = (this.canvasBoll.BOLL_STEP + j * 30) * Math.PI / 90
          let deltaHeight = Math.sin(angle) * 8
          let deltaHeightRight = Math.cos(angle) * 8
          // console.log(this.canvasBoll.BOLL_CANVAS.height*this.canvasBoll.BOLL_SCORELAST+deltaHeight,this.canvasBoll.BOLL_CANVAS.height/2+deltaHeight)
          this.canvasBoll.BOLL_CTX.beginPath()
          if (this.canvasBoll.BOLL_SCORELAST !== this.canvasBoll.INIT_SCORE) {
            if (this.canvasBoll.BOLL_SCORELAST < this.canvasBoll.INIT_SCORE) {
              this.canvasBoll.BOLL_SCORELAST = this.canvasBoll.INIT_SCORE - this.canvasBoll.BOLL_SCORELAST <= 2 ? this.canvasBoll.BOLL_SCORELAST = this.canvasBoll.INIT_SCORE : this.canvasBoll.BOLL_SCORELAST + 1
            } else {
              this.canvasBoll.BOLL_SCORELAST = this.canvasBoll.BOLL_SCORELAST - this.canvasBoll.INIT_SCORE <= 2 ? this.canvasBoll.BOLL_SCORELAST = this.canvasBoll.INIT_SCORE : this.canvasBoll.BOLL_SCORELAST - 1
            }
          }
          this.canvasBoll.BOLL_SCORE = this.canvasBoll.BOLL_SCORELAST / 100
          this.canvasBoll.BOLL_CTX.moveTo(0, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeight)
          if (j === 1) {
            this.canvasBoll.BOLL_CTX.bezierCurveTo(this.canvasBoll.BOLL_CANVAS.width / 2, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeightRight, this.canvasBoll.BOLL_CANVAS.width / 2, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeight, this.canvasBoll.BOLL_CANVAS.width, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeight)
          } else {
            this.canvasBoll.BOLL_CTX.bezierCurveTo(this.canvasBoll.BOLL_CANVAS.width / 2, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeight, this.canvasBoll.BOLL_CANVAS.width / 2, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeightRight, this.canvasBoll.BOLL_CANVAS.width, this.canvasBoll.BOLL_CANVAS.height - this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeightRight)
          }
          this.canvasBoll.BOLL_CTX.lineTo(this.canvasBoll.BOLL_CANVAS.width, this.canvasBoll.BOLL_CANVAS.height)
          this.canvasBoll.BOLL_CTX.lineTo(0, this.canvasBoll.BOLL_CANVAS.height)
          this.canvasBoll.BOLL_CTX.lineTo(0, this.canvasBoll.BOLL_CANVAS.height * this.canvasBoll.BOLL_SCORE + deltaHeight)
          this.canvasBoll.BOLL_CTX.closePath()
          this.canvasBoll.BOLL_CTX.fill()
        }
        resolve()
      })
    }
  }
}
</script>
<style scoped>
  .fd-canvasParent {
    padding-top: 5px;
    padding-left: 5px;
    border: 2px solid #ccc;
    position: relative;
    box-sizing: border-box;
  }
  .fd-canvasParent::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .icon-max_canvas {
    border-radius:50%;
    border: 1px solid rgba(104, 181, 55, 0.6);
  }
  .icon-max_canvas::after {
    background: #d3fa39;
    box-shadow: 0px 0px 5px 1px #d3fa39;
  }
  .icon-center_canvas {
    border-radius:50%;
    border: 1px solid rgba(200, 159, 51, 0.6);
  }
  .icon-center_canvas::after {
    background: #faa638;
    box-shadow: 0px 0px 5px 1px #faa638 ;
  }
  .icon-min_canvas {
    border-radius:50%;
    border: 1px solid rgba(222, 134, 44, 0.6);
  }
  .icon-min_canvas::after {
    background: #f06e18;
    box-shadow: 0px 0px 5px 1px #f06e18;
  }
</style>
