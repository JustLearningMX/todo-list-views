import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ValidatorsService } from "../../../shared/services/validators.service";
import {UserLoginBody, UserLoginResponse} from "../../interfaces/users/User.interface";
import {UserService} from "../../services/user.service";

import Swal from 'sweetalert2'

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private userLoginBody!: UserLoginBody;
  private userLoginResponse!: UserLoginResponse;

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private userService: UserService
  ) {}

  myForm: FormGroup = this.fb.group({
    email: ['virtual.liga@gmail.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['GabyDanny0913', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.userLoginBody = this.myForm.value;

    this.userService.loginUser(this.userLoginBody)
      .subscribe({
        next: (resp ) => {
          const respSuccess = resp as UserLoginResponse;
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Hola ${respSuccess.firstName} ${respSuccess.lastName}`
          });
          this.myForm.reset()
        },

        error: (err: string) => {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err
            });
          },
      });
  }
}
