import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioDireccionComponent } from './ver-usuario-direccion.component';

describe('VerUsuarioDireccionComponent', () => {
  let component: VerUsuarioDireccionComponent;
  let fixture: ComponentFixture<VerUsuarioDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUsuarioDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuarioDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
