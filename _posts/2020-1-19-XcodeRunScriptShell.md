---
layout: post
title: "Xcode利用shell编译sdk"
date:   2020-1-19
tags: [shell]
comments: true
author: 大宁
toc: true
---

概述：Xcode编译工程的时候，可以在Build Phases里增加Run Script脚本，用来打包SDK、运行Python修改工程信息或者其他功能，这里简单介绍一下使用Shell脚本来辅助打包SDK的相关知识；

<!-- more -->

>在打包SDK的时候，有时要打模拟器和真机包2个包，然后进行合包从而生成模拟器和真机都支持的SDK，本文就是主要阐述如何通过Shell脚本，来实现上述步骤。

## 1.lipo

>介绍Shell前，我们需要先了解一下lipo命令。什么是lipo？从字面意思理解，它是脂肪的意思，app为了兼容不同的架构（armv7, arm64, i386, x86_64...），需要将不同平台的编译程序合并起来，生成所谓的胖文件（Fat File），而我们的lipo，就是用来干这个的。

1. 查看静态库（通用文件）支持的CPU架构

```shell
lipo -info libname.a
输出：Architectures in the fat file: libname.a are: i386 x86_64 armv7 arm64
```

2. 合并静态库

```shell
#lipo -create 静态库存放路径1  静态库存放路径2 ...  -output 整合后存放的路径
lipo  -create  libname-armv7.a   libname-armv7s.a   libname-i386.a  -output  libname.a
```

3. 静态库拆分或者“瘦身”（提取单个平台）

```shell
# lipo 静态库源文件路径 -thin CPU架构名称 -output 拆分后文件存放路径
# 架构名为armv7/armv7s/arm64等，与lipo -info 输出的架构名一致
lipo  libname.a  -thin  armv7  -output  libname-armv7.a
```

4. 提取、替换和去除指定CPU架构

```shell
# 提取出armv7架构并新建一个通用文件，类似于-thin选项。
lipo -extract armv7 libname.a -output libname_armv7.a

#去除armv7架构
lipo -remove armv7 libname.a -output libname_exceptArmv7.a

#对输入文件libname.a中的armv7架构文件采用librepace.a进行替换，并输出到liboutput.a中
lipo libname.a -replace armv7 libreplace.a -output liboutput.a
```

## 2.Shell 命令

>暂时不打算仔细学习Shell语法，如果以后有经常使用Shell的场景，会回头再起文章记录，这里就简单记录一下Run Script里会用到的常见语法

1.shell中的各种括号

要注意的是，使用[]和[[]]的时候不要吝啬空格，每一项两边都要有空格，[[ 1 == 2 ]]的结果为“假”，但[[ 1==2 ]]的结果为“真”！后一种显然是错的

    1. (): 括号中的命令将会新开一个子shell顺序执行，括号中多个命令之间用分号隔开

    ```shell
    #具体使用场景暂时未了解
    #个人理解了一下，貌似是类似于在终端直接输入，例如下面我本想判断环境变量ACTION的值
    if ("${ACTION}" == "install" )
    #但是输出却是 install: ==: No such file or directory
    ```

    1. (()) : 是一种数学计算命令，它除了可以进行最基本的加减乘除运算，还可以进行大于、小于、等于等关系运算，以及与、或、非逻辑运算。这种扩展计算是整数型的计算，不支持浮点型（*没试过*）。

    ```shell
    #依然以这个判断为例，这样写就没问题了
    if (("${ACTION}" == "install" ))
    #之前为了判断字符串相等，加了双引号，后来试了一下，不加双引号也没问题
    if ((${ACTION} == "install" ))
    ```

    1. []：用来用于字符串比较的，不可用于整数比较

    ```shell 
    #同样的，加不加双引号都行，字符串比较的话还是用[]吧
    if ["${ACTION}" == "install" ]
    if [${ACTION} == "install" ]
    ```

    1. [[]]：在[[和]]之间所有的字符都不会发生文件名扩展或者单词分割，但是会发生参数扩展和命令替换(*暂时不理解，留作备注*)。

    ```shell
    #支持字符串的模式匹配，例如
    [[ hello == hell? ]]，结果为真
    #[[ ]] 中匹配字符串或通配符，不需要引号
    ```


