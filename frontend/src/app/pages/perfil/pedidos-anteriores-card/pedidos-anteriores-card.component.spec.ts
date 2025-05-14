import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAnterioresCardComponent } from './pedidos-anteriores-card.component';

describe('PedidosAnterioresCardComponent', () => {
  let component: PedidosAnterioresCardComponent;
  let fixture: ComponentFixture<PedidosAnterioresCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosAnterioresCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosAnterioresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
