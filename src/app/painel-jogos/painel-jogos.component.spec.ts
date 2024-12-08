import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelJogosComponent } from './painel-jogos.component';

describe('PainelJogosComponent', () => {
  let component: PainelJogosComponent;
  let fixture: ComponentFixture<PainelJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelJogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
