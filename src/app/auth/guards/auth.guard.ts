import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private sessionStorageService: SessionStorageService,
        private router: Router,
        private snackBar: MatSnackBar) { }

    canActivate(): boolean {
        const can = this.sessionStorageService.isLoggedIn();

        if(!can) {
            this.snackBar.open('Please, login.', 'OK', { duration: 3000 });
            this.router.navigate(['/login']);
        }
        return can;
    }
}