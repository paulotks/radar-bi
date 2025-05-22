import { TestBed } from '@angular/core/testing';

import { BiListService } from './bi-list.service';

describe('BiListService', () => {
  let service: BiListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
