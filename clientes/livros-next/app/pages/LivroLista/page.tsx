'use client';

import React, { useState, useEffect } from 'react';
import ControleEditoras from '../../controle/ControleEditoras';
import ControleLivros from '../../controle/ControleLivros';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editora from '../../model/Editora';

const controleEditora = new ControleEditoras();
const controleLivro = new ControleLivros();

const LinhaLivro = ({ livro, obterNomeEditora, excluir }) => {
    return (
        <tr>
            <td>{livro.titulo}
                <dd>
                    <button onClick={() => excluir(livro.codigo)}
                        className="btn btn-danger btn-sm">Excluir</button>
                </dd>
            </td>
            <td>{livro.resumo}</td>
            <td>{obterNomeEditora(livro.codEditora)}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export default function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [carregado, setCarregado] = useState(false);

    const obterNomeEditora = (codEditora: number) => {
        const editoraEncontrada = editoras.find(e => e.codEditora === codEditora);
        return editoraEncontrada ? editoraEncontrada.nome : 'Desconhecida';
    };

    useEffect(() => {
        if (!carregado) {
            Promise.all([
                controleLivro.obterLivros(),
                controleEditora.obterEditoras()
            ])
                .then(([novosLivros, novasEditoras]) => {
                    setLivros(novosLivros);
                    setEditoras(novasEditoras); // Armazenar editoras no estado
                    setCarregado(true);
                })
                .catch(error =>
                    console.error("Erro ao carregar dados:", error));
        }
    }, [carregado]);

    const excluir = (codigoLivro: string) => {
        controleLivro.excluir(codigoLivro)
            .then(() => {
                setCarregado(false);
            })
            .catch(error => console.error("Erro ao excluir livro:", error));
    };

    return (
        <main className="container mt-4">
            <h1>Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th style={{ width: '20%' }}>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <LinhaLivro key={index}
                            livro={livro}
                            obterNomeEditora={obterNomeEditora}
                            excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}