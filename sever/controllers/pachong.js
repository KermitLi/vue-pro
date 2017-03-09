const cheerio = require('cheerio');
const superagent = require('superagent');
module.exports = function * (next){
    let res = yield superagent.get('https://juejin.im/welcome/backend');
    var $ =  cheerio.load(res.text);
      var items = [];
     $('.entry-list .item').each(function (idx, element) {
        var $element = $(element).find('.info .title');
        items.push({
          href: $element.attr('href'),
          text:$element.text()
        });
      });
      items = items.filter((item)=>item.href!==undefined);
     yield this.body = items;

};
