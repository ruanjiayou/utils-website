//const parser = require('html-parser2');
const netHelper = require('net-helper');
const Result = netHelper.Result;

async function create(req, res) {
    console.log(req.body.url);
    var r = await netHelper.getHTML(req.body.url);
    var result = new Result();
    result.status = r.status;
    result.obj = {
        query: JSON.stringify(req.query),
        body: JSON.stringify(req.body),
        params: JSON.stringify(req.params)
    };
    result.remote_obj - r.obj;
    result.message = r.message;
    res.send(JSON.stringify(result));
}
async function show(req, res) {
    console.log(req.query);
    res.render('home/request');
}

module.exports = {
    create,
    show
};