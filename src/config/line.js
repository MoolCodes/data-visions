/*
 * @Descripttion: 折线图配置
 * @Author: Li Yuyuan
 * @Date: 2021-10-14 13:59:22
 */
export const lineOne = { //组件容器实例对象
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '折线图'
    },
    hide: { //显示隐藏
        label: '隐藏',
        type: 'switch',
        value: false
    },
    width: {
        label: '宽度',
        type: 'slider',
        value: 400,
        max: 1000
    },
    height: {
        label: '高度',
        type: 'slider',
        value: 400,
        max: 1000
    },
    color: {
        collapseLabel: '颜色列表',
        type: 'palette',
        isAdd: true,
        data: [{
                value: '#5470c6',
                fixed: true,
            },
            {
                value: '#91cc75',
                fixed: true,
            },
            {
                value: '#fac858',
                fixed: true,
            },
            {
                value: '#ee6666',
                fixed: true,
            },
            {
                value: '#73c0de',
                fixed: true,
            },
            {
                value: '#3ba272',
                fixed: true,
            },
            {
                value: '#fc8452',
                fixed: true,
            },
            {
                value: '#9a60b4',
                fixed: true,
            },
            {
                value: '#ea7ccc',
                fixed: true,
            }
        ]
    },
    title: { //标题设置
        collapseLabel: '标题设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: false
            },
            text: {
                label: '标题内容',
                type: 'input',
                value: '标题'
            },
            textColor: {
                label: '标题颜色',
                type: 'color',
                value: '#ffffff'
            },
            textSize: {
                label: '标题大小',
                type: 'number',
                value: 18
            },
            subtext: {
                label: '副标题内容',
                type: 'input',
                value: '副标题'
            },
            subtextColor: {
                label: '副标题颜色',
                type: 'color',
                value: '#ffffff'
            },
            subtextSize: {
                label: '副标题大小',
                type: 'number',
                value: 18
            },
            left: {
                label: 'left',
                type: 'input',
                value: 'center',
                explain: `left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'。`
            },
            top: {
                label: 'top',
                type: 'input',
                value: 'auto',
                explain: `top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'。`
            },
        }
    },
    legend: {
        collapseLabel: '图例组件设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: true
            },
            orient: {
                label: '图例布局',
                type: 'select',
                value: 'horizontal',
                options: [{
                    value: 'vertical',
                    label: '垂直'
                }, {
                    value: 'horizontal',
                    label: '水平'
                }]
            },
            left: {
                label: 'left',
                type: 'input',
                value: 'center',
                explain: `left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'。`
            },
            top: {
                label: 'top',
                type: 'input',
                value: 'auto',
                explain: `top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'。`
            },
            color: {
                label: '字体颜色',
                type: 'color',
                value: '#ffffff'
            },
            fontSize: {
                label: '字体大小',
                type: 'number',
                value: 12
            },
        }
    },
    grid: {
        collapseLabel: '绘图网格设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: false
            },
            top: {
                label: 'top',
                type: 'input',
                value: '60'
            },
            right: {
                label: 'right',
                type: 'input',
                value: '4%'
            },
            bottom: {
                label: 'bottom',
                type: 'input',
                value: '3%'
            },
            left: {
                label: 'left',
                type: 'input',
                value: '3%'
            },
            containLabel: {
                label: '包含刻度标签',
                type: 'switch',
                value: true
            }
        }
    },
    tooltip: { //提示框设置
        collapseLabel: '提示框设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: true
            },
            formatter: {
                label: '文本格式',
                type: 'textarea',
                value: ''
            },
            backgroundColor: {
                label: '背景颜色',
                type: 'color',
                value: '#ffffff'
            },
            color: {
                label: '字体颜色',
                type: 'color',
                value: '#333333'
            },
            fontSize: {
                label: '字体大小',
                type: 'number',
                value: 12
            },
        }
    },
    xAxis: {
        collapseLabel: 'X轴设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: true
            },
            boundaryGap: {
                label: '两边留白',
                type: 'switch',
                value: true
            },
            showLine: {
                label: '显示X轴轴线',
                type: 'switch',
                value: true
            },
            showTick: {
                label: '显示刻度线',
                type: 'switch',
                value: true
            },
            lineColor: {
                label: 'X轴颜色',
                type: 'color',
                value: '#ffffff'
            },
            lineWidth: {
                label: 'X轴宽度',
                type: 'number',
                value: 1
            },
            lineType: {
                label: '轴线类型',
                type: 'select',
                value: 'solid',
                options: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }, {
                    value: 'dotted',
                    label: '斑点线'
                }]
            },
            showSplitLine: {
                label: '显示网格线',
                type: 'switch',
                value: false
            },
            splitLinType: {
                label: '网格线类型',
                type: 'select',
                value: 'solid',
                options: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }, {
                    value: 'dotted',
                    label: '斑点线'
                }]
            },
            rotateLabel: {
                label: '旋转X轴角度',
                type: 'number',
                value: 0
            },
            interval: {
                label: '间隔显示',
                type: 'number',
                value: 0
            }
        }
    },
    yAxis: {
        collapseLabel: 'Y轴设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: true
            },
            name: {
                label: 'Y轴名称',
                type: 'input',
                value: 'Y轴名称'
            },
            showLine: {
                label: '显示Y轴轴线',
                type: 'switch',
                value: false
            },
            showTick: {
                label: '显示刻度线',
                type: 'switch',
                value: false
            },
            lineColor: {
                label: 'Y轴颜色',
                type: 'color',
                value: '#ffffff'
            },
            lineWidth: {
                label: 'Y轴宽度',
                type: 'number',
                value: 1
            },
            lineType: {
                label: '轴线类型',
                type: 'select',
                value: 'solid',
                options: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }, {
                    value: 'dotted',
                    label: '斑点线'
                }]
            },
            showSplitLine: {
                label: '显示网格线',
                type: 'switch',
                value: false
            },
            splitLinType: {
                label: '网格线类型',
                type: 'select',
                value: 'solid',
                options: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }, {
                    value: 'dotted',
                    label: '斑点线'
                }]
            },
            rotateLabel: {
                label: '旋转Y轴角度',
                type: 'number',
                value: 0
            },
            interval: {
                label: '间隔显示',
                type: 'number',
                value: 0
            }
        }
    }
}