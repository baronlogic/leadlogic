import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsService } from 'src/app/core/services/persons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  signInForm: FormGroup;
  hidePassword = true;
  bSignIn = false;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private personsService: PersonsService
  ){}

  ngOnInit() {
    this.InstantiateForm();
  }

  InstantiateForm(){
    this.signInForm = this.formBuilder.group({
      Identifier: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToDashboard() {
    this.router.navigate(['pages'], { replaceUrl: true });
  }

  handleSignIn(){
    this.bSignIn = true;

    let formData = new FormData();
    formData.append('Identifier', this.signInForm.get('Identifier').value);
    formData.append('Password', this.signInForm.get('Password').value);

    this.personsService.validateUserCredentials(formData)
    .subscribe(
      res => {
        this.bSignIn = false;
        let auxRes: any = res;

        if(auxRes.type == 'error'){
          this.openSnackBar('Invalid User or Password...');
          return;
        }
        
        else if(auxRes.type == 'success'){
          let auxUser = {
            personId: auxRes.person_id,
            clientId: auxRes.client_id,
            projectId: auxRes.project_id
          }
          localStorage.setItem('leadLogged', JSON.stringify(auxUser));
          this.goToDashboard();
        }
      },
      err => {
        this.bSignIn = false;
        this.openSnackBar('Something went wrong...');
      }
    );
  }
 
}
