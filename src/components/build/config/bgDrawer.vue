<!--
 * @Descripttion: 背景图库
 * @Author: Li Yuyuan
 * @Date: 2021-09-29 18:31:16
-->
<template>
  <div class="bgDrawer">
    <el-drawer title="图库" custom-class="common-drawer-style" :visible.sync="drawer" direction="ttb">
      <ul class="bgDrawer-list">
        <li class="bgDrawer-list-item empty-images" @click="change()"></li>
        <li class="bgDrawer-list-item" v-for="(item, index) in imgList" :key="index" @click="change(item)">
          <img :src="item" alt="" />
        </li>
      </ul>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props:{
    type:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      drawer: false,
      imgList:[],
      bgImgList: [
        require('@/images/bg1.png'),
        require('@/images/bg2.jpg'),
        require('@/images/bg3.jpg'),
        require('@/images/bg4.jpg'),
        require('@/images/bg5.jpg'),
        require('@/images/bg6.jpg'),
        require('@/images/bg7.jpg'),
        require('@/images/bg8.jpg'),
      ],
      borderImgList: [
        require('@/static/border/border1.png'),
        require('@/static/border/border-default.png'),
        require('@/static/border/border.png'),
        require('@/static/border/border2.png'),
        require('@/static/border/border3.png'),
        require('@/static/border/border4.png'),
        require('@/static/border/border5.png'),
        require('@/static/border/border6.png'),
        require('@/static/border/border7.png'),
        require('@/static/border/border8.png'),
        require('@/static/border/border9.png'),
        require('@/static/border/border10.png'),
        require('@/static/border/border11.png'),
        require('@/static/border/border12.png'),
        require('@/static/border/border13.png'),
        require('@/static/border/border14.png'),
        require('@/static/border/border15.png'),
        require('@/static/border/border16.png'),
      ],
    };
  },
  watch:{
    type(newVal){
      switch (newVal){
        case 'bg':
          this.imgList=this.bgImgList
          break
        case 'border':
          this.imgList=this.borderImgList
          break
      }
    }
  },
  methods: {
    change(src) {
      this.$emit('change-bg', src);
      this.drawer = false;
    },
  },
};
</script>
<style lang="less" scoped>
.bgDrawer {
  .bgDrawer-list {
    display: flex;
    flex-wrap: wrap;
    .bgDrawer-list-item {
      width: 240px;
      height: 120px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: solid 1px #dedede;
      box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.8);
      text-align: center;
      background-color: #1b1e25;
      img {
        width: 90%;
        height: 90%;
        margin-top: 5px;
      }
    }

    .bgDrawer-list-item:hover {
      border-color: #058dfc;
      box-shadow: 0 2px 12px 0 rgba(8, 129, 241, 0.8);
    }

    .empty-images {
      background: url(../../../images/null.png) center center no-repeat;
      background-size: 100px 100px;
    }
  }

  ::v-deep .el-drawer {
    height: auto !important;
    max-height: 360px;
  }
}
</style>
