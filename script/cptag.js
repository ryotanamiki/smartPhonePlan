$(document).ready(function () {
  $('.Period').hide;
  $('.notPeriod').hide;

  //サーバーから日付を取得
  var request = new XMLHttpRequest();
  request.open('HEAD', window.location.href, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var today = new Date(request.getResponseHeader('Date'));
      //console.log(today);
      cptag(today);
    }
  }
});

function cptag(today) {
  var start = new Date;
  var end = new Date;
  var action;
  var removeFlg;

  //期間中に表示
  var period_element = document.getElementsByClassName("Period");
  for (var i = 0; i < period_element.length; i++) {
    start = toDate(period_element[i].getAttribute("start"));
    end = toDate(period_element[i].getAttribute("end"));

    if (start < today && today < end) {
      period_element[i].style.display = "block";
      action = period_element[i].getAttribute("action");
      if (action != null) {
        PeriodAction();
      }
    } else {
      removeFlg = period_element[i].getAttribute("remove");
      if (removeFlg != null) {
        while (period_element[i].firstChild) {
            period_element[i].removeChild(period_element[i].firstChild);
        }
      } else {
        period_element[i].style.display = "none";
      }
    }
  }

  //終了後に表示
  var notperiod_element = document.getElementsByClassName("notPeriod");
  for (var i = 0; i < notperiod_element.length; i++) {
    end = toDate(notperiod_element[i].getAttribute("end"));
    if (today > end) {
      notperiod_element[i].style.display = "block";
      action = notperiod_element[i].getAttribute("action");
      if (action != null) {
         notPeriodAction();
      }
    } else {
      removeFlg = notperiod_element[i].getAttribute("remove");
      if (removeFlg != null) {
        while (notperiod_element[i].firstChild) {
            notperiod_element[i].removeChild(notperiod_element[i].firstChild);
        }
      } else {
        notperiod_element[i].style.display = "none";
      }
    }
  }

  //日付に変換
  function toDate(str) {
    if (!str) {
      return;
    }
    var year = str.substr(0, 4);
    var month = str.substr(4, 2);
    var day = str.substr(6, 2);
    return new Date(year, month - 1, day);
  };


}
