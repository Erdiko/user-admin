import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  @Input() passwordInput: FormGroup;

  public password: string;
  public confirm: string;

  constructor() { 



  }

  ngOnInit() {
  }

}
