var pkg = require('../package');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./router');
//var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var Server = express();
var ejs = require('ejs');
var config = {
    port: 8091,
    session: {
        secret: 'session_cookie_name',
        key: 'session_cookie_secret',
        maxAge: 2592000000
    },
    connect: {
        //数据库登录名
        uid: 'root',
        //数据库登录密码
        psw: '',
        //数据库url地址
        host: 'localhost',
        //数据库url端口
        port: '3306',
        //数据库方言
        dialect: 'mysql',
        //数据库名
        db: 'blog'
    }
};
// 设置模板目录
Server.set('views', path.join(__dirname, 'views'));
// 设置模板的后缀类型为ejs
//Server.set('view engine', 'ejs');
//设置模板的后缀类型
Server.set('view engine', 'html');
//设置render时自动添加的后缀
Server.engine('.html', ejs.__express);
//没用
//ejs.open = '{{';
//ejs.close = '}}';
//失败
//Server.set("view options",{                                                                                  
//   "open":"{{",                                                                                  
//   "close":"}}"
//});
//只能设置分割符
ejs.delimiter = '$';
// 设置静态资源目录
Server.use(express.static(path.join(__dirname, 'public')));
Server.use(express.static('D:/WebSite/blog.php'));

Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: false }));
Server.use(cookieParser(config.session.secret));
//session 中间件
Server.use(session({
    key: config.session.key,//session_cookie_name 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,//session_cookie_secret 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: true,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MySQLStore({
        host: config.connect.host,
        port: config.connect.port,
        user: config.connect.uid,
        password: config.connect.psw,
        database: config.connect.db
        //schema: {
        //  tableName: 'custom_sessions_table_name',
        //  columnNames: {
        //      session_id: 'custom_session_id',
        //      expires: 'custom_expires_column_name',
        //      data: 'custom_data_column_name'
        //  }
        //}
    }),
    //store: new MongoStore({// 将 session 存储到 mongodb
    //  url: config.mongodb// mongodb 地址
    //})
}));

// 设置模板全局常量
Server.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

// 添加模板必需的三个变量
Server.use(function (req, res, next) {
    res.locals.user = req.session.user;
    //res.locals.success = req.flash('success').toString();
    //res.locals.error = req.flash('error').toString();
    next();
});

// 路由
routes(Server);

// 监听端口，启动程序
Server.listen(config.port, '0.0.0.0', function () {
    console.log(`utils.jiayou.com listening on port ${config.port}`);
});