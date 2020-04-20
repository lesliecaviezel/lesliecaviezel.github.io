---
layout: post
title: "Http协议中，部分缩略词简介"
date:   2020-4-20
tags: [http相关]
comments: true
author: 大宁
toc: true
---

概述：为了更加方便详细的了解Linkplay的设备发现机制，同时也为了加深对http协议的了解，在此简单记录一些缩略词的含义及作用(copy自百度百科)

<!-- more -->

## 1. TTL (生存时间值)
### 1.1 概述
- <a href="https://baike.baidu.com/item/TTL/130248?fr=aladdin" target="_blank">TTL</a> (Time To Live，生存时间值)，该字段指定IP包被路由器丢弃之前允许通过的最大网段数量。
  
- 简单的说它表示<a href="https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F%EF%BC%88%E6%9C%8D%E5%8A%A1%EF%BC%89%E5%8D%8F%E8%AE%AE/15134609?fromtitle=DNS&fromid=427444&fr=aladdin" target="_blank">DNS</a>记录在DNS服务器上缓存时间。
  
>注意：TTL与DNS TTL有区别。二者都是生存时间，但一个指<a href="https://baike.baidu.com/item/ICMP/572452?fr=aladdin" target="_blank">ICMP</a>包的转发次数（跳数），一个指域名解析信息在DNS中的存在时间。
TTL的作用是限制IP数据包在计算机网络中的存在的时间。TTL的最大值是255，TTL的一个推荐值是64。

### 1.2 示例
假设，有这样一个域名 `myhost.ning.com`（其实，这就是一条DNS记录，通常表示在 `ning.com` 域中有一台名为myhost的主机）对应IP地址为1.1.1.1，它的TTL为10分钟。这个域名或称这条记录存储在一台名为 <high style="color: green">ns.ning.com</high> 的DNS服务器上。<br>
此时如果有一个用户在浏览器中输入以下地址（又称URL）: `myhost.ning.com` 那么会发生些什么呢？<br>
该访问者指定的DNS服务器（或是他的ISP，互联网服务商，动态分配给他的)8.8.8.8就会试图为他解释 `myhost.ning.com`，当然8.8.8.8这台DNS服务器由于没有包含 `myhost.ning.com` 这条信息，因此无法立即解析，但是通过全球DNS的递归查询后，最终定位到 <high style="color: green">ns.ning.com</high> 这台DNS服务器，<high style="color: green">ns.ning.com</high> 这台DNS服务器将 `myhost.ning.com` 对应的IP地址1.1.1.1告诉8.8.8.8这台DNS服务器，然有再由8.8.8.8告诉用户结果。8.8.8.8为了以后加快对 `myhost.ning.com` 这条记录的解析，就将刚才的1.1.1.1结果保留一段时间，这就是TTL时间，在这段时间内如果用户又有对 `myhost.ning.com` 这条记录的解析请求，它就直接告诉用户1.1.1.1，当TTL到期则又会重复上面的过程。

<hr>

## 2. ICMP (Internet控制报文协议)
### 2.1 概述
- <a href="https://baike.baidu.com/item/ICMP/572452?fr=aladdin" target="_blank">ICMP</a>（Internet Control Message Protocol）Internet控制报文协议。它是TCP/IP协议簇的一个子协议，用于在IP主机、路由器之间传递控制消息。控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息。这些控制消息虽然并不传输用户数据，但是对于用户数据的传递起着重要的作用。
  
- ICMP使用IP的基本支持，就像它是一个更高级别的协议，但是，ICMP实际上是IP的一个组成部分，必须由每个IP模块实现。

### 2.2 原理
- ICMP提供一致易懂的出错报告信息。发送的出错报文返回到发送
原数据的设备，因为只有发送设备才是出错报文的逻辑接受者。发送设备随后可根据ICMP报文确定发生错误的类型，并确定如何才能更好地重发失败的数据包。但是ICMP唯一的功能是报告问题而不是纠正错误，纠正错误的任务由发送方完成。

- 我们在网络中经常会使用到ICMP协议，比如我们经常使用的用于检查网络通不通的Ping命令（Linux和Windows中均有），这个“Ping”的过程实际上就是ICMP协议工作的过程。还有其他的网络命令如跟踪路由的Tracert命令也是基于ICMP协议的。
  
- 已经定义的ICMP消息类型大约有10多种，每种ICMP数据类型都被封装在一个IP数据包中。
<hr>

