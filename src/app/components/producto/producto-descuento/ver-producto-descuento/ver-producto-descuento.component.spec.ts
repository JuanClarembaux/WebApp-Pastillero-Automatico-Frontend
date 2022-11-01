import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoDescuentoComponent } from './ver-producto-descuento.component';

describe('VerProductoDescuentoComponent', () => {
  let component: VerProductoDescuentoComponent;
  let fixture: ComponentFixture<VerProductoDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductoDescuentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
