import { TestBed } from '@angular/core/testing';

import { ApiComunaService } from './api-comuna.service';

describe('ApiComunaService', () => {
  let service: ApiComunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiComunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
