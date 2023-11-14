import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ProveedorService } from '../../services/proveedor.service';
import { TipoProveedor } from '../../models/tipo-proveedor';
import { TipoIdentificacion } from '../../models/tipo-identificacion';
import { TipoProveedorService } from '../../services/tipo-proveedor.service';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';

@Component({
  selector: 'app-add-edit-proveedor',
  templateUrl: './add-edit-proveedor.component.html',
  styleUrls: ['./add-edit-proveedor.component.css']
})
export class AddEditProveedorComponent implements OnInit, OnChanges {

  tipoProveedor: TipoProveedor[] = [];
  tipoIdentificacion: TipoIdentificacion[] = [];


  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProveedor: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form= this.fb.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    telefono: [0, Validators.required],
    correo: ["", Validators.required],
    direccion: ["", Validators.required],
    razonSocial: ["", Validators.required],
    numeroIdentificacion: [0, Validators.required],
    tipoProveedor: [0, Validators.required],
    tipoIdentificacion: [0, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private proveedorService:  ProveedorService,
    private tipoProveedorService: TipoProveedorService,
    private tipoIdentificacionService: TipoIdentificacionService
  ){}

  ngOnInit(): void {
    this.obtenerProveedor();
    this.getTipoIdentificacion();
    this.getTipoProveedor();
  }

  ngOnChanges(): void {
    if (this.selectedProveedor) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedProveedor);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }
  
  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }
  
  obtenerProveedor(){
    if(this.displayAddEditModal && this.selectedProveedor){
      this.proveedorService.obtenerProveedorPorId(this.selectedProveedor).subscribe(
        response => {
          this.form.get('nombre')?.setValue(response.nombre);
          this.form.get('apellido')?.setValue(response.apellido);
          this.form.get('telefono')?.setValue(response.telefono);
          this.form.get('correo')?.setValue(response.correo);
          this.form.get('direccion')?.setValue(response.direccion);
          this.form.get('razonSocial')?.setValue(response.razonSocial);
          this.form.controls['tipoIdentificacion'].setValue(response.tipoIdentificacion.id);
          this.form.get('numeroIdentificacion')?.setValue(response.numeroIdentificacion);
          this.form.controls['tipoProveedor'].setValue(response.tipoProveedor.id);
        }
      )
    }
  }

  addEditProveedor(){
    const proveedorData = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      telefono: this.form.get('telefono')?.value,
      correo: this.form.get('correo')?.value,
      direccion: this.form.get('direccion')?.value,
      razonSocial: this.form.get('razonSocial')?.value,
      numeroIdentificacion: this.form.get('numeroIdentificacion')?.value,
      tipoProveedor:{
        id: this.form.get('tipoProveedor')?.value
      },
      tipoIdentificacion: {
        id: this.form.get('tipoIdentificacion')?.value
      }
    }
    
    this.proveedorService.addEditProveedor(proveedorData, this.selectedProveedor).subscribe(
      response => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar' ? 'Registro Guardado' : 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
        console.log(this.modalType);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error});
      }
    )
  }
  
  getTipoProveedor(){
    this.tipoProveedorService.obtenerTipoProveedor().subscribe(
      response => {
        this.tipoProveedor =  response
      }
    )
  }

  getTipoIdentificacion(){
    this.tipoIdentificacionService.obtenerTipoIdentificacion().subscribe(
      response =>{
        this.tipoIdentificacion = response
      }
    )
  }
}
