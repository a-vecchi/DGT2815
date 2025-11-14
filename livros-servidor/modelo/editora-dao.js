const Editora = require('./editora-schema');

const obterEditoras = async () => {
  return await Editora.find({});
};

const incluir = async (livro) => {
  return await Editora.create(livro);
};

const excluir = async (codigo) => {
  return await Editora.deleteOne({ _id: codigo });
};

module.exports = {
  obterEditoras,
  incluir,
  excluir
};