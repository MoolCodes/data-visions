<!--
 * @Descripttion:新建大屏
 * @Author: Li Yuyuan
 * @Date: 2021-10-08 09:27:59
-->
<template>
  <div class="datav-container">
    <!-- 控件管理区域 -->
    <div class="datav-header">
      <datav-header></datav-header>
    </div>
    <div class="datav-main">
      <!-- 图层管理区域 -->
      <div class="datav-charts">
        <datav-charts ref="datavCharts" @updateSize="$refs.datavCanvas.upadteResize()" @charts-active="chartsActive"></datav-charts>
      </div>
      <!-- 画布区域 -->
      <div class="datav-canvas">
        <datav-canvas ref="datavCanvas" @canvas-click="canvasClick" @charts-active="chartsActive"></datav-canvas>
      </div>
      <!-- 控件配置区域 -->
      <div class="datav-config" ref="configContainer">
        <datav-config ref="datavConfig" @updateSize="$refs.datavCanvas.upadteResize()"></datav-config>
      </div>
    </div>

    <!-- 预览 -->
    <transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
      <div class="datav-preview" style="animation-duration: 400ms" v-if="view">
        <datav-preview ref="datavPreview"></datav-preview>
      </div>
    </transition>
  </div>
</template>
<script>
import datavHeader from '@/components/build/datavHeader.vue';
import datavCharts from '@/components/build/datavCharts.vue';
import datavCanvas from '@/components/build/datavCanvas.vue';
import datavConfig from '@/components/build/datavConfig.vue';
import datavPreview from '@/components/build/datavPreview.vue';
export default {
  provide() {
    return {
      $this: this,
      contain: this.contain,
    };
  },
  data() {
    return {
      view: false, //预览开关
      contain: {
        //图层
        coverageIndex: -1,
        updateLine: false, //组件宽度或者高度改变坐标线跟随
        containerForm: {
          //画布配置
          width: 1920,
          height: 1080,
          bgColor: 'rgba(48, 108, 120, 1)',
          bgSrc: require('@/images/bg1.png'),
          predefineColors: ['#409EFF', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585'],
        },
        coverage: [
          // {
          //   type: 'bar',
          //   ishighlight: false,
          //   moduleConfigForm:config.bar//组件配置表单
          // }
        ],
      },
    };
  },
  components: {
    datavHeader,
    datavCharts,
    datavCanvas,
    datavConfig,
    datavPreview,
  },
  methods: {
    canvasClick(type) {
      //鼠标点击画布区域
      this.$refs.datavConfig.tabIndex = 1;
      this.$refs.datavConfig.showBackground = true;
      this.$refs.datavConfig.type = type;
      this.$refs.datavConfig.$refs.configurationForm.activeNames = -1;
    },
    chartsActive() {
      //鼠标左键在图表组件上按下
      this.$refs.datavConfig.tabIndex = 1;
      this.$refs.datavCanvas.isShowReferLine = true;
      this.$refs.datavConfig.showBackground = false;
      this.$refs.datavConfig.$refs.configurationForm.activeNames = -1;
    },
  },
};
</script>
