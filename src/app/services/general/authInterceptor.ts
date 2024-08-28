import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CryptoHelper } from "../../helpers/CryptoHelper";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../helpers/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenEncrypted = localStorage.getItem("token");
        //console.log(tokenEncrypted);

        if (tokenEncrypted) {
            try {                
                if (this.isBase64(tokenEncrypted)) {
                    const decodedToken = atob(tokenEncrypted);
                    var token = CryptoHelper.decrypt(tokenEncrypted);

                    if (this.isTokenExpired(token)) {
                        this.router.navigate(['/login']);
                        // Retornar inmediatamente si el token está expirado
                        return next.handle(req); 
                    }

                    const cloned = req.clone({
                                        //headers: req.headers.set("Authorization", "Bearer" + token)
                                        //Alt 96
                                        setHeaders: {Authorization: `Bearer ${tokenEncrypted}`}               
                                    });                    

                    return next.handle(cloned);
                } else {
                    const encodedToken = btoa(tokenEncrypted);
                    const cloned = req.clone({
                        setHeaders: {Authorization: `Bearer ${encodedToken}`}
                    });
                    return next.handle(req);
                }
            } catch (e) {
                console.error("Error decoding the token:", e);
                this.router.navigate(['/error']); 
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }
    }
    
    private isBase64(str: string): boolean {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        } catch (e) {
            console.error("Error parsing token payload:", e);
            // Considerar el token como expirado si no se puede parsear
            return true; 
        }
    }
}