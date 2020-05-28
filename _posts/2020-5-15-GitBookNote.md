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

+ [GitBook官网](https://www.gitbook.com)
+ [GitBook文档](https://github.com/GitbookIO/gitbook)

# 2 GitBook本地创建步骤

1. 创建好指定目录后，在该目录下执行 `gitbook init`<br>
首次init后，会自动生成README.md 和 SUMMARY.md 这两个文件；README就是说明文档，而SUMMARY其实就是页面的目录结构

2. 这时候其实就已经完成了初创GitBook了，接下来输入 `gitbook serve` 命令，就可以直接拉起 `http://localhost:4000` 本地serve，在浏览器可以直接展示

3. 接下来便可以针对此GibBook增加配置了，配置信息要放在 `book.json`里，例如：
   ```shell
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
           "-sharing", #自带插件，前面加减号可以禁用
           "github",
           "-livereload" #热加载，自带插件，强烈建议删除，如果开放然后查看其代码，会发现其端口号为35729，和网站上常用的80端口号不同；本地用着很爽，但是网页加载很慢，浏览器Title会转很久
         ],
         "pluginsConfig": { #配置插件的属性
           "github": {
             "url": "https://github.com/linkplayapp/linkplay_sdk_doc"
           },
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

# 3 Github上配套搭建环境

1. 先创建个仓库，然后clone至本地，并将上面步骤生成的代码全部copy到该目录下
2. 最好还是gitignore掉node_modules文件夹，然后将代码push到master上;(记得把_book文件夹备份一下，接下来会用到)
3. 然后创建gh-pages分支，命名最好如此，默认的规则，不然以后Gitbook链接会受到不定影响
   ```shell
   git checkout -b gh-pages
   ```
4. 在gh-pages分支下，先清空文件夹，将第2步准备好的_book里的所有内容copy到当前目录下（注意是copy _book文件下的所有子项，而不是仅仅把文件夹拷贝）
5. 此时可以提交了
6. 访问自己这个库的github地址，然后到setting里面
  ![Setting]({{site.baseurl}}/images/Gitbook/gitbook-github-setting.png)
7. 找到options下面的github pages下的二级域名，这就是此gitbook的地址
  ![Setting]({{site.baseurl}}/images/Gitbook/gitbook-options-githubpages.png)
   
# 4 FAQ

## 1 为什么要创建gh-pages分支？

>gitbook serve时，本地会生成_book文件夹，里面就是网站的静态资源文件，其中index.html就是网站的入口；<br>
github pages的原理是加载html的静态资源文件，所以只要让github pages加载_book这个文件夹就可以实现gitbook网站的展示；<br>
但是由于_book里的静态资源是在_book的文件夹里的，所以要新建一个分支，间接删掉_book这一层，直接将其下的资源文件放在分支里。<br>
因此我们创建了gh-pages分支，并且把master下_book的内容全部copy到该分支下，这样就可以实现网站展示了；

## 2 为什么Gitbook展示的是gh-pages分支，而不是master分支？

>我猜是由于github有自动检测的机制，发现master分支下没有index.html，但是gp-pages分支根目录下却有index.html，所以默认gh-pages为github pages 访问的分支。当然也可以自己手动更改：

![Setting]({{site.baseurl}}/images/Gitbook/gitbook-options-githubpages-branch.png)

## 3 有没有好的方法避免每次手动copy _book下文件
* 第一种： 可以用jenkins：由master去监控master分支，轮询或者监听方式具体不了解，以此来实现每次master有变化，就去自动切换到gh-pages分支，copy master分支的_book资源文件

* 第二种： 写了个脚本，将步骤缩减至2步；
    1. 切换至gh-pages
    2. 执行脚本

* 脚本具体步骤：
    1. git fetch 、 git rebase `保证gh-pages分支为最新`
    2. git checkout master -- _book `把master下_book拉到当前分支下`
    3. 递归遍历_book，把子文件全部覆盖至当前目录
    4. 删除_book
    5. git add . 
    6. git commit -m 'Update by **当前时间**'
    7. git push origin gh-pages `提交代码`
    8. git checkout master `切换回master分支`

* 例：
  
```python
import os
import shutil
import datetime

print("*** gf && gr")
os.system("git fetch")
os.system("git rebase")

print("*** Copy from master's _book ***")
os.system("git checkout master -- _book")

target_path = os.getcwd()
book_path = os.path.join(target_path, "_book")
if(os.path.exists(book_path)):
    print("*** Start copy ***")
    for a in os.walk(book_path):
        # 递归创建目录
        for d in a[1]:
            dir_path = os.path.join(a[0].replace(book_path, target_path), d)
            if not os.path.isdir(dir_path):
                # 不存在就创建
                os.makedirs(dir_path)
        # 递归拷贝文件
        for f in a[2]:
            dep_path = os.path.join(a[0], f)  # _book 目录下的每个文件的绝对路径
            arr_path = os.path.join(a[0].replace(
                book_path, target_path), f)  # 每个文件的目标路径
            shutil.copy(dep_path, arr_path)
    print("*** Copy end ***")
    shutil.rmtree('_book')
    print("*** Remove _book ***")
    print("*** Push... ***")
    os.system("git add .")
    now = datetime.datetime.now()
    commitMessage = "Update by %d-%02d-%02d %02d:%02d:%02d" % (now.year,now.month,now.day,now.hour,now.minute,now.second)
    commitCode = "git commit -m '%s'" % commitMessage
    os.system(commitCode)
    os.system("git push origin gh-pages")
    print("*** Checkout master... ***")
    os.system("git checkout master")
else:
    print("*** _book is not exists*** ")

```