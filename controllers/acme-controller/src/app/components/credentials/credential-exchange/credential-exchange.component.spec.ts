import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsExchangeComponent } from './credential-exchange.component';

describe('CredentialsExchangeComponent', () => {
  let component: CredentialsExchangeComponent;
  let fixture: ComponentFixture<CredentialsExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsExchangeComponent]
    });
    fixture = TestBed.createComponent(CredentialsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
