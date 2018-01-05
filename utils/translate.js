//const parser = require('html-parser2');
const netHelper = require('net-helper');
const shttp = netHelper.shttp;
const Result = netHelper.Result;
const crypto = require('crypto');
var iconv = require('iconv-lite');

async function create(req, res) {
    var url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
    var appid = '20171229000110425';
    var key = 'rlJu6gLrZJMPR4Ff5QiM';
    var salt = (new Date).getTime();//时间戳

    var from = req.body.from || 'zh';//默认中文简体
    var to = req.body.to || 'en';//翻译为英文
    var q = iconv.encode(req.body.q, 'utf8'); // 请求要翻译的数据,多个用\n分割

    var signature = crypto.createHash('md5').update(`${appid}${q}${salt}${key}`).digest('hex').toLowerCase();
    var result = new Result();

    if (url) {
        result = await shttp
            .get(url)
            .query({
                q: encodeURI(q),
                appid: appid,
                from: from,
                to: to,
                salt: salt,
                sign: signature
            })
            .end();
    } else {
        result.message = 'url不能为空！';
    }
    res.json(result);
}
async function show(req, res) {
    res.render('home/response');
}

module.exports = {
    create,
    show
};