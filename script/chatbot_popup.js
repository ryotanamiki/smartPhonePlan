$(function() {

    $.getScript("/script/util.js", function() {

        var data = {
            url: encodeURI(location.href)
        };
        getChatBotPopupToken(data, function(res) {

            // チャットボットscriptタグ埋め込み
            var bot = document.createElement("script");
            bot.src = res.popupSrc;
            bot.dataset.customerIijToken = res.token;
            document.body.appendChild(bot);

            // 個人情報取り扱いページ scriptタグ埋め込み
            var privacyPopup = document.createElement("script");
            privacyPopup.src = res.privacyPolicySrc;
            privacyPopup.dataset.privacyPolicyUrl = res.privacyPolicyPage;
            document.body.appendChild(privacyPopup);
        });
    });

});