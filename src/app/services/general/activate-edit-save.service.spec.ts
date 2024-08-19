import { TestBed } from '@angular/core/testing';

import { ActivateEditSaveService } from '../activate-edit-save.service';

describe('ActivateEditSaveService', () => {
  let service: ActivateEditSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateEditSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
