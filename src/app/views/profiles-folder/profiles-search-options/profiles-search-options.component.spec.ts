import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSearchOptionsComponent } from './profiles-search-options.component';

describe('ProfilesSearchOptionsComponent', () => {
  let component: ProfilesSearchOptionsComponent;
  let fixture: ComponentFixture<ProfilesSearchOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesSearchOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesSearchOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
