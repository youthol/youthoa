### Git 分支说明 - 建议

* `master` 主分支: 此分支代码应为经测试 可稳定运行版本代码, 服务器 只拉取此分支
* `dev` 或 `develop` 开发分支: 此分支用于**多人**开发同步代码使用, 代码测试审查后 可同步至 `master` 分支
* `<个人名称拼音简写或其他字母>Dev` : **个人**本地开发分支: 此分支为个人本地仓库,主要在此分支编写代码
  代码编写完成并测试后可同步至 `dev` 分支,  此分支不提交到远程仓库



#### 多人开发 示意图 

注: 

* `Gsc` 为个人名字缩写, 按需改成自己的
* 单人开发可忽略略 `dev` 分支
*  分支名称与作用可以按需更新调整



<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"viewBox="-0.5 -0.5 602 182" style="background-color: rgb(255, 255, 255);"><defs/><g><rect x="0" y="0" width="600" height="60" fill="#dae8fc" stroke="none" pointer-events="all"/><rect x="0" y="60" width="600" height="60" fill="#c8e6c6" stroke="none" pointer-events="all"/><rect x="0" y="120" width="600" height="60" fill="#ffe6cc" stroke="none" pointer-events="all"/><path d="M 170 30.03 L 190 30.03 L 170 30.03 L 183.63 30.03" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 188.88 30.03 L 181.88 33.53 L 183.63 30.03 L 181.88 26.53 Z" fill="#6c8ebf" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="150" cy="30" rx="20" ry="20" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 30px; margin-left: 131px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">1</div></div></div></foreignObject><text x="150" y="34" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">1</text></switch></g><rect x="40" y="10" width="80" height="40" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 30px; margin-left: 41px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">master</div></div></div></foreignObject><text x="80" y="34" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">master</text></switch></g><rect x="40" y="70" width="80" height="40" fill="#d5e8d4" stroke="#82b366" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 90px; margin-left: 41px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">dev</div></div></div></foreignObject><text x="80" y="94" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">dev</text></switch></g><rect x="40" y="130" width="80" height="40" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 150px; margin-left: 41px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;"><font  style="background-color: rgb(255, 0, 0);">Gsc</font>Dev</div></div></div></foreignObject><text x="80" y="154" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">GscDev</text></switch></g><path d="M 221.03 46.68 L 235.36 68.07" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 238.28 72.43 L 231.48 68.56 L 235.36 68.07 L 237.29 64.67 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><path d="M 230 30 L 523.63 30" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 528.88 30 L 521.88 33.5 L 523.63 30 L 521.88 26.5 Z" fill="#6c8ebf" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="210" cy="30" rx="20" ry="20" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 30px; margin-left: 191px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">2</div></div></div></foreignObject><text x="210" y="34" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">2</text></switch></g><path d="M 261.03 106.68 L 275.36 128.07" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 278.28 132.43 L 271.48 128.56 L 275.36 128.07 L 277.29 124.67 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><path d="M 270 90 L 483.63 90" fill="none" stroke="#82b366" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 488.88 90 L 481.88 93.5 L 483.63 90 L 481.88 86.5 Z" fill="#82b366" stroke="#82b366" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="250" cy="90" rx="20" ry="20" fill="#d5e8d4" stroke="#82b366" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 90px; margin-left: 231px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">3</div></div></div></foreignObject><text x="250" y="94" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">3</text></switch></g><path d="M 310 150 L 323.63 150" fill="none" stroke="#d79b00" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 328.88 150 L 321.88 153.5 L 323.63 150 L 321.88 146.5 Z" fill="#d79b00" stroke="#d79b00" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="290" cy="150" rx="20" ry="20" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 150px; margin-left: 271px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">4</div></div></div></foreignObject><text x="290" y="154" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">4</text></switch></g><path d="M 370 150 L 383.63 150" fill="none" stroke="#d79b00" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 388.88 150 L 381.88 153.5 L 383.63 150 L 381.88 146.5 Z" fill="#d79b00" stroke="#d79b00" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="350" cy="150" rx="20" ry="20" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 150px; margin-left: 331px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">5</div></div></div></foreignObject><text x="350" y="154" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">5</text></switch></g><path d="M 430 150 L 443.63 150" fill="none" stroke="#d79b00" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 448.88 150 L 441.88 153.5 L 443.63 150 L 441.88 146.5 Z" fill="#d79b00" stroke="#d79b00" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="410" cy="150" rx="20" ry="20" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 150px; margin-left: 391px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">6</div></div></div></foreignObject><text x="410" y="154" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">6</text></switch></g><path d="M 481.03 133.32 L 495.36 111.93" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 498.28 107.57 L 497.29 115.33 L 495.36 111.93 L 491.48 111.44 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="470" cy="150" rx="20" ry="20" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 150px; margin-left: 451px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">7</div></div></div></foreignObject><text x="470" y="154" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">7</text></switch></g><path d="M 521.03 73.32 L 535.36 51.93" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 538.28 47.57 L 537.29 55.33 L 535.36 51.93 L 531.48 51.44 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="510" cy="90" rx="20" ry="20" fill="#d5e8d4" stroke="#82b366" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 90px; margin-left: 491px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">8</div></div></div></foreignObject><text x="510" y="94" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">8</text></switch></g><ellipse cx="550" cy="30" rx="20" ry="20" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 30px; margin-left: 531px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; overflow-wrap: normal;">9</div></div></div></foreignObject><text x="550" y="34" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle" font-weight="bold">9</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://www.diagrams.net/doc/faq/svg-export-text-problems" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>

