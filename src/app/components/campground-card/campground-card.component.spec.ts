import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundCardComponent } from './campground-card.component';

describe('CampgroundCardComponent', () => {
  let component: CampgroundCardComponent;
  let fixture: ComponentFixture<CampgroundCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
