import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesFormComponent } from './my-courses-form.component';

describe('MyCoursesFormComponent', () => {
  let component: MyCoursesFormComponent;
  let fixture: ComponentFixture<MyCoursesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoursesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoursesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
