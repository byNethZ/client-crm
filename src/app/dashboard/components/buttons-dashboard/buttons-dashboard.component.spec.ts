import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsDashboardComponent } from './buttons-dashboard.component';

describe('ButtonsDashboardComponent', () => {
  let component: ButtonsDashboardComponent;
  let fixture: ComponentFixture<ButtonsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