2.if elif else 语法
if语法其实很简单,写 if 和 else if的时候，后面加个then就完事，写完if整个逻辑后用fi收尾即可

```shell
if (( $a == $b ))
then
    echo "a和b相等"
else if (( $a > $b || $a < $b))
then
    echo "a不等于b"
else
    echo "进不来的"
fi
```


3.shell中条件判断if中的-z到-d的意思

```
[ -a FILE ] 如果 FILE 存在则为真。 
[ -b FILE ] 如果 FILE 存在且是一个块特殊文件则为真。
[ -c FILE ] 如果 FILE 存在且是一个字特殊文件则为真。 
[ -d FILE ] 如果 FILE 存在且是一个目录则为真。 
[ -e FILE ] 如果 FILE 存在则为真。
[ -f FILE ] 如果 FILE 存在且是一个普通文件则为真。 
[ -g FILE ] 如果 FILE 存在且已经设置了SGID则为真。 
[ -h FILE ] 如果 FILE 存在且是一个符号连接则为真。 
[ -k FILE ] 如果 FILE 存在且已经设置了粘制位则为真。 
[ -p FILE ] 如果 FILE 存在且是一个名字管道(F如果O)则为真。 
[ -r FILE ] 如果 FILE 存在且是可读的则为真。 
[ -s FILE ] 如果 FILE 存在且大小不为0则为真。  
[ -t FD ] 如果文件描述符 FD 打开且指向一个终端则为真。 
[ -u FILE ] 如果 FILE 存在且设置了SUID (set user ID)则为真。 
[ -w FILE ] 如果 FILE 如果 FILE 存在且是可写的则为真。 
[ -x FILE ] 如果 FILE 存在且是可执行的则为真。 
[ -O FILE ] 如果 FILE 存在且属有效用户ID则为真。 
[ -G FILE ] 如果 FILE 存在且属有效用户组则为真。 
[ -L FILE ] 如果 FILE 存在且是一个符号连接则为真。  
[ -N FILE ] 如果 FILE 存在 and has been mod如果ied since it was last read则为真。
[ -S FILE ] 如果 FILE 存在且是一个套接字则为真。  
[ FILE1 -nt FILE2 ] 如果 FILE1 has been changed more recently than FILE2,or 如果 FILE1 exists and FILE2 does not则为真。  
[ FILE1 -ot FILE2 ] 如果 FILE1 比 FILE2 要老, 或者 FILE2 存在且 FILE1 不存在则为真。  
[ FILE1 -ef FILE2 ] 如果 FILE1 和 FILE2 指向相同的设备和节点号则为真。 
[ -o OPTIONNAME ] 如果 shell选项 “OPTIONNAME” 开启则为真。 
[ -z STRING ] “STRING” 的长度为零则为真。  
[ -n STRING ] or [ STRING ] “STRING” 的长度为非零 non-zero则为真。 
```

## 3.Xcode 环境变量

`ACTION`: 编译模式，archive->"install"、build->"build"

`SRCROOT`: 根目录，~/Desktop/Linkplay/ios_muzoplayer/LPVBSKit

`BUILD_ROOT`: 构建目录，~/Library/Developer/Xcode/DerivedData/.../Build/Products

`CONFIGURATION`: 编译模式Debug、Release

`PROJECT_NAME`: 工程名，LPVBSKit

`TARGETNAME`: target名，LPBLESetupKit 

`BUILD_DIR`: 编译后路径，archive后里面分别有Release-iphoneos、iphonesimulator、universal三个文件夹 /Users/yining/.../LPVBSKit-xxx/.../LPBLESetupKit/BuildProductsPath 

`TARGET_BUILD_DIR`:也是编译路径，BUILD_DIR下的文件的原始地址 /Users/yining/.../LPVBSKit-xxx/.../LPBLESetupKit/IntermediateBuildFilesPath/UninstalledProducts/iphoneos

## 4.SDK编译Shell

### 4.1 shell代码

