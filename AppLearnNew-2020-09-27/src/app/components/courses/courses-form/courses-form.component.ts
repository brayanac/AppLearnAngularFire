import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  public course: any = [];
  public currentUser;
  public searchText = '';

  constructor(public coursesService: CoursesService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<CoursesFormComponent>) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('productImage') inputProductImage: ElementRef;

  ngOnInit(): void {
    if (this.dataDialog != null) {
      this.coursesService.selectedCourse.description = this.dataDialog.description;
      this.coursesService.selectedCourse.schedule = this.dataDialog.schedule;
      this.coursesService.selectedCourse.teacher = this.dataDialog.teacher;
      this.coursesService.selectedCourse.student = this.dataDialog.student;
    }
  }
  async addCourse(addFormCourse: NgForm) {
    if (this.dataDialog == null) {
      console.log(addFormCourse.form.value);
      var userAuth = JSON.parse(localStorage.getItem('user'));
      const record = {};
      record['description'] = addFormCourse.form.value.description;
      record['schedule'] = addFormCourse.form.value.schedule;
      record['teacher'] = addFormCourse.form.value.teacher;
      record['student'] = addFormCourse.form.value.student;
      record['instituteId'] = userAuth.instituteId;
      this.coursesService.createCourse(record).then((student) => {
        addFormCourse.reset();
        this.dialog.closeAll();
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log(addFormCourse.form.value);
      const record = {};
      record['description'] = addFormCourse.form.value.description;
      record['schedule'] = addFormCourse.form.value.schedule;
      record['teacher'] = addFormCourse.form.value.teacher;
      record['student'] = addFormCourse.form.value.student;
      record['uid'] = this.dataDialog.uid;
      this.coursesService.updateCourse(record).then((course) => {
        addFormCourse.reset();
        this.dialog.closeAll();
      }, (error) => {
        console.log(error);
      });
    }
  };

  onClose(formCourse: NgForm): void {
    formCourse.reset();
    this.dialogRef.close();
  }



}

