import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Editora } from '../model/editora';
import { ControleEditorasService } from '../contole/controle-editoras.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './editora-dados.component.html',
  styleUrls: ['./editora-dados.component.css']
})

export class EditoraDadosComponent {
  router: Router;
  editora: Editora = new Editora();
  autoresForm: string = "";
  editoras: Array<Editora>;

  constructor(router: Router,
    private servEditora: ControleEditorasService) {
    this.router = router;
    this.editoras = [];
  }

  incluir = (editora: Editora): void => {
    
    const inclusao$: Observable<boolean> = this.servEditora.incluir(editora);
    
    inclusao$.subscribe({
      next: (success: boolean) => {
        if (success) {
          console.log("Editora incluído com sucesso via Observable. Navegando...");
          this.router.navigateByUrl("/editoraLista");
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
