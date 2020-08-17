import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '../environment.service';

/**
 * Class that helps to modify HTTP headers/params.
 *
 * Add API_KEY for Giffy search API.
 */
@Injectable()
export class FedexHttpInterceptor implements HttpInterceptor {
  constructor(private environmentService: EnvironmentService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiRequest = req.url.includes('containsprofanity')
      ? req
      : this.getCloneRequest(req);
    return next.handle(apiRequest);
  }

  getCloneRequest(req) {
    const apiRequest = req.clone({
      url: req.url,
      params: req.params.append('api_key', this.environmentService.api_key),
    });

    return apiRequest;
  }
}
