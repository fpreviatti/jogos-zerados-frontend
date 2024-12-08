import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { ListaJogosComponent } from './lista-jogos/lista-jogos.component';
import { AdicionaJogosComponent } from './adiciona-jogos/adiciona-jogos.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [

  //rotas estaticas
  { path: 'inicio', component: LandPageComponent },
  { path: 'adiciona-jogo', component: AdicionaJogosComponent },
  { path: 'lista', component: ListaJogosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

  //rota raiz
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  //rota coringa
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
