import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarUsuarioTelefonoComponent } from './agregar-editar-usuario-telefono.component';

describe('AgregarEditarUsuarioTelefonoComponent', () => {
  let component: AgregarEditarUsuarioTelefonoComponent;
  let fixture: ComponentFixture<AgregarEditarUsuarioTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarUsuarioTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarUsuarioTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
