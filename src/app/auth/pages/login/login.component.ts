import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ValidatorsService } from "../../../shared/services/validators.service";
import { UserLoginBody, UserLoginResponse } from "../../../users/interfaces/User.interface";
import { AuthService } from "../../services/auth.service";
import { UserMessages } from "../../../users/interfaces/User-messages.enum";

import Swal from 'sweetalert2'

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isButtonDisabled: boolean = false;

  private userLoginBody!: UserLoginBody;

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private userService: AuthService,
    private router: Router
  ) {}

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isButtonDisabled = true;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled = false;
      return;
    }

    this.userLoginBody = this.myForm.value;

    this.userService.login(this.userLoginBody)
      .subscribe({
        next: (resp ): void => {
          const respSuccess = resp as UserLoginResponse;
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Bienvenido ${respSuccess.firstName} ${respSuccess.lastName}`
          });
          this.myForm.reset()
          this.router.navigateByUrl('/mis-listas');
        },
        error: (err: UserMessages): void => {
          this.isButtonDisabled = false;
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err
            });
          },
      });
  }
}
