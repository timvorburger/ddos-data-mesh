import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCredentialsExchangeComponent } from './my-credentials.component';

describe('MyCredentialsExchangeComponent', () => {
  let component: MyCredentialsExchangeComponent;
  let fixture: ComponentFixture<MyCredentialsExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCredentialsExchangeComponent]
    });
    fixture = TestBed.createComponent(MyCredentialsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
