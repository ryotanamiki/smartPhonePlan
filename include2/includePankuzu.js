$(function() {
  var target = $('#pankuzu');
  var file = '/include2/pankuzu.html';
  var modifydate = '20190331';

  target.load(file + '?' + modifydate, function() {
    target.children().unwrap();

    // APIを叩いてパンくず生成
    $.getScript("/script/util/api.js", function() {
      pankuzu(data, createPankuzu);
    });
  });
});

var data = {
  url: location.href
}

var __PANKUZU__DIV = '<img alt="　" src="/image/list.gif" width="13" height="9">';

// APIレスポンスからパンくずを組み立てる
function createPankuzu(res) {
  res.pankuzu_list.forEach(function(item, index){
    var pankuzuBody = $('.pankuzu_body');
    if (item.text === 'ホーム') {
      pankuzuBody.append("<a href='" + item.url + "' class='home'>" + item.text + "</a>");
      return;
    } else {
      pankuzuBody.append(__PANKUZU__DIV);
      if (index === res.pankuzu_list.length - 1) {
        pankuzuBody.append(item.text);
        if(typeof pankuzuOverwrite === 'function') {
          pankuzuOverwrite();
        }
        return;
      } else {
        pankuzuBody.append("<a href='" + item.url + "'>" + item.text +"</a>");
      }
    }
  });
}