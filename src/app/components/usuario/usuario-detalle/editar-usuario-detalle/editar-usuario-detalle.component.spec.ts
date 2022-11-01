import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioDetalleComponent } from './editar-usuario-detalle.component';

describe('EditarUsuarioDetalleComponent', () => {
  let component: EditarUsuarioDetalleComponent;
  let fixture: ComponentFixture<EditarUsuarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUsuarioDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
