<template>
  <div class="chart_annular__wrapper" @click="clickChange">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ref="svg">
      <path class="arc" fill="none" d="M 49.99 10.00 A 40.00 40.00 0 1 0 50.00 10.00"  />
      <path class="graph" fill="none" :style="{'--val': numberData}" d="M 49.99 10.00 A 40.00 40.00 0 1 0 50.00 10.00"  />
      <text x="36" y="55" class="heavy">{{sliceData}}</text>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'dsj-annularCharts',
  props: {
    propData: {
      type: [String, Number, Object],
      required: true,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    graphStrokeWidth: {
      type: [String, Number],
      default: 4
    },
    arcStrokeWidth: {
      type: [String, Number],
      default: 4
    },
    graphColor: {
      type: String,
      default: '#333'
    },
    arcColor: {
      type: String,
      default: '#f00'
    },
    wrapperBG: {
      type: String,
      default: 'transparent'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    clickItem: {
      type: [String, Number, Object, Function],
      default: null
    },
    props: {
      type: Object,
      default: () => {
        return {
          data: 'data'
        }
      }
    }
  },
  data () {
    return {
      numberData: 0
    }
  },
  watch: {
    propData: {
      handler (newV) {
        this.initData()
      },
      deep: true
    }
  },
  computed: {
    sliceData () {
      return typeof this.propData === 'object' ? this.propData[this.props.data] + '%' : this.propData + '%'
    }
  },
  created () {},
  mounted () {
    let _svg = this.$refs.svg
    let _graph = _svg.children[1]
    let _arc = _svg.children[0]
    let _text = _svg.children[2]
    _graph.style.stroke = this.graphColor
    _graph.style.strokeWidth = this.graphStrokeWidth + 'px'
    _arc.style.strokeWidth = this.arcStrokeWidth + 'px'
    _arc.style.stroke = this.arcColor
    _svg.style.stroke = this.wrapperBG
    _text.style.fill = this.textColor
    this.initData()
  },
  methods: {
    initData () {
      this.numberData = typeof this.propData === 'object' ? this.propData[this.props.data] : this.propData
      this.$refs.svg.children[1].style['--val'] = this.numberData
    },
    clickChange () {
      if (typeof this.propData === 'object') {
        this.$emit('click', this.propData)
      }
    }
  }
}
</script>
<style scoped>
  .chart_annular__wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .chart_annular__wrapper svg {
    width: 100%;
    height: 100%;
  }
  .chart_annular__wrapper text {
    stroke: none;
    transition: fill .8s ease-out;
  }
  .chart_annular__wrapper .arc {
    stroke-width: 4px;
  }
  .chart_annular__wrapper .graph {
    stroke-dashoffset: 0;
    stroke-dasharray: 251.35;
    stroke-dashoffset: calc(  251.35 / 100 * var( --val )  );
    transition: stroke-dashoffset .8s ease-out;
    stroke-width: 4px;
  }
</style>