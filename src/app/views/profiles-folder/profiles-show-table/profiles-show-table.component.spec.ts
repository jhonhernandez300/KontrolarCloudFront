import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesShowTableComponent } from './profiles-show-table.component';

describe('ProfilesShowTableComponent', () => {
  let component: ProfilesShowTableComponent;
  let fixture: ComponentFixture<ProfilesShowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesShowTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
