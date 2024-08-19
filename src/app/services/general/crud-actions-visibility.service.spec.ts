import { TestBed } from '@angular/core/testing';

import { CrudActionsVisibilityService } from './crud-actions-visibility.service';

describe('CrudActionsVisibilityService', () => {
  let service: CrudActionsVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudActionsVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
