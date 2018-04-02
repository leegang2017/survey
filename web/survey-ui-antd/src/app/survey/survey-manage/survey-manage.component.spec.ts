import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyManageComponent } from './survey-manage.component';

describe('SurveyManageComponent', () => {
  let component: SurveyManageComponent;
  let fixture: ComponentFixture<SurveyManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
