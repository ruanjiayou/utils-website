//const parser = require('html-parser2');
const netHelper = require('net-helper');
const Result = netHelper.Result;
var ArticleParser = require('../lib/articleparser');

async function create(req, res) {
    var result = new Result();
    var url = decodeURIComponent(req.body.url || '');
    var articleor = new ArticleParser();
    if(url){
        //方法一：获取单页正文
        //result = await netHelper.getHTML(url);
        //articleor.setURL(url);
        //if(result.status === Result.STATUS_SUCCESS){
        //    articleor.parse(result.message);
        //    result.obj = articleor.getBody();
        //}
        //方法二：获取多页正文
        result.obj = await articleor.getContents(url);
        result.status = Result.STATUS_SUCCESS;
    } else {
        result.message = 'url不能为空！';
    }
    console.log(result);
    res.send(JSON.stringify(result));
}
async function show(req, res) {
    res.render('home/recognition-body');
}

module.exports = {
    create,
    show
};