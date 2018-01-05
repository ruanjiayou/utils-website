const parser = require('html-parser2');
const netHelper = require('net-helper');
const Result = netHelper.Result;

async function create(req, res) {
    var result = new Result();
    var url = decodeURIComponent(req.body.url || '');
    console.log(req.body);
    var html = await netHelper.getHTML(url);
    result.status = Result.STATUS_SUCCESS;
    if (html.status !== Result.STATUS_SUCCESS) {
        result.status = Result.STATUS_ERROR;
        result.message = 'get html failed!';
        return res.send(JSON.stringify(result));
    }
    html = html.message;
    if (req.body.type === 'reg') {
        var reg = new RegExp(req.body.reg, 'g');
        var m = reg.exec(html);
        while (m) {
            result.list.push(`<img src="${m[1]}"/>`);
            m = reg.exec(html);
        }
    } else {
        html = new parser(html);
        result.list = html.$('img').map(function (n) {
            delete n.attributes.onload;
            delete n.attributes.onerror;
            return n.outerHTML;
        });
    }
    res.send(JSON.stringify(result));
}
async function show(req, res) {
    res.render('home/recognition-images');
}

module.exports = {
    create,
    show
};