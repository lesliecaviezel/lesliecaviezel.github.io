---
layout: post
title: "iOS给项目添加多语种"
date:   2020-5-13
tags: [Xcode]
comments: true
author: 大宁
toc: false
---

概述：给项目添加多语种时，如果嫌手动添加麻烦，可以尝试次文章方法

<!-- more -->

在给项目做国际化的时候，需要添加多语种，有2种方式，一种是在 PROJECT-Info-Localizations 里直接选择添加，这里不多做赘述。

另一种是比较简洁的方法：直接修改工程文件，缺啥加啥就行

> /* Begin PBXProject section */ 下有个 knownRegions，这个就是对应国际化多语言选项的

```
knownRegions = (
    English, 
    en,         // English
    Base,
    "zh-Hans",  // 简体中文
    de,         // 德语
    es,         // 西班牙
    "zh-Hant",  // 繁体中文
    fr,         // 法语
    it,         // 意大利
    "pt-PT",    // 葡萄牙
    ja,         // 日语
    nl,         // Dutch 荷兰语
    ko,         // 韩语
    ru,         // Russian 俄语
    sv,         // Swedish 瑞典语
    da,         // Danish 丹麦语
    fi,         // finnish 芬兰语
    pl,         // Polish  波兰语
    nb,         // Norwegian 挪威语
    hu,         // Hungarian 匈牙利语
    ar,         // Arabic 阿拉伯语
);
```