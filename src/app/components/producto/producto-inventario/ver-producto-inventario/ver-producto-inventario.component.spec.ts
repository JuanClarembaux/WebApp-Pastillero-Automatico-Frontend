import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoInventarioComponent } from './ver-producto-inventario.component';

describe('VerProductoInventarioComponent', () => {
  let component: VerProductoInventarioComponent;
  let fixture: ComponentFixture<VerProductoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductoInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
