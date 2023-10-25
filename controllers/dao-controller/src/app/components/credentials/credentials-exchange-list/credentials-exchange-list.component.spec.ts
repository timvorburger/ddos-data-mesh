import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsExchangeListComponent } from './credentials-exchange-list.component';

describe('CredentialsExchangeListComponent', () => {
  let component: CredentialsExchangeListComponent;
  let fixture: ComponentFixture<CredentialsExchangeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsExchangeListComponent]
    });
    fixture = TestBed.createComponent(CredentialsExchangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
