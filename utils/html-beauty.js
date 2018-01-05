const parser = require('html-parser2');
const netHelper = require('net-helper');
const Result = netHelper.Result;

async function create(req, res) {
    var r = new parser(req.body.html);
    var result = new Result();
    result.status = 'SUCCESS';
    result.message = r.toString();
    console.log(result.message);
    res.send(JSON.stringify(result));
}
async function show(req, res) {
    res.render('home/html-beauty');
}

module.exports = {
    create,
    show
};