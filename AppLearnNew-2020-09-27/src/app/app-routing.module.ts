import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guards';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { TeachersHomeComponent } from './components/teachers/teachers-home/teachers-home.component';
import { StudentsHomeComponent } from './components/students/students-home/students-home.component';
import { SettingsHomeComponent } from './components/settings/settings-home/settings-home.component';
import { HelpHomeComponent } from './components/help/help-home/help-home.component';
import { CoursesHomeComponent } from './components/courses/courses-home/courses-home.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { StudentGuard } from './guards/student.guard';
import { MyCoursesHomeComponent } from './components/myCourses/my-courses-home/my-courses-home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'authentication/login', component: LoginComponent },
  { path: 'authentication/register', component: RegisterComponent },
  { path: 'teachers', component: TeachersHomeComponent, canActivate: [AdminGuard]  },
  { path: 'students', component: StudentsHomeComponent, canActivate: [AdminGuard] },
  { path: 'courses', component: CoursesHomeComponent, canActivate: [AdminGuard]  },
  { path: 'mycourses', component: MyCoursesHomeComponent  },
  { path: 'settings', component: SettingsHomeComponent },
  { path: 'help', component: HelpHomeComponent,   },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
