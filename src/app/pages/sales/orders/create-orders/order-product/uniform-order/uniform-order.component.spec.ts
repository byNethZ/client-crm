import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformOrderComponent } from './uniform-order.component';

describe('UniformOrderComponent', () => {
  let component: UniformOrderComponent;
  let fixture: ComponentFixture<UniformOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
