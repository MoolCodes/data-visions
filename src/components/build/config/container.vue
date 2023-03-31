<!--
 * @Descripttion: 画布配置
 * @Author: Li Yuyuan
 * @Date: 2021-09-29 19:46:18
-->
<template>
  <el-form ref="form" class="canvas-config common-config-form" :model="contain.containerForm" label-width="90px" size="small">
    <el-form-item label="大屏宽度">
      <el-input-number v-model="contain.containerForm.width" :min="0" :max="2560" size="small" style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item label="大屏高度">
      <el-input-number v-model="contain.containerForm.height" :min="0" :max="1440" size="small" style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item label="背景颜色">
      <div style="display:flex">
        <el-input v-model="contain.containerForm.bgColor"></el-input>
        <el-color-picker ref="colorPicker" v-model="contain.containerForm.bgColor" :predefine="contain.containerForm.predefineColors" show-alpha></el-color-picker>
      </div>
    </el-form-item>
    <el-form-item label="背景图片">
      <img class="canvas-bg" v-if="contain.containerForm.bgSrc" :src="contain.containerForm.bgSrc" alt="" @click="openBg" />
      <div class="empty-images" v-else @click="openBg"></div>
    </el-form-item>

    <BgDrawer :type="type" ref="bgDrawer" @change-bg="changeBg" />
  </el-form>
</template>
<script>
import BgDrawer from '@/components/build/config/bgDrawer.vue';
export default {
  inject: ['contain'],
  data() {
    return {
      type:''
    };
  },
  components: {
    BgDrawer,
  },
  methods: {
    openBg() {
      this.type='bg'
      this.$refs.bgDrawer.drawer = true;
    },
    changeBg(src) {
      if (src) {
        this.contain.containerForm.bgSrc = src;
      } else {
        this.contain.containerForm.bgSrc = '';
      }
    },
  },
};
</script>
<style lang="less" scoped>
.canvas-config {
  margin-top: 12px;
  padding: 0 16px;

  ::v-deep .el-form-item__label {
    text-align: left;
    font-size: 12px;
    color: #ffffff;
  }

  .canvas-bg {
    width: 185px;
    height: 100px;
    cursor: pointer;
  }

  .empty-images {
    width: 185px;
    height: 100px;
    cursor: pointer;
    background: #ffffff url(../../../images/null.png) center center no-repeat;
    background-size: 80px 80px;
  }
}
</style>
