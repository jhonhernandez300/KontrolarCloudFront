import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesEditActionComponent } from './profiles-edit-action.component';

describe('ProfilesEditActionComponent', () => {
  let component: ProfilesEditActionComponent;
  let fixture: ComponentFixture<ProfilesEditActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesEditActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesEditActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
