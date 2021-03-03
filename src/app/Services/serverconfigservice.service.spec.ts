import { TestBed } from '@angular/core/testing';

import { ServerconfigserviceService } from './serverconfigservice.service';

describe('ServerconfigserviceService', () => {
  let service: ServerconfigserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerconfigserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
