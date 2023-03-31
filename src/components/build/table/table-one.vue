<!--
 * @Descripttion:表格
 * @Author: Li Yuyuan
 * @Date: 2021-10-18 15:03:46
-->
<template>
  <dv-scroll-board :id="id" :config="config" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }" />
</template>
<script>
export default {
  name: 'tableOne',
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
        this.config = { ...this.config, ...this.option };
      },
      deep: true,
    },
  },
  data() {
    return {
      option: {},
      config: {
        header: ['列1', '列2', '列3'], //表头数据
        data: [
          //表数据
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3'],
        ],
        rowNum: 5, //表行数
        headerBGC: 'rgba(9, 159, 214, 1)', //表头背景色
        oddRowBGC: 'rgba(6, 86, 116, 1)', //奇数行背景色
        evenRowBGC: 'rgba(13, 57, 74, 1)', //偶数行背景色
        waitTime: 2000, //轮播时间间隔(ms)
        headerHeight: 35, //表头高度
        columnWidth: [], //列宽度
        align: [], //列对齐方式
        index: false, //显示行号
        indexHeader: '#', //行号表头
        carousel: 'single', //轮播方式 'single'|'page'
        hoverPause: true, //悬浮暂停轮播
      },
    };
  },
  methods: {},
};
</script>
