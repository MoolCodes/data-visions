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
  name: 'barOne',
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
      console.log('this.option:', this.options)
      this.makeChart();
    },
    makeChart() {
      let data = [];
      let dataAxis = [];
      if (this.chartsData && this.isApi) {
        data = this.chartsData;
        dataAxis = this.chartsData.categories;
      } else {
        data = JSON.parse(this.staticData);
        dataAxis = data.categories;
      }
      const series = [];
      data.series.map(item => {
        series.push({
          type: 'bar',
          name: item.name,
          barGap: this.options.barConfig.config.barGap.value + '%',
          barWidth: this.options.barConfig.config.width.value,
          barMinHeight: this.options.barConfig.config.height.value,
          showBackground: false,
          label: {
            formatter: function(params) {
              const { name, data } = params;
              return that.customFormatter({ name, data });
            },
            show: this.options.labelConfig.config.show.value,
            fontSize: this.options.labelConfig.config.fontSize.value,
            color: this.options.labelConfig.config.fontColor.value,
            fontWeight: this.options.labelConfig.config.fontWeight.value,
            position: 'top',
          },
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
            borderRadius: this.options.barConfig.config.radius.value,
          },
          emphasis: {
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data: item.data,
          animation: true,
          animationDuration: function(idx) {
            return idx * 500;
          },
        });
      });
      const that = this;
      let option = {
        title: {
          top: 10,
          show: this.options.titleConfig.config.hide.value,
          text: this.options.titleConfig.config.text.value,
          textStyle: {
            color: this.options.titleConfig.config.fontColor.value,
            fontSize: this.options.titleConfig.config.fontSize.value,
          },
          left: this.options.titleConfig.config.fontSite.value,
        },
        tooltip: {
          formatter: function(params) {
            const { name, data } = params;
            return that.hintFormatter({ name, data }) + '';
          },
          show: this.options.tooltipConfig.config.show.value,
          backgroundColor: this.options.tooltipConfig.config.backgroundColor.value,
          textStyle: {
            color: this.options.tooltipConfig.config.fontColor.value,
            fontSize: this.options.tooltipConfig.config.fontSize.value,
          },
        },
        grid: {
          left: this.options.gridConfig.config.left.value,
          top: this.options.gridConfig.config.top.value,
          right: this.options.gridConfig.config.right.value,
          bottom: this.options.gridConfig.config.bottom.value,
        },
        xAxis: {
          type: !this.options.vertical.value ? 'category' : 'value',
          data: !this.options.vertical.value && dataAxis,
          show: this.options.xConfig.config.show.value,
          axisLabel: {
            textStyle: {
              color: this.options.xConfig.config.fontColor.value,
              fontSize: this.options.xConfig.config.fontSize.value,
            },
          },
          axisTick: {
            show: this.options.xConfig.config.tick.value,
          },
          axisLine: {
            show: this.options.xConfig.config.line.value,
          },
          splitLine: {
            show: this.options.xConfig.config.grid.value,
            lineStyle: {
              color: this.options.xConfig.config.gridColor.value,
              type: this.options.xConfig.config.gridType.value,
            },
          },
          z: 10,
          inverse: this.options.xConfig.config.inverse.value,
        },
        yAxis: {
          type: this.options.vertical.value ? 'category' : 'value',
          data: this.options.vertical.value && dataAxis,
          show: this.options.yConfig.config.show.value,
          axisLine: {
            show: this.options.yConfig.config.line.value,
          },
          axisTick: {
            show: this.options.yConfig.config.tick.value,
          },
          splitLine: {
            show: this.options.yConfig.config.grid.value,
            lineStyle: {
              color: this.options.yConfig.config.gridColor.value,
              type: this.options.yConfig.config.gridType.value,
            },
          },
          axisLabel: {
            textStyle: {
              color: this.options.yConfig.config.fontColor.value,
              fontSize: this.options.yConfig.config.fontSize.value,
            },
          },
          inverse: this.options.yConfig.config.inverse.value,
        },
        series: series,
      };
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
