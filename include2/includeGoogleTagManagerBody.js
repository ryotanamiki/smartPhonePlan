$(function() {
  var target = $('#google-tag-manager-body');
  var file = '/include2/google-tag-manager-body.html';
  var modifydate = '20190331';

  target.load(file + '?' + modifydate, function() {
    target.children().unwrap();
  });
});