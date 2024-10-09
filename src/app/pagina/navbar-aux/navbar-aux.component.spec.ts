import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAuxComponent } from './navbar-aux.component';

describe('NavbarAuxComponent', () => {
  let component: NavbarAuxComponent;
  let fixture: ComponentFixture<NavbarAuxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarAuxComponent]
    });
    fixture = TestBed.createComponent(NavbarAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
