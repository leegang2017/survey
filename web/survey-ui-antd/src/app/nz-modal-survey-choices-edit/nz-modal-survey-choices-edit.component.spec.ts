import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzModalSurveyChoicesEditComponent } from './nz-modal-survey-choices-edit.component';

describe('NzModalSurveyChoicesEditComponent', () => {
  let component: NzModalSurveyChoicesEditComponent;
  let fixture: ComponentFixture<NzModalSurveyChoicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzModalSurveyChoicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzModalSurveyChoicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
