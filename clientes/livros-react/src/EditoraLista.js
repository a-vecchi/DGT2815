import React, { useState, useEffect } from 'react';
import ControleEditoras from './controle/ControleEditoras';
import 'bootstrap/dist/css/bootstrap.min.css';

const controleEditora = new ControleEditoras();

export default function EditoraLista() {
    const [editoras, setEditoras] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        controleEditora.obterEditoras()
            .then(novasEditoras => {
                setEditoras(novasEditoras);
                setCarregado(true);
            })
            .catch(error => console.error("Erro ao obter editoras:", error));

    }, [carregado]);

    const excluir = (codigoEditora) => {
        controleEditora.excluir(codigoEditora)
            .then(() => {
                setCarregado(false);
            })
            .catch(error => console.error("Erro ao excluir editora:", error));
    };

    const LinhaEditora = ({ editora, excluir }) => {
        return (
            <tr>
                <td>{editora.codEditora}
                    <dd> <button onClick={() => excluir(editora.codigo)}
                        className="btn btn-danger btn-sm">Excluir</button></dd>
                </td>
                <td>{editora.nome}</td>
            </tr>
        );
    };

    return (
        <main className="container mt-4">
            <h1>Catálogo de Editoras</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {editoras.map((editora, index) => (
                        <LinhaEditora key={index} editora={editora} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}