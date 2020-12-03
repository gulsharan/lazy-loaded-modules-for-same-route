import { Injector } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export const appInjector = new ReplaySubject<Injector>();
