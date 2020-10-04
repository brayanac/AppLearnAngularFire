import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesHomeComponent } from './my-courses-home.component';

describe('MyCoursesHomeComponent', () => {
  let component: MyCoursesHomeComponent;
  let fixture: ComponentFixture<MyCoursesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoursesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoursesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
