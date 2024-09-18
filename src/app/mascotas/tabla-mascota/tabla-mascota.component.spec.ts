import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMascotaComponent } from './tabla-mascota.component';

describe('TablaMascotaComponent', () => {
  let component: TablaMascotaComponent;
  let fixture: ComponentFixture<TablaMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaMascotaComponent]
    });
    fixture = TestBed.createComponent(TablaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
