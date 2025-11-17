import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Livro } from '../model/livro';
import { LivroMongo, baseURL } from '../model/livro-mongo';

@Injectable({
  providedIn: 'root'
})

export class ControleLivrosService {

  constructor(private http: HttpClient) { }

  obterLivros(): Observable<Livro[]> {
    return this.http.get<LivroMongo[]>(baseURL).pipe(
      map(data => {
        return data.map(item => ({
          codigo: item._id as string,
          codEditora: item.codEditora,
          titulo: item.titulo,
          resumo: item.resumo,
          autores: item.autores
        }));
      }),
      catchError(error => {
        console.error("Erro ao buscar livros:", error);
        return of([]);
      })
    );
  }

  excluir(codigo: string): Observable<boolean> {
    return this.http.delete(`${baseURL}/${codigo}`).pipe(
      map(() => true),
      catchError(error => {
        console.error("Erro ao excluir livro:", error);
        return of(false);
      })
    );
  }

  incluir(livro: Livro): Observable<boolean> {
    const livroMongo: LivroMongo = {
      _id: null, 
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };

    return this.http.post(baseURL, livroMongo).pipe(
      map(() => true),
      catchError(error => {
        console.error("Erro ao incluir livro:", error);
        return of(false);
      })
    );
  }

}
