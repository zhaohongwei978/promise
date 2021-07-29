

//1 解决 只有padding才能改变状态的问题
//2 解决 移步改变状态.then不执行的问题 （思路发布订阅模式，把成功和失败的会调函数都存起来，等状态改变之后在批量执行）
let Promise = require('./src/core/promise')
let promise = new Promise((resolve,reject)=>{
    
    // resolve('promise resolve')
    // throw new Error('11111')
    setTimeout(function(){
        reject('promise error')
        resolve('promise error')
    })
})

promise.then((val)=>{
    console.log(val)
},(error)=>{
    console.log(error)
})