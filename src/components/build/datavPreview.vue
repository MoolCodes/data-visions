<!--
 * @Descripttion:数据大屏预览
 * @Author: Li Yuyuan
 * @Date: 2021-10-08 09:27:59
-->
<template>
  <div class="datav-preview-container">
    <div class="quit-preview">
      <el-button type="info" size="small" plain @click="quitView">退出预览</el-button>
    </div>
    <div class="charts-container" :style="canvasStyle">
      <div class="charts-item" v-for="(item, index) in contain.coverage" :key="index + item" :style="{ zIndex: item.zIndex, top: parseInt(item.top * scale) + 'px', left: parseInt(item.left * scale) + 'px', transform: `scale(${scale})` }">
        <component
          :ref="item.type + index"
          :is="item.type"
          :id="item.id + 'preview'"
          :refreshTime="item.apiModule && item.apiModule.refreshTime"
          :options="item.moduleConfigForm"
          :interaction="item.Interaction"
          :api="item.apiModule && item.apiModule.api"
          :isApi="item.apiModule && item.apiModule.isApi"
          :custom="item.customModule && item.customModule.custom"
          :customModule="item.customModule && item.customModule.customModule"
          :staticData="item.apiModule && item.apiModule.data"
          :params="item.apiModule && item.apiModule.params"
          :callback="item.callbackModule && item.callbackModule.callback"
          :dispose="item.apiModule && item.apiModule.dispose"
          :formatter="item.formatterModule && item.formatterModule.formatter"
          :hint="item.hintModule && item.hintModule.hint"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'datavPreview',
  inject: ['contain', '$this'],
  computed: {
    canvasStyle() {
      return {
        // width: this.contain.containerForm.width + 'px',
        // height: this.contain.containerForm.height + 'px',
        background: `${this.contain.containerForm.bgColor} url(${this.contain.containerForm.bgSrc}) no-repeat center`,
      };
    },
  },
  data() {
    return {
      scale: 1,
    };
  },
  mounted() {
    this.scale = parseFloat(Math.max(0.2, document.body.clientWidth / this.contain.containerForm.width).toFixed(2));
    window.addEventListener('resize', () => {
      this.scale = parseFloat(Math.max(0.2, document.body.clientWidth / this.contain.containerForm.width).toFixed(2));
    });
  },
  methods: {
    quitView() {
      //退出预览
      this.$this.view = false;
    },
  },
};
</script>
<style lang="less">
.datav-preview-container {
  width: 100%;
  height: 100%;
  position: relative;

  .quit-preview {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
  }

  .charts-container {
    width: 100%;
    height: 100%;
    background-size: 100% 100% !important;

    .charts-item {
      position: absolute;
    }
  }
}
</style>
