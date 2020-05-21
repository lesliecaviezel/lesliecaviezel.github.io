---
layout: post
title: "npm镜像管理"
date:   2020-5-15
tags: [Tool, GitBook ,npm]
comments: true
author: 大宁
toc: false
---

概述：<br>
npm install 或者 gitbook install的时候，经常遇见网速导致的卡慢问题，这里介绍 `nrm`

<!-- more -->

> 说明：此文 copy 自 -> [简书 · 作者：四月天__](https://www.jianshu.com/p/66f97cadd1eb)

此文列出常见npm命令，大家共勉。

1. 查看npm源地址
      ```shell 
      npm config list
      ```

    结果:
      ```shell
      metrics-registry = "http://registry.npm.taobao.org/"
      ```


2. 修改registry地址，比如修改为淘宝镜像源。
      ```shell 
      npm set registry https://registry.npm.taobao.org/
      ```

    如果有一天你肉身FQ到国外，用不上了，用rm命令删掉它
    ```shell 
      npm config rm registry
    ```


3. nrm是专门用来管理和快速切换私人配置的registry，建议全局安装
      ```shell
      npm install nrm -g --save
      ```

    用nrm ls命令查看默认配置，带*号即为当前使用的配置
    ```shell
      nrm ls
    ```

    ```shell
      npm ---- https://registry.npmjs.org/
      cnpm --- http://r.cnpmjs.org/
      * taobao - https://registry.npm.taobao.org/
      nj ----- https://registry.nodejitsu.com/
      rednpm - http://registry.mirror.cqupt.edu.cn/
      npmMirror  https://skimdb.npmjs.com/registry/
      edunpm - http://registry.enpmjs.org/
    ```

    也可以直接输入以下命令查看当前使用的是哪个源
    ```shell
      nrm current
    ```

    切换源
    ```shell
      nrm use cnpm
    ```

    用nrm add 命令添加公司私有npm源，如http://registry.npm.360.org(随便写的)，起个别名叫qihoo
    ```shell
      nrm add qihoo http://registry.npm.360.org
    ```

    测试下速度
    ```shell
      nrm test npm
      输出npm ---- 790ms
    ```

    最后，如果你被公司开除了，怒删公司npm源配置
    ```shell
      nrm del qihoo
    ```

4. 更新Node版本和npm版本<br>
   清除node的cache（清除node的缓存，这个看情况而定，不是必须的）
   ```shell
      sudo npm cache clean -f 
   ```

   安装"n"版本管理工具，管理node（没有错，就是n）
   ```shell
      sudo npm install -g n 
   ```

   更新node版本
   ```shell
      sudo npm install npm@latest -g 
   ```

   再查一遍本机当前Node和npm的版本吧
   ```shell
      node -v 
      npm -v 
   ```

