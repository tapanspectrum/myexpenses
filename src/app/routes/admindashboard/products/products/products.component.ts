import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from '../../services';
import { CommanService } from '../../../../shared/services';
import { EditProductComponent } from 'src/app/shared/components';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    providers: [MessageService, ConfirmationService, DialogService, DynamicDialogRef],
})
export class ProductsComponent implements OnInit {
    productsData!: any;
    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    editing: any;

    @ViewChild('filter') filter!: ElementRef;
    ref: DynamicDialogRef | undefined;

    constructor(
        private adminservice: AdminService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private dialogservice: DialogService,
        private commanservice: CommanService,
        private toastr: ToastrService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.adminservice.getProductsData().subscribe((res) => {
            this.productsData = res;
            this.loading = false;
        });

        this.commanservice.subject$.subscribe((res) => {
            if (res) {
                this.ref?.close();
            }
        });
    }

    onSort() {}

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    editProduct(product: any) {
        this.ref = this.dialogservice.open(EditProductComponent, {
            header: 'Edit Product',
            width: '70%',
            height: 'auto',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: false,
            modal:true,
            closable: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: product,
        });
    }

    deleteProduct(product: any) {
        console.log('product', product);
        this.confirmationService.confirm({
            message:
                'Are you sure you want to delete ' + product.productname + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsData = this.productsData.filter(
                    (val: any) => val.id !== product.productid
                );
                this.productsData = {};
                this.adminservice
                    .deleteProductsData(product.productid)
                    .subscribe((res) => {
                        if (res.statusCode === 200) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Product Deleted',
                                life: 3000,
                            });
                            this.router.navigate(['/admin/products']);
                        }
                    });
            },
        });
    }

    destroy() {
        if (this.ref) {
            this.ref?.destroy();
        }
    }
}
