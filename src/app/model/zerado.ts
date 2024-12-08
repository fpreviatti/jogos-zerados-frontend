import { User } from './user';
export class Zerado {
  zeradoId: number;
  nome: string;
  console: string;
  genero: string;
  dificuldade: string;
  data: Date;
  horasJogadas: number;
  minutosJogados: number;
  avaliacao: string;
  user: User;

    constructor(zeradoId,nome,console,genero,dificuldade,data,horasJogadas,minutosJogados,avaliacao, user) {
    this.zeradoId = zeradoId;
    this.nome = nome;
    this.console = console;
    this.genero = genero;
    this.dificuldade = dificuldade;
    this.data = data;
    this.horasJogadas = horasJogadas;
    this.minutosJogados = minutosJogados;
    this.avaliacao = avaliacao;
    this.user = user
  }
}
