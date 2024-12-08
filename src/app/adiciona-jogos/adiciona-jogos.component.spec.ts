import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaJogosComponent } from './adiciona-jogos.component';

describe('AdicionaJogosComponent', () => {
  let component: AdicionaJogosComponent;
  let fixture: ComponentFixture<AdicionaJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaJogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
