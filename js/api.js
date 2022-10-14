const BASE_URL = 'https://study.duyiedu.com';
const TOKEN_KEY = 'token';
function get(path){
    const headers = {};
    // 从浏览器里面获取登录成功时服务器给我们的令牌
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        // 如果有这个令牌直接加到hearders里面
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path,{
        headers
    })
}
function post(path,objbody){
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL+path,{
        method: 'post',
        headers,
        body:JSON.stringify(objbody)
    })
}
async function reg(loginInfo){
    const rest = await post('/api/user/reg',loginInfo);
    return await rest.json();
}
async function login(loginInfo){
    const rest = await post('/api/user/login',loginInfo);
    const result = await rest.json();
    if(result.code === 0){
        const token = rest.headers.get('authorization');
        localStorage.setItem(TOKEN_KEY,token);
    }
    return result;
}
async function exists(loginId){
    const resp = await get('/api/user/exists?loginId=' + loginId);
    return await resp.json()
}
async function profile(){
    const resp = await get('/api/user/profile');
    return await resp.json();
}
async function sendChat(content){
    const resp = await post('/api/chat',content);
    return await resp.json();
}
async function getHistory(){
    const resp = await get('/api/chat/history');
    return await resp.json();
}
function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }