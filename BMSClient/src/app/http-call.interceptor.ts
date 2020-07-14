import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request=request.clone({
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*'
      }),
    });
    return next.handle(request).pipe(tap((event:HttpEvent)=>{

    },
    (error:HttpErrorResponse)=>{
      this._snackBar.open(error.message, "ok", {
        duration: 2000,
      });
    }
    ));
  }
}
