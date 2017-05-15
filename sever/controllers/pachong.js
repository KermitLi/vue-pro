const superagent = require('superagent');
module.exports = function* (next) {
  var tag = this.query.tag;
  var page = this.query.page;
  var qs = {
    '': '',
    where: '{"$or":[{"tags":{"$in":[{"__type":"Pointer","className":"Tag","objectId":"584628a9ac502e006b06b5d5"},{"__type":"Pointer","className":"Tag","objectId":"562ee8e300b08484c629d897"},{"__type":"Pointer","className":"Tag","objectId":"555e9a94e4b00c57d9955f27"},{"__type":"Pointer","className":"Tag","objectId":"580587d00e3dd900571cd82f"},{"__type":"Pointer","className":"Tag","objectId":"55f78414ddb23dadf5177478"},{"__type":"Pointer","className":"Tag","objectId":"55e6681b00b075a5f2ea623d"},{"__type":"Pointer","className":"Tag","objectId":"584628fca22b9d007aa490c2"},{"__type":"Pointer","className":"Tag","objectId":"55dfc7f100b0c86e3f22d5fd"},{"__type":"Pointer","className":"Tag","objectId":"559a1831e4b08a686d19c302"},{"__type":"Pointer","className":"Tag","objectId":"559a4c13e4b08a686d209b5b"},{"__type":"Pointer","className":"Tag","objectId":"55a08deee4b0ed48f06de6d7"},{"__type":"Pointer","className":"Tag","objectId":"5729bce079bc44005cd48388"},{"__type":"Pointer","className":"Tag","objectId":"5597a54be4b08a686ce5f75e"},{"__type":"Pointer","className":"Tag","objectId":"55c8daed60b2d1400fde7bc7"},{"__type":"Pointer","className":"Tag","objectId":"55b5ccb800b0bb80c458b8b5"},{"__type":"Pointer","className":"Tag","objectId":"5597a385e4b08a686ce5ca69"},{"__type":"Pointer","className":"Tag","objectId":"55cd777160b2ce30a1a43f15"},{"__type":"Pointer","className":"Tag","objectId":"55d5499140ac87cfa89d3898"},{"__type":"Pointer","className":"Tag","objectId":"555e9acae4b00c57d99561e6"},{"__type":"Pointer","className":"Tag","objectId":"5617d88960b2521f49db7220"},{"__type":"Pointer","className":"Tag","objectId":"559a7227e4b08a686d25744f"},{"__type":"Pointer","className":"Tag","objectId":"555e9abee4b00c57d9956152"},{"__type":"Pointer","className":"Tag","objectId":"55979f27e4b08a686ce550a6"},{"__type":"Pointer","className":"Tag","objectId":"555e99f6e4b00c57d9955642"},{"__type":"Pointer","className":"Tag","objectId":"55e325a100b0ded317d2f846"},{"__type":"Pointer","className":"Tag","objectId":"555e9ae0e4b00c57d99562ee"},{"__type":"Pointer","className":"Tag","objectId":"55e7ce1a00b0114308832eb4"},{"__type":"Pointer","className":"Tag","objectId":"555e9abae4b00c57d9956122"},{"__type":"Pointer","className":"Tag","objectId":"55a872f0e4b05881ac919dfc"},{"__type":"Pointer","className":"Tag","objectId":"55e7cc62ddb2dd0023accd0d"},{"__type":"Pointer","className":"Tag","objectId":"5599f577e4b08a686d142949"},{"__type":"Pointer","className":"Tag","objectId":"559b2efbe4b0bd7d53736819"},{"__type":"Pointer","className":"Tag","objectId":"5597a13de4b08a686ce58b7e"},{"__type":"Pointer","className":"Tag","objectId":"555e99ffe4b00c57d99556aa"},{"__type":"Pointer","className":"Tag","objectId":"559c82b9e4b0bd7d5385ec64"},{"__type":"Pointer","className":"Tag","objectId":"555e9a77e4b00c57d9955d64"},{"__type":"Pointer","className":"Tag","objectId":"55978433e4b0c4d3e6fddcb1"},{"__type":"Pointer","className":"Tag","objectId":"555eadc1e4b00c57d9962402"},{"__type":"Pointer","className":"Tag","objectId":"555eadbbe4b00c57d99623cc"},{"__type":"Pointer","className":"Tag","objectId":"55964d83e4b08a686cc6b353"},{"__type":"Pointer","className":"Tag","objectId":"559c814be4b0d4d1b1e9521e"},{"__type":"Pointer","className":"Tag","objectId":"5597a035e4b08a686ce56bd9"},{"__type":"Pointer","className":"Tag","objectId":"5597a05ae4b08a686ce56f6f"}]}},{"hot":true}]}',
    include: 'user',
    limit: '10',
    order: '-createdAt'
  };
  if (tag) {
    qs.where = '{"tagsTitleArray":{"$in":["' + tag + '"]}}';
    qs.order = '-rankIndex';
  }
  if (page) {
    qs['skip'] = page * 10;
  };
  var res = yield superagent.get("https://api.leancloud.cn/1.1/classes/Entry")
    .set({
      'postman-token': 'cca15fc7-1eab-2c52-e9be-d695b0742fea',
      'cache-control': 'no-cache',
      'x-lc-ua': 'AV/js1.5.4',
      'x-lc-sign': 'a7a5ad53f553659bcf68da1f3f24392a,1494834691700',
      'x-lc-session': '457x90pv00dsl99tsu67emvrj',
      'x-lc-id': 'mhke0kuv33myn4t4ghuid4oq2hjj12li374hvcif202y5bm6',
      referer: 'https://juejin.im/timeline/frontend',
      origin: 'https://juejin.im',
      host: 'api.leancloud.cn'
    }).query(qs);
  this.body = res.body.results;
};
