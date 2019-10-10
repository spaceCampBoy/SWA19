setTimeout (() => {
    console.log('Timeout')
}, 0)
setTimeout (() => {
    console.log('Timeout2')
}, 0)
console.log("Main")
for (let i = 0; i<10000000; i++){
    if(i===9999999)
    console.log("Later")
}