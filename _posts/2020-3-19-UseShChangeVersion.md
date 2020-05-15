---
layout: post
title: "Xcode利用shell更改build号"
date:   2020-3-19
tags: [shell,Xcode]
comments: true
author: 大宁
toc: false
---

概述：编译iOS项目时，也许会遇到自动更改build号这样的需求，用来上架或其他用途。

<!-- more -->

>利用python或者shell脚本都可以做到这点，这里简述shell脚本使用方式

`使用方法：` Build Phases里增加一个Run Script即可

```shell
plist=${INFOPLIST_FILE}
buildNumber=$(date +%Y%m%d%H%M)
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $buildNumber" "$INFOPLIST_FILE"
```