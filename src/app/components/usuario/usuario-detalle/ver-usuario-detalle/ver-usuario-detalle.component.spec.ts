import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioDetalleComponent } from './ver-usuario-detalle.component';

describe('VerUsuarioDetalleComponent', () => {
  let component: VerUsuarioDetalleComponent;
  let fixture: ComponentFixture<VerUsuarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUsuarioDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
