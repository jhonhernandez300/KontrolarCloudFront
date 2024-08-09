import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersShowTableComponent } from './users-show-table.component';

describe('UsersShowTableComponent', () => {
  let component: UsersShowTableComponent;
  let fixture: ComponentFixture<UsersShowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersShowTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
