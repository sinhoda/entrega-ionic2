import { TestBed } from '@angular/core/testing';

import { NoPermitidoGuard } from './no-permitido.guard';

describe('NoPermitidoGuard', () => {
  let guard: NoPermitidoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoPermitidoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
