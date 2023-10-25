import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewIssuedCredentialsExchangeComponent } from './review-issued-credentials.component';

describe('ReviewIssuedCredentialsExchangeComponent', () => {
  let component: ReviewIssuedCredentialsExchangeComponent;
  let fixture: ComponentFixture<ReviewIssuedCredentialsExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewIssuedCredentialsExchangeComponent]
    });
    fixture = TestBed.createComponent(ReviewIssuedCredentialsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
