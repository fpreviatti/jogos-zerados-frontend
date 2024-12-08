import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './register.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  email: string
  name: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService) {   }

  ngOnInit(): void {
  }

  onSubmit(){

    this.registerService.registerService(this.email, this.name, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/inicio']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    }); 

  }

}
