import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialFormComponent } from './credential-form.component';

describe('CredentialFormComponent', () => {
  let component: CredentialFormComponent;
  let fixture: ComponentFixture<CredentialFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialFormComponent]
    });
    fixture = TestBed.createComponent(CredentialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
