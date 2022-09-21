import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersvendorsComponent } from './customersvendors.component';

describe('CustomersvendorsComponent', () => {
  let component: CustomersvendorsComponent;
  let fixture: ComponentFixture<CustomersvendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersvendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
