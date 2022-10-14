class FieldValidator{
    constructor(textId,callbackFun){
        this.input = document.querySelector('#'+textId);
        this.p = this.input.nextElementSibling;
        this.callbackFun = callbackFun;
        this.input.onblur = ()=>{
            this.visitied();
        }
    }
    // visitied这个方法是在原型上的
    async visitied(){
        const err = await this.callbackFun(this.input.value);
        if(err){
            this.p.innerText = err;
            return false;
        }else{
            this.p.innerText = '';
            return true;
        }
    }
    static async allver(...validators){
        // proms得到的是三个promise 都是fulfilled状态 但是里面返回的东西可能不一样
        const proms = await validators.map((v) => v.visitied());
        // results 得到的是一个promise数组 但是要求三个promise都是fulfilled状态 才能算成功 并获取里面的成功结果 返回一个数组
        const results = await Promise.all(proms);
        return results.every((r) => r);
    }
}

