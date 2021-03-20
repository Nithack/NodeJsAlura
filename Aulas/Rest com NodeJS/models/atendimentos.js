const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}

        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultado)=>{
            if(erro){
                res.json(erro)
            }else{
                res.json(resultado)
            }
        })
    }
}

module.exports = new Atendimento