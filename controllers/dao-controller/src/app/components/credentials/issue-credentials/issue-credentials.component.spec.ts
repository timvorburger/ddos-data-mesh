import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCredentialsExchangeComponent } from './issue-credentials.component';

describe('IssueCredentialsExchangeComponent', () => {
  let component: IssueCredentialsExchangeComponent;
  let fixture: ComponentFixture<IssueCredentialsExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueCredentialsExchangeComponent]
    });
    fixture = TestBed.createComponent(IssueCredentialsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
