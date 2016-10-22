import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { App } from './app.component';
import { SharedModule } from "./shared";

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [App],
      providers: [provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(App);
    fixture.detectChanges();    
  });
});