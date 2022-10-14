(async function(){
    doms = {
        ocontiner:document.querySelector('.chat-container'),
        osend:document.querySelector('#txtMsg'),
        onickname:document.querySelector('#nickname'),
        ouserid:document.querySelector('#loginId'),
        oinput:document.querySelector('#txtMsg'),
        oform:document.querySelector('.msg-container'),
        oclose:document.querySelector('.close')
    }
    const resp = await profile();
    if(!resp.data){
        alert('您还未登录 请先登录您的账户');
        location.href = './longin.html';
        return
    }
    doms.onickname.innerText = resp.data.nickname;
    doms.ouserid.innerText = resp.data.loginId;
    const adata = await getHistory();
    for(const data of adata.data){
        getdata(data)
    }
    getScroll();
    doms.oform.onsubmit = function(e){
        e.preventDefault();
        sendMessage();
        getScroll();
    }
    doms.oclose.onclick = function(){
        loginOut();
        location.href = './login.html';
    }
    function format(datatime){
        const date = new Date(datatime);
        const year = date.getFullYear();
        // getMonth()函数是从0开始算的 所以要加一
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        // .toString().padStart(2, '0')这个方法是满足两位数吗 不满足的话 在前面加上一个0
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
    
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    function getdata(adata){
        const odiv = document.createElement('div');
        odiv.classList.add('chat-item');
        if(adata.from){
            odiv.classList.add('me');
        }
        const oimg = document.createElement('img');
        oimg.classList.add('chat-avatar');
        oimg.src = adata.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const ocon = document.createElement('div');
        ocon.classList.add('chat-content');
        ocon.innerText = adata.content;

        const otime = document.createElement('div');
        otime.classList.add('chat-date');
        otime.innerText = format(adata.createdAt);

        odiv.appendChild(oimg);
        odiv.appendChild(ocon);
        odiv.appendChild(otime);
        
        doms.ocontiner.appendChild(odiv);
    }
    function getScroll(){
        doms.ocontiner.scrollTop = doms.ocontiner.scrollHeight;
    }
    async function sendMessage(){
        const content = doms.oinput.value.trim();
        if(!content){
            return;
        }
        getdata({
            from:doms.ouserid.innerText,
            to:null,
            createdAt: Date.now(),
            content,
        })
        doms.oinput.value = '';
        const message = await sendChat({content});
        getdata({
            from:null,
            to:doms.ouserid.innerText,
            ...message.data
        })
        getScroll();
    }
})()