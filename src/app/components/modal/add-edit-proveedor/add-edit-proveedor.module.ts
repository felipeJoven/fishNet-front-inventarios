import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

import { AddEditProveedorComponent } from './add-edit-proveedor.component';
import { TreeSelectModule } from 'primeng/treeselect';


@NgModule({
  declarations: [
    AddEditProveedorComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule,
    TreeSelectModule
  ],
  exports: [AddEditProveedorComponent]
})
export class AddEditProveedorModule { }
