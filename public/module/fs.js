//引用模块
const fs = require('fs')
const path = require('path')

const dirCache = {}

function mkdir(a) {
    let filepath = path.join(__dirname,a)
    const arr = filepath.split('\\') //使用\\进行分割是因为使用__dir获得的路径是用\分割的，加两个是为了转义
    let dir = arr[0]
    console.log(arr)
    for(let i = 1;i<arr.length+1;i++){ //加一是因为路径中存在磁盘名字C、D、E这些东西
        if(!dirCache[dir] && !fs.existsSync(dir)){
            dirCache[dir] = true
            fs.mkdirSync(dir)
        }
        dir = dir + '/'+ arr[i]
    }
}
// mkdir('../users/app/haha')
module.exports = mkdir
