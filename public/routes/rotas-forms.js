var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '../public/index.html'); // Serve a página index.html
});

router.get('/processar-form-get-aluno', (req, res) => {
    var nome = req.query.nome;
    var numero = req.query.numero;
    var morada = req.query.morada || 'não definida';

    console.log(`Nome: ${nome}, Número: ${numero}, Morada: ${morada}`)
    res.send(`Nome: ${nome}, Número: ${numero}, Morada: ${morada}`);
});

// Rota para processar os dados do formulário POST
router.post('/processar-form-post-aluno', (req, res) => {
    var nome = req.body.nome;
    var numero = req.body.numero;
    var morada = req.body.morada || 'não definida';
    console.log(`Nome: ${nome}, Número: ${numero}, Morada: ${morada}`)
    res.send(`Nome: ${nome}, Número: ${numero}, Morada: ${morada}`);
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/erro.html')); // Correct the path to the public folder
});

module.exports = router;