> 1-> 2 `git commit`
>
> 2->3 `gitcheckout -b dev`  // 分支 `dev` 不存在
>         `gitcheckout dev `         // 分支 `dev` 存在
>
> 3->4 (同2->3)
>
> 4->5, 5->6,6->7 : `git commit `  正常 commit
>
> 7->8: 前置条件  拉取最新`dev` 到本地,  
> 		   合并代码到  `dev` 分支:  `git merge `
>
> 8->9: 前置条件  拉取最新`master` 到本地  , 
>          合并代码 到`master` 分支 : `git merge `



### git commit 规范 - 建议

> 注: 
>
> * 以下 风格名称是 个人按照习惯所起, 不是标准名称
> * 建议



目前找到两种比较常见的风格, 都基于一下模板, 分为  head 简短描述, body 详细描述 footer  注解, 之间以空行分隔,head 为必选, 其余两个 可选

* `每行总长不超过 72 个字符`



```
<head>
<BLANK LINE> 
<body>
<BLANK LINE>
<footer>
```

```
简短描述 (必须) 					建议总长不超过 50 个字符

详细描述 (可选  建议填写 --Gsc)    每行总长不超过 72 个字符      

其他备注 (可选)   				每行总长不超过 72 个字符
```





#### 第一种: `Angular` 风格

个人观察这个被使用的比较多,  此风格将 header 分成了三部分 `类型(可选的范畴): 简短描述简短描述`

##### Commit 模板

```
<type>(<scope>): <subject>
<BLANK LINE> 
<body>
<BLANK LINE>
<footer>
```



##### `type`(必须)

用于说明git commit的类别，只允许使用下面的标识。

* `feat`：新功能（feature）。

* `fix/to`：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

    * `fix`：产生diff并自动修复此问题。适合于一次提交直接修复问题
    * `to`：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
* `docs`：文档（documentation）。

* `style`：格式（不影响代码运行的变动）。

