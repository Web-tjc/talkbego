let txtLoginId = new FieldValidator('txtLoginId',function(value){
    if(!value){
        return "请输入您的账号";
    }
})
let txtLoginPwd = new FieldValidator('txtLoginPwd',function(value){
    if(!value){
        return "请输入您的密码";
    }
})
const oform = document.querySelector('.user-form');
oform.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.allver(txtLoginId,txtLoginPwd);
    if(!result){
        return;
    }

    const formData = new FormData(oform);
    const data = Object.fromEntries(formData.entries());
    const resp = await login(data);

    if(resp.code === 0){
        alert('登录成功，点击确定，跳转到首页');
        location.href = './index.html';
    }else{
        
    }
}