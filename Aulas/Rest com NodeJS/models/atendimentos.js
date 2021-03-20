const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        //constantes que mantem a logia da validação, se o objeto fo valido retorna true
        const dataEhValida =  moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        //array que terá todas as validacoes contendo os parâmetros (nome / valido / mensagem) 
        const validacoes = [
            {
                 nome:'data',
                 valido: dataEhValida,
                 mensagem: 'Data deve ser maior ou igual a data de criação'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        //validacoes chama o método filter que salva na constate erros apenas os campos que o campo valido for diferente de true
        const erros = validacoes.filter(campo => !campo.valido)

        //se length de erros for maior que 0 sera então true
        const existemErros = erros.length

        //caso true então ouve erro, então retornamos os erros no res.json
        if(existemErros){
            res.status(400).json(erros)
        }else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultado)
                }
            })
        }

        
    }
}

module.exports = new Atendimento