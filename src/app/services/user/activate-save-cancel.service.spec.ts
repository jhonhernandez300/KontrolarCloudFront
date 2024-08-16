import { TestBed } from '@angular/core/testing';

import { ActivateSaveCancelService } from './activate-save-cancel.service';

describe('ActivateSaveCancelService', () => {
  let service: ActivateSaveCancelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateSaveCancelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
