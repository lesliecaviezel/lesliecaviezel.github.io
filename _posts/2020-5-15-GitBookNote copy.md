---
layout: post
title: "GitBook搭建及配置"
date:   2020-5-15
tags: [Tool, GitBook]
comments: true
author: 大宁
toc: true
---

概述：<br>
使用Jekyll去搭建SDK文档的网站虽然自由度高，但是想支持的非常好需要很娴熟的html技能；<br>
GitBook有固定好的框架，非常适合书写SDK文档。

<!-- more -->

# 1 GitBook简介

+ [GitBook官网](#https://www.gitbook.com)
+ [GitBook文档](#https://github.com/GitbookIO/gitbook)

# 2 步骤

1. 创建好指定目录后，在该目录下执行 `gitbook init`

    首次init后，会自动生成README.md 和 SUMMARY.md 这两个文件；README就是说明文档，而SUMMARY其实就是页面的目录结构
2. 这时候其实就已经完成了初创GitBook了，接下来输入 `gitbook serve` 命令，就可以直接拉起 `http://localhost:4000` 本地serve，在浏览器可以直接展示
3. 接下来便可以针对此GibBook增加配置了，配置信息要放在 `book.json`里，例如：

   ```json
{
    "title": "LinkPlay SDK", #本书标题
    "author": "LinkPlay", #本书作者
    "description": "LinkPlay SDK 文档", #本书描述
    "language": "zh-hans", #本书语言，中文设置 "zh-hans" 即可
    "styles": {
        "website": "./styles/website.css" #自定义页面样式
    },
    "structure": {
        "readme": "README.md" #指定Readme、Summary、Glossary和Languages对应的文件名
    },
    "plugins": [ #配置使用的插件
        "-sharing",
        "js-sequence-diagram-full@>=0.3.1",
        "prism",
        "-highlight",
        "anchors",
        "splitter",
        "github",
        "anchor-navigation-ex",
        "expandable-chapters-small",
        "pageview-count",
        "language-picker"
      ],
      "pluginsConfig": { #配置插件的属性
        "prism": {
          "css": [
            "prismjs/themes/prism-okaidia.css"
          ],
          "lang": {
            "oc": "objectivec",
            "objc": "objectivec",
            "objective-c": "objectivec"
          },
          "ignore": [
            "sequence"
          ]
        },
        "github": {
          "url": "https://github.com/linkplayapp/linkplay_sdk_doc"
        },
        "anchor-navigation-ex": {
          "showGoTop": false
        }
      }
}
   ```

4. 如果book.json配置中包含plugins，那么在重新 `gitbook serve` 前需要先 `gitbook install` ，安装对应的插件，实际上就是用npm去install
5. 接下来就可以配置页面的目录结构，修改 `SUMMARY.md` ，便可达到修改目录的作用，例：
    ```markdown
        # Summary
        * [介绍](README.md)
        * [iOS](iOS/README.md) <!-- 如果把md中的文档在左侧显示目录，可以拼接(#标题名) -->
            * [Device_SDK](iOS/Device_SDK.md#标题1)
            * [Device_SDK](iOS/Device_SDK.md#标题2)
        * [Android](android/README.md)
            * [测试](android/Test.md)
    ```