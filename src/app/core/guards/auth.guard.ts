import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    CanLoad,
    Router,
} from '@angular/router';
import { CommanService } from '../../shared/services';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard
    implements
    CanActivate,
    CanActivateChild,
    CanLoad {
    constructor(private authService: CommanService, private router: Router) { }

    canActivate(): Promise<boolean> {
        return this.checkAuth();
    }

    canActivateChild(): Promise<boolean> {
        return this.checkAuth();
    }

    // canDeactivate(component: ProudctRatingComponent): boolean {
    //     if (component.hasUnsavedChanges()) {
    //         return window.confirm(
    //             'You have unsaved changes. Do you really want to leave?'
    //         );
    //     }
    //     return true;
    // }

    canLoad(): Promise<boolean> {
        return this.checkAuth();
    }

    private async checkAuth(): Promise<boolean> {
        if (await this.authService.isTokenValid()) {
            return true;
        } else {
            // Redirect to the login page if the user is not authenticated
            this.router.navigate(['/login']);
            return false;
        }
    }
}
