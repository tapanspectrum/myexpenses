import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {
    LoaderComponent,
    BreadcrumbComponent,
    EditCategoryComponent,
    EditProductComponent,
    EditRoleComponent,
    EditUserComponent,
} from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule } from '../layout/app.layout.module';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from '../layout/config/config.module';
import { PrimeNgModule } from './primeNg.module';

@NgModule({
    declarations: [
        LoaderComponent,
        BreadcrumbComponent,
        EditCategoryComponent,
        EditProductComponent,
        EditRoleComponent,
        EditUserComponent,
    ],
    imports: [
        // CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AppConfigModule,
        PrimeNgModule,
    ],
    exports: [
        LoaderComponent,
        BreadcrumbComponent,
        EditCategoryComponent,
        EditProductComponent,
        EditRoleComponent,
        EditUserComponent,
    ],
})
export class SharedModule {}
