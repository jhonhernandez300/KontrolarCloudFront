import { TestBed } from '@angular/core/testing';

import { ProfileTransferService } from './profile-transfer.service';

describe('ProfileTransferService', () => {
  let service: ProfileTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
