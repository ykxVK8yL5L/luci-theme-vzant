find ./ | grep Makefile | grep vzant | xargs rm -f  # 拉取第三方插件前先搜索关于已存在同名插件并删除相关文件
svn export --force https://github.com/ykxVK8yL5L/luci-theme-vzant/trunk/ package/feeds/vzant  # 使用svn export添加插件到package/feeds/目录下
