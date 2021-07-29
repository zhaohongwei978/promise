const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class Promise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value)=>{
            if(this.status === PENDING){
                this.value = value;
                this.status = FULFILLED;
                this.onFulfilledCallbacks.forEach((fn)=>{fn()});
            }
            
        }
        const reject = (reason)=>{
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach((fn)=>{fn()});
            }
        }
        try{
            executor(resolve,reject);
        }catch(e){
            //handle里throw err场景
            reject(e);
        }
       
    }
    then(onFulfilled,onRejected){
        console.log(this.status)
        if(this.status === FULFILLED){
            onFulfilled(this.value);
        }
        if(this.status === REJECTED){
            onRejected(this.reason)
        }
        if(this.status === PENDING){
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            })
            this.onFulfilledCallbacks.push(()=>{
                onFulfilled(this.value);
            })
            console.log('--- this.onRejectedCallbacks', this.onRejectedCallbacks)
        }
    }

}
module.exports = Promise