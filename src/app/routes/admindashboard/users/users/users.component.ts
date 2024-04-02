import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from '../../services';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  selectedUsers: any[] = [];

  statuses: any[] = [];

  rowGroupMetadata: any;

  expandedRows: expandedRows = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
      this.adminservice.getUserData().subscribe((resdata) =>{
        this.users = resdata;
        this.loading = false;
      });
  }

  onSort() {
    //   this.updateRowGroupMetaData();
  }

//   updateRowGroupMetaData() {
//       this.rowGroupMetadata = {};

//       if (this.customers3) {
//           for (let i = 0; i < this.customers3.length; i++) {
//               const rowData = this.customers3[i];
//               const representativeName = rowData?.representative?.name || '';

//               if (i === 0) {
//                   this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
//               }
//               else {
//                   const previousRowData = this.customers3[i - 1];
//                   const previousRowGroup = previousRowData?.representative?.name;
//                   if (representativeName === previousRowGroup) {
//                       this.rowGroupMetadata[representativeName].size++;
//                   }
//                   else {
//                       this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
//                   }
//               }
//           }
//       }
//   }

//   expandAll() {
//       if (!this.isExpanded) {
//           this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

//       } else {
//           this.expandedRows = {};
//       }
//       this.isExpanded = !this.isExpanded;
//   }

  formatCurrency(value: number) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  
}