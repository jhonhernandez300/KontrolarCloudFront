import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesDeleteComponent } from './profiles-delete.component';

describe('ProfilesDeleteComponent', () => {
  let component: ProfilesDeleteComponent;
  let fixture: ComponentFixture<ProfilesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
