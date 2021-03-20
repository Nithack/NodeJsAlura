const customExpress = require("./config/customExpress")
const connectMysql = require("./infraestrutura/conexao")
const Tabelas = require("./infraestrutura/tabelas")

const app = customExpress()
connectMysql.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('connect MySQL server')
        Tabelas.init(connectMysql)
        app.listen(3000,()=>console.log('Servidor rodando na porta 3000'))
    }
})



