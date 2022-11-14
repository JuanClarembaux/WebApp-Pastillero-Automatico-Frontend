import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListadoProductoComponent } from './usuario-listado-producto.component';

describe('UsuarioListadoProductoComponent', () => {
  let component: UsuarioListadoProductoComponent;
  let fixture: ComponentFixture<UsuarioListadoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioListadoProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListadoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
