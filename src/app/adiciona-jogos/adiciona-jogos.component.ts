import { ZeradoObservableService } from './../service/zerado-observable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Zerado } from '../model/zerado';
import { ZeradoPromiseService } from '../service/zerado-promise.service';

@Component({
  selector: 'app-adiciona-jogos',
  templateUrl: './adiciona-jogos.component.html',
  styleUrls: ['./adiciona-jogos.component.scss'],
})
export class AdicionaJogosComponent implements OnInit {
  zeradosPromisse!: Promise<Zerado[]>;
  zerado: Zerado;
  data: Date;
  avaliacao: string;
  avaliacoes: Array<string>;
  dificuldade: string;
  nomeDoJogo: string;
  zerados: Zerado[] = [];
  generos: Array<string>;
  genero: string;
  consoles: Array<string>;
  console: string;
  dificuldades: Array<string>;
  horasJogadas: number;
  minutosJogados: number;
  alteracao: boolean;
  zeradoAlterado: Zerado;
  tituloH2: string;
  zeradoId: number;
  message = '';
  nome: string = '';
  disponivel: boolean;
  jogoEncontrado: Zerado;

  constructor(
    private zeradoPromiseService: ZeradoPromiseService,
    private zeradoObservableService: ZeradoObservableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dificuldades = ['Fácil', 'Médio', 'Difícil'];
    this.consoles = [
      'Playstation 5',
      'PC',
      'Playstation 4',
      'Nintendo Switch',
      'Xbox One',
      'Xbox 360',
    ];
    this.generos = [
      'Ação',
      'Plataforma',
      'Shooter',
      'Luta',
      'Beat-em up',
      'RPG',
      'Simulação',
      'Puzzle',
      'Esportes',
      'Estratégia',
      'Corrida',
    ];
    this.zerado = new Zerado(0, '', '', '', '', null, 0, 0, 0, null);
    this.zeradoAlterado = new Zerado(0, '', '', '', '', null, 0, 0, 0, null);
    this.genero = '';
    this.console = '';
    this.nomeDoJogo = '';
    this.minutosJogados = 0;
    this.horasJogadas = 0;
    this.dificuldade = '';
    this.data = new Date();
    this.avaliacoes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.avaliacao = '';
    this.alteracao = false;
    this.tituloH2 = 'Cadastrar Jogo Zerado';
    this.zeradoId = 0;
    this.disponivel = true;
  }

  carregaZerados() {

    this.zeradoObservableService.getAll().subscribe({
      next: (value) => {
        this.zerados = <Zerado[]>value;
        this.verificaSeEhParaAtualizar(this.zerados);
        //this.quantidadeZerados = this.zerados.length;
      },
      error: (err) => {
        this.router.navigate(['/login']);
        console.log(err);
      },
    });

    // this.zeradoPromiseService
    //   .getAll()
    //   .then((value) => {
    //     this.zerados = <Zerado[]>value;
    //     this.verificaSeEhParaAtualizar(this.zerados);
    //   })
    //   .catch((e) => {
    //     this.zerados = null;
    //   });
      
  }

  verificaSeJogoJaFoiCadastrado(zerados: Zerado[], nome: string) {

  console.log('vetor zerados: ' +JSON.stringify(zerados));

  console.log('nome: ' +nome);

    for (let z of zerados) {
      if (z.nome === nome) {
        this.disponivel = false;
        break;
      }
    }
  }

  verificaSeEhParaAtualizar(zerados: Zerado[]) {
    for (let z of zerados) {
      if (z.nome === this.nome) {
        this.tituloH2 = 'Alterar Jogo Zerado';
        this.alteracao = true;
        this.zeradoAlterado = z;
        this.atualizaValoresParaAlterar();
        break;
      }
    }
  }

  async getZerados(): Promise<Zerado[]> {
    this.zerados = <Zerado[]>await this.zeradoPromiseService.getAll();
    return this.zerados;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nome = params.nome;
    });

    this.zeradosPromisse = this.getZerados();
    this.carregaZerados();
  }

  atualizaValoresParaAlterar() {
    this.zeradoId = this.zeradoAlterado.zeradoId;
    this.nomeDoJogo = this.zeradoAlterado.nome;
    this.console = this.zeradoAlterado.console;
    this.genero = this.zeradoAlterado.genero;
    this.dificuldade = this.zeradoAlterado.dificuldade;
    this.horasJogadas = this.zeradoAlterado.horasJogadas;
    this.minutosJogados = this.zeradoAlterado.minutosJogados;
    this.data = this.zeradoAlterado.data;
    this.avaliacao = this.zeradoAlterado.avaliacao;
  }

  onSelectChangeAvaliacao(event: Event) {
    this.avaliacao = (event.target as HTMLInputElement).value;
  }

  onSelectChangeDificuldade(event: Event) {
    this.dificuldade = (event.target as HTMLInputElement).value;
  }

  onSelectChangeGenero(event: Event) {
    this.genero = (event.target as HTMLInputElement).value;
  }

  onSelectChangeConsole(event: Event) {
    this.console = (event.target as HTMLInputElement).value;
  }

  onSubmit() {
    this.zerado.zeradoId = this.zeradoId;
    this.zerado.nome = this.nomeDoJogo;
    this.zerado.console = this.console;
    this.zerado.genero = this.genero;
    this.zerado.dificuldade = this.dificuldade;
    this.zerado.horasJogadas = this.horasJogadas;
    this.zerado.minutosJogados = this.minutosJogados;
    this.zerado.data = this.data;
    this.zerado.avaliacao = this.avaliacao;

    if (this.alteracao == true) {
      this.zeradoPromiseService.update(this.zerado);
      this.carregaZerados();
      this.router.navigate(['/lista']);
      return;
    } else {
      this.verificaSeJogoJaFoiCadastrado(this.zerados, this.zerado.nome);

      if (this.disponivel == true) {
        this.zerados.sort(function (a, b) {
          if (a.zeradoId > b.zeradoId) {
            return 1;
          }
          if (a.zeradoId < b.zeradoId) {
            return -1;
          }
          return 0;
        });

        let zeradoIdProx = this.zerados[this.zerados.length - 1];

        if (zeradoIdProx != null) {
          this.zerado.zeradoId = zeradoIdProx.zeradoId;
          this.zerado.zeradoId = this.zerado.zeradoId + 1;
        } else {
          this.zerado.zeradoId++;
        }

        this.zeradoPromiseService
          .save(this.zerado)
          .then(() => {
            this.router.navigate(['/lista']);
          })
          .catch((e) => {
            this.message = e;
            alert(
              'Rejected, Verifique se o Json Server foi inicializado corretamente'
            );
          });
      } else {
        alert(
          'Jogo com o nome: ' +
            this.zerado.nome +
            ' já está cadastrado. Caso queira alterá-lo acesse o menu Meus Jogos Zerados'
        );
      }
    }
  }
}
