import { TestBed } from '@angular/core/testing';

import { PermitidoGuard } from './permitido.guard';

describe('PermitidoGuard', () => {
  let guard: PermitidoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermitidoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
