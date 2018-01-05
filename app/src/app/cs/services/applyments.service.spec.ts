import { TestBed, inject } from '@angular/core/testing';

import { ApplymentsService } from './applyments.service';

describe('ApplymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplymentsService]
    });
  });

  it('should be created', inject([ApplymentsService], (service: ApplymentsService) => {
    expect(service).toBeTruthy();
  }));
});
