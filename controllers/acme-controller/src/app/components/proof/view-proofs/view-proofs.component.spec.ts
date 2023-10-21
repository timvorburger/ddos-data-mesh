import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProofsComponent } from './view-proofs.component';

describe('ViewProofsComponent', () => {
  let component: ViewProofsComponent;
  let fixture: ComponentFixture<ViewProofsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProofsComponent]
    });
    fixture = TestBed.createComponent(ViewProofsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
