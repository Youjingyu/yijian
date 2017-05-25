document.getElementsByTagName('body')[0].setAttribute('style', 'height:' + document.body.clientHeight + 'px');
var Dom = {
    submit_btn: getEle('submit_btn'),
    modal_getted: getEle('modal_getted'),
    close_getted: getEle('close_getted'),
    modal_suc: getEle('modal_suc'),
    close_suc: getEle('close_suc'),
    modal_over: getEle('modal_over'),
    close_over: getEle('close_over')
}
addTouchEvent(Dom.submit_btn, function () {
    // Dom.modal_getted.setAttribute('style', 'display: block')
    Dom.modal_suc.setAttribute('style', 'display: block');
    // Dom.modal_over.setAttribute('style', 'display: block');
});
addTouchEvent(Dom.close_getted, function () {
    Dom.modal_getted.setAttribute('style', '')
});
addTouchEvent(Dom.close_suc, function () {
    Dom.modal_suc.setAttribute('style', '')
});
addTouchEvent(Dom.close_over, function () {
    Dom.modal_over.setAttribute('style', '')
});

function getEle(id) {
    return document.getElementById(id);
}
function addTouchEvent(dom, callback) {
    dom.addEventListener('touchstart', callback);
}