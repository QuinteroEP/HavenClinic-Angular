import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTratamientoCrearComponent } from './formulario-tratamiento-crear.component';

describe('FormularioTratamientoCrearComponent', () => {
  let component: FormularioTratamientoCrearComponent;
  let fixture: ComponentFixture<FormularioTratamientoCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioTratamientoCrearComponent]
    });
    fixture = TestBed.createComponent(FormularioTratamientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
