import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService, private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, sate: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = this.tokenService.getToken();

        if (token) {
            return true;
        } else {
            this.router.navigate(['/']);
        }

    }
}