function overviewCsv(target, csv) {
    let id = target.replace('#', ''),
        http = new JKL.ParseXML.CSV(csv),
        csvdata = http.parse(),
        insert = '';

    $(csvdata).each(function(index) {
        //1行目は見出しのためthにセットする
        if (index === 0) {
            $(this).each(function(index) {
                //1列目はタイトルのためいらない
                if (index === 0) return true;
                if (this.length > 0) {
                    insert += '<tr><th>' + this + '</th><td id="td-' + index + id + '"></td></tr>';
                }
            });
            $(target + ' table tbody').append(insert);
            return true;
        }
        //2行目以降はtdにセットする
        if (this.length > 0) {
            $(this).each(function(i) {
                //csvの改行をbrに変更。HTMLタグの後はbrにしない
                let insertText = new String(this.replace(/>(\r\n|\n|\r)/gm, '>'));
                insertText = insertText.replace(/(\r\n|\n|\r)/gm, '<br />');
                //1列目はタイトルをセット
                if (i === 0) {
                    $(target + ' h3 p').html(insertText);
                    return true;
                }
                $('#td-' + i + id).html(insertText);
            });
        }
    });
}

// 概要読み込みを1行指定で読み込む
// 特別なカスタムをしたい場合は別途テンプレートファイルを用意してtplFilePathで指定する
function overviewCsvOneLine(target, csv, tplFilePath = "/campaign/include/overviewCsvTpl.html") {
    // #を除いた純粋な名称を取得
    const idName = target.replace('#', '')
        // ターゲットのエレメントを取得
    const targetElement = $('#' + idName);
    // ターゲットが存在すればテンプレートファイルを読み込む
    if (targetElement.length) {
        targetElement.load(tplFilePath, function() {
            // idを付与
            targetElement.children().attr('id', idName);
            // 親枠を削除
            targetElement.children().unwrap();
            // CSVの内容で概要を書き換える
            overviewCsv(target, csv);
        });
    }
}
// 概要読み込みを1行指定で読み込む(アコーディオン)
// 特別なカスタムをしたい場合は別途テンプレートファイルを用意してtplFilePathで指定する
function overviewCsvOneLineAc(target, csv, openFunc, tplFilePath = "/campaign/include/overviewCsvAcTpl.html") {
    // #を除いた純粋な名称を取得
    const idName = target.replace('#', '')
        // ターゲットのエレメントを取得
    const targetElement = $('#' + idName);
    // ターゲットが存在すればテンプレートファイルを読み込む
    if (targetElement.length) {
        targetElement.load(tplFilePath, function() {
            // idを付与
            targetElement.children().attr('id', idName);
            // 親枠を削除
            targetElement.children().unwrap();
            // 判別用のIDを追加
            $('#' + idName + ' h3').data('overview', idName)
                // アコーディオン開閉
            $('#' + idName + ' h3').on('click', function() {
                if (!$(this).hasClass('open')) {
                    // 開く場合
                    if (openFunc) {
                        // 関数を実行
                        openFunc();
                    }
                }
                // オープン
                $(this).next().slideToggle(100);
                $(this).toggleClass('open');
            });
            // CSVの内容で概要を書き換える
            overviewCsv(target, csv);
        });
    }
}