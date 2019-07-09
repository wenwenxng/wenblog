//由于webpack是基于node进行构建的,所以任何node代码都是支持的
var path = require('path')
//在内存中,根据指定的模板页面,生成一份内存中的首页,同时自动把打包好的bundle注入到页面的底部
var htmlWebpackFlugin = require('html-webpack-plugin')
//当运行webpack或者webpack-dev-server的时候,工具会先检查根目录中的配置文件,并读取这个文件,然后根据这个对象进行打包构建
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode:'development',
    entry:path.join(__dirname,'./src/main.js'),//入口
    output:{
        path:path.join(__dirname,'./dist'),//出口
        filename:'bundle.js'//输出文件的名字
    },
    plugins:[//所有webpack 插件的配置节点
        new htmlWebpackFlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html'//设置生成的内存页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{//所有第三方loader模块的
        rules:[//第三方匹配规则-可以传参跟url完全一样
            { test: /\.css$/,use:['style-loader','css-loader']},
            { test: /\.less$/,use:['style-loader','css-loader','less-loader']},
            { test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},
            { test: /\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=49007&name=[hash:8]-[name].[ext]'},
            //limiit给定的值是图片的大小,单位是byte,如果我们引用的图片,大于给定的limit值,则不会转成base64格式的字符串,如果图片小于等于给定的limit值,则会被转为base64字符串
            //即大于limit的图片不会转,小于等于limit的图片都会转成limit
            //第二个参数name代表的是打包后的名字
            //每个图片的hash值都不一样,最多32位
            { test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            //这是处理字体文件的loader
            { test: /\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换高级的的es语法
            { test:/\.vue$/,use:'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            // 'vue$':'vue/dist/vue.js'
        }
    }
}