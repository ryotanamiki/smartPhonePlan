/* ページ間で複数回使用するような共通関数を切り出す */
// Urlパラメータを取得する
function getUrlQuery(name) {
	url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// 指定したIDにHTMLパーツを挿入する
function htmlPartsInclude(tergetId,htmlPath,callback=null,modifydate='20210101') {
	const target = $(tergetId);
    // ターゲットが存在すればテンプレートファイルを読み込む
    if(target.length){
		target.load(htmlPath + '?' + modifydate, function () {
			target.children().unwrap();
			if (callback){
				// ロード後に実行したい関数を実行
				callback(target);
			}
		});
	}
}
// 上記関数のloopして入れる版（class指定）
function htmlPartsIncludeLoop(tergetClass, htmlPath, callback = null, modifydate = '20210101') {
	const target = $(tergetClass);
	// ターゲットが存在すればテンプレートファイルを読み込む
	if (target.length) {
		target.each(function () {
			$(this).load(htmlPath + '?' + modifydate, function () {
				$(this).children().unwrap();
				if (callback) {
					// ロード後に実行したい関数を実行
					callback($(this));
				}
			});
		})
	}
}
// 表示しているデバイスがスマホかを判定
function isSp(){
	const innerWidth = $(window).innerWidth()
	if (640 < innerWidth) {
		// PC
	    return false;
	} else {
		// SP
	    return true;
	}
}