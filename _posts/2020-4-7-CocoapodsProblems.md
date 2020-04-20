---
layout: post
title: "Cocoapods相关问题"
date:   2020-4-7
tags: [工具]
comments: true
author: 大宁
---

概述：使用Cocoapods时偶尔会遇到一些奇怪的问题，在此记录，方便查询

<!-- more -->

## 1.pod install或者pod search时，报错
>如：
<p style="color:red">error: Failed to open TCP connection to raw.githubusercontent.com:443 (Connection refused - connect(2) for "raw.githubusercontent.com" port 443)</p>
>解决方法：

执行`pod repo remove trunk`移除trunk源，然后`pod search`就都正常了