import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AdminService } from '../../services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboard_order_data: any;
    RecentSalesData: any;
    BestSalesData: any;
    SalesOverviewData: any[] = [];
    NotificationData: any[] = [];

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private titleService: Title,
        private adminservice: AdminService
    ) {
        this.titleService.setTitle('TP Admin - Dashboard');
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.initChart();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
        this.adminservice.getDashboardData().subscribe((res) => {
            console.log('res', res);
            this.dashboard_order_data = res;
        });
        this.adminservice.getRecentSalesData().subscribe((res) => {
            console.log('res', res);
            this.RecentSalesData = res;
        });
        this.adminservice.getBestSalesData().subscribe((res) => {
            console.log('res', res);
            this.BestSalesData = res.slice(0, 10);
        });

        this.adminservice.getSalesOverviewData().subscribe((res) => {
            console.log('res', res);
            let data = new Set(
                res.map((item: any) => {
                    return item.region;
                })
            );
            data.forEach((regiondata) => {
                let qanva = 0;
                if (regiondata) {
                    this.SalesOverviewData.push({
                        region: regiondata,
                        notifications: res.reduce((i: any) => {
                            if (i.region === regiondata) {
                              return  i.quantity
                            }
                        }),
                    });
                }
            });
            // this.SalesOverviewData = res;
            console.log('this.SalesOverviewData', this.SalesOverviewData);
        });

        this.adminservice.getNotificationData().subscribe((res) => {
            res.sort(
                (a: any, b: any) =>
                    new Date(b.purchase_date).getTime() -
                    new Date(a.purchase_date).getTime()
            );
            let data = new Set(
                res.map((item: any) => {
                    return item.purchase_date;
                })
            );
            data.forEach((date) => {
                if (date) {
                    this.NotificationData.push({
                        date: date,
                        notifications: res.filter(
                            (i: any) => i.purchase_date === date
                        ),
                    });
                }
            });
            // this.NotificationData = res;
        });
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
