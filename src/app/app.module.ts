import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LandPageComponent } from './land-page/land-page.component';
import { ListaJogosComponent } from './lista-jogos/lista-jogos.component';
import { AdicionaJogosComponent } from './adiciona-jogos/adiciona-jogos.component';
import { NgxMaskModule } from 'ngx-mask';
import { PainelJogosComponent } from './painel-jogos/painel-jogos.component';
import { ModalComponent } from './modal/modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './httpInterceptor.service';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LandPageComponent,
    ListaJogosComponent,
    AdicionaJogosComponent,
    ModalComponent,
    PainelJogosComponent,
    PageNotFoundComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,AppRoutingModule, FormsModule,NgxMaskModule.forRoot()
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true}


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
