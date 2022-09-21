import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsChecklistComponent } from './details-checklist.component';

describe('DetailsChecklistComponent', () => {
  let component: DetailsChecklistComponent;
  let fixture: ComponentFixture<DetailsChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
