import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCardListComponent } from './nav-card-list.component';

describe('NavCardListComponent', () => {
  let component: NavCardListComponent;
  let fixture: ComponentFixture<NavCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCardListComponent]
    });
    fixture = TestBed.createComponent(NavCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
