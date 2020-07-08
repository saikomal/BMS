import { TestBed } from '@angular/core/testing';

import { GlobalhttpService } from './globalhttp.service';

describe('GlobalhttpService', () => {
  let service: GlobalhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
