const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao obter livros", erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const livro = req.body;
    await incluir(livro);
    res.json({ mensagem: "Livro incluído com sucesso" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao incluir livro", erro: err.message });
  }
});

router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const resultado = await excluir(codigo);
    
    if (resultado.deletedCount > 0) {
      res.json({ mensagem: "Livro excluído com sucesso", _id: codigo });
    } else {
      res.status(404).json({ mensagem: "Livro não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao excluir livro", erro: err.message });
  }
});

module.exports = router;