let mysql = require('mysql')

let options = {
    host:"localhost",
    //port:"3306",//可选，默认式3306
    user:"root",
    password:"123456",
    database:"hospitalms"
}
let con = mysql.createConnection(options)
con.connect(err => {
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
    }
})


function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
           
        })
    })
}

module.exports = sqlQuery
