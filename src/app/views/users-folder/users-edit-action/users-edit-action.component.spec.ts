import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditActionComponent } from './users-edit-action.component';

describe('UsersEditActionComponent', () => {
  let component: UsersEditActionComponent;
  let fixture: ComponentFixture<UsersEditActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersEditActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersEditActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
