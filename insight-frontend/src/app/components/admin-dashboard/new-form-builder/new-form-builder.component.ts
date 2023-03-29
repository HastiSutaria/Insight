import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-form-builder',
  templateUrl: './new-form-builder.component.html',
  styleUrls: ['./new-form-builder.component.css']
})
export class NewFormBuilderComponent {
  @Input() newInputForm!: FormGroup;
}
