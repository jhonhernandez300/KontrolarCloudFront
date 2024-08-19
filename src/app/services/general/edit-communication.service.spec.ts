import { TestBed } from '@angular/core/testing';

import { EditCommunicationService } from './edit-communication.service';

describe('EditCommunicationService', () => {
  let service: EditCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
