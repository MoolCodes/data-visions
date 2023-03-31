<!--
 - Author : yangj.
 - Date   : 2021/10/03.
 - File   : bar.柱状图组件
 -->

<template>
  <div :id="id" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }"></div>
</template>

<script>
import editor from '@/mixins/editor';

export default {
  name: 'custom',
  mixins: [editor],
  data() {
    return {
      charts: null,
      timer: null, //定时器
    };
  },
  props: {
    id: {
      type: String,
      default: 'test',
    },
    options: {},
  },
  watch: {
    options: {
      handler() {
        this.$nextTick(() => {
          this.makeChart();
          this.resizeEvent();
        });
      },
      deep: true,
    },
  },
  destroyed() {
    this.clearTimer();
    this.$echarts.dispose(this.charts);
    this.charts = null;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.charts = this.$echarts.init(document.getElementById(this.id));
      this.makeChart();
    },
    makeChart() {
      let option = {};
      if (this.chartsData && this.isApi) {
        option = this.custom(this.chartsData);
      } else {
        option = this.custom(JSON.parse(this.staticData));
      }
      this.charts.setOption(option);
      this.charts.off('click');
      this.click();
    },
    /**
     * echart图表适应
     * @author: whl
     * @createDate: 2019/8/9
     * @return {Object}
     */
    resizeEvent() {
      this.charts.resize(); // 使图表适应
    },
  },
};
</script>

<style></style>
