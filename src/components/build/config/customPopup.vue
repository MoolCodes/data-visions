<!--
 * @Descripttion:配置代码编辑器弹窗
 * @Author: Li Yuyuan
 * @Date: 2021-10-18 15:03:46
-->
<template>
  <div class="customPopup">
    <el-dialog class="common-dialog-style" title="编辑" :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true" center width="600px" @closed="againRender">
      <code-editor :value="codeValue" :type="field" ref="codeEditor" height="300px"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'customPopup',
  props: {
    field: {
      type: String,
    },
  },
  data() {
    return {
      dialogVisible: false,
      codeValue: '',
    };
  },
  methods: {
    againRender() {
      //关闭弹窗
    },
    submit() {
      //确定
      this.$emit('save', {
        value: this.$refs.codeEditor.getValue(),
        done: () => {
          this.dialogVisible = false;
        },
      });
    },
  },
};
</script>
