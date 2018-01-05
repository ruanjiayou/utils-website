var CORS = require('./lib/CORS');
const utilRequest = require('./utils/request');
const utilResponse = require('./utils/response');
const utilHtmlTree = require('./utils/htmltree');
const utilHtmlBeauty = require('./utils/html-beauty');
const utilRrecognitionBody = require('./utils/recognition-body');
const utilrecognitionImages = require('./utils/recognition-images');
const utilTranslate = require('./utils/translate');

module.exports = function (app) {
    app.get(['/', '/index', 'index.html'], async function (req, res) {
        res.render('home/index', {});
    });
    // 允许跨域
    app.use('/utils/*', CORS);
    // 查看请求头
    app.get('/utils/request', utilRequest.show);
    app.post('/utils/request', utilRequest.create);
    // 查看响应实体
    app.get('/utils/response', utilResponse.show);
    app.post('/utils/response', utilResponse.create);
    // 查看html的树状结构
    app.get('/utils/htmltree', utilHtmlTree.show);
    app.post('/utils/htmltree', utilHtmlTree.create);
    // html格式美化
    app.get('/utils/html-beauty', utilHtmlBeauty.show);
    app.post('/utils/html-beauty', utilHtmlBeauty.create);
    // 正文识别
    app.get('/utils/recognition-body', utilRrecognitionBody.show);
    app.post('/utils/recognition-body', utilRrecognitionBody.create);
    // 图片识别
    app.get('/utils/recognition-images', utilrecognitionImages.show);
    app.post('/utils/recognition-images', utilrecognitionImages.create);
    // 调用百度翻译接口
    app.get('/utils/translate', utilTranslate.show);
    app.post('/utils/translate', utilTranslate.create);
    // 404页面
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('home/404');
        }
    });
};