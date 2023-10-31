$(function() {
  var target = $('#banner');
  var file = '/include2/banner.html';
  var modifydate = '20190331';

  target.load(file + '?' + modifydate, function() {
    target.children().unwrap();
  });
});