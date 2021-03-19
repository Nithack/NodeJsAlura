const customExpress = require("./config/customExpress")
const connectMysql = require("./infraestrutura/conexao")

const app = customExpress()
connectMysql.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('connect MySQL server')
        app.listen(3004,()=>console.log('Servidor rodando na porta 3000'))
    }
})



