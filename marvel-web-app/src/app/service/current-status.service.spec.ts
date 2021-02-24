import { TestBed } from '@angular/core/testing';

import { CurrentStatusService } from './current-status.service';

describe('CurrentStatusService', () => {
  let service: CurrentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