* `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）。

* `perf`：优化相关，比如提升性能、体验。

* `test`：增加测试。

* `chore`：构建过程或辅助工具的变动。

* `revert`：回滚到上一个版本。

* `merge`：代码合并。

* `sync`：同步主线或分支的Bug。

---

##### scope(可选)

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

---
##### subject(必须)

subject是commit目的的简短描述，不超过50个字符。

建议使用中文（感觉中国人用中文描述问题能更清楚一些）。

---

##### `<BLANK LINE>` 空行

结尾不加句号或其他标点符号。

根据以上规范git commit message将是如下的格式：

`fix(DAO):用户查询缺少username属性 `

`feat(Controller):用户查询接口开发`



#### 第二种: 非`Angular` 风格

> We reject the git commit message style of projects such as Angular, Commitizen defaults, etc.
>
> 我们拒绝项目的 git 提交消息风格，例如 Angular、Commitizen 默认值等。

`此风格源自 主要参考自 一下两篇文章, 原为为英文`

* [要编写出色的 git 提交消息，请查看这些指南和建议。](https://github.com/joelparkerhenderson/git-commit-message)

* https://github.com/joelparkerhenderson/git-commit-template   上文对应模板



文章部分翻译

---

##### 从简短的摘要行开始

从简短的摘要行（又名邮件主题）开始：

- 从命令式现役主动动词开始：添加、删除、修复、重构、优化等。
- 最多使用 50 个字符;这是 Git 官方偏好。
- 使用祈使语气：现在时态、主动语态和引导动词。
- 结束时没有句号。

##### 继续较长的说明

继续较长的说明，即消息正文：

- 在摘要行后添加一个空行，然后随心所欲地写。
- 对于自动换行的典型文本，每行最多使用 72 个字符。
- 对非典型文本使用尽可能多的字符，例如 URL、终端输出、格式化消息等。
- 根据需要包含任何类型的注释，链接，示例等。



##### 摘要示例

良好提交消息的摘要示例：

- 添加 foo
- 掉落的福
- 修复 foo
- 重构 foo
- 优化 foo

##### 摘要关键字

我们推荐以下摘要关键字，因为它们使用命令式语气、现在时态、主动语态，并且是动词：

- **添加**：创建功能，例如功能、测试、依赖项。
- 删除：**删除**功能，例如功能、测试、依赖项。
- 修复：**修复**错误、拼写错误、事故、错误陈述等问题。
- **凹凸**：增加某些东西的版本，例如依赖项。
- 生成：更改**生成**过程、工具或基础结构。
- 开始：**开始**做某事;例如，启用切换、功能标志等。
- **停止**：结束做某事;例如，禁用切换、功能标志等。
- **优化**：必须与性能相关的更改，例如加快代码速度。
- **文档**：必须仅在文档中的更改，例如帮助文件。
- 重构：必须只是**重构**的更改。
- **重新**格式化：必须只是格式化的更改，例如更改空格。
- **重新排列**：必须只是安排的更改，例如更改布局。
- **重绘**：必须只是视觉上的更改，例如更改图形、图像、图标等。
- **改写**：必须只是文本的更改，例如更改评论、标签、文档等。

##### 真实世界的例子

现实世界的例子展示了我们如何使用命令式情绪、现在时态、主动语态和动词：

- **为用户添加**赞帖子的功能
- **用户**喜欢帖子的拖放功能
- **修复**用户与帖子之间的关联
- **将**依赖库提升到当前版本
- **使**构建过程使用缓存来提高速度
- **用户**喜欢帖子的启动功能标志
- **停止**用户赞帖子的功能标志
- **优化**用户查看帖子的搜索速度
- **针对**帖子内容的文档社区准则
- **将**用户模型重构为新的语言语法
- **重新设置主页文本的格式**以使用更多空格
- **重新排列**按钮，使“确定”位于右下角
- **重绘**我们的 Web 应用程序如何工作的图表
- **改写**主页文本以使其更受欢迎



#### 第三种: 融合两种风格- 建议

将第二种风格应用到 第一种风格的  <subject> <body> 与 <footer>



### 一些模板示例

https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/

```
fix: fix foo to enable bar

This fixes the broken behavior of the component by doing xyz. 

BREAKING CHANGE
Before this fix foo wasn't enabled at all, behavior changes from <old> to <new>

Closes D2IQ-12345
```



 https://gist.github.com/ericavonb/3c79e5035567c8ef3267

```
feat(controller): add router component

