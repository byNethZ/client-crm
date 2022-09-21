import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotographiesComponent } from './fotographies.component';

describe('FotographiesComponent', () => {
  let component: FotographiesComponent;
  let fixture: ComponentFixture<FotographiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotographiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotographiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
