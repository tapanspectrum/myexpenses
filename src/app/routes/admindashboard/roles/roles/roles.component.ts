import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from '../../services';
import { Observable } from 'rxjs';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RolesComponent implements OnInit {

    rolesData!: any;
    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private adminservice: AdminService
    ) {}

    ngOnInit() {
        this.adminservice.getCategoriesData().subscribe((res) =>{
            this.rolesData = res;
            this.loading = false;
        })
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
}
