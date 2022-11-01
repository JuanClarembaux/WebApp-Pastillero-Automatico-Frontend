import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProductoInventarioComponent } from './agregar-editar-producto-inventario.component';

describe('AgregarEditarProductoInventarioComponent', () => {
  let component: AgregarEditarProductoInventarioComponent;
  let fixture: ComponentFixture<AgregarEditarProductoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarProductoInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarProductoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
