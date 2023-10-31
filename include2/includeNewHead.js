$(function() {
    var title = document.title;
    var description = $("meta[name='description']").attr('content');
    var url = location.href;

    $.get('/include2/newHead.html', function(res) {
        $('head').append(res);
        $("meta[property='og:title']").attr('content', title);
        $("meta[property='og:description']").attr('content', description);
        $("meta[property='og:url']").attr('content', url);
        $("link[rel='canonical']").attr('href', url);
    });

    $('body').delay(500).queue(function() {
        $(this).removeAttr('style');
    });
});