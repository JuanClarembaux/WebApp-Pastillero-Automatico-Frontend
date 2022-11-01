import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProductoDescuentoComponent } from './agregar-editar-producto-descuento.component';

describe('AgregarEditarProductoDescuentoComponent', () => {
  let component: AgregarEditarProductoDescuentoComponent;
  let fixture: ComponentFixture<AgregarEditarProductoDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarProductoDescuentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarProductoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
