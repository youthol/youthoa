

let week_strs = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
]

let timeobjs = {
    1: {
        "name": "一二节",
        "timePeriod": "08:00~10:00",
        "remark": "上午第一大节"
    },
    2: {
        "name": "一二节",
        "timePeriod": "10:00~12:00",
        "remark": "上午第二大节"
    },
    3: {
        "name": "一二节",
        "timePeriod": "14:00~16:00",
        "remark": "下午第一大节"
    },
    4: {
        "name": "一二节",
        "timePeriod": "16:00~18:00",
        "remark": "下午第二大节"
    },
    5: {
        "name": "一二节",
        "timePeriod": "19:00~21:00",
        "remark": "晚上"
    }

}
let parseDutys = (duty_str) => {
    // "0:3|0:4"
    // 分割 每次值日
    let duty_strs = duty_str.split("|")

    let duty_objs = duty_strs.map(item => {
        // 分割 周数 与 时间段编号
        let data_arr = item.split(":")
        // 整合目标 对象 
        let duty_obj = {
            day_at: data_arr[0],
            time_at: data_arr[1],
            showname: week_strs[data_arr[0]] + timeobjs[data_arr[1]].name,
            time:timeobjs[data_arr[1]]
        }
        return duty_obj
    })
    return duty_objs
}

export default parseDutys
