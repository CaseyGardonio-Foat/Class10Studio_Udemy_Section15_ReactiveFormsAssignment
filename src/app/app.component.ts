import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatusLevels: string[] = ['stable', 'critical', 'finished'];
  forbiddenProjectNames: string[] = ['test'];
  forbiddenProjectName: string = 'test'

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.invalidNamesAsync),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('stable')
    })
  }

  invalidNames(control: FormControl): {[s: string]: boolean} {
    // Attemps to make this validation case inensitive--adding toLowerCase() method breaks the form
    // let nameInput = control.value;
    // console.log(nameInput);
    // if(this.forbiddenProjectNames.includes(nameInput.toLowerCase())) 
    // if(this.forbiddenProjectName === nameInput.toLowerCase()) 
    if(this.forbiddenProjectNames.includes(control.value)) {
      return {nameIsForbidden: true};
    } else {
      return null;
    }
  }
  invalidNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)=> {
      setTimeout(()=> {
        if(this.forbiddenProjectNames.includes(control.value)) {
          resolve({nameIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }

}
