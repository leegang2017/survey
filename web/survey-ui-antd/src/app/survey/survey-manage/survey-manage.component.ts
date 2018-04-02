import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RestService } from '../../providers/rest.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NzModalSurveyChoicesEditComponent } from '../nz-modal-survey-choices-edit/nz-modal-survey-choices-edit.component';

@Component({
  selector: 'app-survey-manage',
  templateUrl: './survey-manage.component.html',
  styleUrls: ['./survey-manage.component.css']
})
export class SurveyManageComponent implements OnInit {
  validateForm: FormGroup;

  survey: any = {}

  constructor(private fb: FormBuilder,
    private modalService: NzModalService,
    private rest: RestService,
    private _message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    this.rest.getSurvey().subscribe(result => {
      if (result && result.count > 0) {
        this.survey = result.content[0];
        this.validateForm.setValue({ name: this.survey.name });
        this.survey.questions.map((question, index) => {
          question.id = index;
          this.validateForm.addControl(`content${question.id}`, new FormControl(null, Validators.required));
          this.validateForm.patchValue({ [`content${question.id}`]: question.content });
          this.validateForm.addControl(`category${question.id}`, new FormControl(null));
          this.validateForm.patchValue({ [`category${question.id}`]: question.category });
        })
        this.survey.conclusions.map((conclusion, index) => {
          conclusion.id = index;
          this.validateForm.addControl(`conclusionContent${conclusion.id}`, new FormControl(null, Validators.required));
          this.validateForm.patchValue({ [`conclusionContent${conclusion.id}`]: conclusion.content });
          this.validateForm.addControl(`regionStart${conclusion.id}`, new FormControl(null));
          this.validateForm.patchValue({ [`regionStart${conclusion.id}`]: conclusion.region[0] });
          this.validateForm.addControl(`regionEnd${conclusion.id}`, new FormControl(null));
          this.validateForm.patchValue({ [`regionEnd${conclusion.id}`]: conclusion.region[1] });
        })
      } else {
        this._message.info('获取题失败');
      }
    }, (error) => {
      this._message.info('获取题失败');
    });
  }

  addField(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    const id = (this.survey.questions.length > 0) ? this.survey.questions[this.survey.questions.length - 1].id + 1 : 0;

    const control = {
      id,
      choices: [],
      [`content${id}`]: undefined,
      [`category${id}`]: 'SINGLE',
    };
    const index = this.survey.questions.push(control);
    console.log(this.survey.questions[this.survey.questions.length - 1]);
    this.validateForm.addControl(`content${id}`, new FormControl(null, Validators.required));
    this.validateForm.addControl(`category${id}`, new FormControl(null));
  }

  removeField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.survey.questions.length > 1) {
      const index = this.survey.questions.indexOf(i);
      this.survey.questions.splice(index, 1);
      console.log(this.survey.questions);
      this.validateForm.removeControl(`content${i.id}`);
      this.validateForm.removeControl(`category${i.id}`);
    }
  }

  addConclusionField(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    const id = (this.survey.conclusions.length > 0) ? this.survey.conclusions[this.survey.conclusions.length - 1].id + 1 : 0;

    const control = {
      id,
      [`conclusionContent${id}`]: undefined,
      [`regionStart${id}`]: undefined,
      [`regionEnd${id}`]: undefined,
    };
    const index = this.survey.conclusions.push(control);
    console.log(this.survey.conclusions[this.survey.conclusions.length - 1]);

    this.validateForm.addControl(`conclusionContent${id}`, new FormControl(null, Validators.required));
    this.validateForm.addControl(`regionStart${id}`, new FormControl(null));
    this.validateForm.addControl(`regionEnd${id}`,  new FormControl(null) );

  }

  removeConclusionField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.survey.conclusions.length > 1) {
      const index = this.survey.conclusions.indexOf(i);
      this.survey.conclusions.splice(index, 1);
      console.log(this.survey.conclusions);
      this.validateForm.removeControl(`conclusionContent${i.id}`);
      this.validateForm.removeControl(`regionStart${i.id}`);
      this.validateForm.removeControl(`regionEnd${i.id}`);
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  showModalForComponent(question, e?: MouseEvent) {
    e.preventDefault();
    const subscription = this.modalService.open({
      title: '对话框标题',
      content: NzModalSurveyChoicesEditComponent,
      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      footer: false,
      componentParams: {
        choices: question.choices
      }
    });
    subscription.subscribe(result => {
      console.log(JSON.stringify(result));
      if (result['success']) {
        question.choices = result['result'];
      }
    })
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      const value = this.validateForm.value;
      const survey = {...this.survey};
      survey.questions = this.survey.questions.map((choice, index) => {
        choice.content = value[`content${choice.id}`];
        choice.category = value[`category${choice.id}`];
        const question = {...choice}
        delete question[`content${choice.id}`];
        delete question[`category${choice.id}`];
        return question;
      })

      survey.conclusions = this.survey.conclusions.map((conclusion, index) => {
        conclusion.content = value[`conclusionContent${conclusion.id}`];;
        conclusion.region = [value[`regionStart${conclusion.id}`], value[`regionEnd${conclusion.id}`]];
        const result = {...conclusion}
        delete result[`conclusionContent${conclusion.id}`];
        return result;
      })

      this.rest.updateSurvey(survey).subscribe(result => {
        this._message.info('更新成功');
      }, (error) => {
        this._message.info('更新失败');
      });

      console.log(JSON.stringify(survey));
    }
  }
}
