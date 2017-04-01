import { Component, Input} from '@angular/core';
import { FormGroup }       from '@angular/forms';
import { User }            from "../shared/models/user.model";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  @Input() passwordInput: FormGroup;

  constructor() {}

  ngOnInit() {}

}
