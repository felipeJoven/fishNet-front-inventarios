import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { Lote } from '../../models/lote';
import { PescaService } from '../../services/pesca.service';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'app-add-edit-pesca',
  templateUrl: './add-edit-pesca.component.html',
  styleUrls: ['./add-edit-pesca.component.css']
})
export class AddEditPescaComponent {

  lotes: Lote[] = [];

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedPesca: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form= this.fb.group({
    animalesPescados: ["", Validators.required],    
    pesoPromedio: [0, Validators.required],
    lote: ["", Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private pescaService:  PescaService,
    private loteService: LoteService
  ){}

  ngOnInit(): void {
    this.obtenerPesca();
    this.getLote();    
  }

  ngOnChanges(): void {
    if (this.selectedPesca) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedPesca);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }
  
  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtenerPesca(){
    if(this.displayAddEditModal && this.selectedPesca){
      this.pescaService.obtenerPescaPorId(this.selectedPesca).subscribe(
        response => {
          this.form.get('animalesPescados')?.setValue(response.animalesPescados);
          this.form.get('pesoPromedio')?.setValue(response.pesoPromedio);
          //this.form.controls['lote'].setValue(response.lote.id);
        }
      )
    }
  }

  addEditPesca(){
    const pescaData = {
      nombre: this.form.get('animalesPescados')?.value,
      apellido: this.form.get('pesoPromedio')?.value,      
      lote: {
        id: this.form.get('lote')?.value
      }
    }

    this.pescaService.addEditPesca(pescaData, this.selectedPesca).subscribe(
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

  getLote(){
    this.loteService.obtenerLote().subscribe(
      response =>{
        this.lotes = response
      }
    )
  }
}
