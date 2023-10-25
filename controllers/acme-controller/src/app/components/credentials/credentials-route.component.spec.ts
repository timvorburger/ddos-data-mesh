import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsRouteComponent } from './credentials-route.component';

describe('CredentialsRouteComponentComponent', () => {
  let component: CredentialsRouteComponent;
  let fixture: ComponentFixture<CredentialsRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsRouteComponent]
    });
    fixture = TestBed.createComponent(CredentialsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
