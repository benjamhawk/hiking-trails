import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

// takes an outgoing request and adds the authToken to it before sent to API
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken()
    console.log(authToken)

    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      })

      return next.handle(authRequest)
    } else {
      return next.handle(req)
    }
  }
}
