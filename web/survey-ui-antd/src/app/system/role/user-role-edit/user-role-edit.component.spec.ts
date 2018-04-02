import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleEditComponent } from './user-role-edit.component';

describe('UserRoleEditComponent', () => {
  let component: UserRoleEditComponent;
  let fixture: ComponentFixture<UserRoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
