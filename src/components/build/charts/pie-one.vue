<!--
 * @Descripttion: 饼图例子一
 * @Author: Li Yuyuan
 * @Date: 2021-10-09 11:00:27
-->
<template>
  <div :id="id" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }"></div>
</template>

<script>
export default {
  name: 'pieOne',
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
      const data = [
        { value: 1048, name: '周一' },
        { value: 735, name: '周二' },
        { value: 580, name: '周三' },
        { value: 484, name: '周四' },
        { value: 300, name: '周五' },
      ];

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
        tooltip: {
          show: this.options.tooltip.config.show.value, //是否显示提示框组件
          trigger: 'item',
          formatter: this.options.tooltip.config.formatter.value, //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          backgroundColor: this.options.tooltip.config.backgroundColor.value, //提示框浮层的背景颜色
          textStyle: {
            //提示框样式
            color: this.options.tooltip.config.color.value,
            fontSize: this.options.tooltip.config.fontSize.value,
          },
        },
        legend: {
          show: this.options.legend.config.show.value, //是否显示图例组件
          orient: this.options.legend.config.orient.value, //图例列表的布局朝向 可选vertical和horizontal
          left: this.options.legend.config.left.value, //组件离容器左侧的距离
          top: this.options.legend.config.top.value, //组件离容器上侧的距离,
          textStyle: {
            //图例的公用文本样式
            color: this.options.legend.config.color.value,
            fontSize: this.options.legend.config.fontSize.value,
          },
        },
        series: [
          {
            name: this.options.series.config.name.value, //系列名称
            type: 'pie',
            avoidLabelOverlap: false,
            radius: this.options.series.config.radius.value, //饼图的半径
            center: [this.options.series.config.abscissa.value, this.options.series.config.ordinate.value],
            data: data,
            itemStyle: {
              borderRadius: this.options.series.config.borderRadius.value, //用于指定饼图扇形区块的内外圆角半径
              borderColor: this.options.series.config.borderColor.value, //图形的描边颜色
              borderWidth: this.options.series.config.borderWidth.value, //图形的描边线宽
            },
            label: {
              show: this.options.series.config.showLabel.value, //是否标签内容提示组件
              position: this.options.series.config.labelPosition.value, //outside-饼图扇区外侧；inside-饼图扇区内部；center-饼图中心
              formatter: this.options.series.config.labelFormatter.value, //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
              color: this.options.series.config.labelColor.value,
              fontSize: this.options.series.config.labelSize.value,
            },
            emphasis: {
              scaleSize: this.options.series.config.scaleSize.value, //高亮后扇区的放大尺寸
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
              label: {
                //高亮后的文字设置
                show: true,
                align: 'center',
                fontSize: this.options.series.config.scaleLabelSize.value,
                formatter: this.options.series.config.scaleLabelFormatter.value,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            labelLine: {
              show: true, //是否显示视觉引导线
            },
            silent: this.options.series.config.silent.value, //图形是否不响应和触发鼠标事件
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

      //设置动态图表
      if (this.options.active.value) {
        if (this.timer) {
          //如果已经开启了定时器，先关闭，并取消之前高亮的图形
          clearInterval(this.timer);
          data.map((item, index) => {
            this.charts.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index + 1,
            });
          });
        }
        let currentIndex = -1;
        this.timer = setInterval(() => {
          let dataLength = data.length;
          // 取消之前高亮的图形
          this.charts.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
          currentIndex = (currentIndex + 1) % dataLength;
          // 高亮当前图形
          this.charts.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
          //显示 tooltip
          this.charts.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
        }, this.options.activeTime.value);
      } else {
        //关闭定时器，并取消之前高亮的图形
        clearInterval(this.timer);
        data.map((item, index) => {
          this.charts.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index + 1,
          });
        });
      }

      this.charts.setOption(option, true);
    },
    formateData(par1, par2) {
      if (par1 !== '' && par2 !== '') {
        return [par1, par2];
      } else {
        if (par1) {
          return par1;
        }

        if (par2) {
          return par2;
        }
      }
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
