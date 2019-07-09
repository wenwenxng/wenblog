# 这是wenblog的项目

## 用心去感受,每一行代码中的用心良苦

### 我是一名程序员

#### 这是我第一个完整的项目

##开源协议之间有何异同
    + https://www.zhihu.com/question/19568896

## 加一行代码
## 再加一行代码

## 用传统方式把修改过后的代码上传到github???

1.git add .
2.git commit -m "提交信息"
3.git push -u origin master

#### 也可以使用webstorm自带的可视化工具

## 制作app组件
1.完成header区域,使用mint-UI 中的header组件
2.制作底部的tabbar 使用mui的 tabber.html
 +在制作 购物车 小图标的时候,操作会相对多一些
 +先把 扩展图标的 css 样式,拷贝到项目中
 +拷贝 扩展字体库 ttf 文件,到项目中
 +为购物车 span 添加,mui-icon mui-icon-extra mui-icon-extra-cart样式
3.要在中间区域放置一个 router-view来展示路由匹配到的组件

## 改造tabbar 为 router-link

## 设置路由高亮-通过改变router-link的active样式

## 点击tabbar 中的路由链接,展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1.获取数据,如何获取?使用 vue-resource
2.使用 vue-resource 的 this.$http.get 获取数据
3.获取到的数据,要保存到data身上
4.使用v-for 循环遍历 每个item项 注意要添加:key,因为vue是傻瓜式原地复用,会导致之前的一些操作错乱

## 改造九宫格区域