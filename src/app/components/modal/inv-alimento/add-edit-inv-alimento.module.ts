import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';

import { AddEditEntradaComponent } from './add-edit-entrada/add-edit-entrada.component';
import { AddEditSalidaComponent } from './add-edit-salida/add-edit-salida.component';



@NgModule({
  declarations: [
    AddEditEntradaComponent,
    AddEditSalidaComponent
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
  exports:[
    AddEditEntradaComponent,
    AddEditSalidaComponent
  ]
})
export class AddEditInvAlimentoModule { }
