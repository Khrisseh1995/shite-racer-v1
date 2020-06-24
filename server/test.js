let obj = {"chris": {'readyState' : true}, "Stephen" : {'readyState': true}}

let y =  Object.entries(obj).filter(x => !x[1].readyState);

console.log(y);