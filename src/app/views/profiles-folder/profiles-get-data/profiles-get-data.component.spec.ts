import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesGetDataComponent } from './profiles-get-data.component';

describe('ProfilesGetDataComponent', () => {
  let component: ProfilesGetDataComponent;
  let fixture: ComponentFixture<ProfilesGetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesGetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesGetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
