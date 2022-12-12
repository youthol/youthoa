# 青春在线网站办公系统

> 山东理工大学青春在线网站在线办公系统，旨在科学、透明、便捷办公。现有网站成员、权限、内容等数据管理接口，同时拥有在线签到、设备借出归还记录、网站日程安排记录、工作量化统计、校内联系电话便捷查询等实用功能。未来将逐步实现电子化办公，替代传统办公方式。

项目采用前后端分离的方式，前端展示数据，后端提供数据接口，前后端结合共同实现需求。

**技术依托**

- react
- react-router
- redux
- axios
- webpack
- laravel
- ...

## 使用方式

将代码下载到本地

```bash
$ git clone https://github.com/oxyzhg/youthoa.git
```

进入项目目录

```bash
$ cd youthoa
```

全局安装 yarn 包管理工具（有的话跳过）

```bash
$ npm install -g yarn
```

安装项目依赖

```bash
# 使用npm
$ npm i

# 或使用yarn
$ yarn
```

开启本地服务

```bash
$ yarn start
```

可在项目中按需求修改内容

修改完成后，打包应用

```bash
# 使用npm
$ npm build

# 或使用yarn
$ yarn build
```

将打包生成的 *build* 文件夹上传到服务器就可以了。

## 更新记录

2018-07-21

- `A` 创建项目
- `A` 新增页面布局
- `A` 增加路由管理功能

2018-07-28

- `A` 增加签到系统功能
- `U` 更新签到系统页面布局及显示

2018-08-06

- `A` 增加设备借用记录功能
- `A` 增加网站日程记录功能
- `A` 增加工作量统计功能
- `F` 修复了签到系统部分数据不对应的bug

2018-08-09

- `A` 增加校内联系电话便捷查询功能

- `D` 删除测试用表单页和表格页
- `U` 完善了5个功能并跑通数据库

2019-10-30

- `A` 添加 fontmin 依赖，可以使用 `npm run font` 进行字体包提取



| 包名                         | 版本      | 使用                                                         | 备注 |
| ---------------------------- | --------- | ------------------------------------------------------------ | ---- |
| `antd`                       | `^3.12.4` | 基于 `Ant Design` 设计体系的 `React UI` 组件库               |      |
| `axios`                      | `^0.18.0` | `Axios` 是一个基于 `promise` 的网络请求库                    |      |
| `bizcharts`                  | `^3.5.5`  |                                                              |      |
| `chalk`                      | `^1.1.3`  |                                                              |      |
| `dotenv`                     | `4.0.0`   |                                                              |      |
| `dotenv-expand`              | `4.2.0`   |                                                              |      |
| `file-loader`                | `1.1.5`   |                                                              |      |
| `fs-extra`                   | `3.0.1`   |                                                              |      |
| `html-webpack-plugin`        | `2.29.0`  |                                                              |      |
| `moment`                     | `^2.22.2` | `JavaScript` 日期处理类库                                    |      |
| `node-sass`                  | `^4.13.0` |                                                              |      |
| `qs`                         | `^6.5.2`  | `qs` 是一个流行的查询参数序列化和解析库。<br />可以将一个普通的object序列化成一个查询字符串，<br />或者反过来将一个查询字符串解析成一个object，<br />而且支持复杂的嵌套 |      |
| `react`                      | `^16.4.1` | 用于构建用户界面的 JavaScript 库                             |      |
| `react-dev-utils`            | `^5.0.1`  |                                                              |      |
| `react-dom`                  | `^16.4.1` |                                                              |      |
| `react-redux`                | `^5.0.7`  | `Redux` 官方提供的 React 绑定库。 具有高效且灵活的特性。     |      |
| `react-router-dom`           | `^4.3.1`  | `react-dom` 包提供了用户 DOM 的特定方法，可以在你应用程序的顶层进行使用 |      |
| `redux`                      | `^4.0.0`  | `JS` 应用的状态容器，提供可预测的状态管理                    |      |
| `redux-thunk`                | `^2.3.0`  | `redux-thunk` 就是一个标准的 `Redux middleware`              |      |
| `resolve`                    | `1.6.0`   |                                                              |      |
| `sass-loader`                | `^7.1.0`  |                                                              |      |
| `style-loader`               | `0.19.0`  |                                                              |      |
| `sw-precache-webpack-plugin` | `0.11.4`  |                                                              |      |
| `sweetalert`                 | `^2.1.2`  |                                                              |      |
| `url-loader`                 | `0.6.2`   |                                                              |      |
| `whatwg-fetch`               | `2.0.3`   |                                                              |      |