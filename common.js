if(isWeiXin()){
    getEle('main').setAttribute('style', 'display: block');
} else {
    getEle('error_info').setAttribute('style', 'display: block');
}

var scale = document.body.clientWidth / 1565;
document.getElementsByTagName('body')[0].setAttribute('style', 'height:' + (scale * 3202)  + 'px');
var clientHeight = document.body.clientHeight;
[].forEach.call(document.getElementsByClassName('modal-front'), function (ele) {
    ele.setAttribute('style', 'height:' + clientHeight  + 'px');
})

var BaseUrl = 'http://192.168.0.99:8080/act-weixin/';
// var BaseUrl = 'http://192.168.0.182/eleme/';

var Reg = {
    tel: /^1(3|4|5|7|8)\d{9}$/,
    valid_num: /^\d{4}$/,
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
    modal_suc_title: getEle('modal_suc_title'),
    modal_over: getEle('modal_over'),
    close_over: getEle('close_over'),
    modal_error: getEle('modal_error'),
    close_error: getEle('close_error'),
    modal_loading: getEle('modal_loading')
}
// var isTelCorrect = false;
// Dom.tel_input.addEventListener('input', function () {
//     if(Reg.tel.test(Dom.tel_input.value)){
//         isTelCorrect = true;
//     } else {
//         isTelCorrect = false;
//     }
// });
addTouchEvent(Dom.valid_num_btn, function () {
    var btn = Dom.valid_num_btn;
    if(btn.getAttribute('style')){
        return false;
    }
    var mobile = Dom.tel_input.value;
    if(!(Reg.tel.test(mobile))){
        alert("手机号码有误，请重新填写");
        return false;
    }

    btn.setAttribute("disabled", true);
    btn.setAttribute("style", 'background: 0 0;background-color: #ddd;border-color: #ddd');
    timeDown(btn, 60, mobile);
    var timeDownFlag = true;
    http.post(BaseUrl + 'send', {'mobile': mobile, 'type': 'login'}, function (data) {
        if(data.code == 40000){
            timeDownFlag = false;
            showModal(Dom.modal_getted);
        }
    });

    function timeDown(obj, wait, mobile) {
        // 倒计时结束、后台返回已经领取优惠券、电话号码被用户修改，都重置获取验证码按钮
        if (wait == 0 || timeDownFlag == false || !Reg.tel.test(Dom.tel_input.value) || Dom.tel_input.value != mobile) {
            obj.removeAttribute("disabled");
            obj.setAttribute("style", '');
            obj.innerText = '';
        } else {
            obj.innerText = wait + " 秒";
            wait--;
            var tel = Dom.tel_input.value;
            setTimeout(function () {
                timeDown(obj, wait, tel)
            }, 1000)
        }
    }
});

addTouchEvent(Dom.submit_btn, function () {
    var tel = Dom.tel_input.value, checkCode = Dom.valid_num.value;
    if(!(Reg.tel.test(tel))){
        alert("手机号码有误，请重新填写");
        return false;
    }
    if(!(Reg.valid_num.test(checkCode))){
        alert("请输入正确的验证码");
        return false;
    }
    showModal(Dom.modal_loading);
    http.post(BaseUrl + 'login', {'userName': tel, 'checkCode': checkCode}, function (data) {
        hideModal(Dom.modal_loading);
        var header = data.header;
        if(header && header.errorcode){
            if(header.errorcode == 4008){
                alert('请获取验证码');
            } else if(header.errorcode == 4006){
                alert('短信验证码错误');
            }
        } else {
            if(data.code == 40000){
                showModal(Dom.modal_getted);
            } else if(data.code == 50000){
                showModal(Dom.modal_over);
            } else if(data.code == 0){
                Dom.modal_suc_title.setAttribute('class', 'modal-suc-title modal-suc-title-' + parseInt(data.data));
                showModal(Dom.modal_suc);
            } else {
                showModal(Dom.modal_error);
            }
        }
    });
});
addTouchEvent(Dom.close_getted, function () {
    hideModal(Dom.modal_getted);
});
addTouchEvent(Dom.close_suc, function () {
    hideModal(Dom.modal_suc);
});
addTouchEvent(Dom.close_over, function () {
    hideModal(Dom.modal_over);
});
addTouchEvent(Dom.close_error, function () {
    hideModal(Dom.modal_error);
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
function showModal(dom) {
    var modal = ['modal_getted', 'modal_suc', 'modal_over', 'modal_error', 'modal_loading'];
    modal.forEach(function (val) {
        Dom[val].setAttribute('style', '');
    });
    dom.setAttribute('style', 'display: block');
}
function hideModal(dom) {
    dom.setAttribute('style', '');
}
(function(owner){
    owner.concatData = function (data) {
        var result = [];
        for(var i in data){
            result.push(i + '=' + data[i]);
        }
        return result.join('&');
    }
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
                    success && success(JSON.parse(xhr.responseText));
                }
            }
        }
        xhr.send(owner.concatData(data));
    }
}(window.http = {}));