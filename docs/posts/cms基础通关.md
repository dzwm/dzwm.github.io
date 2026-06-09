---
title: 古老的cms靶场
date: 2026-06-04
category:
  - 靶场练习

sticky: 1
---

# 古老的cms靶场

靶场下载下来后放进www目录后进行初始化即可开始猛攻

- 首页能表达博客主题和方向
- 文章页有清晰的标题、目录、分类和标签
- 后续可以平滑部署到 `dzwm.github.io`

## 任意用戶重置漏洞

通过dirsearch扫出重置界面

![效果图](/images/posts/20250604cms/1.1.png)

http://127.0.0.1/xxcms/install/index.php?upgrade/

![效果图](/images/posts/20250604cms/1.2.png)

## 注册页面用户名验证位置宽字节数据库注入漏洞

在注册界面输入完用户名后会发送一个get数据请求包

![效果图](/images/posts/20250604cms/2.1.png)

![效果图](/images/posts/20250604cms/2.2.png)

用宽字节注入发现存在布尔盲注，打包放到sqlmap中注入成功


![效果图](/images/posts/20250604cms/2.3.png)
## 注册页面验证码复用批量用户注册漏洞

/user.php?act=reg

![效果图](/images/posts/20250604cms/3.1.png)

同一个验证码多次发包都能正常使用

![效果图](/images/posts/20250604cms/3.2.png)

## 新闻发布页面内容概要存在存储型XSS

进入个人资料管理页面http://192.168.137.110/xxcms/user.php?act=add_news
发现有的功能点选不了，在相应的位置写1即可，后端只检验是否存在参数

![效果图](/images/posts/20250604cms/4.1.png)

内容填入&lt;script&gt;alert(1)&lt;/script&gt;

![效果图](/images/posts/20250604cms/4.2.png)

在http://192.168.137.110/xxcms/news_cat.php里打开本地发现弹出2说明是文件概要触发了xss

![效果图](/images/posts/20250604cms/4.3.png)

## 前台登录存在爆破

因为验证码可以复用所以能前台爆破出用户密码
http://127.0.0.1/xxcms/user.php?act=login

![效果图](/images/posts/20250604cms/5.1.png)

## 前台登录存在万能用戶名-万能密码

在登录界面抓包测sql宽字节注入，在账号密码上都可以宽字节注入

![效果图](/images/posts/20250604cms/6.1.png)

![效果图](/images/posts/20250604cms/6.2.png)

使用万能密码成功进入

![效果图](/images/posts/20250604cms/6.3.png)

## 前台登录盲注

在测试前台登录存在万能用戶名-万能密码的时候找到了注入点，把数据包打包给sqlmap可以进行盲注

![效果图](/images/posts/20250604cms/7.1.png)

对用户名注入sqlmap没跑出来，不过没关系，pwd跑出来了盲注

![效果图](/images/posts/20250604cms/7.2.png)

## 文件/user.php 存在文件包含漏洞

在支付页面抓包，

![效果图](/images/posts/20250604cms/8.1.png)

![效果图](/images/posts/20250604cms/8.2.png)

加入pay参数，是支付方法，然后目录穿越

![效果图](/images/posts/20250604cms/8.3.png)

放包查看浏览器发现回到主页

![效果图](/images/posts/20250604cms/8.4.png)

## 后台登录万能密码

在/admin下打开管理员登录页面

![效果图](/images/posts/20250604cms/9.1.png)

抓包进行宽字节注入万能密码%df%27%20or%201=1%20%23

![效果图](/images/posts/20250604cms/9.2.png)

![效果图](/images/posts/20250604cms/9.3.png)

成功进入

## 后台登录时间盲注

在登录页面抓包对密码进行sql注入，宽字节注入放包发现有报错

![效果图](/images/posts/20250604cms/10.1.png)

![效果图](/images/posts/20250604cms/10.2.png)

把包给sqlmap，成功跑出

![效果图](/images/posts/20250604cms/10.3.png)

## 后台系统设置-模版管理任意文件写入漏洞

在后台模块管理里面修改模块并抓包看包

![效果图](/images/posts/20250604cms/11.1.png)

发现信息跟文件名称，尝试任意文件写入

![效果图](/images/posts/20250604cms/11.2.png)

文件写入的同时路径穿越

![效果图](/images/posts/20250604cms/11.3.png)

放包显示编辑模板成功，访问刚才上传的路径，成功

![效果图](/images/posts/20250604cms/11.4.png)

## 备份文件文件名爆破，和任意用户下载漏洞

在后台找到备份，点击备份，

![效果图](/images/posts/20250604cms/12.1.png)

![效果图](/images/posts/20250604cms/12.2.png)

备份成功后返回点击数据库还原

![效果图](/images/posts/20250604cms/12.3.png)

再点击备份发现相对路径名称叫backup

![效果图](/images/posts/20250604cms/12.4.png)

http://192.168.137.110/xxcms/data/backup/20241108.sql
直接访问这个路径就能下载，不需要登录，所以可以任意用户下载
因为文件名称就是时间年月日所以可以爆破出来

![效果图](/images/posts/20250604cms/12.5.png)

## 后记

这个靶场历史悠久，不算出名却是熬走了一代又一代人，漏洞不止上述这些我就不剧透了，剩下的难度不高，还需各位佬自行探索。
