<!--
 * @Descripttion: 配置表单
 * @Author: Li Yuyuan
 * @Date: 2021-10-12 15:07:04
-->
<template>
  <div>
    <el-form ref="form" class="configuration-form common-config-form" :model="moduleConfigForm" label-width="110px" size="small">
      <div class="config-form-item" v-for="(item, key) in moduleConfigForm" :key="key">
        <el-form-item :label="item.label">
          <template slot="label">
            <span>{{ item.label }}</span>
            <el-popover id="fields-explain" v-if="item.explain" placement="top" title="说明" width="200" trigger="hover" :content="item.explain">
              <i slot="reference" class="label-query el-icon-question"></i>
            </el-popover>
          </template>

          <!-- 输入框 -->
          <el-input v-if="item.type === 'input'" v-model="item.value" clearable></el-input>

          <!-- 文本输入框 -->
          <el-input v-if="item.type === 'textarea'" type="textarea" v-model="item.value" :rows="3" clearable></el-input>

          <!--文档-->
          <div class="document" v-if="item.type === 'document' && contain.coverage[contain.coverageIndex]">
            <a :href="item.href" target="_blank">点击查看</a>
          </div>

          <!-- 自定义组件 -->
          <div class="editor-box" v-if="item.type === 'customEditor' && contain.coverage[contain.coverageIndex]">
            <div class="edit" @click="customComponent(item.field)">编辑</div>
          </div>

          <!-- 自定义编辑器 -->
          <div class="editor-box" v-if="item.type === 'editor' && contain.coverage[contain.coverageIndex]">
            <div class="edit" @click="editor(key, item.field, item.value)">编辑</div>
          </div>

          <!-- 数字输入框 -->
          <el-input-number v-if="item.type === 'number'" v-model="item.value" :min="0" :max="2560" style="width: auto" controls-position="right"></el-input-number>

          <!-- 颜色选择器 -->
          <div class="color-box" v-if="item.type === 'color'">
            <el-input v-model="item.value" clearable></el-input>
            <el-color-picker ref="colorPicker" v-model="item.value" :predefine="moduleConfigForm.predefineColors" show-alpha></el-color-picker>
          </div>

          <!-- 开关 -->
          <el-switch v-if="item.type === 'switch'" v-model="item.value" active-color="#409eff" inactive-color="#0f1014"></el-switch>

          <!-- 滑块 -->
          <el-slider v-if="item.type === 'slider'" :max="item.max" v-model="item.value"></el-slider>

          <!-- 选择框 -->
          <el-select v-if="item.type === 'select'" v-model="item.value">
            <el-option v-for="ele in item.options" :key="ele.value" :label="ele.label" :value="ele.value"></el-option>
          </el-select>
        </el-form-item>

        <!-- 展开 -->
        <el-collapse v-model="activeNames" v-if="item.label === undefined && item.type === undefined" accordion>
          <el-collapse-item :title="item.collapseLabel" :name="key">
            <el-form-item v-for="(cell, cellKey) in item.config" :key="cellKey">
              <template slot="label">
                <span>{{ cell.label }}</span>
                <el-popover id="fields-explain" v-if="cell.explain" placement="top" title="说明" width="200" trigger="hover" :content="cell.explain">
                  <i slot="reference" class="label-query el-icon-question"></i>
                </el-popover>
              </template>
              <!-- 输入框 -->
              <el-input v-if="cell.type === 'input'" v-model="cell.value" clearable></el-input>

              <!-- 文本输入框 -->
              <el-input v-if="cell.type === 'textarea'" type="textarea" v-model="cell.value" :rows="3" clearable></el-input>

              <!-- 图库 -->
              <div class="editor-box" v-if="cell.type === 'img' && contain.coverage[contain.coverageIndex]">
                <img style="width: 100px;height: 50px" :src="cell.value ? cell.value : defaultImg" alt="" @click="openBg('border', [key, cellKey])" />
              </div>

              <!-- 自定义编辑器 -->
              <div class="editor-box" v-if="cell.type === 'editor' && contain.coverage[contain.coverageIndex]">
                <div class="edit" @click="collEditor(key, cellKey, cell.field, cell.value)">编辑</div>
              </div>

              <!-- 数字输入框 -->
              <el-input-number v-if="cell.type === 'number'" v-model="cell.value" :min="0" :max="2560" style="width: 100%" controls-position="right"></el-input-number>

              <!-- 颜色选择器 -->
              <div class="color-box" v-if="cell.type === 'color'">
                <el-input v-model="cell.value" clearable></el-input>
                <el-color-picker ref="colorPicker" v-model="cell.value" :predefine="moduleConfigForm.predefineColors" show-alpha></el-color-picker>
              </div>

              <!-- 开关 -->
              <el-switch v-if="cell.type === 'switch'" v-model="cell.value" active-color="#409eff" inactive-color="#0f1014"></el-switch>

              <!-- 滑块 -->
              <el-slider v-if="cell.type === 'slider'" :max="cell.max" v-model="cell.value"></el-slider>

              <!-- 选择框 -->
              <el-select v-if="cell.type === 'select'" v-model="cell.value">
                <el-option v-for="vent in cell.options" :key="vent.value" :label="vent.label" :value="vent.value"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <!-- 调色盘 -->
        <el-collapse v-model="activeNames" v-if="item.type === 'palette'" accordion>
          <el-collapse-item :title="item.collapseLabel" name="palette">
            <el-form-item v-for="(cell, cellKey) in item.data" :key="cellKey" :label="'颜色' + (cellKey + 1)">
              <div class="color-box">
                <el-input v-model="cell.value" clearable></el-input>
                <el-color-picker ref="colorPicker" v-model="cell.value" :predefine="moduleConfigForm.predefineColors" show-alpha></el-color-picker>
                <el-tooltip effect="light" content="移除" placement="top" v-if="!cell.fixed">
                  <i class="delete-color el-icon-remove-outline" @click="removeColor(cellKey)"></i>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-tooltip effect="light" content="新增" placement="top" v-show="item.isAdd">
              <div class="more-color">
                <i class="add-color el-icon-plus" @click="addColor"></i>
              </div>
            </el-tooltip>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-form>
    <BgDrawer :type="imgType" ref="bgDrawer" @change-bg="changeBg" />
    <CustomPopup ref="customPopup" :field="field" @save="saveConfig" />
  </div>