>`格式化代码`加了空格仅仅`是为了方便阅读`，真实环境不用加，也不确定加了是否对使用造成影响

```shell
#Release-universal文件目录
UNIVERSAL_OUTPUTFOLDER=${BUILD_DIR}/${CONFIGURATION}-universal
#项目下Products文件夹的路径
INSTALL_DIR=${SRCROOT}/Products

#创建Release-universal文件目录，实验了一下，即便不手动创建，archive也会自动创建
mkdir -p "${UNIVERSAL_OUTPUTFOLDER}"

#删除Products文件夹
if [ -d "${INSTALL_DIR}" ]
then
rm -rf "${INSTALL_DIR}"
fi

#重新创建文件夹(-p 的作用是即使上级目录不存在，也会按目录层级自动创建目录，起一个保护作用，防止创建失败)
mkdir -p "${INSTALL_DIR}"

#判断是不是根调用，不是根调用，不要递归（估计就是防止多余调用）
if [ "false" == ${ALREADYINVOKED:-false} ]
then
    #1.首先确认是在archive
    if [ "${ACTION}" = "install" ]
    then
        #2. 设置环境变量 ALREADYINVOKED 为 true（防止多次调用,例如同个项目下，可能有多个targetSDK，如果相互引用，就能确保仅打包一个SDK了，**猜的！**）
        export ALREADYINVOKED="true"

        #3. 开始编译模拟器环境SDK
        xcodebuild -target "${TARGETNAME}" -configuration ${CONFIGURATION} -sdk iphonesimulator ONLY_ACTIVE_ARCH=NO BUILD_DIR="${BUILD_DIR}" BUILD_ROOT="${BUILD_ROOT}" clean build

        #4. 将生成的framework拷贝至universal文件夹下面(-R/r 是递归操作，会将目录下的文件/文件件一起拷贝)
        cp -R "${BUILD_DIR}/${CONFIGURATION}-iphoneos/${TARGETNAME}.framework" "${UNIVERSAL_OUTPUTFOLDER}/"

        #5. 将Release-iphonesimulator/iphoneos文件夹下的framework文件夹下的执行文件合包，替换universal文件夹下framework的执行文件
        # 注：虽然是替换了universal下的文件，但其实universal里的文件，指向的是TARGET_BUILD_DIR下的文件，所以修改universal下framework的文件，就是在修改源文件
        lipo -create -output "${UNIVERSAL_OUTPUTFOLDER}/${TARGETNAME}.framework/${TARGETNAME}" "${BUILD_DIR}/${CONFIGURATION}-iphonesimulator/${TARGETNAME}.framework/${TARGETNAME}" "${BUILD_DIR}/${CONFIGURATION}-iphoneos/${TARGETNAME}.framework/${TARGETNAME}"

        #6. 打开Products文件夹，并把BUILD_DIR下的framework拷贝过来（可以右键查看原文件）
        #注：这个framework其实指向的也是TARGET_BUILD_DIR下的framework，但是直接拷贝TARGET_BUILD_DIR的话，就没法右键查看原文件，其实没啥区别
        open "${INSTALL_DIR}"
        cp -R "${BUILD_DIR}/${CONFIGURATION}-iphoneos/${TARGETNAME}.framework" "${INSTALL_DIR}/${TARGETNAME}.framework"
    fi
fi
```

### 4.2 步骤说明
> Release-iPhoneos 和 Release-universal下的framework指向的其实都是TARGET_BUILD_DIR的原文件

1. archive后，先把Release-iPhoneos下的framework copy至Release-universal下
2. 将Release-iphoneos和Release-iphonesimulator下的执行文件合包，并覆盖到Release-universal下
3. 将Release-iphoneos拷贝至Products目录下，方便拿去使用

### 4.3 路径图解
- BUILD_DIR下的Release-iPhoneos/Release-universal

![BUILD_DIR]({{site.baseurl}}/images/XcodeShell/1.png)

- TARGET_BUILD_DIR下的原文件

![TARGET_BUILD_DIR]({{site.baseurl}}/images/XcodeShell/2.png)