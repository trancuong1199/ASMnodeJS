var getEmail = document.querySelector('#sign-in-email');
var getPassword = document.querySelector('.sign-in-password');
var getBtn = document.querySelector('.sign-in-btn');
var message = document.querySelector('.message');
var mes_password = document.querySelector('.message-password');
var res_email = document.querySelector('.res-email');
var res_password = document.querySelector('.res-password');
var confirm = document.querySelector('.confirm-password');
var res_btn = document.querySelector('.create-btn');
var res_check = document.querySelector('.register-check-btn');

var message_register_email = document.querySelector('.message-email-register');
var message_register_password = document.querySelector('.message-password-register');
var message_register_confirm = document.querySelector('.message-confirm-register');
var message_check = document.querySelector('.message-check');

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkData() {
    if (getEmail.value.trim() == '' && getPassword.value.trim() == '') {
        message.innerHTML = 'Vui lòng nhập trường này!';
        mes_password.innerHTML = 'Vui lòng nhập trường này!';
    } else if (getEmail.value.trim() == '') {
        message.innerHTML = 'Vui lòng nhập trường này!';
    } else if (!res_email.value.match(mailformat)) {
        message.innerHTML = 'Vui lòng nhập đúng email!';
    } else if (getPassword.value.trim() == '') {
        mes_password.innerHTML = 'Vui lòng nhập trường này!';
    } else {
        alert('Đăng nhập thành công!');
    }
}


function checkRegister() {
    if (res_email.value.trim() == '' && res_password.value.trim() == '' && confirm.value.trim() == '') {
        message_register_email.innerHTML = 'Vui lòng nhập trường này!';
        message_register_password.innerHTML = 'Vui lòng nhập trường này!';
        message_register_confirm.innerHTML = 'Vui lòng nhập trường này!';
    } else if (!res_email.value.match(mailformat)) {
        message_register_email.innerHTML = 'Vui lòng nhập đúng Email!';
    } else if (confirm.value.trim() == '' && res_password.value.trim() == '') {
        message_register_confirm.innerHTML = 'Vui lòng nhập trường này!';
        message_register_password.innerHTML = 'Vui lòng nhập trường này!';
    } else if (res_email.value.trim() == '') {
        message_register_email.innerHTML = 'Vui lòng nhập trường này!';
    } else if (res_password.value.trim() == '') {
        message_register_password.innerHTML = 'Vui lòng nhập trường này!';
    } else if (confirm.value.trim() == '') {
        message_register_confirm.innerHTML = 'Vui lòng nhập trường này!';
    } else if (!res_check.checked) {
        message_check.innerHTML = 'Vui lòng tích vào ô!'
    } else {
        alert('Đăng kí thành công!');
    }
}