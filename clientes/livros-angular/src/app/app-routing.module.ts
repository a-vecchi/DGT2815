import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListaComponent } from './livro-lista/livro-lista.component';
import { LivroDadosComponent } from './livro-dados/livro-dados.component';
import { EditoraListaComponent } from './editora-lista/editora-lista.component';
import { EditoraDadosComponent } from './editora-dados/editora-dados.component';

const routes: Routes = [
  { path: 'livroLista', component: LivroListaComponent },
  { path: 'livroDados', component: LivroDadosComponent },
  { path: 'editoraLista', component: EditoraListaComponent },
  { path: 'editoraDados', component: EditoraDadosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
