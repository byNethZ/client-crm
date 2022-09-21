import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsTableComponent } from './prospects-table.component';

describe('ProspectsTableComponent', () => {
  let component: ProspectsTableComponent;
  let fixture: ComponentFixture<ProspectsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
