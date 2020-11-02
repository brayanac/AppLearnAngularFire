import { Component, OnInit } from '@angular/core'
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private router: Router) { }
  public app_name;
  public isLogged: boolean=false
  public isAdmin: any = false;
  public isStudent: any = false;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
   // this.getAdminUser();
   this.getUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
        this.authService.getUserByUid(auth.uid).subscribe(user=>{
          if(user.role=='admin'){
            this.isAdmin=true;
            console.log('this is user is an admin')
          }
          else{
            this.isAdmin=false;
          }
          if(user.role=='student'){
            this.isStudent=true;
            console.log('this is user is an stud')
          }
          else{
            this.isStudent=false;
          }
        })
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  getUser() {
    var userAuth = JSON.parse(localStorage.getItem('user'));
      console.log(userAuth);
      this.app_name = userAuth.institute
  }

  onLogout(){
    this.authService.onLogOut();
    this.router.navigate(['authentication/login']);
  }
}