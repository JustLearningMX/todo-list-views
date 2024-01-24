import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ValidatorsService } from "../../../shared/services/validators.service";
import { UserRegisterBody } from "../../interfaces/users/User.interface";
import { UserRoles } from "../../interfaces/users/User-roles.enum";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isButtonDisabled: boolean = false;

  private user: UserRegisterBody = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: UserRoles.USER,
    active: true
  }

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private userService: AuthService,
    private router: Router
  ) {}

  myForm: FormGroup = this.fb.group({
    firstName: ['Danny', [Validators.required]],
    lastName: ['Chavez', [Validators.required]],
    email: ['danny@gmail.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['12345678', [Validators.required, Validators.minLength(8)]],
    password2: ['12345678', [Validators.required]],
  },
    {
      validators: [
        this.validatorService.isFieldOneEqualToFieldTwo('password', 'password2')
      ]
  });

  onSubmit() {
    this.isButtonDisabled = true;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled = false;
      return;
    }

    const {firstName, lastName, email, password} = this.myForm.value;
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.email = email;
    this.user.password = password;

    this.signup();

    this.isButtonDisabled = false;
  }

  private signup() {
    this.userService.signup(this.user)
      .subscribe({
        next: (resp): void => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso.',
            text: `Redireccionando para iniciar sesión.`
          });
          this.myForm.reset();
          this.router.navigateByUrl('/auth/login');
        },
        error: (err): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      })
  }

}
