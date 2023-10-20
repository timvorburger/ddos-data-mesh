import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewIssuedCredentialsComponent } from './reveiw-issued-credentials.component';

describe('ReviewIssuedCredentialsComponent', () => {
  let component: ReviewIssuedCredentialsComponent;
  let fixture: ComponentFixture<ReviewIssuedCredentialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewIssuedCredentialsComponent]
    });
    fixture = TestBed.createComponent(ReviewIssuedCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
