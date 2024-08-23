import { TestBed } from '@angular/core/testing';

import { ShowTableGetDataCommunicationService } from './show-table-get-data-communication.service';

describe('ShowTableGetDataCommunicationService', () => {
  let service: ShowTableGetDataCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTableGetDataCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
