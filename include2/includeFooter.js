$(function () {
  var target = $('#footer');
  var file = '/include2/footer.html';
  var modifydate = '20190331';

  target.load(file + '?' + modifydate, function () {
    target.children().unwrap();

    // Pマークの出し分け
    var path = location.pathname;
    if (path === '/index.html' || path === '/') {
      $('#pmark').removeClass('hidden');
    }

    // URLの生成
    var url = location.href;
    $('#ft_img_twitter').attr('href', 'http://twitter.com/share?url=' + url + '&amp;text=' + encodeURI(document.title));
    $('#ft_img_hatena').attr('href', 'http://b.hatena.ne.jp/append?' + url);

    // コピーライトの生成
    var nowYear = new Date().getFullYear();
    $('.copy').text('©2005-' + nowYear + ' Internet Initiative Japan Inc.');
    $('.copy_smp').text('©2005-' + nowYear + ' Internet Initiative Japan Inc.');
  });
});