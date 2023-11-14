import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

import { LoteService } from '../../services/lote.service';
import { Proveedor } from '../../models/proveedor';
import { Especies } from '../../models/especies';
import { UnidadProductiva } from '../../models/unidad-productiva';
import { ProveedorService } from '../../services/proveedor.service';
import { EspeciesService } from '../../services/especies.service';
import { UnidadProductivaService } from '../../services/unidad-productiva.service';


@Component({
  selector: 'app-add-edit-lote',
  templateUrl: './add-edit-lote.component.html',
  styleUrls: ['./add-edit-lote.component.css']
})
export class AddEditLoteComponent implements OnInit, OnChanges {


  proveedores: Proveedor[] = [];
  especies: Especies[] = [];
  unidadProductiva: UnidadProductiva[] = [];

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedLote: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    nombreLote: ["", Validators.required],
    fechaSiembra: ["", Validators.required],
    numeroAnimales: ["", Validators.required],
    proveedor: [0, Validators.required],
    especies: [0, Validators.required],
    unidadProductiva: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private loteService: LoteService,
    private provedorService: ProveedorService,
    private especiesService: EspeciesService,
    private unidadProductivaService: UnidadProductivaService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {

    this.getUnidadProductiva();
    this.getProveedor();
    this.getEspecies();
    this.obtenerLote();
  }

  ngOnChanges(): void {
    if (this.selectedLote) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedLote);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtenerLote(){
    if (this.displayAddEditModal && this.selectedLote) {
      this.loteService.obtenerLotePorId(this.selectedLote).subscribe(
        response =>{
          this.form.get('nombreLote')?.setValue(response.nombreLote);          
          this.form.get('numeroAnimales')?.setValue(response.numeroAnimales);
          this.form.controls['proveedor'].setValue(response.proveedor.id);
          this.form.controls['especies'].setValue(response.especies.id);
          this.form.controls['unidadProductiva'].setValue(response.unidadProductiva.id);

        }
      )
    }
  }

  addEditLote(){
    const loteData = {
      nombreLote: this.form.get('nombreLote')?.value,
      fechaSiembra: this.form.get('fechaSiembra')?.value,
      numeroAnimales: this.form.get('numeroAnimales')?.value,
      proveedor: {
        id: this.form.get('proveedor')?.value
      },
      especies: {
        id: this.form.get('especies')?.value
      }, 
      unidadProductiva: {
        id: this.form.get('unidadProductiva')?.value
      }
    }
    
    this.loteService.addEditLote(loteData, this.selectedLote).subscribe(
      response =>{
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

  getProveedor(){
    this.provedorService.obtenerProveedor().subscribe(
      response => {
        this.proveedores = response
      }
    )
  }


  getEspecies(){
    this.especiesService.obtenerEspecies().subscribe(
      response => {
        this.especies = response
      }
    )
  }
  getUnidadProductiva(){
    this.unidadProductivaService.obtenerUnidadProductiva().subscribe(
      response => {
        this.unidadProductiva = response
      }
    )
  }
}
