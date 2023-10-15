const { contas, depositos, saques, transferencias } = require('../bancodedados');

let idConta = 1;

const listarContasBancarias = (req, res) => { return res.json(contas) };

const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    
    if (!nome) { return res.status(400).json({ mensagem: "O nome deve ser informado." }) };
    if (!cpf) { return res.status(400).json({ mensagem: "O CPF deve ser informado." }) };
    if (!data_nascimento) { return res.status(400).json({ mensagem: "A data de nascimento deve ser informada." }) };
    if (!telefone) { return res.status(400).json({ mensagem: "O telefone deve ser informado." }) };
    if (!email) { return res.status(400).json({ mensagem: "O e-mail deve ser informado." }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada." }) };
    
    const verificarCpf_Email = contas.find((dadosUsuario) => {
        return Number(dadosUsuario.usuario.cpf) === Number(cpf) || String(dadosUsuario.usuario.email) === String(email)
    });

    if (verificarCpf_Email) { return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" }) };

    const novaConta = {
        numero: idConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    contas.push(novaConta);

    idConta++

    return res.status(201).json();
};

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    if (!nome) { return res.status(400).json({ mensagem: "O nome deve ser informado." }) };
    if (!cpf) { return res.status(400).json({ mensagem: "O CPF deve ser informado." }) };
    if (!data_nascimento) { return res.status(400).json({ mensagem: "A data de nascimento deve ser informada." }) };
    if (!telefone) { return res.status(400).json({ mensagem: "O telefone deve ser informado." }) };
    if (!email) { return res.status(400).json({ mensagem: "O e-mail deve ser informado." }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada." }) };

    const verificarNumConta = contas.find(numConta => Number(numConta.numero) === Number(numeroConta));

    if (!verificarNumConta) { return res.status(404).json({ mensagem: "Número da conta inválido." }) };

    const verificarCpf = contas.find(dadosUsuario => Number(dadosUsuario.usuario.cpf) === Number(cpf));

    if (verificarCpf) { return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" }) };

    const verificarEmail = contas.find(dadosUsuario => String(dadosUsuario.usuario.email) === String(email));

    if (verificarEmail) { return res.status(400).json({ mensagem: "O e-mail informado já existe cadastrado!" }) };

    verificarNumConta.usuario.nome = nome;
    verificarNumConta.usuario.cpf = cpf;
    verificarNumConta.usuario.data_nascimento = data_nascimento;
    verificarNumConta.usuario.telefone = telefone;
    verificarNumConta.usuario.email = email;
    verificarNumConta.usuario.senha = senha;

    return res.status(204).json();
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const verificarNumConta = contas.find(NumConta => Number(NumConta.numero) === Number(numeroConta));

    if (!verificarNumConta) { return res.status(404).json({ mensagem: "Número da conta inválido." }) };
    if (verificarNumConta.saldo > 0) { return res.json({ mensagem: "A conta só pode ser removida se o saldo for zero!" }) };

    const indiceDaConta = contas.findIndex(indice => Number(indice.numero) === Number(numeroConta));

    contas.splice(indiceDaConta, 1);

    return res.status(204).json();
};

const depositoBancario = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" }) };
    if (!valor || valor <= 0) { return res.status(400).json({ mensagem: "Valor do depósito inválido." }) };

    const verificarConta = contas.find(NumConta => Number(NumConta.numero) === Number(numero_conta));

    if (!verificarConta) { return res.status(404).json({ mensagem: "Número da conta inválido." }) };

    verificarConta.saldo += valor;

    const dadosDoDeposito = {
        data: "2021-08-10 23:40:35",
        numero_conta,
        valor
    };

    depositos.push(dadosDoDeposito);

    return res.json();
};

const saqueBancario = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" }) };
    if (!valor) { return res.status(400).json({ mensagem: "Valor do saque inválido." })};
    if (valor <= 0) { return res.status(400).json({ mensagem: "O valor não pode ser menor que zero!" }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada." }) };

    const verificarConta = contas.find(numConta => Number(numConta.numero) === Number(numero_conta));

    if (!verificarConta) { return res.status(404).json({ mensagem: "Número da conta inválido." }) };
    if (verificarConta.usuario.senha !== senha) { return res.status(404).json({ mensagem: "Senha inválida." }) };
    if (verificarConta.saldo < valor) { return res.status(400).json({ mensagem: "Saldo insuficiente." }) };

    verificarConta.saldo -= valor;

    const dadosDoSaque = {
        data: "2021-08-10 23:40:35",
        numero_conta,
        valor
    };

    saques.push(dadosDoSaque);

    return res.status(204).json();
};

const transferenciaBancaria = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) { return res.status(400).json({ mensagem: "O número da conta de origem deve ser informado." }) };
    if (!numero_conta_destino) { return res.status(400).json({ mensagem: "O número da conta de destino deve ser informado." }) };
    if (!valor || valor <= 0) { return res.status(400).json({ mensagem: "O valor informado deve ser maior que zero" }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada" }) };

    const verificarContaOrigem = contas.find(contaOrigem => Number(contaOrigem.numero) === Number(numero_conta_origem));

    if (!verificarContaOrigem) { return res.status(404).json({ mensagem: "Conta de origem não existe." }) };

    const verificarContaDestino = contas.find(contaDestino => Number(contaDestino.numero) === Number(numero_conta_destino));

    if (!verificarContaDestino) { return res.status(404).json({ mensagem: "Conta de destino não existe." }) };
    if (verificarContaOrigem === verificarContaDestino) { return res.status(400).json({ mensagem: "A conta de destino não pode ser igual a conta de origem." }) };

    if (verificarContaOrigem.usuario.senha !== String(senha)) { return res.status(400).json({ mensagem: "Senha inválida." }) };
    if (verificarContaOrigem.saldo < valor) { return res.status(400).json({ mensagem: "Saldo insuficiente!" }) };

    verificarContaOrigem.saldo -= valor;
    verificarContaDestino.saldo += valor;

    const transferencia = {
        data: "2021-08-18 20:47:10",
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    transferencias.push(transferencia);

    return res.status(204).json();
};

const saldoBancario = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O número da conta ser informado." }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada" }) };

    const verificarConta = contas.find(NumConta => Number(NumConta.numero) === Number(numero_conta));

    if (!verificarConta) { return res.status(404).json({ mensagem: "Conta bancária não encontrada!." }) };
    if (verificarConta.usuario.senha !== String(senha)) { return res.status(404).json({ mensagem: "Senha inválida." }) };

    const saldo = { "Saldo": verificarConta.saldo };

    return res.json(saldo);
};

const extratoBancario = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O número da conta ser informado." }) };
    if (!senha) { return res.status(400).json({ mensagem: "A senha deve ser informada" }) };

    const verificarConta = contas.find(NumConta => Number(NumConta.numero) === Number(numero_conta));

    if (!verificarConta) { return res.status(404).json({ mensagem: "Conta bancária não encontrada!." }) };
    if (String(verificarConta.usuario.senha) !== String(senha)) { return res.status(404).json({ mensagem: "Senha inválida." }) };

    const verificarDepositos = depositos.filter(numeroConta => Number(numeroConta.numero_conta) === Number(numero_conta));
    const verificarSaques = saques.filter(numeroConta => Number(numeroConta.numero_conta) === Number(numero_conta));
    const verificarTransfEnviada = transferencias.filter(numeroConta => Number(numeroConta.numero_conta_origem) === Number(numero_conta));
    const verificarTransfRecebida = transferencias.filter(numeroConta => Number(numeroConta.numero_conta_destino) === Number(numero_conta));

    const extratoDaConta = {
        depositos: verificarDepositos,
        saques: verificarSaques,
        transferenciasEnviadas: verificarTransfEnviada,
        transferenciasRecebidas: verificarTransfRecebida
    };

    return res.json(extratoDaConta);
};


module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarUsuario,
    excluirConta,
    depositoBancario,
    saqueBancario,
    transferenciaBancaria,
    saldoBancario,
    extratoBancario
};