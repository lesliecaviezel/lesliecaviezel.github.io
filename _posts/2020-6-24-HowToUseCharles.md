---
layout: post
title: "Charles介绍"
date:   2020-5-18
tags: [Tool]
comments: true
author: 大宁
toc: true
---

概述：<br>
Charles(青花瓷)是HTTP的抓包工具，可以有效地获取HTTP通信信息；此文章使用的是Charles V4.5.6版本

<!-- more -->

首先展示一下Charles的页面
![示例]({{site.baseurl}}/images/Charles/charles_demo.png)

# 安装

安装教程可参考：[链接](http://www.pc6.com/mac/137987.html)

Charles下载：
- [原下载地址](http://m6.pc6.com/xuh6/Charles456.zip)
- [百度云](https://pan.baidu.com/s/14yPJssKhyEh2F44BogkxZA) 密码:a999

## 安装步骤

1. 按照上述安装包下载后，即可获取破解版的dmg文件
2. 安装完成后打开Charles，在上方菜单栏的“Help”选择“Register Charles”，会弹出一个Charles for Mac注册界面。
![示例]({{site.baseurl}}/images/Charles/registerCharles.png)
3. 打开解压文件夹中的“keygen.jar”
4. 在运行后的“keygen.jar”上输入“orsoon”然后点击“Generate”生成Charles注册码
5. 然后将生成的charles注册码复制到注册界面的对应位置上，再点击“Register”。
![示例]({{site.baseurl}}/images/Charles/keygen_use.png)
6. 之后会提示注册完成，到这里就可以开始免费使用Charles了。

>注意！：在第3步时，可能会提示`您需要安装JDK才能使用“java”命令行工具`，最简单的安装方式如下：

```shell
brew cask install oracle-jdk
```

当然也可以去[官网](https://www.oracle.com/java/technologies/javase-downloads.html)下载JDK

# 使用方式

在此介绍一下如何用Charles抓取手机上的https请求; 参考：[链接](https://www.jianshu.com/p/71dcc417c95a)

## 第一步：安装Charles证书到Mac

1. 启动Charles，选择Help-->SSL Proxying→Install Charles Root Certificate，此时会自动在钥匙串里安装证书
2. 在钥匙串中找到证书Charles Proxy CA，然后双击或者右键显示简介，点开`信任`选项，选择`始终信任`
![示例]({{site.baseurl}}/images/Charles/trusTheCer.png)
3. 移动复制该证书到“系统”里面。此时电脑端的证书就配置完毕了！

## 第二步：设置HTTPS端口抓包

1. 点击Charles-->Proxy-->SSL Proxying Settings，点击"Enable SSL Proxying",点击“Add”
2. Host填通配符 `*` ，Port填通用端口 `443`
![示例]({{site.baseurl}}/images/Charles/Enable_SSL_Proxying.png)

## 第三步：安装Charles证书到手机

1. 首先查看电脑IP地址，点击Charles-->Help→Local IP Address；<br>也可以在网络偏好设置里看；<br>也可以命令行 `fconfig en0`查看;
2. 手机必须和电脑在同一个Wi-Fi下，然后到wifi详情里，选择配置代理
3. 将代理模式改为`手动`，填入对应`ip`，端口号默认`8888`
![示例]({{site.baseurl}}/images/Charles/ip_and_port.png)
4. 此时会弹出提示，点击`Allow`
![示例]({{site.baseurl}}/images/Charles/connectionNote.png)
5. 然后打开Safari浏览器，访问：chls.pro/ssl，下载证书
![示例]({{site.baseurl}}/images/Charles/downloadCer.png)
6. 然后再设置-->通用→描述文件，安装刚下载好的文件
![示例]({{site.baseurl}}/images/Charles/installCer.png)
7. 安装完成后，点击 设置-->通用→关于本机，下拉到底部，点击证书 信任设置，把刚信任开关打开。
![示例]({{site.baseurl}}/images/Charles/TrustCer.png)
8. 大功告成，此时你就可以愉快的抓HTTPS的包了。