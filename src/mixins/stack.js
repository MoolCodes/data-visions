/**
 * @file: stack. 存放撤销和恢复公告逻辑
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/9/28.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
import {
    mapState,
    mapMutations
} from 'vuex'

export default {
    provide() {
        return {}
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            operation: state => state.stack.operation,
            withdraw: state => state.stack.withdraw,
            isOperate: state => state.stack.isOperate
        })
    },
    watch: {
        /**
         * @description 监听撤回或者恢复事件
         * @author: yangj (yangjia@fjxhx.cc)
         * @createDate: 2021/9/28
         */
        withdraw() {
            const last = this.operation[this.operation.length - 1]
            this.contain[last.type] = this.$util.deepClone(last.data)
            switch (last.type) { //撤回和恢复后高亮跟随
                case 'coverage':
                    this.contain.coverageIndex = last.data.findIndex(item => item.ishighlight === true)
            }
        },
    },
    methods: {
        ...mapMutations('stack', {
            setOperation: 'SET_OPERATION',
            setWithdraw: 'SET_WITHDRAW',
            setIsoperate: 'SET_ISOPERATE'
        }),
        /**
         * @description 记录操作
         * @author: yangj (yangjia@fjxhx.cc)
         * @createDate: 2021/9/28
         * @param type 操作的模块类型
         * @param obj 操作的数据
         */
        addOperation(type, obj) {
            if (this.isOperate) return //撤回和恢复操作不记录
            const arr = [...this.$util.deepClone(this.operation), {
                type,
                data: obj
            }]
            this.setOperation(arr)
        },
        /**
         * @description 撤回
         * @author: yangj (yangjia@fjxhx.cc)
         * @createDate: 2021/9/28
         */
        lastStep() {
            this.setIsoperate(true)
            const arr = [...this.$util.deepClone(this.withdraw), ...this.$util.deepClone(this.operation.slice(-1))]
            if (this.operation.length > 1) this.setWithdraw(arr)
            if (this.operation.length > 1) this.setOperation(this.$util.deepClone(this.operation.slice(0, -1)))
        },
        /**
         * @description 恢复
         * @author: yangj (yangjia@fjxhx.cc)
         * @createDate: 2021/9/28
         */
        nextStep() {
            this.setIsoperate(true)
            const arr = [...this.$util.deepClone(this.operation), ...this.$util.deepClone(this.withdraw.slice(-1))]
            if (this.withdraw.length > 0) this.setOperation(arr)
            if (this.withdraw.length > 0) this.setWithdraw(this.$util.deepClone(this.withdraw.slice(0, -1)))
        }
    }
}