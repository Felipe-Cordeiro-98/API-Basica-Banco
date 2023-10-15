const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta, depositoBancario, saqueBancario, transferenciaBancaria, saldoBancario, extratoBancario } = require('./controladores/conta_bancaria');
const validarSenha = require('./middlewares');

const rotas = express();

rotas.get('/contas', validarSenha, listarContasBancarias);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositoBancario);
rotas.post('/transacoes/sacar', saqueBancario);
rotas.post('/transacoes/transferir', transferenciaBancaria);
rotas.get('/contas/saldo', saldoBancario);
rotas.get('/contas/extrato', extratoBancario);

module.exports = rotas;