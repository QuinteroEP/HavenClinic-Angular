import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTratamientoComponent } from './formulario-tratamiento.component';

describe('FormularioTratamientoComponent', () => {
  let component: FormularioTratamientoComponent;
  let fixture: ComponentFixture<FormularioTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioTratamientoComponent]
    });
    fixture = TestBed.createComponent(FormularioTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
