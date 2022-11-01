import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarUsuarioDireccionComponent } from './agregar-editar-usuario-direccion.component';

describe('AgregarEditarUsuarioDireccionComponent', () => {
  let component: AgregarEditarUsuarioDireccionComponent;
  let fixture: ComponentFixture<AgregarEditarUsuarioDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarUsuarioDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarUsuarioDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
