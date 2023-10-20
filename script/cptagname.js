function getCptagname() {
  const data = $.ajax({
    // 読み込みの設定
    type: "GET",
    url: "/json/cptagname.json",
    dataType: "json",
    async: false, // 非同期通信フラグ
    cache: false,
    timeout: 2000
  })
  if(data && data.responseJSON){
    return data.responseJSON
  }else{
    return []
  }
}
$(document).ready(function () {
  let cpNameLists = getCptagname()
  // IE用ポリフィル
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function (predicate) {
        if (this == null) {
          throw TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (typeof predicate !== "function") {
          throw TypeError("predicate must be a function");
        }
        var thisArg = arguments[1];
        var k = 0;

        while (k < len) {
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          k++;
        }
        return undefined;
      },
      configurable: true,
      writable: true,
    });
  }

  // cp-tagタグを抽出して配列にする
  let cpTagElements = document.getElementsByTagName("cp-tag");
  cpTagElements = [].slice.call(cpTagElements);

  // 取ってきた配列にcp-name属性があるかチェック。なければ非表示
  cpTagElements.forEach(function (cpTagElement) {
    let cpName = cpTagElement.getAttribute("cp-name");
    if (!cpName) {
      cpTagElement.style.display = "none";
    }
    // cpNameの値が上のcpNameListsにあるか検索。あればstartとendの値をセット。なければ非表示
    let target = cpNameLists.find(function (cpNameObj) {
      return cpName === cpNameObj.name;
    });
    if (target) {
      cpTagElement.setAttribute("start", target.start);
      cpTagElement.setAttribute("end", target.end);
    } else {
      cpTagElement.style.display = "none";
    }
  });
});