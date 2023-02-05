/**
 * @file 请求并显示 个人签到记录, 当前数据为测试数据
 * @todo 后端设计接口, 前端配置接口,重写部分展示逻辑
 */

import React, { Component } from 'react'
import { Timeline, Icon, Tooltip, Tag,Statistic } from 'antd'
import moment from 'moment' // 时间格式化
import 'moment/locale/zh-cn' // 时间中文语言
/**
 * 测试数据
 */
const data = [
    {
        "id": 34063,
        "sdut_id": "22121204074",
        "status": 0,
        "duration": 0,
        "created_at": "2023-01-10 12:25:25",
        "updated_at": "2023-01-10 16:25:25"
    },
    {
        "id": 34064,
        "sdut_id": "22121204074",
        "status": 1,
        "duration": 0,
        "created_at": "2023-01-10 12:25:25",
        "updated_at": "2023-01-10 13:25:25"
    },
    {
        "id": 34064,
        "sdut_id": "22121204074",
        "status": 2,
        "duration": 0,
        "created_at": "2023-01-17 12:25:25",
        "updated_at": "2023-01-17 12:26:25"
    },
    {
        "id": 34064,
        "sdut_id": "22121204074",
        "status": 3,
        "duration": 0,
        "created_at": "2023-01-17 12:25:25",
        "updated_at": "2023-01-17 12:25:26"
    },
    {
        "id": 34064,
        "sdut_id": "22121204074",
        "status": 4,
        "duration": 0,
        "created_at": "2023-01-17 12:25:25",
        "updated_at": "2023-01-17 13:26:26"
    },
    {
        "id": 34572,
        "sdut_id": "22121204074",
        "status": 0,
        "duration": 0,
        "created_at": "2023-01-17 12:25:25",
        "updated_at": "2023-01-17 15:27:27"
    }
]

// 0未签退(已签到)，1正常，2多余值班，3早退，4无效
/**
 * 签到状态码与名称 对照表(不完整)
 * 
 */
const SiginRecoardStatus = {
    0: "未签退(已签到)",
    1: "正常",
    2: "多余值班",
    3: "早退",
    4: "无效值班",
}
/**
 * 签到状态码与标签颜色配置
 */
const SiginRecoardColor = {
    0: "orange",
    1: "green",
    2: "green",
    3: "orange",
    4: "orange",
}
/**
 * 时间轴节点标签(Icon)
 */
const timeLineIcon = [
    <Tooltip placement="right" title={SiginRecoardStatus[0]}> <Icon type="frown" style={{ fontSize: "16px", color: SiginRecoardColor[0] }} /></Tooltip>, // 0
    <Tooltip placement="right" title={SiginRecoardStatus[1]}> <Icon type="smile" style={{ fontSize: "16px", color: SiginRecoardColor[1] }} /></Tooltip>, // 1
    <Tooltip placement="right" title={SiginRecoardStatus[2]}> <Icon type="smile" style={{ fontSize: "16px", color: SiginRecoardColor[2] }} /></Tooltip>, // 2
    <Tooltip placement="right" title={SiginRecoardStatus[3]}> <Icon type="frown" style={{ fontSize: "16px", color: SiginRecoardColor[3] }} /></Tooltip>, // 3
    <Tooltip placement="right" title={SiginRecoardStatus[4]}> <Icon type="frown" style={{ fontSize: "16px", color: SiginRecoardColor[4] }} /></Tooltip>, // 4
]

/**
 * 时间轴  内容标签 样式(宽度等长, 文字居中)
 */
const tagStyle = { width: "66px", "textAlign": "center" }

/**
 * 时间轴 内容状态标签(等宽)
 */
const siginrecoardTags = [
    <Tag style={tagStyle} color="magenta">未签退(已签到)</Tag>,
    <Tag style={tagStyle} color="red">正常</Tag>,
    <Tag style={tagStyle} color="volcano">多余值班</Tag>,
    <Tag style={tagStyle} color="orange">早退</Tag>,
    <Tag style={tagStyle} color="gold">无效</Tag>,
]
/**
 * 请求并展示个人签到记录
 */
export default class MySiginRecoard extends Component {
    render() {
        return (
            <div>
                <Timeline style={{ marginLeft: '8px', marginTop: "8px" }}>
                    {
                        data.map((item, key) => {
                            return (
                                (<Timeline.Item key={key} dot={
                                    timeLineIcon[item.status]
                                }
                                >
                                    - {siginrecoardTags[item.status]}
                                    - {moment(item.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}
                                    - {moment(item.created_at, "YYYY-MM-DD hh:mm:ss").calendar()}

                                    <Tag style={tagStyle} color="green"> {moment(item.updated_at, "YYYY-MM-DD hh:mm:ss").diff(moment(item.created_at, "YYYY-MM-DD hh:mm:ss"),"minutes")} 分钟</Tag>,
                                </Timeline.Item>)
                            )
                        }
                        )
                    }
                </Timeline>
            </div>
        )
    }
}
