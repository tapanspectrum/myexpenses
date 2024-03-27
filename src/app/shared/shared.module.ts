import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent, BreadcrumbComponent } from './components';



@NgModule({
  declarations: [LoaderComponent, BreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports:[LoaderComponent, BreadcrumbComponent]
})
export class SharedModule { }
