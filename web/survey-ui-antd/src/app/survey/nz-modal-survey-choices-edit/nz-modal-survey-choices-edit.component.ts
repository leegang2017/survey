import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-nz-modal-survey-choices-edit',
  templateUrl: './nz-modal-survey-choices-edit.component.html',
  styleUrls: ['./nz-modal-survey-choices-edit.component.css']
})
export class NzModalSurveyChoicesEditComponent implements OnInit {
  validateForm: FormGroup;
  choices: Array<any>;

  @Input()
  set name(choices: Array<any>) {
    this.choices = choices;
  }

  emitDataOutside() {
    this.subject.next('传出数据');
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }

  constructor(private fb: FormBuilder,
    private subject: NzModalSubject) {
    this.validateForm = this.fb.group({
    });


    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
    this.choices.map((choice, index) => {
      choice.id = index;
      this.validateForm.addControl(`content${choice.id}`, new FormControl(null, Validators.required));
      this.validateForm.patchValue({ [`content${choice.id}`]: choice.content });
      this.validateForm.addControl(`score${choice.id}`, new FormControl(null));
      this.validateForm.patchValue({ [`score${choice.id}`]: choice.score });
    })
  }


  addField(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    const id = (this.choices.length > 0) ? this.choices[this.choices.length - 1].id + 1 : 0;

    const choice = {
      id,
      [`score${id}`]: undefined,
      [`content${id}`]: undefined,
    };
    const index = this.choices.push(choice);
    console.log(this.choices[this.choices.length - 1]);
    this.validateForm.addControl(`score${id}`, new FormControl(null, Validators.required));
    this.validateForm.addControl(`content${id}`, new FormControl(null, Validators.required));
  }

  removeField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.choices.length > 1) {
      const index = this.choices.indexOf(i);
      this.choices.splice(index, 1);
      console.log(this.choices);
      this.validateForm.removeControl(`content${i.id}`);
      this.validateForm.removeControl(`score${i.id}`);
    }
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      const value = this.validateForm.value;
      this.choices.map((choice, index) => {
        choice.content = value[`content${choice.id}`];
        choice.score = value[`score${choice.id}`];
      })
      this.subject.next({success:true, result: this.choices});
      this.subject.destroy('onCancel');
    }
  }
}
