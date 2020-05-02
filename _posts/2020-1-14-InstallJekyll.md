---
layout: post
title: "安装Jekyll"
date:   2020-1-14
tags: [工具]
comments: true
author: 大宁
---

概述：初建博客时，尝试修改UI风格，在调试过程中不停的修改css，然后提交，然后刷新博客，以这样的方式来达到调试的目的是非常蠢的，因此去查相关资料，得知仅需要安装**Jekyll**就可以实现本地调试，本文讲简述如何安装Jekyll并调试。

<!-- more -->

## 一、安装

>安装前需要确认环境：Xcode、Ruby。（MacOS自带Ruby、Xcode不用解释）

环境没有问题的话，就可以直接安装**jekyll**了.

```bash
sudo gem install bundler jekyll
```

(bundler)说明：Ruby Project依赖于一系列的ruby gems.而bundler是一个很好的管理ruby项目gems的工具。当然也是一个ruby gem.

## 二、调试
经过几分钟的安装后，就可以调试了

1.查看jekyll版本可以用

```bash
jekyll -v
```

2.到项目根目录下，运行`jekyll server`即可启动本地server `http://127.0.0.1:4000/`

```bash
jekyll server
```

3.启动成功后，直接在浏览器输入`http://127.0.0.1:4000/`即可同步调试

## 三、报错汇总

### 3.1 启动server时，可能会遇到不同的错误，我在使用时，遇到的问题基本是缺少不同的jekyll库，遇到这种问题很简单，安装对应的库即可，例如：

![server_error]({{site.baseurl}}/images/InstallJekyll/jekyll_server_error.png)

很明显缺少jekyll-sitemap，安装即可：

```bash
sudo gem install jekyll-sitemap
```

<hr>

### 3.2 尝试配置Linkplay SDK Github Pages时，按照其对应的模板执行了 `bundle install`
由于调试了其他的jekyll theme，在调试时按照步骤执行了bundleinstall<br>
bundle install后，会根据目录下的Gemfile文件自动安装很多库，具体没研究，不过再次启动本地调试的话，之前的jekyll server已经不行了；<br>
此时想要本地调试需要2步：

1. Gemfile文件，模板如下(不指定版本也行)
   ```shell
    source 'https://rubygems.org'
    gem "jekyll", '3.8.4'
    group :jekyll_plugins do
        gem 'jekyll-feed', '0.11.0'
        gem 'jekyll-seo-tag', '2.5.0'
        gem 'jekyll-sitemap', '1.2.0'
        gem 'jekyll-paginate'
    end
   ```

2. 创建完成后就可以通过执行 `bundle exec jekyll serve` 来拉起本地server `http://127.0.0.1:4000` ;<br>同时会生成Gemfile.lock文件，可忽略

3. 当然也可以`解决以上问题`，将其恢复到 `jekyll serve` 的方式；
   1. 先删除Gemfile.Lock文件，然后重新编辑Gemfile，将jekyll 升级到最新的4.0.0：
        ```shell
            # source 'https://rubygems.org' #配置Netfily的话，因为其服务器在国外，因此用此源
            source 'https://gems.ruby-china.com' #本地执行的时候为了加速，将源改为ruby-china

            gem "jekyll", '~> 4.0.0'

            group :jekyll_plugins do
              gem 'jekyll-feed'
              gem 'jekyll-seo-tag'
              gem 'jekyll-sitemap'
              gem 'jekyll-paginate'
            end
        ``` 
    2. 重新bundle install，成功后即可重新使用 `jekyll serve` 来进行本地调试了
    3. 最后为了Netfily，记得吧Gemflie和Gemfile.lock文件中的Gem sourse改回 `https://rubygems.org`