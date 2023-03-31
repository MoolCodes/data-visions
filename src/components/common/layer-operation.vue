<!--
 * @Descripttion: 右击图层操作
 * @Author: Li Yuyuan
 * @Date: 2021-10-08 16:27:28
-->
<template>
  <ul class="layer-operation" :style="{ top: menuTop + 'px', left: mentLeft + 'px' }" v-show="menuShow">
    <li class="layer-operation-item" v-for="(item, index) in menu" :key="index" @click="handel(item.type)"><i
      :class="item.icon"></i>{{ item.text }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'layer-operation',
  inject: ['contain', '$this'],
  data() {
    return {
      menuTop: 0,
      mentLeft: 0,
      menuShow: false,
      menu: [
        {
          text: '删除图层',
          icon: 'el-icon-close',
          type: 'remove',
        },
        {
          text: '置顶图层',
          icon: 'el-icon-top',
          type: 'stick',
        },
        {
          text: '置底图层',
          icon: 'el-icon-bottom',
          type: 'floor',
        },
        {
          text: '上移一层',
          icon: 'el-icon-arrow-up',
          type: 'up',
        },
        {
          text: '下移一层',
          icon: 'el-icon-arrow-down',
          type: 'down',
        },
      ],
    }
  },
  mounted() {
    document.body.onclick = () => {
      this.menuShow = false
    }
  },
  methods: {
    handel(e) {
      switch (e) {
        case 'remove':
          this.remove()
          break
        case 'up':
          this.moveup()
          break
        case 'down':
          this.movedown()
          break
        case 'stick':
          this.stick()
          break
        case 'floor':
          this.floor()
          break
      }
      this.menuShow = false
    },
    remove() {
      /**
       * @name: 删除图层
       */
      this.$confirm('是否删除所选图层?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (this.contain.coverage[this.contain.coverageIndex].isRefresh) {
            const ref = this.contain.coverage[this.contain.coverageIndex].type + this.contain.coverageIndex
            this.$this.$refs.datavCanvas.$refs[ref][0].clearTimer()
          }
          this.$this.$refs.datavConfig.tabIndex = 1
          this.$this.$refs.datavConfig.showBackground = true
          this.$this.$refs.datavCanvas.isShowReferLine = false
          this.contain.coverage.splice(this.contain.coverageIndex, 1)
          this.contain.coverageIndex = -1
        })
        .catch(() => {
        })
    },
    moveup() {
      /**
       * @name: 上移一层
       */
      const index = this.contain.coverageIndex
      if (index > 0) {
        let a, b;
        [a, b] = [this.$util.deepClone(this.contain.coverage[index]), this.$util.deepClone(this.contain.coverage[index - 1])]
        this.contain.coverageIndex = index - 1
        this.$set(this.contain.coverage, index - 1, a)
        this.$set(this.contain.coverage, index, b)
      } else {
        this.$message('已处于最顶层')
      }
    },
    movedown() {
      /**
       * @name: 下移一层
       */
      const index = this.contain.coverageIndex
      if (index < this.contain.coverage.length - 1) {
        let a, b;
        [a, b] = [this.$util.deepClone(this.contain.coverage[index]), this.$util.deepClone(this.contain.coverage[index + 1])]
        this.contain.coverageIndex = index + 1
        this.$set(this.contain.coverage, index + 1, a)
        this.$set(this.contain.coverage, index, b)
      } else {
        this.$message('已处于最底层')
      }
    },
    stick() {
      /**
       * @name: 置顶图层
       */
      const index = this.contain.coverageIndex
      if (index > 0) {
        let item
        item = this.$util.deepClone(this.contain.coverage[index])
        this.contain.coverageIndex = 0
        this.contain.coverage.splice(index, 1)
        this.contain.coverage.unshift(item)
      } else {
        this.$message('已处于最顶层')
      }
    },
    floor() {
      /**
       * @name: 置底图层
       */
      const index = this.contain.coverageIndex
      if (index < this.contain.coverage.length - 1) {
        let item
        item = this.$util.deepClone(this.contain.coverage[index])
        this.contain.containcoverageIndex = this.contain.coverage.length - 1
        this.contain.coverage.splice(index, 1)
        this.contain.coverage.push(item)
      } else {
        this.$message('已处于最底层')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.layer-operation {
  position: absolute;
  z-index: 9999;

  .layer-operation-item {
    min-width: 100px;
    padding: 0 16px;
    box-sizing: border-box;
    line-height: 32px;
    font-size: 12px;
    background: #2e3a44;
    color: #d7e6f3;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      margin-right: 5px;
    }
  }

  .layer-operation-item:hover {
    background: #386063;
  }
}
</style>
