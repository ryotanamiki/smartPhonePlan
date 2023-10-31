var replaceEsimBtn = {}; // namespace
replaceEsimBtn.pageList = [ // global
  '/campaign/device/tablet201911.html',
  '/hdd/esim/',
  '/hdd/esim/index.html',
  '/hdd/esim/flow.html',
  '/hdd/esim/spec.html'
];

//eSIM β 2021/03/25 9:00に受停の為時限設定付与
$(document).ready(function () {

  //サーバーから日付を取得
  let request = new XMLHttpRequest();
  request.open('HEAD', window.location.href, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      let now = new Date(request.getResponseHeader('Date'));
      //console.log(now);
      esimBetaNav(now);
    }
  }
});

function esimBetaNav(now) {
  var target = $('#global-menu');
  var file = '/include2/global-menu.html';
  var modifydate = '20190331';
  let end = new Date('2021/3/25 8:59:59'); // 終了日時（時間は24h表記）
  if(getUrlQuery('hikari')==="1"){
    // ひかり導線の場合は読み込むグロナビをかえる
    file = '/imh/include/globalNavi.html';
  }
  target.load(file + '?' + modifydate, function() {
    target.children().unwrap();

    // eSIM申し込みボタンに置き換え
    if (replaceEsimBtn.pageList.indexOf(location.pathname) !== -1 && (end > now) ) {
      $.getScript("/hdd/esim/include_btn.js");
    }

    let esimBtnNav = document.getElementsByClassName("line2")
    let esimBtnNavSp = document.getElementsByClassName("application_btn")
    if (replaceEsimBtn.pageList.indexOf(location.pathname) !== -1 && (end < now) ) {
        for (let i = 0; i < esimBtnNav.length; i++) {
          esimBtnNav[i].style.display = "none";
      }
        for (let i = 0; i < esimBtnNavSp.length; i++) {
          esimBtnNavSp[i].style.display = "none";
      }
    }
    // お知らせを読み込む
    $.getScript("/include2/includeNotification.js", function () {
      loadNotification(now);
    });
  });
};
// URLパラメータ取得
function getUrlQuery(name) {
	url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}