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

- 如果启用了手动修改release版本号功能，在Actions选项下左侧的All workflows栏选中要编译的项目后，右侧点击Run workflow里，填写自己的版本号，再点击绿色的Run workflow按钮运行即可生成ipk

- 如果未启用手动修改release版本号功能，在Actions选项下左侧的All workflows栏选中要编译的项目后，右侧点击Run workflow里，直接点击绿色的Run workflow按钮运行即可生成ipk



![luc-theme-vzant](https://github.com/ykxVK8yL5L/luci-theme-vzant/raw/main/ScreenShot.png)
