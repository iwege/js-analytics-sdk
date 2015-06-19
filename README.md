# LeanCloud 分析统计 JavaScript SDK

## 详细使用方法请看 [官方文档](https://leancloud.cn/docs/js_analytics.html)


## 与官方的差异
~~~
// AMD in Browser or nwjs
var LeanAnalytics = require('./analytics.umd'); // 也可以直接`<script src='./analytics.umd.min.js'></script>` 来使用
// CommonJS in Eletron
// LeanAnalytics = require('./analytics.umd').LeanAnalytics;

var analytics = new  LeanAnanlytics({           //  使用的是类的方式，并非官方的函数方式
  appId     : appId,
  appKey    : appKey,
  version   : '0.1.8',  // 默认为null
  channel   : 'wenxin', // 默认为null 
  platform  : 'web',    //  默认为web，由于可以使用在`eletron`或者 `nwjs`里面，这个地方你可以自定义 
  localKey  : 'key'     //  可以修改保存的analytics的名称，默认为 lean-analytics-id
});
~~~
## 版本差异

1. 可以通过var的方式简单引入，方式类似官方。
2. 可以通过umd的方式适配`AMD`，`commonjs2`,`var`的模式。
3. 增加amd匿名模式，方便在nwjs等环境当中调用，并且不会与其他模块冲突。

你也可以自行使用任何工具整合到你自己的模块当中，也可以对其进行扩展。

## 非官方暴露的特殊事件
特殊事件，用于官方的统计，让你的应用也可以应用使用当中统计出来。

### 应用打开：`!AV!AppOpen` 
Event结构:
~~~
{
  "event":"!AV!AppOpen",
  "attr":{
    "event_id":"_appOpen",
    "channel":"any"
  }
}
~~~
### Push打开：`!AV!PushOpen`
Event结构:
~~~
{
  "event":"!AV!PushOpen",
  "attr":{
    "event_id":"_appOpenWithPush",
    "channel":"any"
  }
}
~~~

## 工具
1. babel
2. webpack



