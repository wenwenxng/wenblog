##过程中遇到一个大bug
加了overflow-x:hidden,会导致fixed错乱,慎用

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

## 发表评论
1.把文本框做双向数据绑定
2.为发表按钮绑定一个事件
3.校验评论内容是否为空,如果为空,则提示用户,评论内容不能为空
4.通过vue-resource 发送一个请求,把评论内容提交给服务器
5.当发表评论ok后,重新刷新列表,以查看最新的评论
 +如果调用getComments方法重新刷新评论列表的话,可能只能得到 最后一页的评论,前几页的评论获取不到
 +换一种思路:当评论成功后,在客户端,手动拼接处一个最新的评论对象,然后调用数组的unshift方法,把最新的评论,追加到comments中的前头
(有一个坑,首先评论后再点更多会出现重新的现象,可以用filter,但是超过五条,要点两次才有效,以后解决)

 ## 改造图片分析 按钮为路由的链接并显示对应的组件页面

 ## 绘制 图片列表 组件页面结构并美化样式
 1.制作 顶部的滑动条
 2.制作 底部的图片列表

 ### 制作顶部滑动条的坑
 1.需要借助于MUI 中的tab-top-webview-main.html
 2.需要把slider区域的mui-fullscreen类去掉
 3.滑动条无法正常触发滑动,因为需要初始化
  +导入mui.js
  +调用
  ```
  mui('.mui-scroll-wrapper').scroll({
        scrollY: true,
        scrollX: true,
     	deceleration: 0.0006
     	    });
  ```
 4.我们在初始化 滑动条  的时候,导入的mui.js,报错.
  +因为是mui.js中用到了'caller','callee',and 'arguments'东西
  但是在webpack打包好的bundle.js中,默认是启用严格模式的,所以这两者冲突了
  +解决方案:1.改mui2.把wabpack打包时候的严格模式禁用掉
  +最终,我们选中transform-remove-strict-mode移除严格模式

 5.初始化的东西肯定要等DOM元素加载完毕后才能进行啊,所以应该放在mounted里面

 6.当 区域滑动 初始化后,发现tabbar无法正常工作,这时候把每个tabbar按钮的mui-tab-item改一下名字

 ### 制作图片列表 区域
 1.图片列表需要使用懒加载 使用mint-ui提供的
 2.使用
 3.渲染列表数据

### 实现了 图片列表的 懒加载改造 和 样式美化

## 实现了点击图片 跳转到图片详情页面
1.在改造 li 成 router-link的时候,需要使用tag属性指定要渲染为哪种元素

## 实现 详情页面布局和美化,同时渲染页面

## 实现突破详情中 缩略图的功能
1.使用 插件 vue-preview 这个缩略图插件
2.获取到所有的图片列表,然后使用v-for指令渲染数据
3.注意:每个图片数据对象中,必须有w 和 h


## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上 去进行项目的预览和测试
1.要保证自己的手机可以正常运行
2.保证 手机 和开发项目的电脑 处于同一个局域网中
3.打开自己的 项目中 package.json文件,在dev 脚本中,添加一个 -- host指令,把当前电脑的wifi IP地址,设置为 -- host的指令值
+如何查看自己电脑所处的wifi的ip呢,在cmd终端中运行'ipconfig',查看无线网的ip地址