<!--
 * @Descripttion: 折线图例子一
 * @Author: Li Yuyuan
 * @Date: 2021-10-14 13:56:12
-->
<template>
  <div :id="id" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }"></div>
</template>

<script>
export default {
  name: 'lineOne',
  data() {
    return {
      charts: null,
      timer: null,
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
      let option = {
        title: {
          text: this.options.title.config.text.value, //主标题文本，支持使用 \n 换行
          subtext: this.options.title.config.subtext.value, //副标题文本，支持使用 \n 换行
          show: this.options.title.config.show.value, //是否显示标题组件
          left: this.options.title.config.left.value, //组件离容器左侧的距离
          top: this.options.title.config.top.value, //组件离容器上侧的距离,
          textStyle: {
            //标题样式
            color: this.options.title.config.textColor.value,
            fontSize: this.options.title.config.textSize.value,
          },
          subtextStyle: {
            //副标题样式
            color: this.options.title.config.subtextColor.value,
            fontSize: this.options.title.config.subtextSize.value,
          },
        },
        legend: {
          show: this.options.legend.config.show.value,
          orient: this.options.legend.config.orient.value, // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          left: this.options.legend.config.left.value, //left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'。
          top: this.options.legend.config.top.value, //top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'。
          textStyle: {
            color: this.options.legend.config.color.value,
            fontSize: this.options.legend.config.fontSize.value,
          },
        },
        grid: {
          show: this.options.grid.config.show.value, //是否显示直角坐标系网格
          top: this.options.grid.config.top.value, //grid 组件离容器上侧的距离
          right: this.options.grid.config.right.value, //grid 组件离容器右侧的距离
          bottom: this.options.grid.config.bottom.value, //grid 组件离容器下侧的距离
          left: this.options.grid.config.left.value, //grid 组件离容器左侧的距离
          containLabel: this.options.grid.config.containLabel.value, //grid 区域是否包含坐标轴的刻度标签
        },
        tooltip: {
          //提示框
          show: this.options.tooltip.config.show.value, //是否显示提示框组件
          trigger: 'axis',
          formatter: this.options.tooltip.config.formatter.value, //{a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
          backgroundColor: this.options.tooltip.config.backgroundColor.value, //提示框浮层的背景颜色
          textStyle: {
            //提示框样式
            color: this.options.tooltip.config.color.value,
            fontSize: this.options.tooltip.config.fontSize.value,
          },
        },
        xAxis: {
          show: this.options.xAxis.config.show.value, //是否显示X轴
          type: 'category',
          axisTick: {
            //x轴刻度线
            show: this.options.xAxis.config.showTick.value,
          },
          boundaryGap: this.options.xAxis.config.boundaryGap.value, //坐标轴两边留白策略
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            show: this.options.xAxis.config.showLine.value, //是否显示X轴轴线
            lineStyle: {
              color: this.options.xAxis.config.lineColor.value,
              width: this.options.xAxis.config.lineWidth.value,
              type: this.options.xAxis.config.lineType.value, //solid；dashed；dotted
            },
          },
          splitLine: {
            //网格线
            show: this.options.xAxis.config.showSplitLine.value, //隐藏或显示
            lineStyle: {
              type: this.options.xAxis.config.splitLinType.value, //设置网格线类型 solid；dashed；dotted
            },
          },
          axisLabel: {
            rotate: this.options.xAxis.config.rotateLabel.value, // 旋转角度
            interval: this.options.xAxis.config.interval.value, //设置X轴数据间隔几个显示一个，为0表示都显示
          },
        },
        yAxis: {
          show: this.options.yAxis.config.show.value, //是否显示Y轴
          type: 'value',
          name: this.options.yAxis.config.name.value,
          axisTick: {
            //y轴刻度线
            show: this.options.yAxis.config.showTick.value,
          },
          axisLine: {
            show: this.options.yAxis.config.showLine.value, //是否显示Y轴轴线
            lineStyle: {
              color: this.options.yAxis.config.lineColor.value,
              width: this.options.yAxis.config.lineWidth.value,
              type: this.options.yAxis.config.lineType.value, //solid；dashed；dotted
            },
          },
          splitLine: {
            //网格线
            show: this.options.yAxis.config.showSplitLine.value, //隐藏或显示
            lineStyle: {
              type: this.options.yAxis.config.splitLinType.value, //设置网格线类型 solid；dashed；dotted
            },
          },
          axisLabel: {
            rotate: this.options.yAxis.config.rotateLabel.value, // 旋转角度
            interval: this.options.yAxis.config.interval.value, //设置X轴数据间隔几个显示一个，为0表示都显示
          },
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };

      let colorData = [];
      if (this.options.color.data.length > 0) {
        for (let i = 0; i < this.options.color.data.length; i++) {
          colorData.push(this.options.color.data[i].value);
        }
        option.color = colorData;
      } else {
        delete option.color;
      }

      //   let currentIndex = -1;
      //   this.timer = setInterval(() => {
      //     let dataLength = data.length;
      //     // 取消之前高亮的图形
      //     this.charts.dispatchAction({
      //       type: 'downplay',
      //       seriesIndex: 0,
      //       dataIndex: currentIndex,
      //     });
      //     currentIndex = (currentIndex + 1) % dataLength;
      //     // 高亮当前图形
      //     this.charts.dispatchAction({
      //       type: 'highlight',
      //       seriesIndex: 0,
      //       dataIndex: currentIndex,
      //     });
      //     //显示 tooltip
      //     this.charts.dispatchAction({
      //       type: 'showTip',
      //       seriesIndex: 0,
      //       dataIndex: currentIndex,
      //     });
      //   }, 1500);

      this.charts.setOption(option, true);
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
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
