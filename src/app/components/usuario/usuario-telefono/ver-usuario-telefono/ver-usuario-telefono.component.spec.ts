import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioTelefonoComponent } from './ver-usuario-telefono.component';

describe('VerUsuarioTelefonoComponent', () => {
  let component: VerUsuarioTelefonoComponent;
  let fixture: ComponentFixture<VerUsuarioTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUsuarioTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuarioTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
