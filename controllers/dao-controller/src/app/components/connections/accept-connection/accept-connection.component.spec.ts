import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptConnectionComponent } from './accept-connection.component';

describe('AcceptConnectionComponent', () => {
  let component: AcceptConnectionComponent;
  let fixture: ComponentFixture<AcceptConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptConnectionComponent]
    });
    fixture = TestBed.createComponent(AcceptConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
