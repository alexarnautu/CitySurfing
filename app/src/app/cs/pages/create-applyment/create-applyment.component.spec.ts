import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplymentComponent } from './create-applyment.component';

describe('CreateApplymentComponent', () => {
  let component: CreateApplymentComponent;
  let fixture: ComponentFixture<CreateApplymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApplymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApplymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
