import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-painel-jogos',
  templateUrl: './painel-jogos.component.html',
  styleUrls: ['./painel-jogos.component.css'],
})
export class PainelJogosComponent implements OnInit, OnChanges {
  @Output() semJogosZeradosEvent = new EventEmitter<boolean>();
  @Input() value: number = 0;
  constructor() {}

  ngOnChanges(): void {
    if (this.value == 0) {
      setTimeout(() => {
        this.semJogosZeradosEvent.emit(true);
      }, 1000);
    }
  }

  ngOnInit() {}
}
