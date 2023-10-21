import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionListComponent } from './connection-list.component';

describe('ConnectionListComponent', () => {
  let component: ConnectionListComponent;
  let fixture: ComponentFixture<ConnectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionListComponent]
    });
    fixture = TestBed.createComponent(ConnectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
