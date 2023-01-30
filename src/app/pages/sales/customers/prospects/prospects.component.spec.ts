import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCustomersComponent } from './prospects.component';

describe('RejectedCustomersComponent', () => {
  let component: RejectedCustomersComponent;
  let fixture: ComponentFixture<RejectedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
