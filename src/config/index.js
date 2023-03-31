/*
 * @Descripttion: 组件配置对象
 * @Author: Li Yuyuan
 * @Date: 2021-10-09 10:31:56
 */

import * as bar from './bar'
import * as pie from './pie'
import * as line from './line'
import * as border from './border'
import * as custom from './custom'
import * as table from './table'
import * as other from './other'

export default {
    ...bar,
    ...pie,
    ...line,
    ...border,
    ...custom,
    ...table,
    ...other
}