This introduces a new router component to Deis, which proxies requests to Deis
components.

closes #123

BREAKING CHANGE: the controller no longer listens on port 80. It now listens on
    port 8000, with the router redirecting requests on port 80 to the controller.
    To migrate to this change, SSH into your controller and run:

        $ docker kill deis-controller
        $ docker rm deis-controller

    and then restart the controller on port 8000:

        $ docker run -d -p 8000:8000 -e ETCD=<etcd_endpoint> -e HOST=<host_ip> \
        -e PORT=8000 -name deis-controller deis/controller

    now you can start the proxy component by running:

        $ docker run -d -p 80:80 -e ETCD=<etcd_endpoint> -e HOST=<host_ip> -e PORT=80 \
        -name deis-router deis/router

    The router should then start proxying requests from port 80 to the controller.
    
```

https://gist.github.com/ericavonb/3c79e5035567c8ef3267

```
test(client): add unit tests for app domains

Nginx does not allow domain names larger than 128 characters, so we need to make
sure that we do not allow the client to add domains larger than 128 characters.
A DomainException is raised when the domain name is larger than the maximum
character size.

closes #392


```

https://github.com/jclh/git-commit-message-style

```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. **Focus on why you 
are making this change as opposed to how.**

Are there side effects or other unintuitive consequenses of this
change? Here’s the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```



https://github.com/qt/qt5/blob/5.9/.commit-template

```
# ==[ Subject: One line only short meaningful description for logs ]===|


# ==[ Details: Describe what changed and explain why it changed ]======|


# Change log entry (see below for instructions).
#[ChangeLog][][]

# ==[ Footers: Uncomment and edit where applicable ]===================|
#
# One task per entry. Remember space after colon.
#Task-number: 
#Coverity-Id: 
#
# ==[ Please wrap at 72 characters ]===================================|
#
# Remember to read http://wiki.qt.io/Commit_Policy
#
# Change log entry: If this commit adds a significant feature, fixes an
# issue or contains a behavior change that is relevant to others,
# add a change log entry. It can be multiple lines long and ends with an
# empty newline. Try to integrate it into the flow of the commit message
# to avoid redundancy.
# Use the module name to indicate the area of the change e.g. [QtCore].
# Optionally specify a class or subtopic [QtNetwork][QSslSocket].
# Other common tags are: [General], [Important Behavior Changes],
# [Platform Specific Changes][Windows][OS X][Linux/XCB].
#
# [ChangeLog][module][class/topic] description of the really important
# change that was just made on several lines.
```





## 参考文章



* [(知乎)如何规范你的Git commit？](https://zhuanlan.zhihu.com/p/182553920)

* [(简书)git commit 规范指南](https://www.jianshu.com/p/201bd81e7dc9)

* [(掘金)超详细的Git提交规范引入指南](https://juejin.cn/post/6844903793033756680)

* [(CSDN)Git commit 注释规范](https://blog.csdn.net/qq_27022241/article/details/117124268)

* [如何编写更好的 Git 提交消息 – 分步指南 (freecodecamp.org)](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)

* https://open.leancloud.cn/git-commit-message/

* https://github.com/pvdlg/conventional-commit-types   

* [要编写出色的 git 提交消息，请查看这些指南和建议。](https://github.com/joelparkerhenderson/git-commit-message)

* https://github.com/joelparkerhenderson/git-commit-template   上文对应的模板

* [提交消息准则 ·GitHub](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53)

* https://github.com/qt/qt5/blob/5.9/.commit-template

* https://github.com/jclh/git-commit-message-style

* https://gist.github.com/ericavonb/3c79e5035567c8ef3267

*  https://gist.github.com/ericavonb/3c79e5035567c8ef3267

* https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/

  
--

## 笔记

存在问题

* 界面刷新 redux (store) 状态会消失
* 侧边栏 点击 子菜单, 跳转后 会折叠父菜单
  由当前布局方式导致, 可通过将菜单的状态 交由 redux 管理解决
