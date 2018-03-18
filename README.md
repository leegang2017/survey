# survey


本项目是一个做题的demo, 包括egg.js, mongodb的后台，提供restful服务, 前端现在有2个，一个是用angular5和ng ant design做的，另一个是react和ant design mobile做的

很简单的4步就可以开发一个新的restful服务：
1) 定义一个model,比如app/model/survey.js
2) 在app/service里面新建一个对应的service surveys.js,并继承DaoService
3) 在app/controller里面新建一个对应的controller surveys.js,并继承CommonController
4) 在router.js里面加上下面2句路由，就成功了
 ```js
  router.post(api + '/surveys/search', controller.surveys.index);
  router.resources('surveys', api + '/surveys', controller.surveys);
```

上面的操作默认提供了增删改查的restful接口

method     | url                                                    | 说明               
---        | ---                                                    | ---                     
**GET** | `api/v1/surveys/:id` |  根据id来查找资源
**POST** | `api/v1/surveys` |  根据request body里的json数据来创建新的surveys
**PUT** | `api/v1/surveys/:id` | 更新指定id里的数据
**DELETE** | `api/v1/surveys/:id`|  删除指定id里的数据
 

 POST  api/v1/articles/search?page=:page&pageSize:pageSize  搜索数据，这个是约定的搜索方式，非常简单，不用写额外代码
 ```js
{
  eqs: {name:'eq'},\\找出字段name为eq的数据
  likes: {name:'like'}\\找出字段name包含有like的数据
  ins: {status: ['NEW', 'END']}\\找出字段status是NEW或者END的数据
  times: {created: {start: 1511280000000, end: 1513699200000}}\\找出字段created在这个start和end时间段的数据
  sorts:{name:'asc'}\\按照字段name升序， asc是升序，desc是降序
}
```
