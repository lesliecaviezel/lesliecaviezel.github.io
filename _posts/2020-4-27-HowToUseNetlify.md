---
layout: post
title: "使用Netlify加速Github Pages访问速度(Jekyll)"
date:   2020-4-27
tags: [Tool]
comments: true
author: 大宁
toc: false
---

概述：<br>
使用 **Github Pages** 配合 **Jekyll** 搭建个人博客，即免费又便捷，但其有一个很大的问题就是国内的访问速度很慢，为了低成本的解决这个问题，在此介绍一个服务：`Netlify`

<!-- more -->

## 一. Netlify简介

Netlify是一家提供静态网站托管的综合平台，支持自动从Github等仓库拉取代码，并构建网站进行发布，同时也支持自定义域名、自动申请SSL证书等功能；
最重要的同时也是我们所关注的就是自动启动CDN加速，国内访问速度会快上不少。

## 二. 配置

1. 首先打开 <a href="https://www.netlify.com/" target="_blank">Netlify官网</a>
2. 然后进行一系列配置，很简单，就不详细说明了；不过有几点要注意：
    1. 博客根目录要配置Gemfile：因为Netlify在构建网页时需要知道自己该以怎样的方式去构建
        ```shell
        source 'https://rubygems.org' #配置Netfily的话，因为其服务器在国外，因此用此源
        # source 'https://gems.ruby-china.com' #本地执行的时候为了加速，将源改为ruby-china
        gem "jekyll"
        group :jekyll_plugins do
            gem 'jekyll-feed'
            gem 'jekyll-seo-tag'
            gem 'jekyll-sitemap'
            gem 'jekyll-paginate'
        end
        ```
    2. Build & deploy配置下，Build command要填`jekyll build`,Publish directory要填`_site`

配置完成后，就稍作等待就可以访问了

## 三. site修改

site name是可以随意修改的，也绑定自己的域名(custom domain)；<br>
绑定自己的域名可以提供自己已经购买好的域名，或者直接在Getting started的第二步(实际操作的时候就知道在哪)，直接填写；<br>
尝试填了一个，经历千万次重名提示后，提示我第一年要$10.99，以后每年要$14.99。Em............🤔 ヾ(￣▽￣)Bye~Bye~