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

- 手动点击本项目右上角star自动开启编译插件


![luc-theme-vzant](https://github.com/ykxVK8yL5L/luci-theme-vzant/raw/main/ScreenShot.png)
