import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCardComponent } from './nav-card.component';

describe('NavCardComponent', () => {
  let component: NavCardComponent;
  let fixture: ComponentFixture<NavCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCardComponent]
    });
    fixture = TestBed.createComponent(NavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});