import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Editora } from '../model/editora';
import { Livro } from '../model/livro';
import { ControleEditorasService } from '../contole/controle-editoras.service';
import { ControleLivrosService } from '../contole/controle-livros.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})

export class LivroDadosComponent {
  router: Router;
  livro: Livro = new Livro();
  autoresForm: string = "";
  editoras: Array<Editora>;

  constructor(router: Router,
    private servEditora: ControleEditorasService,
    private servLivros: ControleLivrosService) {
    this.router = router;
    this.editoras = [];
  }

  ngOnInit(): void {
    this.servEditora.getEditoras().subscribe(data => {
      this.editoras = data;
    });
  }

  incluir = (livro: Livro): void => {
    livro.autores = this.autoresForm.split('\n');
    
    const inclusao$: Observable<boolean> = this.servLivros.incluir(livro);
    
    inclusao$.subscribe({
      next: (success: boolean) => {
        if (success) {
          console.log("Livro incluído com sucesso via Observable. Navegando...");
          this.router.navigateByUrl("/livroLista");
        } else {
          console.log("Inclusão falhou (retornou falso).");
        }
      },
      error: (err) => {
        console.error("Erro durante a inclusão:", err);
      },
      complete: () => {
        console.log("Inclusão completa.");
      }
    });
  }
}
