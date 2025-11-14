const { obterEditoras, incluir, excluir } = require('../modelo/editora-dao');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const editoras = await obterEditoras();
    res.json(editoras);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao obter editoras", erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const editora = req.body;
    await incluir(editora);
    res.json({ mensagem: "Editora incluído com sucesso" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao incluir Editora", erro: err.message });
  }
});

router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const resultado = await excluir(codigo);
    
    if (resultado.deletedCount > 0) {
      res.json({ mensagem: "Editora excluído com sucesso", _id: codigo });
    } else {
      res.status(404).json({ mensagem: "Editora não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao excluir editora", erro: err.message });
  }
});

module.exports = router;