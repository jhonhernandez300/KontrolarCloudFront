import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesOptionsComponent } from './profiles-options.component';

describe('ProfilesOptionsComponent', () => {
  let component: ProfilesOptionsComponent;
  let fixture: ComponentFixture<ProfilesOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
