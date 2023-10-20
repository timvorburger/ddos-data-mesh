import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProofComponent } from './request-proof.component';

describe('RequestProofComponent', () => {
  let component: RequestProofComponent;
  let fixture: ComponentFixture<RequestProofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestProofComponent]
    });
    fixture = TestBed.createComponent(RequestProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
