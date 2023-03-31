<!--
 * @file: interaction.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/25.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->


<template>
  <div class="interaction">
    <div class="item">
      <div class="label">图层</div>
      <el-select v-model="coverageId" multiple placeholder="请选择图层">
        <el-option
          v-for="item in contain.coverage"
          v-show="item.isData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="item"
         v-if="contain.coverage[contain.coverageIndex]&&contain.coverage[contain.coverageIndex].isInteraction">
      <div class="label">参数名称</div>
      <el-input v-model="contain.coverage[contain.coverageIndex].Interaction.key" placeholder="请输入字段名称"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['contain'],
  name: 'interaction',
  data() {
    return {
      coverageId: [],
    }
  },
  watch: {
    /**
     * @description 绑定图层
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/25
     */
    coverageId(newVal) {
      this.contain.coverage[this.contain.coverageIndex].Interaction.coverageId = this.$util.deepClone(newVal)
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.interaction {
  width: 100%;

  .item {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    .label {
      width: 80px;
      color: #ffffff;
      font-size: 14px;
      line-height: 30px;
    }

    ::v-deep .el-input {
      width: 217px;
    }

    ::v-deep .el-input__inner {
      min-height: 30px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>
