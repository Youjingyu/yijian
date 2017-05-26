// if(!isWeiXin()){
//     getEle('main').setAttribute('style', 'display: block');
// } else {
//     getEle('error_info').setAttribute('style', 'display: block');
// }
getEle('main').setAttribute('style', 'display: block');
var scale = document.body.clientWidth / 1565;
document.getElementsByTagName('body')[0].setAttribute('style', 'height:' + (scale * 3202)  + 'px');
var Reg = {
    tel: /^1(3|4|5|7|8)\d{9}$/
}
var Dom = {
    tel_input: getEle('tel_input'),
    valid_num: getEle('valid_num'),
    valid_num_btn: getEle('valid_num_btn'),
    submit_btn: getEle('submit_btn'),
    modal_getted: getEle('modal_getted'),
    close_getted: getEle('close_getted'),
    modal_suc: getEle('modal_suc'),
    close_suc: getEle('close_suc'),
    modal_over: getEle('modal_over'),
    close_over: getEle('close_over'),
    modal_loading: getEle('modal_loading')
}
addTouchEvent(Dom.valid_num_btn, function () {
    if(!(Reg.tel.test(Dom.tel_input.value))){
        alert("手机号码有误，请重填");
        return false;
    }
    var btn = Dom.valid_num_btn;
    btn.setAttribute("disabled", true);
    btn.setAttribute("style", 'background: none;background-color: grey;border-color: grey');
    timeDown(btn, 60);
    function timeDown(obj, wait) {
        if (wait == 0) {
            obj.removeAttribute("disabled");
            obj.setAttribute("style", '');
            obj.innerText = '';
        } else {
            obj.innerText = wait + "秒";
            wait--;
            setTimeout(function () {
                timeDown(obj, wait)
            }, 1000)
        }
    }
});
addTouchEvent(Dom.submit_btn, function () {
    // Dom.modal_loading.setAttribute('style', 'display: block');
    var tel = Dom.tel_input.value;
    // if(!(Reg.tel.test(tel))){
    //     alert("手机号码有误，请重填");
    //     return false;
    // }
    // http.post('http://192.168.0.230/eleme/users/add', tel, function (data) {
    //     if(data.code == 0){
    //
    //     }
    //     console.log(data);
    //     // Dom.modal_getted.setAttribute('style', 'display: block')
    //     Dom.modal_suc.setAttribute('style', 'display: block');
    //     // Dom.modal_over.setAttribute('style', 'display: block');
    // });
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

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function getEle(id) {
    return document.getElementById(id);
}
function addTouchEvent(dom, callback) {
    dom.addEventListener('touchstart', callback);
}
(function(owner){
    owner.post = function(url, data, success){
        var xhr;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        }else{
            // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(xhr.responseText);
                }
            }
        }
        xhr.send('mobile=' + data);
    }
}(window.http = {}));