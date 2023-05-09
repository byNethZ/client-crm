import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRestringedComponent } from './layout-restringed.component';

describe('LayoutRestringedComponent', () => {
  let component: LayoutRestringedComponent;
  let fixture: ComponentFixture<LayoutRestringedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutRestringedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRestringedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