</template>
<script>
import BgDrawer from '@/components/build/config/bgDrawer.vue';
import CustomPopup from '@/components/build/config/customPopup.vue';

export default {
  name: 'configurationForm',
  inject: ['contain', 'openEditor'],
  components: { BgDrawer, CustomPopup },
  data() {
    return {
      prop: '', //属性
      collProp: '', //属性
      imgType: '', //图库类型
      field: '', //编辑器数据类型
      key: [], //key值数组
      defaultImg: require('@/images/null.png'),
      moduleConfigForm: null,
      activeNames: -1,
    };
  },
  watch: {
    'contain.coverageIndex': function() {
      if (this.contain.coverage[this.contain.coverageIndex]) this.$set(this, 'moduleConfigForm', this.contain.coverage[this.contain.coverageIndex].moduleConfigForm);
    },
    moduleConfigForm: {
      handler: function() {
        this.$emit('updateSize');
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    /**
     * @description 打开图库
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/22
     * @param type 图库类型
     * @param isUnfold 是否为展开层
     * @param key 对象属性名
     */
    openBg(type, key) {
      this.imgType = type;
      this.key = key;
      this.$refs.bgDrawer.drawer = true;
    },
    changeBg(src) {
      if (src) {
        if (this.key.length === 2) {
          this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.key[0]].config[this.key[1]].value = src;
        } else {
          this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.key[0]].value = src;
        }
      } else {
        if (this.key.length === 2) {
          this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.key[0]].config[this.key[1]].value = '';
        } else {
          this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.key[0]].value = '';
        }
      }
    },
    addColor() {
      this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.color.data.push({
        value: 'rgba(5, 183, 147, 1)',
        fixed: false,
      });
    },
    removeColor(index) {
      this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.color.data.splice(index, 1);
    },
    /**
     * @description 编辑文本的类型 如数值  提示等
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/15
     */
    customComponent(field) {
      switch (field) {
        case 'formatterText':
          this.openEditor('formatter');
          break;
        case 'hintText':
          this.openEditor('hint');
          break;
        case 'custom':
          this.openEditor('custom');
          break;
        default:
          break;
      }
    },
    editor(key, type, value) {
      this.collProp = '';
      this.prop = key;
      this.field = type;
      this.$refs.customPopup.codeValue = JSON.stringify(value);
      this.$refs.customPopup.dialogVisible = true;
    },
    collEditor(key, collKey, type, value) {
      this.prop = key;
      this.collProp = collKey;
      this.field = type;
      this.$refs.customPopup.codeValue = JSON.stringify(value);
      this.$refs.customPopup.dialogVisible = true;
    },
    saveConfig(res) {
      if (this.collProp) {
        this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.prop].config[this.collProp].value = res.value;
      } else {
        this.contain.coverage[this.contain.coverageIndex].moduleConfigForm[this.prop].value = res.value;
      }
      console.log(this.contain.coverage[this.contain.coverageIndex].moduleConfigForm);
      res.done();
    },
  },
};
</script>
<style lang="less" scoped>
.configuration-form {
  margin-top: 12px;

  .color-box {
    display: flex;
  }

  .editor-box {
    display: flex;
    align-items: center;

    .edit {
      width: 50px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #409eff;
      padding: 0 5px;
      color: #409eff;
      cursor: pointer;
      margin-left: 5px;
      text-align: center;
    }
  }

  .more-color {
    padding: 15px 10px 20px;
    box-sizing: border-box;
  }

  .add-color {
    width: 100%;
    display: inline-block;
    padding: 8px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
    border: dashed 1px #409eff;
    cursor: pointer;
  }

  .delete-color {
    margin-left: 5px;
    width: 32px;
    height: 32px;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    color: #f56c6c;
    cursor: pointer;
  }

  .document {
    a {
      color: #409eff;
      font-size: 14px;
    }
  }

  .label-query {
    margin-left: 5px;
    color: #409eff;
    cursor: pointer;
  }

  ::v-deep .el-form-item {
    padding: 0 20px;
  }

  ::v-deep .el-form-item__label {
    text-align: left;
    font-size: 12px;
    color: #ffffff;
  }

  ::v-deep .el-slider__button {
    width: 6px;
    height: 12px;
    border-radius: 2px;
  }

  ::v-deep .el-collapse-item__header {
    padding: 0 16px;
  }

  ::v-deep .el-collapse-item__content {
    padding-top: 12px;
    padding-bottom: 0;
  }
}
</style>
