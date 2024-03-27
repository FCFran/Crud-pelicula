import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { peliculaResolver } from './pelicula.resolver';

describe('peliculaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => peliculaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
