import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    popup = true;

    items!: MenuItem[];

    avatarMenu = [
        { label: 'profile', command: () => this.userProfile() },
        { label: 'logout', command: () => this.logOut() },
    ];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {}

    userProfile(): void {
        alert('user');
    }

    logOut(): void {
        alert('logout');
    }

}
