import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        const headerConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
        if (token) {
            headerConfig['Authorization'] = `Bearer ${token}`;
        }
        const _req = req.clone({ setHeaders: headerConfig });
        return next.handle(_req);
    }
}