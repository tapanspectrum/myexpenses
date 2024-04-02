import { Component, VERSION } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import Validation from '../../validation/validation';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'tp-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
    EditProdForm: FormGroup = new FormGroup({
      productname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description:  new FormControl(null, [Validators.required, Validators.minLength(2)]),
      isactive:  new FormControl(null, [Validators.required]),
    });
    submitted = false;
    prodstatus = [{
      name: 'Active',
      value: true
    },{
      name: 'Inactive',
      value: false
    }];

    constructor(
        private formBuilder: FormBuilder,
        private config: DynamicDialogConfig,
        private adminservice: AdminService
    ) {}

    ngOnInit(): void {
        const productdata = this.config.data;
        console.log('productdata', productdata);
        this.EditProdForm.controls['productname'].setValue(productdata.productname);
        this.EditProdForm.controls['description'].setValue(productdata.description);
        this.EditProdForm.controls['isactive'].setValue(productdata.isactive);
    }

    get f(): { [key: string]: AbstractControl } {
        return this.EditProdForm.controls;
    }

    onSubmit(): void {
      console.log('this.EditProdForm.value', this.EditProdForm.value);
        this.submitted = true;

        if (this.EditProdForm.invalid) {
            return;
        }

        console.log(JSON.stringify(this.EditProdForm.value, null, 2));
        this.adminservice.editProductsData(this.config.data.productid, this.EditProdForm.value).subscribe((result) =>{
          console.log('result', result);
        });
    }

    onReset(): void {
        this.submitted = false;
        this.EditProdForm.reset();
    }
}
