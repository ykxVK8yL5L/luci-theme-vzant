# luci-theme-vzant
## ipk不是最新代码编译的 建议自己用源码编译使用 
# 演示视频：https://youtu.be/wNvLsQYLMWw
随着系统更新 原IPK已经不能使用 建议编译到固件   
feeds.conf.default里加入: 
```
src-git vzant https://github.com/ykxVK8yL5L/luci-theme-vzant
```

.config里加入:
```
CONFIG_PACKAGE_luci-theme-vzant=y
```

- 【如果在menuconfig 中找不到包  需要拷贝到pakcage下】

- 【需要编译其他ipk，也可以用此项目编译，不过需要到workflows/main.yml文件里修改几个变量】
  
- 第19行：arch 是目标的架构，可以自己修改
- 第20行：sdk 是SDK的armv8的下载链接，不同架构可以自己修改
- 第21行：feeds 是第三方feeds的下载链接，根据自己选用的feeds修改
- 第22行：name 是使用通配符匹配ipk关键字,需根据不同第三方ipk名称取关键字填写
- 第23行：url 是拉取第三方ipk软件源的链接，按自己添加的ipk链接地址修改
- 第24行：package 是编译ipk软件名称，需根据不同第三方ipk名称全称修改
- 第71行：repo_token 是GitHub令牌，后面GITHUB_TOKEN改成自己的令牌名称
- 在Actions选项下左侧的All workflows栏选中要编译的项目后，右侧点击Run workflow里，点击绿色的Run workflow按钮运行即可生成ipk


![luc-theme-vzant](https://github.com/ykxVK8yL5L/luci-theme-vzant/raw/main/ScreenShot.png)
