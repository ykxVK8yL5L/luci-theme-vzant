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

- 需要编译自己的ipk，需要到workflows/compile-package.yml文件里修改配置变量
- 第01行：name 是Actions时左侧All workflows的备注栏
- 第24行：arch 是目标的架构，可以自己修改
- 第25行：sdk 是SDK的x86_64的下载链接，不同架构可以自己修改
- 第26行：kernel 是kernel内核版本
- 第27行：package 是编译ipk软件名称，需根据不同第三方ipk名称全称修改
- 第28行：name 是使用通配符匹配ipk关键字,需根据不同第三方ipk名称取关键字填写
- 第29行：url 是拉取第三方ipk软件源的链接，按自己添加的ipk链接地址修改，仅支持一级目录
- 第30行：branches 是代表分支
- 第89行：repo_token 是GitHub令牌，后面TOKEN改成自己的令牌名称
- 主页面part.sh是添加第三方编译插件拉取目录，使用svn export命令拉取到openwrt-sdk/package/文件夹下即可
- 添加插件目录有三种拉取方式，第一种是讲插件先保存进本项目的主页里，然后yml文件里注释29，30，55，62，65行，取消注释54行。第二种是把插件链接写入feeds.conf.default，注释54，62，65行，取消注释29，30，55行。第三种是把插件通过主页面的part.sh拉取到openwrt-sdk/package/文件夹下，注释29，30，54，55行，取消注释62，65行。
- 如果启用了手动修改release版本号功能，在Actions选项下左侧的All workflows栏选中要编译的项目后，右侧点击Run workflow里，填写自己的版本号，再点击绿色的Run workflow按钮运行即可生成ipk
- 如果未启用手动修改release版本号功能，在Actions选项下左侧的All workflows栏选中要编译的项目后，右侧点击Run workflow里，直接点击绿色的Run workflow按钮运行即可生成ipk



![luc-theme-vzant](https://github.com/ykxVK8yL5L/luci-theme-vzant/raw/main/ScreenShot.png)
