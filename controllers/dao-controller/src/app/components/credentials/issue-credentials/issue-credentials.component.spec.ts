import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCredentialsComponent } from './issue-credentials.component';

describe('IssueCredentialsComponent', () => {
  let component: IssueCredentialsComponent;
  let fixture: ComponentFixture<IssueCredentialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueCredentialsComponent]
    });
    fixture = TestBed.createComponent(IssueCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
