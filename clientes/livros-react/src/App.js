import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditoraLista from './EditoraLista';
import EditoraDados from './EditoraDados';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Catálogo de Livros</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Lista de Livros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livroDados">Novo Livro</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editoraLista">Lista de Editoras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editoraDados">Nova Editora</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LivroLista />} />
        <Route path="/livroDados" element={<LivroDados />} />
        <Route path="/editoraLista" element={<EditoraLista />} />
        <Route path="/editoraDados" element={<EditoraDados />} />
      </Routes>
    </Router>
  );
}

export default App;