import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { SalidaAlimentos } from 'src/app/components/models/inv-salida-alimento';
import { InvSalidaAlimentosService } from 'src/app/components/services/inv-salida-alimento.service';

@Component({
  selector: 'app-salida-alimento',
  templateUrl: './salida-alimento.component.html',
  styleUrls: ['./salida-alimento.component.css']
})
export class SalidaAlimentoComponent {
  salidas: SalidaAlimentos[] = [];
  displayAddEditModal = false;
  selectedSalida: any = null;
  subscriptions: Subscription[] = [];
  LSubscription: Subscription = new Subscription();

  constructor(
    private salidaService: InvSalidaAlimentosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerSalidaAlimentos();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedSalida = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerSalidaAlimentos();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarSalidaList(newData: any) {
    if (this.selectedSalida && newData.id === this.selectedSalida.id) {
      const salidaIndex = this.salidas.findIndex(data => data.id === newData.id);
      this.salidas[salidaIndex] = newData;
    }
  }

  eliminar(id: number): void {
    this.confirmationService.confirm({
      message: '¿Quieres Eliminar este Registro?',
      header: 'Confirmacion de Eliminar Registro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salidaService.eliminarSalidaAlimentos(id).subscribe(
          response => {
            this.messageService.add({ severity: 'Realizado', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerSalidaAlimentos();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      },
    })
  };

  showEdit(id: number) {
    this.displayAddEditModal = true;
    this.selectedSalida = id;
  }

  obtenerSalidaAlimentos(): void {
    this.salidaService.obtenerSalidaAlimentos().subscribe(salida => {

      this.salidas = salida;
      console.log(this.salidas);

    });
    this.subscriptions.push(this.LSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
