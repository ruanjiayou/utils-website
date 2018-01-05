//const parser = require('html-parser2');
const netHelper = require('net-helper');
const Result = netHelper.Result;

async function create(req, res) {
    var url = req.body.url || '';
    var result = new Result();
    if(url){
        result = await netHelper.getHTML(url);
    } else {
        result.message = 'url不能为空！';
    }
    res.send(JSON.stringify(result));
}
async function show(req, res) {
    res.render('home/response');
}

module.exports = {
    create,
    show
};