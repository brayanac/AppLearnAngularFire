import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.class';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

// import { threadId } from 'worker_threads';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  email: string;
  password: string;
  registerAdminForm: FormGroup;
  validation_messages = {
    displayName: [
      { type: 'required', message: 'El nombre es requerido.' },
    ],
    institute: [
      { type: 'required', message: 'La institución es requerida.' },
    ],
    email: [
      { type: 'required', message: 'El correo es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo válido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.' }
    ],
    phone: [
      { type: 'required', message: 'El celular es requerido.' },
      { type: 'minlength', message: 'El celular debe tener al menos 8 dígitos.' },
      // { type: 'pattern', message: 'Solo debe ingresar números.'}
    ]
  };

  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.registerAdminForm = this.formBuilder.group({
      displayName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern('/^-?(0|[1-9]\d*)?$/'),
      ])),
      institute: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  ngOnInit() {
  }


  async onRegister() {
    // (this.userType == 'student') ? console.log(this.registerStudentForm.value) : console.log(this.registerAdminForm.value); //to print test
    const value = {};
    value['email'] = this.registerAdminForm.get('email').value;
    value['password'] = this.registerAdminForm.get('password').value;
    this.authService.registerUser(value).then(res => {
      this.user.email = res.user.email;
      this.user.uid = res.user.uid;
      this.user.role = 'admin';
      this.user.displayName = this.registerAdminForm.get('displayName').value;
      this.user.phone = this.registerAdminForm.get('phone').value;
      this.user.institute = this.registerAdminForm.get('institute').value;
      this.createInstitute();
    }, (error) => {
      console.log(error);
    });
  }

  createInstitute() {
    const institute = {};
    institute['name'] = this.user.institute,
    this.authService.createInstitute(institute).then((resp: any) => {
      console.log(resp);
      this.user.instituteId = resp.id;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.createUser(this.user);
    }).catch(error => {
      console.log(error);
    });
  }

  createUser(user) {
    const record = {};
    record['uid'] = user.uid;
    record['email'] = user.email;
    record['displayName'] = user.displayName;
    record['role'] = user.role;
    record['phone'] = user.phone;
    record['instituteId'] = user.instituteId;
    this.authService.createUser(record).then(resp => {
      this.router.navigateByUrl('/');
    }).catch(error => {
      console.log(error);
    })
  }


  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}
