# 这是wenblog的项目

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

## 改造新闻资讯链接

## 新闻资讯页面制作
1.绘制界面,使用mui中的media-list.html
2.使用vue-resource 获取数据
3.渲染真实数据

##实现 新闻资讯列表 点击跳转到新闻详情
1.把列表中每一项改造为router-link,同时在跳转的时候,应该提供唯一的id标识符
2.创建新闻详情的组件页面 NewsInfo.vue
3.在 路由模块中,将新闻详情的,路由地址和组件页面对应起来

## 实现 新闻详情 的页面布局 和数据渲染

## 单独封装一个comment.vue评论子组件
1.先创建一个 单独的comment.vue组件模块
2.在需要使用 comment 组件的页面中,先手动导入comment组件
 +'import comment from './comment.vue'
3.在父组件中,使用'components'属性,将刚开导入 comment 组件,注册为自己的 子组件
4.将注册子组件时候,注册名称,以 标签形式,在页面中引入即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1.为加载更多按钮,绑定点击事件,在实践中,请求下一页数据,并将返回的数据push到comments
2.点击加载更多,让pageIndex++,然后重新调用getComments方法,重新获取最新一页的数据
3.为了防止 新数据覆盖老数据,我们点击加载更多的时候,每当获取到新数据,应该让 老数据 调用数组的concat方法,拼接上新数据