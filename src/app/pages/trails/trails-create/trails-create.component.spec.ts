import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TrailsCreateComponent } from './trails-create.component'

describe('TrailsCreateComponent', () => {
  let component: TrailsCreateComponent
  let fixture: ComponentFixture<TrailsCreateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailsCreateComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailsCreateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
