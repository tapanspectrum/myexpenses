import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CommanService } from './shared/services/comman.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private commanservice: CommanService
    ) {}

    ngOnInit() {
        // this.commanservice.userIdleState();
        this.primengConfig.ripple = true;
        this.commanservice.getTokenData().subscribe(async (result) => {
            if (result) {
                const uData: any = await this.commanservice.getUserData();
                this.commanservice.runTimeOutInterval(uData);
                // this.selectRoute(uData.role);
            }
        });
    }

    selectRoute(role: string) {
        if (role === 'Admin') {
            this.router.navigate(['/admin']);
        }
    }
}
