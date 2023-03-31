<!--
 * @Descripttion:动态环图
 * @Author: Li Yuyuan
 * @Date: 2021-10-18 15:03:46
-->
<template>
  <dv-active-ring-chart :id="id" :key="key" :config="config" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }" />
</template>
<script>
export default {
  name: 'pieTwo',
  props: {
    id: {
      type: String,
      default: 'test',
    },
    options: {},
  },
  watch: {
    options: {
      handler(newVal) {
        Object.keys(this.config).forEach(key => {
          if (newVal[key] !== undefined && newVal[key].value !== undefined) {
            this.option[key] = newVal[key].value;
          }
        });
        this.option.color = this.getColor();
        this.config = { ...this.config, ...this.option };
        this.$nextTick(() => {
          this.key = !this.key;
        });
      },
      deep: true,
      immediate:true,
    },
  },
  created() {
    this.config.color = this.getColor();
  },
  data() {
    return {
      option: {},
      key: false,
      config: {
        radius: '50%', //环半径
        activeRadius: '55%', //环半径（动态）,
        data: [
          {
            name: '周口',
            value: 55,
          },
          {
            name: '南阳',
            value: 120,
          },
          {
            name: '西峡',
            value: 78,
          },
          {
            name: '驻马店',
            value: 66,
          },
        ], //环数据
        lineWidth: 30, //环线条宽度
        activeTimeGap: 2000, //切换间隔(ms)
        color: [], //环颜色
        digitalFlopStyle: [2], //数字翻牌器样式
        digitalFlopToFixed: 0, //数字翻牌器小数位数
        digitalFlopUnit: '', //数字翻牌器单位
        animationCurve: 'easeOutCubic', //动效曲线
        animationFrame: 50, //动效帧数
        showOriginValue: false, //显示原始值
      },
    };
  },
  methods: {
    getColor() {
      let colorData = [];
      if (this.options.color.data.length > 0) {
        for (let i = 0; i < this.options.color.data.length; i++) {
          colorData.push(this.options.color.data[i].value);
        }
      }
      return colorData;
    },
  },
};
</script>
