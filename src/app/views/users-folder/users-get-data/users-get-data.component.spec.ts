import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGetDataComponent } from './users-get-data.component';

describe('UsersGetDataComponent', () => {
  let component: UsersGetDataComponent;
  let fixture: ComponentFixture<UsersGetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersGetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersGetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
