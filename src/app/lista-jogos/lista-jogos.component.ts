import { ZeradoPromiseService } from './../service/zerado-promise.service';
import { ZeradoObservableService } from './../service/zerado-observable.service';
import { Zerado } from './../model/zerado';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-jogos',
  templateUrl: './lista-jogos.component.html',
  styleUrls: ['./lista-jogos.component.css'],
})
export class ListaJogosComponent implements OnInit {
  zerados!: Zerado[];
  teste: string;
  zerado: Zerado;
  quantidadeZerados: number = 1;

  @Output() value = this.quantidadeZerados;

  modal = {
    show: false,
    title: '',
    text: '',
  };

  constructor(
    private router: Router,
    private zeradoObservableService: ZeradoObservableService,
    private zeradoPromiseService: ZeradoPromiseService
  ) {

    console.log('construtor da lista');

    this.zeradoObservableService.getAll().subscribe({
      next: (value) => {
        this.zerados = <Zerado[]>value;
        this.quantidadeZerados = this.zerados.length;
      },
      error: (err) => {
        this.router.navigate(['/login']);
        console.log(err);
      },
    });
  }

  ngOnInit() {}

  onCloseModal() {
    this.modal.show = false;

    if (this.modal.show == false) {
      this.router.navigate(['/adiciona-jogo']);
    }
  }

  onSemJogosZeradosEvent(event: boolean) {
    this.modal.show = event;
    this.modal.title = 'Epa!';
    this.modal.text = `Você não possui jogos zerados! Que tal adicionar seu primeiro jogo?`;
  }

  atualizarJogo(nome: string) {
    this.router.navigate(['/adiciona-jogo'], { queryParams: { nome: nome } });
  }

  apagarJogo(zerado: Zerado) {
    this.zeradoObservableService.delete(zerado).subscribe({
      next: () =>
        this.zeradoObservableService.getAll().subscribe((value) => {
          this.zerados = <Zerado[]>value;
          this.quantidadeZerados = this.zerados.length;
        }),
      error: (err) => {
        console.log(err);
      },
    });
  }
}
