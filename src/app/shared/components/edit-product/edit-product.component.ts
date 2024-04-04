import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from '../../validation/validation';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService, CommanService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'tp-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  EditProdForm: FormGroup = new FormGroup({
    productname: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    isactive: new FormControl(null, [Validators.required]),
  });
  submitted = false;
  productEditData: any;
  prodstatus = [
    {
      name: 'Active',
      value: true,
    },
    {
      name: 'Inactive',
      value: false,
    },
  ];
  ref: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private adminservice: AdminService,
    private commanservice: CommanService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productEditData = this.config.data;
    console.log('productdata', this.productEditData);
    this.EditProdForm.controls['productname'].setValue(
      this.productEditData.productname
    );
    this.EditProdForm.controls['description'].setValue(
      this.productEditData.description
    );
    this.EditProdForm.controls['isactive'].setValue(this.productEditData.isactive);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.EditProdForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.EditProdForm.invalid) {
      return;
    }
    this.productEditData.productname = this.EditProdForm.value.productname;
    this.productEditData.description = this.EditProdForm.value.description;
    this.productEditData.isactive = this.EditProdForm.value.isactive;
    this.adminservice
      .editProductsData(this.config.data.productid, this.productEditData)
      .subscribe((result) => {
        this.toastr.success('Update Product', 'Successfully Updated !!');
        this.commanservice.closemodel();
        this.router.navigate(['/admin/products']);
      });
  }

  onReset(): void {
    this.submitted = false;
    this.EditProdForm.reset();
  }
}
