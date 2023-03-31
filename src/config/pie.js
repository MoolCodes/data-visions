/*
 * @Descripttion: pie饼图配置
 * @Author: Li Yuyuan
 * @Date: 2021-10-09 10:57:49
 */
export const pieOne = { //组件容器实例对象
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '饼图'
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
    active: {
        label: '动态图表',
        type: 'switch',
        value: false
    },
    activeTime: {
        label: '切换间隔(ms)',
        type: 'number',
        value: 2000
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
    legend: { //图例设置
        collapseLabel: '图例设置',
        config: {
            show: {
                label: '显示',
                type: 'switch',
                value: true
            },
            orient: {
                label: '图例布局',
                type: 'select',
                value: 'vertical',
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
                value: 'left',
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
    series: { //图形设置
        collapseLabel: '图形设置',
        config: {
            name: {
                label: '系列名称',
                type: 'input',
                value: '名称'
            },
            radius: {
                label: '饼图半径',
                type: 'editor',
                field: 'array',
                value: '50%',
                explain: `1、number：直接指定外半径值。
                2、string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
                3、Array.<number|string>：数组的第一项是内半径，第二项是外半径。`,
            },
            abscissa: {
                label: '圆心横坐标',
                type: 'input',
                value: '50%'
            },
            ordinate: {
                label: '圆心纵坐标',
                type: 'input',
                value: '50%'
            },
            borderRadius: {
                label: '内外圆角半径',
                type: 'number',
                value: 0
            },
            borderWidth: {
                label: '图形边框宽度',
                type: 'number',
                value: 0
            },
            borderColor: {
                label: '图形边框颜色',
                type: 'color',
                value: '#ffffff'
            },
            showLabel: {
                label: '显示标签',
                type: 'switch',
                value: true
            },
            labelPosition: {
                label: '标签位置',
                type: 'select',
                value: 'outside',
                options: [{
                    value: 'outside',
                    label: '饼图扇区外侧'
                }, {
                    value: 'center',
                    label: '饼图扇区内部'
                }, {
                    value: 'inside',
                    label: '饼图中心'
                }]
            },
            labelFormatter: {
                label: '标签格式',
                type: 'textarea',
                value: '{a} {c}',
                explain: '{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）'
            },
            labelColor: {
                label: '标签字体颜色',
                type: 'color',
                value: '#ffffff'
            },
            labelSize: {
                label: '标签字体大小',
                type: 'number',
                value: 12
            },
            scaleSize: {
                label: '高亮放大尺寸',
                type: 'number',
                value: 12
            },
            scaleLabelFormatter: {
                label: '高亮标签格式',
                type: 'textarea',
                value: '{d}%\n{b}',
                explain: '{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）'
            },
            scaleLabelSize: {
                label: '高亮标签字体',
                type: 'number',
                value: 24
            },
            silent: {
                label: '不响应鼠标',
                type: 'switch',
                value: false
            },
        }
    },
}

export const pieTwo = { //组件容器实例对象
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '动态饼图'
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
    radius: {
        label: '环半径',
        type: 'input',
        value: '50%'
    },
    activeRadius: {
        label: '环半径(动态)',
        type: 'input',
        value: '55%'
    },
    lineWidth: {
        label: '环线条宽度',
        type: 'slider',
        value: 30,
        max: 100
    },
    activeTimeGap: {
        label: '切换间隔(ms)',
        type: 'number',
        value: 2000,
    },
    animationCurve: {
        label: '动效曲线',
        type: 'select',
        value: 'easeOutCubic',
        options: [{
            value: 'linear',
            label: 'linear'
        }, {
            value: 'easeInSine',
            label: 'easeInSine'
        }, {
            value: 'easeOutSine',
            label: 'easeOutSine'
        }, {
            value: 'easeInOutSine',
            label: 'easeInOutSine'
        }, {
            value: 'easeInQuad',
            label: 'easeInQuad'
        }, {
            value: 'easeOutQuad',
            label: 'easeOutQuad'
        }, {
            value: 'easeInOutQuad',
            label: 'easeInOutQuad'
        }, {
            value: 'easeInCubic',
            label: 'easeInCubic'
        }, {
            value: 'easeOutCubic',
            label: 'easeOutCubic'
        }, {
            value: 'easeInOutCubic',
            label: 'easeInOutCubic'
        }, {
            value: 'easeInQuart',
            label: 'easeInQuart'
        }, {
            value: 'easeOutQuart',
            label: 'easeOutQuart'
        }, {
            value: 'easeInOutQuart',
            label: 'easeInOutQuart'
        }, {
            value: 'easeInQuint',
            label: 'easeInQuint'
        }, {
            value: 'easeOutQuint',
            label: 'easeOutQuint'
        }, {
            value: 'easeInOutQuint',
            label: 'easeInOutQuint'
        }]
    },
    animationFrame: {
        label: '动效帧数',
        type: 'slider',
        value: 50,
        max: 200
    },
    showOriginValue: {
        label: '显示原始值',
        type: 'switch',
        value: false
    },
}