## 3. DNS （域名系统/服务协议）
- <a href="https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F%EF%BC%88%E6%9C%8D%E5%8A%A1%EF%BC%89%E5%8D%8F%E8%AE%AE/15134609?fromtitle=DNS&fromid=427444&fr=aladdin" target="_blank">DNS</a> (Domain Name System，Domain Name被译为域名）是因特网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。
  
- DNS是Internet上解决网上机器命名的一种系统。就像拜访朋友要先知道别人家怎么走一样，Internet上当一台主机要访问另外一台主机时，必须首先获知其地址，TCP/IP中的IP地址是由四段以“.”分开的数字组成，记起来总是不如名字那么方便，所以，就采用了域名系统来管理名字和IP的对应关系。
<hr>

## 4. mDNS (多播DNS)
- DNS提供了域名向IP转换的服务，使得最终用户不必使用IP地址去访问网络服务；而且，如果服务器的IP地址发生了变化，提供商只要在域名服务器上更新域名与IP的对应关系就可以了，对用户没有任何影响。

- 但是DNS需要付费并且流程复杂，当你希望提供或使用的服务是面向全球时这当然很值得，但是当你需要的只是在几个房间范围内使用打印服务的时候这很显然是不合适的。link-local Multicast DNS（mDNS，应用层）服务正是你需要的。

- <a href="https://baike.baidu.com/item/mdns" target="_blank">mDNS</a>，即Multicast DNS，为局域网提供了类似DNS的名称-IP对应服务。其定义为“Clients performing DNS-like queries for DNS-like resource records by sending DNS-like UDP query and response messages over IP Multicast to UDP port 5353 / 客户端通过IP多播向UDP端口5353发送类DNS的UDP查询和响应消息，对类DNS的资源记录执行类DNS查询”(5353来源于DNS端口53)。随着移动设备的普及，互联网络对于实时性与灵活性（小型网络）的需求增加，而传统的DNS服务无法有效满足这一需求。mDNS使得用户不需要任何配置，不需要任何授权，且不需要支付任何费用就可以享有域名访问的服务。
<hr>

## 5. 组播
- <a href="https://baike.baidu.com/item/%E7%BB%84%E6%92%AD" target="_blank">组播技术</a>的初衷是在IP网络中，以"尽力而为"的形式发送信息到某个目标组，这个目标组称为组播组，这样在有源主机向多点目标主机发送信息需求时，源主机只发送一份数据，数据的目的地址是组播组地址，这样，凡是属于该组的成员，都可以接收到一份原主机发送的数据的拷贝，此组播方式下，只有真正信息需要的成员会收到信息，其他主机不会收到。
- 因此组播方式解决了单播情况下数据的重复拷贝及带宽的重复占用，也解决了广播方式下带宽资源的浪费。
  
### 5.1 传统方式
组播技术是IP网络数据传输三种方式之一，在介绍IP组播技术之前，先对IP网络数据传输的单播、组播和广播方式做一个简单的介绍。
1. 单播
在发送者和每一接收者之间实现点对点网络连接。如果一台发送者同时给多个的接收者传输相同的数据，也必须相应的复制多份的相同数据包。如果有大量主机希望获得数据包的同一份拷贝时，将导致发送者负担沉重、延迟长、网络拥塞；为保证一定的服务质量需增加硬件和带宽。
2. 广播
广播指在IP子网内广播数据包，所有在子网内部的主机都将收到这些数据包。广播意味着网络向子网每一个主机都投递一份数据包，不论这些主机是否乐于接收该数据包。所以广播的使用范围非常小，只在本地子网内有效，通过路由器和网络设备控制广播传输。
3. 组播
组播在发送者和每一接收者之间实现点对多点网络连接。如果一台发送者同时给多个接收者传输相同的数据，也只需复制一份相同的数据包。它提高了数据传送效率，减少了骨干网络出现拥塞的可能性。

组播解决了单播和广播方式效率低的问题。当网络中的某些用户需求特定信息时，组播源（即组播信息发送者）仅发送一次信息，组播路由器借助组播路由协议为组播数据包建立树型路由，被传递的信息在尽可能远的分叉路口才开始复制和分发。

### 5.2 IP组播
- 公共互联网中的一些团体经常会用到IP组播（Mbone就是一个例子），此外IP组播还被用于Internet2等私有IP网络中的一些特殊应用。
  
- 链路本地组播是指将IP组播包发往处于同一物理的或虚拟的数据链路层的若干主机组。由于这种组播不需要复杂的路由，因此其应用要广泛得多。在IPv6中，它被用于地址解析，而在零配置网络中，它取代了低效的广播协议，完成服务发现、名字解析和地址冲突解析的功能。

<hr>