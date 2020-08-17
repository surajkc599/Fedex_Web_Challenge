import { Injectable } from '@angular/core';

import { IEnvironment } from '../environments/ienvironment';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService implements IEnvironment {
  constructor() {}

  get production() {
    return environment.production;
  }

  get limit() {
    return environment.limit;
  }

  get baseUrl() {
    return environment.baseUrl;
  }

  get api_key() {
    return environment.api_key;
  }
}
