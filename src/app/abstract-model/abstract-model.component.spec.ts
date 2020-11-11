import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractModelComponent } from './abstract-model.component';

describe('AbstractModelComponent', () => {
  let component: AbstractModelComponent;
  let fixture: ComponentFixture<AbstractModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
