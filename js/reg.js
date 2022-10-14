const oPwd = document.querySelector('[id=txtLoginPwd]');
let txtLoginId = new FieldValidator('txtLoginId',async function(value){
    if(!value){
        return "请输入您的用户名:由英文和数字组成!"
    }
    const result = await exists(value);
    if(result.data){
        return "您的用户名已被注册!"
    }
})
let txtNickname = new FieldValidator('txtNickname',function (value){
    if(!value){
        return "请输入您的真实姓名!"
    }
})
let txtLoginPwd = new FieldValidator('txtLoginPwd',function(value){
    if(!value){
        return "请输入您的密码!"
    }
})

let txtLoginPwdConfirm = new FieldValidator('txtLoginPwdConfirm',function(value){
    if(!value){
        return "请确认您的密码"
    }
    if(txtLoginPwd.input.value !== value){
        return "两次输入的密码不一样"

    }
})
const oform = document.querySelector('.user-form');
oPwd.addEventListener('focus',function(){
    txtLoginPwdConfirm.input.value = '';
    txtLoginPwdConfirm.p.innerText = '';
})
oform.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.allver(txtLoginId,txtNickname,txtLoginPwd,txtLoginPwdConfirm);
    if(!result){
        return;
    }
    const formData = new FormData(oform); // 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());
    const resp = await reg(data);
    console.log(resp);
    if(resp.code === 0){
        alert("注册成功,点击确定,跳转页面");
        location.href = './longin.html';
    }
}