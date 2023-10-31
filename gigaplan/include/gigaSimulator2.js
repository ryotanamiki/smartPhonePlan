$(function () {
    let target = $('#giga_simulator');
    let file = '/gigaSimulator2.html';
    let modifydate = '20190331';

    target.load(file + '?' + modifydate, function () {
        target.children().unwrap();
    });
});