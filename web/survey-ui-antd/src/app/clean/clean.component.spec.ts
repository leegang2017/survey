import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanComponent } from './clean.component';

describe('CleanComponent', () => {
  let component: CleanComponent;
  let fixture: ComponentFixture<CleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
