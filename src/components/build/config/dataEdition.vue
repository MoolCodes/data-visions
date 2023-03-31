<!--
 * @file: dataEdition. 数据编辑
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/14.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->

<template>
  <div class="data-edition">
    <div class="data-type">
      <div class="label">数据类型</div>
      <div class="type-radio">
        <el-radio-group v-model="type">
          <el-radio :label="0">静态数据</el-radio>
          <el-radio :label="1">动态数据</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="refresh-time" v-if="contain.coverage[contain.coverageIndex] && contain.coverage[contain.coverageIndex].isRefresh">
      <div class="label">刷新时间</div>
      <el-input-number v-model="contain.coverage[contain.coverageIndex].apiModule.refreshTime" controls-position="right" :min="1000" size="mini"></el-input-number>
    </div>
    <div class="btn-box">
      <div class="btn data" @click="btnEvent('data')">{{ btnText }}</div>
      <div class="btn refresh">刷新数据</div>
    </div>
    <transition name="el-zoom-in-center">
      <div class="editorBox" v-show="showEditor" :style="{ paddingTop: this.type === 0 ? '60px' : '150px' }">
        <div class="title">{{ title }}</div>
        <div class="api" v-show="type === 1">
          <el-form :model="requestForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="接口地址">
              <el-input v-model="requestForm.url" autocomplete="off" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="请求方式" prop="checkPass">
              <el-select v-model="requestForm.type" placeholder="请选择" size="mini">
                <el-option label="GET" value="get"></el-option>
                <el-option label="POST" value="post"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <i class="el-icon-close" @click="showEditor = false"></i>
        <div id="container-data"></div>
        <div id="reminder-data"></div>
        <div class="editor-btn">
          <div class="data-dispose" @click="openEditor('dispose')">数据处理</div>
          <div class="refresh" @click="refreshData">刷新数据</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'dataEdition',
  inject: ['contain', 'openEditor'],
  data() {
    return {
      editor: null, //文本编辑器
      reminder: null,
      type: 0,
      showEditor: false,
      requestForm: {
        url: '',
        type: '',
      },
      title: '编辑静态数据(JSON)',
      btnText: '编辑静态数据',
      templateJson: '', //模板提示JSON
      requestJson:
        '//接口参数配置模板\n' +
        '//如果需要携带token请说明token存放位置如localStorage.token\n' +
        '{\n' +
        '    "headers": {\n' +
        '        "Content-Type": "application/x-www-form-urlencoded",\n' +
        '        "token":"Cookies.token" \n' +
        '    },\n' +
        '    "data": {\n' +
        '        "min": 1,\n' +
        '        "max": 10,\n' +
        '        "label": "名称",\n' +
        '        "value": 4,\n' +
        '        "unit": "%"\n' +
        '    }\n' +
        '}',
      dataJson:
        '//数据模板\n' +
        '{\n' +
        '    "categories": [\n' +
        '        "7月",\n' +
        '        "8月",\n' +
        '        "9月",\n' +
        '        "10月",\n' +
        '        "11月"\n' +
        '    ],\n' +
        '    "series": [\n' +
        '        {\n' +
        '            "name": "异常资金总额走势",\n' +
        '            "data": [\n' +
        '                18100.09,\n' +
        '                28781.31,\n' +
        '                25654.2,\n' +
        '                30398.73,\n' +
        '                34560.39\n' +
        '            ]\n' +
        '        }\n' +
        '    ]\n' +
        '}',
    };
  },
  watch: {
    type() {
      this.showEditor = false;
      this.editor.setValue('');
      switch (this.type) {
        case 0:
          this.contain.coverage[this.contain.coverageIndex].apiModule.isApi = false;
          this.title = '编辑静态数据(JSON)';
          this.btnText = '编辑静态数据';
          this.reminder.setValue(this.dataJson);
          break;
        case 1:
          this.contain.coverage[this.contain.coverageIndex].apiModule.isApi = true;
          this.title = '编辑请求参数(JSON)';
          this.btnText = '编辑Api接口';
          this.requestForm.url = this.contain.coverage[this.contain.coverageIndex].apiModule.api.url;
          this.requestForm.type = this.contain.coverage[this.contain.coverageIndex].apiModule.api.type;
          this.reminder.setValue(this.requestJson);
          break;
      }
    },
    'contain.coverage': {
      handler() {
        if (this.contain.coverage[this.contain.coverageIndex] && this.contain.coverage[this.contain.coverageIndex].isData && this.editor == null) {
          this.initEditor();
        }
      },
      deep: true,
      immediate: false,
    },
    'contain.coverageIndex': {
      handler() {
        if (this.contain.coverage[this.contain.coverageIndex] && this.contain.coverage[this.contain.coverageIndex].isData && this.editor == null) {
          this.initEditor();
        }
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {},
  methods: {
    /**
     * @description 初始化编辑器
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/13
     */
    initEditor() {
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById('container-data'), {
        value: '', //编辑器初始显示文字
        language: 'json', //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
      });
      this.reminder = monaco.editor.create(document.getElementById('reminder-data'), {
        value:
          '//数据模板\n' +
          '{\n' +
          '    "categories": [\n' +
          '        "7月",\n' +
          '        "8月",\n' +
          '        "9月",\n' +
          '        "10月",\n' +
          '        "11月"\n' +
          '    ],\n' +
          '    "series": [\n' +
          '        {\n' +
          '            "name": "异常资金总额走势",\n' +
          '            "data": [\n' +
          '                18100.09,\n' +
          '                28781.31,\n' +
          '                25654.2,\n' +
          '                30398.73,\n' +
          '                34560.39\n' +
          '            ]\n' +
          '        }\n' +
          '    ]\n' +
          '}', //编辑器初始显示文字
        language: 'json', //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        readOnly: true,
        theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
      });
    },
    /**
     * @description 按钮处理
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/14
     * @param type
     */
    btnEvent() {
      console.log(this.editor);
      switch (this.type) {
        case 0:
          this.editor.setValue(this.contain.coverage[this.contain.coverageIndex].apiModule.data);
          this.editor.trigger('anyString', 'editor.action.formatDocument'); //自动格式化代码
          this.editor.setValue(this.editor.getValue()); //再次设置
          this.showEditor = true;
          break;
        case 1:
          this.editor.setValue(this.contain.coverage[this.contain.coverageIndex].apiModule.api.config);
          this.editor.trigger('anyString', 'editor.action.formatDocument'); //自动格式化代码
          this.editor.setValue(this.editor.getValue()); //再次设置
          this.showEditor = true;
          break;
      }
    },
    /**
     * @description 刷新数据
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/14
     */
    refreshData() {
      switch (this.type) {
        case 0:
          this.contain.coverage[this.contain.coverageIndex].apiModule.data = this.editor.getValue();
          break;
        case 1:
          if (!this.requestForm.url || !this.requestForm.type) {
            this.$message.error('请填写完成接口数据');
            return;
          } else {
            this.contain.coverage[this.contain.coverageIndex].apiModule.api = {
              config: this.editor.getValue(),
              url: this.requestForm.url,
              type: this.requestForm.type,
            };
            this.$set(this.contain.coverage[this.contain.coverageIndex].apiModule, 'params', JSON.parse(this.editor.getValue()).data);
          }
          break;
      }
      this.showEditor = false;
      this.$message.success('刷新数据成功');
    },
  },
};
</script>

<style lang="less" scoped>
.data-edition {
  width: 100%;

  .editorBox {
    position: fixed;
    width: 1200px;
    height: 500px;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0);
    z-index: 999;
    border-radius: 10px;
    padding: 60px 50px 40px;
    display: flex;
    background: #1b1e25;

    .api {
      width: 80%;
      position: absolute;
      top: 50px;

      ::v-deep .el-form-item {
        margin-bottom: 0;
      }

      ::v-deep .el-form-item__label {
        color: #ffffff;
      }

      ::v-deep .el-input__inner {
        background: #0f1014;
        color: #ffffff;
      }
    }

    #container-data {
      width: 600px;
      height: 95%;
    }

    #reminder-data {
      width: 600px;
      height: 95%;
    }

    .el-icon-close {
      color: #ffffff;
      font-size: 20px;
      position: absolute;
      right: 15px;
      top: 15px;
      cursor: pointer;
    }

    .editor-btn {
      position: absolute;
      bottom: 15px;
      display: flex;
      width: 75%;
      margin-left: 8%;
      justify-content: space-between;

      .data-dispose {
        width: 40%;
        text-align: center;
        border: 1px solid #f56c6c;
        color: #f56c6c;
        line-height: 30px;
        cursor: pointer;
      }

      .refresh {
        width: 40%;
        text-align: center;
        border: 1px solid #409eff;
        color: #409eff;
        line-height: 30px;
        cursor: pointer;
      }
    }

    .title {
      position: absolute;
      top: 10px;
      font-size: 16px;
      color: #ffffff;
    }
  }

  .label {
    width: 100px;
    color: #ffffff;
    font-size: 14px;
  }

  .data-type {
    padding: 15px 25px;
    display: flex;

    .type-radio {
      max-width: 100px;

      ::v-deep .el-radio {
        padding-bottom: 10px;
      }
    }
  }

  .refresh-time {
    padding: 15px 25px;
    display: flex;
    align-items: center;

    ::v-deep .el-input-number--mini {
      width: 70%;
    }
  }

  .btn-box {
    .btn {
      width: 80%;
      border: 1px solid #409eff;
      padding: 5px 10px;
      color: #409eff;
      cursor: pointer;
      margin: 10px auto;
      text-align: center;
      border-radius: 5px;
      font-size: 14px;
    }
  }
}
</style>
