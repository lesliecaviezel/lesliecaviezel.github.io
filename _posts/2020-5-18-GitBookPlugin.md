---
layout: post
title: "GitBook插件"
date:   2020-5-18
tags: [Tool, GitBook]
comments: true
author: 大宁
toc: true
---

概述：<br>
整理一下目前发现的GitBook的插件（plugins），各插件具体使用方式请看其对应的官方介绍

<!-- more -->

## 1. js-sequence-diagram-full (时序图)

>说明：时序图样式插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-js-sequence-diagram-full)
  
+ 示例：

```shell
"plugins": ["js-sequence-diagram-full@>=0.3.1"] 
```

+ 书写方式：
```shell
    （```sequence）// 忽略括号
        participant A
        participant B

        Note over C: Note over C
        Note over A: Note over A

        C->D: C->D
        D->B: D->B
        B-->D: B-->D
        D-->C: D-->C
        A->A: A->A
    （```）
```

+ 效果图：
![效果图]({{site.baseurl}}/images/Gitbook/js-sequence-diagram-full-demo.png)

<hr>

## 2. prism (代码块)

>说明：代码块的样式插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-prism)

+ 参数说明：
    1. css：代码块样式，官方说明上有几种不同的样式
    2. lang：可以自定义重命名代码块命名，例如 `objectivec` 有点长，我们就重命名为 `oc`
    3. ignore：忽略其他可能会引起冲突的代码块插件的代码块名字，如 `js-sequence-diagram-full` 的 `sequence`

+ 示例：

```shell
"plugins": ["prism"],
"pluginsConfig": {
    "prism": {
          "css": ["prismjs/themes/prism-okaidia.css"],
          "lang": {"oc": "objectivec",},
          "ignore": ["sequence"]
        }
}
```

+ 效果图：

![效果图]({{site.baseurl}}/images/Gitbook/prism-demo.png)
<hr>

## 3. anchors

>说明：标题带有 github 样式的锚点。(其实就是鼠标hover在对应h标签后，有个链接小图标显示，点击后标题稍微置顶)

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-anchors)

+ 示例：

```shell
  "plugins" : [ "anchors" ]
```

+ 效果图：

![效果图]({{site.baseurl}}/images/Gitbook/anchors-demo.png)
<hr>

## 4. splitter 

>说明：在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度。

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-splitter)

+ 示例：

```shell
  "plugins" : [ "splitter" ]
```

+ 效果图：

![效果图]({{site.baseurl}}/images/Gitbook/splitter-demo.png)
<hr>

## 5. gtalk (评论)

>说明：添加gitalk评论插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-gtalk)

```shell
  "plugins": ["gtalk"],
  "pluginsConfig": {
    "gtalk": {
      "clientID": "GitHub Application Client ID",
      "clientSecret": "GitHub Application Client Secret",
      "repo": "GitHub repo",
      "owner": "GitHub repo owner",
      "admin": ["GitHub repo owner and collaborators, only these guys can initialize github issues"]
    }
  }
```

## 6. github
   
>说明：在右上角显示 github 仓库的图标链接。

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-github)

+ 示例：

```shell
{
    "plugins": [ "github" ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/your/repo"
        }
    }
}
```

## 7. anchor-navigation-ex (目录)

>说明：目录插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex)
+ [具体参数介绍](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/doc/effectScreenshot.md)

+ 示例：

```shell
{
    "plugins": [
       "anchor-navigation-ex"
    ],
    "pluginsConfig": {
        "anchor-navigation-ex": {
              "showGoTop":true, #右下角是否添加“返回顶部”按钮
              "showLevel": false, #标题是否显示层级序号（控制页面标题是否被重写）
              "printLog": true, #是否打印处理日志,在排查生成book失败的时候很有用
              "mode": "float", #目录的显示模式，目前有三种“float悬浮”、“pageTop文章顶部”、“”不显示，默认float
              "float": { #对应floatMode的图标，可以设置目录里标题前面的ICON
                  "floatIcon": "fa fa-navicon",
                  "showLevelIcon": true,
                  "level1Icon": "fa fa-hand-o-right",
                  "level2Icon": "fa fa-hand-o-right",
                  "level3Icon": "fa fa-hand-o-right"
              }
        }
    }
}
```

## 8. expandable-chapters-small(目录折叠)

>说明：左侧的主目录折叠插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-expandable-chapters-small)

+ 示例：

```shell
"plugins": ["expandable-chapters-small"] 
```
+ 效果图：

![效果图]({{site.baseurl}}/images/Gitbook/expandable-chapters-small.png)

## 9. pageview-count

>说明：文档页面阅读数插件，菜单栏增加个小眼睛，显示访问次数

PS: 经查询，是访问 `https://hitcounter.pythonanywhere.com/count/文章地址` 来查询访问次数的

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-pageview-count)

+ 示例：

```shell
"plugins": ["pageview-count"] 
```

+ 效果图：

![效果图]({{site.baseurl}}/images/Gitbook/pageview-count.png)

## 10. language-picker(国际化)

>说明：语言切换插件

+ [官方介绍](https://www.npmjs.com/package/gitbook-plugin-language-picker)

+ 示例：

```shell
"plugins": ["language-picker"],
"pluginsConfig": { 
        "language-picker": { #可以不设置，默认2种
            "grid-columns": 2 #如果想设置更多种语言，就改这里即可
        }
    }
```

+ 使用细节，以中/英文2种语言为例: 
    1. 使用此插件后，GitBook的目录结构需要同时调整，删除以前的SUMMARY
    2. 创建`en`、`zh-hans`2个文件夹，分别创建其对应的`README.md`和`SUMMARY.md`
    3. 根目录创建`LANGS.md`，指定中/英文文档入口，例如
        ```markdown
           * [English](en/)
           * [简体中文](zh-hans/)
        ```

    4. 这样该gitbook的初始页面其实就变成了`LANGS.md`，并同时提供了中/英文文档入口。例如：

       ![效果图]({{site.baseurl}}/images/Gitbook/language-picker.png)